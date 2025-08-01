// src/app/api/onvo/create-subscription/route.js
import { NextResponse } from 'next/server'

// Configuración para permitir que esta ruta funcione con APIs
export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const requestBody = await request.json()
    console.log('📨 Request recibido:', requestBody)
    
    let { name, email, phone, paymentType } = requestBody
    
    // Formatear teléfono para ONVO (necesita formato +506 8888-8888)
    if (phone) {
      // Limpiar el teléfono de todos los caracteres no numéricos excepto +
      let cleanPhone = phone.replace(/[^\d+]/g, '')
      
      // Si empieza con +5068 (pegado), separar correctamente
      if (cleanPhone.startsWith('+5068') && cleanPhone.length === 13) {
        cleanPhone = '+506' + cleanPhone.slice(5)
      }
      
      // Si empieza con +056 (error común), corregir a +506
      if (cleanPhone.startsWith('+056')) {
        cleanPhone = '+506' + cleanPhone.slice(4)
      }
      
      // Formatear si es válido
      if (cleanPhone.startsWith('+506') && cleanPhone.length === 12) {
        const numbers = cleanPhone.slice(4) // quitar +506
        if (numbers.length === 8) {
          phone = `+506 ${numbers.slice(0, 4)}-${numbers.slice(4)}`
        }
      }
    }
    console.log('📞 Teléfono formateado:', phone)

    // Validar campos requeridos
    if (!name || !email || !phone || !paymentType) {
      console.error('❌ Campos faltantes:', { name: !!name, email: !!email, phone: !!phone, paymentType: !!paymentType })
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar tipo de pago
    if (!['cuotas', 'fullpay', 'completo'].includes(paymentType)) {
      console.error('❌ Tipo de pago inválido:', paymentType)
      return NextResponse.json(
        { error: 'Tipo de pago no válido' },
        { status: 400 }
      )
    }

    const secretKey = process.env.ONVO_SECRET_KEY
    const productId = paymentType === 'cuotas' 
      ? process.env.ONVO_PRODUCT_ID_3_CUOTAS 
      : process.env.ONVO_PRODUCT_ID_FULLPAY

    console.log('🔑 Configuración ONVO:', {
      paymentType,
      productId: productId ? 'Configurado' : 'NO CONFIGURADO',
      secretKey: secretKey ? 'Configurado' : 'NO CONFIGURADO'
    })

    if (!secretKey || !productId) {
      console.error('❌ Configuración ONVO faltante:', { 
        secretKey: !!secretKey, 
        productId: !!productId,
        paymentType 
      })
      return NextResponse.json(
        { error: 'Configuración de pago incompleta' },
        { status: 500 }
      )
    }

    console.log('🔍 Buscando cliente existente:', email)

    // 1. Buscar cliente existente
    let customer = null
    try {
      const searchResponse = await fetch('https://api.onvopay.com/v1/customers/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify({
          email: email
        })
      })

      const searchData = await searchResponse.json()
      
      if (searchResponse.ok && searchData.customers && searchData.customers.length > 0) {
        customer = searchData.customers[0]
        console.log('✅ Cliente existente encontrado:', customer.id)
      }
    } catch (error) {
      console.log('⚠️ Error buscando cliente (continuando):', error.message)
    }

    // 2. Crear cliente si no existe
    if (!customer) {
      console.log('👤 Creando nuevo cliente:', name)
      
      // Usar API real de ONVO para crear cliente
      const customerResponse = await fetch('https://api.onvopay.com/v1/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone
        })
      })

      const customerData = await customerResponse.json()

      if (!customerResponse.ok) {
        console.error('❌ Error creando cliente ONVO:', {
          status: customerResponse.status,
          statusText: customerResponse.statusText,
          body: customerData
        })
        return NextResponse.json(
          { 
            error: 'Error procesando información del cliente',
            details: customerData,
            onvoStatus: customerResponse.status
          },
          { status: 400 }
        )
      }

      customer = customerData
      console.log('✅ Cliente creado exitosamente:', customer.id)
    }

    // Función auxiliar para crear suscripción alternativa
    const tryAlternativeSubscription = async () => {
      console.log('🔄 Intentando endpoint alternativo /subscriptions...')
      
      try {
        const altSubscriptionResponse = await fetch('https://api.onvopay.com/v1/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`
          },
          body: JSON.stringify({
            customerId: customer.id,
            items: [{
              productId: productId,
              quantity: 1
            }],
            billing_max_cycles: paymentType === 'cuotas' ? 3 : 1,
            metadata: {
              program: 'CIPLAD',
              payment_type: paymentType,
              customer_name: name,
              customer_phone: phone
            }
          })
        })

        if (altSubscriptionResponse.ok) {
          const altSubscription = await altSubscriptionResponse.json()
          console.log('✅ Suscripción alternativa creada:', altSubscription.id)
          
          return NextResponse.json({
            success: true,
            customerId: customer.id,
            subscriptionId: altSubscription.id,
            productId: productId,
            paymentType: paymentType,
            amount: paymentType === 'cuotas' ? 47500 : 122500,
            message: `Suscripción alternativa creada para ${paymentType === 'cuotas' ? '3 cuotas de $475' : 'pago completo de $1,225'}`
          })
        } else {
          const errorData = await altSubscriptionResponse.json()
          console.error('❌ Error con endpoint alternativo:', errorData)
        }
      } catch (error) {
        console.error('❌ Error en endpoint alternativo:', error.message)
      }
      
      // Si todo falla, devolver null para continuar con fallback
      console.log('⚠️ Suscripción alternativa falló, continuando con fallback')
      return null
    }

    // Crear suscripción SOLO para cuotas, paymentIntent para pago único
    if (paymentType === 'cuotas') {
      console.log('🔄 Creando suscripción para 3 cuotas...')
      
      try {
        // Crear suscripción usando el formato correcto de ONVO
        const subscriptionData = {
          customerId: customer.id,
          paymentBehavior: "allow_incomplete",
          items: [{
            priceId: process.env.ONVO_PRICE_ID_CUOTAS || "cmdrdhr2v0jrcl52en88r5unb",
            quantity: 1
          }]
        }

        console.log('📋 Datos de suscripción:', subscriptionData)

        const subscriptionResponse = await fetch('https://api.onvopay.com/v1/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`
          },
          body: JSON.stringify(subscriptionData)
        })

        const subscriptionResult = await subscriptionResponse.json()
        console.log('📨 Respuesta de ONVO Subscription:', {
          status: subscriptionResponse.status,
          statusText: subscriptionResponse.statusText,
          body: subscriptionResult
        })

        if (subscriptionResponse.ok && subscriptionResult.id) {
          console.log('✅ Suscripción creada exitosamente:', subscriptionResult.id)
          
          return NextResponse.json({
            success: true,
            customerId: customer.id,
            subscriptionId: subscriptionResult.id,
            productId: productId,
            paymentType: paymentType,
            amount: 47500,
            message: 'Suscripción creada para 3 cuotas de $475'
          })
        } else {
          console.error('❌ Error creando suscripción:', subscriptionResult)
        }
      } catch (error) {
        console.error('❌ Error en suscripción:', error.message)
      }
    } else {
      console.log('🔄 Creando paymentIntent para pago único...')
      
      try {
        // Crear PaymentIntent para pago único
        const paymentIntentData = {
          currency: 'USD',
          amount: 122500, // $1,225 en centavos
          description: 'Certificación CIPLAD - Pago Completo $1,225 USD'
        }

        console.log('📋 Datos de PaymentIntent:', paymentIntentData)

        const paymentIntentResponse = await fetch('https://api.onvopay.com/v1/payment-intents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`
          },
          body: JSON.stringify(paymentIntentData)
        })

        const paymentIntentResult = await paymentIntentResponse.json()
        console.log('📨 Respuesta de ONVO PaymentIntent:', {
          status: paymentIntentResponse.status,
          statusText: paymentIntentResponse.statusText,
          body: paymentIntentResult
        })

        if (paymentIntentResponse.ok && paymentIntentResult.id) {
          console.log('✅ PaymentIntent creado exitosamente:', paymentIntentResult.id)
          
          return NextResponse.json({
            success: true,
            customerId: customer.id,
            paymentIntentId: paymentIntentResult.id,
            productId: productId,
            paymentType: paymentType,
            amount: 122500,
            message: 'PaymentIntent creado para pago único de $1,225'
          })
        } else {
          console.error('❌ Error creando PaymentIntent:', paymentIntentResult)
        }
      } catch (error) {
        console.error('❌ Error en PaymentIntent:', error.message)
      }
    }


    // Fallback: solo devolver info del cliente
    console.log('✅ Cliente listo para checkout')
    return NextResponse.json({
      success: true,
      customerId: customer.id,
      productId: productId,
      paymentType: paymentType,
      amount: paymentType === 'cuotas' ? 47500 : 122500,
      message: `Cliente preparado para ${paymentType === 'cuotas' ? '3 cuotas de $475' : 'pago completo de $1,225'}`
    })

  } catch (error) {
    console.error('❌ Error en create-subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}