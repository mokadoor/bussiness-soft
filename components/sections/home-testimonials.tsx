'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import type { DbTestimonial } from '@/lib/supabase/queries';

export function HomeTestimonials({ testimonials }: { testimonials: DbTestimonial[] }) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const count = testimonials.length;

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + count) % count);
  };

  React.useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, 6000);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  const active = testimonials[index];

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Testimonials"
            title="What our clients say"
            description="Real results from real Tunisian companies running on Nexus."
          />
        </FadeIn>

        <FadeIn className="mt-14" delay={0.1}>
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-card sm:p-12">
              <Quote className="h-10 w-10 text-accent/30" />
              <div className="relative mt-4 min-h-[10rem]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-1">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-balance text-lg leading-relaxed text-foreground sm:text-xl">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                        {active.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold tracking-tight">{active.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {active.role}, {active.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === index ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
