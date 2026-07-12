'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'title', label: 'Title' },
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
  { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'ERP Consulting' },
  { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'erp-consulting' },
  { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Compass' },
  { key: 'summary', label: 'Summary', type: 'textarea', full: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'features', label: 'Features (JSON array)', type: 'json', full: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminServicesPage() {
  return (
    <AdminTable
      table="services"
      title="Services"
      singular="Service"
      columns={columns}
      fields={fields}
      searchKeys={['title', 'slug']}
    />
  );
}
