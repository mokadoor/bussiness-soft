import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


const siteUrl = 'https://businessoftware.com.tn';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Business Software TN — ERP Solutions & Digital Transformation | Tunisia',
    template: '%s | Business Software TN',
  },
  description:
    'Business Software TN is a Tunisian software company specialized in ERP solutions, custom software development, digital transformation, and IT consulting. Discover Nexus ERP, CRM, and industry-tailored software.',
  keywords: [
    'ERP Tunisia',
    'Business Software Tunisia',
    'Nexus ERP',
    'Nexus CRM',
    'custom software development Tunisia',
    'digital transformation',
    'IT consulting Tunisia',
    'ERP solutions',
    'software company Tunisia',
  ],
  authors: [{ name: 'Business Software TN' }],
  creator: 'Business Software TN',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Business Software TN',
    title: 'Business Software TN — ERP Solutions & Digital Transformation',
    description:
      'Tunisian software company specialized in ERP solutions, custom software development, digital transformation, and IT consulting.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Business Software TN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Software TN — ERP Solutions & Digital Transformation',
    description:
      'Tunisian software company specialized in ERP solutions, custom software development, digital transformation, and IT consulting.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      fr: `${siteUrl}/fr`,
      ar: `${siteUrl}/ar`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1628' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
