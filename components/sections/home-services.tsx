import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import type { DbService } from '@/lib/sqlserver/queries';

export function HomeServices({ services }: { services: DbService[] }) {
  return (
    <section className="bg-secondary/20 py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Our Services"
            title="Full-lifecycle software services"
            description="A complete range of responsive, personalized services to meet all your business needs — from consulting and development to support and maintenance."
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getIcon(service.icon ?? 'Compass');
            const shortTitle = service.title.length > 22 ? service.title.split(' ')[0] : service.title;
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border/80 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{service.title}</h3>
                  {service.summary && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
