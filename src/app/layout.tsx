import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/Analytics';

// Use fallback fonts when Google Fonts are not available
const fontVariables = '--font-inter: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; --font-inter-tight: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; --font-jetbrains-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;';

export const metadata: Metadata = {
  title: {
    default: 'Valmik Nahata | Data Science Student & ML Researcher',
    template: '%s | Valmik Nahata',
  },
  description: 'UC San Diego Data Science student passionate about machine learning, research, and building impactful solutions.',
  keywords: [
    'data science',
    'machine learning',
    'UC San Diego',
    'student portfolio',
    'research',
    'SLMs',
    'LLMs',
    'RAG',
    'Python',
    'academic projects',
  ],
  authors: [{ name: 'Valmik Nahata' }],
  creator: 'Valmik Nahata',
  publisher: 'Valmik Nahata',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://valmiknahata.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valmiknahata.com',
    title: 'Valmik Nahata | CS × Fintech Engineer',
    description: 'Building reliable ML & data systems for finance',
    siteName: 'Valmik Nahata Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Valmik Nahata - CS × Fintech Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valmik Nahata | CS × Fintech Engineer',
    description: 'Building reliable ML & data systems for finance',
    images: ['/twitter-image.png'],
    creator: '@valmiknahata',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <style dangerouslySetInnerHTML={{ __html: `:root { ${fontVariables} }` }} />
      </head>
      <body
        className="font-sans antialiased"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700">
            <Header />
            <main className="relative z-10">{children}</main>
            
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
