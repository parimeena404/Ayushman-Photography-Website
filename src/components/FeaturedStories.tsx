'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const stories = [
  {
    title: 'Anika & Rohan',
    subtitle: 'Royal Palace Celebration',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=85&auto=format',
    aspect: 'tall',
  },
  {
    title: 'Priya & Kabir',
    subtitle: 'Golden Hour Haldi & Sangeet',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1400&q=85&auto=format',
    aspect: 'wide',
  },
  {
    title: 'Leila & Arjun',
    subtitle: 'Lake Palace Heritage Affair',
    location: 'Udaipur, India',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=85&auto=format',
    aspect: 'tall',
  },
];

export default function FeaturedStories() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="stories" className="section-padding" ref={sectionRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Section heading */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '4rem' }}>
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            Featured Stories
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{ color: 'var(--text-primary)', fontWeight: 300 }}
          >
            Love, Beautifully Told
          </h2>
        </motion.div>

        {/* Asymmetrical Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}
          className="stories-grid"
        >
          {/* Large left image */}
          <motion.div variants={fadeInUp} style={{ gridRow: 'span 2' }}>
            <StoryCard story={stories[0]} height="100%" />
          </motion.div>

          {/* Two stacked right images */}
          <motion.div variants={fadeInUp}>
            <StoryCard story={stories[1]} height="100%" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StoryCard story={stories[2]} height="100%" />
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .stories-grid {
            grid-template-columns: 1fr !important;
          }
          .stories-grid > div:first-child {
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

function StoryCard({ story, height }: { story: typeof stories[0]; height: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height,
        minHeight: '350px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${story.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,35,27,0.7) 0%, transparent 60%)',
        }}
      />

      {/* Content — always visible on mobile, hover reveal on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          right: '2rem',
          zIndex: 2,
        }}
        className="story-content"
      >
        <p
          className="text-editorial-sm font-body"
          style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}
        >
          {story.location}
        </p>
        <h3
          className="font-heading"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            color: '#F8F5EF',
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          {story.title}
        </h3>
        <p
          className="font-body"
          style={{
            color: 'rgba(248,245,239,0.7)',
            fontSize: '0.9rem',
            marginTop: '0.25rem',
          }}
        >
          {story.subtitle}
        </p>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .story-content {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
