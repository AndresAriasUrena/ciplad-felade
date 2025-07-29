// src/lib/onvoPaymentLinks.js - Sistema de Links de Pago

// Configuración de productos CIPLAD
export const cipladProducts = {
  full_payment: {
    name: 'Certificación CIPLAD - Pago Completo',
    description: 'Certificación en Prevención del Lavado de Activos y Delitos',
    price: 122500, // $1,225 en centavos
    currency: 'USD',
    benefits: [
      'Acceso completo al programa',
      'Certificado físico y digital',
      'Material descargable',
      'Acceso vitalicio al contenido'
    ]
  },
  installment_1: {
    name: 'Certificación CIPLAD - Cuota 1 de 3',
    description: 'Primera cuota de la Certificación CIPLAD',
    price: 47500, // $475 en centavos
    currency: 'USD',
    benefits: [
      'Acceso inmediato al programa',
      'Sin intereses adicionales',
      'Cuotas automáticas'
    ]
  }
}

// Función para crear links de pago dinámicamente
export async function createPaymentLink(productKey, customerData) {
  const product = cipladProducts[productKey]
  if (!product) throw new Error('Producto no encontrado')

  const paymentLinkData = {
    customerName: customerData.name,
    customerEmail: customerData.email,
    customerPhone: customerData.phone,
    redirectUrl: `${window.location.origin}/payment/success`,
    cancelUrl: `${window.location.origin}/payment/cancel`,
    lineItems: [{
      // Producto nuevo (inline)
      productData: {
        name: product.name,
        description: product.description,
        isActive: true,
        isShippable: false
      },
      priceData: {
        unitAmount: product.price,
        currency: product.currency,
        type: 'one_time'
      },
      quantity: 1
    }],
    metadata: {
      program: 'CIPLAD',
      payment_type: productKey,
      student_country: customerData.country,
      enrollment_source: 'website_direct'
    }
  }

  try {
    const response = await fetch('https://api.onvopay.com/v1/checkout/sessions/one-time-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ONVO_SECRET_KEY}` // Solo para demo - en prod usar serverless function
      },
      body: JSON.stringify(paymentLinkData)
    })

    const result = await response.json()
    return result.url // URL del link de pago
    
  } catch (error) {
    console.error('Error creando link de pago:', error)
    throw error
  }
}

// Alternativa: Links pre-generados (más simple)
export const preGeneratedLinks = {
  full_payment: 'https://checkout.onvopay.com/pay/ciplad-full-payment-link-id',
  installment_plan: 'https://checkout.onvopay.com/pay/ciplad-installments-link-id'
}

// Componente para botones de pago con links
export function PaymentLinkButton({ 
  productKey, 
  customerData, 
  className = '',
  children 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState(null)

  const handlePayment = async () => {
    if (paymentUrl) {
      // Si ya tenemos la URL, redirigir directamente
      window.location.href = paymentUrl
      return
    }

    try {
      setIsLoading(true)
      
      // Opción 1: Crear link dinámicamente
      const url = await createPaymentLink(productKey, customerData)
      
      // Opción 2: Usar link pre-generado (más simple)
      // const url = preGeneratedLinks[productKey]
      
      setPaymentUrl(url)
      window.location.href = url
      
    } catch (error) {
      alert('Error procesando el pago. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⏳</span>
          Procesando...
        </>
      ) : (
        children
      )}
    </button>
  )
}