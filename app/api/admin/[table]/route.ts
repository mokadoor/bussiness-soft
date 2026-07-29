import { NextResponse } from 'next/server';
import poolPromise from '@/lib/sqlserver/client';

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
  const pool = await poolPromise;
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

  try {
    const pool = await poolPromise;
    const orderColumn = table === 'contact_messages' ? 'created_at DESC' : 'sort_order ASC';
    const result = await pool.request().query(`SELECT * FROM [${table}] ORDER BY ${orderColumn}`);
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load records' }, { status: 500 });
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
