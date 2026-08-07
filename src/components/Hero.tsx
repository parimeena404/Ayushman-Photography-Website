'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1605886106691-d576a1656fce?w=1920&q=80',
    eyebrow: '🪔 INDIAN FESTIVE CELEBRATIONS',
    title: 'Capturing The Divine\nLight of Indian Festivals',
    subtitle: 'From Diwali Deepotsav and Holi color bursts to Navratri Garba nights and royal family portraits.',
  },
  {
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
    eyebrow: 'LUXURY WEDDING PHOTOGRAPHY',
    title: 'Where Every Moment\nBecomes a Masterpiece',
    subtitle: 'We craft timeless visual stories that celebrate love, heritage, and royal Indian weddings.',
  },
  {
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1920&q=80',
    eyebrow: 'HOLI FESTIVAL OF COLORS',
    title: 'Vibrant Joy &\nAuthentic Cultural Colors',
    subtitle: 'Specialized festive photography capturing joyous moments with family and loved ones.',
  },
  {
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1920&q=80',
    eyebrow: 'NAVRATRI & GARBA NIGHTS',
    title: 'Rhythm, Heritage &\nFestive Elegance',
    subtitle: 'High-speed event photography documenting traditional attire, dance, and cultural splendor.',
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
    }, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setActive(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5500);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '92vh',
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

      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)',
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
          paddingBottom: 'clamp(3.5rem, 7vh, 6rem)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: '720px' }}
          >
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: '#FFD700',
                marginBottom: '0.85rem',
                fontWeight: 800,
              }}
            >
              {slides[active].eyebrow}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                lineHeight: 1.08,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                whiteSpace: 'pre-line',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
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
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '2rem',
                maxWidth: '540px',
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
                  padding: '0.875rem 2.25rem',
                  background: 'linear-gradient(135deg, #D40000 0%, #990000 100%)',
                  color: '#FFFFFF',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(212,0,0,0.4)',
                }}
              >
                Book Festive Session
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href="/#festivals"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2.25rem',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                }}
              >
                Explore Festivals Gallery
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
                background: i === active ? '#FFD700' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                border: 'none',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
