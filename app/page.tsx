import { HomeHero } from '@/components/sections/home-hero';
import { HomeHighlights } from '@/components/sections/home-highlights';
import { HomeAbout } from '@/components/sections/home-about';
import { HomeFeaturedProducts } from '@/components/sections/home-featured-products';
import { HomeServices } from '@/components/sections/home-services';
import { HomeWhyChooseUs } from '@/components/sections/home-why-choose-us';
import { HomeStatistics } from '@/components/sections/home-statistics';
import { HomeIndustries } from '@/components/sections/home-industries';
import { HomeClientLogos } from '@/components/sections/home-client-logos';
import { HomeTestimonials } from '@/components/sections/home-testimonials';
import { CtaBanner } from '@/components/sections/cta-banner';
import { HomeContactPreview } from '@/components/sections/home-contact-preview';
import { company } from '@/lib/data';
import {
  fetchProducts,
  fetchServices,
  fetchIndustries,
  fetchClients,
  fetchTestimonials,
  fetchStats,
} from '@/lib/supabase/queries';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: company.website,
  foundingDate: String(company.foundedYear),
  email: company.email,
  telephone: company.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    postalCode: company.address.postalCode,
    addressCountry: 'TN',
  },
  sameAs: [company.social.linkedin, company.social.facebook, company.social.twitter],
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.name,
  url: company.website,
};

// Revalidate every 60 seconds so admin edits appear within a minute
export const revalidate = 60;

export default async function HomePage() {
  const [products, services, industries, clients, testimonials, stats] = await Promise.all([
    fetchProducts(),
    fetchServices(),
    fetchIndustries(),
    fetchClients(),
    fetchTestimonials(),
    fetchStats(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <HomeHero />
      <HomeHighlights />
      <HomeAbout stats={stats} />
      <HomeFeaturedProducts products={products} />
      <HomeServices services={services} />
      <HomeWhyChooseUs />
      <HomeStatistics stats={stats} />
      <HomeIndustries industries={industries} />
      <HomeClientLogos clients={clients} />
      <HomeTestimonials testimonials={testimonials} />
      <CtaBanner />
      <HomeContactPreview />
    </>
  );
}
