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
    <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header Compacto */}
      <header className="bg-white shadow-sm py-2">
        <div className="container mx-auto px-4 flex justify-center">
          <Image
            src="/images/felade-logo.png"
            alt="FELADE"
            width={120}
            height={30}
            className="object-contain"
          />
        </div>
      </header>

      {/* Contenido Principal - Flex-1 para usar todo el espacio disponible */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="max-w-6xl w-full">
          
          {/* Mensaje de Éxito Principal - Más Compacto */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              ¡Inscripción Exitosa!
            </h1>
            <p className="text-lg text-gray-600 mb-3">
              Bienvenido a la Certificación CIPLAD
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
              🎉 Tu lugar está reservado en el próximo grupo
            </div>
            
            {paymentData?.is_test && (
              <div className="mt-3 inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs">
                🧪 Pago simulado exitoso
              </div>
            )}
            
            {paymentData && (
              <div className="mt-3 text-center">
                <p className="text-gray-600 text-sm">
                  Plan: <strong>
                    {paymentData.payment_type === 'cuotas' ? '3 Cuotas de $475 USD' : 'Pago Completo $1,225 USD'}
                  </strong>
                </p>
              </div>
            )}
          </div>

          {/* Grid Principal - Optimizado para una sola fila en desktop */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Detalles del Programa - Compacto */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Tu Certificación
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🎓
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">CIPLAD Internacional</h3>
                    <p className="text-xs text-gray-600">Prevención de Lavado de Activos</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-blue-600 text-xs" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Inicio: 15 Agosto</h3>
                    <p className="text-xs text-gray-600">Miércoles 5:30-8:30 PM (CR)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Aval UPAZ (ONU)</h3>
                    <p className="text-xs text-gray-600">6 créditos universitarios</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos Pasos - Compacto */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Próximos Pasos
              </h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#01174D] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Revisa tu email
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      Recibirás los detalles de acceso
                    </p>
                    <div className="text-xs text-blue-600">
                      📧 {paymentData?.customer_email || 'tu@email.com'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#01174D] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Únete al grupo
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Conecta con compañeros
                    </p>
                    <a 
                      href="https://wa.me/+50612345678" 
                      className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs space-x-1"
                    >
                      <FaWhatsapp className="text-xs" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#01174D] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      Descarga guía
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Prepárate para el programa
                    </p>
                    <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs space-x-1">
                      <FaDownload className="text-xs" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacto y Soporte - Compacto */}
            <div className="bg-gradient-to-br from-[#01174D] to-[#1e3a8a] text-white rounded-2xl p-4">
              <h2 className="text-lg font-bold mb-4 text-center">
                ¿Necesitas Ayuda?
              </h2>
              
              <div className="text-center mb-4">
                <p className="text-blue-200 text-sm mb-4">
                  Nuestro equipo está disponible para apoyarte
                </p>
                
                <div className="space-y-2">
                  <a 
                    href="mailto:soporte@felade.com"
                    className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    📧 soporte@felade.com
                  </a>
                  
                  <a 
                    href="https://wa.me/+50612345678"
                    className="block bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    📱 +506 1234-5678
                  </a>
                </div>
              </div>

              {/* Garantías */}
              <div className="border-t border-white/20 pt-3">
                <div className="text-center space-y-1">
                  <div className="text-xs text-blue-200">
                    ✅ Garantía 7 días
                  </div>
                  <div className="text-xs text-blue-200">
                    🔒 Pago 100% seguro
                  </div>
                  <div className="text-xs text-blue-200">
                    ⚡ Acceso inmediato
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Compacto */}
          <div className="text-center mt-6">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}