import type { Metadata } from 'next';
import { Target, Eye, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Card } from '@/components/ui/card';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { CtaBanner } from '@/components/sections/cta-banner';
import { getIcon } from '@/lib/icons';
import { company, values, timeline, team, offices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us — Our Story, Mission & Team',
  description:
    'Founded in 2006, Business Software TN is a Tunisian software editor specialized in ERP solutions, custom development, and IT consulting. Discover our story, mission, values, and team.',
  alternates: { canonical: 'https://businessoftware.com.tn/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Building business software for Tunisia since 2006"
        description="A Tunisian software editor specialized in information technology and enterprise consulting — accompanying companies at every stage, from design to deployment of powerful, innovative IT systems."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Company story + mission/vision */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Our Story
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                From a local startup to a trusted ERP editor
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Founded in {company.foundedYear}, {company.name} is a Tunisian software editor
                  specialized in information technology and enterprise consulting. Our mission is to
                  accompany companies at every stage — from design to the deployment of powerful and
                  innovative IT systems.
                </p>
                <p>
                  Our primary objective is to help our clients increase their productivity,
                  profitability, and responsiveness in an increasingly competitive market. Over
                  nearly two decades, we&apos;ve built and refined the Nexus suite — ERP, CRM,
                  industry-specific editions, and point of sale — trusted by over 150 active clients
                  across 8 industries.
                </p>
                <p>
                  What sets us apart is our Tunisian roots. We build software that understands local
                  regulations, business culture, and the real challenges Tunisian enterprises face —
                  backed by a local support team that&apos;s there when you need them.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="grid gap-5">
              <Card className="border-primary/20 p-7 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">Our Mission</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      To accompany enterprises at every stage — from design to the deployment of
                      powerful, innovative IT systems — and help them increase productivity,
                      profitability, and responsiveness.
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
                    <h3 className="text-xl font-semibold tracking-tight">Our Vision</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      To be the leading Tunisian software editor, empowering every enterprise —
                      large or small — with accessible, reliable, and compliant technology that
                      drives sustainable growth.
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
              eyebrow="Our Values"
              title="What we stand for"
              description="The principles that guide how we build software and work with our clients."
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
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
              eyebrow="Our Journey"
              title="Milestones along the way"
              description="Key moments in our growth from a local startup to a trusted Tunisian software editor."
            />
          </FadeIn>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
            {timeline.map((item, i) => (
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
              eyebrow="Leadership"
              title="Meet the team behind Business Software"
              description="Experienced leaders guiding our mission to build software Tunisian enterprises can rely on."
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="group h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-white shadow-md">
                    {member.initials}
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
              eyebrow="Our Offices"
              title="Where to find us"
              description="Based in Tunis with a regional office in Sfax — serving clients across the country."
            />
          </FadeIn>
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {offices.map((office) => (
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
