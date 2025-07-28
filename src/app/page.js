// src/app/page.js
import HeroSection from './components/landing/HeroSection';
import BenefitsSection from './components/landing/BenefitsSection';
import ExpertSection from './components/landing/ExpertSection';
import OrganizationsSection from './components/landing/OrganizationsSection';
import SecondFormSection from './components/landing/SecondFormSection';
import TestimonialsSection from './components/landing/TestimonialsSection';

export const metadata = {
  title: 'Clases Gratuitas: Prevención del Lavado de Activos y Delitos',
  description: 'Domina los principios clave de la prevención del lavado de activos y conoce las herramientas que usan los profesionales para proteger a empresas del crimen financiero.',
  openGraph: {
    title: 'Clases Gratuitas en Prevención de Lavado de Activos | FELADE',
    description: '3 clases gratuitas con expertos internacionales. Aprende los principios clave y herramientas profesionales en prevención de LC/FT/FPADM.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clases Gratuitas en Prevención de Lavado de Activos',
      }
    ],
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <ExpertSection />
      <TestimonialsSection />
      <OrganizationsSection />
      <SecondFormSection />
    </main>
  );
}