import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to transform your business with Nexus?
          </h2>
          <p className="mt-5 text-balance text-lg leading-relaxed text-white/80">
            Schedule a personalized demo with our experts and discover how our ERP solutions can
            streamline your operations and drive growth.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
            >
              <Link href="/contact">
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Contact Our Team
              </Link>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
