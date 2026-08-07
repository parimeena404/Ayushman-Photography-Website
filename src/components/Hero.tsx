'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
    eyebrow: 'LUXURY WEDDING PHOTOGRAPHY',
    title: 'Where Every Moment\nBecomes a Masterpiece',
    subtitle: 'We craft timeless visual stories that celebrate love, beauty, and the art of being alive.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    eyebrow: 'CINEMATIC STORYTELLING',
    title: 'Your Love Story,\nBeautifully Told',
    subtitle: 'From intimate portraits to grand celebrations, every frame is a work of art.',
  },
  {
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80',
    eyebrow: 'SINCE 2001',
    title: 'Two Decades of\nCapturing Emotions',
    subtitle: 'Trusted by over 500 families to preserve their most cherished memories.',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setActive(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
      }}
    >
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slides[active].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'kenBurns 12s ease-in-out infinite alternate',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 'clamp(4rem, 8vh, 7rem)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: '700px' }}
          >
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--gold-light)',
                marginBottom: '1rem',
                fontWeight: 600,
              }}
            >
              {slides[active].eyebrow}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.08,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                whiteSpace: 'pre-line',
              }}
            >
              {slides[active].title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '2rem',
                maxWidth: '520px',
              }}
            >
              {slides[active].subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/booking"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  background: 'var(--gold)',
                  color: '#1A1A1A',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '2px solid var(--gold)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gold-dark)';
                  e.currentTarget.style.borderColor = 'var(--gold-dark)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,168,108,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Book Your Session
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href="/#portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  background: 'transparent',
                  color: '#FFFFFF',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(255,255,255,0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '2.5rem',
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? '40px' : '12px',
                height: '3px',
                borderRadius: '2px',
                background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                border: 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: 'clamp(1.25rem, 4vw, 3rem)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '30px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </motion.div>

      {/* Ken Burns Animation */}
      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
