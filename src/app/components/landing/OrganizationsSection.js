// src/components/landing/OrganizationsSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const OrganizationCard = ({ logo, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-80 h-48 relative mb-6">
          <Image
            src={logo}
            alt={title}
            fill
            style={{ objectFit: 'contain' }}
            className='w-full'
          />
        </div>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const OrganizationsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Respaldado por Organizaciones de Prestigio Internacional
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Formación con los más altos estándares de calidad y reconocimiento global
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <OrganizationCard 
            logo="/images/felade-logo.png"
            title="FELADE"
            description="ONG internacional enfocada en prevención de lavado de activos con presencia en 10 países. Dedicada a la formación de profesionales y al fortalecimiento de sistemas de prevención en toda Latinoamérica."
            delay={0.1}
          />
          
          <OrganizationCard 
            logo="/images/upaz-logo.png"
            title="Universidad para la Paz (ONU)"
            description="Institución académica de la ONU con más de 2,000 graduados de 100+ países. Establecida por la Asamblea General de las Naciones Unidas para promover el espíritu de comprensión, tolerancia y coexistencia pacífica."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default OrganizationsSection;