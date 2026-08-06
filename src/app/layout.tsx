import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import ClientBody from '@/components/ClientBody';
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
  title: 'Lumière Studio — Luxury Wedding & Portrait Photography',
  description:
    'An award-winning photography studio specializing in luxury weddings, destination celebrations, and editorial portraiture. Timeless imagery crafted with emotion and artistry.',
  keywords: [
    'luxury wedding photography',
    'destination wedding photographer',
    'editorial photography',
    'fine art weddings',
    'portrait photography',
  ],
  openGraph: {
    title: 'Lumière Studio — Luxury Wedding & Portrait Photography',
    description:
      'Timeless imagery crafted with emotion and artistry. Award-winning photography for luxury weddings and destinations worldwide.',
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
          {children}
        </ClientBody>
      </body>
    </html>
  );
}
