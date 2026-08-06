'use client';

const publications = [
  'VOGUE INDIA',
  'HARPER\'S BAZAAR',
  'BRIDES MAGAZINE',
  'FEARLESS PHOTOGRAPHERS',
  'GRACE ORMONDE',
  'WEDDING SUTRA',
];

export default function PressCarousel() {
  return (
    <section
      style={{
        padding: '3rem 2rem',
        borderTop: '1px solid var(--divider)',
        borderBottom: '1px solid var(--divider)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <p className="text-editorial-sm font-body" style={{ color: 'var(--text-secondary)', marginBottom: '2rem', opacity: 0.7 }}>
          Featured & Published In
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.5rem',
          }}
        >
          {publications.map((pub, i) => (
            <span
              key={i}
              className="font-heading"
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.2em',
                fontWeight: 400,
                opacity: 0.7,
                transition: 'opacity 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {pub}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
