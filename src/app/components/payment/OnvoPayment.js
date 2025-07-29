// src/components/payment/ONVOPayment.js
'use client'

import { useState, useEffect } from 'react'
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa'

const ONVOPayment = ({ 
  amount = 1225, 
  currency = 'USD',
  productName = 'Certificación CIPLAD',
  paymentType = 'full', // 'full' o 'installment'
  onSuccess,
  onError,
  onCancel 
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    email: '',
    fullName: '',
    phone: '',
    country: '',
    paymentMethod: 'card'
  })

  // Configuración ONVO (estos valores vendrán de variables de entorno)
  const onvoConfig = {
    merchantId: process.env.NEXT_PUBLIC_ONVO_MERCHANT_ID || 'FELADE_MERCHANT',
    apiKey: process.env.NEXT_PUBLIC_ONVO_API_KEY || 'demo_key',
    environment: process.env.NEXT_PUBLIC_ONVO_ENV || 'sandbox', // 'sandbox' o 'production'
    currency: currency,
    language: 'es'
  }

  // URLs de ONVO según el entorno
  const onvoUrls = {
    sandbox: 'https://sandbox-api.onvopayments.com',
    production: 'https://api.onvopayments.com'
  }

  const baseUrl = onvoUrls[onvoConfig.environment]

  // Datos del producto según el tipo de pago
  const getProductData = () => {
    if (paymentType === 'installment') {
      return {
        amount: 475.00,
        description: `${productName} - Cuota 1 de 3`,
        installments: {
          total: 3,
          current: 1,
          amount: 475.00
        }
      }
    }
    
    return {
      amount: amount,
      description: productName,
      installments: null
    }
  }

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Validar formulario
  const validateForm = () => {
    const { email, fullName, phone, country } = paymentForm
    
    if (!email || !email.includes('@')) {
      throw new Error('Email válido es requerido')
    }
    
    if (!fullName || fullName.length < 3) {
      throw new Error('Nombre completo es requerido')
    }
    
    if (!phone || phone.length < 8) {
      throw new Error('Teléfono válido es requerido')
    }
    
    if (!country) {
      throw new Error('País es requerido')
    }
    
    return true
  }

  // Crear transacción con ONVO
  const createTransaction = async () => {
    const productData = getProductData()
    
    const transactionData = {
      merchant_id: onvoConfig.merchantId,
      amount: productData.amount,
      currency: onvoConfig.currency,
      description: productData.description,
      customer: {
        email: paymentForm.email,
        name: paymentForm.fullName,
        phone: paymentForm.phone,
        country: paymentForm.country
      },
      product: {
        name: productName,
        description: productData.description,
        category: 'education',
        sku: `CIPLAD-${paymentType.toUpperCase()}`
      },
      payment_methods: [paymentForm.paymentMethod],
      redirect_urls: {
        success: `${window.location.origin}/payment/success`,
        cancel: `${window.location.origin}/payment/cancel`,
        error: `${window.location.origin}/payment/error`
      },
      webhook_url: `${window.location.origin}/api/webhook/onvo`,
      metadata: {
        program: 'CIPLAD',
        payment_type: paymentType,
        installment_info: productData.installments
      }
    }

    try {
      const response = await fetch(`${baseUrl}/v1/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${onvoConfig.apiKey}`,
          'X-Merchant-ID': onvoConfig.merchantId
        },
        body: JSON.stringify(transactionData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error creating transaction')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('ONVO Transaction Error:', error)
      throw error
    }
  }

  // Procesar pago
  const handlePayment = async (e) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      // Validar formulario
      validateForm()
      
      // Crear transacción
      const transaction = await createTransaction()
      
      // Verificar que se recibió la URL de pago
      if (!transaction.payment_url) {
        throw new Error('No se recibió URL de pago válida')
      }

      // Tracking para analytics
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
          value: getProductData().amount,
          currency: currency,
          content_name: productName,
          content_category: 'Education'
        })
      }

      if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
          currency: currency,
          value: getProductData().amount,
          items: [{
            item_id: 'CIPLAD',
            item_name: productName,
            category: 'Education',
            quantity: 1,
            price: getProductData().amount
          }]
        })
      }

      // Redirigir a ONVO para completar el pago
      window.location.href = transaction.payment_url
      
    } catch (error) {
      console.error('Payment Error:', error)
      
      if (onError) {
        onError(error)
      } else {
        alert(`Error en el pago: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const productData = getProductData()

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
      {/* Header del formulario */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-[#01174D] to-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCreditCard className="text-white text-2xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Finalizar Inscripción
        </h3>
        <p className="text-gray-600">
          {productData.description}
        </p>
        <div className="text-3xl font-bold text-[#01174D] mt-4">
          {currency} ${productData.amount.toLocaleString()}
        </div>
        {paymentType === 'installment' && (
          <p className="text-sm text-gray-500 mt-2">
            Primera cuota de 3 • Sin intereses
          </p>
        )}
      </div>

      {/* Formulario de datos */}
      <form onSubmit={handlePayment} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={paymentForm.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        {/* Nombre completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={paymentForm.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-colors"
            placeholder="Juan Pérez González"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={paymentForm.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-colors"
            placeholder="+506 1234-5678"
          />
        </div>

        {/* País */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            País *
          </label>
          <select
            id="country"
            name="country"
            value={paymentForm.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01174D] focus:border-transparent transition-colors"
          >
            <option value="">Selecciona tu país</option>
            <option value="CR">Costa Rica</option>
            <option value="MX">México</option>
            <option value="CO">Colombia</option>
            <option value="PE">Perú</option>
            <option value="PA">Panamá</option>
            <option value="GT">Guatemala</option>
            <option value="SV">El Salvador</option>
            <option value="HN">Honduras</option>
            <option value="NI">Nicaragua</option>
            <option value="DO">República Dominicana</option>
            <option value="US">Estados Unidos</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>

        {/* Método de pago */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Método de Pago
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentForm.paymentMethod === 'card'}
                onChange={handleInputChange}
                className="text-[#01174D] focus:ring-[#01174D] mr-3"
              />
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-400" />
                <span>Tarjeta de Crédito/Débito</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="transfer"
                checked={paymentForm.paymentMethod === 'transfer'}
                onChange={handleInputChange}
                className="text-[#01174D] focus:ring-[#01174D] mr-3"
              />
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">🏦</span>
                <span>Transferencia Bancaria</span>
              </div>
            </label>
          </div>
        </div>

        {/* Botón de pago */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#01174D] to-[#1e3a8a] hover:from-[#000d2b] hover:to-[#01174D] transform hover:scale-105 shadow-lg'
          } text-white`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <FaLock />
              <span>Pagar Seguro</span>
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

      {/* Política de reembolso */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-sm text-gray-900 mb-2">
          🛡️ Garantía de Satisfacción
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          Si no estás completamente satisfecho con el programa durante los primeros 7 días, 
          te reembolsamos el 100% de tu dinero sin preguntas.
        </p>
      </div>
    </div>
  )
}

export default ONVOPayment