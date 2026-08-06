'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainerSlow, fadeInUp, lineGrow } from '@/lib/animations';

const steps = [
  {
    number: '01',
    title: 'Inquiry',
    description:
      'It begins with a conversation. Share your vision, your story, and the moments that matter most to you. We listen deeply before we ever lift a camera.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'Together we craft a narrative — scouting locations bathed in golden light, curating a timeline that feels unhurried, and ensuring every detail aligns with your aesthetic.',
  },
  {
    number: '03',
    title: 'The Shoot',
    description:
      'This is where art happens. With a gentle, unobtrusive approach, we move through your day like a quiet observer — capturing the tears, the laughter, the in-between moments.',
  },
  {
    number: '04',
    title: 'Editing',
    description:
      'Each image is hand-edited with our signature warm, film-inspired tones. We sculpt light and shadow until every frame feels like a page from an editorial spread.',
  },
  {
    number: '05',
    title: 'Delivery',
    description:
      'Your gallery arrives in a beautifully designed online collection — alongside the option of handcrafted leather albums and fine-art prints worthy of gallery walls.',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      className="section-padding"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)' }}
    >
      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Section heading */}
        <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            The Experience
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{ color: '#F8F5EF', fontWeight: 300 }}
          >
            How We Work
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <motion.div
            variants={lineGrow}
            style={{
              position: 'absolute',
              left: '39px',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'var(--accent)',
              opacity: 0.3,
              transformOrigin: 'top',
            }}
            className="timeline-line"
          />

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                style={{
                  display: 'flex',
                  gap: '2.5rem',
                  alignItems: 'flex-start',
                }}
                className="timeline-step"
              >
                {/* Step number circle */}
                <div
                  style={{
                    minWidth: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '1px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: 'var(--bg-dark)',
                  }}
                >
                  <span
                    className="font-heading"
                    style={{
                      fontSize: '1.5rem',
                      color: 'var(--accent)',
                      fontWeight: 300,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step content */}
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      color: '#F8F5EF',
                      fontWeight: 300,
                      marginBottom: '1rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      color: 'rgba(248, 245, 239, 0.6)',
                      fontSize: '0.95rem',
                      lineHeight: 1.9,
                      maxWidth: '500px',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .timeline-line {
            left: 27px !important;
          }
          .timeline-step {
            gap: 1.5rem !important;
          }
          .timeline-step > div:first-child {
            min-width: 56px !important;
            height: 56px !important;
          }
          .timeline-step > div:first-child span {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
