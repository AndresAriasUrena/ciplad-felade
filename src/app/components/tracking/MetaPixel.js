// src/components/tracking/MetaPixel.js
"use client";

import { useEffect } from 'react';

export default function MetaPixel() {
  useEffect(() => {
    // Código para Meta Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Reemplaza TUMETAPIXELID con tu ID real de Meta Pixel
    fbq('init', 'TUMETAPIXELID');
    fbq('track', 'PageView');
    
    // Limpieza al desmontar
    return () => {
      // No es necesario limpiar el píxel de Facebook
    };
  }, []);
  
  return null;
}