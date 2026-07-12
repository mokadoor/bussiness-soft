import type { MetadataRoute } from 'next';
import { fetchProducts } from '@/lib/supabase/queries';

const siteUrl = 'https://businessoftware.com.tn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/services',
    '/industries',
    '/references',
    '/contact',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const products = await fetchProducts();
  const productEntries = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
