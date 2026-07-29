'use client';

import * as React from 'react';

type AuthContextValue = {
  user: { email: string } | null;
  session: null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<{ email: string } | null>(null);
  const [session, setSession] = React.useState<null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const resp = await fetch('/api/admin/check', { method: 'GET' });
        if (!isMounted) return;
        if (resp.ok) {
          setUser({ email: 'admin' });
        } else {
          setUser(null);
        }
      } catch {
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const resp = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        return { error: data.error ?? 'Login failed' };
      }
      setUser({ email });
      return { error: null };
    } catch (error) {
      return { error: 'Login failed' };
    }
  };

  const signOut = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
