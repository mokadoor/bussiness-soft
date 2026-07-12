'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';
import { Plus, Pencil, Trash2, Search, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Skeleton } from '@/components/ui/skeleton';

export type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'switch' | 'json';
  required?: boolean;
  placeholder?: string;
  full?: boolean;
};

export type ColumnDef = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

type AdminTableProps = {
  table: string;
  title: string;
  singular: string;
  columns: ColumnDef[];
  fields: FieldDef[];
  searchKeys: string[];
};

type Row = Record<string, unknown> & { id: string };

export function AdminTable({
  table,
  title,
  singular,
  columns,
  fields,
  searchKeys,
}: AdminTableProps) {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [editing, setEditing] = React.useState<Row | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load', { description: error.message });
    } else {
      setRows((data as Row[]) ?? []);
    }
    setLoading(false);
  }, [table]);

  React.useEffect(() => {
    load();
  }, [load]);

  const filtered = React.useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q))
    );
  }, [rows, search, searchKeys]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from(table).delete().eq('id', deleteId);
    if (error) {
      toast.error('Delete failed', { description: error.message });
    } else {
      toast.success(`${singular} deleted`);
      setDeleteId(null);
      load();
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage {title.toLowerCase()} displayed on the website.
          </p>
        </div>
        <Button onClick={() => setCreating(true)} className="bg-primary">
          <Plus className="mr-1.5 h-4 w-4" />
          Add {singular}
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-semibold text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3">
                        <Skeleton className="h-5 w-full" />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <Skeleton className="ml-auto h-8 w-20" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-secondary/30">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditing(row)}
                          aria-label={`Edit ${singular}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(row.id)}
                          aria-label={`Delete ${singular}`}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit dialog */}
      {(creating || editing) && (
        <EditDialog
          table={table}
          singular={singular}
          fields={fields}
          initial={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            setCreating(false);
            setEditing(null);
            load();
          }}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {singular}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the entry.
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

function EditDialog({
  table,
  singular,
  fields,
  initial,
  onClose,
  onSaved,
}: {
  table: string;
  singular: string;
  fields: FieldDef[];
  initial: Row | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === 'switch') defaults[f.key] = true;
      else if (f.type === 'json') defaults[f.key] = '[]';
      else if (f.type === 'number') defaults[f.key] = 0;
      else defaults[f.key] = '';
    }
    return { ...defaults, ...(initial ?? {}) };
  });
  const [saving, setSaving] = React.useState(false);

  const setValue = (key: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Process JSON fields
    const payload: Record<string, unknown> = { ...values };
    for (const f of fields) {
      if (f.type === 'json' && typeof payload[f.key] === 'string') {
        try {
          payload[f.key] = JSON.parse(payload[f.key] as string);
        } catch {
          toast.error(`Invalid JSON in ${f.label}`);
          setSaving(false);
          return;
        }
      }
      if (f.type === 'number') {
        payload[f.key] = Number(payload[f.key]);
      }
    }
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    const { error } = initial
      ? await supabase.from(table).update(payload).eq('id', initial.id)
      : await supabase.from(table).insert(payload);

    setSaving(false);
    if (error) {
      toast.error(`Failed to save`, { description: error.message });
    } else {
      toast.success(initial ? `${singular} updated` : `${singular} created`);
      onSaved();
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial ? `Edit ${singular}` : `Add ${singular}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div
                key={f.key}
                className={`space-y-2 ${f.full ? 'sm:col-span-2' : ''}`}
              >
                <Label htmlFor={f.key}>
                  {f.label}
                  {f.required && <span className="ml-0.5 text-destructive">*</span>}
                </Label>
                {f.type === 'textarea' ? (
                  <Textarea
                    id={f.key}
                    rows={4}
                    placeholder={f.placeholder}
                    value={String(values[f.key] ?? '')}
                    onChange={(e) => setValue(f.key, e.target.value)}
                    required={f.required}
                  />
                ) : f.type === 'number' ? (
                  <Input
                    id={f.key}
                    type="number"
                    placeholder={f.placeholder}
                    value={String(values[f.key] ?? '')}
                    onChange={(e) => setValue(f.key, e.target.value)}
                    required={f.required}
                  />
                ) : f.type === 'switch' ? (
                  <div className="flex items-center gap-3 pt-1">
                    <Switch
                      id={f.key}
                      checked={Boolean(values[f.key])}
                      onCheckedChange={(v) => setValue(f.key, v)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {Boolean(values[f.key]) ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ) : f.type === 'json' ? (
                  <Textarea
                    id={f.key}
                    rows={4}
                    placeholder='["item1", "item2"] or [{"key":"value"}]'
                    value={typeof values[f.key] === 'string' ? String(values[f.key]) : JSON.stringify(values[f.key] ?? '[]')}
                    onChange={(e) => setValue(f.key, e.target.value)}
                    className="font-mono text-xs"
                  />
                ) : (
                  <Input
                    id={f.key}
                    placeholder={f.placeholder}
                    value={String(values[f.key] ?? '')}
                    onChange={(e) => setValue(f.key, e.target.value)}
                    required={f.required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-1.5 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-primary">
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
