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
import Footer from '@/components/Footer';

// 1. Most Popular Festive & Wedding Packages (Vistaprint Carousel 1)
const popularPackages: ProductItem[] = [
  {
    id: 'pop-1',
    title: '👰 Royal Varmala & Grand Indian Wedding',
    badge: 'BOOK NOW @ ₹45,000',
    price: '₹45,000',
    unit: 'Full Day Coverage',
    category: 'Wedding',
    image: '/images/wedding/wedding5.jpg',
  },
  {
    id: 'fest-1',
    title: '🪔 Royal Diwali & Festive Family Shoot',
    badge: 'BOOK NOW @ ₹15,000',
    price: '₹15,000',
    unit: 'Festive Special',
    category: 'Festivals',
    image: '/images/festivals/diwali-deepotsav.jpg',
  },
  {
    id: 'pop-2',
    title: '✨ Stone Jali Sunset Heritage Silhouette',
    badge: 'BOOK NOW @ ₹65,000',
    price: '₹65,000',
    unit: 'Heritage Special',
    category: 'Heritage Wedding',
    image: '/images/wedding/wedding1.jpg',
  },
  {
    id: 'pop-3',
    title: '💍 Ivy Palace Steps Pre-Wedding Shoot',
    badge: 'BOOK 1 @ ₹25,000',
    price: '₹25,000',
    unit: '1 Shoot Session',
    category: 'Pre-Wedding',
    image: '/images/wedding/wedding3.jpg',
  },
  {
    id: 'fest-2',
    title: '🪁 Makar Sankranti Kite Festival Shoot',
    badge: 'BOOK 1 @ ₹18,000',
    price: '₹18,000',
    unit: 'Outdoor Session',
    category: 'Makar Sankranti',
    image: '/images/festivals/makar-sankranti.png',
  },
  {
    id: 'pop-4',
    title: '🏰 Palace Night Courtyard Royal Walk',
    badge: 'BOOK NOW @ ₹55,000',
    price: '₹55,000',
    unit: 'Night Coverage',
    category: 'Royal Wedding',
    image: '/images/wedding/wedding4.jpg',
  },
];

// 2. Trending Services & Cinema Films (Vistaprint Carousel 2)
const trendingServices: ProductItem[] = [
  {
    id: 'trend-1',
    title: '🤝 Gathbandhan Sacred Vows Ritual Film',
    badge: 'FILM @ ₹35,000',
    price: '₹35,000',
    unit: '5 Min Highlight',
    category: 'Cinematography',
    image: '/images/wedding/wedding6.png',
  },
  {
    id: 'trend-2',
    title: '🌅 Sunset Jharokha Archway Couple Shoot',
    badge: 'HERITAGE @ ₹25,000',
    price: '₹25,000',
    unit: 'Jharokha Session',
    category: 'Pre-Wedding',
    image: '/images/wedding/wedding2.png',
  },
  {
    id: 'trend-3',
    title: '4K Aerial Drone Event Photography Flight',
    badge: 'FLIGHT @ ₹18,000',
    price: '₹18,000',
    unit: 'Half-Day Drone',
    category: 'Drone Photography',
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=500&q=80',
  },
  {
    id: 'trend-4',
    title: '⛵ Sunset Voyage & Destination Photography',
    badge: 'DESTINATION @ ₹30,000',
    price: '₹30,000',
    unit: 'Sunset Voyage',
    category: 'Destination',
    image: '/images/festivals/rainbow-sails.png',
  },
];

// 3. Indian Festive Greeting Cards, Albums & Prints (Vistaprint Carousel 3)
const photoKeepsakes: ProductItem[] = [
  {
    id: 'card-1',
    title: '✉️ Luxury Shaadi & Festive Invitation Cards',
    badge: 'BUY 100 @ ₹4,500',
    price: '₹4,500',
    unit: '100 Custom Cards',
    category: 'Cards n Graphics',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
  },
  {
    id: 'album-1',
    title: '👰 Handcrafted Royal Wedding Flush Album',
    badge: 'BUY 1 @ ₹9,500',
    price: '₹9,500',
    unit: '40 Silk Pages',
    category: 'Albums',
    image: '/images/wedding/wedding5.jpg',
  },
  {
    id: 'album-2',
    title: '🪔 Royal Diwali & Heritage Canvas Print',
    badge: 'BUY 1 @ ₹2,500',
    price: '₹2,500',
    unit: '20×30 Inch Print',
    category: 'Canvas Prints',
    image: '/images/festivals/diwali-deepotsav.jpg',
  },
  {
    id: 'album-3',
    title: 'Custom Framed Gold Foil Heritage Portrait',
    badge: 'BUY 1 @ ₹3,200',
    price: '₹3,200',
    unit: 'Wood & Glass Frame',
    category: 'Framed Prints',
    image: '/images/wedding/wedding1.jpg',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Slider */}
        <Hero />

        {/* Explore Categories & Indian Festivals Slider */}
        <ExploreCategories />

        {/* Vistaprint Product Carousel 1: Festive & Wedding Packages */}
        <ProductCarousel
          sectionTitle="Popular Festive & Wedding Packages"
          sectionSubtitle="Best-selling Indian festive shoots, royal wedding photography & pre-wedding sessions"
          items={popularPackages}
        />

        {/* Vistaprint Product Carousel 2: Trending Services & Cinema */}
        <ProductCarousel
          sectionTitle="Trending Services & Cinema Films"
          sectionSubtitle="Explore 4K cinematography, heritage light shoots, drone flights & same-day edits"
          items={trendingServices}
        />

        {/* Vistaprint Side-by-Side Split Banners */}
        <PromoBanner />

        {/* Vistaprint Product Carousel 3: Festive Cards, Albums & Prints */}
        <ProductCarousel
          sectionTitle="Festive Invitation Cards, Luxury Albums & Prints"
          sectionSubtitle="Custom printed Shaadi cards, Diwali greeting prints, velvet photo albums & canvas art"
          items={photoKeepsakes}
        />

        {/* Portfolio Gallery */}
        <PortfolioCategories />

        {/* Client Stories */}
        <FeaturedStories />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Packages */}
        <Packages />

        {/* Testimonials */}
        <Testimonials />

        {/* Vistaprint Newsletter Subscription Banner */}
        <NewsletterBanner />

        {/* Vistaprint Brand Narrative & Value Propositions */}
        <BrandValueProps />
      </main>
      <Footer />
    </>
  );
}
