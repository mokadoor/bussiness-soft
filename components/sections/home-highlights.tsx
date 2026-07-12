import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';

const highlights = [
  {
    icon: 'ShieldCheck',
    title: 'Tunisian Compliance',
    description: 'Built for local fiscal, VAT, and CNSS regulations out of the box.',
  },
  {
    icon: 'Boxes',
    title: 'Modular Architecture',
    description: 'Deploy the modules you need today and expand as your business grows.',
  },
  {
    icon: 'Users',
    title: 'Dedicated Support',
    description: 'Responsive, local support team available when you need assistance.',
  },
  {
    icon: 'BarChart3',
    title: 'Real-Time Insights',
    description: 'Dashboards and KPIs that give you visibility across every function.',
  },
];

export function HomeHighlights() {
  return (
    <section className="border-y border-border bg-background py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Why Business Software"
            title="Built for Tunisian enterprises, ready for growth"
            description="Nearly two decades of building and maintaining business software that companies across Tunisia rely on every day."
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
