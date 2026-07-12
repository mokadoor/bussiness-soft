'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  {
    key: 'rating',
    label: 'Rating',
    render: (row) => `${row.rating ?? 0} / 5`,
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
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
  { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO' },
  { key: 'company', label: 'Company', type: 'text', placeholder: 'Company name' },
  { key: 'quote', label: 'Quote', type: 'textarea', full: true, required: true },
  { key: 'rating', label: 'Rating (1-5)', type: 'number' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminTestimonialsPage() {
  return (
    <AdminTable
      table="testimonials"
      title="Testimonials"
      singular="Testimonial"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'role', 'company']}
    />
  );
}
