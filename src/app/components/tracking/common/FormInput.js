// src/components/common/FormInput.js
"use client"; // Marcador para componente cliente

import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  required = false,
  className = '',
  autoComplete = 'on'
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block mb-2 text-sm font-medium text-gray-700 text-left"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register}
          autoComplete={autoComplete}
          className={`
            w-full p-3 border rounded-lg shadow-sm
            focus:ring-2 focus:outline-none transition-all duration-200
            ${error 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-primary-light focus:border-primary'}
          `}
        />
        
        {error && (
          <div className="absolute right-3 top-3 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 text-left">{error}</p>
      )}
    </div>
  );
};

export default FormInput;