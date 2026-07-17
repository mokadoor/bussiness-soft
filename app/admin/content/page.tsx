'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AdminTable, FieldDef, ColumnDef } from '@/components/admin/admin-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Central configuration for all content types
const contentTypes = {
  products: {
    table: 'products',
    title: 'Products',
    singular: 'Product',
    searchKeys: ['name', 'slug', 'category'],
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'slug', label: 'Slug', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'unique-slug' },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'icon', label: 'Icon (Lucide name)', type: 'text', placeholder: 'Boxes' },
      { key: 'summary', label: 'Summary', type: 'textarea', full: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'features', label: 'Features (JSON)', type: 'json', full: true },
      { key: 'benefits', label: 'Benefits (JSON)', type: 'json', full: true },
      { key: 'modules', label: 'Modules (JSON)', type: 'json', full: true },
      { key: 'faqs', label: 'FAQs (JSON)', type: 'json', full: true },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'color', label: 'Color gradient (Tailwind classes)', type: 'text' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  services: {
    table: 'services',
    title: 'Services',
    singular: 'Service',
    searchKeys: ['title', 'slug'],
    columns: [
      { key: 'title', label: 'Title', sortable: true },
      { key: 'slug', label: 'Slug', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'Compass' },
      { key: 'summary', label: 'Summary', type: 'textarea', full: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'features', label: 'Features (JSON)', type: 'json', full: true },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  industries: {
    table: 'industries',
    title: 'Industries',
    singular: 'Industry',
    searchKeys: ['name', 'slug'],
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'slug', label: 'Slug', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'Factory' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'solutions', label: 'Solutions (JSON)', type: 'json', full: true },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  clients: {
    table: 'clients',
    title: 'Clients',
    singular: 'Client',
    searchKeys: ['name', 'industry'],
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'industry', label: 'Industry', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'industry', label: 'Industry', type: 'text' },
      { key: 'products', label: 'Products (JSON)', type: 'json', full: true },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'logo_url', label: 'Logo URL', type: 'text' },
      { key: 'image', label: 'Image URL', type: 'text' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  testimonials: {
    table: 'testimonials',
    title: 'Testimonials',
    singular: 'Testimonial',
    searchKeys: ['name', 'company', 'quote'],
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'company', label: 'Company', sortable: true },
      { key: 'rating', label: 'Rating', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'quote', label: 'Quote', type: 'textarea', full: true },
      { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  team_members: {
    table: 'team_members',
    title: 'Team Members',
    singular: 'Team Member',
    searchKeys: ['name', 'role'],
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'bio', label: 'Bio', type: 'textarea', full: true },
      { key: 'initials', label: 'Initials (e.g., JD)', type: 'text' },
      { key: 'photo_url', label: 'Photo URL', type: 'text' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  faqs: {
    table: 'faqs',
    title: 'FAQs',
    singular: 'FAQ',
    searchKeys: ['question', 'category'],
    columns: [
      { key: 'question', label: 'Question', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'question', label: 'Question', type: 'text', required: true },
      { key: 'answer', label: 'Answer', type: 'textarea', full: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  statistics: {
    table: 'statistics',
    title: 'Statistics',
    singular: 'Statistic',
    searchKeys: ['label'],
    columns: [
      { key: 'label', label: 'Label', sortable: true },
      { key: 'value', label: 'Value', sortable: true },
      { key: 'suffix', label: 'Suffix', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'label', label: 'Label', type: 'text', required: true },
      { key: 'value', label: 'Value (number)', type: 'number', required: true },
      { key: 'suffix', label: 'Suffix (e.g., +, %)', type: 'text' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
  news: {
    table: 'news',
    title: 'News & Articles',
    singular: 'Article',
    searchKeys: ['title', 'slug', 'category'],
    columns: [
      { key: 'title', label: 'Title', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'published_date', label: 'Date', sortable: true },
      { key: 'is_published', label: 'Published', render: (row: any) => 
        <Badge variant={row.is_published ? 'default' : 'secondary'}>
          {row.is_published ? 'Published' : 'Draft'}
        </Badge>
      },
    ] as ColumnDef[],
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea', full: true },
      { key: 'content', label: 'Content', type: 'textarea', full: true },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'published_date', label: 'Published Date', type: 'text', placeholder: 'YYYY-MM-DD' },
      { key: 'is_published', label: 'Published', type: 'switch' },
      { key: 'sort_order', label: 'Sort Order', type: 'number' },
    ] as FieldDef[],
  },
};

type ContentType = keyof typeof contentTypes;

export default function ContentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = React.useState<ContentType>(() => {
    const param = searchParams.get('type') as ContentType;
    return param && contentTypes[param] ? param : 'products';
  });

  const config = contentTypes[type];

  // Update URL when type changes
  const handleTypeChange = (value: string) => {
    setType(value as ContentType);
    router.push(`/admin/content?type=${value}`);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all website content in one place.
          </p>
        </div>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(contentTypes).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                {cfg.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AdminTable
        key={type} // force re-render when type changes
        table={config.table}
        title={config.title}
        singular={config.singular}
        columns={config.columns}
        fields={config.fields}
        searchKeys={config.searchKeys}
        pageSize={10}
      />
    </div>
  );
}