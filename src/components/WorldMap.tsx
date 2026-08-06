'use client';

import { motion } from 'framer-motion';

const destinations = [
  { city: 'Florence, Italy', count: '14 Weddings', coords: 'Tuscany' },
  { city: 'Santorini, Greece', count: '18 Weddings', coords: 'Cyclades' },
  { city: 'Udaipur, India', count: '32 Weddings', coords: 'Rajasthan' },
  { city: 'Paris, France', count: '11 Sessions', coords: 'Europe' },
  { city: 'Bali, Indonesia', count: '9 Weddings', coords: 'Southeast Asia' },
  { city: 'Kyoto, Japan', count: '7 Weddings', coords: 'East Asia' },
  { city: 'Amalfi Coast, Italy', count: '15 Weddings', coords: 'Mediterranean' },
];

export default function WorldMap() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
          Global Footprint
        </p>
        <h2 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '3rem' }}>
          Destination Index
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--divider)',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '2px',
              }}
            >
              <span className="font-body" style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {dest.coords}
              </span>
              <h4 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 300, margin: '0.25rem 0' }}>
                {dest.city}
              </h4>
              <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {dest.count}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
