// src/app/page.js - Página principal de ventas CIPLAD
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShieldAlt, FaClock, FaGlobe, FaUsers, FaCertificate, FaChevronDown, FaWhatsapp, FaEnvelope, FaCheckCircle } from 'react-icons/fa'

import SimplePaymentSection from './components/SimplePaymentSection'

export default function CipladSalesPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  })

  // Contador regresivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <header className="bg-gradient-to-r from-[#01174D] to-[#1e3a8a] shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="h-10 w-auto relative">
              <Image
                src="/images/logoblanco.png"
                alt="FELADE"
                width={150}
                height={40}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">¿Necesitas ayuda?</span>
              <a 
                href="https://wa.me/+50612345678" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#01174D] via-[#1e3a8a] to-[#2563eb] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido Principal */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FaCertificate className="text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Certificación Internacional</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Certificación</span>
                <span className="block text-yellow-400">CIPLAD</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-4 font-light leading-relaxed">
                Prevención del Lavado de Activos y Delitos
              </p>
              
              <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                Con aval académico de la <strong>Universidad para la Paz de Naciones Unidas</strong>
              </p>

              {/* Contador de urgencia */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">⏰ Próximo inicio en:</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-white/20 rounded-lg p-3">
                      <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                      <div className="text-sm opacity-80 capitalize">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Principal */}
              <div className="space-y-4">
                <button className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  🚀 Inscríbete Ahora - USD $1,225
                </button>
                <p className="text-sm text-blue-200">
                  💳 Disponible en 3 cuotas de USD $475 c/u
                </p>
              </div>
            </div>

            {/* Imagen/Visual */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                    🛡️
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Programa Destacado</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-yellow-400 flex-shrink-0" />
                      <span>4 meses de duración</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaGlobe className="text-yellow-400 flex-shrink-0" />
                      <span>100% en línea</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCertificate className="text-yellow-400 flex-shrink-0" />
                      <span>6 créditos académicos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUsers className="text-yellow-400 flex-shrink-0" />
                      <span>Reconocimiento internacional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información del Programa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Qué incluye la Certificación CIPLAD?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un programa integral diseñado para profesionales que buscan especializarse en la prevención del lavado de activos y delitos financieros
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Contenido Actualizado",
                description: "Marcos regulatorios internacionales más recientes y casos de estudio reales"
              },
              {
                icon: "🎯",
                title: "Enfoque Práctico", 
                description: "Herramientas y metodologías aplicables directamente en tu trabajo diario"
              },
              {
                icon: "🌍",
                title: "Reconocimiento Global",
                description: "Certificación válida en más de 10 países de Latinoamérica"
              },
              {
                icon: "👨‍🏫",
                title: "Expertos Internacionales",
                description: "Profesores con experiencia en organismos reguladores y banca internacional"
              },
              {
                icon: "🤝",
                title: "Networking",
                description: "Acceso a una red de más de 17,000 profesionales certificados"
              },
              {
                icon: "🏆",
                title: "Aval Académico",
                description: "Respaldo de la Universidad para la Paz de Naciones Unidas"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan de Estudios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Plan de Estudios
            </h2>
            <p className="text-lg text-gray-600">
              6 módulos comprensivos que te convertirán en un experto en AML/FT
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  module: "Módulo 1",
                  title: "Fundamentos del Lavado de Activos",
                  topics: ["Conceptos básicos", "Tipologías criminales", "Impacto económico global"]
                },
                {
                  module: "Módulo 2", 
                  title: "Marco Regulatorio Internacional",
                  topics: ["FATF/GAFI", "Legislación por países", "Sanciones internacionales"]
                },
                {
                  module: "Módulo 3",
                  title: "Detección de Operaciones Sospechosas",
                  topics: ["Señales de alerta", "Análisis de transacciones", "Reportes regulatorios"]
                },
                {
                  module: "Módulo 4",
                  title: "Implementación de Programas de Compliance",
                  topics: ["Políticas y procedimientos", "Capacitación del personal", "Auditorías internas"]
                },
                {
                  module: "Módulo 5",
                  title: "Tecnología y Nuevas Amenazas",
                  topics: ["Fintech y criptoactivos", "Cibercrimen", "Inteligencia artificial en AML"]
                },
                {
                  module: "Módulo 6",
                  title: "Casos Prácticos y Evaluación Final",
                  topics: ["Estudios de caso reales", "Simulaciones", "Proyecto de certificación"]
                }
              ].map((module, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#01174D] to-[#1e3a8a] text-white p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-yellow-400 font-semibold">{module.module}</span>
                        <h3 className="text-xl font-bold mt-1">{module.title}</h3>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                        {index + 1}️⃣
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros graduados
            </h2>
            <p className="text-lg text-gray-600">
              Más de 17,000 profesionales han transformado sus carreras con CIPLAD
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Oficial de Cumplimiento - Banco Nacional",
                country: "🇨🇷 Costa Rica",
                testimonial: "CIPLAD me dio las herramientas necesarias para implementar un programa AML efectivo en mi institución. El conocimiento adquirido es invaluable."
              },
              {
                name: "Carlos Rodríguez",
                role: "Gerente de Riesgo - Grupo Financiero",
                country: "🇲🇽 México", 
                testimonial: "La certificación CIPLAD es reconocida internacionalmente. Me abrió puertas en el mercado financiero regional."
              },
              {
                name: "Ana Morales",
                role: "Consultora en Compliance",
                country: "🇵🇪 Perú",
                testimonial: "El programa es muy completo y actualizado. Los profesores son expertos con experiencia real en el sector."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600 mt-1">{testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué FELADE */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir FELADE?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    number: "20+",
                    label: "Años de experiencia",
                    description: "Desde 2005 capacitando profesionales en AML/FT"
                  },
                  {
                    number: "10+", 
                    label: "Países con presencia",
                    description: "Cobertura en toda Latinoamérica y Estados Unidos"
                  },
                  {
                    number: "17,774+",
                    label: "Profesionales certificados",
                    description: "Una red global de expertos en compliance"
                  },
                  {
                    number: "1,324+",
                    label: "Empresas confían en nosotros",
                    description: "Instituciones financieras y corporativas de primer nivel"
                  }
                ].map((stat, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#01174D] to-[#1e3a8a] text-white rounded-xl p-4 min-w-[80px] text-center">
                      <div className="text-xl font-bold">{stat.number}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{stat.label}</h3>
                      <p className="text-gray-600">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8">
                <div className="mb-6">
                  <Image
                    src="/images/upaz-logo.png"
                    alt="Universidad para la Paz - UPAZ"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Alianza Estratégica
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuestra certificación cuenta con el aval académico de la 
                  <strong> Universidad para la Paz de Naciones Unidas</strong>, 
                  garantizando la calidad y reconocimiento internacional del programa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inversión y Facilidades de Pago */}
      {/* <section className="py-16 bg-gradient-to-br from-[#01174D] to-[#1e3a8a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Inversión en tu Futuro Profesional
            </h2>
            <p className="text-lg text-blue-200">
              Facilidades de pago diseñadas para que puedas acceder a la mejor capacitación
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  💰 Mejor Valor
                </div>
                <h3 className="text-2xl font-bold mb-2">Pago Completo</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">USD $1,225</div>
                <p className="text-blue-200 mb-6">Un solo pago</p>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Acceso completo al programa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Certificado físico y digital</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Material de estudio descargable</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Acceso vitalicio al contenido</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300">
                  Pagar Ahora
                </button>
              </div>
            </div>

            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  💳 Más Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Plan de Cuotas</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">3 × USD $475</div>
                <p className="text-blue-200 mb-6">Total: USD $1,425</p>
                
                <div className="bg-white/10 rounded-2xl p-4 mb-6">
                  <div className="text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1ra cuota (al inscribirse):</span>
                      <span className="font-bold">USD $475</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2da cuota (mes 2):</span>
                      <span className="font-bold">USD $475</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3ra cuota (mes 3):</span>
                      <span className="font-bold">USD $475</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Sin intereses adicionales</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Acceso inmediato al programa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>Recordatorios automáticos</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300">
                  Elegir Plan de Cuotas
                </button>
              </div>
            </div>
          </div>

          
          <div className="text-center mt-12">
            <h3 className="text-xl font-bold mb-6">Métodos de Pago Aceptados</h3>
            <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <span className="text-2xl">💳</span>
                <div className="text-xs text-gray-600 mt-1">Tarjetas</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <span className="text-2xl">🏦</span>
                <div className="text-xs text-gray-600 mt-1">Transferencia</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <span className="text-2xl">💰</span>
                <div className="text-xs text-gray-600 mt-1">PayPal</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <span className="text-2xl">🔐</span>
                <div className="text-xs text-gray-600 mt-1">ONVO Pay</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              🔒 Pagos 100% seguros y encriptados
            </p>
          </div>
        </div>
      </section> */}

      <SimplePaymentSection />

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Resolvemos las dudas más comunes sobre la certificación CIPLAD
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-[#01174D] to-[#1e3a8a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Carrera?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Únete a más de 17,000 profesionales que han potenciado sus carreras con la certificación CIPLAD. 
            El próximo grupo inicia en <strong>15 días</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-xl">
              🚀 Inscríbete Ahora
            </button>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-yellow-400">USD $1,225</div>
              <div className="text-sm text-blue-200">o 3 cuotas de $475</div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400" />
              <span>Certificación Internacional</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400" />
              <span>Aval Académico UPAZ</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400" />
              <span>6 Créditos Universitarios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="h-8 w-auto relative mb-4">
                <Image
                  src="/images/logoblanco.png"
                  alt="FELADE"
                  width={120}
                  height={32}
                  className="object-contain h-full w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Fundación para el Estudio del Lavado de Activos y Delitos
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaEnvelope />
                  <span>info@felade.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaWhatsapp />
                  <span>+506 1234-5678</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <Link href="/privacidad" className="text-gray-400 hover:text-white block">
                  Política de Privacidad
                </Link>
                <Link href="/terminos" className="text-gray-400 hover:text-white block">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} FELADE. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente FAQ Accordion
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "¿Qué requisitos necesito para inscribirme?",
      answer: "No se requieren conocimientos previos específicos. El programa está diseñado para profesionales de diferentes áreas que deseen especializarse en prevención de lavado de activos y delitos financieros."
    },
    {
      question: "¿Cómo funciona la modalidad en línea?",
      answer: "Las clases son en vivo una vez por semana (miércoles de 5:30 pm a 8:30 pm, hora de Costa Rica). Todas las sesiones quedan grabadas para que puedas revisarlas cuando necesites. También incluye material de estudio descargable."
    },
    {
      question: "¿La certificación tiene validez internacional?",
      answer: "Sí, la certificación CIPLAD cuenta con el aval académico de la Universidad para la Paz de Naciones Unidas y es reconocida en más de 10 países de Latinoamérica y Estados Unidos."
    },
    {
      question: "¿Qué pasa si no puedo asistir a una clase?",
      answer: "No hay problema. Todas las clases quedan grabadas y tienes acceso a ellas durante todo el programa y 6 meses adicionales después de graduarte."
    },
    {
      question: "¿Incluye certificado físico?",
      answer: "Sí, al completar exitosamente el programa recibirás tanto el certificado digital (inmediato) como el certificado físico enviado a tu dirección."
    },
    {
      question: "¿Qué pasa si necesito cancelar mi inscripción?",
      answer: "Ofrecemos una garantía de reembolso del 100% durante los primeros 7 días del programa si no estás completamente satisfecho con el contenido."
    },
    {
      question: "¿Puedo pagar en cuotas?",
      answer: "Sí, ofrecemos un plan de 3 cuotas mensuales de USD $475 cada una, sin intereses adicionales. El pago se procesa automáticamente cada mes."
    },
    {
      question: "¿Qué soporte técnico incluye?",
      answer: "Incluye soporte técnico completo durante todo el programa, acceso a un coordinador académico y un grupo privado de estudiantes para resolver dudas."
    }
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <button
            className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-300 flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
            <FaChevronDown 
              className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 pt-0">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}