'use client';

import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/ui/motion';
import { useTranslation } from '@/lib/translation';

export function HomeWhyChooseUs() {
  const dictionary = useTranslation();
  const section = dictionary.home.whyChooseUs;
  const reasons = section.reasons;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {section.eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.description}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <h3 className="text-sm font-semibold">{reason.title}</h3>
                  </div>
                  <p className="pl-8 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[#0a3a63] p-8 shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white">{section.cardTitle}</h3>
                <p className="mt-4 text-white/80">{section.cardDescription}</p>
                <ul className="mt-8 space-y-4">
                  {section.promises.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
