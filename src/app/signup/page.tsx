'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signup, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await signup({ name, email, phone, password });
    setIsSubmitting(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <div
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8rem',
          paddingBottom: '6rem',
          backgroundColor: 'var(--bg-primary)',
        }}
        className="section-padding"
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-medium)',
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-elevated)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Ayushman Cards n Graphics Logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                margin: '0 auto 1.25rem auto',
                backgroundColor: '#FFF',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'block',
              }}
            />
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#D40000',
                fontWeight: 800,
                marginBottom: '0.5rem',
              }}
            >
              Create Account
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Join Ayushman Studio
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
              }}
            >
              Manage wedding invitations, reservations & order graphics
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(212, 0, 0, 0.1)',
                border: '1px solid rgba(212, 0, 0, 0.3)',
                color: '#D40000',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                marginBottom: '1.75rem',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Kumar"
                className="input-luxury"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                className="input-luxury"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+91 94797 84979"
                className="input-luxury"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Password (min. 6 characters) *
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="input-luxury"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-premium"
              style={{
                width: '100%',
                padding: '0.9rem',
                marginTop: '1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account & Continue →'}
            </button>

            <div
              style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#D40000', fontWeight: 700, textDecoration: 'none' }}>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
