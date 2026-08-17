'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function UserProfilePage() {
  const { user, refreshUser } = useAuth();

  // Profile Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI State
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress((user as any).address || '');
      setCity((user as any).city || 'Ujjain');
      setState((user as any).state || 'Madhya Pradesh');
      setPincode((user as any).pincode || '456010');
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (res.ok && data.bookings) {
        setUserBookings(data.bookings);
      }
    } catch {
      console.warn('Error fetching user bookings');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          city,
          state,
          pincode,
          newPassword: newPassword ? newPassword : undefined,
        }),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok && data.success) {
        setMessage({ text: 'Profile & preferences updated successfully!', type: 'success' });
        setNewPassword('');
        setConfirmPassword('');
        refreshUser();
      } else {
        setMessage({ text: data.error || 'Failed to update profile', type: 'error' });
      }
    } catch {
      setSaving(false);
      setMessage({ text: 'Network connection error updating profile.', type: 'error' });
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main style={{ background: '#F8F9FA', minHeight: '80vh', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '2.5rem', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.5rem' }}>
              Sign In Required
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem' }}>
              Please sign in to view and manage your account profile & shipping addresses.
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '0.8rem',
                borderRadius: '999px',
                background: '#0B2545',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              Sign In to Your Account
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8F9FA', minHeight: '90vh', padding: '2.5rem 0 4rem' }}>
        <div className="container-wide">
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span
                  style={{
                    background: user.role === 'ADMIN' ? '#0B2545' : '#E5E7EB',
                    color: user.role === 'ADMIN' ? '#FFFFFF' : '#1E1E1E',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {user.role} ACCOUNT
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>Member since {new Date(user.createdAt).getFullYear()}</span>
              </div>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#1E1E1E' }}>
                My Account Profile
              </h1>
            </div>

            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  background: '#0B2545',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.84375rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>🛡️</span> Open Admin Control Center
              </Link>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: Profile Form */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1.25rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                Personal Details & Shipping Address
              </h2>

              {message && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                    background: message.type === 'success' ? '#D1FAE5' : '#FFEBEE',
                    color: message.type === 'success' ? '#065F46' : '#C62828',
                  }}
                >
                  {message.type === 'success' ? '✓ ' : '⚠️ '}{message.text}
                </div>
              )}

              <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.84375rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                    Email Address (Account ID)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', background: '#F3F4F6', color: '#6B7280', fontSize: '0.84375rem', cursor: 'not-allowed' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9893022451"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.84375rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                    Default Street Delivery Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Shop/Office/House No., Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.84375rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>

                {/* Password Change */}
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#1E1E1E', marginTop: '1rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                  Security & Password Update
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.8125rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.8125rem' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    marginTop: '1rem',
                  }}
                >
                  {saving ? '⏳ Saving Changes...' : '💾 Save Profile Updates'}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: Recent Print Orders */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1.25rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                My Print Orders History ({userBookings.length})
              </h2>

              {userBookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#6B7280' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛍️</div>
                  <p style={{ fontSize: '0.875rem' }}>You have not placed any print orders yet.</p>
                  <Link
                    href="/products"
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      padding: '0.6rem 1.25rem',
                      borderRadius: '999px',
                      background: '#0B2545',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      textDecoration: 'none',
                    }}
                  >
                    Browse Print Products
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {userBookings.map((b) => (
                    <div key={b.id} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: 800, color: '#0B2545', fontSize: '0.875rem' }}>{b.id}</span>
                        <span
                          style={{
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            background: b.status === 'DELIVERED' ? '#D1FAE5' : b.status === 'SHIPPED' ? '#DBEAFE' : b.status === 'PRINTING' ? '#EDE9FE' : '#F3F4F6',
                            color: b.status === 'DELIVERED' ? '#065F46' : b.status === 'SHIPPED' ? '#1E40AF' : b.status === 'PRINTING' ? '#5B21B6' : '#1F2937',
                          }}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div style={{ fontWeight: 600, color: '#1E1E1E', fontSize: '0.84375rem', marginBottom: '0.25rem' }}>{b.eventType}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', color: '#6B7280' }}>
                        <span>Paid: ₹{b.totalAmount?.toLocaleString()}</span>
                        <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
