import { NextResponse } from 'next/server';
import poolPromise from '@/lib/sqlserver/client';

export async function GET() {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body as { id?: string; status?: string };
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .input('status', status)
      .query('UPDATE contact_messages SET status = @status WHERE id = @id');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    const pool = await poolPromise;
    await pool.request().input('id', id).query('DELETE FROM contact_messages WHERE id = @id');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
