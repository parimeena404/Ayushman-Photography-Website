'use client';

import { motion } from 'framer-motion';

export default function BrandValueProps() {
  return (
    <section style={{ padding: 'clamp(3rem, 6vh, 4.5rem) 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-wide">
        {/* Main SEO Header & Description */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto clamp(2.5rem, 5vh, 3.5rem)' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            Ayushman Photography Studio: Central India&apos;s Premier Photography & Printing Brand
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            For more than 25 years, Ayushman Photography Studio has helped couples, families, and brands preserve their most cherished memories and project a professional identity. Whether you need luxury wedding photography, cinematic films, portrait sessions, or handcrafted photo albums, we deliver museum-quality perfection.
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
              Flexible Packages @ Best Prices
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We offer customizable photography packages designed to suit intimate ceremonies as well as grand destination weddings, ensuring maximum value without compromising quality.
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
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✨</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              High Quality Colors & Cinema Edits
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our dedicated editing suite utilizes industry-leading color grading, skin retouching, and audio design to produce magazine-ready photographs and Hollywood-grade films.
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
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛡️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              100% Satisfaction Guarantee
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We stand by every shoot and print we deliver. If you&apos;re not completely delighted with your photographs or album quality, we will make it right with easy revisions or replacements.
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
