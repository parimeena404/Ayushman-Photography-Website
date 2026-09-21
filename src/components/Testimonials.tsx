'use client';

import React from 'react';

interface Review {
  id: string;
  name: string;
  location: string;
  flag: string;
  regionType: 'International' | 'Pan-India' | 'Madhya Pradesh';
  rating: number;
  text: string;
  product: string;
  badge: string;
}

const reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Maya & Daniel Meier',
    location: 'Zurich, Switzerland',
    flag: '🇨🇭',
    regionType: 'International',
    rating: 5,
    text: 'We ordered 150 royal silk scroll cards with Sanskrit shlokas for our fusion wedding in Zurich. The courier took 2 extra days clearing Swiss customs, but Ayushman team tracked the parcel daily and kept us reassured. When the box arrived, the print finish and gold tassels were breathtaking!',
    product: 'Silk Scroll Invitations with Tassels',
    badge: '✓ Verified Swiss Order',
  },
  {
    id: 'rev-2',
    name: 'Vikram & Ananya Malhotra',
    location: 'Bandra, Mumbai (Maharashtra)',
    flag: '🇮🇳',
    regionType: 'Pan-India',
    rating: 5,
    text: 'Ordered from Mumbai for our destination wedding in Udaipur. The box cards with acrylic engraving and antique gold wax seal reached safely within 4 days. Exceptional luxury feel and far superior to local vendors at double the cost.',
    product: 'Royal Acrylic Box Invitations',
    badge: '✓ Verified Destination Wedding',
  },
  {
    id: 'rev-3',
    name: 'Rajiv & Simran Bains',
    location: 'Edison, New Jersey (USA)',
    flag: '🇺🇸',
    regionType: 'International',
    rating: 5,
    text: 'Was a bit nervous ordering overseas to USA. One outer transit carton had minor customs opening wear, but inside every single card box was safely sealed in waterproof bubble wrap. The 350 GSM velvet finish and gold foil embossing are truly world-class.',
    product: 'Velvet Gold Foil Box Cards',
    badge: '✓ Verified USA Export',
  },
  {
    id: 'rev-4',
    name: 'Priya & Rohan Patel',
    location: 'Indore, Madhya Pradesh',
    flag: '🇮🇳',
    regionType: 'Madhya Pradesh',
    rating: 5,
    text: 'My wedding cards were absolutely stunning. The velvet touch paper with intricate laser-cut pocket sleeve made every relative compliment the invitation. Thank you Rajesh ji and Ayushman press team!',
    product: 'Velvet Laser-Cut Wedding Cards',
    badge: '✓ Verified MP Client',
  },
  {
    id: 'rev-5',
    name: 'Kunal Singhania',
    location: 'Connaught Place, New Delhi',
    flag: '🇮🇳',
    regionType: 'Pan-India',
    rating: 4,
    text: 'Initially had a slight font doubt on the first digital proof, but their WhatsApp support adjusted the layout within 20 minutes and dispatched 3,000 sets. Delivered in Delhi in flawless condition. Reliable press team.',
    product: 'Corporate Stationery & Bill Books',
    badge: '✓ Verified Corporate Order',
  },
  {
    id: 'rev-6',
    name: 'Dr. Arvind Swaminathan',
    location: 'Indiranagar, Bengaluru (Karnataka)',
    flag: '🇮🇳',
    regionType: 'Pan-India',
    rating: 5,
    text: 'Superb 350 GSM matte texture with raised spot UV for our clinic visiting cards and prescription pads. Dispatched via express air cargo and reached Bengaluru in 48 hours in perfect condition.',
    product: 'Spot UV Visiting Cards',
    badge: '✓ Verified Medical Client',
  },
  {
    id: 'rev-7',
    name: 'Rajesh Sharma',
    location: 'Freeganj, Ujjain (MP)',
    flag: '🇮🇳',
    regionType: 'Madhya Pradesh',
    rating: 5,
    text: 'Ordered 1,000 visiting cards with gold foil — the quality was outstanding! Direct in-house press pricing without any middlemen. Ujjain’s most dependable printing studio since decades.',
    product: 'Gold Foil Visiting Cards',
    badge: '✓ Verified Local Buyer',
  },
  {
    id: 'rev-8',
    name: 'Sunita Meena',
    location: 'Ujjain, Madhya Pradesh',
    flag: '🇮🇳',
    regionType: 'Madhya Pradesh',
    rating: 5,
    text: 'The Star Flex banner and roll-up standees for our showroom opening came out vibrant and weather-resistant. Clear sharp colors and installed right on schedule.',
    product: 'Star Flex Banner & Standees',
    badge: '✓ Verified Retail Client',
  },
];

export default function Testimonials() {
  // Duplicate array for seamless infinite marquee loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section
      style={{
        background: '#F8F9FA',
        padding: 'clamp(3rem, 5vw, 4.5rem) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2.5rem)', marginBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FEF3C7', color: '#92400E', padding: '0.25rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <span>⭐ Global & Pan-India Reviews</span>
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: '#0B2545',
              marginBottom: '0.5rem',
            }}
          >
            What Our Worldwide Clients Say
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#64748B', maxWidth: '650px', margin: '0 auto' }}>
            Trusted by 5,000+ happy clients across Madhya Pradesh, Mumbai, Delhi, Bengaluru & international exports to Switzerland & USA.
          </p>
        </div>
      </div>

      {/* ═══ Continuous Moving Loop Marquee ═══ */}
      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track">
          {duplicatedReviews.map((r, index) => (
            <div
              key={`${r.id}-${index}`}
              style={{
                width: '380px',
                flexShrink: 0,
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              {/* Header: Rating & Region Flag Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < r.rating ? '#F59E0B' : '#D1D5DB', fontSize: '1.1rem' }}>
                      ★
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    background: r.regionType === 'International' ? '#EFF6FF' : '#F1F5F9',
                    color: r.regionType === 'International' ? '#1D4ED8' : '#475569',
                    border: r.regionType === 'International' ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span>{r.flag}</span>
                  <span>{r.regionType}</span>
                </span>
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#334155',
                  lineHeight: 1.6,
                  flex: 1,
                  margin: 0,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Product & Verified Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.2rem 0.5rem',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: '#0B2545',
                  }}
                >
                  📦 {r.product}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 700 }}>
                  {r.badge}
                </span>
              </div>

              {/* Reviewer Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: r.regionType === 'International' ? '#1E3A8A' : '#0B2545',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.84375rem', fontWeight: 700, color: '#0B2545' }}>
                    {r.name}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#64748B' }}>
                    {r.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
