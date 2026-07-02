-- Make ownerId nullable for unclaimed WhatsApp listings
ALTER TABLE "Property" ALTER COLUMN "ownerId" DROP NOT NULL;

-- Add ownerPhone column
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "ownerPhone" TEXT;

-- Add index on ownerPhone
CREATE INDEX IF NOT EXISTS "Property_ownerPhone_idx" ON "Property"("ownerPhone");

-- Drop old cascade FK on Property and recreate as SET NULL
ALTER TABLE "Property" DROP CONSTRAINT IF EXISTS "Property_ownerId_fkey";
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Drop FK on ConversationState so phone-based keys work for unregistered users
ALTER TABLE "ConversationState" DROP CONSTRAINT IF EXISTS "ConversationState_userId_fkey";
