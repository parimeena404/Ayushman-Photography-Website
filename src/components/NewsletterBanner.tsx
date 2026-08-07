'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section style={{ background: 'var(--bg-card)', padding: 'clamp(3rem, 6vh, 4.5rem) 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '750px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            It&apos;s good to be on the list.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem',
            }}
          >
            Get 15% off* your first photography booking when you sign up for our emails
          </p>

          {submitted ? (
            <div
              style={{
                background: 'var(--gold-muted)',
                color: 'var(--text-primary)',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '0.9375rem',
              }}
            >
              🎉 Thank you for subscribing! Your 15% discount coupon code <strong>AYUSHMAN15</strong> has been applied.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '520px' }}>
                <input
                  type="email"
                  placeholder="Subscription email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.25rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1.5px solid var(--border-medium)',
                    borderRadius: '999px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.75rem',
                    background: 'var(--gold)',
                    color: '#1A1A1A',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    border: 'none',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Submit
                </button>
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--text-tertiary)',
                  maxWidth: '520px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  marginTop: '0.25rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ accentColor: 'var(--gold)' }}
                />
                <span>Yes, I&apos;d like to receive special offer emails, shoot updates, and tips from Ayushman Photography Studio.</span>
              </label>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
