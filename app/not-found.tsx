import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-bold tracking-tight text-primary sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-balance text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="bg-primary">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse Products
          </Link>
        </Button>
      </div>
    </Container>
  );
}
