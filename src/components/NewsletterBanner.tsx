'use client';

import { useState } from 'react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      style={{
        background: '#0B2545',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '0.5rem',
          }}
        >
          Get exclusive offers & updates
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem',
          }}
        >
          Subscribe to our newsletter for new product launches, festive deals & design tips.
        </p>

        {submitted ? (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              color: '#10B981',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            ✓ Thank you for subscribing! Watch your inbox for exclusive deals.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                border: 'none',
                borderRadius: '6px',
                outline: 'none',
                background: '#FFFFFF',
                color: '#1E1E1E',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#FFFFFF',
                color: '#0B2545',
                border: 'none',
                borderRadius: '6px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
