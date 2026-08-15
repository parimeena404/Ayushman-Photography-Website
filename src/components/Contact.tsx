'use client';

import { useState } from 'react';

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
        setSubmitMessage('Thank you! Our team will contact you within 24 hours.');
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="vp-contact-grid"
        >
          {/* Left — Info */}
          <div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#1E1E1E',
                marginBottom: '1rem',
              }}
            >
              Get in touch
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Visit our printing press in Freeganj, Ujjain or reach out for a free quote. We serve customers across India with premium card printing services.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', label: 'Address', value: 'Ayushman Cards n Graphics, Freeganj, Ujjain, Madhya Pradesh 456001' },
                { icon: '📞', label: 'Phone / WhatsApp', value: '9479784979 | 9893022451' },
                { icon: '📧', label: 'Email', value: 'ayushmancards@gmail.com' },
                { icon: '🕐', label: 'Working Hours', value: 'Mon–Sat: 10 AM – 8 PM | Sun: Closed' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#1E1E1E', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            style={{
              background: '#F8F9FA',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1E1E1E',
                marginBottom: '1.25rem',
              }}
            >
              Send us a message
            </h3>

            {submitStatus === 'success' ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: '#10B981',
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
                  placeholder="Full Name *"
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
                  <option value="">Select a Service</option>
                  <option value="Visiting Cards">Visiting Cards</option>
                  <option value="Wedding Invitations">Wedding Invitations</option>
                  <option value="Flex Banners">Flex Banners & Signage</option>
                  <option value="Corporate Stationery">Corporate Stationery</option>
                  <option value="Photo Albums & Gifts">Photo Albums & Gifts</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  placeholder="Your message or requirements..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />

                {submitStatus === 'error' && (
                  <div style={{ color: '#EF4444', fontSize: '0.8125rem', fontFamily: "'Inter', sans-serif" }}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#1E1E1E',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: submitStatus === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
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
  border: '1.5px solid #E5E7EB',
  borderRadius: '6px',
  outline: 'none',
};
