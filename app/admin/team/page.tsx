'use client';

import { AdminTable, type ColumnDef, type FieldDef } from '@/components/admin/admin-table';

const columns: ColumnDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
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
  { key: 'bio', label: 'Bio', type: 'textarea', full: true },
  { key: 'initials', label: 'Initials', type: 'text', placeholder: 'JD' },
  { key: 'photo_url', label: 'Photo URL', type: 'text', full: true },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_published', label: 'Published', type: 'switch' },
];

export default function AdminTeamPage() {
  return (
    <AdminTable
      table="team_members"
      title="Team Members"
      singular="Team Member"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'role']}
    />
  );
}
