import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseServer = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false },
});

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

// Fetch helpers — all filter is_published = true and order by sort_order
export async function fetchProducts(): Promise<DbProduct[]> {
  const { data } = await supabaseServer
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbProduct[]) ?? [];
}

export async function fetchProductBySlug(slug: string): Promise<DbProduct | null> {
  const { data } = await supabaseServer
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  return data as DbProduct | null;
}

export async function fetchServices(): Promise<DbService[]> {
  const { data } = await supabaseServer
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbService[]) ?? [];
}

export async function fetchIndustries(): Promise<DbIndustry[]> {
  const { data } = await supabaseServer
    .from('industries')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbIndustry[]) ?? [];
}

export async function fetchClients(): Promise<DbClient[]> {
  const { data } = await supabaseServer
    .from('clients')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbClient[]) ?? [];
}

export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  const { data } = await supabaseServer
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbTestimonial[]) ?? [];
}

export async function fetchTeam(): Promise<DbTeamMember[]> {
  const { data } = await supabaseServer
    .from('team_members')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbTeamMember[]) ?? [];
}

export async function fetchStats(): Promise<DbStat[]> {
  const { data } = await supabaseServer
    .from('statistics')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  return (data as DbStat[]) ?? [];
}
