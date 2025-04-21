// src/components/landing/ExpertSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUniversity, FaAward } from 'react-icons/fa';

const CredentialItem = ({ icon, text }) => (
  <div className="flex items-start mb-3">
    <div className="text-secondary text-xl mr-3 mt-1">{icon}</div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const ExpertSection = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Fondo con overlay azul */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="/images/hero-background.png"
          alt="Fondo"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Expert Image */}
          <motion.div 
            className="w-full md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl mx-auto max-w-sm">
              <Image
                src="/images/expert-placeholder.png"
                alt="Experto en Prevención de Lavado de Activos"
                width={400}
                height={500}
                style={{ objectFit: 'cover' }}
                className="w-full"
              />
            </div>
          </motion.div>
          
          {/* Expert Info */}
          <motion.div 
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl font-bold text-primary mb-2">
              Aprende con Expertos de Reconocimiento Internacional
            </h2>
            
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Profesionales con experiencia real en prevención de lavado de activos
            </h3>
            
            <p className="text-gray-600 mb-6">
              Nuestros instructores combinan años de experiencia práctica con reconocimiento académico internacional, 
              ofreciéndote las mejores herramientas y conocimientos para proteger a tu organización de los riesgos de lavado de activos y financiamiento del terrorismo.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 border border-gray-100">
              <h4 className="text-lg font-bold text-primary mb-4">Ponentes destacados:</h4>
              
              <CredentialItem 
                icon={<FaBriefcase />}
                text="Experiencia en auditoría y compliance en instituciones financieras líderes"
              />
              
              <CredentialItem 
                icon={<FaAward />}
                text="Especialización en prevención de lavado de activos y financiamiento del terrorismo"
              />
              
              <CredentialItem 
                icon={<FaUniversity />}
                text="Expertos con reconocimiento de organismos internacionales"
              />
              
              <CredentialItem 
                icon={<FaAward />}
                text="Docentes de la certificación CIPLAD respaldada por la Universidad para la Paz (ONU)"
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="#registro" 
                className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center"
              >
                <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">✓</span>
                Reserva tu lugar ahora mismo
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;