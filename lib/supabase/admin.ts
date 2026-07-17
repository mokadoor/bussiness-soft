import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

function createNoopSupabaseClient() {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: async () => ({ data: [], error: null }),
          maybeSingle: async () => ({ data: null, error: null }),
        }),
        order: async () => ({ data: [], error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
      }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
    }),
  } as any;
}

export const supabaseAdmin = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })
  : createNoopSupabaseClient();
