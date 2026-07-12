/*
# Add image and color columns to products and clients

## Summary
Adds `image` (text) and `color` (text) columns to the `products` table for background
image URLs and gradient color definitions. Adds `image` (text) column to the `clients`
table for client reference photos.

## Changes
1. `products` — new nullable `image` text column (Pexels image URL for card backgrounds)
2. `products` — new nullable `color` text column (Tailwind gradient classes for card theming)
3. `clients` — new nullable `image` text column (Pexels image URL for reference cards)

## Security
No RLS policy changes — existing policies already cover the new columns.
*/

ALTER TABLE products ADD COLUMN IF NOT EXISTS image text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS color text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS image text;

-- Populate image and color for existing products from the seed data
UPDATE products SET image = 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', color = 'from-[#0F4C81] to-[#00A8E8]' WHERE slug = 'nexus-erp';
UPDATE products SET image = 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800', color = 'from-[#00A8E8] to-[#0F4C81]' WHERE slug = 'nexus-crm';
UPDATE products SET image = 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=800', color = 'from-[#1d5e3a] to-[#0F4C81]' WHERE slug = 'nexus-bois';
UPDATE products SET image = 'https://images.pexels.com/photos/4212931/pexels-photo-4212931.jpeg?auto=compress&cs=tinysrgb&w=800', color = 'from-[#00A8E8] to-[#1d5e3a]' WHERE slug = 'nexus-smart-point';

-- Populate image for existing clients
UPDATE clients SET image = 'https://images.pexels.com/photos/3823624/pexels-photo-3823624.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Tunisie Plast Industries';
UPDATE clients SET image = 'https://images.pexels.com/photos/6169023/pexels-photo-6169023.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Groupe Atlas Distribution';
UPDATE clients SET image = 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Meubles & Bois du Nord';
UPDATE clients SET image = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Market Plus Stores';
UPDATE clients SET image = 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'MediClinic Tunis';
UPDATE clients SET image = 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Constructa TN';
UPDATE clients SET image = 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'Ecole Future Plus';
UPDATE clients SET image = 'https://images.pexels.com/photos/221060/pexels-photo-221060.jpeg?auto=compress&cs=tinysrgb&w=600' WHERE name = 'LogiTrans Tunisie';
