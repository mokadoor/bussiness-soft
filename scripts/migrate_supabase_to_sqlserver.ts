import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import sql from 'mssql';

const SUPABASE_URL = process.env.SUPABASE_URL?.trim() ?? '';
const SUPABASE_KEY = process.env.SUPABASE_KEY?.trim() ?? '';
const SQLSERVER_CONNECTION = process.env.SQLSERVER_CONNECTION?.trim() ?? '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables.');
}

if (!SQLSERVER_CONNECTION) {
  throw new Error('Missing SQLSERVER_CONNECTION environment variable.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const tables = [
  'products',
  'services',
  'industries',
  'clients',
  'testimonials',
  'team_members',
  'faqs',
  'statistics',
  'contact_messages',
  'news',
];

function toSqlValue(value: any): any {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

async function migrateTable(pool: sql.ConnectionPool, table: string) {
  console.log(`Migrating ${table}...`);

  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    throw new Error(`Supabase read error for ${table}: ${error.message}`);
  }

  if (!data || !Array.isArray(data)) {
    console.log(`No rows found for ${table}`);
    return;
  }

  const rows = data as Array<Record<string, unknown>>;

  if (rows.length === 0) {
    console.log(`Table ${table} is empty.`);
    return;
  }

  for (const row of rows) {
    const columns = Object.keys(row);
    const values = columns.map((key) => toSqlValue(row[key]));
    const columnsSql = columns.map((col) => `[${col}]`).join(', ');
    const params = columns.map((_, index) => `@p${index}`).join(', ');

    const request = pool.request();
    values.forEach((value, index) => {
      request.input(`p${index}`, value);
    });

    const insertSql = `INSERT INTO [${table}] (${columnsSql}) VALUES (${params});`;
    await request.query(insertSql);
  }

  console.log(`Migrated ${rows.length} rows into ${table}.`);
}

async function main() {
  const pool = await sql.connect(SQLSERVER_CONNECTION);
  try {
    for (const table of tables) {
      await migrateTable(pool, table);
    }
  } finally {
    await pool.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
