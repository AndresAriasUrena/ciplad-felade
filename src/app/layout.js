// src/app/layout.js
import './globals.css';
import { Poppins, Montserrat } from 'next/font/google';
import Link from 'next/link';
import MetaPixel from '../app/components/tracking/MetaPixel';

// Configuración de fuentes con next/font
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'FELADE - Certificación Internacional en Prevención del Lavado de Activos',
    template: '%s | FELADE',
  },
  description: 'Certifícate en Prevención del Lavado de Activos y Delitos (CIPLAD) con aval académico de la Universidad para la Paz de Naciones Unidas.',
  keywords: ['FELADE', 'CIPLAD', 'Lavado de Activos', 'LC/FT/FPADM', 'Certificación Internacional'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ciplad.felade.org/',
    site_name: 'FELADE - CIPLAD',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans text-gray-800 antialiased">
      <MetaPixel />
        {children}
        <footer className="bg-primary-light text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} FELADE. Todos los derechos reservados.</p>
            <div className="mt-2">
              <Link href="/privacidad" className="text-sm text-gray-300 hover:text-white mx-2">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-gray-300 hover:text-white mx-2">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </footer>
        
        {/* Scripts de analítica (condicional) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Script de Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
            
            {/* Script de Facebook Pixel */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}