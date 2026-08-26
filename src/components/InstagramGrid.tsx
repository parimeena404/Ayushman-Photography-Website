'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const images = [
  { src: '/images/wedding/wedding1.jpg', alt: 'Royal Indian Wedding Cards' },
  { src: '/images/festivals/diwali-deepotsav.jpg', alt: 'Festive Print Designs' },
  { src: '/images/wedding/wedding2.png', alt: 'Palace Wedding Collection' },
  { src: '/images/portrait/portrait1.png', alt: 'Portrait Print Finishing' },
  { src: '/images/festivals/palace-dance.jpg', alt: 'Heritage Print Showcase' },
  { src: '/images/wedding/wedding3.jpg', alt: 'Traditional Invitation Suite' },
  { src: '/images/portrait/portrait2.png', alt: 'Bespoke Stationery' },
  { src: '/images/festivals/lohri-bonfire.jpg', alt: 'Festival Celebration Cards' },
  { src: '/images/wedding/wedding4.jpg', alt: 'Mandap Foil Invitation' },
];

export default function InstagramGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      className="section-padding"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Section heading */}
        <motion.div
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            Follow Along
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 300,
              marginBottom: '0.75rem',
            }}
          >
            @lumiere.studio
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div variants={fadeInUp} className="masonry-grid">
          {images.map((img, i) => (
            <InstaCard key={i} image={img} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function InstaCard({ image, index }: { image: { src: string; alt: string }; index: number }) {
  const [hovered, setHovered] = useState(false);

  // Vary heights for masonry effect
  const heights = ['280px', '350px', '240px', '320px', '300px', '260px', '380px', '290px', '340px'];

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        height: heights[index % heights.length],
      }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 35, 27, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Instagram icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F8F5EF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="#F8F5EF" stroke="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
