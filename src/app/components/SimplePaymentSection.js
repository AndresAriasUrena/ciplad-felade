// src/components/SimplePaymentSection.js
'use client'

import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

// Configuración de productos - ESTOS LINKS LOS DEBES CREAR EN EL DASHBOARD DE ONVO
const PAYMENT_PRODUCTS = {
  full: {
    name: 'Pago Completo',
    price: 'USD $1,225',
    description: 'Un solo pago',
    // IMPORTANTE: Reemplazar con el link real de tu dashboard ONVO
    link: 'https://checkout.onvopay.com/pay/REEMPLAZAR-CON-LINK-REAL', 
    benefits: [
      'Acceso completo al programa',
      'Certificado físico y digital', 
      'Material de estudio descargable',
      'Acceso vitalicio al contenido'
    ]
  },
  installments: {
    name: 'Plan de Cuotas',
    price: '3 × USD $475',
    description: 'Sin intereses',
    // IMPORTANTE: Este debe ser un link a una SUSCRIPCIÓN, no un pago único
    link: 'https://checkout.onvopay.com/pay/REEMPLAZAR-CON-SUSCRIPCION-LINK',
    benefits: [
      'Acceso inmediato al programa',
      'Sin intereses adicionales',
      'Cuotas automáticas mensuales',
      'Recordatorios automáticos'
    ]
  }
}

export default function SimplePaymentSection() {
  const [selectedPlan, setSelectedPlan] = useState('full')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.country

  const handlePayment = (planType) => {
    if (!isFormValid) {
      alert('Por favor completa todos los campos')
      return
    }

    const product = PAYMENT_PRODUCTS[planType]
    
    // Tracking para analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: planType === 'full' ? 1225 : 475,
        items: [{
          item_id: 'CIPLAD',
          item_name: 'Certificación CIPLAD',
          category: 'Education',
          quantity: 1,
          price: planType === 'full' ? 1225 : 475
        }]
      })
    }

    // Opcional: Enviar datos a tu sistema antes de redirigir
    console.log('Datos del estudiante:', formData)
    console.log('Plan seleccionado:', planType)
    
    // Guardar datos en localStorage para recuperarlos después del pago
    localStorage.setItem('ciplad_student_data', JSON.stringify({
      ...formData,
      plan: planType,
      timestamp: new Date().toISOString()
    }))

    // Redirigir al checkout de ONVO
    window.location.href = product.link
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#01174D] to-[#1e3a8a] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Inversión en tu Futuro Profesional
          </h2>
          <p className="text-lg text-blue-200">
            Facilidades de pago diseñadas para que puedas acceder a la mejor capacitación
          </p>
        </div>

        {/* Formulario de datos básicos */}
        <div className="max-w-md mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Información Básica</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo *"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono *"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" className="text-gray-900">Selecciona tu país *</option>
              <option value="CR" className="text-gray-900">🇨🇷 Costa Rica</option>
              <option value="MX" className="text-gray-900">🇲🇽 México</option>
              <option value="CO" className="text-gray-900">🇨🇴 Colombia</option>
              <option value="PE" className="text-gray-900">🇵🇪 Perú</option>
              <option value="PA" className="text-gray-900">🇵🇦 Panamá</option>
              <option value="GT" className="text-gray-900">🇬🇹 Guatemala</option>
              <option value="SV" className="text-gray-900">🇸🇻 El Salvador</option>
              <option value="HN" className="text-gray-900">🇭🇳 Honduras</option>
              <option value="NI" className="text-gray-900">🇳🇮 Nicaragua</option>
              <option value="DO" className="text-gray-900">🇩🇴 República Dominicana</option>
              <option value="US" className="text-gray-900">🇺🇸 Estados Unidos</option>
            </select>
          </div>

          {!isFormValid && (
            <p className="text-yellow-300 text-sm mt-4 text-center">
              * Todos los campos son obligatorios
            </p>
          )}
        </div>

        {/* Opciones de pago */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Object.entries(PAYMENT_PRODUCTS).map(([key, product]) => (
            <div 
              key={key}
              className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-300 hover:bg-white/15 ${
                selectedPlan === key ? 'border-yellow-400' : 'border-white/20'
              }`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                  key === 'full' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {key === 'full' ? '💰 Mejor Valor' : '💳 Más Popular'}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">{product.price}</div>
                <p className="text-blue-200 mb-6">{product.description}</p>
                
                <div className="space-y-3 text-left mb-8">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePayment(key)}
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    !isFormValid
                      ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                      : key === 'full'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 shadow-xl'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 shadow-xl'
                  }`}
                >
                  {!isFormValid ? 'Completa tus datos' : 'Proceder al Pago'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Información sobre cuotas automáticas */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              📋 ¿Cómo funciona el Plan de Cuotas?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">1️⃣</div>
                <h4 className="font-bold mb-2">Pago Inicial</h4>
                <p className="text-sm text-blue-200">
                  Paga USD $475 y accede inmediatamente al programa
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">2️⃣</div>
                <h4 className="font-bold mb-2">Cuotas Automáticas</h4>
                <p className="text-sm text-blue-200">
                  2 cuotas adicionales de $475 cada una, procesadas automáticamente cada mes
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">3️⃣</div>
                <h4 className="font-bold mb-2">Sin Complicaciones</h4>
                <p className="text-sm text-blue-200">
                  Recibes recordatorios antes de cada cobro. Puedes cancelar en cualquier momento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Métodos de pago aceptados */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold mb-6">Métodos de Pago Aceptados</h3>
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <span className="text-2xl">💳</span>
              <div className="text-xs text-gray-600 mt-1">Tarjetas</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <span className="text-2xl">📱</span>
              <div className="text-xs text-gray-600 mt-1">SINPE Móvil</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <span className="text-2xl">🏦</span>
              <div className="text-xs text-gray-600 mt-1">Transferencia</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <span className="text-2xl">🔐</span>
              <div className="text-xs text-gray-600 mt-1">ONVO Pay</div>
            </div>
          </div>
          <p className="text-blue-200 text-sm">
            🔒 Pagos 100% seguros y encriptados procesados por ONVO Pay
          </p>
        </div>
      </div>
    </section>
  )
}