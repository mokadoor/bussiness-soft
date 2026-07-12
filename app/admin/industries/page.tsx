'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'icon', label: 'Icon' },
  {
    key: 'is_published',
    label: 'Status',
    render: (row) =>
      row.is_published ? (
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
          Published
        </span>
      ) : (
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Draft
        </span>
      ),
  },
];

const fields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Manufacturing' },
  { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'manufacturing' },
  { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Factory' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'solutions', label: 'Solutions (JSON array of strings)', type: 'json', full: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminIndustriesPage() {
  return (
    <AdminTable
      table="industries"
      title="Industries"
      singular="Industry"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'slug']}
    />
  );
}
