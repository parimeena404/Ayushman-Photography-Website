'use client';

const reviews = [
  {
    name: 'Rajesh Sharma',
    location: 'Ujjain, MP',
    rating: 5,
    text: 'Ordered 500 visiting cards with gold foil — the quality was outstanding! Better than what I got from Delhi printers at half the price. Will definitely order again.',
    product: 'Gold Foil Visiting Cards',
  },
  {
    name: 'Priya Patel',
    location: 'Indore, MP',
    rating: 5,
    text: 'My wedding cards were absolutely stunning. The velvet touch paper with laser-cut design made every guest compliment the invitation. Thank you Ayushman team!',
    product: 'Velvet Laser-Cut Wedding Cards',
  },
  {
    name: 'Amit Jain',
    location: 'Bhopal, MP',
    rating: 4,
    text: 'Great bulk pricing for our corporate letterheads and bill books. The print quality is consistently good across all 2,000 prints. Fast delivery too.',
    product: 'Corporate Stationery Set',
  },
  {
    name: 'Sunita Meena',
    location: 'Ujjain, MP',
    rating: 5,
    text: 'The flex banner for our shop came out perfect — vibrant colors and weather-resistant material. Their Star Flex quality is top-notch at ₹18/sqft.',
    product: 'Star Flex Banner',
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        background: '#F8F9FA',
        padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
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
            What our customers say
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#6B7280' }}>
            Rated 4.8/5 by 2,000+ happy customers
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
          className="vp-review-grid"
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* Star rating */}
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < r.rating ? '#F59E0B' : '#D1D5DB', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#4B5563',
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Product tag */}
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.5rem',
                  background: '#E8F4FD',
                  borderRadius: '4px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#0B2545',
                  alignSelf: 'flex-start',
                }}
              >
                {r.product}
              </div>

              {/* Reviewer info */}
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#1E1E1E' }}>
                  {r.name}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#9CA3AF' }}>
                  {r.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .vp-review-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .vp-review-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
