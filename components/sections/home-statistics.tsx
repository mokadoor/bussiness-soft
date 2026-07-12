import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import type { DbStat } from '@/lib/supabase/queries';

export function HomeStatistics({ stats }: { stats: DbStat[] }) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
      <div
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <FadeIn>
          <SectionHeader
            eyebrow="By the Numbers"
            title={<span className="text-white">Trusted across Tunisia</span>}
            description={
              <span className="text-white/70">
                Nearly two decades of building software that Tunisian enterprises depend on.
              </span>
            }
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.id} className="text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix ?? ''}
                className="block text-4xl font-bold tracking-tight text-white sm:text-5xl"
              />
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
