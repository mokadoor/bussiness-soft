/*
# Business Software TN — Full CMS Schema

## Summary
Creates the complete content management schema for the Business Software TN
corporate website and admin dashboard. All tables support CRUD from an
authenticated admin dashboard while the public website reads published content.

## New Tables
1. `products` — Nexus software products (ERP, CRM, Bois, Smart Point)
2. `services` — Consulting and development services
3. `industries` — Industry sectors served
4. `clients` — Client references / case studies
5. `testimonials` — Client testimonials with ratings
6. `team_members` — Leadership / team profiles
7. `faqs` — Frequently asked questions
8. `statistics` — Homepage animated statistics counters
9. `contact_messages` — Submissions from the contact form
10. `news` — News / blog / case-study articles

## Security (RLS)
- Content tables (products, services, industries, clients, testimonials,
  team_members, faqs, statistics, news): public SELECT (anon + authenticated),
  authenticated-only INSERT/UPDATE/DELETE for admin management.
- contact_messages: public INSERT (anyone can submit the form),
  authenticated-only SELECT/UPDATE/DELETE (admin reads and manages messages).

## Notes
- All tables include `created_at` / `updated_at` timestamps and a `sort_order`
  integer for manual ordering where relevant.
- `is_published` boolean allows draft/published workflow.
- No `user_id` ownership columns — content is shared CMS data managed by any
  authenticated admin, not per-user isolated data.
*/

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  category text,
  icon text DEFAULT 'Boxes',
  summary text,
  description text,
  features jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  modules jsonb DEFAULT '[]'::jsonb,
  faqs jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  icon text DEFAULT 'Compass',
  summary text,
  description text,
  features jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Industries
CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  icon text DEFAULT 'Factory',
  description text,
  solutions jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients / References
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  products jsonb DEFAULT '[]'::jsonb,
  description text,
  logo_url text,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  quote text,
  rating int DEFAULT 5,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  bio text,
  initials text,
  photo_url text,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text,
  category text,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Statistics
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value int NOT NULL DEFAULT 0,
  suffix text DEFAULT '',
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  category text,
  published_date date,
  is_published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_clients_published ON clients(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_team_members_published ON team_members(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_statistics_published ON statistics(is_published);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);

-- updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['products','services','industries','clients','testimonials','team_members','faqs','statistics','contact_messages','news']) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_set_updated_at ON %I;', t);
    EXECUTE format('CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at();', t);
  END LOOP;
END $$;

-- ============ RLS ============

-- Helper: enable RLS on all content tables
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['products','services','industries','clients','testimonials','team_members','faqs','statistics','contact_messages','news']) LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;
END $$;

-- Content tables: public read, authenticated write
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['products','services','industries','clients','testimonials','team_members','faqs','statistics','news']) LOOP
    -- SELECT (public)
    EXECUTE format('DROP POLICY IF EXISTS "public_read_%s" ON %I;', t, t);
    EXECUTE format('CREATE POLICY "public_read_%s" ON %s FOR SELECT TO anon, authenticated USING (true);', t, t);
    -- INSERT (admin)
    EXECUTE format('DROP POLICY IF EXISTS "admin_insert_%s" ON %I;', t, t);
    EXECUTE format('CREATE POLICY "admin_insert_%s" ON %s FOR INSERT TO authenticated WITH CHECK (true);', t, t);
    -- UPDATE (admin)
    EXECUTE format('DROP POLICY IF EXISTS "admin_update_%s" ON %I;', t, t);
    EXECUTE format('CREATE POLICY "admin_update_%s" ON %s FOR UPDATE TO authenticated USING (true) WITH CHECK (true);', t, t);
    -- DELETE (admin)
    EXECUTE format('DROP POLICY IF EXISTS "admin_delete_%s" ON %I;', t, t);
    EXECUTE format('CREATE POLICY "admin_delete_%s" ON %s FOR DELETE TO authenticated USING (true);', t, t);
  END LOOP;
END $$;

-- Contact messages: public insert, authenticated read/manage
DROP POLICY IF EXISTS "public_insert_messages" ON contact_messages;
CREATE POLICY "public_insert_messages" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_messages" ON contact_messages;
CREATE POLICY "admin_read_messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_messages" ON contact_messages;
CREATE POLICY "admin_update_messages" ON contact_messages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_messages" ON contact_messages;
CREATE POLICY "admin_delete_messages" ON contact_messages
  FOR DELETE TO authenticated USING (true);
