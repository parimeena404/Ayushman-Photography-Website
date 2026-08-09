'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExploreCategories from '@/components/ExploreCategories';
import ProductCarousel, { ProductItem } from '@/components/ProductCarousel';
import PromoBanner from '@/components/PromoBanner';
import PortfolioCategories from '@/components/PortfolioCategories';
import FeaturedStories from '@/components/FeaturedStories';
import WhyChooseUs from '@/components/WhyChooseUs';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import NewsletterBanner from '@/components/NewsletterBanner';
import BrandValueProps from '@/components/BrandValueProps';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

import InstantPrintCalculator from '@/components/InstantPrintCalculator';

// 1. Royal Wedding & Event Invitation Cards
const weddingCards: ProductItem[] = [
  {
    id: 'wed-1',
    title: '👰 Royal Velvet & Gold Foil Laser Cut Wedding Card Box',
    badge: '100 PCS @ ₹4,500',
    price: '₹4,500',
    unit: '100 Box Cards Set',
    category: 'Wedding Cards',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
  },
  {
    id: 'wed-2',
    title: '✨ Premium Clear Acrylic Wedding Invitation Card with Wax Seal',
    badge: '100 PCS @ ₹6,500',
    price: '₹6,500',
    unit: '100 Acrylic Cards',
    category: 'Acrylic Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
  },
  {
    id: 'wed-3',
    title: '📜 Royal Farman Scroll Invitation Card with Metallic Case',
    badge: '100 PCS @ ₹5,200',
    price: '₹5,200',
    unit: '100 Scroll Cards',
    category: 'Scroll Invitations',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&q=80',
  },
  {
    id: 'wed-4',
    title: '🪔 Traditional Ganesh Floral Wedding Invitation Set',
    badge: '200 PCS @ ₹3,800',
    price: '₹3,800',
    unit: '200 Standard Cards',
    category: 'Traditional Cards',
    image: '/images/keepsakes/card2.png',
  },
  {
    id: 'wed-5',
    title: '📰 "The Shaadi Times" Custom Wedding Newspaper Card',
    badge: '100 PCS @ ₹3,200',
    price: '₹3,200',
    unit: '100 Newspaper Cards',
    category: 'Newspaper Invitations',
    image: '/images/keepsakes/card3.png',
  },
];

// 2. Corporate Stationery & Marketing Prints
const corporatePrints: ProductItem[] = [
  {
    id: 'corp-1',
    title: '💼 350 GSM Velvet Touch Business Cards with Gold Foil Stamping',
    badge: '500 PCS @ ₹1,250',
    price: '₹1,250',
    unit: '500 Cards',
    category: 'Visiting Cards',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80',
  },
  {
    id: 'corp-2',
    title: '📄 130 GSM Gloss Art Paper Multi-Color Pamphlets / Flyers',
    badge: '1,000 PCS @ ₹1,800',
    price: '₹1,800',
    unit: '1,000 Flyers (A4/A5)',
    category: 'Pamphlets & Flyers',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80',
  },
  {
    id: 'corp-3',
    title: '📑 Premium Executive Letterheads & Matching Printed Envelopes',
    badge: '500 SETS @ ₹2,200',
    price: '₹2,200',
    unit: '500 Sets',
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&q=80',
  },
  {
    id: 'corp-4',
    title: '🧾 Customized Duplicate Carbonless Bill Books & Receipt Books',
    badge: '10 BOOKS @ ₹1,500',
    price: '₹1,500',
    unit: '10 Bill Books',
    category: 'Bill Books',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80',
  },
];

// 3. Flex Banners, Signage & Custom Printed Merchandise
const signageKeepsakes: ProductItem[] = [
  {
    id: 'sign-1',
    title: '🚩 Outdoor Heavy Duty Star Flex Banner Printing',
    badge: 'START @ ₹18 / sq ft',
    price: '₹18',
    unit: 'Per Sq. Ft.',
    category: 'Flex Banners',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=500&q=80',
  },
  {
    id: 'sign-2',
    title: '🎯 Roll-up Promotional Display Standee (6x3 Feet Frame Included)',
    badge: '1 SET @ ₹1,450',
    price: '₹1,450',
    unit: 'Complete Standee Set',
    category: 'Display Standees',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
  },
  {
    id: 'sign-3',
    title: '📖 HD Flush Mount Wedding Photobook Album (Non-Tearable Silk Sheet)',
    badge: '30 PAGES @ ₹4,500',
    price: '₹4,500',
    unit: '30 Page HD Album',
    category: 'Photobooks',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
  },
  {
    id: 'sign-4',
    title: '☕ Custom Printed Ceramic Magic Mug with Photo & Branding',
    badge: 'BUY 10 @ ₹1,800',
    price: '₹1,800',
    unit: '10 Magic Mugs',
    category: 'Custom Merchandise',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Slider */}
        <Hero />

        {/* Explore Print Categories */}
        <ExploreCategories />

        {/* Instant Price Estimator Widget */}
        <InstantPrintCalculator />

        {/* Product Carousel 1: Royal Wedding Cards & Invitations */}
        <ProductCarousel
          id="products"
          sectionTitle="Royal Wedding & Ceremonial Invitation Cards"
          sectionSubtitle="Explore luxury gold foil cards, acrylic invitations, laser cut box cards & Farman scrolls"
          items={weddingCards}
        />

        {/* Product Carousel 2: Corporate Stationery & Marketing Prints */}
        <ProductCarousel
          sectionTitle="Corporate Printing, Visiting Cards & Marketing Flyers"
          sectionSubtitle="High-speed offset printing for 350 GSM business cards, pamphlets, letterheads & bill books"
          items={corporatePrints}
        />

        {/* Side-by-Side Split Banners */}
        <PromoBanner />

        {/* Product Carousel 3: Flex Banners, Signage & Custom Gifts */}
        <ProductCarousel
          sectionTitle="Flex Banners, Display Standees & Custom Printed Gifts"
          sectionSubtitle="Outdoor heavy duty Star Flex, roll-up standees, HD photobooks & customized photo mugs"
          items={signageKeepsakes}
        />

        {/* Portfolio Gallery Showcase */}
        <PortfolioCategories />

        {/* Client Printing Reviews */}
        <FeaturedStories />

        {/* Why Choose Ayushman Printing Press */}
        <WhyChooseUs />

        {/* Bulk Printing Packages */}
        <Packages />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Newsletter Subscription Banner */}
        <NewsletterBanner />

        {/* Contact & Studio Location */}
        <Contact />

        {/* Brand Narrative & Value Propositions */}
        <BrandValueProps />
      </main>
      <Footer />
    </>
  );
}
