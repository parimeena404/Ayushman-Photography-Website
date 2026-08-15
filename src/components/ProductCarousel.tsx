'use client';

import { useRef } from 'react';
import Link from 'next/link';

export interface ProductItem {
  id: string;
  title: string;
  badge?: string;
  price: string;
  unit?: string;
  category?: string;
  image: string;
  rating?: number;
  reviews?: number;
  bgGradient?: string;
}

interface ProductCarouselProps {
  id?: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  items: ProductItem[];
}

const defaultGradients = [
  'linear-gradient(135deg, #FBF4E8 0%, #F5E6D0 100%)', // Amber / Soft Gold
  'linear-gradient(135deg, #FDF0F0 0%, #F8DCDC 100%)', // Coral Blush
  'linear-gradient(135deg, #F4EFEA 0%, #E8E0D7 100%)', // Sand Linen
  'linear-gradient(135deg, #EBF5EE 0%, #D8EADF 100%)', // Sage Mint
  'linear-gradient(135deg, #F3EEF9 0%, #E5DAF2 100%)', // Lilac Lavender
  'linear-gradient(135deg, #F9EBE6 0%, #F2D5CB 100%)', // Terracotta Clay
];

export default function ProductCarousel({ id, sectionTitle, sectionSubtitle, items }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      style={{
        background: '#FFFFFF',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)',
        borderTop: '1px solid #F3F4F6',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1E1E1E',
              marginBottom: '0.25rem',
            }}
          >
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: '#6B7280',
              }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* Product scroll area */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-8px',
              top: '40%',
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
            {items.map((item, idx) => {
              const cardBg = item.bgGradient || defaultGradients[idx % defaultGradients.length];
              return (
                <Link
                  key={item.id}
                  href={`/booking?pkg=${item.category?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'wedding-cards'}`}
                  style={{
                    flex: '0 0 220px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      background: cardBg,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.06)',
                      padding: '8px',
                      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
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
                    {/* Badge */}
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

                    {/* Heart */}
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

                    {/* Image */}
                    <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', borderRadius: '6px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  {/* Title + Price */}
                  <div style={{ padding: '0.5rem 0.25rem' }}>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#1E1E1E',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </div>
                    {item.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.3rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < Math.floor(item.rating!) ? '#F59E0B' : '#D1D5DB', fontSize: '0.75rem' }}>★</span>
                        ))}
                        <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                          {item.rating} ({item.reviews?.toLocaleString()})
                        </span>
                      </div>
                    )}
                    <div style={{ marginTop: '0.25rem' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#1E1E1E' }}>
                        From {item.price}
                      </span>
                    </div>
                    {item.unit && (
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.725rem', color: '#6B7280' }}>
                        {item.unit}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
