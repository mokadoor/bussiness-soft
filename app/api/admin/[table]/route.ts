import { NextResponse } from 'next/server';
import { getSqlPool } from '@/lib/sqlserver/client';
import {
  products as fallbackProducts,
  services as fallbackServices,
  industries as fallbackIndustries,
  clients as fallbackClients,
  testimonials as fallbackTestimonials,
  team as fallbackTeam,
  stats as fallbackStats,
  news as fallbackNews,
  faqs as fallbackFaqs,
} from '@/lib/data';

const hasSqlServerConfig = Boolean(process.env.SQLSERVER_CONNECTION?.trim());

// Use shared `getSqlPool` from the client module.

function buildFallbackRow(table: string, row: Record<string, unknown>, index: number) {
  const id =
    String(row.id ?? row.slug ?? row.name ?? row.title ?? row.question ?? row.label ?? `${table}-${index}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') || `${table}-${index}`;

  return {
    ...row,
    id,
    is_published: row.is_published ?? true,
    sort_order: row.sort_order ?? index + 1,
  };
}

function createFallbackStore() {
  return {
    products: fallbackProducts.map((row, index) => buildFallbackRow('products', row, index)),
    services: fallbackServices.map((row, index) => buildFallbackRow('services', row, index)),
    industries: fallbackIndustries.map((row, index) => buildFallbackRow('industries', row, index)),
    clients: fallbackClients.map((row, index) => buildFallbackRow('clients', row, index)),
    testimonials: fallbackTestimonials.map((row, index) => buildFallbackRow('testimonials', row, index)),
    team_members: fallbackTeam.map((row, index) => buildFallbackRow('team_members', row, index)),
    statistics: fallbackStats.map((row, index) => buildFallbackRow('statistics', row, index)),
    news: fallbackNews.map((row, index) => buildFallbackRow('news', row, index)),
    faqs: fallbackFaqs.map((row, index) => buildFallbackRow('faqs', row, index)),
    contact_messages: [],
  } as Record<string, Record<string, unknown>[]>;
}

const fallbackStore = (globalThis as any).adminContentFallbackStore ??
  ((globalThis as any).adminContentFallbackStore = createFallbackStore());

const allowedTables = new Set([
  'products',
  'services',
  'industries',
  'clients',
  'testimonials',
  'team_members',
  'faqs',
  'statistics',
  'news',
  'contact_messages',
]);

const allowedColumns: Record<string, string[]> = {
  products: [
    'slug', 'name', 'tagline', 'category', 'icon', 'summary', 'description',
    'features', 'benefits', 'modules', 'faqs', 'image', 'color', 'is_published', 'sort_order',
  ],
  services: ['slug', 'title', 'icon', 'summary', 'description', 'features', 'is_published', 'sort_order'],
  industries: ['slug', 'name', 'icon', 'description', 'solutions', 'is_published', 'sort_order'],
  clients: ['name', 'industry', 'products', 'description', 'logo_url', 'image', 'is_published', 'sort_order'],
  testimonials: ['name', 'role', 'company', 'quote', 'rating', 'is_published', 'sort_order'],
  team_members: ['name', 'role', 'bio', 'initials', 'photo_url', 'is_published', 'sort_order'],
  faqs: ['question', 'answer', 'category', 'is_published', 'sort_order'],
  statistics: ['label', 'value', 'suffix', 'is_published', 'sort_order'],
  news: ['slug', 'title', 'excerpt', 'content', 'category', 'published_date', 'is_published', 'sort_order'],
  contact_messages: ['name', 'email', 'phone', 'company', 'subject', 'message', 'status'],
};

function sanitizeBody(table: string, body: Record<string, unknown>) {
  const allowed = allowedColumns[table] ?? [];
  return Object.entries(body).reduce((acc, [key, value]) => {
    if (allowed.includes(key)) {
      if (value !== null && typeof value === 'object') {
        acc[key] = JSON.stringify(value);
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {} as Record<string, unknown>);
}

function buildInsertQuery(table: string, data: Record<string, unknown>) {
  const columns = Object.keys(data);
  const columnSql = columns.map((col) => `[${col}]`).join(', ');
  const params = columns.map((col) => `@${col}`).join(', ');
  const sql = `INSERT INTO [${table}] (${columnSql}) VALUES (${params}); SELECT SCOPE_IDENTITY() AS id;`;
  return { sql, columns };
}

function buildUpdateQuery(table: string, id: string, data: Record<string, unknown>) {
  const columns = Object.keys(data);
  const setSql = columns.map((col) => `[${col}] = @${col}`).join(', ');
  const sql = `UPDATE [${table}] SET ${setSql} WHERE id = @id;`;
  return { sql, columns };
}

async function executeQuery(sqlText: string, params: Record<string, unknown>) {
  const pool = await getSqlPool();
  const request = pool.request();
  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }
  return request.query(sqlText);
}

export async function GET(
  req: Request,
  { params }: { params: { table: string } }
) {
  const table = params.table;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  if (!hasSqlServerConfig) {
    return NextResponse.json(fallbackStore[table] ?? []);
  }

  try {
    const pool = await getSqlPool();
    const orderColumn = table === 'contact_messages' ? 'created_at DESC' : 'sort_order ASC';
    const result = await pool.request().query(`SELECT * FROM [${table}] ORDER BY ${orderColumn}`);
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json(fallbackStore[table] ?? []);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { table: string } }
) {
  const table = params.table;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const body = await req.json();
  const data = sanitizeBody(table, body);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
  }

  try {
    const { sql, columns } = buildInsertQuery(table, data);
    const request = await executeQuery(sql, { ...data });
    return NextResponse.json({ success: true, id: request.recordset?.[0]?.id ?? null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert record' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { table: string } }
) {
  const table = params.table;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const body = await req.json();
  const data = sanitizeBody(table, body);

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
  }

  try {
    const { sql } = buildUpdateQuery(table, id, data);
    await executeQuery(sql, { ...data, id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { table: string } }
) {
  const table = params.table;
  if (!allowedTables.has(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const sqlText = `DELETE FROM [${table}] WHERE id = @id`;
    await executeQuery(sqlText, { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
