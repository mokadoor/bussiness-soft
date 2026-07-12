'use client';

import * as React from 'react';
import { CheckCircle2, ArrowUp } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import type { DbService } from '@/lib/supabase/queries';
import { cn } from '@/lib/utils';

export function ServicesInteractive({ services }: { services: DbService[] }) {
  const [activeSlug, setActiveSlug] = React.useState(services[0]?.slug ?? '');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    services.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [services]);

  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (services.length === 0) return null;

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-lg">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((service) => {
              const Icon = getIcon(service.icon ?? 'Compass');
              const isActive = activeSlug === service.slug;
              const shortLabel = service.title.length > 22
                ? service.title.split(' ').slice(0, 2).join(' ')
                : service.title;
              return (
                <button
                  key={service.id}
                  onClick={() => scrollTo(service.slug)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Detailed sections */}
      {services.map((service, idx) => {
        const Icon = getIcon(service.icon ?? 'Compass');
        const reversed = idx % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.slug}
            className={cn(
              'scroll-mt-32 py-20 transition-colors duration-300 lg:py-24',
              idx % 2 === 1 ? 'bg-secondary/20' : '',
              activeSlug === service.slug && idx % 2 === 0 && 'bg-primary/[0.02]'
            )}
          >
            <Container>
              <FadeIn>
                <div
                  className={cn(
                    'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
                    reversed && 'lg:[&>*:first-child]:order-2'
                  )}
                >
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform duration-300 hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                      {service.title}
                    </h2>
                    {service.description && (
                      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {service.description}
                      </p>
                    )}
                    <button
                      onClick={() => scrollTo(services[0].slug)}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
                    >
                      <ArrowUp className="h-4 w-4" />
                      Back to top
                    </button>
                  </div>
                  <div className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:shadow-card-hover">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      What&apos;s included
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                        >
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
    </>
  );
}
