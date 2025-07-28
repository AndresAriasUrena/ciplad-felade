// src/components/landing/BrevoFormEmbed.js
"use client"; // Marcador para componente cliente

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const BrevoFormEmbed = ({ className, darkMode = false }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(700); // Altura inicial
  const iframeRef = useRef(null);
  
  // URL del formulario de Brevo - Reemplazar con la URL real para CIPLAD
//   const brevoFormUrl = "https://sibforms.com/serve/MUIFAFBRspRbB_21RjyCHxWxwZfrJgeIlwxkDN96f3drQ2myNgpz8PWpSHAmuAVtQuYY_b5hgx1ledQotCTlxVijO_P0k0-ZdBnjfBxBxNIuzspQe7Q8KRJ43kChFfeX0kJOP_NvttN7AZq90m2jKYB2w0t9WsQKBWJgKtlkZuE_E62CH036CL59Vs5Mzq4D0eONbmR_btXjqar3";
  const brevoFormUrl = "https://sibforms.com/serve/MUIFAGmhzOcjaYlisgDq9J_bh6J11pKg5odXmSsKjZ-23oCwjVl0JLQ8FMVrUJne3_Sdb_-D03WlTaLaxFaZVXJW4_IippA76iQ3LD2donOE5-YoTm6mNUmsa9XJDqxDCyulOQZO24Pm_ZPXQMfSjBT6USu2oZMHDzSWONSqOXYWs_lxxrA0uWUa7Z8aR3MeS0lFVdfmeMlpj5f2";
  
  // Manejar mensajes del iframe y ajustar tamaño
  useEffect(() => {
    const handleMessage = (event) => {
      // Verificar si el mensaje viene del iframe de Brevo
      if (event.origin.includes('sibforms.com')) {
        try {
          // Procesar los datos del mensaje
          const data = event.data;
          
          // Si es un evento de formulario exitoso
          if (data && data.type === 'form_success') {
            // Extraer datos del formulario (si están disponibles)
            if (data.formData) {
              const { NOMBRE, EMAIL, SMS, SMS__COUNTRY_CODE } = data.formData;
              
              // Guardar en localStorage
              const leadData = {
                name: NOMBRE || '',
                email: EMAIL || '',
                phone: SMS__COUNTRY_CODE && SMS ? `${SMS__COUNTRY_CODE}${SMS}` : ''
              };
              
              localStorage.setItem('leadData', JSON.stringify(leadData));
            }
            
            // Redirigir a WhatsApp
            setTimeout(() => {
              window.location.href = '/whatsapp';
            }, 1000);
          }
          
          // Si el iframe está cargado, quitar el estado de carga
          if (data && data.type === 'iframe_loaded') {
            setIsLoading(false);
          }
          
          // Ajustar tamaño del iframe si el mensaje incluye la altura
          if (data && data.type === 'resize' && data.height) {
            setIframeHeight(data.height + 80); // Aumentar el margen extra
          }
        } catch (error) {
          console.error('Error procesando mensaje del iframe:', error);
        }
      }
    };
    
    // Añadir listener para mensajes del iframe
    window.addEventListener('message', handleMessage);
    
    // Función para manejar cambios de tamaño de la ventana
    const handleResize = () => {
      // Detectar si es móvil y ajustar la altura
      if (window.innerWidth < 768) {
        setIframeHeight(750); // Más altura en móviles
      } else {
        setIframeHeight(700); // Altura normal en desktop
      }
    };
    
    // Detectar cambios de tamaño de la ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar una vez al inicio
    
    // Función para verificar periódicamente la altura del contenido
    const checkHeight = () => {
      try {
        if (iframeRef.current) {
          // Intentar acceder al iframe (puede fallar por políticas CORS)
          const iframeDoc = iframeRef.current.contentDocument || 
                            (iframeRef.current.contentWindow && iframeRef.current.contentWindow.document);
          
          if (iframeDoc && iframeDoc.body) {
            const scrollHeight = iframeDoc.body.scrollHeight;
            if (scrollHeight > 500) {
              setIframeHeight(scrollHeight + 80);
            }
          }
        }
      } catch (e) {
        // Error CORS - ignorar
      }
    };
    
    // Verificar altura después de que el iframe se cargue
    const timer = setTimeout(checkHeight, 1000);
    const timer2 = setTimeout(checkHeight, 2000); // Segunda verificación
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [router]);
  
  // Estilo del iframe con altura adaptable
  const iframeWrapperStyle = {
    position: 'relative',
    width: '100%',
    height: `${iframeHeight}px`,
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: darkMode ? '#374151' : '#ffffff',
    transition: 'height 0.3s ease',
    marginBottom: '20px', // Agregando margen inferior
  };
  
  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
    overflow: 'hidden', // Evita el scroll interno
  };
  
  // Pantalla de carga mientras el iframe se está cargando
  const loaderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkMode ? '#374151' : '#f9fafb',
    color: darkMode ? '#e5e7eb' : '#374151',
    zIndex: 10,
  };
  
  return (
    <div className={`${className} iframe-container`}>
      {/* Contenedor del iframe con altura ajustable */}
      <div style={iframeWrapperStyle}>
        {isLoading && (
          <div style={loaderStyle}>
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p>Cargando formulario...</p>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={brevoFormUrl}
          style={iframeStyle}
          frameBorder="0"
          scrolling="no" // Cambiado a "no" para evitar doble scroll
          allowFullScreen
          title="Formulario de registro"
          onLoad={() => {
            setIsLoading(false);
            // Intentar enviar un mensaje al iframe para solicitar su altura
            try {
              iframeRef.current.contentWindow.postMessage('getHeight', '*');
            } catch (e) {
              // Ignorar errores CORS
            }
          }}
        ></iframe>
      </div>
      
      {/* Estilos globales inyectados */}
      <style jsx global>{`
        .iframe-container iframe {
          width: 100%;
          min-height: 500px;
        }
        
        @media (max-width: 768px) {
          .iframe-container iframe {
            min-height: 650px;
          }
        }
      `}</style>
    </div>
  );
};

export default BrevoFormEmbed;