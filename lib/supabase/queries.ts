import { createClient } from '@supabase/supabase-js';
import {
  clients as fallbackClients,
  industries as fallbackIndustries,
  products as fallbackProducts,
  services as fallbackServices,
  stats as fallbackStats,
  team as fallbackTeam,
  testimonials as fallbackTestimonials,
} from '@/lib/data';
import type {
  Client,
  Industry,
  Product,
  Service,
  Testimonial,
} from '@/lib/data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  ?? '';
const hasSupabaseConfig = Boolean(supabaseUrl && anonKey);

export const supabaseServer = hasSupabaseConfig
  ? createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    })
  : null;

// Types matching the database schema
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

function toDbProduct(product: Product, index: number): DbProduct {
  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline ?? null,
    category: product.category ?? null,
    icon: product.icon ?? null,
    image: product.image ?? null,
    color: product.color ?? null,
    summary: product.summary ?? null,
    description: product.description ?? null,
    features: product.features ?? [],
    benefits: product.benefits ?? [],
    modules: product.modules ?? [],
    faqs: product.faqs ?? [],
    is_published: true,
    sort_order: index + 1,
  };
}

function toDbService(service: Service, index: number): DbService {
  return {
    id: service.slug,
    slug: service.slug,
    title: service.title,
    icon: service.icon ?? null,
    summary: service.summary ?? null,
    description: service.description ?? null,
    features: service.features ?? [],
    is_published: true,
    sort_order: index + 1,
  };
}

function toDbIndustry(industry: Industry, index: number): DbIndustry {
  return {
    id: industry.slug,
    slug: industry.slug,
    name: industry.name,
    icon: industry.icon ?? null,
    description: industry.description ?? null,
    solutions: industry.solutions ?? [],
    is_published: true,
    sort_order: index + 1,
  };
}

function toDbClient(client: Client, index: number): DbClient {
  return {
    id: client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: client.name,
    industry: client.industry ?? null,
    products: client.products ?? [],
    description: client.description ?? null,
    image: client.image ?? null,
    is_published: true,
    sort_order: index + 1,
  };
}

function toDbTestimonial(testimonial: Testimonial, index: number): DbTestimonial {
  return {
    id: testimonial.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: testimonial.name,
    role: testimonial.role ?? null,
    company: testimonial.company ?? null,
    quote: testimonial.quote ?? null,
    rating: testimonial.rating ?? 5,
    is_published: true,
    sort_order: index + 1,
  };
}

function toDbStat(stat: { label: string; value: number; suffix?: string }, index: number): DbStat {
  return {
    id: stat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: stat.label,
    value: stat.value,
    suffix: stat.suffix ?? null,
    is_published: true,
    sort_order: index + 1,
  };
}

async function safeQuery<T>(fallback: T[], query: () => Promise<T[]>): Promise<T[]> {
  if (!supabaseServer) {
    return fallback;
  }

  try {
    return await query();
  } catch {
    return fallback;
  }
}

// Fetch helpers — all filter is_published = true and order by sort_order
export async function fetchProducts(): Promise<DbProduct[]> {
  const fallback = fallbackProducts.map(toDbProduct);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbProduct[]) ?? fallback) as DbProduct[];
  });
}

export async function fetchProductBySlug(slug: string): Promise<DbProduct | null> {
  const fallback = fallbackProducts.map(toDbProduct).find((product) => product.slug === slug) ?? null;
  if (!supabaseServer) {
    return fallback;
  }

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    return data as DbProduct | null;
  } catch {
    return fallback;
  }
}

export async function fetchServices(): Promise<DbService[]> {
  const fallback = fallbackServices.map(toDbService);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbService[]) ?? fallback) as DbService[];
  });
}

export async function fetchIndustries(): Promise<DbIndustry[]> {
  const fallback = fallbackIndustries.map(toDbIndustry);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('industries')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbIndustry[]) ?? fallback) as DbIndustry[];
  });
}

export async function fetchClients(): Promise<DbClient[]> {
  const fallback = fallbackClients.map(toDbClient);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('clients')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbClient[]) ?? fallback) as DbClient[];
  });
}

export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  const fallback = fallbackTestimonials.map(toDbTestimonial);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbTestimonial[]) ?? fallback) as DbTestimonial[];
  });
}

export async function fetchTeam(): Promise<DbTeamMember[]> {
  const fallback = fallbackTeam.map((member, index) => ({
    id: `${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    name: member.name,
    role: member.role ?? null,
    bio: member.bio ?? null,
    initials: member.initials ?? null,
    is_published: true,
    sort_order: index + 1,
  }));

  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('team_members')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbTeamMember[]) ?? fallback) as DbTeamMember[];
  });
}

export async function fetchStats(): Promise<DbStat[]> {
  const fallback = fallbackStats.map(toDbStat);
  return safeQuery(fallback, async () => {
    const { data, error } = await supabaseServer!
      .from('statistics')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error) return fallback;
    return ((data as DbStat[]) ?? fallback) as DbStat[];
  });
}
