'use client';

import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import { useTranslation } from '@/lib/translation';

export function HomeHighlights() {
  const dictionary = useTranslation();
  const highlights = dictionary.home.highlights.items;

  return (
    <section className="border-y border-border bg-background py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow={dictionary.home.highlights.eyebrow}
            title={dictionary.home.highlights.title}
            description={dictionary.home.highlights.description}
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <Card className="group h-full border-border/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
