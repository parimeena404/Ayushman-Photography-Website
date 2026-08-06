'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown this session
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
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

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
            backgroundColor: '#0F231B',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#F8F5EF',
              fontWeight: 400,
              letterSpacing: '0.05em',
              textAlign: 'center',
            }}
          >
            Ayushman <span style={{ fontSize: '0.5em', fontWeight: 300, display: 'block', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem', color: '#C5969D' }}>Cards n Graphics</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body"
            style={{
              fontSize: '0.8rem',
              color: '#F8F5EF',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            We Are Printers & Creatives By Heart · Since 2001
          </motion.p>

          {/* Progress line */}
          <div
            style={{
              width: '200px',
              height: '1px',
              backgroundColor: 'rgba(191, 164, 111, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: 'linear' }}
              style={{
                height: '100%',
                backgroundColor: '#BFA46F',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
