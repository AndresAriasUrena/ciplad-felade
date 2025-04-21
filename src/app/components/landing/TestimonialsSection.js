// src/components/landing/TestimonialsSection.js
"use client"; // Marcador para componente cliente

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ image, name, position, company, testimonial }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start mb-4">
        <div className="mr-4 relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={image || "/images/testimonial-placeholder.png"}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 className="font-bold text-lg text-primary">{name}</h3>
          <p className="text-gray-600">{position}</p>
          <p className="text-gray-500 text-sm">{company}</p>
        </div>
      </div>
      <div className="relative">
        <FaQuoteLeft className="text-gray-200 text-4xl absolute top-0 left-0 z-0" />
        <p className="text-gray-700 relative z-10 pl-8 pt-2 italic">
          "{testimonial}"
        </p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      image: "/images/testimonial1.png",
      name: "María Torres",
      position: "Oficial de Cumplimiento",
      company: "Banco Internacional",
      testimonial: "La certificación CIPLAD transformó completamente mi enfoque profesional. Los conocimientos adquiridos me permitieron implementar mejoras significativas en los procesos de prevención de mi institución."
    },
    {
      image: "/images/testimonial2.png",
      name: "Carlos Méndez",
      position: "Director de Auditoría",
      company: "Grupo Financiero Regional",
      testimonial: "El respaldo académico de la Universidad para la Paz y la calidad de los instructores hacen de CIPLAD una certificación única en el mercado. Ha sido fundamental para mi desarrollo profesional."
    },
    {
      image: "/images/testimonial3.png",
      name: "Ana Guzmán",
      position: "Consultora en Compliance",
      company: "GRM Consultores",
      testimonial: "Después de completar CIPLAD, mi perspectiva sobre la prevención de lavado de activos cambió radicalmente. Hoy puedo ofrecer soluciones más efectivas a mis clientes gracias a esta formación."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Lo que dicen nuestros graduados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profesionales que han transformado su carrera con nuestra certificación
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <TestimonialCard 
              key={index}
              image={item.image}
              name={item.name}
              position={item.position}
              company={item.company}
              testimonial={item.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;