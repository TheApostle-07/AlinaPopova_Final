# Alina Popova Studio

Elegant marketing site for recruiting calm, confident female livestream hosts in Delhi NCR. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide icons, and Framer Motion animations.

## Tech Stack
- Next.js 14 (App Router)
- React 18 with TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to explore the site.

## Available Scripts
- `npm run dev` – start the dev server.
- `npm run build` – create a production build.
- `npm run start` – run the production server.
- `npm run lint` – lint with ESLint.

## Project Highlights
- Strong typography and whitespace for a calm, premium aesthetic.
- Animated sections, cards, and buttons via Framer Motion.
- Reusable UI primitives (Button, Card, Badge, Accordion).
- Centralized site metadata in `src/lib/config.ts`.
- Dedicated `/apply` page linking to the application form.

## Structure Overview
```
src/
  app/
    layout.tsx
    page.tsx
    apply/
      page.tsx
  components/
    layout/
    sections/
    ui/
  lib/
    config.ts
  styles/
    globals.css
public/
  favicon.ico
  og-image.png
  images/
```
