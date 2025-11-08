-- Create business_listings table
CREATE TABLE public.business_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- User info
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Step 1: Category & Title
  category text NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  
  -- Step 2: Details & Location
  description text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text,
  postal_code text,
  country text DEFAULT 'Pakistan',
  phone text NOT NULL,
  email text,
  website text,
  
  -- Step 3: Contact & Images
  featured_image_url text,
  gallery_images text[],
  whatsapp_number text,
  
  -- Step 4: Settings
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  
  -- SEO fields
  meta_title text,
  meta_description text,
  keywords text[],
  
  -- Additional fields
  business_hours jsonb,
  price_range text,
  amenities text[],
  
  -- Stats
  views_count integer DEFAULT 0,
  contact_clicks integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.business_listings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published listings"
  ON public.business_listings FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can create their own listings"
  ON public.business_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
  ON public.business_listings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
  ON public.business_listings FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all listings"
  ON public.business_listings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all listings"
  ON public.business_listings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER handle_business_listings_updated_at
  BEFORE UPDATE ON public.business_listings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Indexes for better performance
CREATE INDEX idx_listings_category ON public.business_listings(category);
CREATE INDEX idx_listings_slug ON public.business_listings(slug);
CREATE INDEX idx_listings_published ON public.business_listings(is_published);
CREATE INDEX idx_listings_city ON public.business_listings(city);
CREATE INDEX idx_listings_user_id ON public.business_listings(user_id);

-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view listing images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-images');

CREATE POLICY "Authenticated users can upload listing images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their listing images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'listing-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their listing images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'listing-images' AND auth.role() = 'authenticated');