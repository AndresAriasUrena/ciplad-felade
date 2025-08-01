// src/app/payment/success/page.js
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaDownload, FaCalendarAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Obtener datos del pago desde los parámetros de URL
    const subscriptionId = searchParams.get('subscription')
    const paymentType = searchParams.get('type')
    const isTest = searchParams.get('test')
    
    console.log('📄 Página de éxito cargada:', { subscriptionId, paymentType, isTest })
    
    // Determinar el valor basado en el tipo de pago
    const amount = paymentType === 'cuotas' ? 475 : 1225
    
    if (subscriptionId) {
      // Simular verificación del pago (en producción hacer llamada real)
      setPaymentData({
        subscription_id: subscriptionId,
        payment_type: paymentType,
        is_test: isTest === 'true',
        amount: amount,
        customer_email: 'usuario@ejemplo.com' // En producción obtener del backend
      })
    }

    // Tracking de conversión
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: amount,
        currency: 'USD',
        content_name: 'Certificación CIPLAD',
        content_category: 'Education'
      })
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: subscriptionId,
        value: amount,
        currency: 'USD',
        items: [{
          item_id: 'CIPLAD',
          item_name: 'Certificación CIPLAD',
          category: 'Education',
          quantity: 1,
          price: amount
        }]
      })
    }
    
    setIsLoading(false)
  }, [searchParams])

  const verifyPayment = async (transactionId) => {
    try {
      const response = await fetch(`/api/verify-payment?transaction_id=${transactionId}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentData(data.payment)
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01174D] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando tu pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 w-auto relative">
            <Image
              src="/images/felade-logo.png"
              alt="FELADE"
              width={150}
              height={40}
              className="object-contain h-full w-auto"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mensaje de éxito principal */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-white text-4xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ¡Inscripción Exitosa!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Bienvenido a la Certificación CIPLAD
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              🎉 Tu lugar está reservado en el próximo grupo
            </div>
            
            {paymentData?.is_test && (
              <div className="mt-4 inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">
                🧪 Pago simulado exitoso - En producción se procesará con ONVO Pay
              </div>
            )}
            
            {paymentData && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Plan seleccionado: <strong>
                    {paymentData.payment_type === 'cuotas' ? '3 Cuotas de $475 USD' : 'Pago Completo $1,225 USD'}
                  </strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ID de suscripción: {paymentData.subscription_id}
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Información del programa */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Detalles de tu Certificación
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🎓
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Programa</h3>
                    <p className="text-gray-600">Certificación Internacional CIPLAD</p>
                    <p className="text-sm text-gray-500">Prevención del Lavado de Activos y Delitos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Inicio</h3>
                    <p className="text-gray-600">15 de Agosto, 2025</p>
                    <p className="text-sm text-gray-500">Miércoles 5:30 PM - 8:30 PM (Costa Rica)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🌍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Modalidad</h3>
                    <p className="text-gray-600">100% Virtual</p>
                    <p className="text-sm text-gray-500">Plataforma Zoom + Campus Virtual</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Aval Académico</h3>
                    <p className="text-gray-600">Universidad para la Paz (UPAZ)</p>
                    <p className="text-sm text-gray-500">6 créditos universitarios</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos pasos */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Próximos Pasos
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#01174D] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Revisa tu email
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Te hemos enviado un correo con todos los detalles de tu inscripción y las instrucciones para acceder.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <FaEnvelope />
                      <span>Enviado a: {paymentData?.customer_email || 'tu@email.com'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#01174D] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Únete al grupo de WhatsApp
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Conéctate con tus compañeros y recibe actualizaciones importantes del programa.
                    </p>
                    <a 
                      href="https://wa.me/+50612345678" 
                      className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors space-x-2"
                    >
                      <FaWhatsapp />
                      <span>Unirse al Grupo</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#01174D] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Descarga la guía de inicio
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Prepárate para el programa con nuestra guía completa que incluye cronograma, materiales y requisitos técnicos.
                    </p>
                    <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors space-x-2">
                      <FaDownload />
                      <span>Descargar Guía PDF</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#01174D] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Prepara tu espacio de estudio
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Asegúrate de tener una conexión estable a internet y un espacio cómodo para las clases virtuales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="bg-gradient-to-r from-[#01174D] to-[#1e3a8a] text-white rounded-3xl p-8 mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-blue-200 mb-6">
                Nuestro equipo de soporte está disponible para ayudarte
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:soporte@felade.com"
                  className="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-colors space-x-2"
                >
                  <FaEnvelope />
                  <span>soporte@felade.com</span>
                </a>
                
                <a 
                  href="https://wa.me/+50612345678"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-colors space-x-2"
                >
                  <FaWhatsapp />
                  <span>+506 1234-5678</span>
                </a>
              </div>
            </div>
          </div>

          {/* Botón para volver al inicio */}
          <div className="text-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}