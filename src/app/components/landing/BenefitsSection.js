// src/components/landing/BenefitsSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import BrevoFormEmbed from './BrevoFormEmbed';

const BenefitCard = ({ icon, title, description, isHighlighted = false }) => {
  return (
    <div className={`flex items-start p-4 ${isHighlighted ? 'bg-gray-50 rounded-lg' : ''}`}>
      <div className="text-green-600 text-xl mr-3 mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaCheckCircle />,
      title: "Clase Gratuita 1:",
      description: "El Mundo Está Cambiando: ¿Estás Preparado para Detectar Riesgos? Aprenderás el contexto global del crimen financiero y por qué la prevención es vital hoy."
    },
    {
      icon: <FaCheckCircle />,
      title: "Clase Gratuita 2:",
      description: "Errores Fatales en Compliance y Cómo una Auditoría Interna los Previene. Descubrirás las herramientas que todo auditor o responsable debería usar."
    },
    {
      icon: <FaCheckCircle />,
      title: "Clase Gratuita 3:",
      description: "De Teoría a Acción: Cómo Convertirte en un Profesional Certificado en Prevención de Lavado. Conocerás las oportunidades laborales y habilidades necesarias."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="registro">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            En estas clases gratuitas aprenderás:
          </h2>
        </motion.div>
        
        {/* Cambiando la estructura para un mejor layout */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cambiando a un diseño de 2 columnas en vez de 3 para dar más espacio al formulario */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Columna 1: Formulario de Registro - Ahora con más espacio */}
            <motion.div 
              className="lg:border-r border-gray-200 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-gray-50 p-4 h-full flex flex-col justify-center">
                {/* Título para el formulario */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-primary">
                    Reserva tu lugar ahora y recibe acceso exclusivo a estas 3 clases gratuitas
                  </h3>
                </div>
                
                {/* Componente de formulario con altura flexible */}
                <BrevoFormEmbed className="w-full" />
              </div>
            </motion.div>
            
            {/* Columna 2: Beneficios y Gráfico - Combinados en una columna */}
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Beneficios */}
              <div className="mb-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <BenefitCard 
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    isHighlighted={index === 0}
                  />
                ))}
              </div>
              
              {/* Imagen */}
              <div className="relative w-full h-[20rem]">
                <Image
                  src="/images/ciplad-graphic.png"
                  alt="Certificación CIPLAD"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;