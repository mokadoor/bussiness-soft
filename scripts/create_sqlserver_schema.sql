-- SQL Server 2019 schema equivalent for the Business Soft app.
-- This schema is translated from the Supabase/PostgreSQL migration files.

IF OBJECT_ID('products', 'U') IS NULL
BEGIN
CREATE TABLE products (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  slug nvarchar(450) NOT NULL UNIQUE,
  name nvarchar(max) NOT NULL,
  tagline nvarchar(max) NULL,
  category nvarchar(max) NULL,
  icon nvarchar(max) NOT NULL DEFAULT N'Boxes',
  summary nvarchar(max) NULL,
  description nvarchar(max) NULL,
  features nvarchar(max) NOT NULL DEFAULT N'[]',
  benefits nvarchar(max) NOT NULL DEFAULT N'[]',
  modules nvarchar(max) NOT NULL DEFAULT N'[]',
  faqs nvarchar(max) NOT NULL DEFAULT N'[]',
  image nvarchar(max) NULL,
  color nvarchar(max) NULL,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('services', 'U') IS NULL
BEGIN
CREATE TABLE services (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  slug nvarchar(450) NOT NULL UNIQUE,
  title nvarchar(max) NOT NULL,
  icon nvarchar(max) NOT NULL DEFAULT N'Compass',
  summary nvarchar(max) NULL,
  description nvarchar(max) NULL,
  features nvarchar(max) NOT NULL DEFAULT N'[]',
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('industries', 'U') IS NULL
BEGIN
CREATE TABLE industries (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  slug nvarchar(450) NOT NULL UNIQUE,
  name nvarchar(max) NOT NULL,
  icon nvarchar(max) NOT NULL DEFAULT N'Factory',
  description nvarchar(max) NULL,
  solutions nvarchar(max) NOT NULL DEFAULT N'[]',
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('clients', 'U') IS NULL
BEGIN
CREATE TABLE clients (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  name nvarchar(max) NOT NULL,
  industry nvarchar(max) NULL,
  products nvarchar(max) NOT NULL DEFAULT N'[]',
  description nvarchar(max) NULL,
  logo_url nvarchar(max) NULL,
  image nvarchar(max) NULL,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('testimonials', 'U') IS NULL
BEGIN
CREATE TABLE testimonials (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  name nvarchar(max) NOT NULL,
  role nvarchar(max) NULL,
  company nvarchar(max) NULL,
  quote nvarchar(max) NULL,
  rating int NOT NULL DEFAULT 5,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('team_members', 'U') IS NULL
BEGIN
CREATE TABLE team_members (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  name nvarchar(max) NOT NULL,
  role nvarchar(max) NULL,
  bio nvarchar(max) NULL,
  initials nvarchar(max) NULL,
  photo_url nvarchar(max) NULL,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('faqs', 'U') IS NULL
BEGIN
CREATE TABLE faqs (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  question nvarchar(max) NOT NULL,
  answer nvarchar(max) NULL,
  category nvarchar(max) NULL,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('statistics', 'U') IS NULL
BEGIN
CREATE TABLE statistics (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  label nvarchar(max) NOT NULL,
  value int NOT NULL DEFAULT 0,
  suffix nvarchar(max) NOT NULL DEFAULT N'',
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('contact_messages', 'U') IS NULL
BEGIN
CREATE TABLE contact_messages (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  name nvarchar(max) NOT NULL,
  email nvarchar(max) NOT NULL,
  phone nvarchar(max) NULL,
  company nvarchar(max) NULL,
  subject nvarchar(max) NULL,
  message nvarchar(max) NULL,
  status nvarchar(max) NOT NULL DEFAULT N'new',
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

IF OBJECT_ID('news', 'U') IS NULL
BEGIN
CREATE TABLE news (
  id uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  slug nvarchar(450) NOT NULL UNIQUE,
  title nvarchar(max) NOT NULL,
  excerpt nvarchar(max) NULL,
  content nvarchar(max) NULL,
  category nvarchar(max) NULL,
  published_date date NULL,
  is_published bit NOT NULL DEFAULT 1,
  sort_order int NOT NULL DEFAULT 0,
  created_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at datetimeoffset(7) NOT NULL DEFAULT SYSUTCDATETIME()
);
END

-- Indexes for faster lookups
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_products_slug' AND object_id = OBJECT_ID('products'))
  CREATE NONCLUSTERED INDEX idx_products_slug ON products(slug);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_products_published' AND object_id = OBJECT_ID('products'))
  CREATE NONCLUSTERED INDEX idx_products_published ON products(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_services_slug' AND object_id = OBJECT_ID('services'))
  CREATE NONCLUSTERED INDEX idx_services_slug ON services(slug);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_services_published' AND object_id = OBJECT_ID('services'))
  CREATE NONCLUSTERED INDEX idx_services_published ON services(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_industries_slug' AND object_id = OBJECT_ID('industries'))
  CREATE NONCLUSTERED INDEX idx_industries_slug ON industries(slug);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_clients_published' AND object_id = OBJECT_ID('clients'))
  CREATE NONCLUSTERED INDEX idx_clients_published ON clients(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_testimonials_published' AND object_id = OBJECT_ID('testimonials'))
  CREATE NONCLUSTERED INDEX idx_testimonials_published ON testimonials(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_team_members_published' AND object_id = OBJECT_ID('team_members'))
  CREATE NONCLUSTERED INDEX idx_team_members_published ON team_members(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_faqs_published' AND object_id = OBJECT_ID('faqs'))
  CREATE NONCLUSTERED INDEX idx_faqs_published ON faqs(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_statistics_published' AND object_id = OBJECT_ID('statistics'))
  CREATE NONCLUSTERED INDEX idx_statistics_published ON statistics(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_news_slug' AND object_id = OBJECT_ID('news'))
  CREATE NONCLUSTERED INDEX idx_news_slug ON news(slug);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_news_published' AND object_id = OBJECT_ID('news'))
  CREATE NONCLUSTERED INDEX idx_news_published ON news(is_published);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_messages_status' AND object_id = OBJECT_ID('contact_messages'))
  CREATE NONCLUSTERED INDEX idx_messages_status ON contact_messages(status);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'idx_messages_created' AND object_id = OBJECT_ID('contact_messages'))
  CREATE NONCLUSTERED INDEX idx_messages_created ON contact_messages(created_at DESC);

-- Updated timestamp triggers
IF OBJECT_ID('trg_set_updated_at_products', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_products;
GO
CREATE TRIGGER trg_set_updated_at_products
ON products
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE p
  SET updated_at = SYSUTCDATETIME()
  FROM products p
  INNER JOIN inserted i ON p.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_services', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_services;
GO
CREATE TRIGGER trg_set_updated_at_services
ON services
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE s
  SET updated_at = SYSUTCDATETIME()
  FROM services s
  INNER JOIN inserted i ON s.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_industries', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_industries;
GO
CREATE TRIGGER trg_set_updated_at_industries
ON industries
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE i
  SET updated_at = SYSUTCDATETIME()
  FROM industries i
  INNER JOIN inserted u ON i.id = u.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_clients', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_clients;
GO
CREATE TRIGGER trg_set_updated_at_clients
ON clients
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE c
  SET updated_at = SYSUTCDATETIME()
  FROM clients c
  INNER JOIN inserted i ON c.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_testimonials', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_testimonials;
GO
CREATE TRIGGER trg_set_updated_at_testimonials
ON testimonials
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE t
  SET updated_at = SYSUTCDATETIME()
  FROM testimonials t
  INNER JOIN inserted i ON t.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_team_members', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_team_members;
GO
CREATE TRIGGER trg_set_updated_at_team_members
ON team_members
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE t
  SET updated_at = SYSUTCDATETIME()
  FROM team_members t
  INNER JOIN inserted i ON t.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_faqs', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_faqs;
GO
CREATE TRIGGER trg_set_updated_at_faqs
ON faqs
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE f
  SET updated_at = SYSUTCDATETIME()
  FROM faqs f
  INNER JOIN inserted i ON f.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_statistics', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_statistics;
GO
CREATE TRIGGER trg_set_updated_at_statistics
ON statistics
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE s
  SET updated_at = SYSUTCDATETIME()
  FROM statistics s
  INNER JOIN inserted i ON s.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_contact_messages', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_contact_messages;
GO
CREATE TRIGGER trg_set_updated_at_contact_messages
ON contact_messages
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE m
  SET updated_at = SYSUTCDATETIME()
  FROM contact_messages m
  INNER JOIN inserted i ON m.id = i.id;
END;
GO

IF OBJECT_ID('trg_set_updated_at_news', 'TR') IS NOT NULL DROP TRIGGER trg_set_updated_at_news;
GO
CREATE TRIGGER trg_set_updated_at_news
ON news
AFTER UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE n
  SET updated_at = SYSUTCDATETIME()
  FROM news n
  INNER JOIN inserted i ON n.id = i.id;
END;
GO
