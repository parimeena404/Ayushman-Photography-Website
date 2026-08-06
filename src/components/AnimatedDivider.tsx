'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { lineGrow } from '@/lib/animations';

export default function AnimatedDivider({ margin = '4rem 0' }: { margin?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ margin, overflow: 'hidden' }}>
      <motion.div
        variants={lineGrow}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="divider-gold"
        style={{ transformOrigin: 'center' }}
      />
    </div>
  );
}
