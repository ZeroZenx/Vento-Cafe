# Vento Cafe

A bilingual, mobile-first product storefront and private inventory workspace for Vento Café & Market in Los Guayos, Carabobo.

## Phase 1 Features

- Spanish-first experience with a persistent EN/ES language toggle
- WhatsApp ordering at `+58 424-9726415`
- Valencia and Los Guayos delivery messaging and trust signals
- Responsive product catalogue with safe, uncropped packaging presentation
- Founder-led storytelling and lifestyle gallery using all founder photos
- Floating desktop WhatsApp action and sticky mobile order bar
- Pago Movil and Binance payment information
- Mobile quick-payment terminal at `/pay`
- Private inventory workspace at `/admin`
- Password-protected product, stock, costing, sales, low-stock, and profit tracking
- PostgreSQL persistence for hosted deployments with a local JSON fallback during development
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

## Private Inventory Setup

Copy `.env.example` to `.env.local` and set:

- `VENTO_ADMIN_PASSWORD`: private admin password
- `VENTO_ADMIN_SESSION_SECRET`: long random session signing secret
- `DATABASE_URL`: PostgreSQL connection string for hosted persistence
- `DATABASE_SSL`: keep `true` for hosted PostgreSQL providers

Open `/admin` to sign in. The public navigation does not expose this route.

The first authenticated inventory request creates the two tables from `db/schema.sql` and seeds the current catalog products with their existing images. New products marked “Show in public catalog” appear on `/products` and the homepage. Cost fields stay private to `/admin`.

Without `DATABASE_URL`, development uses `.data/inventory.json`. Production requires PostgreSQL so sales and stock changes persist across deployments.

## Inventory Calculations

The private workspace calculates:

- Product cost including VAT from the supplier TT$ cost
- Exact USD product cost at the saved exchange rate
- Optional rounded-up USD product cost
- International and inland shipping
- Landed cost per unit
- Retail price and gross profit per unit
- Inventory value, sales revenue, cost of goods, and gross profit

Use stock movements for sales, restocks, and adjustments. Product edits preserve the product record while movement entries provide the sales history.

## Opening Stock Import

Keep shipment source JSON in ignored `.data/opening-stock.json`. Never commit supplier invoices, costs, or credentials. Run the importer with Node.js 22.18 or later:

```bash
node scripts/import-opening-stock.mjs --dry-run --local
node scripts/import-opening-stock.mjs --local
node scripts/import-opening-stock.mjs --remote https://vento-cafe.vercel.app
node --test tests/inventory-costing.test.mjs
```

The remote import signs in with the private `VENTO_ADMIN_PASSWORD` from the environment. Production requires `DATABASE_URL`. The protected import checks each product, preserves existing activity, and uses deterministic opening transaction IDs to prevent duplicate inventory. PostgreSQL imports run in one transaction.

Each shipment keeps its own VAT, exchange-rate and rounding rules. Inland transport allocation preserves fractional cents per unit and rounds totals only after summing. Individual bottles and bundles use separate inventory records so a paired product photo does not double-count stock.
