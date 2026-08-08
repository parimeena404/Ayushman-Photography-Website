'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg-primary)' }} className="section-padding">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D40000', fontWeight: 800, marginBottom: '0.5rem' }}>
            Data & Trust
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Privacy & Cookie Policy
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              At <strong>Ayushman Cards n Graphics</strong>, we prioritize the privacy and security of our clients&apos; personal information and event media.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              1. Information Collection
            </h2>
            <p>
              We collect information provided directly by clients during session bookings, account registration, and inquiry submissions (such as name, phone number, email address, and event details).
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              2. Payment Security
            </h2>
            <p>
              All online payments are securely processed through Razorpay. We do not store full credit card or bank credentials on our servers.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              3. Private Client Galleries
            </h2>
            <p>
              Event photographs and video galleries delivered to clients remain confidential. Public showcase of portfolio images is done strictly in accordance with client preferences.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
