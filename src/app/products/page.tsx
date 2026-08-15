'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import ProductModal, { ProductModalItem } from '@/components/ProductModal';

interface ProductCatalogItem {
  id: string;
  customizerId: string;
  title: string;
  category: string;
  badge: string;
  price: string;
  numericPrice: number;
  unit: string;
  image: string;
  description: string;
}

const CATALOG_ITEMS: ProductCatalogItem[] = [
  // 1. Business Cards
  {
    id: 'vc-1',
    customizerId: 'visiting-card',
    title: '350 GSM Velvet Touch Visiting Cards with Gold Foil Stamping',
    category: 'Business Cards',
    badge: '500 PCS @ ₹1,250',
    price: '₹1,250',
    numericPrice: 1250,
    unit: '500 Cards',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    description: 'Ultra luxury velvet touch cards with real metallic gold foil embossing.',
  },
  {
    id: 'vc-2',
    customizerId: 'visiting-card',
    title: '300 GSM Matte Laminated Premium Business Cards',
    category: 'Business Cards',
    badge: '500 PCS @ ₹950',
    price: '₹950',
    numericPrice: 950,
    unit: '500 Cards',
    image: 'https://images.unsplash.com/photo-1572502643806-0bc1ef1ee24c?w=600&q=80',
    description: 'Smooth matte finish cards ideal for corporate branding & executives.',
  },
  {
    id: 'vc-3',
    customizerId: 'visiting-card',
    title: 'Non-Tearable Plastic Waterproof Business Cards',
    category: 'Business Cards',
    badge: '250 PCS @ ₹1,450',
    price: '₹1,450',
    numericPrice: 1450,
    unit: '250 Plastic Cards',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    description: '100% waterproof synthetic plastic cards that never tear or fade.',
  },
  {
    id: 'vc-4',
    customizerId: 'visiting-card',
    title: 'Spot UV Coating Executive Business Cards',
    category: 'Business Cards',
    badge: '500 PCS @ ₹1,550',
    price: '₹1,550',
    numericPrice: 1550,
    unit: '500 Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    description: 'Raised high-gloss glossy spot UV highlighting logo and business details.',
  },

  // 2. Wedding Cards
  {
    id: 'wed-1',
    customizerId: 'wedding-card',
    title: 'Royal Velvet & Gold Foil Laser Cut Wedding Card Box',
    category: 'Wedding Cards',
    badge: '100 PCS @ ₹4,500',
    price: '₹4,500',
    numericPrice: 4500,
    unit: '100 Box Cards',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    description: 'Traditional Indian wedding box card with embossed gold foil and velvet cover.',
  },
  {
    id: 'wed-2',
    customizerId: 'wedding-card',
    title: 'Premium Clear Acrylic Wedding Invitation Card with Wax Seal',
    category: 'Wedding Cards',
    badge: '100 PCS @ ₹6,500',
    price: '₹6,500',
    numericPrice: 6500,
    unit: '100 Acrylic Cards',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    description: '3mm thick crystal clear acrylic sheet printed with metallic gold UV inks.',
  },
  {
    id: 'wed-3',
    customizerId: 'wedding-card',
    title: 'Traditional Royal Farman Scroll Wedding Invitation',
    category: 'Wedding Cards',
    badge: '100 PCS @ ₹3,800',
    price: '₹3,800',
    numericPrice: 3800,
    unit: '100 Scroll Cards',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    description: 'Authentic royal scroll card in metallic tube casing for grand wedding invitations.',
  },

  // 3. Flex Banners
  {
    id: 'flex-1',
    customizerId: 'flex-banner',
    title: 'Outdoor Heavy Duty Star Flex Banner Printing',
    category: 'Flex Banners',
    badge: 'START @ ₹18 / sq ft',
    price: '₹1,800',
    numericPrice: 1800,
    unit: '100 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=600&q=80',
    description: 'High-density 340 GSM Star Flex banner for shop hoardings and events.',
  },
  {
    id: 'flex-2',
    customizerId: 'flex-banner',
    title: 'Roll-up Promotional Display Standee (6x3 Feet Frame Included)',
    category: 'Flex Banners',
    badge: '1 SET @ ₹1,450',
    price: '₹1,450',
    numericPrice: 1450,
    unit: 'Complete Standee Set',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
    description: 'Portable aluminum roll-up standee frame with high resolution Star Flex print.',
  },

  // 4. Photobooks
  {
    id: 'pb-1',
    customizerId: 'photobook',
    title: 'HD Flush Mount Wedding Photobook Album (30 Pages Silk Sheet)',
    category: 'Photobooks',
    badge: '30 PAGES @ ₹4,500',
    price: '₹4,500',
    numericPrice: 4500,
    unit: '30 Page HD Album',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    description: 'Seamless lay-flat photobook album with non-tearable silk sheets and briefcase box.',
  },

  // 5. Custom Gifts
  {
    id: 'mug-1',
    customizerId: 'custom-mug',
    title: 'Custom Printed Ceramic Magic Photo Mug (Heat Sensitive)',
    category: 'Custom Gifts',
    badge: 'BUY 10 @ ₹1,800',
    price: '₹1,800',
    numericPrice: 1800,
    unit: '10 Magic Mugs',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    description: 'Black ceramic mug that reveals your photo when filled with hot coffee or tea.',
  },
  {
    id: 'tshirt-1',
    customizerId: 'custom-tshirt',
    title: 'Custom Embroidered Corporate Polo T-Shirts',
    category: 'Custom Gifts',
    badge: 'BUY 5 @ ₹1,750',
    price: '₹1,750',
    numericPrice: 1750,
    unit: '5 Polo T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80',
    description: '220 GSM 100% combed cotton polo with custom business logo embroidery.',
  },
];

