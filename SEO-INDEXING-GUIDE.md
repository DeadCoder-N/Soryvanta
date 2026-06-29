# Brisvora — A-Grade SEO Setup & Indexing Guide

## What Was Implemented

### 1. Root Layout (`app/layout.tsx`)
- **Organization JSON-LD** — tells Google: name, logo, description, founding date, contact point
- **WebSite JSON-LD with SearchAction** — enables Google's site search box in results
- **Enhanced `<title>` template** — `Page Name | Brisvora` on every page
- **Comprehensive `<meta name="description">`** — keyword-rich, 120+ words
- **Open Graph (OG) tags** — title, description, URL, site name, image, locale
- **Twitter Card tags** — summary_large_image with Brisvora logo
- **`<meta name="keywords">`** — 10+ targeted keywords for property real estate
- **`<meta name="robots">`** — index, follow, max-image-preview, max-snippet
- **`<link rel="canonical">`** — auto-set on every page via metadata API
- **`<html lang="en">`** — language declaration

### 2. Sitemap (`app/sitemap.ts`)
- **Auto-generated XML sitemap** at `/sitemap.xml`
- Homepage: priority 1.0, change frequency hourly
- Login/Register: priority 0.3
- Every `ACTIVE` property: priority 0.8, change frequency daily
- Covers up to 10,000 properties

### 3. Robots.txt (`app/robots.ts`)
- Generated at `/robots.txt`
- Allows `/` for all bots
- Disallows `/dashboard/`, `/api/`, `/_next/` for privacy
- Points to sitemap.xml

### 4. Property Pages (`app/property/[slug]/page.tsx`)
- **Dynamic Open Graph** — unique OG image per property (first photo)
- **Twitter Cards** — property-specific
- **`<link rel="canonical">`** per property
- **RealEstateListing JSON-LD** per property:
  - name, description, url, images
  - offers (price in INR, availability, seller)
  - address (street, locality, country)
  - numberOfRooms, floorSize, propertyType
- **BreadcrumbList JSON-LD** per property:
  - Home > Properties > City > Property Title
- **`generateMetadata`** uses AI-generated title/description automatically

### 5. Homepage (`app/page.tsx`)
- Hero section with target keywords
- Search bar indexed by schema
- Featured/Filtered property grid

### 6. Conversion-Optimized Elements
- Every property page has:
  - Unique, AI-written description (no thin content)
  - Specs (BHK, bathrooms, area)
  - Features and amenities
  - Broker contact card
  - Lead form
  - All indexable

---

## Keywords Brisvora Will Rank For

### Primary (high intent)
- "property listings India"
- "AI real estate platform"
- "WhatsApp property listings"
- "premium property Mumbai"

### Secondary (broker search)
- "real estate broker platform"
- "create property listing online"
- "property listing website India"
- "luxury apartments India"

### Long-tail (location + type)
- "3 BHK apartment in Bandra West"
- "villa for sale in Mumbai"
- "commercial property in Delhi"
- "1 BHK flat in Bangalore"

---

## Google Search Console Indexing Instructions

### Step 1: Verify Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"URL prefix"** and enter: `https://brisvora.vercel.app`
4. Choose verification method:
   - **Recommended:** Download HTML verification file, upload to `public/` folder, commit and push
   - **Alternative:** Add meta tag to `app/layout.tsx` `<head>`
5. Click **Verify**

### Step 2: Submit Sitemap

1. In Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `https://brisvora.vercel.app/sitemap.xml`
3. Click **Submit**
4. Google will crawl and index all URLs within 24-72 hours

### Step 3: Request Indexing for Key Pages

1. Use **URL Inspection** tool in Search Console
2. Enter each of these URLs and click **"Request Indexing"**:
   - `https://brisvora.vercel.app`
   - `https://brisvora.vercel.app/login`
   - `https://brisvora.vercel.app/register`
3. After brokers create listings, those property URLs are auto-included in sitemap

### Step 4: Monitor Performance

- **Performance report** — see which queries bring traffic
- **Coverage report** — see indexed vs excluded URLs
- **Enhancements** — check Rich Results (RealEstateListing, BreadcrumbList)
- Target: 100% of active properties indexed within 1 week

### Step 5: Domain Authority (Ongoing)

- Get backlinks from real estate directories (99acres, MagicBricks, Housing.com)
- Create blog content: "How to create property listing on WhatsApp", "Best time to sell property in Mumbai"
- Add Brisvora link to broker email signatures, social profiles
- Encourage brokers to share listing URLs on WhatsApp, Facebook, Instagram
- Each shared URL creates a backlink = higher domain authority

---

## Rich Results Eligibility

Google can show enhanced search results for:

| Schema Type | What Google Shows |
|-------------|-------------------|
| RealEstateListing | Price, location, property type in search |
| BreadcrumbList | Breadcrumb trails above listing |
| WebSite + SearchAction | Site search box in Google results |
| Organization | Knowledge panel for Brisvora |

---

## Commands To Deploy

```bash
cd /home/nitesh/Desktop/Projects/BRISVORA && git add -A && git commit -m "feat: A-grade SEO — sitemap, robots, JSON-LD, OG tags" && git push
```

After push, Vercel auto-deploys. Once live:
1. Open Google Search Console
2. Add `https://brisvora.vercel.app`
3. Submit sitemap: `https://brisvora.vercel.app/sitemap.xml`
4. Request indexing for homepage

---

## Checklist Before Going Live

- [ ] Replace `YOUR_GOOGLE_VERIFICATION_CODE` in `app/layout.tsx` with actual code
- [ ] Add real social media URLs in Organization JSON-LD (`sameAs` array)
- [ ] Update contact email in Organization JSON-LD
- [ ] Verify sitemap.xml returns valid XML at `https://brisvora.vercel.app/sitemap.xml`
- [ ] Verify robots.txt at `https://brisvora.vercel.app/robots.txt`
- [ ] Test one property page with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools (optional but recommended)
