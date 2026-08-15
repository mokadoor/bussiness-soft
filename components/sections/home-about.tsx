'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import { company } from '@/lib/data';
import { useTranslation } from '@/lib/translation';
import type { DbStat } from '@/lib/sqlserver/queries';

export function HomeAbout({ stats }: { stats: DbStat[] }) {
  const dictionary = useTranslation();
  const section = dictionary.home.about;
  const points = section.points;

  return (
    <section className="bg-secondary/20 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {section.eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {section.title.replace('{year}', String(company.foundedYear))}
            </h2>
            <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.description.replace('{year}', String(company.foundedYear)).replace('{companyName}', company.name)}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 bg-primary">
              <Link href="/about">
                {section.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-border bg-background p-6 shadow-card"
                >
                  <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
