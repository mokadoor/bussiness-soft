import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/sqlserver/admin';

export async function GET() {
  return isAdminAuthenticated()
    ? NextResponse.json({ authenticated: true })
    : NextResponse.json({ authenticated: false }, { status: 401 });
}
