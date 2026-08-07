'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const categories = ['All', 'Indian Festivals', 'Wedding', 'Portrait', 'Fashion', 'Commercial', 'Travel'];

const portfolioItems = [
  { src: '/images/wedding/wedding5.jpg', category: 'Wedding', title: '👰 Royal Varmala Rose Petal Canopy', aspect: 'tall' },
  { src: '/images/wedding/wedding1.jpg', category: 'Wedding', title: '✨ Ornate Jali Window Sunset Silhouette', aspect: 'tall' },
  { src: '/images/wedding/wedding3.jpg', category: 'Wedding', title: '💍 Heritage Ivy Palace Pre-Wedding', aspect: 'tall' },
  { src: '/images/wedding/wedding4.jpg', category: 'Wedding', title: '🏰 Palace Night Courtyard Royal Walk', aspect: 'tall' },
  { src: '/images/wedding/wedding2.png', category: 'Wedding', title: '🌅 Sunset Jharokha Archway Silhouette', aspect: 'square' },
  { src: '/images/wedding/wedding6.png', category: 'Wedding', title: '🤝 Gathbandhan Sacred Vows Ritual', aspect: 'square' },
  { src: '/images/festivals/diwali-deepotsav.jpg', category: 'Indian Festivals', title: '🪔 Diwali Deepotsav & Family Rangoli', aspect: 'tall' },
  { src: '/images/festivals/makar-sankranti.png', category: 'Indian Festivals', title: '🪁 Makar Sankranti Kite Festival & Sweets', aspect: 'wide' },
  { src: '/images/festivals/lohri-bonfire.jpg', category: 'Indian Festivals', title: '🔥 Lohri Bonfire & Punjabi Folk Dance', aspect: 'tall' },
  { src: '/images/festivals/palace-dance.jpg', category: 'Indian Festivals', title: '💃 Royal Palace Garba Dance Showcase', aspect: 'wide' },
  { src: '/images/festivals/stained-glass.jpg', category: 'Indian Festivals', title: '✨ Heritage Palace Stained Glass Light', aspect: 'tall' },
  { src: '/images/festivals/rainbow-sails.png', category: 'Travel', title: '⛵ Sunset Voyage Rainbow Sails', aspect: 'wide' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', category: 'Portrait', title: 'Studio Ethnic Portrait', aspect: 'square' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', category: 'Fashion', title: 'Haute Couture Lookbook', aspect: 'tall' },
  { src: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80', category: 'Commercial', title: 'Brand Product Campaign', aspect: 'square' },
];

export default function PortfolioCategories() {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && categories.includes(customEvent.detail)) {
        setFilter(customEvent.detail);
      }
    };

    window.addEventListener('changePortfolioFilter', handleFilterEvent);
    return () => {
      window.removeEventListener('changePortfolioFilter', handleFilterEvent);
    };
  }, []);

  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="Indian Weddings & Fine Art Gallery"
          title="Portfolio Showcase"
          subtitle="Explore our fine art photography capturing royal Indian weddings, Varmala petal showers, pre-wedding silhouettes, Diwali Deepotsav, and cultural heritage shoots."
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
                color: filter === cat ? '#FFFFFF' : 'var(--text-secondary)',
                background: filter === cat ? '#D40000' : 'transparent',
                border: filter === cat ? '1.5px solid #D40000' : '1.5px solid var(--border-medium)',
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
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '1.25rem',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                  >
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
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
            View Full Gallery
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
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
              src={filteredItems[lightboxIndex]?.src}
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
                background: 'rgba(255,255,255,0.15)',
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
                style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', cursor: 'pointer', border: 'none' }}
              >
                ‹
              </button>
            )}
            {lightboxIndex < filteredItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', cursor: 'pointer', border: 'none' }}
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
