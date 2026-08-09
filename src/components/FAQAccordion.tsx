'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const faqs = [
  {
    q: 'How far in advance should I order my wedding invitation cards?',
    a: 'We recommend placing your wedding card order 3–4 weeks before you plan to distribute them. This allows ample time for custom design proofing, foil stamping, laser cutting, and printing.',
  },
  {
    q: 'Can I see a physical proof sample before bulk card printing?',
    a: 'Yes! For wedding cards and corporate orders, we share digital PDF proofs via WhatsApp/Email. You can also visit our Freeganj studio in Ujjain to view physical card samples, paper board textures, and gold foil finishes.',
  },
  {
    q: 'What paper GSM and finish options do you offer for visiting cards?',
    a: 'We offer 300 GSM, 350 GSM, 400 GSM Art Cards, Velvet Touch Soft Lamination, Metallic Foil Stamping, 3D Raised Spot UV, and transparent PVC plastic cards.',
  },
  {
    q: 'What is the turnaround time for express same-day flex banner printing?',
    a: 'For flex banners, Star Flex outdoor banners, and promotional posters, we offer same-day printing for orders placed before 2:00 PM at our Ujjain studio press.',
  },
  {
    q: 'Can you create custom graphic designs for wedding cards or banners?',
    a: 'Absolutely! Our in-house graphic design team can craft custom wedding card layouts in Hindi & English, brand logos, pamphlets, letterheads, and flex banner graphics.',
  },
  {
    q: 'Do you deliver wedding card orders across India?',
    a: 'Yes, we provide secure pan-India courier shipping for all custom wedding invitation box cards, acrylic cards, photobooks, and corporate stationery.',
  },
  {
    q: 'What file formats do you accept for custom printing orders?',
    a: 'We accept CDR (CorelDraw), AI (Adobe Illustrator), PDF, PSD, High-Resolution PNG, and JPEG files.',
  },
  {
    q: 'Do you offer bulk discounts for commercial printing orders?',
    a: 'Yes, we provide volume-based discounts for visiting cards, pamphlets, bill books, and flex banners. Use our Instant Price Calculator widget to check bulk rates.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with us."
        />

        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem 0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                  }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: openIndex === i ? 'var(--gold)' : 'var(--text-tertiary)',
                    fontSize: '1.25rem',
                    fontWeight: 300,
                    transition: 'color 0.3s ease',
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        paddingBottom: '1.25rem',
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
