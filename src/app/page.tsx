'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import CategoryCards from '@/components/CategoryCards';
import PromoBanner from '@/components/PromoBanner';
import Services from '@/components/Services';
import PortfolioCategories from '@/components/PortfolioCategories';
import FeaturedStories from '@/components/FeaturedStories';
import WhyChooseUs from '@/components/WhyChooseUs';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import Products from '@/components/Products';
import FAQAccordion from '@/components/FAQAccordion';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <CategoryCards />
        <PromoBanner />
        <Services />
        <PortfolioCategories />
        <FeaturedStories />
        <WhyChooseUs />
        <Packages />
        <Testimonials />
        <Products />
        <FAQAccordion />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
