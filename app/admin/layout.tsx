'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { AdminShell } from '@/components/admin/admin-shell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith('/admin/login');

  React.useEffect(() => {
    document.body.classList.add('admin-route');
    return () => {
      document.body.classList.remove('admin-route');
    };
  }, []);

  if (isLoginPage) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <style jsx global>{`
          body.admin-route > div > header:first-of-type,
          body.admin-route > div > footer {
            display: none !important;
          }
        `}</style>
        <AdminShell>{children}</AdminShell>
      </ProtectedRoute>
    </AuthProvider>
  );
}
