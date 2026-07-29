'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

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
  sortable?: boolean;
};

type AdminTableProps = {
  table: string;
  title: string;
  singular: string;
  columns: ColumnDef[];
  fields: FieldDef[];
  searchKeys: string[];
  pageSize?: number;
};

type Row = Record<string, unknown> & { id: string };

type SortState = { key: string; dir: 'asc' | 'desc' } | null;

export function AdminTable({
  table,
  title,
  singular,
  columns,
  fields,
  searchKeys,
  pageSize = 10,
}: AdminTableProps) {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(0);
  const [editing, setEditing] = React.useState<Row | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${table}`);
      if (!response.ok) {
        throw new Error('Failed to load');
      }
      const data = (await response.json()) as Row[];
      setRows(data ?? []);
    } catch (error: any) {
      toast.error('Failed to load', { description: error?.message ?? 'Unknown error' });
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

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return sort.dir === 'asc' ? -1 : 1;
      if (bv == null) return sort.dir === 'asc' ? 1 : -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av;
      }
      const cmp = String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const paginated = sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null;
    });
    setPage(0);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/admin/${table}?id=${encodeURIComponent(deleteId)}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Delete failed');
      }
      toast.success(`${singular} deleted`);
      setDeleteId(null);
      load();
    } catch (error: any) {
      toast.error('Delete failed', { description: error?.message ?? 'Unknown error' });
    }
  };

  const renderCell = (col: ColumnDef, row: Row) =>
    col.render ? col.render(row) : String(row[col.key] ?? '—');

  return (
    <div>
      {/* Header */}
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

      {/* Search + count */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9"
          />
        </div>
        {!loading && (
          <Badge variant="secondary" className="w-fit text-xs font-medium">
            {sorted.length} {sorted.length === 1 ? singular.toLowerCase() : title.toLowerCase().toLowerCase()}
          </Badge>
        )}
      </div>

      {/* Desktop table (md and up) */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-background md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40">
              <tr>
                {columns.map((col) => {
                  const canSort = col.sortable !== false;
                  const isActive = sort?.key === col.key;
                  return (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left font-semibold text-muted-foreground"
                    >
                      {canSort ? (
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                        >
                          {col.label}
                          {isActive ? (
                            sort!.dir === 'asc' ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  );
                })}
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
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-secondary/30">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {renderCell(col, row)}
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

      {/* Mobile card list (below md) */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))
        ) : paginated.length === 0 ? (
          <div className="rounded-xl border border-border bg-background py-12 text-center text-sm text-muted-foreground">
            No {title.toLowerCase()} found.
          </div>
        ) : (
          paginated.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-border bg-background p-4 shadow-sm"
            >
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={col.key} className="flex items-start justify-between gap-3">
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {col.label}
                    </span>
                    <span className="min-w-0 flex-1 text-right text-sm">
                      {renderCell(col, row)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2 border-t border-border pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(row)}
                  className="flex-1"
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(row.id)}
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && !loading && (
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Page {currentPage + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            {Array.from({ length: pageCount }).slice(0, 5).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(i)}
                className="min-w-8"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={currentPage === pageCount - 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}

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

    try {
      const method = initial ? 'PUT' : 'POST';
      const url = initial
        ? `/api/admin/${table}?id=${encodeURIComponent(initial.id)}`
        : `/api/admin/${table}`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Failed to save');
      }
      toast.success(initial ? `${singular} updated` : `${singular} created`);
      onSaved();
    } catch (error: any) {
      toast.error('Failed to save', { description: error?.message ?? 'Unknown error' });
    } finally {
      setSaving(false);
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
