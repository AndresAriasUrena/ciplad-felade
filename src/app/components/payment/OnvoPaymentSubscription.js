// src/app/components/payment/OnvoPaymentSubscription.js
'use client'

import { useState, useEffect } from 'react'
import { FaLock, FaSpinner, FaCheckCircle, FaCreditCard } from 'react-icons/fa'

const OnvoPaymentSubscription = ({ paymentType = 'cuotas', productName = 'Certificación CIPLAD' }) => {
  const [paymentForm, setPaymentForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'CR'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isOnvoReady, setIsOnvoReady] = useState(false)
  const [publicKey, setPublicKey] = useState('')

  // Obtener la public key del servidor
  useEffect(() => {
    const getPublicKey = async () => {
      try {
        const response = await fetch('/api/onvo/config')
        const data = await response.json()
        setPublicKey(data.publicKey)
      } catch (error) {
        console.error('Error obteniendo configuración ONVO:', error)
        setError('Error de configuración del sistema de pagos')
      }
    }
    
    getPublicKey()
  }, [])

  // Cargar SDK de ONVO
  useEffect(() => {
    const loadOnvoSDK = () => {
      if (window.onvo) {
        console.log('✅ ONVO SDK ya estaba cargado - window.onvo:', !!window.onvo)
        console.log('✅ ONVO pay method disponible:', !!window.onvo?.pay)
        setIsOnvoReady(true)
        return
      }

      console.log('🔄 Cargando ONVO SDK desde:', 'https://sdk.onvopay.com/sdk.js')
      const script = document.createElement('script')
      script.src = 'https://sdk.onvopay.com/sdk.js'
      script.onload = () => {
        console.log('✅ ONVO SDK cargado exitosamente')
        console.log('✅ window.onvo disponible:', !!window.onvo)
        console.log('✅ window.onvo.pay disponible:', !!window.onvo?.pay)
        console.log('✅ Métodos disponibles:', Object.keys(window.onvo || {}))
        setIsOnvoReady(true)
      }
      script.onerror = (error) => {
        console.error('❌ Error cargando SDK ONVO:', error)
        setError('Error cargando el sistema de pagos. Verifica tu conexión.')
      }
      document.head.appendChild(script)
    }

    loadOnvoSDK()
  }, [])

  const getProductData = () => {
    const pricing = {
      cuotas: {
        amount: 47500, // $475 en centavos
        description: 'Certificación CIPLAD - 3 Cuotas de $475',
        displayPrice: '$475 USD',
        installments: '3 pagos mensuales automáticos'
      },
      completo: {
        amount: 122500, // $1,225 en centavos (CORRECTO - no $1,300)
        description: 'Certificación CIPLAD - Pago Completo',
        displayPrice: '$1,225 USD',
        installments: 'Pago único'
      },
      fullpay: {
        amount: 122500, // $1,225 en centavos (CORRECTO - no $1,300)
        description: 'Certificación CIPLAD - Pago Completo',
        displayPrice: '$1,225 USD',
        installments: 'Pago único'
      }
    }
    return pricing[paymentType] || pricing.cuotas
  }

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone']
    
    for (let field of requiredFields) {
      if (!paymentForm[field]?.trim()) {
        throw new Error(`El campo ${field} es requerido`)
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(paymentForm.email)) {
      throw new Error('Email inválido')
    }

    return true
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    
    if (!isOnvoReady) {
      setError('Sistema de pagos no disponible. Intenta recargar la página.')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      // Validar formulario
      validateForm()
      
      console.log('🚀 Iniciando proceso de pago con ONVO...')
      console.log('📊 PaymentType enviado:', paymentType)
      console.log('📋 Datos del formulario:', {
        name: paymentForm.fullName,
        email: paymentForm.email,
        phone: paymentForm.phone,
        paymentType: paymentType
      })
      
      // Crear suscripción en el backend
      const response = await fetch('/api/onvo/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: paymentForm.fullName,
          email: paymentForm.email,
          phone: paymentForm.phone,
          paymentType: paymentType
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Error detallado de la API:', errorData)
        throw new Error(errorData.error || `Error ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const responseData = await response.json()
      console.log('📨 Respuesta completa del backend:', responseData)
      
      const { customerId, subscriptionId, productId, paymentIntentId, paymentType: responsePaymentType, amount } = responseData
      
      console.log('✅ Datos extraídos:', { customerId, subscriptionId, productId, paymentIntentId, paymentType: responsePaymentType, amount })
      
      // Verificar que tenemos los IDs necesarios según el tipo de pago
      if (paymentType === 'cuotas' && !subscriptionId) {
        console.error('🚨 PROBLEMA: subscriptionId requerido para cuotas!')
        setError('Error: No se pudo crear la suscripción para cuotas')
        setIsLoading(false)
        return
      }
      
      if (paymentType !== 'cuotas' && !paymentIntentId) {
        console.error('🚨 PROBLEMA: paymentIntentId requerido para pago único!')
        setError('Error: No se pudo crear el PaymentIntent para pago único')
        setIsLoading(false)
        return
      }

      // Cargar widget de ONVO para capturar el pago
      if (!window.onvo || !window.onvo.pay) {
        console.error('❌ SDK de ONVO no disponible')
        setError('Error: Sistema de pagos no disponible. Reintentando...')
        
        // Reintentar cargar el SDK
        setTimeout(() => {
          if (window.onvo && window.onvo.pay) {
            console.log('✅ SDK de ONVO recargado exitosamente')
            initializeOnvoPayment()
          } else {
            setError('Error: No se pudo cargar el sistema de pagos')
            setIsLoading(false)
          }
        }, 1000)
        return
      }

      initializeOnvoPayment()

      function initializeOnvoPayment() {
        console.log('🔄 Inicializando widget de ONVO...')
        console.log('🔧 Configuración ONVO:', {
          paymentType: paymentType === 'cuotas' ? 'subscription' : 'one_time',
          customerId,
          subscriptionId,
          paymentIntentId,
          productId,
          amount,
          publicKey: publicKey.substring(0, 20) + '...'
        })

        // Configuración basada en el tipo de pago
        const paymentConfig = {
          publicKey: publicKey,
          customerId: customerId
        }
        
        if (paymentType === 'cuotas') {
          // Para 3 cuotas de $475 - usar subscriptionId
          console.log('🔄 Configurando para suscripción (cuotas)')
          paymentConfig.paymentType = 'subscription'
          paymentConfig.subscriptionId = subscriptionId
        } else {
          // Para pago único de $1,225 - usar paymentIntentId
          console.log('🔄 Configurando para pago único')
          paymentConfig.paymentType = 'one_time'
          paymentConfig.paymentIntentId = paymentIntentId
        }

        console.log('📋 Configuración final para ONVO:', paymentConfig)
        
        const onvoPayment = window.onvo.pay({
          ...paymentConfig,
          onSuccess: (data) => {
            console.log('✅ Pago exitoso:', data)
            
            // Tracking
            if (typeof gtag !== 'undefined') {
              gtag('event', 'purchase', {
                transaction_id: data.subscription_id || data.id,
                value: amount / 100,
                currency: 'USD',
                items: [{
                  item_id: 'ciplad-subscription',
                  item_name: productName,
                  category: 'Education',
                  quantity: 1,
                  price: amount / 100
                }]
              })
            }

            // Redirigir a página de éxito
            window.location.href = `/payment/success?subscription=${data.subscription_id || data.id}&type=${paymentType}`
          },
          onError: (error) => {
            console.error('❌ Error en pago:', error)
            setError(`Error procesando el pago: ${error.message || error}`)
            setIsLoading(false)
          },
          onCancel: () => {
            console.log('⏹️ Pago cancelado por el usuario')
            setError('Pago cancelado')
            setIsLoading(false)
          }
        })

        // Renderizar el widget
        try {
          onvoPayment.render('#onvo-payment-container')
          console.log('✅ Widget de ONVO renderizado exitosamente')
        } catch (error) {
          console.error('❌ Error renderizando widget:', error)
          setError('Error cargando formulario de pago')
          setIsLoading(false)
        }
      }
      
    } catch (error) {
      console.error('Error:', error)
      setError(error.message || 'Error procesando el pago')
      setIsLoading(false)
    }
  }

  const productData = getProductData()

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      {/* Header del formulario */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#01174D] to-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-3">
          <FaCreditCard className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {productData.installments}
        </h3>
        <p className="text-2xl font-bold text-[#01174D] mb-1">
          {productData.displayPrice}
        </p>
        {paymentType === 'cuotas' && (
          <p className="text-sm text-gray-500">
            3 pagos automáticos - Se cancela automáticamente
          </p>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={handlePayment} className="space-y-4">
        {/* Nombre completo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            value={paymentForm.fullName}
            onChange={(e) => setPaymentForm(prev => ({...prev, fullName: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-all"
            placeholder="Tu nombre completo"
            required
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={paymentForm.email}
            onChange={(e) => setPaymentForm(prev => ({...prev, email: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-all"
            placeholder="tu@email.com"
            required
            disabled={isLoading}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            value={paymentForm.phone}
            onChange={(e) => setPaymentForm(prev => ({...prev, phone: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-all"
            placeholder="+506 8888-8888"
            required
            disabled={isLoading}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Container para el widget de ONVO */}
        <div id="onvo-payment-container" className="min-h-[200px] border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="text-center text-gray-500 text-sm">
            {isLoading ? 'Cargando sistema de pagos...' : 'El formulario de tarjeta aparecerá aquí'}
          </div>
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
          disabled={isLoading || !isOnvoReady}
          className={`w-full py-3 px-4 rounded-lg font-bold text-base flex items-center justify-center space-x-2 transition-all duration-300 ${
            isLoading || !isOnvoReady
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#01174D] to-[#1e3a8a] hover:from-[#000d2b] hover:to-[#01174D] transform hover:scale-105 shadow-lg'
          } text-white`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Procesando...</span>
            </>
          ) : !isOnvoReady ? (
            <span>Cargando sistema de pagos...</span>
          ) : (
            <>
              <FaLock />
              <span>Iniciar {paymentType === 'cuotas' ? 'Suscripción' : 'Pago'}</span>
            </>
          )}
        </button>

        {/* Información de seguridad */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
            <FaLock className="text-green-500" />
            <span>Pago 100% seguro y encriptado</span>
          </div>
          <p className="text-xs text-gray-400">
            Powered by ONVO Payments • SSL Certificate • PCI Compliant
          </p>
        </div>
      </form>

      {/* Información importante */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-sm text-gray-900 mb-2">
          ℹ️ Información Importante
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {paymentType === 'cuotas' ? (
            <>
              <li>• Los pagos se procesarán automáticamente cada mes</li>
              <li>• Después de 3 pagos, la suscripción termina automáticamente</li>
              <li>• Recibirás confirmación por email de cada transacción</li>
            </>
          ) : (
            <>
              <li>• Pago único sin recurrencias</li>
              <li>• Acceso completo inmediato al programa</li>
              <li>• Confirmación instantánea por email</li>
            </>
          )}
          <li>• Soporte 24/7 disponible para cualquier consulta</li>
        </ul>
      </div>
    </div>
  )
}

export default OnvoPaymentSubscription