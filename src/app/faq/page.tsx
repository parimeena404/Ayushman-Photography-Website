'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';

export default function FAQPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            Inquiries & Information
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to know about our approach, investment, travel, deliverables, and booking process.
          </p>
        </div>
        <FAQAccordion />
      </div>
      <Footer />
    </PageTransition>
  );
}
