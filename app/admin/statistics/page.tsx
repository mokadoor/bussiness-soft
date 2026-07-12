'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'label', label: 'Label' },
  {
    key: 'value',
    label: 'Value',
    render: (row) => `${row.value ?? 0}${row.suffix ?? ''}`,
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
  { key: 'label', label: 'Label', type: 'text', required: true, placeholder: 'Years of Expertise' },
  { key: 'value', label: 'Value', type: 'number', required: true },
  { key: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminStatisticsPage() {
  return (
    <AdminTable
      table="statistics"
      title="Statistics"
      singular="Statistic"
      columns={columns}
      fields={fields}
      searchKeys={['label']}
    />
  );
}
