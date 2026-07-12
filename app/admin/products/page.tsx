'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'category', label: 'Category' },
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
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Nexus ERP' },
  { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'nexus-erp' },
  { key: 'tagline', label: 'Tagline', type: 'text', full: true, placeholder: 'The complete Tunisian ERP...' },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'ERP Suite' },
  { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Boxes' },
  { key: 'summary', label: 'Summary', type: 'textarea', full: true },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'features', label: 'Features (JSON)', type: 'json', full: true },
  { key: 'benefits', label: 'Benefits (JSON array)', type: 'json', full: true },
  { key: 'modules', label: 'Modules (JSON)', type: 'json', full: true },
  { key: 'faqs', label: 'FAQs (JSON)', type: 'json', full: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminProductsPage() {
  return (
    <AdminTable
      table="products"
      title="Products"
      singular="Product"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'slug', 'category']}
    />
  );
}
