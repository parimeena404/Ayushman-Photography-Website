'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminPortalPage() {
  const { user, login } = useAuth();

  // Admin Login State (if not logged in as admin)
  const [adminEmail, setAdminEmail] = useState('admin@ayushmancards.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data State
  const [orders, setOrders] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, paidOrders: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'analytics'>('orders');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Add User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'CLIENT', phone: '' });

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/users'),
      ]);

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        if (ordersData.success) {
          setOrders(ordersData.orders || []);
          setStats(ordersData.stats || {});
        }
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        if (usersData.success) {
          setUsersList(usersData.users || []);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchAdminData();
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const result = await login({ email: adminEmail, password: adminPassword });
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(result.error || 'Admin login failed. Invalid credentials.');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string, paymentStatus?: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus, paymentStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice(`Order ${orderId.substring(0, 10)}... status updated to "${newStatus}"!`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to update order');
      }
    } catch {
      alert('Network error updating order');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice(`Order ${orderId} deleted.`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchAdminData();
      }
    } catch {
      alert('Error deleting order');
    }
  };

  const handleToggleUserRole = async (targetUser: any) => {
    const nextRole = targetUser.role === 'ADMIN' ? 'CLIENT' : 'ADMIN';
    if (!confirm(`Change role of ${targetUser.name} to ${nextRole}?`)) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: targetUser.id, role: nextRole }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice(`User ${targetUser.name} is now ${nextRole}!`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchAdminData();
      }
    } catch {
      alert('Error updating user role');
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionNotice(`User ${newUser.name} created!`);
        setShowAddUserModal(false);
        setNewUser({ name: '', email: '', password: '', role: 'CLIENT', phone: '' });
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to create user');
      }
    } catch {
      alert('Error creating user');
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter || o.paymentStatus === statusFilter;
    const matchesSearch =
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone?.includes(searchQuery) ||
      o.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.eventType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filter Users
  const filteredUsers = usersList.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery)
  );

  // If NOT ADMIN, render Admin Login Guard
  if (!user || user.role !== 'ADMIN') {
    return (
      <>
        <Navbar />
        <main style={{ background: '#F8F9FA', minHeight: '85vh', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              padding: '2.5rem 2rem',
              maxWidth: '450px',
              width: '100%',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#0B2545', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 1rem' }}>
              🛡️
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.4rem' }}>
              Admin Portal Security Access
            </h1>
            <p style={{ fontSize: '0.84375rem', color: '#6B7280', marginBottom: '1.5rem' }}>
              Restricted to authorized studio managers. Please sign in with admin credentials.
            </p>

            {loginError && (
              <div style={{ background: '#FFEBEE', color: '#C62828', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1rem' }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.84375rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '0.84375rem' }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '999px',
                  background: '#0B2545',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                {loginLoading ? '⏳ Authenticating Admin...' : '🔐 Sign In to Admin Dashboard'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB', fontSize: '0.75rem', color: '#6B7280' }}>
              💡 Pre-seeded Admin: <strong>admin@ayushmancards.com</strong> | Pass: <strong>admin123</strong>
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
      <main style={{ background: '#F8F9FA', minHeight: '90vh', padding: '2rem 0 4rem' }}>
        <div className="container-wide">
          
          {/* Action Notification Banner */}
          {actionNotice && (
            <div style={{ position: 'fixed', top: '90px', right: '2rem', zIndex: 9999, background: '#10B981', color: '#FFF', padding: '0.85rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
              ✓ {actionNotice}
            </div>
          )}

          {/* Admin Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#0B2545', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                  ADMIN CONTROL CENTER
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>Welcome, {user.name}</span>
              </div>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#1E1E1E', marginTop: '0.2rem' }}>
                Studio Orders & Management Portal
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => fetchAdminData()}
                style={{ padding: '0.6rem 1.15rem', borderRadius: '999px', border: '1px solid #E5E7EB', background: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                🔄 Refresh Live Data
              </button>
              <Link
                href="/profile"
                style={{ padding: '0.6rem 1.15rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}
              >
                👤 My Admin Profile
              </Link>
            </div>
          </div>

          {/* Analytics Cards Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Revenue</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0B2545', marginTop: '0.2rem' }}>
                ₹{stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#10B981', marginTop: '0.25rem' }}>✓ From verified paid orders</div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Orders</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E1E1E', marginTop: '0.2rem' }}>
                {stats.totalOrders || 0}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#6B7280', marginTop: '0.25rem' }}>{stats.paidOrders || 0} Paid • {stats.pendingOrders || 0} Active</div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Registered Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E1E1E', marginTop: '0.2rem' }}>
                {usersList.length}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#0B2545', marginTop: '0.25rem' }}>{usersList.filter((u) => u.role === 'ADMIN').length} Admins • {usersList.filter((u) => u.role === 'CLIENT').length} Clients</div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Pending Fulfillment</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D40000', marginTop: '0.2rem' }}>
                {stats.pendingOrders || 0}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#D40000', marginTop: '0.25rem' }}>Requires printing or dispatch</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'orders' ? '#0B2545' : 'transparent',
                color: activeTab === 'orders' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              📦 Manage Print Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'users' ? '#0B2545' : 'transparent',
                color: activeTab === 'users' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              👥 Registered Accounts ({usersList.length})
            </button>
          </div>

          {/* ═══ TAB 1: ORDER MANAGEMENT ═══ */}
          {activeTab === 'orders' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              
              {/* Search & Filters */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Search customer name, phone, order ID, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: '1 1 300px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.84375rem' }}
                />

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['ALL', 'PAID', 'PENDING', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '999px',
                        border: statusFilter === st ? '2px solid #0B2545' : '1px solid #E5E7EB',
                        background: statusFilter === st ? 'rgba(11,37,69,0.08)' : '#F9FAFB',
                        color: statusFilter === st ? '#0B2545' : '#4B5563',
                        fontSize: '0.75rem',
                        fontWeight: statusFilter === st ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              {loadingData ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>Loading orders data...</div>
              ) : filteredOrders.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>No orders found matching filters.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #E5E7EB', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Order Ref</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Product Job</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Payment Status</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Fulfillment Status</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0B2545' }}>
                            {ord.id}
                            <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 400 }}>
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{ord.customerName}</div>
                            <div style={{ color: '#6B7280', fontSize: '0.75rem' }}>📞 {ord.customerPhone}</div>
                            <div style={{ color: '#9CA3AF', fontSize: '0.7rem' }}>📍 {ord.city || 'Ujjain'}</div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', maxWidth: '220px' }}>
                            <div style={{ fontWeight: 600, color: '#1E1E1E' }}>{ord.eventType}</div>
                            {ord.notes && <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>Note: {ord.notes}</div>}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#10B981', fontSize: '0.9rem' }}>
                            ₹{ord.totalAmount?.toLocaleString()}
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <select
                              value={ord.paymentStatus}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, ord.status, e.target.value)}
                              style={{
                                padding: '0.35rem 0.5rem',
                                borderRadius: '6px',
                                border: '1px solid #E5E7EB',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: ord.paymentStatus === 'PAID' ? '#D1FAE5' : '#FEF3C7',
                                color: ord.paymentStatus === 'PAID' ? '#065F46' : '#92400E',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="PAID">PAID</option>
                              <option value="PENDING">PENDING</option>
                              <option value="FAILED">FAILED</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value, ord.paymentStatus)}
                              style={{
                                padding: '0.35rem 0.5rem',
                                borderRadius: '6px',
                                border: '1px solid #E5E7EB',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: ord.status === 'DELIVERED' ? '#D1FAE5' : ord.status === 'SHIPPED' ? '#DBEAFE' : ord.status === 'PRINTING' ? '#EDE9FE' : '#F3F4F6',
                                color: ord.status === 'DELIVERED' ? '#065F46' : ord.status === 'SHIPPED' ? '#1E40AF' : ord.status === 'PRINTING' ? '#5B21B6' : '#1F2937',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="NEW">NEW</option>
                              <option value="PRINTING">PRINTING</option>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <button
                              onClick={() => handleDeleteOrder(ord.id)}
                              style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#991B1B', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 2: USER ACCOUNT MANAGEMENT ═══ */}
          {activeTab === 'users' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1E1E' }}>
                  Registered Users & Studio Staff ({usersList.length})
                </h3>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  style={{ padding: '0.6rem 1.25rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
                >
                  ➕ Add New User / Admin
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #E5E7EB', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>User Name</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Email Address</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Phone</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Current Role</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Joined Date</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1E1E1E' }}>{u.name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{u.email}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{u.phone || 'N/A'}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, background: u.role === 'ADMIN' ? '#0B2545' : '#E5E7EB', color: u.role === 'ADMIN' ? '#FFFFFF' : '#1E1E1E' }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: '#9CA3AF', fontSize: '0.75rem' }}>
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <button
                            onClick={() => handleToggleUserRole(u)}
                            style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            {u.role === 'ADMIN' ? 'Demote to Client' : 'Promote to Admin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* ═══ ADD USER MODAL ═══ */}
        {showAddUserModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowAddUserModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.75rem', maxWidth: '420px', width: '100%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Create Account</h3>
              <form onSubmit={handleCreateUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Full Name *</label>
                  <input type="text" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #E5E7EB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Email Address *</label>
                  <input type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #E5E7EB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Password *</label>
                  <input type="password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #E5E7EB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.2rem' }}>Role</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.7rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontWeight: 700 }}>Create Account</button>
                  <button type="button" onClick={() => setShowAddUserModal(false)} style={{ padding: '0.7rem 1rem', borderRadius: '999px', border: '1px solid #E5E7EB', background: '#FFF' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
