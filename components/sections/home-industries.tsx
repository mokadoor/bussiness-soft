import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import type { DbIndustry } from '@/lib/supabase/queries';

export function HomeIndustries({ industries }: { industries: DbIndustry[] }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Solutions tailored to your sector"
            description="We understand that every industry has unique processes and challenges. Our solutions are adapted to how you actually work."
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = getIcon(industry.icon ?? 'Factory');
            return (
              <StaggerItem key={industry.id}>
                <Link
                  href={`/industries#${industry.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border/80 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{industry.name}</h3>
                  {industry.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all group-hover:gap-2.5">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
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
