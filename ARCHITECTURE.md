# BRISVORA — Architecture & Developer Guide

## What is this?

Brisvora is a **WhatsApp-first real estate platform** for Indian brokers. A broker sends a WhatsApp message (text + photos) describing a property → AI auto-generates a polished listing → listing goes live with a public URL. Buyers can browse listings and submit leads.

---

## Monorepo Structure

```
BRISVORA/
├── apps/
│   ├── web/          # Next.js 16 frontend + API routes (main app)
│   └── api/          # Internal TypeScript library (no server — imported by web)
├── packages/
│   └── shared/       # Prisma ORM, auth config, shared types & utils
├── turbo.json        # Turborepo task pipeline
├── pnpm-workspace.yaml
└── package.json      # Root scripts
```

**Package manager:** pnpm 9 + Turborepo  
**Node:** ≥18

---

## Apps & Packages

### `apps/web` — Next.js App (port 3000)

The only running server. Uses Next.js App Router.

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/          # Route group (broker-only, auth-protected)
├── dashboard/
│   ├── page.tsx          # Broker dashboard home
│   ├── listings/
│   │   ├── new/page.tsx  # Create listing manually
│   │   └── [id]/edit/    # Edit listing
│   ├── leads/page.tsx    # View leads per property
│   └── profile/page.tsx  # Broker profile
├── property/
│   └── [slug]/page.tsx   # Public property listing page
├── api/
│   ├── auth/[...nextauth]/route.ts   # NextAuth handler
│   ├── whatsapp/webhook/route.ts     # AiSensy webhook (POST)
│   ├── broker/
│   │   ├── listings/route.ts         # GET/POST broker listings
│   │   ├── listings/[id]/route.ts    # PUT/DELETE single listing
│   │   ├── leads/route.ts            # GET leads for broker
│   │   ├── analytics/route.ts        # GET analytics
│   │   └── profile/route.ts          # GET/PUT broker profile
│   ├── properties/route.ts           # GET public listings (search)
│   ├── properties/[slug]/route.ts    # GET single public listing
│   ├── leads/route.ts                # POST lead (buyer inquiry)
│   ├── register/route.ts             # POST broker registration
│   └── upload/route.ts               # POST image upload (Cloudinary)
├── page.tsx              # Public homepage / property search
└── layout.tsx            # Root layout
```

**Key files:**
- `auth.ts` — NextAuth v5 instance (re-exports handlers, auth, signIn, signOut)
- `next.config.ts` — allows Cloudinary image domains
- `proxy.ts` — (check contents if needed)

---

### `apps/api` — Internal API Library

Not a server. Pure TypeScript modules imported directly by `apps/web` API routes.

```
src/
├── ai/index.ts           # generateListing() — calls Claude 3.5 Sonnet, falls back to regex mock
├── whatsapp/index.ts     # parseInboundMessage(), sendMessage(), downloadMedia()
├── listings/index.ts     # createListing(), getListingBySlug(), searchListings(), etc.
├── leads/index.ts        # Lead creation & retrieval
├── analytics/index.ts    # View count tracking
├── images/index.ts       # Cloudinary upload helpers
├── conversation/index.ts # Conversation state machine (GREETING → ACCUMULATING → GENERATING)
└── index.ts              # Re-exports everything
```

---

### `packages/shared` — Shared Library

```
src/
├── types/index.ts    # All shared TypeScript interfaces & Zod schemas
├── utils/index.ts    # generateSlug() and other helpers
├── db.ts             # Prisma client singleton
├── auth.ts           # NextAuth authConfig (providers, callbacks, adapter)
└── index.ts          # Re-exports all of the above
prisma/
└── schema.prisma     # Database schema
```

---

## Database Schema (PostgreSQL via Supabase)

| Model               | Purpose                                              |
|---------------------|------------------------------------------------------|
| `User`              | Broker accounts (email + phone, role: BROKER/ADMIN)  |
| `Account`           | OAuth accounts (NextAuth)                            |
| `Session`           | Auth sessions (NextAuth)                             |
| `VerificationToken` | Email verification (NextAuth)                        |
| `Property`          | Real estate listings (slug, price, type, status)     |
| `Image`             | Property images (Cloudinary URLs, ordered)           |
| `Lead`              | Buyer inquiries linked to a property                 |
| `Analytics`         | View/inquiry counts per property                     |
| `WhatsappMessage`   | Inbound/outbound WhatsApp message log                |
| `ConversationState` | Per-user WhatsApp conversation state machine         |

**Enums:** `Role`, `PropertyType`, `PropertyStatus`, `MessageDirection`

---

## Core Flow: WhatsApp → Listing

```
Broker sends WhatsApp message (text + photos)
        ↓
AiSensy webhook → POST /api/whatsapp/webhook
        ↓
parseInboundMessage() extracts phone, text, mediaUrls
        ↓
ConversationState machine (GREETING → ACCUMULATING → GENERATING)
        ↓
generateListing() → Claude 3.5 Sonnet (or mock fallback)
        ↓
createListing() → saves to DB with images
        ↓
sendMessage() → replies to broker with listing URL
```

**Conversation states:**
- `GREETING` — first message, bot introduces itself
- `ACCUMULATING` — collecting property details (text + photos)
- `GENERATING` — AI is processing, listing being created

---

## Authentication

- **NextAuth v5** (beta) with `@auth/prisma-adapter`
- Credentials provider (email + bcrypt password)
- Session stored in DB via `Session` model
- `authConfig` lives in `packages/shared/src/auth.ts`
- Middleware protects `/dashboard/*` routes

---

## External Services

| Service       | Purpose                          | Env Var(s)                                              |
|---------------|----------------------------------|---------------------------------------------------------|
| Supabase      | PostgreSQL database              | `DATABASE_URL`                                          |
| AiSensy       | WhatsApp messaging               | `AISENSY_API_KEY`, `AISENSY_PROJECT_API_KEY`, `AISENSY_PROJECT_ID`, `AISENSY_PHONE_NUMBER` |
| Anthropic     | AI listing generation (optional) | `ANTHROPIC_API_KEY`                                     |
| Cloudinary    | Image storage (optional)         | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |

> Both Anthropic and Cloudinary are optional — the system has fallbacks for both.

---

## Environment Setup

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in values.  
The `packages/shared/.env` only needs `DATABASE_URL` for Prisma CLI commands.

```bash
# Generate AUTH_SECRET
openssl rand -base64 32
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Start dev server (all apps in parallel)
pnpm dev
```

Individual app:
```bash
cd apps/web && pnpm dev   # http://localhost:3000
```

Database GUI:
```bash
pnpm db:studio
```

---

## Key Conventions

- All DB access goes through `@brisvora/shared` (never import Prisma directly in `web`)
- All business logic lives in `@brisvora/api` modules, not in Next.js route handlers
- Route handlers in `apps/web/app/api/` are thin — they validate, call `@brisvora/api`, return JSON
- Slugs are auto-generated from property title + UUID prefix
- Phone numbers are normalized to digits-only (e.g. `918850908790`) for matching
- WhatsApp message direction: `INBOUND` (from user) / `OUTBOUND` (from bot)
