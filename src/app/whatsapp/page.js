// src/app/whatsapp/page.js
"use client"; // Marcador para componente cliente

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
// import ConfirmationVisual from '../../components/whatsapp/ConfirmationVisual';

const WhatsAppPage = () => {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Número de WhatsApp para contacto (reemplazar con el número real)
  const whatsappNumber = "+50640001400";
  
  // Mensaje predefinido para WhatsApp
  const whatsappMessage = encodeURIComponent(
    "Hola, acabo de registrarme para las clases gratuitas de CIPLAD y me gustaría recibir más información."
  );
  
  // URL de WhatsApp con el mensaje
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  useEffect(() => {
    // Recuperar datos del lead desde localStorage
    try {
      const storedData = localStorage.getItem('leadData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setLeadData(parsedData);
      }
    } catch (error) {
      console.error('Error al recuperar datos del lead:', error);
    }
    
    // Registrar evento de conversión si estamos en producción
    if (process.env.NODE_ENV === 'production') {
      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead');
      }
      
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
          'value': 1.0,
          'currency': 'USD'
        });
      }
    }
  }, []);
  
  // Extraer el primer nombre para personalización
  const firstName = leadData.name ? leadData.name.split(' ')[0] : 'allí';
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image 
              src="/images/logoblanco.png" 
              alt="FELADE" 
              width={120} 
              height={30} 
            />
            <div className="h-6 w-px bg-white bg-opacity-40"></div>
            <Image 
              src="/images/upaz-logo-white.png" 
              alt="Universidad para la Paz ONU" 
              width={120} 
              height={30} 
            />
          </div>
        </div>
      </div>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cabecera Verde de Éxito */}
            <div className="bg-green-600 text-white p-6 flex items-center">
              <FaCheckCircle className="text-4xl mr-4" />
              <div>
                <h1 className="text-2xl font-bold">¡Registro Completado con Éxito!</h1>
                <p className="text-green-100">Tu lugar está reservado para las clases gratuitas</p>
              </div>
            </div>
            
            {/* Contenido Principal */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                ¡Gracias {firstName}!
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Hemos confirmado tu registro para las <strong>clases gratuitas</strong> que se llevarán a cabo los días <strong>21, 22 y 23 de Mayo</strong>.
              </p>
              
              {/* Componente visual de confirmación */}
              {/* <ConfirmationVisual /> */}
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 mt-6">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Importante: Próximos pasos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Pronto recibirás un email con los detalles de acceso a las clases.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Añade los días 21, 22 y 23 de Mayo a tu calendario para no perderte ninguna clase.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Prepara tus preguntas para aprovechar al máximo la interacción con los expertos.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">
                  ¿Tienes preguntas o necesitas ayuda?
                </h3>
                <p className="text-gray-700 mb-4">
                  Nuestro equipo está listo para asistirte. Puedes contactarnos directamente por WhatsApp para resolver cualquier duda que tengas sobre las clases gratuitas o la certificación CIPLAD.
                </p>
              </div>
              
              {/* Botón de WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300"
                >
                  <FaWhatsapp className="text-2xl mr-3" />
                  <span className="text-lg">Contáctanos por WhatsApp</span>
                </a>
              </motion.div>
              
              {/* Recordatorio de fechas */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  No olvides que las clases gratuitas serán el 21, 22 y 23 de Mayo.
                </p>
                <Link href="/" className="text-primary hover:text-primary-light font-medium inline-block mt-2">
                  Volver a la página principal
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      {/* <footer className="bg-primary-light text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FELADE. Todos los derechos reservados.</p>
          <div className="mt-2">
            <Link href="/privacidad" className="text-sm text-gray-300 hover:text-white mx-2">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-sm text-gray-300 hover:text-white mx-2">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </footer> */}
    </main>
  );
};

export default WhatsAppPage;