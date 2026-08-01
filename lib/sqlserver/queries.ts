import poolPromise from '@/lib/sqlserver/client';
import {
  clients as fallbackClients,
  industries as fallbackIndustries,
  products as fallbackProducts,
  services as fallbackServices,
  stats as fallbackStats,
  team as fallbackTeam,
  testimonials as fallbackTestimonials,
  news as fallbackNews,
} from '@/lib/data';
import type {
  Client,
  Industry,
  Product,
  Service,
  Testimonial,
} from '@/lib/data';

const hasSqlServerConfig = Boolean(process.env.SQLSERVER_CONNECTION?.trim());

type JsonValue = unknown;

function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'object') return value as T;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function boolValue(value: unknown): boolean {
  if (value === true || value === 1 || value === '1' || value === 'true') return true;
  return false;
}

function numberValue(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function stringValue(value: unknown): string | null {
  if (value == null) return null;
  return String(value);
}

function getSqlPool() {
  if (!poolPromise) {
    throw new Error('Missing SQLSERVER_CONNECTION environment variable for SQL Server.');
  }
  return poolPromise;
}

async function sqlQuery<T = any>(queryText: string, params: Record<string, unknown> = {}): Promise<T[]> {
  const pool = await getSqlPool();
  const request = pool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  const result = await request.query(queryText);
  return result.recordset as T[];
}

async function safeQuery<T>(fallback: T[], query: () => Promise<T[]>): Promise<T[]> {
  if (!hasSqlServerConfig) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}

export type DbProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  category: string | null;
  icon: string | null;
  image: string | null;
  color: string | null;
  summary: string | null;
  description: string | null;
  features: { title: string; description: string; icon: string }[];
  benefits: string[];
  modules: { name: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  is_published: boolean;
  sort_order: number;
};

export type DbService = {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  summary: string | null;
  description: string | null;
  features: string[];
  is_published: boolean;
  sort_order: number;
};

export type DbIndustry = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  description: string | null;
  solutions: string[];
  is_published: boolean;
  sort_order: number;
};

export type DbClient = {
  id: string;
  name: string;
  industry: string | null;
  products: string[];
  description: string | null;
  image: string | null;
  is_published: boolean;
  sort_order: number;
};

export type DbTestimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string | null;
  rating: number;
  is_published: boolean;
  sort_order: number;
};

export type DbTeamMember = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  initials: string | null;
  is_published: boolean;
  sort_order: number;
};

export type DbStat = {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  is_published: boolean;
  sort_order: number;
};

export type DbFaq = {
  id: string;
  question: string;
  answer: string | null;
  category: string | null;
  is_published: boolean;
  sort_order: number;
};

export type DbNews = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  published_date: string | null;
  is_published: boolean;
  sort_order: number;
};

function normalizeProduct(row: Record<string, unknown>): DbProduct {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    tagline: stringValue(row.tagline),
    category: stringValue(row.category),
    icon: stringValue(row.icon),
    image: stringValue(row.image),
    color: stringValue(row.color),
    summary: stringValue(row.summary),
    description: stringValue(row.description),
    features: parseJson(row.features, []),
    benefits: parseJson(row.benefits, []),
    modules: parseJson(row.modules, []),
    faqs: parseJson(row.faqs, []),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeService(row: Record<string, unknown>): DbService {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    icon: stringValue(row.icon),
    summary: stringValue(row.summary),
    description: stringValue(row.description),
    features: parseJson(row.features, []),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeIndustry(row: Record<string, unknown>): DbIndustry {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    icon: stringValue(row.icon),
    description: stringValue(row.description),
    solutions: parseJson(row.solutions, []),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeClient(row: Record<string, unknown>): DbClient {
  return {
    id: String(row.id),
    name: String(row.name),
    industry: stringValue(row.industry),
    products: parseJson(row.products, []),
    description: stringValue(row.description),
    image: stringValue(row.image),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeTestimonial(row: Record<string, unknown>): DbTestimonial {
  return {
    id: String(row.id),
    name: String(row.name),
    role: stringValue(row.role),
    company: stringValue(row.company),
    quote: stringValue(row.quote),
    rating: numberValue(row.rating) || 5,
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeTeamMember(row: Record<string, unknown>): DbTeamMember {
  return {
    id: String(row.id),
    name: String(row.name),
    role: stringValue(row.role),
    bio: stringValue(row.bio),
    initials: stringValue(row.initials),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeStat(row: Record<string, unknown>): DbStat {
  return {
    id: String(row.id),
    label: String(row.label),
    value: numberValue(row.value),
    suffix: stringValue(row.suffix) ?? '',
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeFaq(row: Record<string, unknown>): DbFaq {
  return {
    id: String(row.id),
    question: String(row.question),
    answer: stringValue(row.answer),
    category: stringValue(row.category),
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

function normalizeNews(row: Record<string, unknown>): DbNews {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: stringValue(row.excerpt),
    content: stringValue(row.content),
    category: stringValue(row.category),
    published_date: row.published_date ? String(row.published_date) : null,
    is_published: boolValue(row.is_published),
    sort_order: numberValue(row.sort_order),
  };
}

export async function fetchProducts(): Promise<DbProduct[]> {
  const fallback = fallbackProducts.map((item, index) => ({
    ...item,
    id: item.slug,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM products WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeProduct);
  });
}

export async function fetchProductBySlug(slug: string): Promise<DbProduct | null> {
  const fallback = fallbackProducts
    .map((item, index) => ({
      ...item,
      id: item.slug,
      is_published: true,
      sort_order: index + 1,
    }))
    .find((product) => product.slug === slug) ?? null;

  if (!hasSqlServerConfig) {
    return fallback;
  }

  try {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM products WHERE slug = @slug AND is_published = 1',
      { slug }
    );
    if (rows.length === 0) return fallback;
    return normalizeProduct(rows[0]);
  } catch {
    return fallback;
  }
}

export async function fetchServices(): Promise<DbService[]> {
  const fallback = fallbackServices.map((item, index) => ({
    ...item,
    id: item.slug,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM services WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeService);
  });
}

export async function fetchIndustries(): Promise<DbIndustry[]> {
  const fallback = fallbackIndustries.map((item, index) => ({
    ...item,
    id: item.slug,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM industries WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeIndustry);
  });
}

export async function fetchClients(): Promise<DbClient[]> {
  const fallback = fallbackClients.map((item, index) => ({
    ...item,
    id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM clients WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeClient);
  });
}

export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  const fallback = fallbackTestimonials.map((item, index) => ({
    ...item,
    id: `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM testimonials WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeTestimonial);
  });
}

export async function fetchTeam(): Promise<DbTeamMember[]> {
  const fallback = fallbackTeam.map((item, index) => ({
    id: `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    name: item.name,
    role: item.role ?? null,
    bio: item.bio ?? null,
    initials: item.initials ?? null,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM team_members WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeTeamMember);
  });
}

export async function fetchStats(): Promise<DbStat[]> {
  const fallback = fallbackStats.map((item, index) => ({
    id: item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: item.label,
    value: item.value,
    suffix: item.suffix ?? null,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const rows = await sqlQuery<Record<string, unknown>>(
      'SELECT * FROM statistics WHERE is_published = 1 ORDER BY sort_order ASC'
    );
    return rows.map(normalizeStat);
  });
}
