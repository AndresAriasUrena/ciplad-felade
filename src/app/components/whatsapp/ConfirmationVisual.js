// src/components/whatsapp/ConfirmationVisual.js
"use client"; // Marcador para componente cliente

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarCheck, FaUserGraduate } from 'react-icons/fa';

const ConfirmationVisual = () => {
  // Animación para el check central
  const checkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };
  
  // Animación para los íconos alrededor
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5
      }
    })
  };
  
  // Fechas de las clases
  const classDates = [
    { day: "21", month: "Mayo", title: "Clase 1" },
    { day: "22", month: "Mayo", title: "Clase 2" },
    { day: "23", month: "Mayo", title: "Clase 3" }
  ];
  
  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      {/* Círculo central con check */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
          <motion.div
            variants={checkVariants}
            initial="hidden"
            animate="visible"
          >
            <FaCheckCircle className="text-green-600 text-6xl" />
          </motion.div>
        </div>
        
        {/* Efecto de onda */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full rounded-full"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [0.8, 1.1, 0.8], 
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            border: '2px solid #10B981',
            zIndex: -1
          }}
        />
      </div>
      
      {/* Fechas de clases */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
        {classDates.map((date, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-primary mb-2">
              <FaCalendarCheck className="text-2xl" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{date.day}</div>
              <div className="text-sm text-gray-600">{date.month}</div>
              <div className="text-xs font-medium text-primary-light mt-1">{date.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Certificación */}
      <motion.div
        className="bg-primary-light text-white p-4 rounded-lg max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-center mb-2">
          <FaUserGraduate className="text-2xl mr-2" />
          <span className="font-bold">Próximamente:</span>
        </div>
        <p>Certificación Internacional en Prevención de Lavado de Activos (CIPLAD)</p>
        <p className="text-sm mt-1">Con aval de la Universidad para la Paz (ONU)</p>
      </motion.div>
    </div>
  );
};

export default ConfirmationVisual;