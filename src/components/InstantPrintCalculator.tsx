'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductPreset {
  id: string;
  name: string;
  category: string;
  icon: string;
  baseUnitPrice: number;
  minQty: number;
  availableFinishes: { label: string; extraCostPerUnit: number }[];
  paperOptions: string[];
}

const productPresets: ProductPreset[] = [
  {
    id: 'visiting-card',
    name: 'Business & Visiting Cards',
    category: 'Corporate Stationery',
    icon: '💼',
    baseUnitPrice: 2.5,
    minQty: 100,
    availableFinishes: [
      { label: 'Standard Matte', extraCostPerUnit: 0 },
      { label: 'Gloss Lamination', extraCostPerUnit: 0.5 },
      { label: 'Velvet Touch', extraCostPerUnit: 1.2 },
      { label: 'Gold Foil Stamping', extraCostPerUnit: 2.5 },
      { label: '3D Raised Spot UV', extraCostPerUnit: 3.0 },
    ],
    paperOptions: ['300 GSM Art Card', '350 GSM Heavy Board', '400 GSM Cotton Paper', 'Transparent PVC Plastic'],
  },
  {
    id: 'wedding-card',
    name: 'Royal Wedding & Invitation Cards',
    category: 'Ceremonial Invitations',
    icon: '💍',
    baseUnitPrice: 35,
    minQty: 100,
    availableFinishes: [
      { label: 'Embroidery & Tassel Finish', extraCostPerUnit: 5 },
      { label: 'Royal Metallic Gold Foil', extraCostPerUnit: 12 },
      { label: 'Laser Cut Acrylic Box', extraCostPerUnit: 45 },
      { label: 'Wax Seal & Custom Envelope', extraCostPerUnit: 15 },
    ],
    paperOptions: ['Imported Metallic Board', 'Handmade Velvet Board', 'Clear Acrylic Sheet', 'Royal Texture Card'],
  },
  {
    id: 'flex-banner',
    name: 'Large Format Flex & Signage',
    category: 'Outdoor & Events',
    icon: '🚩',
    baseUnitPrice: 12, // per sq ft
    minQty: 20, // sq ft
    availableFinishes: [
      { label: 'Standard Flex (240 GSM)', extraCostPerUnit: 0 },
      { label: 'Heavy Duty Star Flex (340 GSM)', extraCostPerUnit: 6 },
      { label: 'Gloss Backlit Flex', extraCostPerUnit: 10 },
      { label: 'Self-Adhesive Vinyl Sticker', extraCostPerUnit: 18 },
    ],
    paperOptions: ['Frontlit Flex Banner', 'Star Flex Heavy Duty', 'Backlit Glow Sign', 'Vinyl Banner'],
  },
  {
    id: 'pamphlet',
    name: 'Flyers & Promotional Pamphlets',
    category: 'Marketing Materials',
    icon: '📄',
    baseUnitPrice: 1.8,
    minQty: 500,
    availableFinishes: [
      { label: 'Uncoated Standard', extraCostPerUnit: 0 },
      { label: 'Gloss Varnish', extraCostPerUnit: 0.4 },
      { label: 'Bi-fold / Tri-fold Crease', extraCostPerUnit: 0.6 },
    ],
    paperOptions: ['130 GSM Gloss Art Paper', '170 GSM Premium Paper', '90 GSM Maplitho Paper'],
  },
  {
    id: 'photobook',
    name: 'HD Photobook / Wedding Album',
    category: 'Albums & Keepsakes',
    icon: '📖',
    baseUnitPrice: 180, // per page
    minQty: 20, // pages
    availableFinishes: [
      { label: 'Leatherette Hardcover Box', extraCostPerUnit: 800 },
      { label: 'Acrylic Glass Cover', extraCostPerUnit: 1500 },
      { label: 'Velvet Soft Touch Box', extraCostPerUnit: 1000 },
    ],
    paperOptions: ['Fuji HD Metallic Paper', 'Luster Non-Tearable Sheet', 'Silk Matte Album Paper'],
  },
];

