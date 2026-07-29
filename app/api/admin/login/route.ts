import { NextResponse } from 'next/server';

const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? '';
const adminPassword = process.env.ADMIN_PASSWORD?.trim() ?? '';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ error: 'Admin credentials not configured' }, { status: 500 });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, user: { email } });
  response.cookies.set({
    name: 'admin-auth',
    value: '1',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
