'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=1920&q=80',
    eyebrow: 'PREMIER PRINTING PRESS & GRAPHICS STUDIO | FREEGANJ, UJJAIN',
    title: 'Precision Offset Printing &\nRoyal Wedding Cards',
    subtitle: 'High-definition digital printing, gold foil wedding invitations, flex banners, photobooks & corporate stationery by Ayushman Cards & Graphics.',
  },
  {
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1920&q=80',
    eyebrow: '🪔 WEDDING & FESTIVE PRINT SOLUTIONS',
    title: 'Crafting Elegance for\nYour Sacred Celebrations',
    subtitle: 'Custom laser-cut wedding boxes, acrylic invitations, star flex outdoor banners & premium photobooks delivered across Ujjain & worldwide.',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
        height: '88vh',
        minHeight: '580px',
        overflow: 'hidden',
      }}
    >
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ scale: 1.06, opacity: 0 }}
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 100%)',
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
          paddingBottom: 'clamp(3.5rem, 7vh, 5.5rem)',
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
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                lineHeight: 1.08,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                whiteSpace: 'pre-line',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
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
                color: 'rgba(255, 255, 255, 0.88)',
                marginBottom: '2rem',
                maxWidth: '540px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
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
                Order Print / Get Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href="/#calculator"
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
                ⚡ Instant Price Estimator
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '2rem',
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? '36px' : '12px',
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
