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
    id: 'fest-1',
    title: '🪔 Royal Diwali & Festive Family Shoot',
    badge: 'BOOK NOW @ ₹15,000',
    price: '₹15,000',
    unit: 'Festive Special',
    category: 'Festivals',
    image: 'https://images.unsplash.com/photo-1605886106691-d576a1656fce?w=500&q=80',
  },
  {
    id: 'pop-1',
    title: 'Standard Royal Indian Wedding Package',
    badge: 'BOOK NOW @ ₹45,000',
    price: '₹45,000',
    unit: 'Full Day Coverage',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80',
  },
  {
    id: 'fest-2',
    title: '🎨 Vibrant Holi Color Festival Shoot',
    badge: 'BOOK 1 @ ₹18,000',
    price: '₹18,000',
    unit: 'Outdoor Session',
    category: 'Holi Fest',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&q=80',
  },
  {
    id: 'pop-2',
    title: 'Royal Rajasthan Destination Wedding',
    badge: 'BOOK NOW @ ₹1,20,000',
    price: '₹1,20,000',
    unit: '2-Day Coverage',
    category: 'Destination',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
  },
  {
    id: 'fest-3',
    title: '💃 Navratri Garba & Dandiya Event Coverage',
    badge: 'BOOK NOW @ ₹22,000',
    price: '₹22,000',
    unit: 'Night Coverage',
    category: 'Navratri',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500&q=80',
  },
  {
    id: 'pop-3',
    title: 'Pre-Wedding Couple Shoot in Heritage Site',
    badge: 'BOOK 1 @ ₹25,000',
    price: '₹25,000',
    unit: '1 Shoot Session',
    category: 'Pre-Wedding',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&q=80',
  },
];

// 2. Trending Services & Cinema Films (Vistaprint Carousel 2)
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
    title: '🌺 Ganesh Utsav & Cultural Celebration Coverage',
    badge: 'FESTIVE @ ₹16,000',
    price: '₹16,000',
    unit: 'Festival Event',
    category: 'Ganesh Utsav',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&q=80',
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
    title: 'Same-Day Edit Video Reel Delivery',
    badge: 'SAME DAY @ ₹15,000',
    price: '₹15,000',
    unit: 'Insta Reel / Teaser',
    category: 'Fast Edit',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80',
  },
  {
    id: 'trend-5',
    title: 'Corporate Conference & Gala Evening',
    badge: 'EVENT @ ₹28,000',
    price: '₹28,000',
    unit: 'Full Day Event',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
  },
];

// 3. Indian Festive Greeting Cards, Albums & Prints (Vistaprint Carousel 3)
const photoKeepsakes: ProductItem[] = [
  {
    id: 'card-1',
    title: '✉️ Luxury Indian Wedding & Festive Invitation Cards',
    badge: 'BUY 100 @ ₹4,500',
    price: '₹4,500',
    unit: '100 Custom Cards',
    category: 'Cards n Graphics',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
  },
  {
    id: 'album-1',
    title: 'Handcrafted Flush Mount Royal Velvet Album',
    badge: 'BUY 1 @ ₹7,500',
    price: '₹7,500',
    unit: '40 Silk Pages',
    category: 'Albums',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
  },
  {
    id: 'album-2',
    title: '🪔 Festive Family Canvas Wall Print',
    badge: 'BUY 1 @ ₹2,500',
    price: '₹2,500',
    unit: '20×30 Inch Print',
    category: 'Canvas Prints',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80',
  },
  {
    id: 'album-3',
    title: 'Custom Framed Gold Foil Heritage Portrait',
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
          sectionSubtitle="Explore 4K cinematography, Ganesh Utsav coverage, drone flights & same-day edits"
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
