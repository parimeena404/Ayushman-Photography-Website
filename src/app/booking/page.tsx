'use client';

import { Suspense } from 'react';
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
          <p className="text-editorial-sm font-body" style={{ color: '#D40000', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>
            Ayushman Printing Press Ujjain
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Place Print Order / Request Quotation
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Select your print specifications, upload your artwork or request a custom design layout, and complete your order.
          </p>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: 'var(--accent)' }}>Loading Booking System...</div>}>
          <BookingWizard />
        </Suspense>
      </div>
      <Footer />
    </PageTransition>
  );
}
