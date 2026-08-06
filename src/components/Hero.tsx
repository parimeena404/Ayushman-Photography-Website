'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollIndicator from './ScrollIndicator';
import { fadeInUp } from '@/lib/animations';

const slideshowImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80',
];

// Sample public royalty-free ambient video
const backgroundVideo = 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-at-sunset-41544-large.mp4';

interface HeroProps {
  mode?: 'video' | 'slideshow';
}

export default function Hero({ mode = 'video' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroMode, setHeroMode] = useState<'video' | 'slideshow'>(mode);

  // Slideshow auto-advance
  useEffect(() => {
    if (heroMode === 'slideshow') {
      const timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroMode]);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Media */}
      {heroMode === 'video' ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${slideshowImages[activeSlide]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      )}

      {/* Soft Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(15, 35, 27, 0.45) 0%, rgba(15, 35, 27, 0.75) 100%)',
        }}
      />

      {/* Mode Switcher Toggle Button */}
      <div
        style={{
          position: 'absolute',
          top: '6rem',
          right: '2rem',
          zIndex: 30,
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: 'rgba(15, 35, 27, 0.6)',
          backdropFilter: 'blur(10px)',
          padding: '0.25rem 0.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(191, 164, 111, 0.3)',
        }}
      >
        <button
          onClick={() => setHeroMode('video')}
          style={{
            background: 'none',
            border: 'none',
            color: heroMode === 'video' ? '#BFA46F' : '#F8F5EF',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            opacity: heroMode === 'video' ? 1 : 0.6,
          }}
        >
          Film
        </button>
        <span style={{ color: 'rgba(248,245,239,0.3)', fontSize: '0.7rem' }}>|</span>
        <button
          onClick={() => setHeroMode('slideshow')}
          style={{
            background: 'none',
            border: 'none',
            color: heroMode === 'slideshow' ? '#BFA46F' : '#F8F5EF',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            opacity: heroMode === 'slideshow' ? 1 : 0.6,
          }}
        >
          Gallery
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '960px',
          padding: '0 2rem',
        }}
      >
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-editorial-sm font-body"
          style={{
            color: 'var(--accent)',
            marginBottom: '1.5rem',
          }}
        >
          International Fine Art & Cinematic Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-editorial-xl"
          style={{
            color: '#F8F5EF',
            marginBottom: '2rem',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Every Frame
          <br />
          Remembers
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="/booking" className="btn-premium" style={{ color: '#F8F5EF', borderColor: '#BFA46F' }}>
            Request Availability
          </a>
          <a href="#stories" className="btn-premium" style={{ color: '#F8F5EF', borderColor: 'rgba(248,245,239,0.3)' }}>
            Explore Stories
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
