'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fadeInUp } from '@/lib/animations';

const testimonials = [
  {
    quote:
      'They didn\'t just photograph our wedding — they captured the feeling of it. Every time I look at our images, I\'m transported back to that golden afternoon in Tuscany. It\'s like holding a piece of time.',
    name: 'Anika & Rohan',
    event: 'Destination Wedding · Florence',
  },
  {
    quote:
      'What struck me most was their stillness. In the midst of all the chaos and joy, they moved like shadows — quiet, present, and impossibly perceptive. The result is a collection of images that feel more like poetry than photographs.',
    name: 'Mira & James',
    event: 'Wedding · Santorini',
  },
  {
    quote:
      'We wanted authenticity, and that\'s exactly what we received. No forced smiles, no awkward poses. Just us — raw, real, and radiant. These photographs are our most treasured possession.',
    name: 'Leila & Arjun',
    event: 'Pre-Wedding · Udaipur',
  },
  {
    quote:
      'From the first call to the final gallery, everything felt curated and intentional. Working with them is less like hiring a photographer and more like collaborating with an artist who truly understands your story.',
    name: 'Sofia & Karan',
    event: 'Engagement · Paris',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-padding" ref={sectionRef}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Section heading */}
        <p
          className="text-editorial-sm font-body"
          style={{ color: 'var(--accent)', marginBottom: '1rem' }}
        >
          Kind Words
        </p>
        <h2
          className="font-heading text-editorial-lg"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 300,
            marginBottom: '4rem',
          }}
        >
          What They Say
        </h2>

        {/* Testimonial carousel */}
        <div style={{ minHeight: '280px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Quote */}
              <p
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  color: 'var(--text-primary)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  marginBottom: '2.5rem',
                }}
              >
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Name */}
              <p
                className="font-body"
                style={{
                  color: 'var(--accent)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {testimonials[current].name}
              </p>
              <p
                className="font-body"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {testimonials[current].event}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '3rem',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === current ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '1rem',
                backgroundColor: i === current ? 'var(--accent)' : 'var(--divider)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
