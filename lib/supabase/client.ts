import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  ?? '';

const demoEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim() ?? 'admin@businessoftware.com.tn';
const demoPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() ?? 'admin123';
const demoSessionStorageKey = 'biz-soft-demo-auth-session';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeRow(table: string, row: Record<string, unknown>, index: number) {
  const base = { ...row } as Record<string, unknown>;
  const id = String(base.id ?? base.slug ?? base.name ?? base.label ?? `${table}-${index + 1}`);

  if (!('id' in base) || !base.id) {
    base.id = slugify(id);
  }

  if (!('is_published' in base)) {
    base.is_published = true;
  }

  if (!('sort_order' in base)) {
    base.sort_order = index + 1;
  }

  return base as Record<string, unknown> & { id: string };
}

const fallbackRowsByTable: Record<string, Array<Record<string, unknown> & { id: string }>> = {
  clients: fallbackClients.map((item, index) =>
    normalizeRow('clients', {
      ...item,
      id: slugify(item.name || `client-${index + 1}`),
      name: item.name,
      industry: item.industry ?? null,
      products: item.products ?? [],
      description: item.description ?? null,
      image: item.image ?? null,
    }, index)
  ),
  industries: fallbackIndustries.map((item, index) =>
    normalizeRow('industries', {
      ...item,
      id: slugify(item.slug || item.name || `industry-${index + 1}`),
      slug: item.slug,
      name: item.name,
      icon: item.icon ?? null,
      description: item.description ?? null,
      solutions: item.solutions ?? [],
    }, index)
  ),
  products: fallbackProducts.map((item, index) =>
    normalizeRow('products', {
      ...item,
      id: item.slug || `product-${index + 1}`,
      slug: item.slug,
      name: item.name,
      tagline: item.tagline ?? null,
      category: item.category ?? null,
      icon: item.icon ?? null,
      color: item.color ?? null,
      image: item.image ?? null,
      summary: item.summary ?? null,
      description: item.description ?? null,
      features: item.features ?? [],
      benefits: item.benefits ?? [],
      modules: item.modules ?? [],
      faqs: item.faqs ?? [],
    }, index)
  ),
  services: fallbackServices.map((item, index) =>
    normalizeRow('services', {
      ...item,
      id: item.slug || `service-${index + 1}`,
      slug: item.slug,
      title: item.title,
      icon: item.icon ?? null,
      summary: item.summary ?? null,
      description: item.description ?? null,
      features: item.features ?? [],
    }, index)
  ),
  testimonials: fallbackTestimonials.map((item, index) =>
    normalizeRow('testimonials', {
      ...item,
      id: slugify(item.name || `testimonial-${index + 1}`),
      name: item.name,
      role: item.role ?? null,
      company: item.company ?? null,
      quote: item.quote ?? null,
      rating: item.rating ?? 5,
    }, index)
  ),
  team: fallbackTeam.map((item, index) =>
    normalizeRow('team', {
      ...item,
      id: slugify(item.name || `team-${index + 1}`),
      name: item.name,
      role: item.role ?? null,
      bio: item.bio ?? null,
      initials: item.initials ?? null,
    }, index)
  ),
  team_members: fallbackTeam.map((item, index) =>
    normalizeRow('team', {
      ...item,
      id: slugify(item.name || `team-${index + 1}`),
      name: item.name,
      role: item.role ?? null,
      bio: item.bio ?? null,
      initials: item.initials ?? null,
    }, index)
  ),
  news: fallbackNews.map((item, index) =>
    normalizeRow('news', {
      ...item,
      id: item.slug || `news-${index + 1}`,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt ?? null,
      content: (item as { content?: string | null }).content ?? null,
      category: item.category ?? null,
      published_date: item.date ?? null,
    }, index)
  ),
  statistics: fallbackStats.map((item, index) =>
    normalizeRow('statistics', {
      id: slugify(item.label || `stat-${index + 1}`),
      label: item.label,
      value: item.value,
      suffix: item.suffix ?? null,
    }, index)
  ),
  faqs: [],
  messages: [],
};

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage write issues
  }
}

