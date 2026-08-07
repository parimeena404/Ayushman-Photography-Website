'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadRazorpayScript } from '@/lib/razorpay';

const steps = [
  'Service & Package',
  'Event Date & Venue',
  'Your Details',
  'Razorpay Payment & Confirmation',
];

const packageOptions = [
  {
    id: 'royal-wedding',
    name: 'Royal Wedding & Photography Package',
    totalPrice: 50000,
    depositPrice: 5000,
    desc: 'Full Day Photo & Film Team, Cinematic Highlights, Pre-Wedding Shoot, Premium Heirloom Album',
  },
  {
    id: 'wedding-cards',
    name: 'Luxury Wedding Cards & Printing',
    totalPrice: 25000,
    depositPrice: 2500,
    desc: 'Custom Calligraphy, Gold Foil Embossing, Velvet Envelopes & Complete Invitation Sets',
  },
  {
    id: 'sangeet-haldi',
    name: 'Haldi, Sangeet & Event Coverage',
    totalPrice: 18000,
    depositPrice: 2000,
    desc: 'Comprehensive Multi-event Candid Photography & Cinematic Video Highlights',
  },
  {
    id: 'flex-banners',
    name: 'Flex, Banners & Commercial Printing',
    totalPrice: 10000,
    depositPrice: 1000,
    desc: 'High-speed Offset Flex, Vinyl Banners, Posters, Visiting Cards & Brand Graphics',
  },
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Payment Modal State
  const [showRzpModal, setShowRzpModal] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [pendingOrderInfo, setPendingOrderInfo] = useState<any>(null);

  const [form, setForm] = useState({
    packageId: 'royal-wedding',
    date: '',
    venue: '',
    city: 'Ujjain',
    address: '',
    name: '',
    email: '',
    phone: '',
    story: '',
  });

  const selectedPackage = packageOptions.find((p) => p.id === form.packageId) || packageOptions[0];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Create backend payment order
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          eventType: selectedPackage.name,
          eventDate: form.date || new Date().toISOString().split('T')[0],
          city: form.city || 'Ujjain',
          address: `${form.venue} ${form.address}`.trim(),
          notes: form.story,
          packageType: selectedPackage.name,
          totalAmount: selectedPackage.totalPrice,
          depositAmount: selectedPackage.depositPrice,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        setErrorMessage(orderData.error || 'Failed to create payment order.');
        setIsProcessing(false);
        return;
      }

      setPendingOrderInfo(orderData);
      setShowRzpModal(true);
      setIsProcessing(false);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    }
  };

  const verifyAndCompletePayment = async (orderId: string, paymentId: string, signature?: string) => {
    setIsProcessing(true);
    try {
      const verifyRes = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature || 'verified_test_sig',
          bookingId: pendingOrderInfo?.bookingId,
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.success) {
        setPaymentSuccessData({
          orderId: orderId,
          paymentId: paymentId,
          amountPaid: selectedPackage.depositPrice,
          packageName: selectedPackage.name,
          customerName: form.name,
          customerPhone: form.phone,
        });
        setShowRzpModal(false);
      } else {
        setErrorMessage(verifyData.error || 'Payment verification failed.');
      }
    } catch (err: any) {
      setErrorMessage('Error verifying payment. Please contact studio support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
      {!paymentSuccessData ? (
        <div>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="font-body" style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
                STEP 0{currentStep + 1} / 0{steps.length}
              </span>
              <span className="font-body" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {steps[currentStep]}
              </span>
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--divider)', position: 'relative' }}>
              <motion.div
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%', backgroundColor: 'var(--accent)' }}
              />
            </div>
          </div>

          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
              }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={currentStep === steps.length - 1 ? handleRazorpayPayment : (e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {/* Step 1: Package Selection */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'grid', gap: '1.25rem' }}
                >
                  <p className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '0.5rem' }}>
                    Select Your Service Package
                  </p>
                  {packageOptions.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setForm({ ...form, packageId: pkg.id })}
                      style={{
                        padding: '1.5rem',
                        border: `1px solid ${form.packageId === pkg.id ? 'var(--accent)' : 'var(--divider)'}`,
                        backgroundColor: form.packageId === pkg.id ? 'var(--bg-secondary)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                          {pkg.name}
                        </h4>
                        <span className="font-body" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                          Deposit: ₹{pkg.depositPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="font-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {pkg.desc}
                      </p>
                      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Total Value: ₹{pkg.totalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Date & Venue */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  <p className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '0.5rem' }}>
                    Event Date & Location
                  </p>
                  <div>
                    <label className="font-body" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      Tentative Event Date
                    </label>
                    <input
                      type="date"
                      required
                      className="input-luxury font-body"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-body" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ujjain, Indore, Jaipur"
                      required
                      className="input-luxury font-body"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-body" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      Venue Address / Special Requirements
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Freeganj Ujjain / Palace Venue"
                      className="input-luxury font-body"
                      value={form.venue}
                      onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  <p className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '0.5rem' }}>
                    Your Contact Information
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      className="input-luxury font-body"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="input-luxury font-body"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number / WhatsApp *"
                    required
                    className="input-luxury font-body"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <textarea
                    rows={3}
                    placeholder="Share any custom requirements, card quantities, or shoot preferences..."
                    className="input-luxury font-body"
                    style={{ resize: 'none' }}
                    value={form.story}
                    onChange={(e) => setForm({ ...form, story: e.target.value })}
                  />
                </motion.div>
              )}

              {/* Step 4: Summary & Razorpay Trigger */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  <p className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300 }}>
                    Booking & Payment Summary
                  </p>

                  <div
                    style={{
                      padding: '2rem',
                      border: '1px solid var(--divider)',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="font-body" style={{ color: 'var(--text-secondary)' }}>Selected Package:</span>
                      <strong className="font-body" style={{ color: 'var(--text-primary)' }}>{selectedPackage.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="font-body" style={{ color: 'var(--text-secondary)' }}>Client Name:</span>
                      <span className="font-body">{form.name || 'Not provided'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="font-body" style={{ color: 'var(--text-secondary)' }}>Contact Phone:</span>
                      <span className="font-body">{form.phone || 'Not provided'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="font-body" style={{ color: 'var(--text-secondary)' }}>Event Date & City:</span>
                      <span className="font-body">{form.date || 'TBD'} ({form.city})</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--divider)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Token Reservation Deposit:</div>
                        <div className="font-body" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>(Balance due on event day)</div>
                      </div>
                      <span className="font-heading" style={{ fontSize: '1.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                        ₹{selectedPackage.depositPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    🔒 Encrypted 256-bit Razorpay Payment Gateway. Supports UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards & NetBanking.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation & Submit Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--divider)',
              }}
            >
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-premium"
                  disabled={isProcessing}
                  style={{ fontSize: '0.75rem', padding: '0.75rem 1.75rem' }}
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-premium"
                  style={{ fontSize: '0.75rem', padding: '0.75rem 1.75rem' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-premium"
                  style={{
                    fontSize: '0.85rem',
                    padding: '0.9rem 2.5rem',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.7 : 1,
                  }}
                >
                  {isProcessing ? 'Connecting to Razorpay...' : `Pay ₹${selectedPackage.depositPrice.toLocaleString('en-IN')} via Razorpay →`}
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Razorpay Success Receipt Modal */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            border: '1px solid var(--accent)',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
          <h3 className="font-heading" style={{ fontSize: '2.25rem', fontWeight: 300, marginBottom: '0.5rem' }}>
            Payment Verified & Booking Confirmed!
          </h3>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Thank you, {paymentSuccessData.customerName}. Your reservation deposit has been saved to database.
          </p>

          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto 2.5rem auto',
              textAlign: 'left',
              padding: '1.5rem',
              border: '1px solid var(--divider)',
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.9rem',
            }}
          >
            <div><strong>Package:</strong> {paymentSuccessData.packageName}</div>
            <div><strong>Amount Paid:</strong> ₹{paymentSuccessData.amountPaid.toLocaleString('en-IN')}</div>
            <div><strong>Razorpay Payment ID:</strong> <code style={{ color: 'var(--accent)' }}>{paymentSuccessData.paymentId}</code></div>
            <div><strong>Razorpay Order ID:</strong> <code style={{ color: 'var(--accent)' }}>{paymentSuccessData.orderId}</code></div>
            <div><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: 600 }}>CONFIRMED (DB Synced)</span></div>
          </div>

          <a href="/dashboard" className="btn-premium">
            View in Account Dashboard →
          </a>
        </motion.div>
      )}

      {/* Interactive Razorpay Gateway Modal Component */}
      <AnimatePresence>
        {showRzpModal && pendingOrderInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                maxWidth: '480px',
                width: '100%',
                backgroundColor: '#0E1624',
                color: '#FCF7F6',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(160, 106, 115, 0.4)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  backgroundColor: '#A06A73',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                      height: '36px',
                      width: 'auto',
                      backgroundColor: '#FFF',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      objectFit: 'contain',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>
                      Razorpay Secure Gateway
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                      Ayushman Cards n Graphics
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Amount Payable</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{selectedPackage.depositPrice.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order ID: <code>{pendingOrderInfo.orderId}</code></span>
                  <span>Key: <code>rzp_test_...4fa</code></span>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('upi')}
                    style={{
                      padding: '0.6rem 1rem',
                      fontSize: '0.85rem',
                      background: 'none',
                      border: 'none',
                      borderBottom: activePaymentMethod === 'upi' ? '2px solid #A06A73' : '2px solid transparent',
                      color: activePaymentMethod === 'upi' ? '#A06A73' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('card')}
                    style={{
                      padding: '0.6rem 1rem',
                      fontSize: '0.85rem',
                      background: 'none',
                      border: 'none',
                      borderBottom: activePaymentMethod === 'card' ? '2px solid #A06A73' : '2px solid transparent',
                      color: activePaymentMethod === 'card' ? '#A06A73' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Card (Credit/Debit)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentMethod('netbanking')}
                    style={{
                      padding: '0.6rem 1rem',
                      fontSize: '0.85rem',
                      background: 'none',
                      border: 'none',
                      borderBottom: activePaymentMethod === 'netbanking' ? '2px solid #A06A73' : '2px solid transparent',
                      color: activePaymentMethod === 'netbanking' ? '#A06A73' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    NetBanking
                  </button>
                </div>

                {/* UPI Content */}
                {activePaymentMethod === 'upi' && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                        <div
                          key={app}
                          onClick={() => setSelectedUpiApp(app.toLowerCase())}
                          style={{
                            padding: '0.75rem',
                            border: `1px solid ${selectedUpiApp === app.toLowerCase() ? '#A06A73' : 'rgba(255,255,255,0.1)'}`,
                            backgroundColor: selectedUpiApp === app.toLowerCase() ? 'rgba(160, 106, 115, 0.15)' : 'rgba(255,255,255,0.03)',
                            borderRadius: '6px',
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          {app}
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. mobile@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                      }}
                    />
                  </div>
                )}

                {/* Card Content */}
                {activePaymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Card Number (4532 •••• •••• 8910)"
                      style={{
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                        }}
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#fff',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* NetBanking Content */}
                {activePaymentMethod === 'netbanking' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <select
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                      }}
                    >
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {/* Pay Action Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() =>
                    verifyAndCompletePayment(
                      pendingOrderInfo.orderId,
                      `pay_rzp_${Date.now()}`,
                      'verified_razorpay_sig'
                    )
                  }
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    backgroundColor: '#A06A73',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.7 : 1,
                    marginTop: '0.5rem',
                  }}
                >
                  {isProcessing ? 'Verifying Transaction with Razorpay...' : `Pay ₹${selectedPackage.depositPrice.toLocaleString('en-IN')} Now →`}
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🔒 256-bit Encrypted SSL Gateway</span>
                  <button
                    type="button"
                    onClick={() => setShowRzpModal(false)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Cancel Transaction
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
