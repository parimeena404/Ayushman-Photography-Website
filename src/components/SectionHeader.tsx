'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      style={{
        textAlign: align,
        marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        maxWidth: align === 'center' ? '700px' : 'none',
        margin: align === 'center' ? '0 auto clamp(2.5rem, 5vw, 4rem)' : undefined,
      }}
    >
      {eyebrow && (
        <motion.p
          className="text-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginBottom: '0.75rem',
            color: light ? 'var(--gold-light)' : undefined,
          }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        className="text-h1"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          color: light ? 'var(--text-light)' : 'var(--text-primary)',
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-body-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: '1rem',
            color: light ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
