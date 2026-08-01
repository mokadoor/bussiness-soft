import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { FadeIn } from '@/components/ui/motion';
import type { DbClient } from '@/lib/sqlserver/queries';

export function HomeClientLogos({ clients }: { clients: DbClient[] }) {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-border bg-secondary/20 py-16 lg:py-20">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Our Clients"
            title="Trusted by leading Tunisian companies"
            description="From manufacturing and distribution to retail and healthcare, organizations across Tunisia run on our software."
          />
        </FadeIn>
      </Container>

      <FadeIn className="mt-12">
        <div className="relative overflow-hidden mask-fade-edges">
          <div className="flex w-max animate-marquee items-center gap-4">
            {row.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="flex h-20 w-56 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background px-6 shadow-sm"
              >
                <span className="text-center text-sm font-bold tracking-tight text-muted-foreground">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
