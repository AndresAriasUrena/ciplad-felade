// src/app/api/onvo/config/route.js
import { NextResponse } from 'next/server'

// Configuración para permitir que esta ruta funcione con APIs
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_ONVO_PUBLIC_KEY
    
    // Diagnóstico completo de variables de entorno
    console.log('🔍 DIAGNÓSTICO COMPLETO DE VARIABLES DE ENTORNO:')
    console.log('- NEXT_PUBLIC_ONVO_PUBLIC_KEY existe:', !!publicKey)
    console.log('- NEXT_PUBLIC_ONVO_PUBLIC_KEY preview:', publicKey ? publicKey.substring(0, 30) + '...' : 'UNDEFINED')
    console.log('- ONVO_SECRET_KEY existe:', !!process.env.ONVO_SECRET_KEY)
    console.log('- ONVO_PRODUCT_ID_3_CUOTAS existe:', !!process.env.ONVO_PRODUCT_ID_3_CUOTAS)
    console.log('- ONVO_PRODUCT_ID_FULLPAY existe:', !!process.env.ONVO_PRODUCT_ID_FULLPAY)
    console.log('- ONVO_PRICE_ID_CUOTAS existe:', !!process.env.ONVO_PRICE_ID_CUOTAS)
    console.log('- ONVO_PRICE_ID_FULLPAY existe:', !!process.env.ONVO_PRICE_ID_FULLPAY)
    console.log('- NEXT_PUBLIC_ONVO_PRICE_ID_CUOTAS existe:', !!process.env.NEXT_PUBLIC_ONVO_PRICE_ID_CUOTAS)
    console.log('- NEXT_PUBLIC_ONVO_PRICE_ID_FULLPAY existe:', !!process.env.NEXT_PUBLIC_ONVO_PRICE_ID_FULLPAY)

    if (!publicKey) {
      console.error('❌ NEXT_PUBLIC_ONVO_PUBLIC_KEY no configurada')
      return NextResponse.json(
        { 
          error: 'Configuración de pago no disponible',
          debug: 'NEXT_PUBLIC_ONVO_PUBLIC_KEY missing'
        },
        { status: 500 }
      )
    }

    // Flexible validation - allow both test and live keys
    const isValidKey = publicKey.startsWith('onvo_test_publishable_key_') || 
                      publicKey.startsWith('onvo_live_publishable_key_') ||
                      publicKey.startsWith('pk_test_') ||
                      publicKey.startsWith('pk_live_')

    if (!isValidKey) {
      console.error('❌ Public key inválida - formato no reconocido:', publicKey?.substring(0, 20))
      return NextResponse.json(
        { 
          error: 'Configuración de pagos inválida',
          debug: `Invalid key format: ${publicKey?.substring(0, 20)}...`
        },
        { status: 500 }
      )
    }

    const environment = publicKey.includes('test') ? 'sandbox' : 'live'
    console.log('✅ Public key válida enviada al frontend, environment:', environment)
    
    return NextResponse.json({
      publicKey: publicKey,
      success: true,
      environment: environment
    })

  } catch (error) {
    console.error('❌ Error obteniendo configuración ONVO:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        debug: error.message
      },
      { status: 500 }
    )
  }
}