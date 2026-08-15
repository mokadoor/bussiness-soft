import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { StaggerGroup, StaggerItem, FadeIn } from '@/components/ui/motion';
import { ServicesInteractive } from '@/components/sections/services-interactive';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { fetchServices } from '@/lib/sqlserver/queries';
import { getServerDictionary } from '@/lib/translation.server';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getServerDictionary();
  return {
    title: dictionary.pages.services.metaTitle,
    description: dictionary.pages.services.metaDescription,
    alternates: { canonical: 'https://businessoftware.com.tn/services' },
  };
}

export default async function ServicesPage() {
  const dictionary = getServerDictionary();
  const services = await fetchServices();

  return (
    <>
      <PageHero
        eyebrow={dictionary.pages.services.eyebrow}
        title={dictionary.pages.services.title}
        description={dictionary.pages.services.description}
        breadcrumbs={[
          { label: dictionary.common.home, href: '/' },
          { label: dictionary.pages.services.breadcrumb },
        ]}
      />

      {/* Overview grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {dictionary.pages.services.title}
            </p>
            <p className="mt-2 text-balance text-lg text-muted-foreground">
              {dictionary.pages.services.description}
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
