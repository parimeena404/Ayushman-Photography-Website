'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ExploreCategories from '@/components/ExploreCategories';
import ProductCarousel, { ProductItem } from '@/components/ProductCarousel';
import PromoBanner from '@/components/PromoBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import NewsletterBanner from '@/components/NewsletterBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Shop by Shapes — Visiting Card variants
const cardShapes: ProductItem[] = [
  {
    id: 'shape-1',
    title: 'Standard Visiting Cards',
    badge: 'BUY 100 @ Rs.200',
    price: '₹200.00',
    unit: '₹2.00 each / 100 units',
    category: 'Standard Cards',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 1658,
    bgGradient: '#FAF0E6',
  },
  {
    id: 'shape-2',
    title: 'Classic Visiting Cards',
    badge: 'BUY 100 @ Rs.230',
    price: '₹230.00',
    unit: '₹2.30 each / 100 units',
    category: 'Classic Cards',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 230,
    bgGradient: '#FDF2F2',
  },
  {
    id: 'shape-3',
    title: 'Rounded Corner Visiting Cards',
    badge: 'BUY 100 @ Rs.250',
    price: '₹250.00',
    unit: '₹2.50 each / 100 units',
    category: 'Rounded Cards',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 520,
    bgGradient: '#F5F2ED',
  },
  {
    id: 'shape-4',
    title: 'Square Visiting Cards',
    badge: 'BUY 100 @ Rs.250',
    price: '₹250.00',
    unit: '₹2.50 each / 100 units',
    category: 'Square Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 69,
    bgGradient: '#F0F7F2',
  },
  {
    id: 'shape-5',
    title: 'Leaf Visiting Cards',
    badge: 'BUY 100 @ Rs.270',
    price: '₹270.00',
    unit: '₹2.70 each / 100 units',
    category: 'Leaf Cards',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 53,
    bgGradient: '#F4F0F9',
  },
  {
    id: 'shape-6',
    title: 'Oval Visiting Cards',
    badge: 'BUY 100 @ Rs.270',
    price: '₹270.00',
    unit: '₹2.70 each / 100 units',
    category: 'Oval Cards',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 16,
    bgGradient: '#F9EBE6',
  },
];

// Shop by Paper & Texture
const cardTextures: ProductItem[] = [
  {
    id: 'tex-1',
    title: 'Matte Finish Visiting Cards',
    badge: 'BUY 100 @ Rs.220',
    price: '₹220.00',
    unit: '₹2.20 each / 100 units',
    category: 'Matte Cards',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviews: 420,
    bgGradient: '#FAF0E6',
  },
  {
    id: 'tex-2',
    title: 'Glossy Laminated Cards',
    badge: 'BUY 100 @ Rs.250',
    price: '₹250.00',
    unit: '₹2.50 each / 100 units',
    category: 'Glossy Cards',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviews: 312,
    bgGradient: '#FDF2F2',
  },
  {
    id: 'tex-3',
    title: 'Velvet Touch Cards (350 GSM)',
    badge: 'BUY 100 @ Rs.380',
    price: '₹380.00',
    unit: '₹3.80 each / 100 units',
    category: 'Velvet Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 185,
    bgGradient: '#F4F0F9',
  },
  {
    id: 'tex-4',
    title: 'Spot UV Coating Cards',
    badge: 'BUY 100 @ Rs.580',
    price: '₹580.00',
    unit: '₹5.80 each / 100 units',
    category: 'Spot UV Cards',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 89,
    bgGradient: '#2D3748',
  },
  {
    id: 'tex-5',
    title: 'Gold Foil Stamping Cards',
    badge: 'BUY 100 @ Rs.750',
    price: '₹750.00',
    unit: '₹7.50 each / 100 units',
    category: 'Gold Foil Cards',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 245,
    bgGradient: '#FFFDF0',
  },
  {
    id: 'tex-6',
    title: 'Transparent Acrylic Cards',
    badge: 'BUY 100 @ Rs.2,200',
    price: '₹2,200.00',
    unit: '₹22.00 each / 100 units',
    category: 'Acrylic Cards',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 67,
    bgGradient: '#EBF5FA',
  },
];

// Wedding & Ceremony Invitations
const weddingCards: ProductItem[] = [
  {
    id: 'wed-1',
    title: 'Royal Velvet & Gold Foil Laser Cut Wedding Box',
    badge: '100 PCS @ ₹4,500',
    price: '₹4,500',
    unit: '₹45.00 each / 100 units',
    category: 'Wedding Box Cards',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews: 890,
    bgGradient: '#FDF2F2',
  },
  {
    id: 'wed-2',
    title: 'Premium Acrylic Invitation with Wax Seal',
    badge: '100 PCS @ ₹6,500',
    price: '₹6,500',
    unit: '₹65.00 each / 100 units',
    category: 'Acrylic Invitations',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 156,
    bgGradient: '#EBF5FA',
  },
  {
    id: 'wed-3',
    title: 'Royal Farman Scroll Invitation with Metallic Case',
    badge: '100 PCS @ ₹5,200',
    price: '₹5,200',
    unit: '₹52.00 each / 100 units',
    category: 'Scroll Invitations',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviews: 203,
    bgGradient: '#FFFDF0',
  },
  {
    id: 'wed-4',
    title: 'Traditional Ganesh Floral Wedding Set',
    badge: '200 PCS @ ₹3,800',
    price: '₹3,800',
    unit: '₹19.00 each / 200 units',
    category: 'Traditional Cards',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviews: 345,
    bgGradient: '#F4F0F9',
  },
  {
    id: 'wed-5',
    title: '"The Shaadi Times" Custom Newspaper Card',
    badge: '100 PCS @ ₹3,200',
    price: '₹3,200',
    unit: '₹32.00 each / 100 units',
    category: 'Newspaper Invitations',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 128,
    bgGradient: '#F5F2ED',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Vistaprint Split Hero Banners */}
        <Hero />

        {/* 2. Trust Value Bar */}
        <TrustBar />

        {/* 3. Best Sellers & Trending */}
        <ExploreCategories />

        {/* 4. Shop by Shapes */}
        <ProductCarousel
          id="shapes"
          sectionTitle="Shop by shapes"
          sectionSubtitle="Select from various shapes & sizes."
          items={cardShapes}
        />

        {/* 5. Featured Promo Banner */}
        <PromoBanner />

        {/* 6. Shop by Papers & Textures */}
        <ProductCarousel
          sectionTitle="Shop by papers & textures"
          sectionSubtitle="Choose premium finishes for your cards."
          items={cardTextures}
        />

        {/* 7. Wedding Invitations Collection */}
        <ProductCarousel
          id="wedding"
          sectionTitle="Wedding & Ceremony Invitation Cards"
          sectionSubtitle="Handcrafted luxury invitations for your special day."
          items={weddingCards}
        />

        {/* 8. Why Choose Us */}
        <WhyChooseUs />

        {/* 9. Customer Reviews */}
        <Testimonials />

        {/* 10. Newsletter Signup */}
        <NewsletterBanner />

        {/* 11. Contact & Location */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
