-- Make ownerId nullable for unclaimed WhatsApp listings
ALTER TABLE "Property" ALTER COLUMN "ownerId" DROP NOT NULL;

-- Add ownerPhone to track who created via WhatsApp
ALTER TABLE "Property" ADD COLUMN "ownerPhone" TEXT;

-- Add index on ownerPhone for fast claim lookup
CREATE INDEX "Property_ownerPhone_idx" ON "Property"("ownerPhone");
