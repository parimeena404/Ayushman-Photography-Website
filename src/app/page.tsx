'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import PortfolioCategories from '@/components/PortfolioCategories';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import InstagramGrid from '@/components/InstagramGrid';
import PressCarousel from '@/components/PressCarousel';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero mode="video" />
      <PressCarousel />
      <FeaturedStories />
      <PortfolioCategories />
      <About />
      <Experience />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  );
}
