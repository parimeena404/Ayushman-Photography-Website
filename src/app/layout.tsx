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
    'Ayushman Cards n Graphics in Ujjain. Complete Printing Solutions & Fine Art Photography since 2001. Luxury Wedding Cards, Visiting Cards, Posters, Flex, Banners, and Royal Photography by Rajesh Saatoliya & Shourya Saatoliya.',
  keywords: [
    'Ayushman Cards n Graphics',
    'Wedding Cards Ujjain',
    'Printing Press Freeganj Ujjain',
    'Rajesh Saatoliya Ujjain',
    'Shourya Saatoliya Ujjain',
    'Complete Printing Solutions Ujjain',
    'Wedding Photography Ujjain',
    'Banners and Flex Printing Ujjain',
  ],
  openGraph: {
    title: 'Ayushman Cards n Graphics — Printing & Photography Studio Ujjain',
    description:
      'We Are Printers & Creatives By Heart — Since 2001. Luxury Wedding Cards, Fine Art Photography, Corporate Banners & Flex in Freeganj, Ujjain.',
    type: 'website',
    locale: 'en_US',
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
