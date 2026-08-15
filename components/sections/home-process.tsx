'use client';

import { ArrowRight, Layers3, Rocket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { useTranslation } from '@/lib/translation';

const icons = [Layers3, Rocket, ShieldCheck];

export function HomeProcess() {
  const dictionary = useTranslation();
  const section = dictionary.home.process;
  const steps = section.steps;

  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <Container className="relative">
        <FadeIn>
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? Layers3;
            return (
              <StaggerItem key={step.title}>
                <div className="group h-full rounded-2xl border border-border bg-background/80 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <FadeIn className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">
              {section.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
