'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;
  link?: string;
  buttonText?: string;
  displayOrder?: number;
  isActive?: boolean;
}

const FALLBACK_BANNERS: BannerItem[] = [
  {
    id: 'bnr-1',
    title: 'Royal Velvet Box Wedding Invitations & Farman Scrolls',
    subtitle: 'Handcrafted Padded Velvet Boxes, 3mm Acrylic Plates & Botanical Gold Wax Seals',
    badge: 'ROYAL COLLECTION 2026',
    image: '/images/wedding/scroll_royal_blue_velvet.png',
    link: '/products?category=Wedding Cards',
    buttonText: 'Explore Wedding Cards',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'bnr-2',
    title: '500 GSM Velvet Business Cards & Hot Gold Foil Finish',
    subtitle: 'Ultra Heavyweight Rigid Board, Laser Engraved Metal & Precision Spot UV Raised Texture',
    badge: 'STARTING @ ₹200',
    image: '/images/visiting_cards/black_gold.jpg',
    link: '/products?category=Business Cards',
    buttonText: 'Order Visiting Cards',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'bnr-3',
    title: 'Outdoor Heavy Duty Star Flex Banners & Roll-Up Standees',
    subtitle: 'Weatherproof 340 GSM Star Flex Material with Eyelets & Free Carry Bags',
    badge: 'COMMERCIAL PROMOTIONS',
    image: '/images/banners/outdoor_flex_banner.jpg',
    link: '/products?category=Flex Banners',
    buttonText: 'View Banners & Signs',
    displayOrder: 3,
    isActive: true,
  },
];

export default function HeroBanner() {
  const [banners, setBanners] = useState<BannerItem[]>(FALLBACK_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch('/api/banners');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.banners) && data.banners.length > 0) {
          setBanners(data.banners.filter((b: any) => b.isActive !== false));
        }
      }
    } catch (err) {
      console.warn('Hero banner load fallback:', err);
    }
  }, []);

  useEffect(() => {
    fetchBanners();

    const handleUpdate = () => fetchBanners();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ayushman_catalog_updated_at' || e.key === 'ayushman_banners_updated_at') {
        fetchBanners();
      }
    };

    window.addEventListener('bannersUpdated', handleUpdate);
    window.addEventListener('catalogUpdated', handleUpdate);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', fetchBanners);

    return () => {
      window.removeEventListener('bannersUpdated', handleUpdate);
      window.removeEventListener('catalogUpdated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', fetchBanners);
    };
  }, [fetchBanners]);

  // Auto-advance banner slides smoothly
  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (!banners || banners.length === 0) return null;

  const activeBanner = banners[currentIndex] || banners[0];
  const hasTextContent = Boolean(activeBanner.title && activeBanner.title.trim().length > 0);

  return (
    <section
      style={{
        background: '#0B2545',
        padding: 0,
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Featured Hero Banners"
    >
      <div
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          height: 'clamp(320px, 34vw, 450px)',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Banner Images Carousel (Full Width, Center-Cropped) */}
        {banners.map((banner, index) => {
          const isCurrent = index === currentIndex;
          return (
            <div
              key={banner.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isCurrent ? 1 : 0,
                transform: isCurrent ? 'scale(1)' : 'scale(1.03)',
                transition: 'opacity 0.6s ease-in-out, transform 0.75s ease-out',
                pointerEvents: isCurrent ? 'auto' : 'none',
                zIndex: isCurrent ? 1 : 0,
              }}
            >
              {/* Center-Cropped Banner Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.image}
                alt={banner.title || 'Hero Banner'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/wedding/scroll_royal_blue_velvet.png';
                }}
              />

              {/* Gradient Scrim for text readability if title exists */}
              {banner.title && banner.title.trim().length > 0 && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(90deg, rgba(11,37,69,0.92) 0%, rgba(11,37,69,0.65) 45%, rgba(11,37,69,0.15) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(11,37,69,0.85) 0%, transparent 60%)',
                    }}
                  />
                </>
              )}
            </div>
          );
        })}

        {/* If banner has text from Admin Portal, render the text overlay */}
        {hasTextContent ? (
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              maxWidth: '1440px',
              width: '100%',
              margin: '0 auto',
              padding: '0 clamp(1.25rem, 4vw, 3.5rem)',
              color: '#FFFFFF',
              animation: 'fadeInUp 0.35s ease-out',
            }}
            key={`content-${activeBanner.id}`}
          >
            <div style={{ maxWidth: '720px' }}>
              {activeBanner.badge && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(96, 181, 255, 0.2)',
                    border: '1px solid rgba(96, 181, 255, 0.5)',
                    color: '#60B5FF',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.6875rem, 0.9vw, 0.75rem)',
                    fontWeight: 800,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <span>✦</span>
                  {activeBanner.badge}
                </span>
              )}

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)',
                }}
              >
                {activeBanner.title}
              </h1>

              {activeBanner.subtitle && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                    color: 'rgba(255, 255, 255, 0.92)',
                    lineHeight: 1.45,
                    marginBottom: '1rem',
                    maxWidth: '580px',
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  }}
                >
                  {activeBanner.subtitle}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link
                  href={activeBanner.link || '/products'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1.4rem',
                    background: '#FFFFFF',
                    color: '#0B2545',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(0.78125rem, 0.9vw, 0.875rem)',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#60B5FF';
                    e.currentTarget.style.color = '#002B52';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#0B2545';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>{activeBanner.buttonText || 'Explore Now'}</span>
                  <span style={{ fontSize: '1rem' }}>→</span>
                </Link>

                <Link
                  href="/products"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.55rem 1.15rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1.5px solid rgba(255, 255, 255, 0.35)',
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(0.78125rem, 0.9vw, 0.875rem)',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  All Products Catalog
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Entire slide clickable if no text entered */
          <Link
            href={activeBanner.link || '/products'}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'block',
            }}
            aria-label={activeBanner.title || 'Promotional Banner'}
          />
        )}

        {/* Carousel Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 4,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(11, 37, 69, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(11, 37, 69, 0.95)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(11, 37, 69, 0.65)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ‹
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 4,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(11, 37, 69, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(11, 37, 69, 0.95)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(11, 37, 69, 0.65)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ›
            </button>
          </>
        )}

        {/* Carousel Slide Indicators / Dots */}
        {banners.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1.5rem',
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {banners.map((_, dotIdx) => {
              const isDotActive = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  style={{
                    width: isDotActive ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '999px',
                    background: isDotActive ? '#60B5FF' : 'rgba(255, 255, 255, 0.45)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
