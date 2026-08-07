'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const categories = ['All', 'Wedding', 'Portrait', 'Fashion', 'Commercial', 'Events', 'Travel'];

const portfolioItems = [
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', category: 'Wedding', title: 'Royal Rajasthani Wedding', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', category: 'Portrait', title: 'Studio Portrait', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', category: 'Fashion', title: 'Haute Couture Editorial', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', category: 'Wedding', title: 'Sunset Ceremony', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80', category: 'Commercial', title: 'Brand Campaign', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80', category: 'Travel', title: 'Golden Hour Vista', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', category: 'Portrait', title: 'Creative Headshot', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', category: 'Wedding', title: 'Intimate Vows', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', category: 'Events', title: 'Grand Gala Evening', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80', category: 'Wedding', title: 'Pre-Wedding Romance', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', category: 'Commercial', title: 'Product Showcase', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=600&q=80', category: 'Travel', title: 'Aerial Perspective', aspect: 'wide' },
];

export default function PortfolioCategories() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="Our Work"
          title="Portfolio Showcase"
          subtitle="A curated collection of our finest work across diverse genres and styles."
        />

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: filter === cat ? 700 : 500,
                color: filter === cat ? 'var(--text-on-gold)' : 'var(--text-secondary)',
                background: filter === cat ? 'var(--gold)' : 'transparent',
                border: filter === cat ? '1.5px solid var(--gold)' : '1.5px solid var(--border-medium)',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div ref={ref} className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                style={{ cursor: 'pointer' }}
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      display: 'block',
                      aspectRatio: item.aspect === 'tall' ? '3/4' : item.aspect === 'wide' ? '4/3' : '1/1',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '1rem',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                  >
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <button className="btn btn-outline btn-md">
            View Full Portfolio
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'pointer',
            }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={filteredItems[lightboxIndex]?.src.replace('w=600', 'w=1200')}
              alt={filteredItems[lightboxIndex]?.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              ✕
            </button>
            {/* Nav Arrows */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', cursor: 'pointer', border: 'none' }}
              >
                ‹
              </button>
            )}
            {lightboxIndex < filteredItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', cursor: 'pointer', border: 'none' }}
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
