'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const images = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80', alt: 'Wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80', alt: 'Bride portrait' },
  { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&q=80', alt: 'Golden hour couple' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80', alt: 'Destination wedding' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&q=80', alt: 'Pre-wedding shoot' },
  { src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=500&q=80', alt: 'Coastal love story' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80', alt: 'Engagement ring' },
  { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80', alt: 'Lifestyle moment' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80', alt: 'Portrait session' },
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
