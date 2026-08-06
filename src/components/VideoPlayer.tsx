'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ isOpen, videoUrl, title, onClose }: VideoPlayerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backgroundColor: 'rgba(10, 24, 18, 0.95)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            right: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2010,
          }}
        >
          <span className="font-heading" style={{ color: '#F8F5EF', fontSize: '1.25rem', fontWeight: 300 }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#F8F5EF',
              fontSize: '1.75rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Video Wrapper */}
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            overflow: 'hidden',
          }}
        >
          <video
            autoPlay
            controls
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
