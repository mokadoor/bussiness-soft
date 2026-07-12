'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'category', label: 'Category' },
  {
    key: 'published_date',
    label: 'Date',
    render: (row) =>
      row.published_date
        ? new Date(row.published_date as string).toLocaleDateString()
        : '—',
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
  { key: 'title', label: 'Title', type: 'text', required: true, full: true },
  { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'my-article' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', full: true },
  { key: 'content', label: 'Content', type: 'textarea', full: true },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'Product' },
  { key: 'published_date', label: 'Published Date', type: 'text', placeholder: '2024-09-15' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminNewsPage() {
  return (
    <AdminTable
      table="news"
      title="News"
      singular="Article"
      columns={columns}
      fields={fields}
      searchKeys={['title', 'slug', 'category']}
    />
  );
}
