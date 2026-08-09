'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CancellationPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg-primary)' }} className="section-padding">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D40000', fontWeight: 800, marginBottom: '0.5rem' }}>
            Service Assurance
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Cancellation & Refund Policy
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              We understand that plans can change. Below is the cancellation and refund policy for custom wedding card printing, offset press orders, and flex banners at <strong>Ayushman Cards & Graphics Press</strong>:
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              1. Order Cancellation Before Printing Approval
            </h2>
            <p>
              Orders cancelled prior to final digital proof approval receive a full refund minus nominal design proofing fees. Once design proofs are approved by the client and offset press production begins, customized print orders cannot be cancelled due to custom paper board materials.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              2. Custom Printed Shaadi Cards & Keepsakes
            </h2>
            <p>
              Once a client approves digital design proofs and printing begins, custom card orders cannot be cancelled for full refund due to customized materials. Design revisions are provided prior to final print authorization.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              3. Refund Processing
            </h2>
            <p>
              Approved refunds will be credited back via Razorpay to the original payment method within 5–7 working days.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
