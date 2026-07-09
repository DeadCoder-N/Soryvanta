-- Migration: add_otp_country_phone_verify
-- Adds countryCode, phoneVerified to User; creates OtpVerification model

-- Step 1: Add columns to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "countryCode" TEXT NOT NULL DEFAULT '+91';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phoneVerified" BOOLEAN NOT NULL DEFAULT false;

-- Step 2: Add countryCode and tokenCount defaults to Lead (if not already present)
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "countryCode" TEXT NOT NULL DEFAULT '+91';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "tokenCount" INTEGER NOT NULL DEFAULT 0;

-- Step 3: Create OtpVerification table
DO $$ BEGIN
  CREATE TYPE "OtpPurpose" AS ENUM ('PHONE_VERIFICATION', 'LOGIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "OtpVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '+91',
    "otp" TEXT NOT NULL,
    "purpose" "OtpPurpose" NOT NULL DEFAULT 'PHONE_VERIFICATION',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "OtpVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "OtpVerification_phone_idx" ON "OtpVerification"("phone");
CREATE INDEX IF NOT EXISTS "OtpVerification_userId_idx" ON "OtpVerification"("userId");
