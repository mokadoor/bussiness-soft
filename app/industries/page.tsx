import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { CtaBanner } from '@/components/sections/cta-banner';
import { IndustriesInteractive } from '@/components/sections/industries-interactive';
import { fetchIndustries } from '@/lib/sqlserver/queries';
import { getServerDictionary } from '@/lib/translation.server';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Industries — Solutions for Your Sector',
  description:
    'Industry-tailored ERP and software solutions for manufacturing, retail, distribution, construction, wood industry, healthcare, education, and professional services in Tunisia.',
  alternates: { canonical: 'https://businessoftware.com.tn/industries' },
};

export default async function IndustriesPage() {
  const industries = await fetchIndustries();

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions tailored to your sector"
        description="Every industry has unique processes and challenges. Our solutions are adapted to how you actually work — not the other way around. Filter by solution or expand a card to learn more."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      />

      <IndustriesInteractive industries={industries} />

      <CtaBanner />
    </>
  );
}
