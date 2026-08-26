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
  title: 'Ayushman Cards & Graphics — Premium Printing Press, Wedding Cards & Signage | Ujjain',
  description:
    'Ayushman Cards & Graphics (Ayushman Printing Press) — Ujjain\'s premier offset and digital printing press. Royal wedding cards, visiting cards, flex banners, photobooks, corporate stationery & graphic design since 2001.',
  keywords: [
    'Ayushman Cards n Graphics',
    'Ayushman Printing Press Ujjain',
    'Ayushman Printers Ujjain',
    'Best Wedding Cards Printing Ujjain',
    'Offset Printing Press Ujjain',
    'Digital Printing Ujjain',
    'Flex Banner Printing Ujjain',
    'Visiting Cards Printing Ujjain',
    'Star Flex Banners',
    'Photobook Printing Ujjain',
    'Acrylic Wedding Cards',
    'Corporate Stationery Printing',
    'Pamphlets & Flyers Printing',
    'Glow Sign Board Printing Ujjain',
  ],
  authors: [{ name: 'Ayushman Cards & Graphics' }],
  creator: 'Ayushman Cards & Graphics',
  publisher: 'Ayushman Cards & Graphics',
  metadataBase: new URL('https://ayushman-printing.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ayushman Cards & Graphics — Ujjain\'s Premier Printing Press',
    description:
      'High quality offset printing, luxury wedding cards, custom flex banners, visiting cards, photobooks and custom graphics in Ujjain.',
    url: 'https://ayushman-printing.vercel.app',
    siteName: 'Ayushman Cards & Graphics',
    images: [
      {
        url: '/images/wedding/scroll_royal_blue_velvet.png',
        width: 1200,
        height: 630,
        alt: 'Ayushman Cards & Graphics — Premium Printing Press Ujjain',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayushman Cards & Graphics — Ujjain\'s Premier Printing Press',
    description:
      'High quality offset printing, luxury wedding cards, custom flex banners, visiting cards, photobooks and custom graphics in Ujjain.',
    images: ['/images/wedding/scroll_royal_blue_velvet.png'],
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
      <body suppressHydrationWarning>
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
