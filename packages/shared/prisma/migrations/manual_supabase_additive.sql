-- Additive migration for Brisvora Supabase database
-- Run this in Supabase SQL Editor (Ctrl + Enter)

-- 1. Property model — new fields for mock data fallback and media
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "mockDataUrl" TEXT;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "mediaJson" JSONB;

-- 2. Lead model — country code for dropdown, token counter for AI token tracking
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "countryCode" TEXT DEFAULT '+91';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "tokenCount" INTEGER DEFAULT 0;

-- 3. User model — plan field for subscription tiers (starter, professional, business, enterprise)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "plan" TEXT DEFAULT 'starter';

-- 4. Image model — mediaType to distinguish image vs video
ALTER TABLE "Image" ADD COLUMN IF NOT EXISTS "mediaType" TEXT DEFAULT 'image';

-- 5. Duplicate detection index (PostgreSQL 14 compatible — no NULLS NOT DISTINCT)
-- This enables fast queries for: same broker + same city + same price + same bedrooms within 24hrs
CREATE INDEX IF NOT EXISTS "idx_property_dedup"
  ON "Property" ("ownerPhone", "city", "price", "bedrooms")
  WHERE "ownerPhone" IS NOT NULL;

-- 6. Index for slug lookups on new SEO routes
CREATE INDEX IF NOT EXISTS "idx_property_slug_lookup"
  ON "Property" ("slug");