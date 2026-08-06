'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilmsSection from '@/components/FilmsSection';

export default function FilmsListingPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '2rem' }} className="section-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            Motion Picture
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '1rem' }}>
            Cinematic Films
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Sound, movement, and light captured in motion. Experience our collection of wedding films and aerial documentaries.
          </p>
        </div>
        <FilmsSection />
      </div>
      <Footer />
    </PageTransition>
  );
}
