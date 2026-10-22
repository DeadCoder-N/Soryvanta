<div align="center">

# Marketing OS

### AI-Powered Growth OS for Indian Real Estate Brokers

**"One Message. Unlimited Growth."**

[![Live](https://img.shields.io/badge/Live-brisvora.vercel.app-black?style=for-the-badge&logo=vercel&logoColor=white)](https://brisvora.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Flask-Python-black?style=for-the-badge&logo=python&logoColor=white)](https://flask.palletsprojects.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-black?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com)
[![Tests](https://img.shields.io/badge/Tests-44%20passing-black?style=for-the-badge&logo=vitest&logoColor=white)](#testing)
[![License](https://img.shields.io/badge/License-Private-black?style=for-the-badge)](#license)

</div>

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) App Router | 16.2.9 |
| UI Library | [React](https://react.dev) | 19.2.4 |
| Language | [TypeScript](https://typescriptlang.org) | 5.x |
| Microservice | [Python Flask](https://flask.palletsprojects.com) | 3.x |
| Styling | Inline styles + CSS custom properties | — |
| Typography | Playfair Display · Cinzel · DM Sans | Google Fonts |
| Auth | [NextAuth](https://authjs.dev) v5 beta, Credentials provider, JWT sessions | 5.0.0-beta.31 |
| Database | [PostgreSQL](https://supabase.com) via Supabase | — |
| ORM | [Prisma](https://prisma.io) | latest |
| AI | [Anthropic](https://anthropic.com) Claude Sonnet 4.5 — regex and Flask fallbacks | Anthropic SDK |
| WhatsApp | [AiSensy](https://aisensy.com) API (webhook + send) | — |
| Images + Video | [Cloudinary](https://cloudinary.com) uploads for images and video | — |
| Testing | [Vitest](https://vitest.dev) + [MSW](https://mswjs.io) + [Pytest](https://pytest.org) | 4.x + 2.x + latest |
| Monorepo | [pnpm](https://pnpm.io) 9 + [Turborepo](https://turbo.build) | 9.15.0 + 2.x |
| Deployment Web | [Vercel](https://vercel.com) | — |
| Deployment API | [Render.com](https://render.com) (Flask) | — |
| CI/CD | [GitHub Actions](https://github.com/features/actions) | — |

---

## 📁 Monorepo Structure

```mermaid
flowchart LR
    subgraph MARKETING_OS["MARKETING OS Monorepo"]
        direction TB
        APPS["apps/"] --> WEB["web/<br/>Next.js 16 App Router<br/>:3000"]
        APPS --> FLASK["flask-api/<br/>Python Flask Microservice<br/>:5000"]
        APPS --> API["api/<br/>Internal TS Library"]

        WEB --> WEB_DIRS["app/ | components/ | __tests__/ | public/"]
        FLASK --> FLASK_DIRS["app.py | routes/ | data/ | tests/"]
        API --> API_SRC["src/ai | src/listings | src/leads | src/whatsapp"]

        PACKAGES["packages/"] --> SHARED["shared/<br/>Prisma Schema + Types + Utils"]
        SHARED --> PRISMA["prisma/schema.prisma"]
        SHARED --> TYPES["src/types/"]
        SHARED --> UTILS["src/utils/"]

        ROOT["Root Config"] --> FILES["turbo.json | pnpm-workspace.yaml<br/>tsconfig.base.json | .github/workflows"]
    end

    style MARKETING_OS fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style WEB fill:#333,color:#fff,stroke:#fff
    style FLASK fill:#555,color:#fff,stroke:#fff
    style API fill:#777,color:#fff,stroke:#fff
    style SHARED fill:#999,color:#000,stroke:#000
    style PRISMA fill:#bbb,color:#000,stroke:#000
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 18.0.0 | [nodejs.org](https://nodejs.org) |
| pnpm | ≥ 9.0.0 | `npm install -g pnpm@9` |
| Python | ≥ 3.11 | [python.org](https://python.org) |
| PostgreSQL | any | [Supabase](https://supabase.com) (recommended) |
| Git | any | [git-scm.com](https://git-scm.com) |

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DeadCoder-N/BRISVORA.git
cd BRISVORA

# 2. Install all dependencies (all workspaces)
pnpm install

# 3. Set up environment variables
cp apps/web/.env.example apps/web/.env.local

# 4. Install Python dependencies (Flask)
cd apps/flask-api
pip install -r requirements.txt
cd ../..

# 5. Generate Prisma client
pnpm db:generate

# 6. Run database migrations
pnpm db:migrate

# 7. Start the Next.js app
pnpm dev        # Next.js on :3000

# 8. Optional: start the Flask mock-data service in a second terminal
cd apps/flask-api && python app.py   # Flask on :5000
```

> **Next.js**: http://localhost:3000 · **Flask API**: http://localhost:5000 when started separately

---

### Environment Variables

```env
# ─────────────────────────────────────────────
# REQUIRED — App will not start without these
# ─────────────────────────────────────────────
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/postgres
AUTH_SECRET=<your_secret_here>
NEXTAUTH_URL=http://localhost:3000

# ─────────────────────────────────────────────
# WHATSAPP — AiSensy API
# ─────────────────────────────────────────────
AISENSY_API_KEY=<your_aisensy_campaign_api_key>
AISENSY_PROJECT_API_KEY=<your_aisensy_project_api_key>
AISENSY_PROJECT_ID=<your_aisensy_project_id>
AISENSY_PHONE_NUMBER=<your_aisensy_whatsapp_number>

# ─────────────────────────────────────────────
# AI — Anthropic Claude 3.5 Sonnet (optional)
# ─────────────────────────────────────────────
ANTHROPIC_API_KEY=<your_anthropic_api_key>

# ─────────────────────────────────────────────
# IMAGES — Cloudinary (required for image/video uploads)
# ─────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# ─────────────────────────────────────────────
# FLASK MOCK API URL (optional, for fallback)
# ─────────────────────────────────────────────
NEXT_PUBLIC_FLASK_API_URL=http://localhost:5000

# ─────────────────────────────────────────────
# FIRST SUPER ADMIN (CLI only; do not commit)
# ─────────────────────────────────────────────
SUPER_ADMIN_EMAIL=<admin_email>
SUPER_ADMIN_PASSWORD=<admin_password>
SUPER_ADMIN_NAME=<admin_name>
```

---

### All Commands

```bash
# ── Development ──────────────────────────────
pnpm dev              # Next.js on port 3000
cd apps/flask-api && python app.py  # Optional Flask service on port 5000

# ── Testing ──────────────────────────────────
pnpm --filter web test:run  # Vitest tests in apps/web
cd apps/flask-api && pytest  # Flask tests

# ── Build ────────────────────────────────────
pnpm build            # Next.js production build

# ── Database ─────────────────────────────────
pnpm db:generate      # Regenerate Prisma client
pnpm db:migrate       # Run pending migrations
pnpm db:studio        # Prisma Studio at localhost:5555

# Create or promote the first super admin. Prefer a secret manager for production.
SUPER_ADMIN_EMAIL=admin@example.com \
SUPER_ADMIN_PASSWORD='use-a-strong-password' \
SUPER_ADMIN_NAME='Marketing OS Admin' \
pnpm db:super-admin
```

After the command succeeds, sign in at `/login` with the configured email and password,
then open `/admin`. The command is safe to rerun: it promotes the matching email and
resets its password to the supplied value. Run `pnpm db:migrate` first so the
`SUPER_ADMIN` enum is present in the database.

### Current Implementation Notes

- The Next.js app is the primary server. The Flask app is an optional mock-data service and must be started separately.
- Authentication uses the Credentials provider with JWT sessions. The Prisma `Account` and `Session` models exist for compatibility, but a Prisma adapter is not currently configured.
- The `/admin` area currently includes users, properties, leads, messages, and overview pages. A CMS route is not implemented yet.
- Cloudinary credentials are required for image/video uploads; there is no upload fallback provider.
- The checked-in Prisma schema and migration history should be validated together before provisioning a fresh database. Some schema additions are documented in manual SQL files.
- The Flask handler is defined as `/api/mock/<property_type>/<bhk>`. Apartment examples use `1bhk`, `2bhk`, and `3bhk`; non-apartment callers should be verified against the deployed Flask service.

---

## 🌐 All Pages

### Public Property Pages

| Route | SEO Title Pattern | Template |
|---|---|---|
| `/apartment/[slug]` | "2 BHK Apartment in Mumbai" | 1BHK / 2BHK / 3BHK variants |
| `/villa/[slug]` | "4 BHK Luxury Villa in Pune" | Premium layout |
| `/plot/[slug]` | "1200 sqft Plot in Bangalore" | Legal section, land-specific |
| `/commercial/[slug]` | "1800 sqft Office in Delhi" | Business suitability section |
| `/property/[slug]` | (legacy) | 301 redirects to correct type route |

### All Public Pages

| Page | URL |
|---|---|
| Homepage | `/` |
| Property (legacy redirect) | `/property/[slug]` → 301 |
| About | `/about` |
| Blog | `/blog` |
| Contact | `/contact` |
| Pricing | `/pricing` |
| Features | `/features` (×5 sub-pages) |
| Solutions | `/solutions` (×8 sub-pages) |
| Docs | `/docs` (×1 sub-page) |
| Guides | `/guides` |
| Help | `/help` |
| Roadmap | `/roadmap` |
| Changelog | `/changelog` |
| Security | `/security` |
| Privacy | `/privacy-policy` |
| Terms | `/terms` |
| Cookies | `/cookies` |
| Licenses | `/licenses` |
| Webhooks | `/webhooks` |
| SDKs | `/sdks` |

### Auth Pages

| Page | URL |
|---|---|
| Login | `/login` |
| Register | `/register` — includes country code dropdown |

### Dashboard Pages (🔒 Auth required)

| Page | URL |
|---|---|
| Growth OS | `/dashboard/growth` |
| Listings | `/dashboard/listings` |
| New Listing | `/dashboard/listings/new` |
| Edit Listing | `/dashboard/listings/[id]/edit` |
| Leads | `/dashboard/leads` |
| Analytics | `/dashboard/analytics` |
| Activity | `/dashboard/activity` |
| Profile | `/dashboard/profile` |

### Admin Pages (🛡️ ADMIN + SUPER_ADMIN)

| Page | URL |
|---|---|
| Admin Panel | `/admin` |
| Users | `/admin/users` |
| Properties | `/admin/properties` |
| Leads | `/admin/leads` |
| Messages | `/admin/messages` |
| CMS | Not currently implemented |

---

## 🔌 API Reference

### Mock API Routes (Flask on Render.com)

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/mock/apartment/1bhk` | Mock 1 BHK apartment data |
| `GET` | `/api/mock/apartment/2bhk` | Mock 2 BHK apartment data |
| `GET` | `/api/mock/apartment/3bhk` | Mock 3 BHK apartment data |
| `GET` | `/api/mock/villa` | Mock luxury villa data |
| `GET` | `/api/mock/plot` | Mock residential plot data |
| `GET` | `/api/mock/commercial` | Mock commercial space data |
| `GET` | `/health` | Health check |

### Public Routes

| Method | URL | Change |
|---|---|---|
| `POST` | `/api/leads` | Now accepts `countryCode` + `tokenCount` fields |
| `POST` | `/api/upload` | Now accepts video files (`resource_type: auto`) |

### Broker Routes

| Method | URL | Change |
|---|---|---|
| `GET` | `/api/broker/listings` | Includes `mockDataUrl` + `mediaJson` in response |
| `GET` | `/api/broker/analytics` | Includes duplicate detection stats |

---

## 🗄️ Database Schema — Changes Reference

### Property (2 new additive fields)

```prisma
model Property {
  // ... existing fields unchanged

  mockDataUrl String?   // NEW: URL to Flask mock JSON for page fallback
  mediaJson   Json?     // NEW: [{ url, type: "image"|"video", caption, order }]
  // ... existing relations unchanged
}
```

### Image (1 new field)

```prisma
model Image {
  // ... existing fields unchanged

  mediaType   String?   // NEW: "image" | "video" — Cloudinary auto-detects
}
```

### Lead (2 new additive fields)

```prisma
model Lead {
  // ... existing fields unchanged

  countryCode String?   // NEW: "+91" (India default), "+1", "+44", etc.
  tokenCount  Int?      // NEW: Character count of enquiry message (0-200)

  @@unique([propertyId, phone, createdAt]) // NEW: Duplicate prevention
}
```

### User (1 new field)

```prisma
model User {
  // ... existing fields unchanged

  plan String?   // NEW: "starter" | "professional" | "business" | "enterprise"
}
```

---

## Key Conventions

| Rule | Detail |
|---|---|
| DB access | Always through `@marketing-os/shared` — never import Prisma directly in `web` |
| Business logic | Always in `@marketing-os/api` or Flask — route handlers are thin wrappers |
| Slugs | Auto-generated from property title + UUID prefix via `generateSlug()` |
| Phone numbers | Normalized with country code — e.g. `+919999999999` |
| Property URLs | Type-specific: `/apartment/[slug]`, `/villa/[slug]`, `/plot/[slug]`, `/commercial/[slug]` |
| Legacy redirect | `/property/[slug]` → 301 redirects to correct type route |
| Fallback chain (generation) | Claude Sonnet 4.5 → Regex mock → Flask JSON mock API |
| Fallback chain (page render) | DB data → Flask mock → Hardcoded TS fallback |
| Styling | Inline styles + CSS custom properties — no Tailwind, no CSS modules |
| Charts | Pure SVG/CSS — no chart libraries |
| Animations | `prefers-reduced-motion` respected on every element |
| DB changes | ADDITIVE ONLY — never remove or rename existing fields |
| Duplicate detection | Properties: phone+city+price+BHK within 24hrs · Leads: propertyId+phone within 24hrs |
| Mock data | Flask serves JSON at `/api/mock/{type}/{bhk}`, URL stored in `Property.mockDataUrl` |
| Admin access | Super Admin controls user roles, plans, and user deletion; no CMS route currently exists |
| Country dropdown | Default India (+91) on both registration and LeadForm |
| Video | Optional media type via `Image.mediaType` — Cloudinary auto-detects |
| Flask deployment | Render.com — Docker container, auto-deploy from GitHub |
| CI/CD | GitHub Actions → test both → deploy Vercel + Render in parallel |

---

## Architecture Decisions

| Decision | Reason |
|---|---|
| Type-specific SEO routes (`/apartment/`, `/villa/`, etc.) | URL is free SEO — Google ranks "2 BHK Apartment in Mumbai" higher than "property/some-slug" |
| Flask microservice for mock data | Always-on JSON API provides Level 3 fallback when Claude + Regex both fail |
| Flask serves what DB will later serve | Same interface — swap Flask URL for real DB query with zero code change |
| 3-level fallback chain | Zero tolerance for blank pages — property pages ALWAYS render something |
| /property/[slug] → 301 redirect | Preserves existing backlinks while migrating to better SEO URL structure |
| Country code as separate field | Supports international buyers without breaking existing phone number format |
| Token counter on LeadForm | Gives buyer real-time feedback, helps broker prioritize quality leads |
| Duplicate detection at 2 levels | Prevents broker frustration (same property twice) AND buyer confusion (double enquiry) |
| Admin permissions | Super Admin has elevated user and plan management permissions |
| Render.com for Flask (not Vercel) | ffmpeg support, unlimited timeout, file system access for future video transcoding |
| mediaJson on Property plus mediaType on Image | Property-level media metadata is stored in `mediaJson`; individual media records use `Image.mediaType` |
| Additive DB changes only | Never breaks existing production data — safe to deploy at any time |

---

# 📐 Architecture Diagrams

## System Architecture — Full Overview

```mermaid
flowchart TB
    subgraph VERCEL["VERCEL — apps/web (Next.js 16)"]
        direction TB
        PUBLIC["PUBLIC PAGES<br/>/apartment/[slug]<br/>/villa/[slug]<br/>/plot/[slug]<br/>/commercial/[slug]"]
        DASHBOARD["DASHBOARD<br/>/dashboard/growth<br/>/dashboard/listings<br/>/dashboard/leads<br/>/dashboard/analytics"]
        ADMIN["ADMIN PANEL<br/>/admin/users<br/>/admin/properties<br/>/admin/leads<br/>/admin/messages"]
        API_ROUTES["API ROUTES<br/>/api/leads<br/>/api/upload<br/>/api/whatsapp/webhook<br/>/api/broker/*"]
    end

    subgraph INTERNAL["INTERNAL LIBRARIES"]
        direction TB
        API_TS["apps/api — Internal TS Library<br/>ai/ | whatsapp/ | listings/<br/>leads/ | images/ | conversation/"]
        SHARED_PKG["packages/shared<br/>Prisma Schema + Types + Utils"]
    end

    subgraph EXTERNAL["EXTERNAL SERVICES"]
        direction TB
        ANTHROPIC["Anthropic Claude 3.5 Sonnet"]
        AISENSY["AiSensy WhatsApp API"]
        SUPABASE["Supabase PostgreSQL"]
        CLOUDINARY["Cloudinary Media"]
    end

    subgraph RENDER["RENDER.COM — apps/flask-api"]
        direction TB
        MOCK_API["Mock JSON API<br/>GET /api/mock/{type}/{bhk}"]
        ASYNC_WORKER["Async Worker<br/>Future: ffmpeg transcoding"]
    end

    PUBLIC --> API_ROUTES
    DASHBOARD --> API_ROUTES
    ADMIN --> API_ROUTES

    API_ROUTES --> API_TS
    API_ROUTES --> SHARED_PKG

    API_TS --> ANTHROPIC
    API_TS --> AISENSY
    API_TS --> SUPABASE
    API_TS --> CLOUDINARY

    API_TS -->|3rd Fallback Level| MOCK_API

    SHARED_PKG --> SUPABASE

    style VERCEL fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style PUBLIC fill:#222,color:#fff,stroke:#ccc
    style DASHBOARD fill:#444,color:#fff,stroke:#ccc
    style ADMIN fill:#666,color:#fff,stroke:#ccc
    style API_ROUTES fill:#888,color:#000,stroke:#000
    style INTERNAL fill:#333,color:#fff,stroke:#fff
    style EXTERNAL fill:#555,color:#fff,stroke:#fff
    style RENDER fill:#777,color:#fff,stroke:#fff
    style ANTHROPIC fill:#999,color:#000,stroke:#000
    style AISENSY fill:#bbb,color:#000,stroke:#000
    style SUPABASE fill:#ddd,color:#000,stroke:#000
    style CLOUDINARY fill:#eee,color:#000,stroke:#000
```

---

## Listing Generation Flow — 3-Level Fallback Chain

```mermaid
flowchart TD
    subgraph INPUT["Input Sources"]
        A1["Broker sends WhatsApp<br/>'2 BHK in Mumbai, INR 50L'"]
    end

    subgraph WEBHOOK["Webhook Processing"]
        WH["AiSensy Webhook<br/>POST /api/whatsapp/webhook"]
        PARSE["parseInboundMessage()<br/>Extract phone | text | mediaUrls"]
        CONV["Conversation State Machine<br/>GREETING -> ACCUMULATING -> GENERATING"]
    end

    subgraph FALLBACK["3-Level Generation Fallback Chain"]
        L1["LEVEL 1: Claude 3.5 Sonnet<br/>- Anthropic API tool_use<br/>- Structured JSON extraction<br/>- Hindi/Hinglish supported"]
        L2["LEVEL 2: Regex Mock<br/>- No API key needed<br/>- Regex-based extraction<br/>- Works offline"]
        L3["LEVEL 3: Flask JSON Mock<br/>- GET /api/mock/{type}/{bhk}<br/>- ALWAYS returns data<br/>- 6 JSON files on Render.com"]
    end

    subgraph PERSIST["Data Persistence"]
        DB_CREATE["createListing() -> Supabase"]
        DB_PROPERTY["Property record<br/>+ mockDataUrl | mediaJson"]
        DB_IMAGES["Image records<br/>+ mediaType: image|video"]
    end

    subgraph OUTPUT["Output Delivery"]
        SEND_WA["sendMessage()<br/>Broker gets shareable URL"]
        URL["/apartment/luxury-2bhk"]
    end

    A1 --> WH
    WH --> PARSE
    PARSE --> CONV
    CONV -->|GENERATING| FALLBACK

    L1 -->|Success| PERSIST
    L1 -->|Fail| L2
    L2 -->|Success| PERSIST
    L2 -->|Fail| L3
    L3 -->|Always works| PERSIST

    DB_PROPERTY --> SEND_WA
    DB_IMAGES --> SEND_WA
    SEND_WA --> URL

    style INPUT fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style WEBHOOK fill:#333,color:#fff,stroke:#ccc
    style FALLBACK fill:#555,color:#fff,stroke:#fff,stroke-width:2px
    style L1 fill:#777,color:#fff,stroke:#ccc
    style L2 fill:#999,color:#000,stroke:#000
    style L3 fill:#bbb,color:#000,stroke:#000
    style PERSIST fill:#222,color:#fff,stroke:#ccc
    style OUTPUT fill:#444,color:#fff,stroke:#ccc
    style URL fill:#666,color:#fff,stroke:#ccc
```

---

## Property Page Data Flow — 3-Level Rendering Fallback

```mermaid
flowchart TD
    subgraph REQUEST["Browser Request"]
        REQ["GET /apartment/[slug]"]
    end

    subgraph SSR["Server Component SSR"]
        SSR_QUERY["getListingBySlug(slug)<br/>-> Supabase DB Query"]
    end

    subgraph RENDER_FALLBACK["3-Level Render Fallback Chain"]
        R_L1["LEVEL 1: Real DB Data<br/>- Property record exists<br/>- Images in Image[] relation<br/>- Analytics tracked"]
        R_L2["LEVEL 2: Flask Mock JSON<br/>- Fetch Property.mockDataUrl<br/>- Same shape as DB data<br/>- Adapter layer transforms"]
        R_L3["LEVEL 3: TS Hardcoded<br/>- Inline mock data objects<br/>- Per-type: 3 Apt + Villa + Plot + Commercial<br/>- NEVER shows blank page"]
    end

    subgraph CLIENT["Client Component"]
        RENDER["ApartmentClient / VillaClient<br/>/ PlotClient / CommercialClient"]
        SEO["SEO Pipeline<br/>- Title + Meta<br/>- JSON-LD Schema<br/>- Open Graph + Twitter Cards"]
        ANALYTICS["Analytics<br/>viewCount++"]
    end

    REQ --> SSR_QUERY
    SSR_QUERY --> RENDER_FALLBACK

    R_L1 -->|DB record exists| CLIENT
    R_L1 -->|No DB record| R_L2
    R_L2 -->|Flask responds| CLIENT
    R_L2 -->|Flask down / No URL| R_L3
    R_L3 -->|Always renders| CLIENT

    RENDER --> SEO
    RENDER --> ANALYTICS

    style REQUEST fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style SSR fill:#333,color:#fff,stroke:#ccc
    style RENDER_FALLBACK fill:#555,color:#fff,stroke:#fff,stroke-width:2px
    style R_L1 fill:#777,color:#fff,stroke:#ccc
    style R_L2 fill:#999,color:#000,stroke:#000
    style R_L3 fill:#bbb,color:#000,stroke:#000
    style CLIENT fill:#222,color:#fff,stroke:#ccc
    style SEO fill:#444,color:#fff,stroke:#ccc
    style ANALYTICS fill:#666,color:#fff,stroke:#ccc
```

---

## SEO Route Structure — 4 Type-Specific Patterns

```mermaid
flowchart LR
    subgraph APP["apps/web/app/"]
        HOMEPAGE["/"]
        APARTMENT["apartment/[slug]/"]
        VILLA["villa/[slug]/"]
        PLOT["plot/[slug]/"]
        COMMERCIAL["commercial/[slug]/"]
        LEGACY["property/[slug]/"]
    end

    subgraph APT_DETAIL["Apartment"]
        APT_PAGE["page.tsx<br/>SSR + Metadata + JSON-LD"]
        APT_CLIENT["ApartmentClient.tsx<br/>1BHK / 2BHK / 3BHK variants"]
    end

    subgraph VILLA_DETAIL["Villa"]
        VILLA_PAGE["page.tsx<br/>Premium Layout"]
        VILLA_CLIENT["VillaClient.tsx"]
    end

    subgraph PLOT_DETAIL["Plot"]
        PLOT_PAGE["page.tsx<br/>Land-specific"]
        PLOT_CLIENT["PlotClient.tsx<br/>Legal section"]
    end

    subgraph COMM_DETAIL["Commercial"]
        COMM_PAGE["page.tsx<br/>Business suitability"]
        COMM_CLIENT["CommercialClient.tsx<br/>Office focus"]
    end

    subgraph LEGACY_DETAIL["Legacy"]
        LEGACY_PAGE["page.tsx<br/>301 redirect"]
    end

    APARTMENT --> APT_DETAIL
    VILLA --> VILLA_DETAIL
    PLOT --> PLOT_DETAIL
    COMMERCIAL --> COMM_DETAIL
    LEGACY --> LEGACY_DETAIL

    style APP fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style APARTMENT fill:#333,color:#fff,stroke:#ccc
    style VILLA fill:#555,color:#fff,stroke:#ccc
    style PLOT fill:#777,color:#fff,stroke:#ccc
    style COMMERCIAL fill:#999,color:#000,stroke:#000
    style LEGACY fill:#bbb,color:#000,stroke:#000
    style APT_PAGE fill:#222,color:#fff,stroke:#ccc
    style VILLA_PAGE fill:#444,color:#fff,stroke:#ccc
    style PLOT_PAGE fill:#666,color:#fff,stroke:#ccc
    style COMM_PAGE fill:#888,color:#000,stroke:#000
    style LEGACY_PAGE fill:#aaa,color:#000,stroke:#000
```

**Title & Description Pattern:**

| Route | Title | Description |
|---|---|---|
| `/apartment/[slug]` | 2 BHK Apartment in Bandra West, Mumbai | Browse this 2 BHK apartment... |
| `/villa/[slug]` | 4 BHK Luxury Villa in Koregaon Park, Pune | Premium villa for sale in Pune... |
| `/plot/[slug]` | 1200 sqft Plot in Whitefield, Bangalore | Residential plot for sale... |
| `/commercial/[slug]` | 1800 sqft Office in Connaught Place, Delhi | Commercial space for sale... |

---

## Flask Mock API — Python Microservice Architecture

```mermaid
flowchart LR
    subgraph FLASK_APP["apps/flask-api/"]
        direction TB
        ENTRY["app.py<br/>Flask Entry Point | Port 5000"]
        CONFIG["requirements.txt | Dockerfile<br/>gunicorn | flask-cors"]

        subgraph ROUTES["routes/"]
            MOCK["mock.py<br/>GET /api/mock/{type}/{bhk}"]
            HEALTH["health.py<br/>GET /health"]
            PROCESSOR["processor.py<br/>Future: Async Worker"]
        end

        subgraph DATA["data/"]
            A1["apartment_1bhk.json<br/>150 sqft"]
            A2["apartment_2bhk.json<br/>850 sqft"]
            A3["apartment_3bhk.json<br/>1200 sqft"]
            V["villa.json<br/>3200 sqft"]
            P["plot.json<br/>1200 sqft"]
            C["commercial.json<br/>1800 sqft"]
        end

        TESTS["tests/test_mock.py<br/>Pytest Suite"]
    end

    ENTRY --> ROUTES
    MOCK --> DATA
    ENTRY --> TESTS

    style FLASK_APP fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style ENTRY fill:#333,color:#fff,stroke:#ccc
    style ROUTES fill:#555,color:#fff,stroke:#ccc
    style DATA fill:#777,color:#fff,stroke:#ccc
    style TESTS fill:#999,color:#000,stroke:#000
```

**API Endpoints:**

```
GET /api/mock/apartment/1bhk     -> apartment_1bhk.json
GET /api/mock/apartment/2bhk     -> apartment_2bhk.json
GET /api/mock/apartment/3bhk     -> apartment_3bhk.json
GET /api/mock/villa              -> villa.json
GET /api/mock/plot               -> plot.json
GET /api/mock/commercial         -> commercial.json
GET /health                      -> { status: "ok", version: "1.0.0" }
```

**Each mock JSON contains:**
```json
{
  "title": "2 BHK Apartment in Bandra West, Mumbai",
  "description": "...",
  "price": 12000000,
  "priceLabel": "Rs 1.2 Cr",
  "bedrooms": 2,
  "bathrooms": 2,
  "areaSqft": 850,
  "city": "Mumbai",
  "address": "Bandra West, Mumbai",
  "type": "APARTMENT",
  "features": ["Modular Kitchen", "Vitrified Tiles", "False Ceiling"],
  "amenities": ["Swimming Pool", "Gym", "Security", "Garden"],
  "images": [
    { "url": "https://placehold.co/800x600", "caption": "Living Room", "type": "image" }
  ],
  "broker": { "name": "Rahul Sharma", "phone": "918850908790", "agency": "Marketing OS Realty" },
  "location": { "lat": 19.0596, "lng": 72.8295 }
}
```

---

## Database Schema — Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Property : owns
    User ||--o{ WhatsappMessage : sends
    User ||--o{ Session : has
    User ||--o{ Account : has
    Property ||--o{ Image : has
    Property ||--o{ Lead : receives
    Property ||--|| Analytics : tracked_by

    User {
        string id PK
        string name
        string email
        string phone
        string passwordHash
        enum role "BROKER | ADMIN | SUPER_ADMIN"
        enum plan "starter | professional | business | enterprise"
    }
    Property {
        string id PK
        string slug
        string ownerId FK
        string title
        string city
        int price
        enum type
        enum status
        string mockDataUrl "NEW"
        json mediaJson "NEW"
    }
    Image {
        string id PK
        string propertyId FK
        string url
        string mediaType "image | video"
        int order
    }
    Lead {
        string id PK
        string propertyId FK
        string name
        string phone
        string countryCode "NEW"
        int tokenCount "NEW"
        string source
    }
    Analytics {
        string id PK
        string propertyId FK
        int viewCount
        int inquiryCount
    }
    WhatsappMessage {
        string id PK
        string userId FK
        string content
        enum direction
    }
    ConversationState {
        string id PK
        string userId
        string state
        json context
    }
```

**Additive DB Changes Summary:**

```mermaid
flowchart LR
    subgraph PROPERTY["Property"]
        P_ADD1["+ mockDataUrl String?"]
        P_ADD2["+ mediaJson Json?"]
    end

    subgraph LEAD["Lead"]
        L_ADD1["+ countryCode String?"]
        L_ADD2["+ tokenCount Int?"]
        L_ADD3["@@unique([propertyId, phone, createdAt])"]
    end

    subgraph USER["User"]
        U_ADD1["+ plan Plan?"]
    end

    subgraph IMAGE["Image"]
        I_ADD1["+ mediaType String?"]
    end

    style PROPERTY fill:#333,color:#fff,stroke:#ccc
    style LEAD fill:#555,color:#fff,stroke:#ccc
    style USER fill:#777,color:#fff,stroke:#ccc
    style IMAGE fill:#999,color:#000,stroke:#000
    style P_ADD1 fill:#222,color:#fff,stroke:#ccc
    style P_ADD2 fill:#222,color:#fff,stroke:#ccc
    style L_ADD1 fill:#444,color:#fff,stroke:#ccc
    style L_ADD2 fill:#444,color:#fff,stroke:#ccc
    style L_ADD3 fill:#666,color:#fff,stroke:#ccc
    style U_ADD1 fill:#888,color:#000,stroke:#000
    style I_ADD1 fill:#aaa,color:#000,stroke:#000
```

---

## CI/CD Pipeline — GitHub Actions

```mermaid
flowchart LR
    subgraph TRIGGER["Trigger"]
        GIT_PUSH["Git Push to main"]
    end

    subgraph JOB1["Job 1: Test"]
        direction TB
        INSTALL["pnpm install --no-frozen-lockfile"]
        TYPE_CHECK["pnpm type-check"]
        LINT["pnpm lint"]
        VITEST["pnpm --filter web test:run (Vitest tests)"]
        PYTEST["pytest apps/flask-api/"]
        BUILD["pnpm build --filter=web..."]
    end

    subgraph DECISION["All Pass?"]
        PASS["All Checks Pass"]
        FAIL["Build Fails"]
    end

    subgraph JOB2["Job 2: Deploy Web"]
        VERCEL_DEP["Vercel Deploy Hook<br/>-> brisvora.vercel.app"]
    end

    subgraph JOB3["Job 3: Deploy Flask"]
        RENDER_DEP["Render.com Deploy Hook<br/>-> brisvora-flask.onrender.com"]
    end

    GIT_PUSH --> JOB1
    INSTALL --> DECISION
    TYPE_CHECK --> DECISION
    LINT --> DECISION
    VITEST --> DECISION
    PYTEST --> DECISION
    BUILD --> DECISION

    DECISION -->|All pass| JOB2
    DECISION -->|All pass| JOB3
    DECISION -->|Any fail| FAIL

    style TRIGGER fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style JOB1 fill:#333,color:#fff,stroke:#ccc
    style DECISION fill:#555,color:#fff,stroke:#fff,stroke-width:2px
    style FAIL fill:#999,color:#000,stroke:#000
    style JOB2 fill:#777,color:#fff,stroke:#ccc
    style JOB3 fill:#bbb,color:#000,stroke:#000
    style VERCEL_DEP fill:#222,color:#fff,stroke:#ccc
    style RENDER_DEP fill:#444,color:#fff,stroke:#ccc
```

---

## CMS Layer — Super Admin Only

```mermaid
flowchart LR
    subgraph CMS["CMS CONTROL PANEL (Super Admin Only)"]
        direction TB

        SCHEMAS["PROPERTY TYPE SCHEMAS"]
        TEMPLATES["TEMPLATE LAYOUTS"]
        GLOBAL["GLOBAL CONTENT"]
        MOCK_CTRL["MOCK DATA MANAGEMENT"]

        subgraph SCHEMAS_DETAIL[" "]
            APT_SCHEMA["Apartment: title, price, BHK,<br/>area, floor, parking"]
            VILLA_SCHEMA["Villa: title, price, BHK,<br/>pool, garden, floors"]
            PLOT_SCHEMA["Plot: title, price, area,<br/>zone, dimensions"]
            COMM_SCHEMA["Commercial: title, price,<br/>area, floor, parking, power"]
        end

        subgraph TEMPLATES_DETAIL[" "]
            APT_TEMP["Apartment: hero + specs + features"]
            VILLA_TEMP["Villa: taller hero + premium specs"]
            PLOT_TEMP["Plot: hero + legal + land info"]
            COMM_TEMP["Commercial: hero + business suitability"]
            EDITOR["Section order editor (drag & drop)"]
        end

        subgraph GLOBAL_DETAIL[" "]
            LABELS["Section labels / text"]
            CTA["CTA button copies"]
            FEATURES["Feature descriptions"]
            DEFAULT_PHONE["Default country code"]
        end

        subgraph MOCK_DETAIL[" "]
            EDIT_JSON["Edit mock JSON inline"]
            PREVIEW["Preview mock rendering"]
            DEPLOY["Deploy changes to Flask"]
            HISTORY["Version history"]
        end
    end

    CMS --> STORAGE["Stored in Supabase CMS table"]
    STORAGE --> PROPAGATE["Changes propagate to all new listings"]

    style CMS fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style SCHEMAS fill:#333,color:#fff,stroke:#ccc
    style TEMPLATES fill:#555,color:#fff,stroke:#ccc
    style GLOBAL fill:#777,color:#fff,stroke:#ccc
    style MOCK_CTRL fill:#999,color:#000,stroke:#000
    style SCHEMAS_DETAIL fill:#222,color:#fff,stroke:#ccc
    style TEMPLATES_DETAIL fill:#444,color:#fff,stroke:#ccc
    style GLOBAL_DETAIL fill:#666,color:#fff,stroke:#ccc
    style MOCK_DETAIL fill:#888,color:#000,stroke:#000
    style STORAGE fill:#bbb,color:#000,stroke:#000
    style PROPAGATE fill:#ddd,color:#000,stroke:#000
```

---

## Role Hierarchy & Plan Mapping

```mermaid
flowchart TB
    subgraph ROLES["ROLE HIERARCHY"]
        SUPER["SUPER_ADMIN (You Only)"]
        ADMIN["ADMIN (Professional / Business / Enterprise)"]
        BROKER["BROKER (Starter - Free)"]
        PUBLIC["PUBLIC (No login required)"]
    end

    SUPER -->|"Full CMS control | All users/all listings<br/>Plan management | DB seeded only"| ADMIN
    ADMIN -->|"Own listings & leads<br/>Analytics dashboard"| BROKER
    BROKER -->|"Basic AI listings (<=10/mo)<br/>Dashboard | WhatsApp | SEO pages"| PUBLIC
    PUBLIC -->|"View any property page<br/>Submit lead via LeadForm"| OUT

    subgraph PLANS["PLAN MAPPING"]
        STARTER["Starter (FREE)<br/>- 10 AI listings/month<br/>- Basic dashboard<br/>- WhatsApp integration"]
        PROFESSIONAL["Professional (Rs 999/mo)<br/>- Unlimited listings<br/>- Analytics + CRM<br/>- Automation tools"]
        BUSINESS["Business (Rs 2499/mo)<br/>- Multi-user support<br/>- Priority support<br/>- Advanced analytics"]
        ENTERPRISE["Enterprise (Custom)<br/>- Custom integrations<br/>- Dedicated support<br/>- SLA guarantee"]
    end

    BROKER --> STARTER
    ADMIN --> PROFESSIONAL
    ADMIN --> BUSINESS
    SUPER --> ENTERPRISE

    style ROLES fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style SUPER fill:#222,color:#fff,stroke:#ccc
    style ADMIN fill:#444,color:#fff,stroke:#ccc
    style BROKER fill:#666,color:#fff,stroke:#ccc
    style PUBLIC fill:#888,color:#000,stroke:#000
    style PLANS fill:#333,color:#fff,stroke:#ccc
    style STARTER fill:#555,color:#fff,stroke:#ccc
    style PROFESSIONAL fill:#777,color:#fff,stroke:#ccc
    style BUSINESS fill:#999,color:#000,stroke:#000
    style ENTERPRISE fill:#bbb,color:#000,stroke:#000
```

---

## Duplicate Entry Sanitization Flow

```mermaid
flowchart LR
    subgraph PROPERTY_LEVEL["Level 1 - Property (Broker Side)"]
        direction TB
        P_INPUT["Broker submits via WhatsApp"]
        P_PARSE["parseInboundMessage()"]
        P_CHECK{"Duplicate Check<br/>Same: phone + city<br/>+ price +/-10% + BHK<br/>Within 24hrs?"}
        P_DUP["DUPLICATE FOUND<br/>-> 'Property already exists'<br/>-> Suggest editing"]
        P_NEW["NO DUPLICATE<br/>-> Proceed to Generation"]

        P_INPUT --> P_PARSE --> P_CHECK
        P_CHECK -->|Yes| P_DUP
        P_CHECK -->|No| P_NEW
    end

    subgraph LEAD_LEVEL["Level 2 - Lead (Buyer Side)"]
        direction TB
        L_INPUT["Buyer submits Lead Form"]
        L_API["POST /api/leads<br/>propertyId | phone | countryCode | message"]
        L_CHECK{"Duplicate Check<br/>Same: propertyId + phone<br/>Within 24hrs?"}
        L_DUP["DUPLICATE FOUND<br/>-> 'Already enquired'<br/>-> Do NOT create Lead"]
        L_NEW["NO DUPLICATE<br/>-> createLead()<br/>-> Analytics.inquiryCount++"]

        L_INPUT --> L_API --> L_CHECK
        L_CHECK -->|Yes| L_DUP
        L_CHECK -->|No| L_NEW
    end

    style PROPERTY_LEVEL fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style LEAD_LEVEL fill:#333,color:#fff,stroke:#fff,stroke-width:2px
    style P_CHECK fill:#555,color:#fff,stroke:#ccc
    style L_CHECK fill:#777,color:#fff,stroke:#ccc
    style P_DUP fill:#999,color:#000,stroke:#000
    style L_DUP fill:#bbb,color:#000,stroke:#000
    style P_NEW fill:#222,color:#fff,stroke:#ccc
    style L_NEW fill:#444,color:#fff,stroke:#ccc
```

---

## Country Dropdown — Registration & LeadForm

```mermaid
flowchart TB
    subgraph REGISTER["1. BROKER REGISTRATION (/register)"]
        direction TB
        R_SELECT["Select Country<br/>+91 (Default India)"]
        R_PHONE["Enter 10-digit phone"]
        R_SAVE["Saved to User.phone:<br/>countryCode + phone = '919999999999'"]

        R_SELECT --> R_PHONE --> R_SAVE
    end

    subgraph LEADFORM["2. BUYER LEAD FORM (Property Page)"]
        direction TB
        L_SELECT["Select Country<br/>+91 (Default)"]
        L_PHONE["Enter 10-digit phone"]
        L_NAME["Enter your name"]
        L_MESSAGE["Enter message<br/>Token counter below"]
        L_TOKEN["TOKEN COUNTER<br/>0 chars -> Gray 'Start typing...'<br/>1-50 -> Gray 'Great start!'<br/>51-100 -> Gray 'Good detail!'<br/>100+ -> Gray 'Too long!'"]
        L_SAVE["Saved to Lead:<br/>countryCode + phone + tokenCount"]

        L_SELECT --> L_PHONE --> L_NAME --> L_MESSAGE --> L_TOKEN --> L_SAVE
    end

    COUNTRIES["Supported Countries<br/>IN | US | UK | AE | SG<br/>AU | CA | SA | QA | OM | KW | BH"]

    REGISTER --> COUNTRIES
    LEADFORM --> COUNTRIES

    style REGISTER fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style LEADFORM fill:#333,color:#fff,stroke:#fff,stroke-width:2px
    style L_TOKEN fill:#555,color:#fff,stroke:#ccc
    style COUNTRIES fill:#777,color:#fff,stroke:#ccc
    style R_SAVE fill:#999,color:#000,stroke:#000
    style L_SAVE fill:#bbb,color:#000,stroke:#000
```

---

## Video Support — Optional Media on Property Page

```mermaid
flowchart LR
    subgraph UPLOAD["Upload API"]
        U_POST["POST /api/upload<br/>resource_type: auto"]
        CLOUD["Cloudinary<br/>Auto-detects image vs video"]
    end

    subgraph DB_MODEL["Image Model"]
        IMG["Image {<br/>  mediaType: 'image' | 'video'<br/>  url: String<br/>  thumbnailUrl: String?<br/>  caption: String?<br/>  order: Int<br/>}"]
    end

    subgraph RENDER_LOGIC["Render Logic"]
        RENDER_IF{"media.type === 'video'?"}
        VIDEO["<video controls<br/>  poster={thumbnailUrl}<br/>  <source src={url} />"]
        IMAGE["<Image src={url}<br/>  alt={caption} />"]
    end

    subgraph FUTURE["Phase 2 - Flask Transcoding"]
        FFMPEG["ffmpeg compression<br/>Multiple resolutions<br/>Thumbnail generation"]
    end

    U_POST --> CLOUD
    CLOUD --> DB_MODEL
    DB_MODEL --> RENDER_IF
    RENDER_IF -->|Yes| VIDEO
    RENDER_IF -->|No| IMAGE
    FUTURE -.->|Future async| CLOUD

    style UPLOAD fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style DB_MODEL fill:#333,color:#fff,stroke:#ccc
    style RENDER_LOGIC fill:#555,color:#fff,stroke:#fff,stroke-width:2px
    style VIDEO fill:#777,color:#fff,stroke:#ccc
    style IMAGE fill:#999,color:#000,stroke:#000
    style FUTURE fill:#bbb,color:#000,stroke:#000
```

---

## Master Reactive System Architecture — Event Propagation & State Update Flow

This diagram shows the **complete reactive interaction** across the entire platform — how every event triggers cascading state updates, how components react to changes in real-time, and how the system maintains perfect consistency across all layers.

```mermaid
flowchart TB
    %% EVENT ORIGINS
    subgraph EVENT_SOURCES["EVENT SOURCES (Triggers)"]
        direction TB
        E1("Broker WhatsApp<br/>'2 BHK in Mumbai, INR 50L'")
        E2("Buyer Lead Form<br/>'Interested in this property'")
        E3("Buyer Page Visit<br/>GET /apartment/luxury-2bhk")
        E4("User Registration<br/>+91 9999999999")
        E5("Admin Action<br/>Update/Delete/Override")
    end

    %% EVENT PROCESSING LAYER (Vercel)
    subgraph EVENT_PROC["EVENT PROCESSING (Vercel - Next.js 16)"]
        direction TB
        WH["Webhook Handler<br/>POST /api/whatsapp/webhook"]
        LH["Lead Handler<br/>POST /api/leads"]
        PH["Page Handler<br/>Server Component SSR"]
        RH["Register Handler<br/>POST /api/register"]
        UH["Upload Handler<br/>POST /api/upload"]
        AH["Admin Handler<br/>PUT /api/admin/*"]
    end

    E1 --> WH
    E2 --> LH
    E3 --> PH
    E4 --> RH
    E5 --> AH

    %% BUSINESS LOGIC LAYER
    subgraph BUS_LOGIC["BUSINESS LOGIC (apps/api - Internal TS Library)"]
        direction TB
        AI_FALLBACK["3-Level Fallback Chain<br/>Claude 3.5 -> Regex -> Flask"]
        DUPE_PROP["Property Dup Detection<br/>phone+city+price+BHK <= 24hrs"]
        DUPE_LEAD["Lead Dup Detection<br/>propertyId+phone <= 24hrs"]
        DUPE_USER["User Dup Detection<br/>email/phone already exists"]
        OTP_FLOW["OTP Flow<br/>send -> verify -> phoneVerified"]
        CONV_STATE["Conversation State Machine<br/>GREETING -> ACCUMULATING -> GENERATING"]
        MEDIA_PROC["Media Processing<br/>Cloudinary Upload -> mediaJson"]
        ANALYTICS["Analytics Pipeline<br/>viewCount++ -> inquiryCount++"]
    end

    WH --> CONV_STATE
    CONV_STATE -->|GENERATING| AI_FALLBACK
    WH --> DUPE_PROP
    DUPE_PROP -->|Pass| AI_FALLBACK
    DUPE_PROP -->|Block: Already exists| BROKER_BLOCK(["Reply: Property exists"])

    LH --> DUPE_LEAD
    DUPE_LEAD -->|Pass| LEADS["Lead Sanitization<br/>tokenCount | countryCode"]
    DUPE_LEAD -->|Block: Already enquired| BUYER_BLOCK(["Return: Already enquired"])

    RH --> DUPE_USER
    DUPE_USER -->|Pass| OTP_FLOW
    DUPE_USER -->|Block: 409 Conflict| REG_BLOCK(["409: Email/phone in use"])

    PH --> ANALYTICS
    PH --> RENDER_FALLBACK["3-Level Render Fallback<br/>DB -> Flask Mock -> TS Hardcoded"]

    E5 --> AH

    %% DATA PERSISTENCE LAYER
    subgraph DATA_PERSIST["DATA PERSISTENCE (packages/shared + Supabase)"]
        direction TB
        DB_PROPERTY["Property<br/>+ slug | mockDataUrl | mediaJson | plan"]
        DB_USER["User<br/>+ phone | countryCode | phoneVerified | role | plan"]
        DB_LEAD["Lead<br/>+ propertyId | phone | countryCode | tokenCount"]
        DB_IMAGE["Image<br/>+ url | mediaType: image|video | order"]
        DB_ANALYTICS["Analytics<br/>+ viewCount | inquiryCount"]
        DB_OTP["OtpVerification<br/>+ otp | expiresAt | attempts | verified"]
        DB_CONV["ConversationState<br/>+ state | context"]
        DB_MSG["WhatsappMessage<br/>+ content | direction"]
    end

    AI_FALLBACK -->|createListing| DB_PROPERTY
    AI_FALLBACK --> DB_IMAGE
    DUPE_PROP --> DB_PROPERTY
    LEADS --> DB_LEAD
    DUPE_LEAD --> DB_LEAD
    ANALYTICS --> DB_ANALYTICS
    OTP_FLOW --> DB_OTP
    OTP_FLOW -->|phoneVerified=true| DB_USER
    DUPE_USER --> DB_USER
    CONV_STATE --> DB_CONV
    CONV_STATE --> DB_MSG
    MEDIA_PROC --> DB_IMAGE
    MEDIA_PROC --> DB_PROPERTY
    AH --> DB_PROPERTY
    AH --> DB_USER
    AH --> DB_LEAD

    %% REACTIVE UI LAYER
    subgraph REACTIVE_UI["REACTIVE UI (apps/web - Dashboard Components)"]
        direction TB
        UI_GROWTH["Growth OS<br/>Pending tasks | AI credits<br/>Quick actions | Activity feed"]
        UI_LISTINGS["Listings Panel<br/>Real-time property list<br/>Status | Views | Enquiries"]
        UI_LEADS["Leads Panel<br/>Enquiry stream<br/>Source | Token count | Time"]
        UI_ANALYTICS["Analytics Dashboard<br/>Views chart | Inquiries chart<br/>Conversion rate"]
        UI_PROFILE["Profile Page<br/>Phone | Country code<br/>Verify OTP button"]
        UI_ACTIVITY["Activity Log<br/>Webhook events | Errors<br/>State transitions"]
    end

    DB_PROPERTY -->|useSWR revalidation| UI_LISTINGS
    DB_PROPERTY --> UI_GROWTH
    DB_LEAD -->|useSWR revalidation| UI_LEADS
    DB_LEAD --> UI_ANALYTICS
    DB_ANALYTICS --> UI_ANALYTICS
    DB_ANALYTICS --> UI_LISTINGS
    DB_USER --> UI_PROFILE
    DB_USER --> UI_GROWTH
    DB_CONV --> UI_ACTIVITY
    DB_MSG --> UI_ACTIVITY

    %% EXTERNAL SERVICE REACTIONS
    subgraph EXT_REACT["EXTERNAL SERVICE REACTIONS"]
        direction TB
        SEND_WA["AiSensy Send<br/>OTP | Listing URL | Reply"]
        WEBHOOK_WA["AiSensy Webhook<br/>Inbound message -> Event"]
        CLOUD_UPLOAD["Cloudinary Upload<br/>Image | Video | Auto-detect"]
        ANTHROPIC_API["Anthropic API<br/>Claude 3.5 Sonnet"]
        FLASK_MOCK["Flask Mock API<br/>GET /api/mock/{type}/{bhk}"]
        SEO_PIPELINE["SEO Pipeline<br/>JSON-LD | OG | Twitter Cards"]
        REDIRECT_301["Legacy Redirect<br/>property/[slug] -> 301 -> type route"]
    end

    OTP_FLOW --> SEND_WA
    AI_FALLBACK --> SEND_WA
    AI_FALLBACK -->|Level 1| ANTHROPIC_API
    AI_FALLBACK -->|Level 3| FLASK_MOCK
    PH --> SEO_PIPELINE
    PH --> REDIRECT_301
    SEND_WA -->|OTP delivered| UI_PROFILE
    SEND_WA -->|URL shared| UI_LISTINGS

    %% REACTIVE CASCADE LABELS
    CASCADE1("REACTIVE CASCADE 1<br/>WhatsApp -> Webhook -> Conversation -><br/>Fallback -> DB -> UI -> WhatsApp Reply")
    CASCADE2("REACTIVE CASCADE 2<br/>Page Visit -> SSR -> DB/Fallback -><br/>Render -> Analytics++ -> SEO Pipeline")
    CASCADE3("REACTIVE CASCADE 3<br/>Lead Form -> Dup Check -> Lead DB -><br/>Analytics++ -> Broker Dashboard UI")
    CASCADE4("REACTIVE CASCADE 4<br/>Registration -> Dup Check -> OTP -><br/>Phone Verify -> Dashboard Unlock")

    CASCADE1 -.->|"Chain 1"| WH
    CASCADE2 -.->|"Chain 2"| PH
    CASCADE3 -.->|"Chain 3"| LH
    CASCADE4 -.->|"Chain 4"| RH

    %% STYLES
    style EVENT_SOURCES fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style EVENT_PROC fill:#222,color:#fff,stroke:#ccc
    style BUS_LOGIC fill:#444,color:#fff,stroke:#ccc
    style DATA_PERSIST fill:#666,color:#fff,stroke:#ccc
    style REACTIVE_UI fill:#888,color:#000,stroke:#000
    style EXT_REACT fill:#aaa,color:#000,stroke:#000

    style E1 fill:#222,color:#fff,stroke:#ccc
    style E2 fill:#444,color:#fff,stroke:#ccc
    style E3 fill:#666,color:#fff,stroke:#ccc
    style E4 fill:#888,color:#000,stroke:#000
    style E5 fill:#bbb,color:#000,stroke:#000

    style WH fill:#333,color:#fff,stroke:#ccc
    style LH fill:#333,color:#fff,stroke:#ccc
    style PH fill:#333,color:#fff,stroke:#ccc
    style RH fill:#333,color:#fff,stroke:#ccc
    style UH fill:#333,color:#fff,stroke:#ccc
    style AH fill:#333,color:#fff,stroke:#ccc

    style AI_FALLBACK fill:#555,color:#fff,stroke:#ccc
    style DUPE_PROP fill:#777,color:#fff,stroke:#ccc
    style DUPE_LEAD fill:#777,color:#fff,stroke:#ccc
    style DUPE_USER fill:#777,color:#fff,stroke:#ccc
    style CONV_STATE fill:#999,color:#000,stroke:#000
    style OTP_FLOW fill:#999,color:#000,stroke:#000
    style ANALYTICS fill:#bbb,color:#000,stroke:#000

    style CASCADE1 fill:#333,color:#fff,stroke:#fff,stroke-width:2px
    style CASCADE2 fill:#333,color:#fff,stroke:#fff,stroke-width:2px
    style CASCADE3 fill:#333,color:#fff,stroke:#fff,stroke-width:2px
    style CASCADE4 fill:#333,color:#fff,stroke:#fff,stroke-width:2px

    style SEND_WA fill:#444,color:#fff,stroke:#ccc
    style WEBHOOK_WA fill:#444,color:#fff,stroke:#ccc
    style FLASK_MOCK fill:#666,color:#fff,stroke:#ccc
    style ANTHROPIC_API fill:#888,color:#000,stroke:#000
    style CLOUD_UPLOAD fill:#aaa,color:#000,stroke:#000
    style SEO_PIPELINE fill:#ccc,color:#000,stroke:#000
    style REDIRECT_301 fill:#eee,color:#000,stroke:#000

    style UI_GROWTH fill:#555,color:#fff,stroke:#ccc
    style UI_LISTINGS fill:#555,color:#fff,stroke:#ccc
    style UI_LEADS fill:#555,color:#fff,stroke:#ccc
    style UI_ANALYTICS fill:#555,color:#fff,stroke:#ccc
    style UI_PROFILE fill:#555,color:#fff,stroke:#ccc
    style UI_ACTIVITY fill:#555,color:#fff,stroke:#ccc

    style BROKER_BLOCK fill:#777,color:#fff,stroke:#ccc
    style BUYER_BLOCK fill:#777,color:#fff,stroke:#ccc
    style REG_BLOCK fill:#777,color:#fff,stroke:#ccc
```

---

## Async Webhook Processing Architecture (Future)

```mermaid
flowchart LR
    subgraph CURRENT["CURRENT (Synchronous)"]
        CUR_WEBHOOK["AiSensy Webhook -> Vercel<br/>Handles everything synchronously<br/>  Text-only, 1-2 images, fast Claude<br/>  Risk: 10s timeout on heavy loads"]
    end

    subgraph FUTURE["FUTURE (Async Queue)"]
        direction TB

        F_WEBHOOK["POST /api/whatsapp/webhook<br/>-> parseInboundMessage() (instant <100ms)"]
        F_QUEUE["-> Save to Queue Table / Redis"]
        F_200["-> Return 200 OK instantly"]
        F_FLASK["Flask async worker picks up queue<br/>-> downloadMedia() from URLs<br/>-> uploadImage() to Cloudinary<br/>-> generateListing() via Claude<br/>-> createListing() to Supabase<br/>-> sendMessage() reply to broker<br/>  No 10s timeout - unlimited time"]

        F_WEBHOOK --> F_QUEUE
        F_QUEUE --> F_200
        F_QUEUE --> F_FLASK
    end

    subgraph BENEFIT["BENEFIT"]
        BENEFIT_TEXT["Broker gets instant<br/>'Listing being processed' reply<br/>instead of waiting 10-30 seconds"]
    end

    CURRENT -.->|Evolution| FUTURE
    FUTURE --> BENEFIT

    style CURRENT fill:#555,color:#fff,stroke:#ccc
    style FUTURE fill:#000,color:#fff,stroke:#fff,stroke-width:2px
    style F_200 fill:#333,color:#fff,stroke:#ccc
    style F_FLASK fill:#777,color:#fff,stroke:#ccc
    style BENEFIT fill:#999,color:#000,stroke:#000
```

---

## 🧪 Testing

```bash
# Vitest tests + Pytest suite
pnpm --filter web test:run
cd apps/flask-api && pytest
```

| Test Suite | Type | Count | What it tests |
|---|---|---|---|
| `api.edge-cases.test.ts` | Vitest | ✓ | API fallback chain, rate limiting, timeout handling |
| `dashboard.edge-cases.test.ts` | Vitest | ✓ | Dashboard rendering, empty states, error boundaries |
| Flask `test_mock.py` | Pytest | ✓ | Mock API endpoints, JSON validation, health check |

---

## 📝 License

Private — All Rights Reserved. © 2025 Marketing OS