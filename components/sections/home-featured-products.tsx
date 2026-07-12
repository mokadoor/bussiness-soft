import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/layout/section-header';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/ui/motion';
import { getIcon } from '@/lib/icons';
import { products } from '@/lib/data';

export function HomeFeaturedProducts() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeader
            eyebrow="Our Products"
            title="The Nexus software suite"
            description="A family of integrated products covering ERP, CRM, industry-specific operations, and point of sale — all built and maintained in Tunisia."
          />
        </FadeIn>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((product) => {
            const Icon = getIcon(product.icon);
            return (
              <StaggerItem key={product.slug}>
                <Link href={`/products/${product.slug}`} className="group block h-full">
                  <div className="relative h-full min-h-[20rem] overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    {/* Background image - bottom-left positioned with fade */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[70%] w-[65%] object-cover opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.14] group-hover:scale-105"
                      />
                      {/* Gradient fade from image to card bg */}
                      <div className="absolute bottom-0 left-0 h-[70%] w-[65%] bg-gradient-to-t from-card via-card/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 h-[70%] w-[65%] bg-gradient-to-r from-transparent to-card" />
                    </div>

                    {/* Content */}
                    <div className="relative flex h-full flex-col p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-white shadow-md`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold tracking-tight">{product.name}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{product.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {product.summary}
                      </p>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                        Explore product
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <FadeIn className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
