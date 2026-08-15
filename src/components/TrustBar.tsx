'use client';

const trustItems = [
  { icon: '🚚', title: 'Fast Pan-India Delivery', desc: 'Free shipping on orders above ₹999' },
  { icon: '✨', title: '100% Satisfaction Guarantee', desc: 'Quality you can trust, every time' },
  { icon: '🎨', title: 'Free Design Templates', desc: 'Thousands of ready-to-use templates' },
  { icon: '💰', title: 'Wholesale Savings', desc: 'Buy more, save more on bulk orders' },
];

export default function TrustBar() {
  return (
    <section
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '1.25rem clamp(1rem, 3vw, 2.5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}
        className="vp-trust-grid"
      >
        {trustItems.map((item) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0',
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: '#1E1E1E',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  color: '#6B7280',
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .vp-trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
