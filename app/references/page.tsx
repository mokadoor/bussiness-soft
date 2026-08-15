import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { fetchClients } from '@/lib/sqlserver/queries';
import { getServerDictionary } from '@/lib/translation.server';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getServerDictionary();
  return {
    title: dictionary.pages.references.metaTitle,
    description: dictionary.pages.references.metaDescription,
    alternates: { canonical: 'https://businessoftware.com.tn/references' },
  };
}

export default async function ReferencesPage() {
  const dictionary = getServerDictionary();
  const clients = await fetchClients();

  return (
    <>
      <PageHero
        eyebrow={dictionary.pages.references.eyebrow}
        title={dictionary.pages.references.title}
        description={dictionary.pages.references.description}
        breadcrumbs={[
          { label: dictionary.common.home, href: '/' },
          { label: dictionary.pages.references.breadcrumb },
        ]}
      />

      <section className="border-b border-border py-14 lg:py-16">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="group relative flex h-24 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-card px-4 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-card"
                >
                  <span className="relative z-10 text-sm font-bold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                    {client.name}
                  </span>
                  {client.image && (
                    <img
                      src={client.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                    />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <StaggerItem key={client.id}>
                <Card className="group h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  {client.image && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-lg">
                        {client.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </div>
                      {client.industry && (
                        <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur">
                          {client.industry}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight">{client.name}</h3>
                    {client.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {client.description}
                      </p>
                    )}
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Products used
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {client.products.map((product) => (
                          <span
                            key={product}
                            className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <FadeIn className="mt-14 rounded-2xl border border-dashed border-border bg-secondary/30 p-8 text-center lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Case studies coming soon
            </p>
            <p className="mx-auto mt-3 max-w-xl text-balance text-lg text-foreground">
              We&apos;re preparing in-depth case studies detailing how our clients transformed their
              operations with Nexus. Check back soon for the full stories.
            </p>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
