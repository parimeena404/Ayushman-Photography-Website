'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const categories = ['All', 'Wedding Cards', 'Visiting Cards', 'Flex & Banners', 'Photobooks', 'Stationery', 'Packaging'];

const portfolioItems = [
  { src: '/images/wedding/scroll_royal_blue_velvet.png', category: 'Wedding Cards', title: '💍 Royal Velvet Box Wedding Invitation Card with Gold Foil', aspect: 'tall' },
  { src: '/images/wedding/acrylic_navy_gold.png', category: 'Wedding Cards', title: '✨ Clear Acrylic Glass Wedding Card with Wax Seal', aspect: 'tall' },
  { src: '/images/wedding/scroll_white_gold.png', category: 'Wedding Cards', title: '📜 Royal Farman Scroll Invitation in Metallic Tube Case', aspect: 'tall' },
  { src: '/images/keepsakes/card2.png', category: 'Wedding Cards', title: '🪔 Traditional Ganesh Floral Wedding Invitation Set', aspect: 'tall' },
  { src: '/images/keepsakes/card3.png', category: 'Wedding Cards', title: '📰 "The Shaadi Times" Custom Wedding Newspaper Card', aspect: 'tall' },
  { src: '/images/keepsakes/visiting_cards.jpg', category: 'Visiting Cards', title: '💼 350 GSM Velvet Touch Visiting Cards with Gold Foil', aspect: 'tall' },
  { src: '/images/keepsakes/visiting_cards.jpg', category: 'Visiting Cards', title: '✨ 3D Raised Spot UV & Matte Black Business Cards', aspect: 'tall' },
  { src: '/images/banners/outdoor_flex_banner.jpg', category: 'Flex & Banners', title: '🚩 Heavy Duty Star Flex Banner Outdoor Grand Opening', aspect: 'wide' },
  { src: '/images/banners/rollup_standee.jpg', category: 'Flex & Banners', title: '🎯 Promotional Roll-up Standee Display Frame', aspect: 'tall' },
  { src: '/images/keepsakes/film1.jpg', category: 'Photobooks', title: '📖 HD Flush Mount Wedding Photobook Album with Leatherette Box', aspect: 'tall' },
  { src: '/images/stationery/letterhead_bond.jpg', category: 'Stationery', title: '📄 130 GSM Gloss Art Paper Pamphlets & Marketing Flyers', aspect: 'tall' },
  { src: '/images/stationery/corporate_envelopes.jpg', category: 'Stationery', title: '📑 Executive Printed Letterheads & Brand Envelopes', aspect: 'tall' },
  { src: '/images/stationery/bill_book_carbonless.jpg', category: 'Stationery', title: '🧾 Duplicate Carbonless Bill Books & Receipt Books', aspect: 'tall' },
  { src: '/images/keepsakes/card4.png', category: 'Packaging', title: '🎁 Customized Ceramic Magic Photo Mugs & Gift Boxes', aspect: 'square' },
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
          eyebrow="Print Crafts & Gallery"
          title="Print & Card Portfolio Showcase"
          subtitle="Explore luxury gold foil wedding cards, clear acrylic invitations, velvet visiting cards, outdoor flex banners, and HD photobooks printed at our Ujjain press."
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
