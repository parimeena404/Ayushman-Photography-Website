'use client';

const reasons = [
  {
    icon: '🎨',
    title: 'Free Design Service',
    desc: 'Our expert designers create your card layouts for free. Just share your details and get print-ready designs within 24 hours.',
  },
  {
    icon: '🏭',
    title: 'In-House Printing Press',
    desc: 'Direct from our own offset & digital press in Ujjain. No middlemen means better quality at lower prices.',
  },
  {
    icon: '📦',
    title: 'Pan-India Delivery',
    desc: 'We ship across all of India. Track your order in real-time and get it delivered to your doorstep safely.',
  },
  {
    icon: '💎',
    title: 'Premium Paper & Finishes',
    desc: 'From 350 GSM velvet touch to metallic gold foil, spot UV, and acrylic — only the finest materials.',
  },
  {
    icon: '⚡',
    title: 'Express 48hr Dispatch',
    desc: 'Need it urgently? Our express service dispatches standard orders within 48 hours of design approval.',
  },
  {
    icon: '🤝',
    title: 'Wholesale & Bulk Pricing',
    desc: 'Special discounted rates for resellers, event planners, and bulk orders above 500 units.',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
        borderTop: '1px solid #F3F4F6',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#1E1E1E',
              marginBottom: '0.5rem',
            }}
          >
            Why choose Ayushman Cards?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#6B7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Trusted by 5,000+ customers across India for premium printing & card-making since 2015.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="vp-why-grid"
        >
          {reasons.map((r) => (
            <div
              key={r.title}
              style={{
                padding: '1.75rem',
                background: '#F8F9FA',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{r.icon}</span>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1E1E1E',
                  marginBottom: '0.5rem',
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#6B7280',
                  lineHeight: 1.6,
                }}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .vp-why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
