// src/app/api/webhook/onvo/route.js
import { NextResponse } from 'next/server'

// Configuración para permitir que esta ruta funcione con APIs
export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    // Verificar webhook secret
    const webhookSecret = request.headers.get('X-Webhook-Secret')
    const expectedSecret = process.env.ONVO_WEBHOOK_SECRET

    if (!expectedSecret) {
      console.error('❌ ONVO_WEBHOOK_SECRET no configurado')
      return NextResponse.json({ error: 'Webhook secret no configurado' }, { status: 500 })
    }

    if (webhookSecret !== expectedSecret) {
      console.error('❌ Webhook secret inválido')
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()
    const eventType = data.type
    const eventData = data.data

    console.log(`🎯 Webhook recibido: ${eventType}`)

    switch (eventType) {
      case 'payment-intent.succeeded':
        console.log('✅ Pago único exitoso:', eventData.id)
        await handlePaymentSuccess(eventData, 'single')
        break

      case 'payment-intent.failed':
        console.log('❌ Pago único falló:', eventData.id)
        await handlePaymentFailure(eventData, 'single')
        break

      case 'payment-intent.deferred':
        console.log('⏳ Pago pendiente (SINPE):', eventData.id)
        await handlePaymentPending(eventData)
        break

      case 'subscription.renewal.succeeded':
        console.log('✅ Cuota de suscripción exitosa:', eventData.subscription_id)
        await handlePaymentSuccess(eventData, 'subscription')
        break

      case 'subscription.renewal.failed':
        console.log('❌ Cuota de suscripción falló:', eventData.subscription_id)
        await handlePaymentFailure(eventData, 'subscription')
        break

      case 'checkout-session.succeeded':
        console.log('🎉 Sesión de pago exitosa:', eventData.id)
        await handleCheckoutSuccess(eventData)
        break

      case 'mobile-transfer.received':
        console.log('📱 Transferencia móvil recibida:', eventData.id)
        await handleMobileTransfer(eventData)
        break

      default:
        console.log('⚠️ Evento no manejado:', eventType)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Error procesando webhook:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(data, type) {
  try {
    const customer = data.customer || {}
    const amount = data.amount || 0
    const paymentType = type === 'subscription' ? 'cuota' : 'pago único'

    console.log(`💰 Procesando ${paymentType} exitoso para ${customer.email}`)

    // Aquí puedes agregar lógica para:
    // - Enviar email de confirmación
    // - Actualizar base de datos
    // - Activar acceso al curso
    // - Generar certificado (si es pago final)

    if (type === 'subscription') {
      // Lógica específica para cuotas
      const currentCycle = data.billing_cycle_count || 1
      console.log(`📊 Cuota ${currentCycle}/3 procesada`)
      
      // Enviar email específico para cada cuota
      await sendSubscriptionPaymentEmail(customer, currentCycle, amount)
      
      // Si es la cuota final, activar certificación completa
      if (currentCycle === 3) {
        console.log('🎓 Activando certificación completa - todas las cuotas pagadas')
        await activateFullCertification(customer)
      }
    } else {
      // Pago único - activar acceso completo inmediatamente
      console.log('🎓 Activando acceso completo - pago único')
      await activateFullAccess(customer, amount)
    }

  } catch (error) {
    console.error('❌ Error manejando pago exitoso:', error)
  }
}

async function handlePaymentFailure(data, type) {
  try {
    const customer = data.customer || {}
    const paymentType = type === 'subscription' ? 'cuota' : 'pago único'

    console.log(`💸 Procesando ${paymentType} fallido para ${customer.email}`)

    // Enviar email de pago fallido
    await sendPaymentFailureEmail(customer, type)

    // Si es una cuota fallida, considerar suspender acceso temporal
    if (type === 'subscription') {
      console.log('⏸️ Considerando suspensión temporal por cuota fallida')
      // Lógica de suspensión temporal
    }

  } catch (error) {
    console.error('❌ Error manejando pago fallido:', error)
  }
}

async function handlePaymentPending(data) {
  try {
    const customer = data.customer || {}
    console.log(`⏳ Pago pendiente para ${customer.email} - probablemente SINPE Móvil`)

    // Enviar email de pago pendiente
    await sendPaymentPendingEmail(customer)

  } catch (error) {
    console.error('❌ Error manejando pago pendiente:', error)
  }
}

async function handleCheckoutSuccess(data) {
  try {
    console.log('🛒 Sesión de checkout completada exitosamente')
    // Lógica adicional si es necesaria
  } catch (error) {
    console.error('❌ Error manejando checkout exitoso:', error)
  }
}

async function handleMobileTransfer(data) {
  try {
    const customer = data.customer || {}
    console.log(`📱 Transferencia móvil confirmada para ${customer.email}`)

    // Confirmar pago y activar acceso
    await confirmMobilePayment(customer, data)

  } catch (error) {
    console.error('❌ Error manejando transferencia móvil:', error)
  }
}

// Funciones de email (placeholder - implementar con Mailgun, SendGrid, etc.)
async function sendSubscriptionPaymentEmail(customer, cycle, amount) {
  console.log(`📧 Enviando email de cuota ${cycle}/3 a ${customer.email}`)
  // TODO: Implementar con servicio de email
}

async function sendPaymentFailureEmail(customer, type) {
  console.log(`📧 Enviando email de pago fallido a ${customer.email}`)
  // TODO: Implementar con servicio de email
}

async function sendPaymentPendingEmail(customer) {
  console.log(`📧 Enviando email de pago pendiente a ${customer.email}`)
  // TODO: Implementar con servicio de email
}

// Funciones de activación de acceso (placeholder)
async function activateFullCertification(customer) {
  console.log(`🎓 Activando certificación completa para ${customer.email}`)
  // TODO: Implementar lógica de certificación
}

async function activateFullAccess(customer, amount) {
  console.log(`🔓 Activando acceso completo para ${customer.email}`)
  // TODO: Implementar lógica de acceso
}

async function confirmMobilePayment(customer, data) {
  console.log(`✅ Confirmando pago móvil para ${customer.email}`)
  // TODO: Implementar confirmación de pago
}