'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Mail, Trash2, Search, X, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusStyles: Record<string, { label: string; className: string; icon: typeof Circle }> = {
  new: { label: 'New', className: 'bg-accent/10 text-accent', icon: Circle },
  read: { label: 'Read', className: 'bg-secondary text-muted-foreground', icon: Clock },
  resolved: { label: 'Resolved', className: 'bg-emerald-500/10 text-emerald-600', icon: CheckCircle2 },
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<Message | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/contact_messages');
      const data = await response.json();
      setMessages((Array.isArray(data) ? data : []) as Message[]);
    } catch (error) {
      toast.error('Failed to load messages');
      setMessages([]);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact_messages?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Update failed');
      }
      toast.success(`Marked as ${status}`);
      load();
      setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/admin/contact_messages?id=${encodeURIComponent(deleteId)}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Delete failed');
      }
      toast.success('Message deleted');
      setDeleteId(null);
      setSelected(null);
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = React.useMemo(() => {
    if (!search) return messages;
    const q = search.toLowerCase();
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject ?? '').toLowerCase().includes(q)
    );
  }, [messages, search]);

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (msg.status === 'new') updateStatus(msg.id, 'read');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Mail className="h-6 w-6 text-primary" />
          Messages
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions from the website.
        </p>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Subject</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <Skeleton className="h-5 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filtered.map((msg) => {
                  const Status = statusStyles[msg.status] ?? statusStyles.new;
                  return (
                    <tr
                      key={msg.id}
                      className="cursor-pointer transition-colors hover:bg-secondary/30"
                      onClick={() => openMessage(msg)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium">{msg.name}</p>
                        <p className="text-xs text-muted-foreground">{msg.email}</p>
                      </td>
                      <td className="px-4 py-3">{msg.subject ?? '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${Status.className}`}>
                          <Status.icon className="h-3 w-3" />
                          {Status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(msg.id)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete message"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message detail dialog */}
      {selected && (
        <Dialog open onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Message from {selected.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                    {selected.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                  <p>{selected.phone ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Company</p>
                  <p>{selected.company ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Subject</p>
                  <p>{selected.subject ?? '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</p>
                <p className="mt-1 whitespace-pre-wrap rounded-lg bg-secondary/40 p-4 text-sm">
                  {selected.message}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {selected.status !== 'resolved' && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(selected.id, 'resolved')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="mr-1.5 h-4 w-4" />
                    Mark Resolved
                  </Button>
                )}
                {selected.status === 'resolved' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(selected.id, 'read')}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeleteId(selected.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the message. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
