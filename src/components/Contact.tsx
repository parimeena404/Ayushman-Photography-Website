'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Let's Create Something Beautiful"
          subtitle="Ready to book your session? Reach out and let's discuss your vision."
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.4rem' }}>
                  Full Name
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.4rem' }}>
                  Email Address
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.4rem' }}>
                  Phone Number
                </label>
                <input
                  className="input"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.4rem' }}>
                  Service Interested In
                </label>
                <select
                  className="input"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="prewedding">Pre-Wedding Shoot</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="fashion">Fashion/Editorial</option>
                  <option value="commercial">Commercial Photography</option>
                  <option value="event">Event Coverage</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.4rem' }}>
                Your Message
              </label>
              <textarea
                className="input textarea"
                placeholder="Tell us about your event, preferred dates, and any special requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                style={{ resize: 'vertical', minHeight: '120px' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
              Send Inquiry
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Studio Location
              </h3>

              {[
                { icon: '📍', label: 'Address', value: 'Freeganj, Ujjain, Madhya Pradesh 456010' },
                { icon: '📞', label: 'Phone', value: '+91 94253 XXXXX' },
                { icon: '✉️', label: 'Email', value: 'hello@ayushmanstudio.com' },
                { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat: 10:00 AM – 8:00 PM' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '0.125rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div
              style={{
                width: '100%',
                height: '200px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.1!2d75.7849!3d23.1828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEwJzU4LjEiTiA3NcKwNDcnMDUuNiJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'saturate(0.8)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              />
            </div>

            {/* Social Media */}
            <div>
              <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                Follow Us
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Instagram', 'Facebook', 'YouTube', 'Pinterest'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      border: '1.5px solid var(--border-medium)',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
