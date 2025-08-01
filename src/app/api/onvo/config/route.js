// src/app/api/onvo/config/route.js
import { NextResponse } from 'next/server'

// Configuración para permitir que esta ruta funcione con APIs
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_ONVO_PUBLIC_KEY
    
    console.log('🔍 Verificando configuración ONVO:')
    console.log('- Public Key existe:', !!publicKey)
    console.log('- Public Key válida:', publicKey?.startsWith('onvo_test_publishable_key_'))
    console.log('- Public Key preview:', publicKey?.substring(0, 30) + '...')

    if (!publicKey) {
      console.error('❌ NEXT_PUBLIC_ONVO_PUBLIC_KEY no configurada en .env.local')
      return NextResponse.json(
        { error: 'Configuración de pago no disponible' },
        { status: 500 }
      )
    }

    if (!publicKey.startsWith('onvo_test_publishable_key_')) {
      console.error('❌ Public key inválida - debe empezar con onvo_test_publishable_key_')
      return NextResponse.json(
        { error: 'Configuración de pagos inválida' },
        { status: 500 }
      )
    }

    console.log('✅ Public key válida enviada al frontend')
    
    return NextResponse.json({
      publicKey: publicKey,
      success: true,
      environment: 'sandbox'
    })

  } catch (error) {
    console.error('❌ Error obteniendo configuración ONVO:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}