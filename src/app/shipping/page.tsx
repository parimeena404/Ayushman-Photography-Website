'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg-primary)' }} className="section-padding">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D40000', fontWeight: 800, marginBottom: '0.5rem' }}>
            Fulfillment & Delivery
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Album Delivery & Shipping Policy
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              <strong>Ayushman Cards n Graphics</strong> delivers physical photo albums, custom invitation card boxes, framed canvas prints, and keepsake newspapers across India and internationally.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              1. Studio Pickup (Ujjain)
            </h2>
            <p>
              Clients residing in or visiting Ujjain can collect completed card sets, printed albums, and frames directly from our studio at 63 Varuchi Marg, Freeganj, Ujjain MP.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              2. Courier & Express Shipping
            </h2>
            <p>
              Domestic orders are shipped via trusted express courier services (Blue Dart, DTDC, India Post Speed Post) with tracking links provided. Delivery typically takes 3–5 business days after printing completion.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              3. Digital Delivery
            </h2>
            <p>
              High-resolution digital photos and cinematic video highlight reels are delivered via private password-protected cloud gallery links within 7–14 days following the event.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
