'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');
    setSubmitMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.service || 'General Inquiry',
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Our studio team will contact you on WhatsApp / Phone within 24 hours.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection.');
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
        borderTop: '1px solid #F3F4F6',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#D1FAE5',
              color: '#065F46',
              padding: '0.25rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.6rem',
            }}
          >
            <span>🛡️ 100% Verified & Trusted Printing Press</span>
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: '#0B2545',
              margin: '0 0 0.5rem',
            }}
          >
            Visit Our Studio & Printing Press
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#64748B', maxWidth: '650px', margin: '0 auto' }}>
            Serving Ujjain, Madhya Pradesh & clients across India with in-house Heidelberg offset & digital printing since 2001.
          </p>
        </div>

        {/* 2-Column Contact & Form Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '3rem',
          }}
          className="vp-contact-grid"
        >
          {/* Left Column — Studio Details & Trust Badges */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1E1E1E',
                marginBottom: '0.75rem',
              }}
            >
              Ayushman Cards & Graphics
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Direct in-house printing press. We welcome you to visit our studio in Freeganj to feel our luxury paper stocks, velvet lamination, gold foil samples, and custom acrylic wedding box collections in person.
            </p>

            {/* Trust Highlights Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🏆', title: 'Since 2001', sub: '24+ Years of Trust' },
                { icon: '🏭', title: 'In-House Press', sub: 'No Middlemen Rates' },
                { icon: '📦', title: 'Pan-India Delivery', sub: 'Safe Bubble Packing' },
                { icon: '🛡️', title: '100% Quality Guarantee', sub: 'Prepress Approval' },
              ].map((b) => (
                <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.6rem 0.75rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#0B2545' }}>{b.title}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: '👤', label: 'Proprietor', value: 'Properiter - Rajesh Saatoliya' },
                { icon: '📍', label: 'Studio & Press Address', value: '63, Varruchi Marg, Freeganj Ujjain, Madhya Pradesh 456001' },
                { icon: '📞', label: 'Direct Phone / WhatsApp', value: '+91 94797 84979 | +91 98930 22451' },
                { icon: '📧', label: 'Email Support', value: 'ayushmancards@gmail.com' },
                { icon: '🕐', label: 'Studio Working Hours', value: 'Mon–Sat: 10:00 AM – 8:30 PM | Sun: By Appointment' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#1E293B', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Message Form */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0B2545',
                marginBottom: '0.4rem',
              }}
            >
              Get a Fast Custom Quote / Inquiry
            </h3>
            <p style={{ fontSize: '0.78125rem', color: '#64748B', margin: '0 0 1.25rem' }}>
              Share your printing specifications or design queries. We will get back to you promptly.
            </p>

            {submitStatus === 'success' ? (
              <div
                style={{
                  background: '#D1FAE5',
                  border: '1px solid #86EFAC',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: '#065F46',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                }}
              >
                ✓ {submitMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{ ...inputStyle, color: formData.service ? '#1E1E1E' : '#9CA3AF' }}
                >
                  <option value="">Select Service / Product Required</option>
                  <option value="Wedding Invitations">Wedding Cards & Box Invitations</option>
                  <option value="Visiting Cards">Visiting Cards (Velvet / Gold Foil / Spot UV)</option>
                  <option value="Flex Banners">Flex Banners & Roll-up Standees</option>
                  <option value="Corporate Stationery">Corporate Letterheads & Bill Books</option>
                  <option value="Photo Albums & Gifts">Lay-Flat Photo Albums & Keepsakes</option>
                  <option value="Other Printing Service">Other Custom Press Work</option>
                </select>
                <textarea
                  placeholder="Describe your requirement (Quantity, paper finish, card size, estimated delivery date)..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />

                {submitStatus === 'error' && (
                  <div style={{ color: '#EF4444', fontSize: '0.8125rem', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: submitStatus === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                >
                  {submitStatus === 'sending' ? 'Submitting...' : 'Send Inquiry Now →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ═══ Interactive Google Maps & 3D Location View ═══ */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.75rem',
              background: '#0B2545',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📍 Verified Press Location
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.2rem 0 0', color: '#FFFFFF' }}>
                Ayushman Cards & Graphics • 63, Varruchi Marg, Freeganj Ujjain
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=63+Varruchi+Marg+Freeganj+Ujjain+Madhya+Pradesh+456001"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  background: '#FFFFFF',
                  color: '#0B2545',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>🗺️ Get GPS Directions</span> <span>↗</span>
              </a>
              <a
                href="https://www.google.com/maps/@23.1765,75.7885,17z/data=!3m1!1e3"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>🛰️ 3D Satellite View</span> <span>↗</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Frame */}
          <div style={{ width: '100%', height: '360px', position: 'relative', background: '#F1F5F9' }}>
            <iframe
              title="Ayushman Cards & Graphics Location Map - Freeganj Ujjain"
              src="https://maps.google.com/maps?q=63%2C%20Varruchi%20Marg%2C%20Freeganj%2C%20Ujjain%2C%20Madhya%20Pradesh%20456001&t=m&z=16&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 1rem',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.875rem',
  color: '#1E1E1E',
  background: '#FFFFFF',
  border: '1.5px solid #CBD5E1',
  borderRadius: '8px',
  outline: 'none',
};
