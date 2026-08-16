import { NextResponse } from 'next/server';
import { getSqlPool } from '@/lib/sqlserver/client';

const hasSqlServerConfig = Boolean(process.env.SQLSERVER_CONNECTION?.trim());

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

function getFallbackMessagesStore(): ContactMessage[] {
  const scope = globalThis as typeof globalThis & { contactMessagesFallbackStore?: ContactMessage[] };
  if (!scope.contactMessagesFallbackStore) {
    scope.contactMessagesFallbackStore = [];
  }
  return scope.contactMessagesFallbackStore;
}

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

    const storeInFallback = () => {
      const fallbackStore = getFallbackMessagesStore();
      fallbackStore.unshift({
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        email,
        phone,
        company: company ?? null,
        subject,
        message,
        status: 'new',
        created_at: new Date().toISOString(),
      });
    };

    if (!hasSqlServerConfig) {
      storeInFallback();

      return NextResponse.json({
        success: true,
        mode: 'fallback',
      });
    }

    try {
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

      return NextResponse.json({ success: true, mode: 'sqlserver' });
    } catch (sqlError) {
      console.warn('Contact API SQL insert failed, using fallback storage:', sqlError);
      storeInFallback();
      return NextResponse.json({ success: true, mode: 'fallback' });
    }
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
