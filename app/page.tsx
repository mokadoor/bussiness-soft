import { HomeHero } from '@/components/sections/home-hero';
import { HomeHighlights } from '@/components/sections/home-highlights';
import { HomeAbout } from '@/components/sections/home-about';
import { HomeFeaturedProducts } from '@/components/sections/home-featured-products';
import { HomeServices } from '@/components/sections/home-services';
import { HomeProcess } from '@/components/sections/home-process';
import { HomeWhyChooseUs } from '@/components/sections/home-why-choose-us';
import { HomeStatistics } from '@/components/sections/home-statistics';
import { HomeIndustries } from '@/components/sections/home-industries';
import { HomeClientLogos } from '@/components/sections/home-client-logos';
import { HomeTestimonials } from '@/components/sections/home-testimonials';
import { CtaBanner } from '@/components/sections/cta-banner';
import { HomeContactPreview } from '@/components/sections/home-contact-preview';
import { company, products, services, industries, clients, testimonials, stats as fallbackStats } from '@/lib/data';

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
  const stats = fallbackStats.map((item, index) => ({
    id: `${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    label: item.label,
    value: item.value,
    suffix: item.suffix ?? null,
    is_published: true,
    sort_order: index + 1,
  }));

  const productsForHome = products.map((item, index) => ({
    id: item.slug,
    slug: item.slug,
    name: item.name,
    tagline: item.tagline,
    category: item.category,
    icon: item.icon,
    image: item.image,
    color: item.color,
    summary: item.summary,
    description: item.description,
    features: item.features,
    benefits: item.benefits,
    modules: item.modules,
    faqs: item.faqs,
    is_published: true,
    sort_order: index + 1,
  }));

  const servicesForHome = services.map((item, index) => ({
    id: item.slug,
    slug: item.slug,
    title: item.title,
    icon: item.icon,
    summary: item.summary,
    description: item.description,
    features: item.features,
    is_published: true,
    sort_order: index + 1,
  }));

  const testimonialsForHome = testimonials.map((item, index) => ({
    id: `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    name: item.name,
    role: item.role,
    company: item.company,
    quote: item.quote,
    rating: item.rating,
    is_published: true,
    sort_order: index + 1,
  }));

  const industriesForHome = industries.map((item, index) => ({
    id: item.slug,
    slug: item.slug,
    name: item.name,
    icon: item.icon,
    description: item.description,
    solutions: item.solutions,
    is_published: true,
    sort_order: index + 1,
  }));

  const clientsForHome = clients.map((item, index) => ({
    id: `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    name: item.name,
    industry: item.industry ?? null,
    products: item.products ?? [],
    description: item.description ?? null,
    image: item.image ?? null,
    is_published: true,
    sort_order: index + 1,
  }));

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
      <HomeFeaturedProducts products={productsForHome} />
      <HomeServices services={servicesForHome} />
      <HomeProcess />
      <HomeWhyChooseUs />
      <HomeStatistics stats={stats} />
      <HomeIndustries industries={industriesForHome} />
      <HomeClientLogos clients={clientsForHome} />
      <HomeTestimonials testimonials={testimonialsForHome} />
      <CtaBanner />
      <HomeContactPreview />
    </>
  );
}
