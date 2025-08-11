# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.1 application for FELADE's CIPLAD certification program - an anti-money laundering (AML) certification funnel. The site uses Spanish language throughout and targets the Costa Rican/Latin American market.

## Commands

**Development:**
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production (static export)
npm start           # Start production server (after build)
npm run lint        # Run ESLint
```

**Build Output:**
- Static export disabled in development to allow API routes
- For production static export, uncomment `output: 'export'` in next.config.mjs
- API routes require server environment and `dynamic = 'force-dynamic'` export

## Architecture

### Framework & Configuration
- **Next.js 15.3.1** with App Router
- **Static Export** configuration for hosting
- **Tailwind CSS** with custom FELADE branding
- **React 19** with modern hooks

### Payment Integration ✅ FULLY IMPLEMENTED
- **Primary:** ONVO Pay (Costa Rican payment platform) - **WORKING**
- **Payment Types:** 
  - Single payment ($1,225 USD) - Uses PaymentIntent API
  - 3 monthly installments ($475 USD each) - Uses Subscriptions API
- **Supported Methods:** Credit cards (Visa, Mastercard, AMEX), SINPE Móvil
- **Test Cards:** 4242424242424242 (success), 4000000000000002 (decline)
- **Status:** Both payment flows fully functional with ONVO SDK integration

### API Architecture (`/src/app/api/`)
```
/api/onvo/config/           # GET - ONVO public key
/api/onvo/create-subscription/  # POST - Payment processing  
/api/webhook/onvo/          # POST - Webhook handler
```

**Key Environment Variables:**
- `NEXT_PUBLIC_ONVO_PUBLIC_KEY` - Client-side ONVO key for SDK
- `ONVO_SECRET_KEY` - Server-side ONVO key for API calls
- `ONVO_PRODUCT_ID_3_CUOTAS` - Backend product ID for subscriptions  
- `ONVO_PRODUCT_ID_FULLPAY` - Backend product ID for single payments
- `NEXT_PUBLIC_ONVO_PRICE_ID_CUOTAS` - Frontend price ID for 3-installment plan
- `NEXT_PUBLIC_ONVO_PRICE_ID_FULLPAY` - Frontend price ID for single payment
- `ONVO_PRICE_ID_CUOTAS` - Backend price ID for subscription creation
- `ONVO_PRICE_ID_FULLPAY` - Backend price ID for payment intent creation
- `ONVO_WEBHOOK_SECRET` - Webhook validation secret

### Component Structure
```
/src/app/components/
├── layout/               # Layout components (Header, Footer)
├── landing/              # Landing page sections (HeroSection, etc.)
├── payment/              # Payment components (OnvoPaymentSubscription - 2-column layout)
├── tracking/             # Analytics (MetaPixel)
├── common/               # Reusable UI components
├── whatsapp/            # WhatsApp page components
└── SimplePaymentSection.js  # Main payment section with plan selection
```

### Layout Components
- **Header.js**: Complete navigation with FELADE branding and certification links
- **Footer.js**: Comprehensive footer with company info, certifications, and regional presence
- **Global Layout**: Updated RootLayout with Header/Footer integration

### UI/UX Features
- **2-Column Payment Form**: Personal info (left) + Payment widget (right)
- **Responsive Design**: Adapts seamlessly from desktop to mobile
- **Visual Hierarchy**: Clear separation between data entry and payment processing
- **Professional Layout**: Enhanced container widths and spacing
- **Hero Background**: Custom background image with gradient overlay
- **Payment Plans**: Visual selection between single payment and installments
- **Direct Access**: `/#inscripciones` URL automatically scrolls to payment section
- **Smooth Scrolling**: CTA buttons smoothly scroll to inscriptions section
- **Professional Header**: Complete navigation with dropdown menus and responsive mobile design
- **Rich Footer**: Multi-column layout with certifications, contact info, social links, and regional presence
- **Global Layout**: Consistent branding across all pages with sticky header and comprehensive footer

