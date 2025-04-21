// src/components/landing/SecondFormSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaGraduationCap, FaLock, FaClock } from 'react-icons/fa';
import BrevoFormEmbed from './BrevoFormEmbed';

const BenefitItem = ({ icon, text }) => (
  <li className="flex items-start">
    <span className="text-secondary mr-2 mt-1">{icon}</span>
    <span>{text}</span>
  </li>
);

const SecondFormSection = () => {
  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4K\")",
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              No Pierdas Esta Oportunidad Única
            </h2>
            
            <p className="text-xl mb-6">
              Las plazas para esta capacitación gratuita son limitadas y se llenan rápidamente.
            </p>
            
            <ul className="mb-8 space-y-4">
              <BenefitItem 
                icon={<FaCheck />}
                text="3 Clases gratuitas con contenido práctico y aplicable inmediatamente"
              />
              <BenefitItem 
                icon={<FaGraduationCap />}
                text="Acceso a metodologías internacionales de prevención de lavado de activos"
              />
              <BenefitItem 
                icon={<FaLock />}
                text="Contenido exclusivo sobre LC/FT/FPADM no disponible en otros cursos"
              />
              <BenefitItem 
                icon={<FaClock />}
                text="Sesión especial con representantes de la Universidad para la Paz (ONU)"
              />
            </ul>
            
            <div className="p-6 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 mb-6">
              <p className="text-lg font-medium italic">
                "Estas clases gratuitas son solo una muestra del poder transformador de nuestra certificación internacional CIPLAD con aval académico de la Universidad para la Paz de Naciones Unidas"
              </p>
            </div>
          </motion.div>
          
          {/* Form */}
          <motion.div 
            className="w-full md:w-5/12 bg-white rounded-xl shadow-2xl text-gray-800"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="">
              {/* Componente de formulario Brevo */}
              <BrevoFormEmbed className="w-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecondFormSection;