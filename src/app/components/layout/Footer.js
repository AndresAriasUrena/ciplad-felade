'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const certificationLinks = [
    { name: 'CIPLAD', href: 'https://ciplad.felade.com' },
    { name: 'CIMAR', href: 'https://cimar.felade.com' },
    { name: 'CIBCA', href: 'https://cibca.felade.com' },
    { name: 'Todas las Certificaciones', href: 'https://felade.com/certificaciones' },
  ]

  const supportLinks = [
    { name: 'Foro WCF', href: 'https://worldcomplianceforum.com' },
    { name: 'Ayuda & FAQ', href: 'https://felade.com/faq' },
    { name: 'Contacto', href: 'https://felade.com/contacto' },
    { name: 'Talleres', href: 'https://felade.com/certificaciones' },
    { name: 'Certificaciones', href: 'https://felade.com/certificaciones' },
  ]

  const quickLinks = [
    { name: 'Sobre Nosotros', href: 'https://felade.com/sobre-nosotros' },
    { name: 'Servicios', href: 'https://felade.com/servicios' },
    { name: 'Países y Alianzas', href: 'https://felade.com/paises' },
    { name: 'Preguntas Frecuentes', href: 'https://felade.com/faq' },
    { name: 'Contacto', href: 'https://felade.com/contacto' },
  ]

  const legalLinks = [
    { name: 'Términos y condiciones', href: 'https://felade.com/terminos' },
    { name: 'Política de Privacidad', href: 'https://felade.com/privacidad' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/feladeorg' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://x.com/feladeorg' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/company/felade/' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/feladeorg/' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://www.youtube.com/@felade9152' }
  ]

  // Países con presencia regional - Orden: USA, México, Rep. Dominicana, Centroamérica, Sudamérica
  const countries = [
    { code: 'us', name: 'Estados Unidos' },
    { code: 'mx', name: 'México' },
    { code: 'do', name: 'República Dominicana' },
    { code: 'gt', name: 'Guatemala' },
    { code: 'sv', name: 'El Salvador' },
    { code: 'hn', name: 'Honduras' },
    { code: 'cr', name: 'Costa Rica' },
    { code: 'pa', name: 'Panamá' },
    { code: 'co', name: 'Colombia' },
    { code: 'ec', name: 'Ecuador' },
    { code: 'pe', name: 'Perú' },
    { code: 'cl', name: 'Chile' },
    { code: 'ar', name: 'Argentina' }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Efecto de fondo con patrón */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Contenido Principal */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo FELADE y Universidad para la Paz */}
            <div>
              {/* Logo FELADE en blanco */}
              <div className="mb-8">
                <div className="max-w-[280px] relative">
                  <Image
                    src="/images/logoblanco.png"
                    alt="FELADE Logo"
                    width={200}
                    height={90}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>

              {/* Logo UPAZ */}
              <div className="pt-6 border-t border-gray-600">
                <div className="w-full max-w-[240px] relative">
                  <Image
                    src="/images/upaz-logo-white.png"
                    alt="Universidad para la Paz"
                    width={200}
                    height={70}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Soporte */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Soporte</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contáctanos */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contáctanos</h4>
              
              {/* Dirección Estados Unidos */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 mb-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1 text-sm flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-white font-medium">1401 Brickell Ave Suite 330</p>
                    <p className="text-gray-300">Miami, Florida 33131</p>
                    <p className="text-gray-300">Estados Unidos</p>
                  </div>
                </div>
              </div>

              {/* Dirección Costa Rica */}
              <div className="mb-6">
                <div className="flex items-start space-x-3 mb-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1 text-sm flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-white font-medium">Forum Santa Ana Edificio A piso 3</p>
                    <p className="text-gray-300">Santa Ana, San José</p>
                    <p className="text-gray-300">Costa Rica</p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-blue-400 text-xs flex-shrink-0" />
                  <span className="text-gray-300">+1 (407) 670-4022</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-blue-400 text-xs flex-shrink-0" />
                  <Link 
                    href="mailto:info@felade.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    info@felade.com
                  </Link>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <IconComponent className="text-gray-300 group-hover:text-white transition-colors" size={16} />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Suscríbete a nuestro boletín informativo</h4>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Suscribirse
                </button>
              </form>

              <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                Recibe las últimas noticias sobre certificaciones y programas de capacitación.
              </p>
            </div>
          </div>
        </div>

        {/* Celebración del 20° Aniversario */}
        {/* <div className="relative z-10 border-t border-gray-600">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 backdrop-blur-sm rounded-full px-8 py-4 border border-yellow-400/30">
                <div className="text-yellow-400">🎉</div>
                <span className="text-yellow-400 font-semibold text-lg">
                  Celebrando 20 años de excelencia educativa
                </span>
                <div className="text-yellow-400">🎉</div>
              </div>
              <p className="text-gray-300 text-sm mt-4 max-w-2xl mx-auto">
                Desde 2005, FELADE ha formado a más de 10,000 profesionales en prevención del lavado de activos 
                y financiamiento del terrorismo en toda Latinoamérica.
              </p>
            </div>
          </div>
        </div> */}

        {/* Presencia Regional */}
        <div className="relative z-10 border-t border-gray-600">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Presencia Regional</h3>
              <p className="text-gray-400 text-sm">Países donde FELADE tiene presencia activa</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="group relative"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer overflow-hidden">
                    <img 
                      src={`https://flagcdn.com/24x18/${country.code}.png`}
                      alt={`Bandera de ${country.name}`}
                      className="w-8 h-6 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {country.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="relative z-10 border-t border-gray-600">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                Copyright © {currentYear} <span className="text-blue-400">FELADE</span>, All Rights Reserved.
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer