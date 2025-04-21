// src/components/common/Button.js
"use client"; // Marcador para componente cliente

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  animateScale = true,
  isSubmitting = false
}) => {
  
  const baseStyles = "font-bold rounded-lg shadow-lg focus:outline-none transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-secondary text-dark hover:bg-secondary-light",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };
  
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg"
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthStyle} 
        ${className}
      `}
      whileHover={animateScale ? { scale: 1.05 } : {}}
      whileTap={animateScale ? { scale: 0.95 } : {}}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </div>
      ) : children}
    </motion.button>
  );
};

export default Button;