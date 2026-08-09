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
          <p className="text-editorial-sm font-body" style={{ color: '#D40000', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
            Ayushman Craft & Press Studio
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Printing Craft & Foil Stamping Showcase
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Watch hot gold foil stamping, laser acrylic wedding card assembly, and German offset press production in action.
          </p>
        </div>
        <FilmsSection />
      </div>
      <Footer />
    </PageTransition>
  );
}
