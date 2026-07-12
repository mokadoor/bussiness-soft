import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services — ERP Consulting, Development & Digital Transformation',
  description:
    'Full-lifecycle software services: ERP consulting, digital transformation, custom software development, web and mobile development, ERP implementation, data migration, support, and maintenance.',
  alternates: { canonical: 'https://businessoftware.com.tn/services' },
};

export default function ServicesPage() {
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
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <StaggerItem key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border/80 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Detailed sections */}
      {services.map((service, idx) => {
        const Icon = getIcon(service.icon);
        const reversed = idx % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-20 py-20 lg:py-24 ${idx % 2 === 1 ? 'bg-secondary/20' : ''}`}
          >
            <Container>
              <FadeIn>
                <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {service.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-7 shadow-card">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      What&apos;s included
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <span className="text-sm text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </section>
        );
      })}

      <CtaBanner />
    </>
  );
}