const CATEGORIES = [
  'All Products',
  'Business Cards',
  'Wedding Cards',
  'Flex Banners',
  'Photobooks',
  'Custom Gifts',
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModalItem | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (catParam) {
      const match = CATEGORIES.find((c) => c.toLowerCase() === catParam.toLowerCase());
      if (match) {
        setSelectedCategory(match);
      }
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [catParam, searchParam]);

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All Products' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (item: ProductCatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: item.customizerId,
      title: item.title,
      category: item.category,
      paperStock: 'Standard Premium Stock',
      cornerStyle: 'Standard Square Cut',
      finishOption: 'Matte Lamination',
      quantity: 500,
      unitPrice: Math.round(item.numericPrice / 500),
      totalPrice: item.numericPrice,
      image: item.image,
    });

    setToastMessage(`✓ Added "${item.title.substring(0, 25)}..." to Cart! Choose more items.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main style={{ background: '#F8F9FA', minHeight: '90vh', padding: '2.5rem 0 4rem' }}>
      <div className="container-wide">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 9999,
              background: '#10B981',
              color: '#FFFFFF',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            {toastMessage}
          </div>
        )}

        {/* Catalog Title Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0B2545', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Full Printing Catalog
          </span>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1E1E1E', margin: '0.35rem 0' }}>
            Explore & Select Custom Print Products
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.5 }}>
            Click any product below to customize paper GSM, finishes, and quantities. Add multiple items to your cart and checkout whenever ready.
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Search Input */}
          <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <input
              type="text"
              placeholder="Search business cards, wedding cards, flex banners, mugs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                borderRadius: '999px',
                border: '1.5px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#1E1E1E',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '999px',
                  border: selectedCategory === cat ? '2px solid #0B2545' : '1px solid #E5E7EB',
                  background: selectedCategory === cat ? '#0B2545' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct({ id: item.id, name: item.title, image: item.image, badge: item.badge, price: item.price, unit: item.unit, category: item.category })}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
            >
              <div>
                {/* Product Image & Badge */}
                <div style={{ position: 'relative', aspectRatio: '1.3 / 1', overflow: 'hidden', background: '#F8F9FA' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.6rem',
                      left: '0.6rem',
                      background: '#B2E4F7',
                      color: '#0B2545',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.15rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0B2545', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: '#1E1E1E', margin: '0.35rem 0 0.5rem', lineHeight: 1.4, height: '2.7em', overflow: 'hidden' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.78125rem', color: '#6B7280', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #E5E7EB', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{item.unit}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: '#0B2545' }}>{item.price}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div style={{ padding: '0 1.15rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ⚙️ Select & Customize Options
                </button>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(item, e)}
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: '999px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#1E1E1E',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  🛒 Quick Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '80vh', padding: '4rem', textAlign: 'center' }}>Loading Catalog...</div>}>
        <CatalogContent />
      </Suspense>
      <Footer />
    </>
  );
}
