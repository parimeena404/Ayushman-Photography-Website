'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/stories';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--divider)',
                paddingBottom: '1.25rem',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '0.75rem 0',
                }}
              >
                <span
                  className="font-heading"
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--text-primary)',
                    fontWeight: 300,
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    color: 'var(--accent)',
                    fontSize: '1.25rem',
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="font-body"
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
