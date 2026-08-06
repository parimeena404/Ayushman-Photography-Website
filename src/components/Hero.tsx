'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollIndicator from './ScrollIndicator';
import { fadeInUp } from '@/lib/animations';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.15,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

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
      {/* Background Image with GSAP slow zoom */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(15, 35, 27, 0.4) 0%, rgba(15, 35, 27, 0.65) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
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
          Luxury Wedding Photography
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
          Where Every Frame
          <br />
          Tells a Story
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="#contact" className="btn-premium" style={{ color: '#F8F5EF', borderColor: 'rgba(248,245,239,0.4)' }}>
            Begin Your Story
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
