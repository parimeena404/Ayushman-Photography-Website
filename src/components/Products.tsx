'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const products = [
  {
    name: 'Luxury Wedding Albums',
    desc: 'Handcrafted with Italian leatherette and museum-quality pages.',
    price: 'From ₹4,500',
    image: '/images/keepsakes/film1.jpg',
  },
  {
    name: 'Canvas & Board Prints',
    desc: 'Gallery-wrapped canvas prints on premium cotton fabric.',
    price: 'From ₹1,250',
    image: '/images/keepsakes/card1.png',
  },
  {
    name: 'Framed Card Keepsakes',
    desc: 'Custom-framed prints with acid-free matting and UV glass.',
    price: 'From ₹1,850',
    image: '/images/keepsakes/card2.png',
  },
  {
    name: 'Custom Photo Books',
    desc: 'Lay-flat coffee table books with custom cover designs.',
    price: 'From ₹1,850',
    image: '/images/keepsakes/card3.png',
  },
  {
    name: 'Fine Art Stationery',
    desc: 'Archival-quality prints on metallic shimmer and bond paper.',
    price: 'From ₹950',
    image: '/images/stationery/letterhead_bond.jpg',
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="products" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-wide">
        <SectionHeader
          eyebrow="Print Crafts"
          title="Custom Card & Printed Products"
          subtitle="Explore high-quality card boards, gold foil stamping, flex banners, and customized printed merchandise."
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card"
              style={{ cursor: 'pointer' }}
            >
              <div style={{ overflow: 'hidden', aspectRatio: '1/1' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                  }}
                  className="product-img"
                />
              </div>
              <div style={{ padding: 'clamp(0.875rem, 1.5vw, 1.25rem)' }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    lineHeight: 1.5,
                    marginBottom: '0.75rem',
                  }}
                >
                  {product.desc}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--gold)',
                    }}
                  >
                    {product.price}
                  </span>
                  <Link
                    href="/booking"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .card:hover .product-img { transform: scale(1.06); }

        @media (max-width: 1024px) {
          #products .container-wide > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #products .container-wide > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
