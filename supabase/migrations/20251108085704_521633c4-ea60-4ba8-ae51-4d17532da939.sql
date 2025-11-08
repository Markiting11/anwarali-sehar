-- Step 1: Create approval_status enum
DO $$ BEGIN
  CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add columns to business_listings
ALTER TABLE business_listings 
ADD COLUMN IF NOT EXISTS approval_status approval_status DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS approved_by uuid,
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Step 3: Update existing records to approved status
UPDATE business_listings 
SET approval_status = 'approved' 
WHERE is_published = true;

-- Step 4: Update RLS policy for public viewing
DROP POLICY IF EXISTS "Anyone can view published listings" ON business_listings;

CREATE POLICY "Anyone can view approved published listings"
ON business_listings FOR SELECT
USING (is_published = true AND approval_status = 'approved');

-- Step 5: Add policy for users to see their own listings regardless of status
DROP POLICY IF EXISTS "Users can view their own listings regardless of status" ON business_listings;

CREATE POLICY "Users can view their own listings regardless of status"
ON business_listings FOR SELECT
USING (auth.uid() = user_id);

-- Step 6: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_listings_approval_status ON business_listings(approval_status);
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON business_listings(user_id);