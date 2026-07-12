'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import type { DbIndustry } from '@/lib/supabase/queries';
import { cn } from '@/lib/utils';

export function IndustriesInteractive({ industries }: { industries: DbIndustry[] }) {
  const allSolutions = React.useMemo(
    () => Array.from(new Set(industries.flatMap((i) => i.solutions))).sort(),
    [industries]
  );

  const [filter, setFilter] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    if (!filter) return industries;
    return industries.filter((i) => i.solutions.includes(filter));
  }, [industries, filter]);

  if (industries.length === 0) return null;

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-border bg-background/80 backdrop-blur">
        <Container className="py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted-foreground">Filter by solution:</span>
            <button
              onClick={() => setFilter(null)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-all',
                !filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              All
            </button>
            {allSolutions.map((solution) => (
              <button
                key={solution}
                onClick={() => setFilter(filter === solution ? null : solution)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  filter === solution
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {solution}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <section className="py-20 lg:py-28">
        <Container>
          <StaggerGroup className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((industry) => {
                const Icon = getIcon(industry.icon ?? 'Factory');
                const isExpanded = expanded === industry.id;
                return (
                  <motion.div
                    key={industry.id}
                    id={industry.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="scroll-mt-20"
                  >
                    <StaggerItem>
                      <div
                        className={cn(
                          'group relative h-full overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-card-hover',
                          isExpanded ? 'border-primary/30 shadow-card-hover' : 'border-border/80 hover:-translate-y-1'
                        )}
                      >
                        {/* Decorative gradient blob */}
                        <div
                          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/8 to-accent/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                          aria-hidden="true"
                        />

                        <div className="relative p-7">
                          <div className="flex items-start gap-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                              <Icon className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold tracking-tight">{industry.name}</h3>
                              {industry.description && (
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                  {industry.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Solutions */}
                          <div className="mt-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Related solutions
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {industry.solutions.map((solution) => (
                                <button
                                  key={solution}
                                  onClick={() => setFilter(filter === solution ? null : solution)}
                                  className={cn(
                                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105',
                                    filter === solution
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-secondary text-foreground hover:bg-primary/10 hover:text-primary'
                                  )}
                                >
                                  <CheckCircle2 className="h-3 w-3 text-accent" />
                                  {solution}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Expandable details */}
                          <button
                            onClick={() => setExpanded(isExpanded ? null : industry.id)}
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
                          >
                            {isExpanded ? 'Show less' : 'Learn more'}
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-300',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-4 border-t border-border pt-4">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                      What we deliver
                                    </p>
                                    <ul className="mt-2 grid gap-2">
                                      {industry.solutions.map((sol) => (
                                        <li
                                          key={sol}
                                          className="flex items-center gap-2 text-sm text-foreground/90"
                                        >
                                          <ArrowRight className="h-3.5 w-3.5 text-accent" />
                                          {sol} — tailored to {industry.name.toLowerCase()} operations
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="flex flex-wrap gap-3">
                                    <a
                                      href="/contact"
                                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                                    >
                                      Request a demo
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                    <a
                                      href="/products"
                                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                                    >
                                      See products
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </StaggerItem>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </StaggerGroup>

          {filtered.length === 0 && (
            <FadeIn className="py-20 text-center">
              <p className="text-muted-foreground">
                No industries match this filter.{' '}
                <button
                  onClick={() => setFilter(null)}
                  className="font-medium text-primary hover:underline"
                >
                  Clear filter
                </button>
              </p>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
}
