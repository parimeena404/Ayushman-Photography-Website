'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminPortalPage() {
  const { user, login, refreshUser } = useAuth();

  // Admin Login State (if not logged in as admin)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data State
  const [orders, setOrders] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, paidOrders: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'inquiries' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Add User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'CLIENT', phone: '' });
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  // Admin Settings State (to change own credentials inside)
  const [settingName, setSettingName] = useState('');
  const [settingEmail, setSettingEmail] = useState('');
  const [settingPhone, setSettingPhone] = useState('');
  const [settingAddress, setSettingAddress] = useState('');
  const [settingCity, setSettingCity] = useState('');
  const [settingState, setSettingState] = useState('');
  const [settingPincode, setSettingPincode] = useState('');
  const [settingNewPassword, setSettingNewPassword] = useState('');
  const [settingConfirmPassword, setSettingConfirmPassword] = useState('');
  const [settingSaving, setSettingSaving] = useState(false);
  const [settingMessage, setSettingMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [ordersRes, usersRes, inquiriesRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/users'),
        fetch('/api/inquiries'),
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

      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        if (inquiriesData.success) {
          setInquiries(inquiriesData.inquiries || []);
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
      setSettingName(user.name || '');
      setSettingEmail(user.email || '');
      setSettingPhone((user as any).phone || '');
      setSettingAddress((user as any).address || '');
      setSettingCity((user as any).city || 'Ujjain');
      setSettingState((user as any).state || 'Madhya Pradesh');
      setSettingPincode((user as any).pincode || '456010');
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const result = await login({ email: adminEmail, password: adminPassword });
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(result.error || 'Admin login failed. Invalid email or password.');
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

  const handleSaveAdminSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingMessage(null);

    if (settingNewPassword && settingNewPassword !== settingConfirmPassword) {
      setSettingMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    if (settingNewPassword && settingNewPassword.length < 6) {
      setSettingMessage({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    setSettingSaving(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: settingName,
          email: settingEmail,
          phone: settingPhone,
          address: settingAddress,
          city: settingCity,
          state: settingState,
          pincode: settingPincode,
          newPassword: settingNewPassword ? settingNewPassword : undefined,
        }),
      });

      const data = await res.json();
      setSettingSaving(false);

      if (res.ok && data.success) {
        setSettingMessage({ text: 'Admin credentials & studio settings updated successfully!', type: 'success' });
        setSettingNewPassword('');
        setSettingConfirmPassword('');
        refreshUser();
      } else {
        setSettingMessage({ text: data.error || 'Failed to update settings', type: 'error' });
      }
    } catch {
      setSettingSaving(false);
      setSettingMessage({ text: 'Network connection error updating settings.', type: 'error' });
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter || o.paymentStatus === statusFilter;
    const matchesSearch =
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone?.includes(searchQuery) ||
      o.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              Restricted to authorized studio managers. Please sign in with your admin credentials.
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
                  placeholder="e.g. admin@ayushmancards.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', color: '#1E1E1E', background: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.875rem', color: '#1E1E1E', background: '#FFFFFF' }}
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
              🔒 Restricted Area — Authorized personnel only.
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
                <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>Logged in as: <strong>{user.email}</strong></span>
              </div>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: '#1E1E1E', marginTop: '0.2rem' }}>
                Studio Orders & Management Portal
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => fetchAdminData()}
                style={{ padding: '0.6rem 1.15rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#1E1E1E', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                🔄 Refresh Live Data
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                style={{ padding: '0.6rem 1.15rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
              >
                ⚙️ Change ID & Password
              </button>
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
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
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

            <button
              onClick={() => setActiveTab('inquiries')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'inquiries' ? '#0B2545' : 'transparent',
                color: activeTab === 'inquiries' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              📩 Inquiries ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'settings' ? '#0B2545' : 'transparent',
                color: activeTab === 'settings' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              ⚙️ Admin Credentials & Settings
            </button>
          </div>

          {/* ═══ TAB 1: ORDER MANAGEMENT ═══ */}
          {activeTab === 'orders' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              
              {/* Search & Filters */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Search customer name, phone, email, order ID, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: '1 1 300px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                />

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      if (orders.length === 0) {
                        alert('No orders to export.');
                        return;
                      }
                      const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Product Job', 'Amount', 'Payment Status', 'Fulfillment Status', 'Address', 'City'];
                      const rows = orders.map(o => [
                        `"${o.id}"`,
                        `"${new Date(o.createdAt).toLocaleDateString()}"`,
                        `"${o.customerName || ''}"`,
                        `"${o.customerPhone || ''}"`,
                        `"${o.customerEmail || ''}"`,
                        `"${(o.eventType || '').replace(/"/g, '""')}"`,
                        `"${o.totalAmount || 0}"`,
                        `"${o.paymentStatus || ''}"`,
                        `"${o.status || ''}"`,
                        `"${(o.address || '').replace(/"/g, '""')}"`,
                        `"${o.city || 'Ujjain'}"`
                      ]);
                      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `Ayushman_Orders_${new Date().toISOString().slice(0,10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      border: '1.5px solid #10B981',
                      background: '#ECFDF5',
                      color: '#065F46',
                      fontSize: '0.78125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    📥 Export Orders CSV
                  </button>

                  {['ALL', 'PAID', 'PENDING', 'NEW', 'CONFIRMED', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
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
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                  No orders found. When customers place orders on the website, they will appear here in real-time.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #E5E7EB', color: '#6B7280', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Order Ref</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Product Job</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Delivery Address</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Payment</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Fulfillment</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0B2545' }}>
                            {ord.id.substring(0, 10)}...
                            <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 400 }}>
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{ord.customerName}</div>
                            <div style={{ color: '#6B7280', fontSize: '0.75rem' }}>📞 {ord.customerPhone}</div>
                            <div style={{ color: '#9CA3AF', fontSize: '0.7rem' }}>✉️ {ord.customerEmail}</div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', maxWidth: '220px' }}>
                            <div style={{ fontWeight: 600, color: '#1E1E1E' }}>{ord.eventType}</div>
                            {ord.notes && <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>Note: {ord.notes}</div>}
                            {ord.razorpayPaymentId && <div style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>Pay ID: {ord.razorpayPaymentId}</div>}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', maxWidth: '180px' }}>
                            <div style={{ fontSize: '0.75rem', color: '#4B5563' }}>{ord.address || '—'}</div>
                            <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{ord.city || 'Ujjain'}</div>
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
                                border: '1px solid #D1D5DB',
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
                                border: '1px solid #D1D5DB',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: ord.status === 'DELIVERED' ? '#D1FAE5' : ord.status === 'SHIPPED' ? '#DBEAFE' : ord.status === 'PRINTING' ? '#EDE9FE' : '#F3F4F6',
                                color: ord.status === 'DELIVERED' ? '#065F46' : ord.status === 'SHIPPED' ? '#1E40AF' : ord.status === 'PRINTING' ? '#5B21B6' : '#1F2937',
                                cursor: 'pointer',
                              }}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PRINTING">PRINTING</option>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                              <a
                                href={`https://wa.me/91${(ord.customerPhone || '').replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(
                                  `Hello ${ord.customerName}, this is Ayushman Cards & Graphics. Regarding your order #${ord.id.substring(0, 8)} (${ord.eventType}): status is currently ${ord.status}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #10B981', background: '#ECFDF5', color: '#065F46', fontSize: '0.7rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                title="Chat with customer on WhatsApp"
                              >
                                💬 WhatsApp
                              </a>

                              <button
                                onClick={() => setSelectedInvoiceOrder(ord)}
                                style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #0B2545', background: '#0B2545', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                📄 Invoice
                              </button>

                              <button
                                onClick={() => handleDeleteOrder(ord.id)}
                                style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#991B1B', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                              >
                                🗑️
                              </button>
                            </div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1E1E' }}>
                    Registered Users & Studio Staff ({usersList.length})
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Manage customer accounts and assign Admin privileges.</p>
                </div>
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
                            style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#1E1E1E', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
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

          {/* ═══ TAB 3: INQUIRIES MANAGEMENT ═══ */}
          {activeTab === 'inquiries' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1.25rem' }}>
                Customer Inquiries & Messages ({inquiries.length})
              </h3>

              {inquiries.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📩</div>
                  No inquiries received yet. Contact form submissions will appear here.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {inquiries.map((inq: any) => (
                    <div key={inq.id} style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid #E5E7EB', background: '#FAFAFA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1E1E1E', fontSize: '0.9rem' }}>{inq.name}</div>
                          <div style={{ color: '#6B7280', fontSize: '0.78125rem' }}>📞 {inq.phone} • ✉️ {inq.email}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{new Date(inq.createdAt).toLocaleDateString()}</span>
                          <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, background: '#EDE9FE', color: '#5B21B6' }}>
                            {inq.eventType}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.84375rem', color: '#4B5563', lineHeight: 1.6, background: '#FFFFFF', padding: '0.75rem', borderRadius: '6px', border: '1px solid #F3F4F6' }}>
                        {inq.message}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {inq.date ? (
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>📅 Preferred Date: {inq.date}</div>
                        ) : <div />}

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <a
                            href={`https://wa.me/91${(inq.phone || '').replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(
                              `Hello ${inq.name}, thank you for contacting Ayushman Cards & Graphics (Ujjain). Regarding your inquiry for ${inq.eventType}: how can we assist you?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '4px',
                              border: '1px solid #10B981',
                              background: '#ECFDF5',
                              color: '#065F46',
                              fontSize: '0.725rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                            }}
                          >
                            💬 Reply on WhatsApp
                          </a>

                          <button
                            onClick={async () => {
                              if (!confirm(`Delete inquiry from ${inq.name}?`)) return;
                              try {
                                const res = await fetch(`/api/inquiries?id=${inq.id}`, { method: 'DELETE' });
                                if (res.ok) {
                                  setActionNotice('Inquiry deleted.');
                                  setTimeout(() => setActionNotice(null), 3000);
                                  fetchAdminData();
                                }
                              } catch {
                                alert('Failed to delete inquiry');
                              }
                            }}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '4px',
                              border: '1px solid #FCA5A5',
                              background: '#FEF2F2',
                              color: '#991B1B',
                              fontSize: '0.725rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 4: ADMIN SETTINGS & CREDENTIALS ═══ */}
          {activeTab === 'settings' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '2rem', maxWidth: '720px' }}>
              <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.25rem' }}>
                  ⚙️ Admin Account Credentials & Studio Settings
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                  Update your Admin Login Email, set a new custom Password, and modify studio contact information.
                </p>
              </div>

              {settingMessage && (
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.84375rem',
                    fontWeight: 600,
                    marginBottom: '1.5rem',
                    background: settingMessage.type === 'success' ? '#D1FAE5' : '#FFEBEE',
                    color: settingMessage.type === 'success' ? '#065F46' : '#C62828',
                  }}
                >
                  {settingMessage.type === 'success' ? '✓ ' : '⚠️ '}{settingMessage.text}
                </div>
              )}

              <form onSubmit={handleSaveAdminSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Section 1: Admin Credentials */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. Admin Login ID & Name
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        Admin Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingName}
                        onChange={(e) => setSettingName(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        Admin Email (Your Login ID) *
                      </label>
                      <input
                        type="email"
                        required
                        value={settingEmail}
                        onChange={(e) => setSettingEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Change Password */}
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Set Your Own Custom Admin Password
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        New Password (Leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        value={settingNewPassword}
                        onChange={(e) => setSettingNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        value={settingConfirmPassword}
                        onChange={(e) => setSettingConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Studio Phone & Address */}
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    3. Studio Contact & Address Details
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        Studio Contact / WhatsApp Phone
                      </label>
                      <input
                        type="tel"
                        value={settingPhone}
                        onChange={(e) => setSettingPhone(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                        Studio Address
                      </label>
                      <textarea
                        rows={2}
                        value={settingAddress}
                        onChange={(e) => setSettingAddress(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                          City
                        </label>
                        <input
                          type="text"
                          value={settingCity}
                          onChange={(e) => setSettingCity(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                          State
                        </label>
                        <input
                          type="text"
                          value={settingState}
                          onChange={(e) => setSettingState(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={settingPincode}
                          onChange={(e) => setSettingPincode(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={settingSaving}
                  style={{
                    padding: '0.85rem 1.5rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: settingSaving ? 'not-allowed' : 'pointer',
                    marginTop: '1rem',
                  }}
                >
                  {settingSaving ? '⏳ Saving Admin Settings...' : '💾 Save New Admin Credentials & Settings'}
                </button>
              </form>
            </div>
          )}

        </div>

        {/* ═══ ADD USER MODAL ═══ */}
        {showAddUserModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowAddUserModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.75rem', maxWidth: '420px', width: '100%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1rem' }}>Create Account</h3>
              <form onSubmit={handleCreateUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Full Name *</label>
                  <input type="text" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Email Address *</label>
                  <input type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Password *</label>
                  <input type="password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Role</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }}>
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.7rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Create Account</button>
                  <button type="button" onClick={() => setShowAddUserModal(false)} style={{ padding: '0.7rem 1rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', color: '#1E1E1E', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ═══ TAX INVOICE & RECEIPT MODAL ═══ */}
        {selectedInvoiceOrder && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto',
            }}
            onClick={() => setSelectedInvoiceOrder(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '2.5rem',
                maxWidth: '680px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
                position: 'relative',
                color: '#1E1E1E',
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Actions Header (No-Print) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 600 }}>
                  STUDIO TAX INVOICE / CASH RECEIPT
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      background: '#0B2545',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    🖨️ Print Invoice
                  </button>
                  <button
                    onClick={() => setSelectedInvoiceOrder(null)}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: '999px',
                      border: '1px solid #D1D5DB',
                      background: '#FFFFFF',
                      color: '#1E1E1E',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Printable Invoice Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B2545', margin: 0 }}>
                    AYUSHMAN CARDS & GRAPHICS
                  </h2>
                  <p style={{ fontSize: '0.78125rem', color: '#4B5563', margin: '0.25rem 0 0' }}>
                    Complete Offset & Digital Printing Studio<br />
                    Freeganj, Ujjain, Madhya Pradesh - 456010<br />
                    📞 +91 9479784979 • ✉️ contact@ayushmancards.com
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1E1E' }}>INVOICE</div>
                  <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.2rem' }}>
                    Ref: <strong>#{selectedInvoiceOrder.id.substring(0, 10).toUpperCase()}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Date: {new Date(selectedInvoiceOrder.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Bill To & Status Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#F8F9FA', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    CUSTOMER & DELIVERY TO:
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1E1E1E' }}>
                    {selectedInvoiceOrder.customerName}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#4B5563', marginTop: '0.2rem' }}>
                    📞 {selectedInvoiceOrder.customerPhone}<br />
                    ✉️ {selectedInvoiceOrder.customerEmail}<br />
                    📍 {selectedInvoiceOrder.address || 'Studio Pickup / Freeganj'}<br />
                    {selectedInvoiceOrder.city || 'Ujjain'}, {selectedInvoiceOrder.pincode || '456010'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    PAYMENT & FULFILLMENT:
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
                    Payment Status:{' '}
                    <strong style={{ color: selectedInvoiceOrder.paymentStatus === 'PAID' ? '#065F46' : '#92400E' }}>
                      {selectedInvoiceOrder.paymentStatus}
                    </strong><br />
                    {selectedInvoiceOrder.razorpayPaymentId && (
                      <>Pay Reference: <code>{selectedInvoiceOrder.razorpayPaymentId}</code><br /></>
                    )}
                    Order Status: <strong>{selectedInvoiceOrder.status}</strong><br />
                    Fulfillment: <strong>Expedited Studio Print & Dispatch</strong>
                  </div>
                </div>
              </div>

              {/* Order Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84375rem', marginBottom: '1.5rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E5E7EB', background: '#F3F4F6', color: '#4B5563', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Item Description / Custom Job</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{selectedInvoiceOrder.eventType}</div>
                      {selectedInvoiceOrder.notes && (
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>
                          Custom Notes: {selectedInvoiceOrder.notes}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#1E1E1E' }}>
                      ₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Summary Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                <div style={{ width: '240px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6B7280', padding: '0.35rem 0' }}>
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6B7280', padding: '0.35rem 0' }}>
                    <span>CGST + SGST (Included):</span>
                    <span>₹0.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6B7280', padding: '0.35rem 0' }}>
                    <span>Shipping / Delivery:</span>
                    <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#0B2545', borderTop: '2px solid #0B2545', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
                    <span>Total Paid:</span>
                    <span>₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer */}
              <div style={{ textAlign: 'center', borderTop: '1px dashed #D1D5DB', paddingTop: '1.25rem', fontSize: '0.75rem', color: '#6B7280' }}>
                Thank you for choosing Ayushman Cards & Graphics! For queries, contact +91 9479784979.
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
