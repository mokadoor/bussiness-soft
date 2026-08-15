import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { CtaBanner } from '@/components/sections/cta-banner';
import { IndustriesInteractive } from '@/components/sections/industries-interactive';
import { fetchIndustries } from '@/lib/sqlserver/queries';
import { getServerDictionary } from '@/lib/translation.server';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getServerDictionary();
  return {
    title: dictionary.pages.industries.metaTitle,
    description: dictionary.pages.industries.metaDescription,
    alternates: { canonical: 'https://businessoftware.com.tn/industries' },
  };
}

export default async function IndustriesPage() {
  const dictionary = getServerDictionary();
  const industries = await fetchIndustries();

  return (
    <>
      <PageHero
        eyebrow={dictionary.pages.industries.eyebrow}
        title={dictionary.pages.industries.title}
        description={dictionary.pages.industries.description}
        breadcrumbs={[
          { label: dictionary.common.home, href: '/' },
          { label: dictionary.pages.industries.breadcrumb },
        ]}
      />

      <IndustriesInteractive industries={industries} />

      <CtaBanner />
    </>
  );
}
