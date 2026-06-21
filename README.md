# Vento Cafe

A bilingual, mobile-first coffee lifestyle site for a couple-built business serving Valencia and Los Guayos, Carabobo.

## Phase 1 Features

- Spanish-first experience with a persistent EN/ES language toggle
- WhatsApp ordering at `+58 424-9726415`
- Valencia and Los Guayos delivery messaging and trust signals
- Responsive product catalogue with safe, uncropped packaging presentation
- Founder-led storytelling and lifestyle gallery using all founder photos
- Floating desktop WhatsApp action and sticky mobile order bar
- Pago Movil and Binance payment information
- Mobile quick-payment terminal at `/pay`
- SEO metadata, Open Graph data, local-business schema, sitemap, and robots

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Project Structure

```text
app/                 Routes, metadata, sitemap, and global styles
components/          Reusable UI, language state, safe images, and payment UI
data/                Bilingual copy, products, lifestyle images, and site settings
lib/                 WhatsApp URL helper
public/founders/     Founder photography
public/products/     Product photography
styles/              Shared animation styles
```

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Business Settings

Update `data/site.ts` to change:

- WhatsApp number
- Instagram handle and URL
- Delivery location
- Production website URL

Edit `data/translations.ts` for bilingual content and `data/products.ts` for catalogue details.

The QR blocks in `/pay` are clearly marked placeholders. Replace `QrPlaceholder` in `components/QuickPay.tsx` with the final Pago Movil and Binance QR images before accepting live payments.

## Vercel Deployment

1. Push changes to `main` in `ZeroZenx/Vento-Cafe`.
2. Import or reconnect the repository in Vercel.
3. Keep the framework preset as Next.js and use the default build command.
4. Confirm the production domain, then update `websiteUrl` in `data/site.ts`, `app/robots.ts`, and `app/sitemap.ts` if the domain differs.

Vercel automatically rebuilds the production site after each push to `main` when Git integration is enabled.

## Scope

Phase 1 intentionally uses WhatsApp ordering and simple scan-to-pay guidance. It does not include a database, login, cart, payment gateway, or automated checkout.
