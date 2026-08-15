import type { Metadata } from 'next';
import { Target, Eye, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { company } from '@/lib/data';
import { fetchTeam } from '@/lib/sqlserver/queries';
import { getServerDictionary } from '@/lib/translation.server';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Us — Our Story, Mission & Team',
  description:
    'Founded in 2006, Business Software TN is a Tunisian software editor specialized in ERP solutions, custom development, and IT consulting. Discover our story, mission, values, and team.',
  alternates: { canonical: 'https://businessoftware.com.tn/about' },
};

export default async function AboutPage() {
  const dict = await getServerDictionary();
  const team = await fetchTeam();

  const story1 = dict.pages.about.story.paragraph1
    .replace('{foundedYear}', String(company.foundedYear))
    .replace('{companyName}', company.name);

  return (
    <>
      <PageHero
        eyebrow={dict.pages.about.eyebrow}
        title={dict.pages.about.title}
        description={dict.pages.about.description}
        breadcrumbs={[{ label: dict.common.home, href: '/' }, { label: dict.pages.about.breadcrumb }]}
      />

      {/* Company story + mission/vision */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {dict.pages.about.story.eyebrow}
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {dict.pages.about.story.title}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{story1}</p>
                <p>{dict.pages.about.story.paragraph2}</p>
                <p>{dict.pages.about.story.paragraph3}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="grid gap-5">
              <Card className="border-primary/20 p-7 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{dict.pages.about.mission.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {dict.pages.about.mission.description}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="border-accent/20 p-7 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{dict.pages.about.vision.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {dict.pages.about.vision.description}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-secondary/20 py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={dict.pages.about.valuesSection.eyebrow}
              title={dict.pages.about.valuesSection.title}
              description={dict.pages.about.valuesSection.description}
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.pages.about.values.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <StaggerItem key={value.title}>
                  <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={dict.pages.about.timelineSection.eyebrow}
              title={dict.pages.about.timelineSection.title}
              description={dict.pages.about.timelineSection.description}
            />
          </FadeIn>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
            {dict.pages.about.timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.05}>
                <div
                  className={`relative mb-10 flex gap-6 lg:gap-0 ${
                    i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/2" />
                  <div className="absolute left-4 top-1.5 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background lg:left-1/2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </div>
                  <div className={`flex-1 lg:w-1/2 ${i % 2 === 0 ? 'lg:pl-10' : 'lg:pr-10 lg:text-right'}`}>
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {item.year}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="bg-secondary/20 py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={dict.pages.about.leadershipSection.eyebrow}
              title={dict.pages.about.leadershipSection.title}
              description={dict.pages.about.leadershipSection.description}
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dict.pages.about.team.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="group h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-white shadow-md">
                    {member.initials ?? member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Offices */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={dict.pages.about.officesSection.eyebrow}
              title={dict.pages.about.officesSection.title}
              description={dict.pages.about.officesSection.description}
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {dict.pages.about.offices.map((office) => (
              <StaggerItem key={office.name}>
                <Card className="h-full p-7">
                  <h3 className="text-lg font-semibold tracking-tight">{office.name}</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {office.address}
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0 text-accent" />
                      {office.phone}
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0 text-accent" />
                      {office.email}
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0 text-accent" />
                      {office.hours}
                    </li>
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}