'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    router.push('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login({ email, password });
    setIsSubmitting(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
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
            maxWidth: '480px',
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
              Welcome Back
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Client Login
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
              }}
            >
              Access your reservations, bookings & payment receipts
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
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
                Email Address
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
                Password
              </label>
              <input
                type="password"
                required
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
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Account →'}
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
              Don&rsquo;t have an account yet?{' '}
              <Link href="/signup" style={{ color: '#D40000', fontWeight: 700, textDecoration: 'none' }}>
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
