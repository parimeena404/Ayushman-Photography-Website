'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LightboxImage {
  src: string;
  title?: string;
  location?: string;
  date?: string;
  category?: string;
}

interface GalleryLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Slideshow auto play
  useEffect(() => {
    if (!isPlaying || !isOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, handleNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(10, 24, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()} // Disable right click download
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1010,
          }}
        >
          {/* Counter */}
          <span
            className="font-body"
            style={{
              color: 'var(--accent)',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Toggle Auto Slideshow"
              style={{
                background: 'none',
                border: 'none',
                color: '#F8F5EF',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                opacity: 0.8,
              }}
            >
              {isPlaying ? 'PAUSE ❚❚' : 'PLAY ►'}
            </button>
            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              style={{
                background: 'none',
                border: 'none',
                color: '#F8F5EF',
                fontSize: '1.5rem',
                cursor: 'pointer',
                opacity: 0.8,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Image Frame */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem 0',
          }}
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '1rem',
              zIndex: 1010,
              background: 'rgba(15, 35, 27, 0.4)',
              border: '1px solid rgba(191, 164, 111, 0.3)',
              color: '#F8F5EF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              backdropFilter: 'blur(5px)',
            }}
          >
            ‹
          </button>

          {/* Main Display Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={currentImage.src}
              alt={currentImage.title || 'Portfolio Image'}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                maxHeight: '78vh',
                maxWidth: '90vw',
                objectFit: 'contain',
                borderRadius: '2px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            />
          </AnimatePresence>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '1rem',
              zIndex: 1010,
              background: 'rgba(15, 35, 27, 0.4)',
              border: '1px solid rgba(191, 164, 111, 0.3)',
              color: '#F8F5EF',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              backdropFilter: 'blur(5px)',
            }}
          >
            ›
          </button>
        </div>

        {/* Footer Details */}
        <div style={{ textAlign: 'center', zIndex: 1010 }}>
          {currentImage.title && (
            <h4
              className="font-heading"
              style={{
                fontSize: '1.25rem',
                color: '#F8F5EF',
                fontWeight: 300,
                marginBottom: '0.25rem',
              }}
            >
              {currentImage.title}
            </h4>
          )}
          {currentImage.location && (
            <p
              className="font-body"
              style={{
                fontSize: '0.8rem',
                color: 'rgba(248, 245, 239, 0.6)',
                letterSpacing: '0.1em',
              }}
            >
              {currentImage.location} {currentImage.date ? `— ${currentImage.date}` : ''}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
