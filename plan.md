# Marketing OS — Project Plan

## What Is This?
AI-powered property listing platform for Indian real estate brokers (similar to PropSite).
Brokers send a WhatsApp message with property details → AI generates a polished listing page → broker gets a shareable link back via WhatsApp → visitors can contact the broker.

---

## Tech Stack
- **Frontend:** Next.js 16 (App Router) + Tailwind CSS
- **Backend:** Next.js API routes (no separate server)
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Auth:** NextAuth v5 (beta) with bcryptjs credentials
- **AI:** Anthropic Claude Haiku (currently mocked)
- **WhatsApp:** Meta Cloud API
- **Images:** Cloudinary
- **Monorepo:** pnpm workspaces + Turborepo
- **Deployment:** Vercel

---

## Deployment Status ✅ LIVE
**Live URL:** `https://<your-vercel-app>.vercel.app`
**WhatsApp Webhook:** `https://<your-vercel-app>.vercel.app/api/whatsapp/webhook`
**Status:** Fully deployed and operational

---

## Environment Variables (Production)
```env
AUTH_SECRET=<your_auth_secret>
DATABASE_URL=<your_supabase_database_url>
NEXTAUTH_URL=https://<your-vercel-app>.vercel.app

# WhatsApp Meta Cloud API
META_WHATSAPP_VERIFY_TOKEN=<your_verify_token>
META_PHONE_NUMBER_ID=<your_phone_number_id>
META_ACCESS_TOKEN=<your_meta_access_token>
META_APP_SECRET=<your_meta_app_secret>

# AI (currently mocked — add real key to enable)
ANTHROPIC_API_KEY=<your_anthropic_api_key>

# Cloudinary (image upload — add to enable)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

---

## What Is Done ✅

### Infrastructure & Deployment
- [x] Monorepo setup with pnpm workspaces + Turborepo
- [x] Supabase PostgreSQL database connected
- [x] Prisma schema defined and migrated (`pnpm db:migrate`)
- [x] Prisma client generated
- [x] **FULLY DEPLOYED TO VERCEL** ✅
- [x] **All TypeScript issues resolved** ✅
- [x] **Production build successful** ✅

### Auth
- [x] Register page (`/register`) — creates user with hashed password
- [x] Login page (`/login`) — NextAuth credentials provider
- [x] Session provider in root layout
- [x] Dashboard route protection via `proxy.ts`
- [x] Sign out button (client component)
- [x] **NextAuth type declarations for role property** ✅

### WhatsApp Integration ✅ WORKING
- [x] **Meta WhatsApp Cloud API fully configured** ✅
- [x] **Webhook URL verified with Meta** ✅
- [x] **Webhook endpoint responding correctly** ✅
- [x] **Message receiving capability** ✅
- [x] **Message sending capability** ✅
- [x] **Business phone number registered** ✅
- [x] **Current workflow: Single message → Instant property listing** ✅

### Backend API Routes
- [x] `GET /api/whatsapp/webhook` — Meta webhook verification handshake
- [x] `POST /api/whatsapp/webhook` — inbound message handler (parse → AI → save → reply)
- [x] `GET /api/properties` — public property search with filters
- [x] `POST /api/properties` — create listing via web form (auth required)
- [x] `GET /api/properties/[slug]` — public listing detail + view count increment
- [x] `GET /api/broker/listings` — broker's own listings
- [x] `PUT /api/broker/listings/[id]` — update listing
- [x] `DELETE /api/broker/listings/[id]` — delete listing
- [x] `GET /api/broker/leads` — broker's leads
- [x] `GET /api/broker/analytics` — analytics summary
- [x] `POST /api/leads` — public lead submission from listing page
- [x] `POST /api/upload` — image upload to Cloudinary
- [x] `POST /api/register` — broker registration

### Frontend Pages
- [x] `/` — homepage with hero, search bar, filter row, property grid
- [x] `/login` — email + password login form
- [x] `/register` — registration form
- [x] `/property/[slug]` — public listing page (SSR, SEO meta, image gallery, WhatsApp CTA, lead form)
- [x] `/dashboard` — analytics cards (views, leads, listings) + listings table with delete
- [x] `/dashboard/listings/new` — create listing form (raw text → AI → listing)
- [x] `/dashboard/leads` — leads table

### Backend Logic (apps/api)
- [x] AI listing generation — `generateListing()` (smart mock, ready for real API)
- [x] WhatsApp webhook — `verifyWebhook()`, `validateSignature()`, `parseInboundMessage()`, `sendMessage()`, `downloadMedia()`
- [x] Listings CRUD — `createListing()`, `getListingBySlug()`, `getBrokerListings()`, `searchListings()`, `updateListing()`, `deleteListing()`, `incrementViewCount()`
- [x] Leads — `createLead()`, `getBrokerLeads()`
- [x] Analytics — `getBrokerAnalytics()`
- [x] Image upload — `uploadImage()`, `deleteImage()`

---

## Current System Capabilities 🚀

### **What Works RIGHT NOW:**
1. **Single Message Property Creation**:
   - User sends: `"3 BHK apartment in Mumbai for 85 lakh with parking"`
   - System automatically creates complete property listing
   - Sends back shareable URL via WhatsApp

2. **Complete Property Management**:
   - Brokers can login and manage all listings
   - View analytics (views, leads, performance)
   - Handle incoming leads from website
   - Update/delete properties

3. **Public Property Website**:
   - Search and filter properties
   - Contact brokers via WhatsApp/forms
   - SEO-optimized property pages

### **System Completeness: ~85%**
- ✅ Database, Authentication, Dashboard
- ✅ Basic WhatsApp Integration
- ✅ AI Processing (mocked)
- ✅ Full Deployment
- 🔧 Missing: Conversational workflow

---

## What Needs Enhancement 🔧

### **1. Conversational WhatsApp Workflow** (REQUESTED)
**Current:** One message → Instant listing  
**Desired:** Multi-message conversation → Guided listing creation

**Desired Flow:**
```
User: "Hi"
Bot: "Hello! I can help you create a property listing. Please provide details..."
User: "3 BHK apartment in Mumbai for 85 lakh"
Bot: "Great! Can you provide more details like amenities, area?"
User: [More details]
Bot: "Perfect! Creating your listing now..."
System: Creates listing
Bot: "Done! Your property is listed at: [URL]"
```

**Requires Building:**
- Conversation state management
- Multi-step dialog flow
- Context tracking per user
- Guided question system

### **2. Real AI Integration** (Optional)
- Replace smart mock with Anthropic Claude API
- Add `ANTHROPIC_API_KEY` to environment
- More intelligent property detail extraction

### **3. Image Upload Enhancement** (Optional)
- Add Cloudinary credentials
- Enable image upload from WhatsApp messages
- Automatic image processing and optimization

---

## What Is Partially Done ⚠️

### AI (Smart Mock)
- Current system extracts BHK, price, city, property type from text
- Works well for basic property creation
- Can be upgraded to real Anthropic API when needed

### Image Upload
- Code is written but needs Cloudinary credentials
- WhatsApp image processing is implemented
- Just needs API keys to activate

---

## Deployment Information 📊

### **Vercel Configuration:**
- **Build Command:** `cd ../.. && cd packages/shared && npx prisma generate && cd ../.. && pnpm --filter web build`
- **Install Command:** `cd ../.. && pnmp install --no-frozen-lockfile`
- **Output Directory:** `.next`
- **Root Directory:** `apps/web`

### **Meta WhatsApp Setup:**
- **App ID:** `<your_meta_app_id>`
- **Webhook URL:** `https://<your-vercel-app>.vercel.app/api/whatsapp/webhook`
- **Verify Token:** `<your_verify_token>`
- **Status:** Verified and operational

