'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const testimonials = [
  {
    name: 'Sneha & Rahul Sharma',
    event: 'Royal Wedding Cards',
    location: 'Ujjain',
    rating: 5,
    text: 'Ayushman Cards & Graphics printed our velvet box wedding invitations with gold foil stamping. The quality was so exquisite that every guest complimented our cards!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Priya Verma',
    event: 'Visiting Cards & Letterheads',
    location: 'Indore',
    rating: 5,
    text: 'Ordered 350 GSM Velvet Touch gold foil visiting cards for our brand. The 3D spot UV finish and color sharpness were outstanding. Delivered right on schedule!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Aditya & Kavya Patel',
    event: 'Flex Banners & Standees',
    location: 'Ujjain',
    rating: 5,
    text: 'We needed same-day Star Flex outdoor banners and roll-up standees for our store launch. Ayushman Printing Press handled everything seamlessly from design to print.',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&q=80',
  },
  {
    name: 'Meera Joshi',
    event: 'HD Wedding Photobook Album',
    location: 'Bhopal',
    rating: 5,
    text: 'The flush mount non-tearable silk sheet wedding album they printed is a masterpiece. The acrylic glass cover box is super luxurious.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A86C" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="4.9 out of 5 stars from over 200+ reviews. Your trust is our greatest achievement."
        />

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#C9A86C" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>4.9</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>from 200+ reviews</span>
        </motion.div>

        {/* Testimonial Cards */}
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="card-elevated"
              style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', textAlign: 'center' }}
            >
              <Stars count={testimonials[active].rating} />

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7,
                  margin: '1.5rem 0',
                }}
              >
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <img
                  src={testimonials[active].avatar}
                  alt={testimonials[active].name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-muted)' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {testimonials[active].name}
                  </div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {testimonials[active].event} · {testimonials[active].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === active ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? 'var(--gold)' : 'var(--border-medium)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
