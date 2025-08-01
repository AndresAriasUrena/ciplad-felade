// src/app/components/SimplePaymentSection.js
'use client'

import { useState } from 'react'
import OnvoPaymentSubscription from './payment/OnvoPaymentSubscription'
import { FaCheckCircle } from 'react-icons/fa'

const SimplePaymentSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('cuotas')

  const plans = {
    cuotas: {
      name: '3 Cuotas Mensuales',
      price: '$475 USD',
      description: 'Pago automático mensual',
      features: [
        'Acceso inmediato al programa',
        'Pagos automáticos cada mes',
        'Se cancela automáticamente después de 3 pagos',
        'Sin compromisos adicionales'
      ],
      savings: false,
      popular: true
    },
    completo: {
      name: 'Pago Completo',
      price: '$1,225 USD',
      originalPrice: '$1,425',
      description: 'Pago único con descuento',
      features: [
        'Acceso completo inmediato',
        'Ahorra $200 USD',
        'Sin pagos recurrentes',
        'Certificación completa'
      ],
      savings: '$200 USD de ahorro',
      popular: false
    }
  }

  return (
    <section id="payment" className="py-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            Elige tu Plan de Pago
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Flexibilidad total para que puedas certificarte sin comprometer tu presupuesto
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            {/* Plan de Cuotas */}
            <div 
              className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedPlan === 'cuotas' 
                  ? 'bg-gradient-to-br from-[#01174D] to-[#1e3a8a] text-white shadow-xl transform scale-105' 
                  : 'bg-white hover:shadow-lg border-2 border-gray-200 hover:border-[#01174D]'
              }`}
              onClick={() => setSelectedPlan('cuotas')}
            >
              {plans.cuotas.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    🔥 Más Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{plans.cuotas.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold">{plans.cuotas.price}</span>
                  <span className={`text-base ${selectedPlan === 'cuotas' ? 'text-blue-100' : 'text-gray-500'}`}> /mes</span>
                </div>
                <p className={`text-sm ${selectedPlan === 'cuotas' ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plans.cuotas.description}
                </p>
              </div>

              <ul className="space-y-2 mb-4">
                {plans.cuotas.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className={`text-sm ${selectedPlan === 'cuotas' ? 'text-green-300' : 'text-green-500'}`} />
                    <span className={`text-sm ${selectedPlan === 'cuotas' ? 'text-blue-100' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedPlan === 'cuotas' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[#01174D] text-white'
                }`}>
                  {selectedPlan === 'cuotas' ? '✓ Seleccionado' : 'Seleccionar Plan'}
                </div>
              </div>
            </div>

            {/* Plan Completo */}
            <div 
              className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedPlan === 'completo' 
                  ? 'bg-gradient-to-br from-[#01174D] to-[#1e3a8a] text-white shadow-xl transform scale-105' 
                  : 'bg-white hover:shadow-lg border-2 border-gray-200 hover:border-[#01174D]'
              }`}
              onClick={() => setSelectedPlan('completo')}
            >
              {plans.completo.savings && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    💰 {plans.completo.savings}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{plans.completo.name}</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`text-base line-through ${selectedPlan === 'completo' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {plans.completo.originalPrice}
                    </span>
                    <span className="text-3xl font-bold">{plans.completo.price}</span>
                  </div>
                </div>
                <p className={`text-sm ${selectedPlan === 'completo' ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plans.completo.description}
                </p>
              </div>

              <ul className="space-y-2 mb-4">
                {plans.completo.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className={`text-sm ${selectedPlan === 'completo' ? 'text-green-300' : 'text-green-500'}`} />
                    <span className={`text-sm ${selectedPlan === 'completo' ? 'text-blue-100' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedPlan === 'completo' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[#01174D] text-white'
                }`}>
                  {selectedPlan === 'completo' ? '✓ Seleccionado' : 'Seleccionar Plan'}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Pago - Ahora más ancho para 2 columnas */}
          <div className="max-w-4xl mx-auto">
            <OnvoPaymentSubscription 
              paymentType={selectedPlan}
              productName="Certificación Internacional CIPLAD"
            />
          </div>
        </div>

        {/* Garantías - Más compacta */}
        <div className="max-w-3xl mx-auto mt-6">
          <div className="grid md:grid-cols-3 gap-3 text-center">
            <div className="p-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaCheckCircle className="text-green-600 text-base" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-xs">Garantía 7 Días</h4>
              <p className="text-gray-600 text-xs">
                Si no estás satisfecho, te devolvemos el 100% de tu dinero
              </p>
            </div>
            
            <div className="p-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 text-sm">
                🔒
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-xs">Pago Seguro</h4>
              <p className="text-gray-600 text-xs">
                Encriptación SSL y certificación PCI para máxima seguridad
              </p>
            </div>
            
            <div className="p-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 text-sm">
                ⚡
              </div>
              <h4 className="font-bold text-gray-900 mb-1 text-xs">Acceso Inmediato</h4>
              <p className="text-gray-600 text-xs">
                Comienza tu certificación tan pronto se confirme el pago
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimplePaymentSection