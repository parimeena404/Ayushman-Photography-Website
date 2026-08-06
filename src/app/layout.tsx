import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import ClientBody from '@/components/ClientBody';
import CursorGlow from '@/components/CursorGlow';
import FilmGrain from '@/components/FilmGrain';
import Preloader from '@/components/Preloader';
import MusicToggle from '@/components/MusicToggle';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ayushman Cards n Graphics — Printing & Photography Studio Ujjain (Since 2001)',
  description:
    'Ayushman Cards n Graphics in Freeganj, Ujjain. Complete Printing Solutions & Fine Art Photography since 2001. Luxury Wedding Cards, Visiting Cards, Posters, Flex, Banners, Pre-Wedding Shoots & Royal Event Photography.',
  keywords: [
    'Ayushman Cards n Graphics',
    'Ayushman Cards Ujjain',
    'Ayushman Printing Press Ujjain',
    'Wedding Cards in Ujjain',
    'Best Shaadi Card Printers Ujjain',
    'Luxury Indian Wedding Invitations',
    'Custom Gold Foil Wedding Cards',
    'Best Wedding Photographers in Ujjain',
    'Pre Wedding Shoot Ujjain',
    'Haldi Sangeet Photography Ujjain',
    'Cinematic Wedding Video Ujjain',
    'Printing Press Freeganj Ujjain',
    'Flex Printing Ujjain',
    'Banner Printing Freeganj Ujjain',
    'Visiting Cards Printing Ujjain',
    'Pamphlets & Poster Printing Ujjain',
    'Commercial Printing Solutions Madhya Pradesh',
    'Rajesh Saatoliya Ujjain',
    'Shourya Saatoliya Ujjain',
    'Wedding Photography Indore Ujjain',
    'Royal Rajasthani Wedding Photographers',
  ],
  authors: [{ name: 'Ayushman Cards n Graphics' }],
  creator: 'Ayushman Cards n Graphics',
  publisher: 'Ayushman Cards n Graphics',
  metadataBase: new URL('https://photography-website-gold.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ayushman Cards n Graphics — Printing & Photography Studio Ujjain',
    description:
      'We Are Printers & Creatives By Heart — Since 2001. Luxury Wedding Cards, Fine Art Photography, Corporate Banners & Flex in Freeganj, Ujjain.',
    url: 'https://photography-website-gold.vercel.app',
    siteName: 'Ayushman Cards n Graphics',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Ayushman Cards n Graphics Fine Art Photography & Printing Studio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayushman Cards n Graphics — Printing & Photography Studio Ujjain',
    description:
      'We Are Printers & Creatives By Heart — Since 2001. Luxury Wedding Cards, Fine Art Photography, Flex & Banners in Freeganj, Ujjain.',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85'],
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <ClientBody>
          <Preloader />
          <CursorGlow />
          <FilmGrain />
          {children}
          <MusicToggle />
          <FloatingWhatsApp />
        </ClientBody>
      </body>
    </html>
  );
}
