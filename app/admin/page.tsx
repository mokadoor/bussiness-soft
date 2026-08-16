'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Boxes,
  Wrench,
  Factory,
  Building2,
  MessageSquareQuote,
  Users,
  Mail,
  Newspaper,
  BarChart3,
  HelpCircle,
  ArrowRight,
  Inbox,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type CountResult = { count: number } | null;

const sections = [
  { label: 'Products', href: '/admin/content?type=products', icon: Boxes, table: 'products' },
  { label: 'Services', href: '/admin/content?type=services', icon: Wrench, table: 'services' },
  { label: 'Industries', href: '/admin/content?type=industries', icon: Factory, table: 'industries' },
  { label: 'Clients', href: '/admin/content?type=clients', icon: Building2, table: 'clients' },
  { label: 'Testimonials', href: '/admin/content?type=testimonials', icon: MessageSquareQuote, table: 'testimonials' },
  { label: 'Team', href: '/admin/content?type=team_members', icon: Users, table: 'team_members' },
  { label: 'FAQs', href: '/admin/content?type=faqs', icon: HelpCircle, table: 'faqs' },
  { label: 'Statistics', href: '/admin/content?type=statistics', icon: BarChart3, table: 'statistics' },
  { label: 'News', href: '/admin/content?type=news', icon: Newspaper, table: 'news' },
];

type RecentMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  created_at: string;
};

function statusBadge(status: string) {
  if (status === 'new')
    return { className: 'bg-accent/10 text-accent', icon: Clock, label: 'New' };
  if (status === 'read')
    return { className: 'bg-secondary text-muted-foreground', icon: Clock, label: 'Read' };
  return {
    className: 'bg-emerald-500/10 text-emerald-600',
    icon: CheckCircle2,
    label: 'Resolved',
  };
}

export default function AdminDashboard() {
  const [counts, setCounts] = React.useState<Record<string, number>>({});
  const [messages, setMessages] = React.useState<RecentMessage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const countPromises = sections.map(async (s) => {
        try {
          const response = await fetch(`/api/admin/${s.table}`);
          const data = await response.json();
          return { table: s.table, count: Array.isArray(data) ? data.length : 0 };
        } catch {
          return { table: s.table, count: 0 };
        }
      });

      const countResults = await Promise.all(countPromises);
      const countsMap: Record<string, number> = {};
      countResults.forEach((r) => {
        countsMap[r.table] = r.count;
      });
      setCounts(countsMap);

      try {
        const response = await fetch('/api/admin/contact_messages');
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages((data as RecentMessage[]).slice(0, 5));
        } else {
          setMessages([]);
        }
      } catch {
        setMessages([]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const newMessages = messages.filter((m) => m.status === 'new').length;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your website content and recent activity.
        </p>
      </div>

      {/* Quick stats banner */}
      {!loading && newMessages > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Mail className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium">
            {newMessages} new {newMessages === 1 ? 'message' : 'messages'} awaiting response.
          </p>
          <Link
            href="/admin/messages"
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href}>
              <Card className="group h-full p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight">
                    {loading ? (
                      <Skeleton className="h-7 w-8" />
                    ) : (
                      counts[s.table] ?? 0
                    )}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent messages */}
      <Card className="mt-6 sm:mt-8 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold tracking-tight">Recent Messages</h2>
          </div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {loading ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {messages.map((msg) => {
              const badge = statusBadge(msg.status);
              const StatusIcon = badge.icon;
              return (
                <Link
                  key={msg.id}
                  href="/admin/messages"
                  className="-mx-2 flex items-center justify-between py-3 transition-colors hover:bg-secondary/40 px-2 rounded-md"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{msg.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{msg.subject}</p>
                  </div>
                  <div className="ml-3 flex shrink-0 items-center gap-2 sm:gap-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {badge.label}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>

      <footer className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
        Admin dashboard — use the panel to manage content, messages, and site data.
      </footer>
    </div>
  );
}