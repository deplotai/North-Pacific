-- =============================================
-- North Pacific — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  main_category TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  sale_price DECIMAL(10,2),
  badge TEXT DEFAULT '',
  sizes TEXT[] DEFAULT '{"S","M","L","XL"}',
  images TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Offers Table (single row — site-wide config)
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enabled BOOLEAN DEFAULT false,
  title TEXT DEFAULT 'OFFER WINDOW',
  text TEXT DEFAULT '',
  banner_image TEXT DEFAULT '',
  countdown_hours INT DEFAULT 12,
  active_product_ids UUID[] DEFAULT '{}',
  position TEXT DEFAULT 'section' CHECK (position IN ('top_banner', 'section', 'both')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default offer row
INSERT INTO offers (enabled, title, text, banner_image, countdown_hours, position)
VALUES (false, 'OFFER WINDOW', 'Special bundle pricing is active for a limited time.', '', 12, 'section');

-- 3. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — Public READ for everyone
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read offers" ON offers
  FOR SELECT USING (true);

-- 5. RLS Policies — Only authenticated users can write (admin)
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can update offers" ON offers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 6. Storage Buckets (run these separately in SQL or create via Dashboard)
-- Go to Supabase Dashboard > Storage > Create Bucket:
--   Name: product-images    | Public: Yes
--   Name: offer-images      | Public: Yes
--
-- Then add storage policies via Dashboard:
--   - Public can SELECT (read/download)
--   - Authenticated users can INSERT, UPDATE, DELETE
