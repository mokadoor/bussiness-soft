import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { industries } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Industries — Solutions for Your Sector',
  description:
    'Industry-tailored ERP and software solutions for manufacturing, retail, distribution, construction, wood industry, healthcare, education, and professional services in Tunisia.',
  alternates: { canonical: 'https://businessoftware.com.tn/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions tailored to your sector"
        description="Every industry has unique processes and challenges. Our solutions are adapted to how you actually work — not the other way around."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <StaggerGroup className="grid gap-6 md:grid-cols-2">
            {industries.map((industry) => {
              const Icon = getIcon(industry.icon);
              return (
                <StaggerItem key={industry.slug}>
                  <Card id={industry.slug} className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover scroll-mt-20">
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold tracking-tight">{industry.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {industry.description}
                        </p>
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Related solutions
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {industry.solutions.map((solution) => (
                              <span
                                key={solution}
                                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                              >
                                <CheckCircle2 className="h-3 w-3 text-accent" />
                                {solution}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
