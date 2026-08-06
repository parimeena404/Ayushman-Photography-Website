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
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#F8F5EF',
              fontWeight: 300,
              letterSpacing: '0.1em',
            }}
          >
            Lumière
          </motion.h1>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body"
            style={{
              fontSize: '0.85rem',
              color: '#F8F5EF',
              letterSpacing: '0.15em',
              fontStyle: 'italic',
            }}
          >
            Every frame remembers.
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
