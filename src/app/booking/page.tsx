'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingWizard from '@/components/BookingWizard';

export default function BookingPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            Reservations
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '1rem' }}>
            Book Your Date
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            We accept a limited number of commissions each year to ensure every story receives our undivided artistry.
          </p>
        </div>
        <BookingWizard />
      </div>
      <Footer />
    </PageTransition>
  );
}
