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
- Configured for static export (`output: 'export'`)
- Generates static files in `/out` directory
- API routes require server environment (will not work in static export)

## Architecture

### Framework & Configuration
- **Next.js 15.3.1** with App Router
- **Static Export** configuration for hosting
- **Tailwind CSS** with custom FELADE branding
- **React 19** with modern hooks

### Payment Integration
- **Primary:** ONVO Pay (Costa Rican payment platform)
- **Unused:** Stripe dependencies present but not implemented
- **Support:** SINPE Móvil transfers and credit cards
- **Plans:** Single payment ($1,225) or 3-installment plan ($475 each)

### API Architecture (`/src/app/api/`)
```
/api/onvo/config/           # GET - ONVO public key
/api/onvo/create-subscription/  # POST - Payment processing  
/api/webhook/onvo/          # POST - Webhook handler
```

**Key Environment Variables:**
- `NEXT_PUBLIC_ONVO_PUBLIC_KEY` - Client-side ONVO key
- `ONVO_SECRET_KEY` - Server-side ONVO key  
- `ONVO_PRICE_ID_3_CUOTAS` - Installment plan price ID
- `ONVO_PRICE_ID_FULLPAY` - Single payment price ID
- `ONVO_WEBHOOK_SECRET` - Webhook validation

### Component Structure
```
/src/app/components/
├── landing/              # Landing page sections
├── payment/              # Payment components (OnvoPayment*)
├── tracking/             # Analytics (MetaPixel)
├── common/               # Reusable UI components
└── whatsapp/            # WhatsApp page components
```

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

### Working with Payments
- Payment forms are in `OnvoPaymentSubscription.js`
- Test with ONVO sandbox environment first
- Webhook testing requires ngrok or similar tunnel
- Customer deduplication handled automatically by API

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

- **Production Deployment:** Requires server environment for API routes
- **Analytics:** Meta Pixel and Google Analytics configured for production
- **Email System:** Placeholder implementation (extend with Mailgun/SendGrid)
- **Certification Program:** 4-month duration, 6 academic credits, UN Peace University accredited
- **Target Audience:** Latin American compliance professionals