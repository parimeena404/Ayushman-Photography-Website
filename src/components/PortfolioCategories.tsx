'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';

const categories = [
  {
    name: 'Wedding',
    description: 'Timeless celebrations captured with an editorial eye. Every vow, every glance, every stolen moment.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
  },
  {
    name: 'Pre-Wedding',
    description: 'The quiet anticipation before the grand day. Intimate portraits woven into breathtaking landscapes.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80',
  },
  {
    name: 'Destination',
    description: 'From sun-kissed Mediterranean coasts to misty Himalayan valleys. Love knows no borders.',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=900&q=80',
  },
  {
    name: 'Engagement',
    description: 'That magical "yes" moment and the joy that follows. Raw emotion, beautifully preserved.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=80',
  },
  {
    name: 'Portrait',
    description: 'Deeply personal, artistically refined. Portraits that reveal character and tell your story.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80',
  },
  {
    name: 'Lifestyle',
    description: 'Authentic moments in their natural flow. The beauty of everyday life elevated to art.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&q=80',
  },
  {
    name: 'Commercial',
    description: 'Premium brand imagery crafted with cinematic precision. Where commerce meets artistry.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
  },
];

export default function PortfolioCategories() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="portfolio"
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
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            Portfolio
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{ color: 'var(--text-primary)', fontWeight: 300 }}
          >
            Explore Our Work
          </h2>
        </motion.div>

        {/* Category Items — alternating layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {categories.map((cat, i) => (
            <CategoryItem key={cat.name} category={cat} index={i} reversed={i % 2 !== 0} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CategoryItem({
  category,
  index,
  reversed,
}: {
  category: typeof categories[0];
  index: number;
  reversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const imageVariant = reversed ? fadeInRight : fadeInLeft;
  const textVariant = reversed ? fadeInLeft : fadeInRight;

  return (
    <motion.div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'center',
        direction: reversed ? 'rtl' : 'ltr',
      }}
      className="portfolio-item"
    >
      {/* Image */}
      <motion.div
        variants={imageVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          direction: 'ltr',
        }}
      >
        <motion.div
          style={{ y: parallaxY }}
        >
          <motion.img
            src={category.image}
            alt={category.name}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '4/3',
              objectFit: 'cover',
              display: 'block',
            }}
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ direction: 'ltr' }}
      >
        <p
          className="text-editorial-sm font-body"
          style={{ color: 'var(--accent)', marginBottom: '1rem' }}
        >
          0{index + 1}
        </p>
        <h3
          className="font-heading"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            color: 'var(--text-primary)',
            fontWeight: 300,
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}
        >
          {category.name}
        </h3>
        <p
          className="font-body"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.8,
            maxWidth: '400px',
            marginBottom: '2rem',
          }}
        >
          {category.description}
        </p>
        <a
          href="#"
          className="btn-premium"
          style={{ fontSize: '0.75rem', padding: '0.85rem 2rem' }}
        >
          View Gallery
        </a>
      </motion.div>
    </motion.div>
  );
}
