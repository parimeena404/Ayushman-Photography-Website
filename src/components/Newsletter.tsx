'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '5rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
          Journal & Musings
        </p>
        <h3 className="font-heading" style={{ fontSize: '2.25rem', fontWeight: 300, marginBottom: '1rem' }}>
          Subscribe to Our Letters
        </h3>
        <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
          Receive quiet reflections on art, travel guides to secret wedding locations, and early announcements for international tour dates.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="input-luxury font-body"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-premium" style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              Subscribe
            </button>
          </form>
        ) : (
          <p className="font-body" style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
            ✦ Thank you. You are now subscribed to our private letters.
          </p>
        )}
      </div>
    </section>
  );
}
