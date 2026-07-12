import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import { company, stats } from '@/lib/data';

const points = [
  'Tunisian ERP editor since 2006',
  '150+ active clients across 8 industries',
  'Local support and dedicated consulting',
  'Compliant with Tunisian fiscal regulations',
];

export function HomeAbout() {
  return (
    <section className="bg-secondary/20 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              About Us
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Your partner in business software, since {company.foundedYear}
            </h2>
            <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Founded in {company.foundedYear}, {company.name} is a Tunisian software editor
              specialized in information technology and enterprise consulting. Our mission is to
              accompany companies at every stage — from design to the deployment of powerful,
              innovative IT systems. Our goal: help our clients increase productivity,
              profitability, and responsiveness.
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
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.label}
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
