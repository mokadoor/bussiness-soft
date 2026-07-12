'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'industry', label: 'Industry' },
  {
    key: 'products',
    label: 'Products',
    render: (row) => {
      const products = row.products as string[] | null;
      return products?.length ? products.join(', ') : '—';
    },
  },
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
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Company name' },
  { key: 'industry', label: 'Industry', type: 'text', placeholder: 'Manufacturing' },
  { key: 'products', label: 'Products (JSON array)', type: 'json', full: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'image', label: 'Image URL', type: 'text', full: true, placeholder: 'https://images.pexels.com/...' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminClientsPage() {
  return (
    <AdminTable
      table="clients"
      title="Clients"
      singular="Client"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'industry']}
    />
  );
}
