'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';

export default function AboutPage() {
  return (
    <PageTransition>
      <Navbar />

      {/* Main Storytelling & Journey Section */}
      <div style={{ paddingTop: '5rem' }}>
        <About />
      </div>

      <Footer />
    </PageTransition>
  );
}
