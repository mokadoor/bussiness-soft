'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'question', label: 'Question' },
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
  { key: 'question', label: 'Question', type: 'text', required: true, full: true },
  { key: 'answer', label: 'Answer', type: 'textarea', full: true, required: true },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'General' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminFaqsPage() {
  return (
    <AdminTable
      table="faqs"
      title="FAQs"
      singular="FAQ"
      columns={columns}
      fields={fields}
      searchKeys={['question', 'category']}
    />
  );
}
