import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/ui/motion';

const reasons = [
  {
    title: 'A satisfied client is our absolute priority',
    description:
      'We measure our success by your results. Every engagement starts with understanding your business and ends with a solution your team can rely on.',
  },
  {
    title: 'Deep Tunisian market expertise',
    description:
      'Born and built in Tunisia, we understand local regulations, business culture, and the real challenges Tunisian enterprises face every day.',
  },
  {
    title: 'Responsive and personalized service',
    description:
      'We offer a complete range of reactive, personalized services. Your dedicated team knows your business and is there when you need them.',
  },
  {
    title: 'From design to long-term support',
    description:
      'We accompany you at every stage — from initial analysis and design to deployment, training, and ongoing support and maintenance.',
  },
];

export function HomeWhyChooseUs() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Why Choose Us
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              A trusted Tunisian partner, not just a vendor
            </h2>
            <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Companies across Tunisia choose Business Software because we combine technical
              excellence with genuine partnership — staying with you long after go-live.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <h3 className="text-sm font-semibold">{reason.title}</h3>
                  </div>
                  <p className="pl-7.5 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-[#0a3a63] p-8 shadow-xl">
              <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white">Our promise to every client</h3>
                <p className="mt-4 text-white/80">
                  We commit to delivering software that is reliable, compliant, and genuinely useful
                  — backed by responsive support and continuous improvement.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    'On-time, on-budget delivery',
                    'Tunisian regulatory compliance',
                    'Dedicated local support team',
                    'Continuous product evolution',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
