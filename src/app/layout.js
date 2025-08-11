// src/app/layout.js
import './globals.css';
import { Poppins, Montserrat } from 'next/font/google';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
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
    url: 'https://ciplad.felade.com/',
    site_name: 'FELADE - CIPLAD',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-sans text-gray-800 antialiased">
        <MetaPixel />
        {/* <Header /> */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}