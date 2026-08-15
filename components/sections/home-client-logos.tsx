'use client';

import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { FadeIn } from '@/components/ui/motion';
import { useTranslation } from '@/lib/translation';
import type { DbClient } from '@/lib/sqlserver/queries';

export function HomeClientLogos({ clients }: { clients: DbClient[] }) {
  const dictionary = useTranslation();
  const section = dictionary.home.clients;
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-border bg-secondary/20 py-16 lg:py-20">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
        </FadeIn>
      </Container>

      <FadeIn className="mt-12">
        <div className="relative overflow-hidden mask-fade-edges">
          <div className="flex w-max animate-marquee items-center gap-4">
            {row.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="group relative flex h-20 w-56 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background px-6 shadow-sm transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                aria-label={`Client ${client.name}`}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-center w-full h-full animate-float-slow group-hover:animate-pulse-glow">
                  <span className="text-center text-sm font-bold tracking-tight text-muted-foreground group-hover:text-primary">
                    {client.name}
                  </span>
                </div>
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
