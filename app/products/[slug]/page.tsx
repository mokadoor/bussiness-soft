import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, Monitor, ArrowLeft } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { products } from '@/lib/data';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.summary,
    alternates: { canonical: `https://businessoftware.com.tn/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.summary,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const Icon = getIcon(product.icon);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Windows, iOS, Android',
    description: product.summary,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TND' },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.tagline}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-primary">
            <Link href="/contact">
              Request a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Products
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-white shadow-lg`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Overview
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {product.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Card className="p-7 shadow-card">
                <h3 className="text-lg font-semibold tracking-tight">Key benefits</h3>
                <ul className="mt-5 space-y-3">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-secondary/20 py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow="Features"
              title={`What ${product.name} does`}
              description="Core capabilities that help you run your business more efficiently."
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => {
              const FeatureIcon = getIcon(feature.icon);
              return (
                <StaggerItem key={feature.title}>
                  <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FeatureIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Modules */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow="Modules"
              title="Modular by design"
              description="Deploy the modules you need today and add more as your business grows."
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.modules.map((module) => {
              const ModuleIcon = getIcon(module.icon);
              return (
                <StaggerItem key={module.name}>
                  <div className="flex items-start gap-4 rounded-xl border border-border/80 bg-background p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <ModuleIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">{module.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Screenshots placeholder */}
      <section className="bg-secondary/20 py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow="Screenshots"
              title={`${product.name} in action`}
              description="A glimpse of the interface your team will use every day."
            />
          </FadeIn>
          <FadeIn className="mt-14" delay={0.1}>
            <div className="grid gap-5 lg:grid-cols-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-background shadow-card"
                >
                  <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Monitor className="h-7 w-7" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {product.name} — {['Dashboard view', 'Module view'][i]}
                    </p>
                    <p className="text-xs text-muted-foreground/70">Screenshot placeholder</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28">
        <Container className="max-w-3xl">
          <FadeIn>
            <SectionHeader
              eyebrow="FAQs"
              title={`Frequently asked questions`}
              description="Everything you need to know about Nexus ERP."
            />
          </FadeIn>
          <FadeIn className="mt-10" delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {product.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
