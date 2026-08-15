'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setBookings(data.bookings || []);
            setInquiries(data.inquiries || []);
          }
        })
        .finally(() => setFetchingData(false));
    }
  }, [user, loading, router]);

  if (loading || fetchingData) {
    return (
      <PageTransition>
        <Navbar />
        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '8rem' }}>
          <div style={{ color: '#D40000', fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>
            Loading your print dashboard...
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '2.5rem', paddingBottom: '6rem', background: 'var(--bg-primary)', minHeight: '90vh' }}>
        <div className="container-wide">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem', background: 'var(--bg-card)', padding: '1.5rem 2rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D40000', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Client Print Portal
              </span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                Welcome, {user?.name}
              </h1>
              <p style={{ fontSize: '0.84375rem', color: 'var(--text-tertiary)' }}>
                {user?.email} {user?.phone ? `• ${user.phone}` : ''}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link
                href="/products"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #D40000 0%, #990000 100%)',
                  color: '#FFFFFF',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                + New Custom Print Order
              </Link>
              <button
                onClick={() => logout()}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Print Orders & Live Tracking Pipeline */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Your Active Print Orders & Live Tracking ({bookings.length})
            </h2>

            {bookings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#D40000', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Ref: {b.razorpayOrderId || b.id}
                        </span>
                        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                          {b.packageType || b.eventType}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                          Placed on: {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Destination: {b.city || 'Ujjain'}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '1.35rem', fontWeight: 800, color: '#D40000' }}>
                          ₹{(b.totalAmount || b.depositAmount)?.toLocaleString('en-IN')}
                        </div>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            marginTop: '0.35rem',
                            backgroundColor: b.paymentStatus === 'PAID' ? 'rgba(46, 125, 50, 0.12)' : 'rgba(212, 0, 0, 0.12)',
                            color: b.paymentStatus === 'PAID' ? '#2E7D32' : '#D40000',
                          }}
                        >
                          {b.paymentStatus === 'PAID' ? '✓ PAYMENT VERIFIED' : 'PENDING APPROVAL'}
                        </span>
                      </div>
                    </div>

                    {/* Vistaprint 5-Stage Visual Progress Bar */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                        Print Production & Dispatch Stage:
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                        {[
                          { title: 'Order Placed', icon: '📝', active: true },
                          { title: 'Proof Approved', icon: '🔍', active: true },
                          { title: 'Offset Press', icon: '🖨️', active: true },
                          { title: 'Lamination', icon: '✂️', active: b.paymentStatus === 'PAID' },
                          { title: 'Dispatched', icon: '🚚', active: false },
                        ].map((stage, idx) => (
                          <div
                            key={stage.title}
                            style={{
                              padding: '0.6rem 0.25rem',
                              borderRadius: '6px',
                              border: stage.active ? '1.5px solid #2E7D32' : '1px solid var(--border-medium)',
                              background: stage.active ? 'rgba(46, 125, 50, 0.08)' : 'var(--bg-secondary)',
                              color: stage.active ? '#2E7D32' : 'var(--text-tertiary)',
                            }}
                          >
                            <div style={{ fontSize: '1.1rem' }}>{stage.icon}</div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, marginTop: '0.25rem' }}>
                              {idx + 1}. {stage.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Re-order & WhatsApp Support */}
                    <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link
                        href="/products"
                        style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#D40000', textDecoration: 'none' }}
                      >
                        🔄 Re-order This Print Design
                      </Link>
                      <a
                        href={`https://wa.me/919479784979?text=Hi!%20Inquiry%20regarding%20my%20order%20ref:%20${b.razorpayOrderId || b.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#25D366', textDecoration: 'none' }}
                      >
                        💬 Chat with Press Manager
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '3.5rem 2rem',
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  textAlign: 'center',
                  color: 'var(--text-tertiary)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖨️</div>
                <p style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You have no active custom print orders yet.</p>
                <Link
                  href="/products"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '999px',
                    background: '#D40000',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.84375rem',
                    textDecoration: 'none',
                  }}
                >
                  Explore Products & Customize Online
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