### **Database:**
- **Provider:** Supabase PostgreSQL
- **Connection:** Transaction pooler (port 5432)
- **Status:** Connected and operational
- **All tables migrated and relationships working**

---

## Next Steps Priorities 📋

### **Immediate (Current Request):**
1. **Build Conversational WhatsApp Flow**
   - Design conversation states
   - Implement multi-step dialog
   - Add context management
   - Create guided question system

### **Optional Enhancements:**
2. **Real AI Integration** (when budget allows)
3. **Image Upload** (add Cloudinary keys)
4. **Edit Listing Page** (broker can modify listings)
5. **Broker Profile Settings** (update phone number)
6. **Advanced Analytics Dashboard**

### **Future Phase:**
- Voice input for property descriptions
- OCR for property documents
- AI price estimation
- Automated follow-up messages
- Subscription plans for brokers
- Multi-broker organization accounts

---

## Key Technical Decisions ⚙️

1. **Monorepo Architecture** — Better code organization and sharing
2. **NextAuth v5 Beta** — Modern auth with proper TypeScript support
3. **Supabase Transaction Pooler** — Production-ready database connection
4. **Meta Cloud API** — Direct WhatsApp integration (no third-party)
5. **Smart AI Mock** — Functional system while keeping costs low
6. **Vercel Deployment** — Serverless, scalable, and reliable

---

## Success Metrics 🎯

**Current Achievement:**
- ✅ **85% Complete System**
- ✅ **Fully Deployed and Operational**
- ✅ **WhatsApp Integration Working**
- ✅ **Basic Property Creation Functional**
- ✅ **Complete Property Management System**

**Ready for Production Use** with current single-message workflow.  
**Conversational workflow is the next enhancement layer.**
