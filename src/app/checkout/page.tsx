'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { loadRazorpayScript } from '@/lib/razorpay';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, grandTotal, subtotal, discountAmount, gstAmount, shippingFee, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Shipping Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Ujjain');
  const [state, setState] = useState('Madhya Pradesh');
  const [pincode, setPincode] = useState('');
  const [gstin, setGstin] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successOrder, setSuccessOrder] = useState<any>(null);

  const finalTotal = grandTotal + (deliverySpeed === 'express' ? 250 : 0);

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      setErrorMsg('Please fill in your name, mobile number, address, and pincode.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      // 1. Load Razorpay JS SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 2. Create Order on Backend API
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email || 'customer@ayushmancards.com',
          customerPhone: phone,
          eventType: cart.map((i) => i.title).join(', '),
          eventDate: new Date().toISOString().split('T')[0],
          city: `${city}, ${state} (${pincode})`,
          address: `${address} ${gstin ? `[GSTIN: ${gstin}]` : ''}`,
          notes: notes || `Items: ${cart.length} print job(s)`,
          packageType: cart[0]?.category || 'Custom Print Job',
          totalAmount: finalTotal,
          depositAmount: finalTotal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize payment.');
      }

      // 3. Launch Razorpay Payment Portal Modal
      const options = {
        key: data.keyId || 'rzp_test_TMSAlhSBWAt4fa',
        amount: data.amount,
        currency: 'INR',
        name: 'Ayushman Cards & Graphics Press',
        description: `Custom Print Order - ${cart.length} item(s)`,
        order_id: data.orderId,
        handler: async function (response: any) {
          // Verify payment on backend
          try {
            await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id || data.orderId,
                razorpayPaymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpaySignature: response.razorpay_signature || 'sandbox_sig',
              }),
            });
          } catch (e) {
            console.warn('Payment verification logged:', e);
          }

          setSuccessOrder({
            orderId: data.orderId,
            paymentId: response.razorpay_payment_id || `PAY_${Date.now()}`,
            amount: finalTotal,
          });

          clearCart();
        },
        prefill: {
          name: fullName,
          email: email || 'customer@ayushmancards.com',
          contact: phone,
        },
        theme: {
          color: '#D40000',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.on('payment.failed', function (response: any) {
        setErrorMsg(`Payment failed: ${response.error?.description || 'Transaction cancelled.'}`);
        setLoading(false);
      });

      paymentObject.open();
      setLoading(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment initiation error.');
      setLoading(false);
    }
  };

  const handleDirectWhatsAppOrder = () => {
    if (!fullName || !phone) {
      setErrorMsg('Please provide your name and phone number for WhatsApp confirmation.');
      return;
    }

    const itemsSummary = cart.map((i) => `• ${i.title} (${i.quantity} units, ${i.paperStock}) = ₹${i.totalPrice}`).join('\n');
    const msg = `Hi Ayushman Cards!\nI want to place an order:\n\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Address:* ${address}, ${city} - ${pincode}\n\n*Order Items:*\n${itemsSummary}\n\n*Total Amount:* ₹${finalTotal.toLocaleString()}`;
    
    window.open(`https://wa.me/919479784979?text=${encodeURIComponent(msg)}`, '_blank');
    clearCart();
    setSuccessOrder({ orderId: `WA_${Date.now()}`, paymentId: 'WHATSAPP_CONFIRMED', amount: finalTotal });
  };

  if (successOrder) {
    return (
      <>
        <Navbar />
        <main style={{ background: 'var(--bg-primary)', minHeight: '80vh', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '3rem 2rem', maxWidth: '550px', textAlign: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.15)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#2E7D32', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>
              ✓
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Print Order Successfully Placed!
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>
              Thank you, <strong>{fullName}</strong>! Our printing studio has received your artwork details and order specs.
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Order Reference:</span>
                <span style={{ fontWeight: 800, color: '#D40000' }}>{successOrder.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Payment Txn ID:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{successOrder.paymentId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Amount Paid:</span>
                <span style={{ fontWeight: 800, color: '#2E7D32' }}>₹{successOrder.amount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link
                href="/dashboard"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  background: '#D40000',
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Track Order Status
              </Link>
              <Link
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--bg-primary)', minHeight: '90vh', padding: '2.5rem 0 4rem' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Secure Print Checkout
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
              Enter delivery shipping details & select Razorpay online payment or WhatsApp order confirmation.
            </p>
          </div>

          <form onSubmit={handleRazorpayPayment}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              
              {/* LEFT COLUMN: Shipping & Delivery Form */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '1.5rem', boxShadow: 'var(--shadow-subtle)' }}>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  1. Shipping & Contact Information
                </h2>

                {errorMsg && (
                  <div style={{ padding: '0.75rem 1rem', background: '#FFEBEE', color: '#C62828', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.84375rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9893022451"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.84375rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    Email Address (for Digital Tax Invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.84375rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    Street Address / Delivery Location *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Shop/Office/House No., Building Name, Street & Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.84375rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8125rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8125rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="456010"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    GSTIN Number (Optional for B2B Input Tax Claim)
                  </label>
                  <input
                    type="text"
                    placeholder="23AAAAA0000A1Z5"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.8125rem', textTransform: 'uppercase' }}
                  />
                </div>

                {/* 2. Delivery Options */}
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  2. Select Delivery Turnaround
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('standard')}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: deliverySpeed === 'standard' ? '2px solid #D40000' : '1px solid var(--border-medium)',
                      background: deliverySpeed === 'standard' ? 'rgba(212,0,0,0.04)' : 'var(--bg-secondary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                        🚚 Standard Delivery (3-5 Business Days)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Quality inspection & standard surface courier
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, color: '#2E7D32', fontSize: '0.84375rem' }}>FREE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('express')}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: deliverySpeed === 'express' ? '2px solid #D40000' : '1px solid var(--border-medium)',
                      background: deliverySpeed === 'express' ? 'rgba(212,0,0,0.04)' : 'var(--bg-secondary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                        ⚡ Express Priority Rush Delivery (24-48 Hours)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Same-day press priority & air express dispatch
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, color: '#D40000', fontSize: '0.84375rem' }}>+ ₹250</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Order Breakdown & Payment Buttons */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)', padding: '1.5rem', boxShadow: 'var(--shadow-subtle)', position: 'sticky', top: '140px' }}>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  Payment & Final Total
                </h2>

                <div style={{ marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Items in Order:</div>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                      <span>{item.quantity}x {item.title.substring(0, 25)}...</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2E7D32' }}>
                      <span>Discount:</span>
                      <span>- ₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST (18%):</span>
                    <span>₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping:</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  {deliverySpeed === 'express' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D40000' }}>
                      <span>Express Priority Fee:</span>
                      <span>+ ₹250</span>
                    </div>
                  )}
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Payable Amount:</span>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#D40000' }}>
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, #D40000 0%, #990000 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.9375rem',
                      fontWeight: 800,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 14px rgba(212, 0, 0, 0.3)',
                    }}
                  >
                    {loading ? '⏳ Launching Razorpay Portal...' : '💳 Pay Now via Razorpay (UPI/Card)'}
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectWhatsAppOrder}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '999px',
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.84375rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>💬 Direct WhatsApp Order & Pay</span>
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
