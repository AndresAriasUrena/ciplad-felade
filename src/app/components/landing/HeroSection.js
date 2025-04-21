// src/components/landing/HeroSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-primary-light to-primary py-12 md:py-20 relative overflow-hidden">
      {/* Fondo con overlay azul */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary opacity-70"></div>
        <Image
          src="/images/hero-background.png"
          alt="Fondo"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="mix-blend-overlay"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Logos con línea divisoria vertical */}
        <div className="flex justify-center items-center mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-end w-1/2 pr-6">
            <Image
              src="/images/logoblanco.png"
              alt="FELADE"
              width={250}
              height={75}
              style={{ objectFit: 'contain' }}
            />
          </div>
          
          {/* Línea divisoria vertical */}
          <div className="h-16 w-px bg-white bg-opacity-40"></div>
          
          <div className="flex items-center justify-start w-1/2 pl-6">
            <Image
              src="/images/upaz-logo-white.png"
              alt="Universidad para la Paz (ONU)"
              width={250}
              height={75}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {/* Hero Content */}
          <motion.div 
            className="w-full max-w-4xl text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Domina los principios clave de la prevención del lavado de activos
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium mb-8 max-w-3xl mx-auto">
              Conoce las herramientas que usan los profesionales para proteger a empresas del crimen financiero en 3 clases gratuitas con expertos reconocidos internacionalmente.
            </h2>
            <h3 className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto text-gray-200">
              3 clases: 21, 22 y 23 de Mayo <br/> Evento <strong>Online</strong> y <strong>sin costo.</strong>
            </h3>
            
            <motion.a
              href="#registro"
              className="bg-secondary text-primary font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-secondary-light transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reserva tu lugar ahora
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;