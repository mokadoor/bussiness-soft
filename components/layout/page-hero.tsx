import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from './container';
import { cn } from '@/lib/utils';

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 to-background',
        className
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.3] mask-fade-b" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-14 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={i} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
