# Vento Cafe Website

Premium modern coffee lifestyle website for **Vento Cafe**.
Built with a storytelling-first approach around the real founders and authentic photography.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Fully responsive layout
- SEO-ready metadata + sitemap + robots

## Project Structure

```text
app/
  contact/
  our-coffee/
  our-story/
  globals.css
  layout.tsx
  loading.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  AnimatedInView.tsx
  Footer.tsx
  Hero.tsx
  LifestyleGallery.tsx
  Navbar.tsx
  ProductGrid.tsx
  StorySection.tsx
  WhatsAppCTA.tsx
data/
  lifestyle.ts
  products.ts
  site.ts
  story.ts
lib/
  whatsapp.ts
public/
  founders/
  products/
styles/
  animations.css
```

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Environment & Brand Edits

Update these values in `data/site.ts`:

- `whatsappNumber`
- `instagramUrl`
- `location`

Update SEO base URL in:

- `app/layout.tsx` (`websiteUrl`)
- `app/sitemap.ts`
- `app/robots.ts`

## Deploy to Vercel

1. Push project to GitHub.
2. Log into [Vercel](https://vercel.com/).
3. Click **Add New Project**.
4. Import the GitHub repository.
5. Keep default build settings (Next.js auto-detected).
6. Click **Deploy**.

Vercel build command and output are automatically handled for Next.js 15.

## GitHub Setup Instructions

1. Create a new repository on GitHub.
2. In this project directory, run:

```bash
git init
git add .
git commit -m "feat: launch Vento Cafe brand website"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. Connect that repository in Vercel for continuous deployment.

## Notes

- No ecommerce, database, login, or payment gateway included yet.
- The current experience is focused entirely on branding, storytelling, and emotional visual identity.
