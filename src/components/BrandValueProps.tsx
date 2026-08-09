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
            Ayushman Cards & Graphics: Ujjain&apos;s Trusted Printing Press & Graphics Studio Since 2001
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            Located at 63 Varuchi Marg, Freeganj, Ujjain, Ayushman Cards & Graphics is Central India&apos;s premier commercial printing press. We specialize in luxury wedding invitation cards, offset printing, visiting cards, flex banners, corporate stationery, photobooks, and custom graphic design.
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
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🖨️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Complete Offset & Digital Printing Press
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              High-volume offset press for visiting cards, letterheads, pamphlets, bill books, and flex banners in Freeganj, Ujjain.
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
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💍</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Royal Wedding Cards & Laser Crafts
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Luxury velvet box cards, clear acrylic wedding invitations, gold foil Farman scrolls, and animated video E-invites for grand celebrations.
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
              Call or WhatsApp our print team directly at <strong>9479784979</strong> or <strong>9893022451</strong> for instant order quotes, design proofing, or delivery updates.
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
