'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import { company } from '@/lib/data';
import { useTranslation } from '@/lib/translation';

export function HomeContactPreview() {
  const dictionary = useTranslation();
  const preview = dictionary.home.contactPreview;

  return (
    <section className="bg-secondary/20 py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {preview.eyebrow}
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {preview.title}
              </h2>
              <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                {preview.description}
              </p>
              <Button asChild className="mt-8 bg-primary" size="lg">
                <Link href="/contact">
                  {preview.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6">
                <Mail className="h-5 w-5 text-accent" />
                <p className="mt-3 text-sm font-semibold">{preview.emailTitle}</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {company.email}
                </a>
              </div>
              <div className="rounded-xl border border-border bg-background p-6">
                <Phone className="h-5 w-5 text-accent" />
                <p className="mt-3 text-sm font-semibold">{preview.callTitle}</p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {company.phone}
                </a>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 sm:col-span-2">
                <MapPin className="h-5 w-5 text-accent" />
                <p className="mt-3 text-sm font-semibold">{preview.visitTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {company.address.street}, {company.address.city}, {company.address.country}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}