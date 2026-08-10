import { NextResponse } from 'next/server';
import { getSqlPool } from '@/lib/sqlserver/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pool = await getSqlPool();
    const request = pool.request();
    request.input('name', name);
    request.input('email', email);
    request.input('phone', phone);
    request.input('company', company ?? null);
    request.input('subject', subject);
    request.input('message', message);
    request.input('status', 'new');

    await request.query(
      'INSERT INTO contact_messages (name, email, phone, company, subject, message, status) VALUES (@name, @email, @phone, @company, @subject, @message, @status)'
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
