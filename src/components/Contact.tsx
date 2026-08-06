'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';

const eventTypes = [
  'Wedding',
  'Pre-Wedding',
  'Destination Wedding',
  'Engagement',
  'Portrait Session',
  'Lifestyle',
  'Commercial',
  'Other',
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    eventType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    alert('Thank you for your inquiry. We will be in touch within 48 hours.');
  };

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        {/* Section heading */}
        <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '1rem' }}
          >
            Get in Touch
          </p>
          <h2
            className="font-heading text-editorial-lg"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            Let&rsquo;s Create Together
          </h2>
          <p
            className="font-body"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Every great story begins with a single step. We&rsquo;d love to hear about yours.
          </p>
        </motion.div>

        {/* Form + Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Form */}
          <motion.form
            variants={fadeInLeft}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="form-row">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="input-luxury font-body"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="input-luxury font-body"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="form-row">
              <input
                type="date"
                placeholder="Event Date"
                className="input-luxury font-body"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <select
                className="input-luxury font-body"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                style={{
                  appearance: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                }}
              >
                <option value="" disabled>
                  Event Type
                </option>
                {eventTypes.map((type) => (
                  <option key={type} value={type} style={{ color: '#262626' }}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Tell us about your vision..."
              rows={4}
              className="input-luxury font-body"
              style={{ resize: 'none' }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <div>
              <button type="submit" className="btn-premium">
                Send Inquiry
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </button>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            variants={fadeInRight}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              paddingTop: '0.5rem',
            }}
          >
            <div>
              <p
                className="text-editorial-sm font-body"
                style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}
              >
                Studio
              </p>
              <p className="font-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                42 Artisan Lane, Bandra West
                <br />
                Mumbai 400050, India
              </p>
            </div>

            <div>
              <p
                className="text-editorial-sm font-body"
                style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}
              >
                Email
              </p>
              <a
                href="mailto:hello@lumiere.studio"
                className="font-body"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
              >
                hello@lumiere.studio
              </a>
            </div>

            <div>
              <p
                className="text-editorial-sm font-body"
                style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}
              >
                Follow
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-body"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--text-secondary)')
                    }
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                className="text-editorial-sm font-body"
                style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}
              >
                Availability
              </p>
              <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Currently booking for 2025–2026
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
