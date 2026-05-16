# London Community Fest

Official website for **London Community Fest 2026** — a family-friendly community celebration at Kennington Park, London.

## About the Project

This repository is a **production-grade event website** built with Next.js 16, TypeScript, and Tailwind CSS 4. It serves attendees (event details, pricing, FAQ), sponsors (tier information and enquiry paths), and vendors (stall applications) for a real community festival organised by South Indian Community UK.

The codebase is structured for maintainability and growth: content is config-driven, UI is componentised, and the architecture is designed to evolve into **Community Event OS** — a reusable SaaS platform that lets community organisations run events without rebuilding a site from scratch each year.

The focus throughout is **production-quality architecture**, not throwaway prototype code — strict TypeScript, server-first rendering, a documented design system, and clear separation between configuration, data, and presentation.

## Live Site

**[To be added after Vercel deployment]**

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 (`@theme inline` in CSS — no `tailwind.config.ts`) |
| UI | Custom component library (no shadcn/Radix or external UI kit) |
| Utilities | `clsx` + `tailwind-merge` via `cn()` |
| Fonts | Instrument Serif + Be Vietnam Pro (`next/font`, optimised) |
| Deployment | Vercel (planned) |

## Architecture

### 1. Config-driven content

All core event data — dates, venue, pricing, registration flags, attendance figures — lives in `lib/config/` as typed `as const` exports. Components import config; they do not hardcode copy or numbers.

Updating `eventConfig.date` or `eventConfig.venue` in one file propagates everywhere: hero event cards, countdown target, attend section, pricing banner, and footer contact paths.

### 2. Data separation

Static content arrays (FAQ items, activities, sponsor tiers) live in `data/`, typed against interfaces in `types/index.ts`. Sections map over this data; they do not embed long copy in JSX.

`getFaqItems()` in `data/faq.ts` can inject dynamic values (e.g. volunteer email from `siteConfig`) while keeping presentation components dumb. This pattern is **API-ready**: when a Django REST backend is added, only the data-fetch layer changes — not the section components.

### 3. Design system

Tailwind CSS 4’s `@theme inline` block in `app/globals.css` defines the full palette: forest greens, gold, crimson (logo `#7A0D22`), slate, paper tones, and cream text on dark sections — aligned with the festival poster and brochure.

`lib/config/design.ts` maps each section (hero, collage, attend, FAQ, footer, header) to background, text, accent, and grain rules. `lib/section-theme.ts` exposes helpers (`sectionClasses`, `sectionAccent`, `headerBarClasses`) so theming stays centralised instead of scattered magic strings.

Custom utilities (`paper-torn`, `poster-grain`, `tape-strip`) support the collage/poster aesthetic without inline styles.

### 4. Component architecture

**UI primitives** (`components/ui/`) enforce consistency: `Container`, `SectionHeading`, `Button`, `PaperCard`, `Polaroid`, `BrandBar`, `ActivityIcon`, `TornLogo`.

**Landing sections** (`components/landing/`) each own one vertical slice of the page. `app/page.tsx` is a thin composer (~40 lines) that orders sections and brand dividers — no business logic in the route file.

Supporting modules (`hero-event-block`, `hero-countdown`, `collage-carousel`, `faq-accordion`) keep section files focused and under the project’s line-count guidelines.

### 5. Server-first rendering

Only **four** components use `"use client"`:

| Component | Reason |
|-----------|--------|
| `site-header.tsx` | Scroll state + mobile menu |
| `hero-countdown.tsx` | Live countdown (`setInterval`) |
| `faq-accordion.tsx` | One-open-at-a-time FAQ state |
| `collage-carousel.tsx` | Marquee / reduced-motion handling |

Everything else is a React Server Component by default — minimal client JavaScript on the critical path.

## Project Structure

```
community_fest_london/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page composition
│   └── globals.css             # Tailwind 4 @theme + poster utilities
├── components/
│   ├── landing/                # One component per section
│   │   ├── site-header.tsx
│   │   ├── hero-section.tsx
│   │   ├── hero-event-block.tsx
│   │   ├── hero-countdown.tsx
│   │   ├── about-section.tsx
│   │   ├── collage-section.tsx
│   │   ├── collage-carousel.tsx
│   │   ├── attend-section.tsx
│   │   ├── pricing-banner.tsx
│   │   ├── vendors-section.tsx
│   │   ├── sponsors-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── faq-accordion.tsx
│   │   └── site-footer.tsx
│   └── ui/                     # Reusable primitives
│       ├── activity-icon.tsx
│       ├── brand-bar.tsx
│       ├── button.tsx
│       ├── container.tsx
│       ├── paper-card.tsx
│       ├── polaroid.tsx
│       ├── section-heading.tsx
│       └── torn-logo.tsx
├── data/
│   ├── activities.ts           # Activities + collage photo metadata
│   ├── faq.ts
│   └── sponsors.ts
├── lib/
│   ├── config/
│   │   ├── design.ts           # Section themes + brand bar
│   │   ├── event.ts            # Date, venue, pricing
│   │   ├── navigation.ts
│   │   └── site.ts             # Name, contact, SEO copy
│   ├── section-theme.ts
│   ├── sponsor-styles.ts
│   └── utils.ts                # cn() class merger
├── types/
│   └── index.ts                # FAQItem, Activity, SponsorTier
└── public/
    └── images/
        ├── logo.png
        └── collage/              # Festival highlight photos
```

## Design Direction

The visual language matches printed festival materials: warm, collage-inspired, and community-led — **not** a generic SaaS template.

- **Dark sections:** forest green backgrounds with subtle `poster-grain`
- **Accents:** crimson from the official logo, gold for highlights and pricing
- **Light sections:** parchment `PaperCard` surfaces with torn edges
- **Typography:** uppercase sans for UI labels; Instrument Serif for taglines and “Fest”
- **Motifs:** polaroid-style photos, tape strips, four-colour `BrandBar` dividers between sections

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
git clone git@github.com:Mubeen16/London_community_fest.git
cd London_community_fest
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Configuration

| File | Purpose |
|------|---------|
| `lib/config/site.ts` | Site name, URL, contact email/phone, organiser |
| `lib/config/event.ts` | Date, venue, pricing, `registrationOpen`, stats |
| `lib/config/navigation.ts` | Header/footer nav links |
| `lib/config/design.ts` | Per-section colours and header bar states |

Update `event.ts` before each festival year; avoid hardcoding dates in components.

## Future Roadmap

- Registration and ticketing (Stripe / Eventbrite integration)
- Vendor application form (beyond mailto)
- Sponsor portal with asset upload
- Volunteer signup and shift management
- Django REST API backend replacing static `data/` imports
- **Community Event OS** — multi-tenant SaaS for recurring community events

## Author

**Mubeen** — solo founder and developer

- Building production-grade systems with AI-assisted development
- Background: MSc Psychology (Brunel University) and self-taught backend engineering
- Stack: Django/DRF, Next.js, TypeScript, PostgreSQL

## License

MIT
