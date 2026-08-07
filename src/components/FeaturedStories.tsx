'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const stories = [
  {
    title: '🪔 Diwali Deepotsav Shoot',
    type: 'Festive Family Story',
    location: 'Freeganj, Ujjain',
    image: 'https://images.unsplash.com/photo-1605886106691-d576a1656fce?w=700&q=80',
    quote: 'Ayushman Studio captured our family Diwali puja with such warmth and divine radiance.',
  },
  {
    title: 'Aarav & Meera',
    type: 'Destination Wedding',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=80',
    quote: 'They captured every emotion we didn\'t even know we felt on our special day.',
  },
  {
    title: '🎨 Vibrant Holi Celebration',
    type: 'Cultural Festival Shoot',
    location: 'Mathura & Ujjain',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=700&q=80',
    quote: 'The colors in our photographs look so authentic and alive. Unforgettable work!',
  },
  {
    title: 'Rohan & Priya',
    type: 'Traditional Wedding',
    location: 'Ujjain, Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
    quote: 'The most beautiful wedding photos we\'ve ever seen. Pure magic.',
  },
];

export default function FeaturedStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div>
            <p className="text-eyebrow" style={{ marginBottom: '0.5rem', color: '#D40000' }}>Festive & Wedding Stories</p>
            <h2 className="text-h1">Client Stories & Celebrations</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => scrollBy('left')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-medium)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D40000'; e.currentTarget.style.color = '#D40000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={() => scrollBy('right')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid var(--border-medium)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D40000'; e.currentTarget.style.color = '#D40000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '0.5rem',
          }}
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.title}
              ref={i === 0 ? ref : undefined}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-elevated"
              style={{
                minWidth: 'clamp(300px, 35vw, 380px)',
                scrollSnapAlign: 'start',
                flexShrink: 0,
              }}
            >
              <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${story.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                  className="story-img"
                />
              </div>
              <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {story.title}
                    </h3>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D40000', fontWeight: 700, marginTop: '0.125rem' }}>
                      {story.type}
                    </p>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {story.location}
                  </span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  &ldquo;{story.quote}&rdquo;
                </p>
                <Link
                  href="/stories"
                  style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: '#D40000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Read Story
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .card-elevated:hover .story-img { transform: scale(1.05); }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
