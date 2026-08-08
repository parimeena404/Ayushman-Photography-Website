'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '5rem' }}>
        <Contact />
      </div>
      <Footer />
    </PageTransition>
  );
}
