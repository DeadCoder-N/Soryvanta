# Brisvora — AI-Powered Growth OS

> **"One Message. Unlimited Growth."**
>
> WhatsApp-first AI platform for Indian real estate brokers. Send a message → AI generates a premium listing → listing goes live → leads flow in.

---

## What Is Brisvora?

Brisvora is a **WhatsApp-native, AI-powered real estate listing platform** built for Indian brokers. A broker sends a WhatsApp message describing a property — AI (Claude 3.5 Sonnet) extracts every detail, writes a professional SEO-optimized listing, saves it to the database, and replies with a shareable public URL. Buyers browse listings, submit leads, and contact brokers directly.

**Tagline:** Your Growth OS

**Live:** [brisvora.vercel.app](https://brisvora.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties, inline styles |
| Typography | Playfair Display · Cinzel · DM Sans |
| Auth | NextAuth v5 (Credentials + Prisma adapter) |
| Database | PostgreSQL (Supabase) + Prisma ORM |
| AI | Claude 3.5 Sonnet (Anthropic) — regex mock fallback |
| WhatsApp | AiSensy API (webhook + send) |
| Images | Cloudinary (optional, fallback exists) |
| Testing | Vitest + MSW — 44 tests |
| Monorepo | pnpm 9 + Turborepo |
| Deployment | Vercel |

---

## Monorepo Structure

```
BRISVORA/
├── apps/
│   ├── web/              # Next.js 16 — the only running server (port 3000)
│   └── api/              # Internal TypeScript library (imported by web, not a server)
├── packages/
│   └── shared/           # Prisma schema, NextAuth config, shared types & utils
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

### `apps/web` — Next.js App

```
app/
├── (auth)/login · register
├── (dashboard)/
├── dashboard/
│   ├── growth/           # Analytics dashboard (default redirect)
│   ├── listings/new      # Create listing via AI
│   ├── listings/[id]/edit
│   ├── leads/
│   ├── analytics/
│   ├── activity/
│   └── profile/
├── property/[slug]/      # Public listing page (SSR + SEO)
├── admin/                # Role-based admin panel
├── api/                  # All API routes
│   ├── whatsapp/webhook
│   ├── broker/listings · leads · analytics · profile
│   ├── properties · properties/[slug]
│   ├── leads · register · upload
│   └── auth/[...nextauth]
├── about · blog · contact · pricing · features/* · solutions/*
├── docs · guides · help · roadmap · changelog
├── security · privacy-policy · terms · cookies · licenses
├── webhooks · sdks
└── page.tsx              # Public homepage
```

### `apps/api` — Internal Library

```
src/
├── ai/index.ts           # generateListing() — Claude 3.5 Sonnet + regex fallback
├── whatsapp/index.ts     # parseInboundMessage() · sendMessage() · downloadMedia()
├── listings/index.ts     # Full CRUD + search + view count
├── leads/index.ts        # createLead() · getBrokerLeads()
├── analytics/index.ts    # getBrokerAnalytics()
├── images/index.ts       # Cloudinary upload helpers
├── conversation/index.ts # State machine: GREETING → ACCUMULATING → GENERATING
└── index.ts
```

### `packages/shared` — Shared Library

```
src/
├── types/index.ts        # All TypeScript interfaces + Zod schemas
├── utils/index.ts        # generateSlug() and helpers
├── db.ts                 # Prisma client singleton
├── auth.ts               # NextAuth authConfig
└── index.ts
prisma/
└── schema.prisma         # Full database schema
```

---

## Core Flow

```
Broker sends WhatsApp message (text + photos)
        ↓
AiSensy webhook → POST /api/whatsapp/webhook
        ↓
parseInboundMessage() — extracts phone, text, mediaUrls
        ↓
ConversationState machine (GREETING → ACCUMULATING → GENERATING)
        ↓
generateListing() → Claude 3.5 Sonnet (or regex mock fallback)
        ↓
createListing() → saves to PostgreSQL with images
        ↓
sendMessage() → replies to broker with listing URL
```

---

## Database Schema

| Model | Purpose |
|---|---|
| `User` | Broker accounts (email + phone, role: BROKER/ADMIN/SUPER_ADMIN) |
| `Property` | Real estate listings (slug, price, type, status, features, amenities) |
| `Image` | Property images (Cloudinary URLs, ordered) |
| `Lead` | Buyer inquiries linked to a property |
| `Analytics` | View/inquiry counts per property |
| `WhatsappMessage` | Inbound/outbound WhatsApp message log |
| `ConversationState` | Per-user WhatsApp conversation state machine |
| `Account · Session · VerificationToken` | NextAuth standard models |

---

## Brand System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#C9A84C` | Accent, buttons, highlights |
| `--green` | `#15803D` | Success, WhatsApp, positive metrics |
| `--bg` | `#080807` | Deep dark background |
| `--text-primary` | `#F0EBE0` | Warm white text |
| Playfair Display | Serif | Headings and titles |
| Cinzel | Ornamental serif | Section labels (uppercase, spaced) |
| DM Sans | Sans-serif | Body text and UI |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm 9
- PostgreSQL (Supabase recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/DeadCoder-N/BRISVORA.git
cd BRISVORA

# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Start dev server
pnpm dev
# → http://localhost:3000
```

### Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local`:

```env
# Required
DATABASE_URL=postgresql://...
AUTH_SECRET=                        # openssl rand -base64 32

# WhatsApp (AiSensy)
AISENSY_API_KEY=
AISENSY_PROJECT_API_KEY=
AISENSY_PROJECT_ID=
AISENSY_PHONE_NUMBER=

# AI (optional — regex fallback exists)
ANTHROPIC_API_KEY=

# Images (optional — fallback exists)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

`packages/shared/.env` only needs `DATABASE_URL` for Prisma CLI.

### Useful Commands

```bash
pnpm dev              # Start all apps in parallel
pnpm build            # Production build
pnpm test:run         # Run 44 tests (Vitest + MSW)
pnpm db:studio        # Prisma Studio GUI
pnpm db:generate      # Regenerate Prisma client
pnpm db:migrate       # Run pending migrations
```

---

## API Routes

| Route | Methods | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler |
| `/api/register` | POST | Broker registration |
| `/api/whatsapp/webhook` | GET/POST | AiSensy webhook |
| `/api/broker/listings` | GET/POST | Broker listings CRUD |
| `/api/broker/listings/[id]` | PUT/DELETE | Single listing update/delete |
| `/api/broker/leads` | GET | Leads for broker's properties |
| `/api/broker/analytics` | GET | Dashboard analytics |
| `/api/broker/profile` | GET/PUT | Broker profile |
| `/api/properties` | GET | Public listing search |
| `/api/properties/[slug]` | GET | Single public property |
| `/api/leads` | POST | Submit buyer inquiry |
| `/api/upload` | POST | Image upload to Cloudinary |

---

## Deployment

### Vercel Configuration

```
Root Directory:    apps/web
Build Command:     cd ../.. && cd packages/shared && npx prisma generate && cd ../.. && pnpm --filter web build
Install Command:   cd ../.. && pnpm install --no-frozen-lockfile
Output Directory:  .next
```

### WhatsApp Webhook

```
Webhook URL:   https://brisvora.vercel.app/api/whatsapp/webhook
```

---

## Testing

```bash
cd apps/web
pnpm test:run
```

**Test files:**
- `__tests__/api.edge-cases.test.ts` — 36 tests (all API routes)
- `__tests__/dashboard.edge-cases.test.ts` — 8 tests (analytics edge cases)

**Stack:** Vitest + MSW (Mock Service Worker) — shared handlers between browser dev mode and tests.

---

## Key Conventions

1. All DB access through `@brisvora/shared` — never import Prisma directly in `web`
2. All business logic in `@brisvora/api` modules — route handlers are thin
3. Slugs auto-generated from property title + UUID prefix
4. Phone numbers normalized to digits-only (e.g. `918850908790`)
5. Dashboard pages are Server Components by default — zero JS bundle
6. Pure SVG/CSS charts — no Recharts or chart libraries
7. Inline styles with CSS custom properties — no CSS modules or styled-components
8. `prefers-reduced-motion` respected on all animations

---

## Project Status

### ✅ Done

**Infrastructure**
- [x] Turborepo monorepo with pnpm workspaces
- [x] Supabase PostgreSQL connected and migrated
- [x] Prisma schema with all models and relations
- [x] Vercel deployment — production live
- [x] All TypeScript issues resolved, production build passing

**Authentication**
- [x] Register page (`/register`) with bcrypt password hashing
- [x] Login page (`/login`) with NextAuth credentials provider
- [x] Session provider in root layout
- [x] Dashboard route protection via middleware
- [x] Role-based access (BROKER / ADMIN / SUPER_ADMIN)
- [x] Sign out button

**WhatsApp Integration**
- [x] AiSensy webhook endpoint (GET verification + POST handler)
- [x] Inbound message parsing (`parseInboundMessage`)
- [x] Outbound message sending (`sendMessage`)
- [x] Media download (`downloadMedia`)
- [x] Conversation state machine (GREETING → ACCUMULATING → GENERATING)

**AI Listing Generation**
- [x] Claude 3.5 Sonnet integration (`generateListing`)
- [x] Regex mock fallback (works without API key)
- [x] Structured JSON extraction (title, description, price, BHK, city, type, features, amenities)

**Backend API**
- [x] All broker CRUD routes (listings, leads, analytics, profile)
- [x] Public property search with filters (city, price, type, bedrooms)
- [x] Single property page with view count increment
- [x] Lead submission from public listing page
- [x] Image upload to Cloudinary
- [x] Admin API routes (users, properties, leads, messages)

**Frontend — Public**
- [x] Homepage with 12 marketing sections (Hero, Trust, Problem, Solution, Ecosystem, Growth Dashboard, Solutions, Integrations, Customer Success, Pricing, FAQ, CTA)
- [x] Premium Navbar with dropdown menus, scroll progress bar, theme toggle, mobile drawer
- [x] Footer with newsletter, trust badges, social links, legal links
- [x] Public property listing page (`/property/[slug]`) — SSR, SEO meta, image gallery, lead form, mobile contact bar
- [x] Property search with city/type/BHK/price filters
- [x] All marketing pages (about, blog, contact, pricing, features/*, solutions/*, docs, guides, help, roadmap, changelog, security, privacy-policy, terms, cookies, licenses, webhooks, sdks)

**Frontend — Dashboard**
- [x] Growth dashboard (`/dashboard/growth`) — stat cards, 30-day views chart, lead source donut, conversion funnel, AI insights, top listings table, recent leads
- [x] Listings page (`/dashboard/listings`) — table with edit/delete
- [x] Create listing (`/dashboard/listings/new`) — AI text input + image upload with drag & drop
- [x] Edit listing (`/dashboard/listings/[id]/edit`)
- [x] Leads page (`/dashboard/leads`) — with source filtering
- [x] Analytics page (`/dashboard/analytics`)
- [x] Activity page (`/dashboard/activity`)
- [x] Profile page (`/dashboard/profile`)
- [x] Dashboard sidebar with navigation
- [x] Mobile bottom navigation bar

**Admin Panel**
- [x] Admin dashboard (`/admin`)
- [x] Admin users, properties, leads, messages pages

**SEO**
- [x] Organization JSON-LD schema
- [x] WebSite JSON-LD with SearchAction
- [x] RealEstateListing JSON-LD per property page
- [x] BreadcrumbList JSON-LD per property page
- [x] Dynamic Open Graph + Twitter Cards per property
- [x] Auto-generated sitemap.xml (up to 10,000 properties)
- [x] robots.txt
- [x] Google Search Console verification tag

**Design System**
- [x] Full CSS custom property token system (dark + light themes)
- [x] Mobile-first responsive breakpoints (480 → 768 → 1024 → 1400 → 1920px)
- [x] `prefers-reduced-motion` support on all animations
- [x] Keyboard navigation + focus states
- [x] ARIA labels on all interactive elements
- [x] Pure SVG charts (no chart libraries)
- [x] Grain texture overlay, gold dividers, animated entries

**Testing**
- [x] 44 tests passing (Vitest + MSW)
- [x] API edge case coverage
- [x] Dashboard analytics edge cases

---

### 🔧 Remaining / In Progress

**WhatsApp — Critical**
- [ ] Meta access token expired — needs permanent System User token from Meta Business Manager
- [ ] Broker phone number not collected at registration — WhatsApp can't match broker to account
- [ ] Switch from Meta Cloud API to AiSensy fully (env vars updated, code needs verification)

**Images**
- [ ] Cloudinary credentials not configured in production — image upload inactive
- [ ] WhatsApp media download to Cloudinary pipeline needs end-to-end test

**Conversational WhatsApp Flow**
- [ ] Multi-step dialog (current: single message → instant listing)
- [ ] Guided question system ("What's the price?" → "Any amenities?" → "Send photos")
- [ ] Context tracking per user across multiple messages
- [ ] Clarification messages when AI can't extract required fields

**Dashboard Enhancements**
- [ ] Real date-based analytics (current 30-day chart uses simulated sine wave data)
- [ ] Analytics events table with timestamps
- [ ] Export leads to CSV
- [ ] Bulk listing actions (activate/deactivate/delete multiple)

**Real AI Integration**
- [ ] Anthropic API key in production environment
- [ ] Hindi/Hinglish input handling in AI prompt
- [ ] AI prompt versioning and logging

**Payments & Subscriptions**
- [ ] Razorpay / Stripe integration
- [ ] Plan enforcement (Starter / Professional / Business / Enterprise)
- [ ] Subscription management in broker profile

**Performance**
- [ ] Real-time analytics (currently static server render)
- [ ] Redis caching for frequent DB queries
- [ ] Image lazy loading optimization on property pages

**Phase 2 Features**
- [ ] Voice input for property descriptions
- [ ] OCR for property documents
- [ ] AI price estimation
- [ ] Automated follow-up WhatsApp messages to leads
- [ ] Multi-broker organization accounts
- [ ] Syndication to 99acres / MagicBricks / Housing.com
- [ ] Advanced A/B testing for listing descriptions
- [ ] Google Analytics 4 custom events (ListingCreated, LeadSubmitted, etc.)

---

## Architecture Decisions

| Decision | Reason |
|---|---|
| Next.js App Router as only server | Simplifies deployment — one Vercel project |
| `apps/api` as internal library | Business logic isolated from HTTP layer |
| Pure SVG charts | Zero bundle cost, full design control |
| Inline styles + CSS custom properties | Theme switching without CSS-in-JS overhead |
| Prisma singleton in `packages/shared` | Single DB connection across all modules |
| MSW for tests | Same mock handlers in browser dev and Vitest |

---

## Contributing

```bash
# Create feature branch
git checkout -b feat/your-feature

# Make changes, then
pnpm test:run          # All tests must pass
pnpm build             # Build must succeed

# Commit
git commit -m "feat: description"
git push origin feat/your-feature
```

---

## License

Private — All rights reserved © 2026 Brisvora Technologies.

---

<div align="center">
  <p>Built for businesses that grow.</p>
  <p>Made in India 🇮🇳</p>
</div>
