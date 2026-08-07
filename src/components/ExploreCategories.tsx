'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const circleCategories = [
  { name: '🪔 Diwali & Deepotsav', image: 'https://images.unsplash.com/photo-1605886106691-d576a1656fce?w=300&q=80', badge: 'Festive Special' },
  { name: '🎨 Holi Color Fest', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=300&q=80', badge: 'Vibrant' },
  { name: '💃 Navratri & Garba', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=300&q=80', badge: 'Celebration' },
  { name: '🌺 Ganesh Utsav', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=300&q=80' },
  { name: '👸 Royal Weddings', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=80', badge: 'Popular' },
  { name: '💍 Pre-Wedding Shoots', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=300&q=80' },
  { name: '🎬 4K Cinematography', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&q=80', badge: '4K Film' },
  { name: '📷 Studio Portraits', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80' },
  { name: '✉️ Festive Cards', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80', badge: 'Printing' },
  { name: '🖼️ Canvas Prints', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80' },
];

export default function ExploreCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="festivals" style={{ background: 'var(--bg-card)', padding: 'clamp(2rem, 4vh, 3rem) 0', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Explore Categories & Indian Festivals
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              Discover our Indian festive celebration photography, wedding shoots & luxury printing services
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Circular Icons Slider */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '0.5rem',
          }}
        >
          {circleCategories.map((item, i) => (
            <motion.div
              key={item.name}
              ref={i === 0 ? ref : undefined}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                flexShrink: 0,
                textAlign: 'center',
                scrollSnapAlign: 'start',
                width: '115px',
              }}
            >
              <Link href="/#portfolio" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', width: '92px', height: '92px', margin: '0 auto 0.75rem' }}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '2.5px solid var(--border-light)',
                      boxShadow: 'var(--shadow-subtle)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                    }}
                    className="circle-img"
                  />
                  {item.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#D40000',
                        color: '#FFFFFF',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '0.12rem 0.45rem',
                        borderRadius: '999px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78125rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .circle-img:hover { transform: scale(1.08); border-color: #D40000 !important; }
      `}</style>
    </section>
  );
}
