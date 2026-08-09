'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg-primary)' }} className="section-padding">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D40000', fontWeight: 800, marginBottom: '0.5rem' }}>
            Legal & Terms
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Terms & Conditions
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Welcome to <strong>Ayushman Cards & Graphics Press</strong>. By ordering custom wedding cards, visiting cards, flex banners, corporate stationery, or graphic design services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              1. Print Orders & Advance Deposits
            </h2>
            <p>
              All custom card printing, flex banner orders, and offset printing projects require an advance deposit to initiate design proofing and material procurement. Orders are confirmed upon receipt of deposit payment via our official payment gateway (Razorpay) or direct Ujjain studio payment.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              2. Custom Invitation & Graphic Design Orders
            </h2>
            <p>
              For custom wedding cards, printed albums, and corporate graphics, final approval of proof designs is required prior to bulk printing. Ayushman Cards n Graphics is not responsible for text or design errors approved by the client.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              3. Copyright & Usage Rights
            </h2>
            <p>
              Ayushman Cards n Graphics retains artistic copyright over all created media and photographs. Clients receive personal usage rights for print, social media, and distribution to family. Commercial resale requires prior written agreement.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              4. Studio Location & Contact
            </h2>
            <p>
              Ayushman Studio, 63 Varuchi Marg, Freeganj, Ujjain, Madhya Pradesh 456001. <br />
              Helpline: 9479784979 | 9893022451
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
