'use client';

import { useRef } from 'react';
import Link from 'next/link';

interface CategoryProduct {
  name: string;
  image: string;
  badge?: string;
  price?: string;
  unit?: string;
  rating?: number;
  reviews?: number;
  bgGradient: string;
  href: string;
}

const bestSellers: CategoryProduct[] = [
  {
    name: 'Standard Visiting Cards',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
    badge: 'BUY 100 @ Rs.200',
    price: '₹200.00',
    unit: '₹2.00 each / 100 units',
    rating: 4.5,
    reviews: 1658,
    bgGradient: 'linear-gradient(135deg, #FBF4E8 0%, #F5E6D0 100%)', // Pastel Gold / Amber
    href: '/booking?pkg=wedding-cards',
  },
  {
    name: 'Rounded Corner Cards',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&q=80',
    badge: 'BUY 100 @ Rs.250',
    price: '₹250.00',
    unit: '₹2.50 each / 100 units',
    rating: 4.5,
    reviews: 520,
    bgGradient: 'linear-gradient(135deg, #F4EFEA 0%, #E8E0D7 100%)', // Soft Linen Sand
    href: '/booking?pkg=wedding-cards',
  },
  {
    name: 'Letterheads',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&q=80',
    badge: 'BUY 100 @ Rs.350',
    price: '₹350.00',
    unit: '₹3.50 each / 100 units',
    rating: 4.3,
    reviews: 284,
    bgGradient: 'linear-gradient(135deg, #EBF5EE 0%, #D8EADF 100%)', // Fresh Sage Mint
    href: '/booking?pkg=wedding-cards',
  },
  {
    name: 'Photo Albums',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    badge: 'BUY 1 @ Rs.1,050',
    price: '₹1,050.00',
    unit: 'Starting price',
    rating: 4.7,
    reviews: 162,
    bgGradient: 'linear-gradient(135deg, #F3EEF9 0%, #E5DAF2 100%)', // Soft Lilac / Lavender
    href: '/booking?pkg=sangeet-haldi',
  },
  {
    name: 'Stickers & Labels',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    badge: 'BUY 100 @ Rs.180',
    price: '₹180.00',
    unit: '₹1.80 each / 100 units',
    rating: 4.4,
    reviews: 340,
    bgGradient: 'linear-gradient(135deg, #E6F4F8 0%, #CDE7F0 100%)', // Ice Blue
    href: '/booking?pkg=flex-banners',
  },
  {
    name: 'Wedding Invitation Cards',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
    badge: 'BUY 100 @ Rs.2,500',
    price: '₹2,500.00',
    unit: '₹25.00 each / 100 units',
    rating: 4.8,
    reviews: 890,
    bgGradient: 'linear-gradient(135deg, #FBEAEA 0%, #F5D3D3 100%)', // Royal Rose Velvet
    href: '/booking?pkg=royal-wedding',
  },
];

const trending: CategoryProduct[] = [
  {
    name: 'Classic Visiting Cards',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    badge: 'BUY 100 @ Rs.230',
    price: '₹230.00',
    unit: '₹2.30 each / 100 units',
    bgGradient: 'linear-gradient(135deg, #FDF0F0 0%, #F8DCDC 100%)', // Coral Blush
    href: '/booking?pkg=wedding-cards',
  },
  {
    name: 'Spot UV Visiting Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
    badge: 'BUY 100 @ Rs.580',
    price: '₹580.00',
    unit: '₹5.80 each / 100 units',
    bgGradient: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)', // Dark Slate Matte
    href: '/booking?pkg=wedding-cards',
  },
  {
    name: 'Flex Banners',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=400&q=80',
    badge: 'START @ Rs.18/sq ft',
    price: '₹18.00',
    unit: 'Per sq. ft.',
    bgGradient: 'linear-gradient(135deg, #FFFDF0 0%, #FAF0C8 100%)', // Warm Cream Gold
    href: '/booking?pkg=flex-banners',
  },
  {
    name: 'Roll-up Standees',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    badge: 'BUY 1 @ Rs.860',
    price: '₹860.00',
    unit: 'Complete set',
    bgGradient: 'linear-gradient(135deg, #F9EBE6 0%, #F2D5CB 100%)', // Terracotta Clay
    href: '/booking?pkg=flex-banners',
  },
  {
    name: 'Custom Photo Mugs',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
    badge: 'BUY 1 @ Rs.205',
    price: '₹205.00',
    unit: 'Per piece',
    bgGradient: 'linear-gradient(135deg, #EBF5EE 0%, #D8EADF 100%)', // Mint Sage
    href: '/booking?pkg=sangeet-haldi',
  },
  {
    name: 'Gold Foil Wedding Cards',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    badge: 'BUY 100 @ Rs.4,500',
    price: '₹4,500.00',
    unit: '₹45.00 each / 100 units',
    bgGradient: 'linear-gradient(135deg, #FFFDF0 0%, #F6E6A7 100%)', // Gold Metallic Glow
    href: '/booking?pkg=royal-wedding',
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.35rem' }}>
      <div style={{ display: 'flex', gap: '1px' }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              color: i < fullStars ? '#F59E0B' : (i === fullStars && hasHalf ? '#F59E0B' : '#D1D5DB'),
              fontSize: '0.8rem',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  );
}

function ProductRow({ title, items }: { title: string; items: CategoryProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1E1E1E',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#1E1E1E',
          }}
          aria-label="Scroll right"
        >
          ›
        </button>

        {/* Products scroll container */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: '0.5rem',
          }}
        >
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                flex: '0 0 200px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  background: item.bgGradient,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  padding: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Price Badge */}
                {item.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 5,
                      background: '#B2E4F7',
                      color: '#0B2545',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    {item.badge}
                  </div>
                )}

                {/* Favourite heart */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 5,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>

                {/* Product Image Wrapper with rounded inner corners */}
                <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', borderRadius: '6px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: '0.5rem 0.25rem' }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#1E1E1E',
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </div>
                {item.rating && <StarRating rating={item.rating} reviews={item.reviews || 0} />}
                {item.price && (
                  <div style={{ marginTop: '0.35rem' }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        color: '#1E1E1E',
                      }}
                    >
                      From {item.price}
                    </span>
                  </div>
                )}
                {item.unit && (
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      color: '#6B7280',
                    }}
                  >
                    {item.unit}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExploreCategories() {
  return (
    <section
      id="products"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <ProductRow title="Best Sellers" items={bestSellers} />
        <ProductRow title="Trending" items={trending} />
      </div>
    </section>
  );
}
