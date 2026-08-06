'use client';

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SubmitReviewPage() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'Wedding',
    date: '',
    venue: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              Your Words
            </p>
            <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, marginBottom: '1rem' }}>
              Share Your Experience
            </h1>
            <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
              We are deeply honored to have documented your story. Your review helps future couples understand what it feels like to work with us.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Star Rating Picker */}
              <div style={{ textAlign: 'center' }}>
                <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Overall Rating
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '2rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{ color: star <= rating ? 'var(--accent)' : 'var(--divider)', transition: 'color 0.2s' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                <input
                  type="text"
                  placeholder="Your Name(s)"
                  required
                  className="input-luxury font-body"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="input-luxury font-body"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }} className="form-row-3">
                <select
                  className="input-luxury font-body"
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Destination">Destination</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Portrait">Portrait</option>
                </select>
                <input
                  type="text"
                  placeholder="Wedding Date"
                  className="input-luxury font-body"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Venue & City"
                  className="input-luxury font-body"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                />
              </div>

              <textarea
                rows={5}
                placeholder="Share your thoughts about your experience with Lumière Studio..."
                required
                className="input-luxury font-body"
                style={{ resize: 'none' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              {/* Photo Upload Placeholder */}
              <div>
                <label className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                  Upload Couple Photo (Optional)
                </label>
                <input type="file" accept="image/*" className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} />
              </div>

              {/* Consent Checkbox */}
              <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  I agree to have my review and details published on the Lumière Studio website upon curation.
                </span>
              </label>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button type="submit" className="btn-premium">
                  Submit Review
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ color: 'var(--accent)', fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
              <h3 className="font-heading" style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
                Thank You for Your Words
              </h3>
              <p className="font-body" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Your review has been submitted to our curation team and will be displayed on our studio review page shortly.
              </p>
              <a href="/reviews" className="btn-premium">
                View All Reviews
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .form-row, .form-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </PageTransition>
  );
}
