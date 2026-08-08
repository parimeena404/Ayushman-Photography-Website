'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CopyrightPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', backgroundColor: 'var(--bg-primary)' }} className="section-padding">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D40000', fontWeight: 800, marginBottom: '0.5rem' }}>
            Intellectual Property
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Copyright & Intellectual Property Rights
          </h1>

          <div style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              All photographs, cinematic films, graphics, logo designs, custom invitation card templates, and digital media created by <strong>Ayushman Cards n Graphics</strong> are protected by Indian and International copyright laws.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem' }}>
              Client Usage Permissions
            </h2>
            <p>
              Clients purchasing photography sessions or custom card prints receive full rights for personal print, digital sharing, and family archiving. Un-authorized commercial licensing, resale, or sub-licensing to third-party vendors without permission is prohibited.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
