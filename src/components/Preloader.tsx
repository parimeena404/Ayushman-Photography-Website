'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('preloaderShown')) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('preloaderShown', 'true');
          }, 400);
          return 100;
        }
        return prev + Math.random() * 18 + 8;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#0D0D0D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--gold, #C9A86C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1A1A',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.75rem',
                boxShadow: '0 8px 30px rgba(201, 168, 108, 0.3)',
              }}
            >
              A
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: '#F5F2EC',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Ayushman <span style={{ fontSize: '0.45em', fontWeight: 500, display: 'block', textTransform: 'uppercase', letterSpacing: '0.25em', marginTop: '0.25rem', color: '#C9A86C' }}>Photography Studio</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              color: '#F5F2EC',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Where Moments Become Masterpieces · Since 2001
          </motion.p>

          {/* Progress line */}
          <div
            style={{
              width: '180px',
              height: '2px',
              backgroundColor: 'rgba(201, 168, 108, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2, ease: 'linear' }}
              style={{
                height: '100%',
                backgroundColor: '#C9A86C',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
