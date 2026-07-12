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
import { company, stats } from '@/lib/data';

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

export default function HomePage() {
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
      <HomeAbout />
      <HomeFeaturedProducts />
      <HomeServices />
      <HomeWhyChooseUs />
      <HomeStatistics />
      <HomeIndustries />
      <HomeClientLogos />
      <HomeTestimonials />
      <CtaBanner />
      <HomeContactPreview />
    </>
  );
}
