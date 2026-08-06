'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10,
      }}
    >
      <span
        className="font-body"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(248, 245, 239, 0.6)',
        }}
      >
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '1px',
          height: '40px',
          backgroundColor: 'rgba(191, 164, 111, 0.5)',
        }}
      />
    </motion.div>
  );
}
