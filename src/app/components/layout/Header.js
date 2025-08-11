'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/felade-logo.png"
              alt="FELADE"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <Link href="https://felade.com/sobre-nosotros" target="_blank" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sobre Nosotros
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                Certificaciones
                <FaChevronDown className="ml-1 text-xs" />
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="https://ciplad.felade.com" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  CIPLAD
                </Link>
                <Link href="https://cimar.felade.com" target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  CIMAR
                </Link>
                <Link href="https://cibca.felade.com" target="_blank" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  CIBCA
                </Link>
              </div>
            </div>
            <Link href="https://felade.com/contacto" target="_blank" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contacto
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/#inscripciones"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Inscríbete Ahora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link
                href="https://felade.com/sobre-nosotros"
                target="_blank"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </Link>
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Certificaciones
                  <FaChevronDown className={`text-xs transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      href="https://ciplad.felade.com"
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={closeMenu}
                    >
                      CIPLAD
                    </Link>
                    <Link
                      href="https://cimar.felade.com"
                      target="_blank"
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={closeMenu}
                    >
                      CIMAR
                    </Link>
                    <Link
                      href="https://cibca.felade.com"
                      target="_blank"
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={closeMenu}
                    >
                      CIBCA
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="https://felade.com/contacto"
                target="_blank"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Contacto
              </Link>
              <Link
                href="/#inscripciones"
                className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                onClick={closeMenu}
              >
                Inscríbete Ahora
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header