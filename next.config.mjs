// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
    output: 'export', // Para exportación estática
    reactStrictMode: true,
    images: {
      unoptimized: true, // Necesario para exportación estática
      domains: [
        'assets.brevo.com',
        'localhost',
        'felade.org',
        'ciplad.felade.org',
      ],
    },
  };
  
  export default nextConfig;