'use client';

import { motion } from 'framer-motion';

export default function BrandValueProps() {
  return (
    <section style={{ padding: 'clamp(3rem, 6vh, 4.5rem) 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-wide">
        {/* Main SEO Header & Description */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto clamp(2.5rem, 5vh, 3.5rem)' }}>
          {/* Official Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ayushman Cards n Graphics Logo"
              style={{ height: '60px', width: 'auto' }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            Ayushman Cards n Graphics: Ujjain&apos;s Trusted Printing & Photography Studio Since 2001
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            Located at 63 Varuchi Marg, Freeganj, Ujjain, Ayushman Cards n Graphics has been Central India&apos;s premier destination for fine art photography, Indian festive celebrations, wedding cinematography, luxury invitation cards, and commercial printing. We combine traditional warmth with modern digital craftsmanship.
          </p>
        </div>

        {/* 3-Column Vistaprint Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {/* Prop 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏷️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Complete Printing & Photography Under One Roof
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              From pre-wedding shoots, Diwali & festive event coverage to wedding card printing, banners, visiting cards, and flush mount photo albums in Freeganj, Ujjain.
            </p>
          </motion.div>

          {/* Prop 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🪔</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Indian Festive & Cultural Expertise
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Specialized photography for Indian festivals including Diwali, Holi, Navratri Garba, Ganesh Utsav, and cultural heritage ceremonies across Madhya Pradesh.
            </p>
          </motion.div>

          {/* Prop 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📞</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Direct Studio Support & Helpline
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Call or WhatsApp our team directly at <strong>9479784979</strong> or <strong>9893022451</strong> for instant booking quotes, album design assistance, or custom event packages.
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          section > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