function createDemoSupabaseClient(remoteClient: any) {
  const listeners = new Set<(event: string, session: any) => void>();

  const readStoredSession = () => {
    if (typeof window === 'undefined') return null;

    try {
      const saved = window.localStorage.getItem(demoSessionStorageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const saveStoredSession = (session: any) => {
    if (typeof window === 'undefined') return;

    try {
      if (session) {
        window.localStorage.setItem(demoSessionStorageKey, JSON.stringify(session));
      } else {
        window.localStorage.removeItem(demoSessionStorageKey);
      }
    } catch {
      // ignore storage write issues
    }
  };

  const emit = (event: string, session: any) => {
    listeners.forEach((listener) => listener(event, session));
  };

  const createQuery = (table: string, execute: () => Promise<any>, state: Record<string, unknown> = {}) => {
    const query: any = {
      eq(column: string, value: unknown) {
        state.filters = state.filters ?? [];
        (state.filters as Array<{ column: string; value: unknown }>).push({ column, value });
        return query;
      },
      order(column: string, options?: { ascending?: boolean }) {
        state.orders = state.orders ?? [];
        (state.orders as Array<{ column: string; ascending: boolean }>).push({
          column,
          ascending: options?.ascending ?? true,
        });
        return query;
      },
      maybeSingle() {
        state.single = true;
        return query;
      },
      then(resolve: (value: unknown) => void, reject?: (reason?: unknown) => void) {
        return Promise.resolve(execute()).then(resolve, reject);
      },
      catch(reject: (reason?: unknown) => void) {
        return Promise.resolve(execute()).catch(reject);
      },
      finally(callback: () => void) {
        return Promise.resolve(execute()).finally(callback);
      },
    };

    return query;
  };

  const getRows = (table: string) => {
    const fallback = fallbackRowsByTable[table] ?? [];
    const stored = readFromStorage<Array<Record<string, unknown> & { id: string }>>(
      `biz-soft-demo-${table}`,
      fallback
    );
    return stored.map((row, index) => normalizeRow(table, row, index));
  };

  const saveRows = (table: string, rows: Array<Record<string, unknown> & { id: string }>) => {
    writeToStorage(`biz-soft-demo-${table}`, rows);
  };

  const executeSelect = async (table: string, state: Record<string, unknown>) => {
    let rows = getRows(table);
    const filters = (state.filters as Array<{ column: string; value: unknown }> | undefined) ?? [];
    const orders = (state.orders as Array<{ column: string; ascending: boolean }> | undefined) ?? [];

    if (filters.length) {
      rows = rows.filter((row) =>
        filters.every(({ column, value }) => row[column as keyof typeof row] === value)
      );
    }

    if (orders.length) {
      rows = [...rows].sort((a, b) => {
        for (const order of orders) {
          const av = a[order.column as keyof typeof a];
          const bv = b[order.column as keyof typeof b];
          if (av == null && bv == null) continue;
          if (av == null) return order.ascending ? -1 : 1;
          if (bv == null) return order.ascending ? 1 : -1;
          const comparison = String(av).localeCompare(String(bv));
          if (comparison !== 0) return order.ascending ? comparison : -comparison;
        }
        return 0;
      });
    }

    if (state.single) {
      return { data: rows[0] ?? null, error: null };
    }

    return { data: rows, error: null };
  };

  const executeInsert = async (table: string, payload: Record<string, unknown>) => {
    const rows = getRows(table);
    const nextRow = normalizeRow(table, {
      ...payload,
      id: String(payload.id ?? slugify(`${table}-${rows.length + 1}`)),
      is_published: payload.is_published ?? true,
      sort_order: payload.sort_order ?? rows.length + 1,
      created_at: new Date().toISOString(),
    }, rows.length);

    rows.push(nextRow);
    saveRows(table, rows);
    return { data: nextRow, error: null };
  };

  const executeUpdate = async (table: string, payload: Record<string, unknown>, state: Record<string, unknown>) => {
    const rows = getRows(table);
    const filters = (state.filters as Array<{ column: string; value: unknown }> | undefined) ?? [];
    const nextRows = rows.map((row) => {
      const matches = filters.every(({ column, value }) => row[column as keyof typeof row] === value);
      if (!matches) return row;
      return normalizeRow(table, { ...row, ...payload }, rows.indexOf(row));
    });

    saveRows(table, nextRows);
    return { data: nextRows.find((row) => filters.every(({ column, value }) => row[column as keyof typeof row] === value)) ?? null, error: null };
  };

  const executeDelete = async (table: string, state: Record<string, unknown>) => {
    const rows = getRows(table);
    const filters = (state.filters as Array<{ column: string; value: unknown }> | undefined) ?? [];
    const nextRows = rows.filter((row) => !filters.every(({ column, value }) => row[column as keyof typeof row] === value));
    saveRows(table, nextRows);
    return { data: null, error: null };
  };

  return {
    auth: {
      getSession: async () => {
        if (remoteClient) {
          try {
            return await remoteClient.auth.getSession();
          } catch {
            // fall back to local demo session
          }
        }

        return { data: { session: readStoredSession() }, error: null };
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        listeners.add(callback);
        callback('INITIAL_SESSION', readStoredSession());

        return {
          data: {
            subscription: {
              unsubscribe() {
                listeners.delete(callback);
              },
            },
          },
        };
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        if (remoteClient) {
          try {
            const response = await remoteClient.auth.signInWithPassword({ email, password });
            if (!response.error) {
              saveStoredSession(response.data?.session ?? null);
              emit('SIGNED_IN', response.data?.session ?? null);
              return response;
            }
          } catch {
            // fall back to local demo auth
          }
        }

        if (email === demoEmail && password === demoPassword) {
          const session = {
            access_token: 'demo-access-token',
            user: {
              id: 'demo-admin',
              email: demoEmail,
              role: 'admin',
            },
          };

          saveStoredSession(session);
          emit('SIGNED_IN', session);
          return { data: { session, user: session.user }, error: null };
        }

        return { data: null, error: { message: 'Invalid email or password' } };
      },
      signOut: async () => {
        if (remoteClient) {
          try {
            await remoteClient.auth.signOut();
          } catch {
            // ignore remote signout issues
          }
        }

        saveStoredSession(null);
        emit('SIGNED_OUT', null);
        return { error: null };
      },
    },
    from: (table: string) => ({
      select: (columns?: string) => {
        const state: Record<string, unknown> = { columns };
        return createQuery(table, () => executeSelect(table, state), state);
      },
      insert: (payload: Record<string, unknown>) => executeInsert(table, payload),
      update: (payload: Record<string, unknown>) => {
        const state: Record<string, unknown> = {};
        return createQuery(table, () => executeUpdate(table, payload, state), state);
      },
      delete: () => {
        const state: Record<string, unknown> = {};
        return createQuery(table, () => executeDelete(table, state), state);
      },
    }),
  } as any;
}

const remoteClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabase = remoteClient ?? createDemoSupabaseClient(remoteClient);
