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
          <div className="font-body" style={{ color: 'var(--accent)' }}>Loading your dashboard...</div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Client Portal
              </p>
              <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300 }}>
                Welcome, {user?.name}
              </h1>
              <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {user?.email} {user?.phone ? `• ${user.phone}` : ''}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/booking" className="btn-premium">
                + New Reservation
              </Link>
              <button
                onClick={() => logout()}
                className="btn-premium"
                style={{ backgroundColor: 'transparent', borderColor: 'var(--divider)' }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Bookings Section */}
          <div style={{ marginBottom: '4rem' }}>
            <h3 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '1.5rem' }}>
              Your Reservations & Orders ({bookings.length})
            </h3>

            {bookings.length > 0 ? (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    style={{
                      padding: '2rem',
                      border: '1px solid var(--divider)',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                    }}
                  >
                    <div>
                      <h4 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.25rem' }}>
                        {booking.packageType}
                      </h4>
                      <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Date: {booking.eventDate} • City: {booking.city || 'Ujjain'}
                      </p>
                      {booking.razorpayPaymentId && (
                        <p className="font-body" style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem' }}>
                          Razorpay Payment ID: <code>{booking.razorpayPaymentId}</code>
                        </p>
                      )}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 600 }}>
                        Deposit: ₹{booking.depositAmount?.toLocaleString('en-IN')}
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          marginTop: '0.5rem',
                          backgroundColor: booking.paymentStatus === 'PAID' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: booking.paymentStatus === 'PAID' ? '#10b981' : '#ef4444',
                        }}
                      >
                        {booking.paymentStatus === 'PAID' ? '✓ PAYMENT VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '3rem',
                  border: '1px border-dashed var(--divider)',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                <p className="font-body" style={{ marginBottom: '1.5rem' }}>You have no active bookings or reservations yet.</p>
                <Link href="/booking" className="btn-premium">
                  Reserve a Service Package
                </Link>
              </div>
            )}
          </div>

          {/* Inquiries Section */}
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '1.5rem' }}>
              Your Messages & Inquiries ({inquiries.length})
            </h3>

            {inquiries.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    style={{
                      padding: '1.5rem',
                      border: '1px solid var(--divider)',
                      backgroundColor: 'var(--bg-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong className="font-heading" style={{ fontSize: '1.1rem' }}>{inq.eventType}</strong>
                      <span className="font-body" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem', border: '1px solid var(--divider)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                No direct messages submitted yet.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
