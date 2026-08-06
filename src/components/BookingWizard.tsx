'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  'Event Type',
  'Collection',
  'Event Date',
  'Venue & Location',
  'Budget Range',
  'Your Story',
];

const eventOptions = [
  { id: 'wedding', label: 'Wedding', desc: 'Full celebration coverage' },
  { id: 'pre-wedding', label: 'Pre-Wedding', desc: 'Editorial couple portrait session' },
  { id: 'destination', label: 'Destination Wedding', desc: 'International travel & celebration' },
  { id: 'engagement', label: 'Engagement', desc: 'The proposal & romantic portraits' },
  { id: 'portrait', label: 'Portrait', desc: 'Deeply personal editorial portraits' },
  { id: 'commercial', label: 'Commercial', desc: 'Brand & luxury studio imagery' },
];

const packageOptions = [
  { id: 'essential', name: 'The Essence', price: 'From ₹3,50,000', desc: '1 Day Coverage, 2 Photographers, Highlight Gallery' },
  { id: 'signature', name: 'The Signature', price: 'From ₹6,50,000', desc: '2 Days Coverage, Full Photo + Film Team, Handcrafted Album' },
  { id: 'grand', name: 'The Heirloom', price: 'Custom Quote', desc: 'Multi-Day Destination Coverage, Unlimited Hours, Drone, Albums' },
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    eventType: 'wedding',
    packageTier: 'signature',
    date: '',
    venue: '',
    budget: '₹5L – ₹10L',
    name: '',
    email: '',
    phone: '',
    story: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      {!isSubmitted ? (
        <div>
          {/* Progress Bar */}
          <div style={{ marginBottom: '3rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <span
                className="font-body"
                style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em' }}
              >
                STEP 0{currentStep + 1} / 0{steps.length}
              </span>
              <span
                className="font-body"
                style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
              >
                {steps[currentStep]}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--divider)',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                style={{
                  height: '100%',
                  backgroundColor: 'var(--accent)',
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Event Type */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300 }}
                  >
                    Select Your Occasion
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.25rem',
                    }}
                  >
                    {eventOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setForm({ ...form, eventType: opt.id })}
                        style={{
                          padding: '1.5rem',
                          border: `1px solid ${
                            form.eventType === opt.id ? 'var(--accent)' : 'var(--divider)'
                          }`,
                          backgroundColor:
                            form.eventType === opt.id ? 'rgba(191, 164, 111, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <h4
                          className="font-heading"
                          style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}
                        >
                          {opt.label}
                        </h4>
                        <p
                          className="font-body"
                          style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                        >
                          {opt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Package Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300 }}
                  >
                    Choose Your Collection
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {packageOptions.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setForm({ ...form, packageTier: pkg.id })}
                        style={{
                          padding: '1.75rem',
                          border: `1px solid ${
                            form.packageTier === pkg.id ? 'var(--accent)' : 'var(--divider)'
                          }`,
                          backgroundColor:
                            form.packageTier === pkg.id ? 'rgba(191, 164, 111, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '1rem',
                        }}
                      >
                        <div>
                          <h4 className="font-heading" style={{ fontSize: '1.35rem' }}>
                            {pkg.name}
                          </h4>
                          <p
                            className="font-body"
                            style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                          >
                            {pkg.desc}
                          </p>
                        </div>
                        <span
                          className="font-heading"
                          style={{ fontSize: '1.1rem', color: 'var(--accent)' }}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Event Date */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300 }}
                  >
                    When is Your Celebration?
                  </h3>
                  <input
                    type="date"
                    required
                    className="input-luxury font-body"
                    style={{ fontSize: '1.2rem', padding: '1rem 0' }}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </motion.div>
              )}

              {/* Step 4: Venue & Location */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300 }}
                  >
                    Venue & Location
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g., Villa La Vedetta, Florence, Italy"
                    required
                    className="input-luxury font-body"
                    style={{ fontSize: '1.1rem', padding: '1rem 0' }}
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  />
                </motion.div>
              )}

              {/* Step 5: Budget Range */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300 }}
                  >
                    Estimated Photography Budget
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {['₹3.5L – ₹5L', '₹5L – ₹10L', '₹10L – ₹15L', '₹15L+'].map((b) => (
                      <div
                        key={b}
                        onClick={() => setForm({ ...form, budget: b })}
                        style={{
                          padding: '1.25rem',
                          textAlign: 'center',
                          border: `1px solid ${
                            form.budget === b ? 'var(--accent)' : 'var(--divider)'
                          }`,
                          backgroundColor:
                            form.budget === b ? 'rgba(191, 164, 111, 0.08)' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <span className="font-body" style={{ fontSize: '0.95rem' }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 6: Contact & Story */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  <h3
                    className="font-heading"
                    style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 300 }}
                  >
                    Tell Us Your Story
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '2rem',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      className="input-luxury font-body"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="input-luxury font-body"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number / WhatsApp"
                    required
                    className="input-luxury font-body"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <textarea
                    rows={4}
                    placeholder="Share a little about how you met, your wedding style, or what matters most to you..."
                    className="input-luxury font-body"
                    style={{ resize: 'none' }}
                    value={form.story}
                    onChange={(e) => setForm({ ...form, story: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
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
                  className="btn-premium"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.85rem 2.25rem',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  Submit Inquiry
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Confirmation Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '4rem 2rem' }}
        >
          <div style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
          <h3
            className="font-heading"
            style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem' }}
          >
            Inquiry Received
          </h3>
          <p
            className="font-body"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.8,
            }}
          >
            Thank you, {form.name || 'friend'}. We have reserved your details and will be in touch
            within 24–48 hours with our comprehensive guide and custom proposal.
          </p>
          <a href="/" className="btn-premium">
            Return Home
          </a>
        </motion.div>
      )}
    </div>
  );
}
