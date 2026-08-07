'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const faqs = [
  {
    q: 'How far in advance should I book my wedding photography?',
    a: 'We recommend booking at least 3–6 months in advance, especially during the wedding season (November–February). For destination weddings, 6–12 months is ideal to ensure availability and allow time for pre-wedding shoots.',
  },
  {
    q: 'What is included in a typical wedding photography package?',
    a: 'Our packages include professional photographers, full-day coverage, edited high-resolution photos, an online gallery, and digital delivery. Premium packages also include cinematic films, drone coverage, same-day edits, and luxury albums.',
  },
  {
    q: 'Do you travel for destination weddings?',
    a: 'Absolutely! We love destination weddings and have covered events across Rajasthan, Goa, Kerala, Udaipur, Jaipur, and international locations. Travel and accommodation costs are discussed upfront with no hidden charges.',
  },
  {
    q: 'How long does it take to receive the final edited photos?',
    a: 'You\'ll receive a curated set of sneak peeks within 48 hours. The complete edited gallery is delivered within 4–6 weeks, depending on the package. Same-day edits are available with Signature and Luxe packages.',
  },
  {
    q: 'Can I customize a photography package?',
    a: 'Yes, every package is fully customizable. We understand that each event is unique, and we\'re happy to tailor our services to match your specific requirements and budget. Contact us for a personalized quote.',
  },
  {
    q: 'Do you offer pre-wedding and engagement shoots?',
    a: 'Yes, pre-wedding shoots are one of our specialties. We offer sessions at stunning locations including heritage sites, beaches, mountains, and urban settings. These can be booked standalone or as part of a wedding package.',
  },
  {
    q: 'What is your cancellation and refund policy?',
    a: 'We understand plans can change. Cancellations made 60+ days before the event receive a full refund minus the booking deposit. Cancellations within 30–60 days receive a 50% refund. We also offer date changes subject to availability.',
  },
  {
    q: 'Do you provide raw/unedited photographs?',
    a: 'We deliver professionally edited images that represent our artistic vision. Raw files are not included as standard, but can be discussed as an add-on for an additional fee.',
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