### Styling System
- **Tailwind Config:** Custom FELADE colors and utilities
- **Primary Colors:** FELADE blue (#01174D) and gold (#fbbf24)
- **Fonts:** Poppins (body) and Montserrat (display)
- **Custom Classes:** `.gradient-text`, `.glass`, form utilities

### Data Management
- **Payment Logic:** `/src/lib/onvoPaymentLinks.js`
- **Customer Flow:** Registration → Payment → Email notifications → Course access
- **Webhook Events:** Payment success/failure, subscription renewals, mobile transfers

## Development Guidelines

### Working with Payments ✅ FULLY FUNCTIONAL
- **Main Component:** `OnvoPaymentSubscription.js` - Handles both payment types
- **Single Payment Flow:** Creates PaymentIntent → Renders ONVO SDK → Processes card
- **Subscription Flow:** Creates Subscription → Renders ONVO SDK → Processes recurring payments
- **Backend API:** `/api/onvo/create-subscription/` handles both flows automatically
- **Test Environment:** ONVO sandbox with test cards (4242424242424242 for success)
- **Customer Management:** Automatic customer creation and deduplication by email
- **Error Handling:** Comprehensive logging with Spanish error messages
- **Success Redirect:** `/payment/success` with transaction details and next steps

### Styling Conventions
- Use FELADE brand colors consistently
- Responsive design with mobile-first approach
- Spanish language throughout (Costa Rican market)
- Emotion-driven sales copy with urgency elements

### API Development
- All API routes expect JSON payloads
- Implement proper error handling with Spanish messages
- Log events with emoji prefixes for easy debugging
- Validate webhook signatures for security

### Content Management
- Main sales page: `/src/app/page.js`
- Success page: `/src/app/payment/success/page.js`
- WhatsApp redirect: `/src/app/whatsapp/page.js`

## Important Notes

- **API Routes:** All API routes have `export const dynamic = 'force-dynamic'` for Next.js compatibility
- **Development:** Static export disabled to allow API functionality  
- **Production Deployment:** **Vercel** (recommended for API routes compatibility)
- **Domain:** Configured for `ciplad.felade.com` production domain
- **ONVO Integration:** ✅ **FULLY IMPLEMENTED AND TESTED**
  - Single payments ($1,225) via PaymentIntent API
  - Recurring payments (3x $475) via Subscriptions API
  - Complete customer lifecycle management
  - Real-time webhook processing
  - ONVO SDK integration with dynamic loading
- **Analytics:** Meta Pixel and Google Analytics configured for production
- **Email System:** Placeholder implementation (extend with Mailgun/SendGrid)
- **Certification Program:** 4-month duration, 6 academic credits, UN Peace University accredited
- **Target Audience:** Latin American compliance professionals

## Production Deployment (Vercel)

### Setup Instructions
1. **Connect Repository**: Link GitHub repo to Vercel account
2. **Set Environment Variables** in Vercel dashboard:
   ```bash
   # ONVO Production Keys (replace with live keys)
   NEXT_PUBLIC_ONVO_PUBLIC_KEY=onvo_live_publishable_key_...
   ONVO_SECRET_KEY=onvo_live_secret_key_...
   
   # Product/Price IDs (production values)
   ONVO_PRODUCT_ID_3_CUOTAS=prod_cuotas_id
   ONVO_PRODUCT_ID_FULLPAY=prod_fullpay_id
   NEXT_PUBLIC_ONVO_PRICE_ID_CUOTAS=prod_price_cuotas_id
   NEXT_PUBLIC_ONVO_PRICE_ID_FULLPAY=prod_price_fullpay_id
   ONVO_PRICE_ID_CUOTAS=prod_price_cuotas_id
   ONVO_PRICE_ID_FULLPAY=prod_price_fullpay_id
   
   # Webhook & Site
   ONVO_WEBHOOK_SECRET=whsec_production_secret
   NEXT_PUBLIC_SITE_URL=https://ciplad.felade.com
   
   # Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id
   ```
3. **Domain Configuration**: Set custom domain to `ciplad.felade.com`
4. **Deploy**: Automatic deployment on every push to main branch

### Domain Settings
- **Production URL**: `https://ciplad.felade.com`
- **Image Domains**: Configured for `ciplad.felade.com` and `felade.com`
- **HTTPS**: Automatic SSL/TLS certificate through Vercel

## Troubleshooting

### API Errors
- Ensure `.env.local` has all ONVO environment variables
- For production, update ONVO keys to production values
- API routes return 500 if `dynamic = 'force-dynamic'` is missing

### Build Errors
- **useSearchParams() Suspense**: Fixed with Suspense boundary in success page
- **Next.js 15**: All components compatible with latest version
- **Static Generation**: Success page properly handles URL parameters

### Payment Integration ✅ WORKING
- **ONVO SDK:** Loads dynamically, handles both payment types seamlessly  
- **Test Environment:** Fully configured with ONVO sandbox
- **Test Cards:** 4242424242424242 (success), 4000000000000002 (decline)
- **API Endpoints:** All payment APIs functional with proper error handling
- **Webhook Processing:** Configured for payment events and subscription updates
- **Customer Phone Format:** Automatically formats to Costa Rican standard (+506 8888-8888)
- **Database:** Customer deduplication by email prevents duplicate accounts

### Recent Updates (Aug 2025)
- ✅ Fixed PaymentIntent creation for single payments ($1,225)
- ✅ Fixed Subscription creation for recurring payments (3x $475)  
- ✅ Implemented proper ONVO API schema with priceId instead of productId
- ✅ Added comprehensive logging and error handling throughout payment flow
- ✅ Tested and validated both payment methods with ONVO test cards
- ✅ Success page displays correct payment information and next steps
- ✅ **UI/UX Improvements**: Enhanced payment form with 2-column layout
- ✅ **Layout Optimization**: Expanded container width for better visual balance
- ✅ **Hero Section**: Updated with professional background image and improved structure
- ✅ **Payment Form**: Split into Personal Information and Payment Information sections
- ✅ **Production Ready**: Configured for Vercel deployment at `ciplad.felade.com`
- ✅ **Next.js 15 Compatibility**: Fixed Suspense boundary for useSearchParams in success page
- ✅ **Direct Access**: Added support for `/#inscripciones` hash URL with automatic scroll to payment section
- ✅ **Layout Components**: Added comprehensive Header and Footer components with FELADE branding
- ✅ **Navigation**: Complete site navigation with certification links and responsive mobile menu
- ✅ **Footer Enhancement**: Regional presence map, social links, contact info, and certification links