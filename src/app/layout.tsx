import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter, Manrope } from 'next/font/google';
import ClientBody from '@/components/ClientBody';
import CursorGlow from '@/components/CursorGlow';
import Preloader from '@/components/Preloader';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ayushman Photography Studio — Premium Wedding & Portrait Photography | Ujjain',
  description:
    'Luxury wedding, portrait, and commercial photography by Ayushman Photography Studio. Capturing timeless moments with artistry and elegance since 2001. Based in Ujjain, serving worldwide.',
  keywords: [
    'Ayushman Photography Studio',
    'Premium Wedding Photography Ujjain',
    'Best Wedding Photographers India',
    'Luxury Wedding Photography',
    'Pre Wedding Shoot Ujjain',
    'Portrait Photography Ujjain',
    'Cinematic Wedding Video',
    'Fine Art Photography',
    'Commercial Photography India',
    'Fashion Photography Ujjain',
    'Destination Wedding Photographer',
    'Event Photography',
    'Photo Album Design',
    'Drone Photography Ujjain',
  ],
  authors: [{ name: 'Ayushman Photography Studio' }],
  creator: 'Ayushman Photography Studio',
  publisher: 'Ayushman Photography Studio',
  metadataBase: new URL('https://photography-website-theta-peach.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ayushman Photography Studio — Luxury Photography Since 2001',
    description:
      'Where moments become masterpieces. Premium wedding, portrait, and commercial photography crafted with passion and precision.',
    url: 'https://photography-website-theta-peach.vercel.app',
    siteName: 'Ayushman Photography Studio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Ayushman Photography Studio — Premium Wedding Photography',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayushman Photography Studio — Luxury Photography Since 2001',
    description:
      'Where moments become masterpieces. Premium wedding, portrait, and commercial photography crafted with passion and precision.',
    images: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ClientBody>
          <Preloader />
          <CursorGlow />
          {children}
          <FloatingWhatsApp />
        </ClientBody>
      </body>
    </html>
  );
}
