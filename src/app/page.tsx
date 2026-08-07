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

// 1. Most Popular Photography Packages (Vistaprint Carousel 1)
const popularPackages: ProductItem[] = [
  {
    id: 'pop-1',
    title: 'Standard Wedding Photography Package',
    badge: 'BOOK NOW @ ₹45,000',
    price: '₹45,000',
    unit: 'Full Day Coverage',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80',
  },
  {
    id: 'pop-2',
    title: 'Royal Destination Wedding Package',
    badge: 'BOOK NOW @ ₹1,20,000',
    price: '₹1,20,000',
    unit: '2-Day Coverage',
    category: 'Destination',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
  },
  {
    id: 'pop-3',
    title: 'Pre-Wedding Couple Shoot in Outdoor Location',
    badge: 'BOOK 1 @ ₹25,000',
    price: '₹25,000',
    unit: '1 Shoot Session',
    category: 'Pre-Wedding',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&q=80',
  },
  {
    id: 'pop-4',
    title: 'Studio Creative Portrait Photography',
    badge: 'BOOK 1 @ ₹12,000',
    price: '₹12,000',
    unit: '2 Hour Session',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80',
  },
  {
    id: 'pop-5',
    title: 'Fashion & Lookbook Campaign Shoot',
    badge: 'BOOK 1 @ ₹35,000',
    price: '₹35,000',
    unit: 'Full Lookbook',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
  },
  {
    id: 'pop-6',
    title: 'Commercial Brand Product Shoot',
    badge: 'BOOK 1 @ ₹20,000',
    price: '₹20,000',
    unit: '20 Products',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=500&q=80',
  },
];

// 2. Trending Photography Services (Vistaprint Carousel 2)
const trendingServices: ProductItem[] = [
  {
    id: 'trend-1',
    title: '4K Cinematic Wedding Film Teaser & Highlights',
    badge: 'FILM @ ₹35,000',
    price: '₹35,000',
    unit: '5 Min Highlight',
    category: 'Cinematography',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80',
  },
  {
    id: 'trend-2',
    title: '4K Aerial Drone Event Photography Flight',
    badge: 'FLIGHT @ ₹18,000',
    price: '₹18,000',
    unit: 'Half-Day Drone',
    category: 'Drone Photography',
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=500&q=80',
  },
  {
    id: 'trend-3',
    title: 'Same-Day Edit Video Reel Delivery',
    badge: 'SAME DAY @ ₹15,000',
    price: '₹15,000',
    unit: 'Insta Reel / Teaser',
    category: 'Fast Edit',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80',
  },
  {
    id: 'trend-4',
    title: 'Corporate Conference & Gala Coverage',
    badge: 'EVENT @ ₹28,000',
    price: '₹28,000',
    unit: 'Full Day Event',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
  },
  {
    id: 'trend-5',
    title: 'Destination Travel & Landscape Session',
    badge: 'DESTINATION @ ₹40,000',
    price: '₹40,000',
    unit: 'Per Location',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&q=80',
  },
];

// 3. Photo Albums & Keepsakes (Vistaprint Carousel 3)
const photoKeepsakes: ProductItem[] = [
  {
    id: 'album-1',
    title: 'Handcrafted Flush Mount Luxury Wedding Album',
    badge: 'BUY 1 @ ₹7,500',
    price: '₹7,500',
    unit: '40 Silk Pages',
    category: 'Albums',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
  },
  {
    id: 'album-2',
    title: 'Gallery Wrapped Cotton Canvas Wall Print',
    badge: 'BUY 1 @ ₹2,500',
    price: '₹2,500',
    unit: '20×30 Inch Print',
    category: 'Canvas Prints',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80',
  },
  {
    id: 'album-3',
    title: 'Custom Framed Studio Portrait Print',
    badge: 'BUY 1 @ ₹3,200',
    price: '₹3,200',
    unit: 'Wood & Glass Frame',
    category: 'Framed Prints',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&q=80',
  },
  {
    id: 'album-4',
    title: 'Hardcover Lay-Flat Coffee Table Photo Book',
    badge: 'BUY 1 @ ₹5,000',
    price: '₹5,000',
    unit: '30 Premium Pages',
    category: 'Photo Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80',
  },
  {
    id: 'album-5',
    title: 'Archival Hahnemühle Fine Art Print',
    badge: 'BUY 1 @ ₹1,800',
    price: '₹1,800',
    unit: 'A3 Museum Grade',
    category: 'Fine Art Prints',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Slider */}
        <Hero />

        {/* Vistaprint 1:1 Explore All Categories Circle Slider */}
        <ExploreCategories />

        {/* Vistaprint 1:1 Product Carousel 1: Most Popular Packages */}
        <ProductCarousel
          sectionTitle="Our Most Popular Photography Packages"
          sectionSubtitle="Best-selling wedding, pre-wedding, and portrait photography sessions"
          items={popularPackages}
        />

        {/* Vistaprint 1:1 Product Carousel 2: Trending Services */}
        <ProductCarousel
          sectionTitle="Trending Services & Cinema Flights"
          sectionSubtitle="Explore high-demand cinematography, drone flights, and same-day video highlights"
          items={trendingServices}
        />

        {/* Vistaprint 1:1 Side-by-Side Split Banners */}
        <PromoBanner />

        {/* Vistaprint 1:1 Product Carousel 3: Albums & Keepsakes */}
        <ProductCarousel
          sectionTitle="Handcrafted Albums, Frames & Wall Art"
          sectionSubtitle="Transform your digital captures into physical museum-grade heirlooms"
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

        {/* Vistaprint 1:1 Newsletter Subscription Banner */}
        <NewsletterBanner />

        {/* Vistaprint 1:1 Brand Narrative & Value Propositions */}
        <BrandValueProps />
      </main>
      <Footer />
    </>
  );
}
