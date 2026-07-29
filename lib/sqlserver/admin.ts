import { cookies } from 'next/headers';

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin-auth');
  return Boolean(authCookie?.value === '1');
}