export default function InstantPrintCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<string>('visiting-card');
  const [quantity, setQuantity] = useState<number>(500);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState<number>(0);
  const [selectedPaperIndex, setSelectedPaperIndex] = useState<number>(0);

  const selectedProduct = productPresets.find((p) => p.id === selectedProductId) || productPresets[0];

  // Price Calculation Logic with Tiered Quantity Discounts
  const calculateEstimate = () => {
    const finishCost = selectedProduct.availableFinishes[selectedFinishIndex]?.extraCostPerUnit || 0;
    const basePerUnit = selectedProduct.baseUnitPrice + finishCost;

    let discountTier = 1.0;
    if (quantity >= 5000) discountTier = 0.65; // 35% bulk discount
    else if (quantity >= 2000) discountTier = 0.75; // 25% bulk discount
    else if (quantity >= 1000) discountTier = 0.85; // 15% bulk discount
    else if (quantity >= 500) discountTier = 0.92; // 8% bulk discount

    const unitPrice = Math.max(0.5, Math.round(basePerUnit * discountTier * 100) / 100);
    const totalPrice = Math.round(unitPrice * quantity);

    return { unitPrice, totalPrice, discountTier: Math.round((1 - discountTier) * 100) };
  };

  const estimate = calculateEstimate();

  return (
    <section
      id="calculator"
      style={{
        padding: '5rem 1.5rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#D40000',
              marginBottom: '0.5rem',
            }}
          >
            ⚡ INSTANT PRINT PRICING ESTIMATOR
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}
          >
            Calculate Your Print Order Price
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Transparent bulk pricing for Ayushman Cards & Graphics offset press, visiting cards, flex banners, and wedding invitations.
          </p>
        </div>

        {/* Calculator Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            border: '1px solid var(--border-medium)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
          }}
        >
          {/* Left Column: Product & Specs Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Step 1: Select Product */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                }}
              >
                1. Select Print Product
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
                {productPresets.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setQuantity(prod.minQty);
                        setSelectedFinishIndex(0);
                        setSelectedPaperIndex(0);
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.4rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #D40000' : '1px solid var(--border-medium)',
                        background: isSelected ? 'rgba(212, 0, 0, 0.05)' : 'var(--bg-secondary)',
                        color: isSelected ? '#D40000' : 'var(--text-primary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{prod.icon}</span>
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8125rem', fontWeight: 700 }}>
                        {prod.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Paper Stock */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                }}
              >
                2. Paper & Board Material
              </label>
              <select
                value={selectedPaperIndex}
                onChange={(e) => setSelectedPaperIndex(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--border-medium)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              >
                {selectedProduct.paperOptions.map((paper, idx) => (
                  <option key={idx} value={idx}>
                    {paper}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Finish & Lamination */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                }}
              >
                3. Premium Finish & Coating
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                {selectedProduct.availableFinishes.map((finish, idx) => {
                  const isSelected = idx === selectedFinishIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedFinishIndex(idx)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: isSelected ? '1.5px solid #D40000' : '1px solid var(--border-light)',
                        background: isSelected ? '#D40000' : 'var(--bg-secondary)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.78125rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {finish.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Quantity Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  4. Quantity Units
                </label>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#D40000',
                  }}
                >
                  {quantity.toLocaleString()} {selectedProduct.id === 'flex-banner' ? 'sq. ft.' : selectedProduct.id === 'photobook' ? 'pages' : 'pcs'}
                </span>
              </div>

              {/* Quantity Preset Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {[100, 250, 500, 1000, 2500, 5000].map((presetQty) => (
                  <button
                    key={presetQty}
                    onClick={() => setQuantity(presetQty)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: quantity === presetQty ? '1.5px solid #D40000' : '1px solid var(--border-light)',
                      background: quantity === presetQty ? 'rgba(212,0,0,0.1)' : 'transparent',
                      color: quantity === presetQty ? '#D40000' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {presetQty}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={selectedProduct.minQty}
                max={10000}
                step={50}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D40000' }}
              />
            </div>
          </div>

          {/* Right Column: Price Summary Box */}
          <div
            style={{
              background: 'linear-gradient(145deg, #1A1A1A 0%, #0F0F0F 100%)',
              borderRadius: '20px',
              padding: '2rem',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#FFD700',
                  fontWeight: 800,
                  marginBottom: '1rem',
                }}
              >
                ESTIMATED PRICE BREAKDOWN
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {selectedProduct.name}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                {selectedProduct.paperOptions[selectedPaperIndex]} — {selectedProduct.availableFinishes[selectedFinishIndex]?.label}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Selected Quantity</span>
                  <span style={{ fontWeight: 700 }}>{quantity.toLocaleString()} units</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Est. Rate per Unit</span>
                  <span style={{ fontWeight: 700 }}>₹{estimate.unitPrice}</span>
                </div>

                {estimate.discountTier > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#4ADE80' }}>
                    <span>Bulk Printing Savings</span>
                    <span style={{ fontWeight: 700 }}>{estimate.discountTier}% OFF</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Total Estimated Price</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '2.25rem', fontWeight: 800, color: '#FFD700' }}>
                    ₹{estimate.totalPrice.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>*Excl. GST & Delivery</div>
                </div>
              </div>

              <Link
                href={`/booking?product=${encodeURIComponent(selectedProduct.name)}&qty=${quantity}&price=${estimate.totalPrice}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #D40000 0%, #990000 100%)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(212,0,0,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                Place Order / Request Quotation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
