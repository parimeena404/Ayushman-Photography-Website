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
        return prev + Math.random() * 20 + 10;
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
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ayushman Cards n Graphics Logo"
              style={{
                height: '75px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              color: '#F5F2EC',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Premier Printing Press & Custom Card Studio · Freeganj Ujjain
          </motion.p>

          {/* Progress line */}
          <div
            style={{
              width: '180px',
              height: '2px',
              backgroundColor: 'rgba(212, 0, 0, 0.2)',
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
                backgroundColor: '#D40000',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
