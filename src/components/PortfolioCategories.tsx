'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';

const categories = [
  {
    name: 'Royal Weddings',
    description: 'Timeless Indian wedding celebrations captured with an editorial eye. Every ritual, every emotion, every sacred vow.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=85&auto=format',
  },
  {
    name: 'Pre-Wedding & Couples',
    description: 'The quiet anticipation before the grand day. Intimate portraits woven into iconic heritage landscapes.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1400&q=85&auto=format',
  },
  {
    name: 'Destination & Heritage',
    description: 'From Rajasthan palace courtyards to Kerala backwaters and misty Himalayan valleys. Art that spans traditions.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1400&q=85&auto=format',
  },
  {
    name: 'Festivals & Sangeet',
    description: 'Vibrant Haldi, Sangeet, and cultural festivals bathed in rich colors, movement, and genuine joy.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1400&q=85&auto=format',
  },
  {
    name: 'Editorial Portraiture',
    description: 'Deeply personal, artistically refined portraits celebrating character, couture, and Indian heritage.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1400&q=85&auto=format',
  },
  {
    name: 'Cultural Arts & Lifestyle',
    description: 'Classical arts, intimate gatherings, and authentic cultural celebrations elevated to fine art.',
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1400&q=85&auto=format',
  },
  {
    name: 'Commercial & Couture',
    description: 'Premium luxury brand imagery and bridal couture campaigns crafted with cinematic precision.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=85&auto=format',
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
