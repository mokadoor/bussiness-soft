import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/motion';
import { ContactForm } from '@/components/sections/contact-form';
import { company, offices } from '@/lib/data';
import { getServerDictionary } from '@/lib/translation.server';

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getServerDictionary();
  return {
    title: dictionary.pages.contact.metaTitle,
    description: dictionary.pages.contact.metaDescription,
    alternates: { canonical: 'https://businessoftware.com.tn/contact' },
  };
}

export default async function ContactPage() {
  const dictionary = getServerDictionary();
  const contactPage = dictionary.pages.contact;

  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        description={contactPage.description}
        breadcrumbs={[{ label: dictionary.common.home, href: '/' }, { label: contactPage.breadcrumb }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <h2 className="text-2xl font-bold tracking-tight">{contactPage.form.heading}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {contactPage.form.subheading}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact info */}
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-base font-semibold tracking-tight">{contactPage.contactDetailsHeading}</h3>
                  <ul className="mt-4 space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">{contactPage.emailLabel}</p>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          {company.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">{contactPage.phoneLabel}</p>
                        <a
                          href={`tel:${company.phone.replace(/\s/g, '')}`}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          {company.phone}
                        </a>
                        <p className="text-muted-foreground">{company.phoneSecondary}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">{contactPage.websiteLabel}</p>
                        <span className="text-muted-foreground">{company.website.replace('https://', '')}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium">{contactPage.hoursLabel}</p>
                        <p className="text-muted-foreground">{company.hours}</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                {offices.map((office) => (
                  <Card key={office.name} className="p-6">
                    <h3 className="text-base font-semibold tracking-tight">{office.name}</h3>
                    <ul className="mt-3 space-y-3 text-sm">
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
                    </ul>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="border-t border-border">
        <div className="relative h-[400px] w-full overflow-hidden bg-secondary/30">
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <MapPin className="h-7 w-7" />
            </div>
            <p className="text-base font-semibold">Find us in Tunis</p>
            <p className="max-w-md text-sm text-muted-foreground">
              {company.address.street}, {company.address.city}, {company.address.country}
            </p>
            <p className="text-xs text-muted-foreground/70">Google Maps integration placeholder</p>
          </div>
        </div>
      </section>
    </>
  );
}
