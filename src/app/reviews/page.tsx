'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

export default function ReviewsPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }} className="section-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            Client Reflections
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '1rem' }}>
            Love Letters & Reviews
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
            Words shared by couples whose most cherished moments we had the honor of preserving.
          </p>
          <a href="/reviews/submit" className="btn-premium">
            Share Your Experience
          </a>
        </div>
        <Testimonials />
      </div>
      <Footer />
    </PageTransition>
  );
}
