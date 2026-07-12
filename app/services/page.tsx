import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { StaggerGroup, StaggerItem, FadeIn } from '@/components/ui/motion';
import { ServicesInteractive } from '@/components/sections/services-interactive';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { fetchServices } from '@/lib/supabase/queries';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Services — ERP Consulting, Development & Digital Transformation',
  description:
    'Full-lifecycle software services: ERP consulting, digital transformation, custom software development, web and mobile development, ERP implementation, data migration, support, and maintenance.',
  alternates: { canonical: 'https://businessoftware.com.tn/services' },
};

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Full-lifecycle software services"
        description="A complete range of responsive, personalized services to meet all your business needs — from initial consulting and development to ongoing support and maintenance."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      {/* Overview grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Browse all services
            </p>
            <p className="mt-2 text-balance text-lg text-muted-foreground">
              Click any card below or use the filter bar to jump to a specific service.
            </p>
          </FadeIn>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getIcon(service.icon ?? 'Compass');
              return (
                <StaggerItem key={service.id}>
                  <a
                    href={`#${service.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{service.title}</h3>
                    {service.summary && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.summary}
                      </p>
                    )}
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      <ServicesInteractive services={services} />

      <CtaBanner />
    </>
  );
}
