'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

interface ProductItem {
  id?: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  link?: string;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    name: 'Luxury Wedding Albums',
    desc: 'Handcrafted with Italian leatherette and museum-quality pages.',
    price: 'From ₹4,500',
    image: '/images/keepsakes/film1.jpg',
    link: '/products?category=Wedding Cards',
  },
  {
    name: 'Royal Farman Scroll Cards',
    desc: 'Maharaja style white & gold royal carriage scroll invitation.',
    price: 'From ₹3,800',
    image: '/images/wedding/scroll_white_gold.png',
    link: '/products?category=Wedding Cards',
  },
  {
    name: '500 GSM Velvet Business Cards',
    desc: 'Heavyweight velvet touch cards with hot gold foil stamping.',
    price: 'From ₹480',
    image: '/images/visiting_cards/card_500gsm_velvet.jpg',
    link: '/products?category=Business Cards',
  },
  {
    name: 'Star Flex Outdoor Banners',
    desc: 'Weatherproof 340 GSM heavy duty flex banners with eyelets.',
    price: 'From ₹350',
    image: '/images/banners/outdoor_flex_banner.jpg',
    link: '/products?category=Flex Banners',
  },
  {
    name: 'Executive Bond Letterheads',
    desc: '100 GSM super white executive letterheads for corporate offices.',
    price: 'From ₹1,450',
    image: '/images/stationery/letterhead_bond.jpg',
    link: '/products?category=Office Stationery',
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [productList, setProductList] = useState<ProductItem[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            const mapped: ProductItem[] = data.products.slice(0, 5).map((p: any) => ({
              id: p.id,
              name: p.title,
              desc: p.description || p.badge || 'Premium Custom Print',
              price: p.price || `₹${p.numericPrice}`,
              image: p.image || '/images/wedding/scroll_royal_blue_velvet.png',
              link: `/products?search=${encodeURIComponent(p.title)}`,
            }));
            setProductList(mapped);
          }
        }
      } catch (err) {
        console.warn('Using default featured products:', err);
      }
    }

    loadProducts();

    const handleUpdate = () => {
      loadProducts();
    };

    window.addEventListener('catalogUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('catalogUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

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
          {productList.map((product, i) => (
            <motion.div
              key={product.name + i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card"
              style={{ cursor: 'pointer' }}
            >
              <Link href={product.link || '/products'} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
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
                    <span
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
                    </span>
                  </div>
                </div>
              </Link>
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
