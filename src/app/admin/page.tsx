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
  const [productsList, setProductsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, paidOrders: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'categories' | 'users' | 'inquiries' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [productCatFilter, setProductCatFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Add User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'CLIENT', phone: '' });
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  // Product CMS Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Wedding Cards',
    badge: '100 PCS @ ₹3,500',
    price: '₹3,500',
    numericPrice: 3500,
    unit: '100 Cards',
    image: '/images/wedding/scroll_royal_blue_velvet.png',
    description: '',
    features: 'High Quality Offset Print\nFast Dispatch in 3 Days\nPremium Cardstock',
    customizerId: 'wedding-card',
    isActive: true,
  });

  // Category CMS Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    label: '',
    icon: '🏷️',
    description: '',
  });

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
      const [ordersRes, usersRes, inquiriesRes, productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/users'),
        fetch('/api/inquiries'),
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
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

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        if (productsData.success) {
          setProductsList(productsData.products || []);
        }
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        if (categoriesData.success) {
          setCategoriesList(categoriesData.categories || []);
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
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await login({ email: adminEmail, password: adminPassword });
      if (!res.success) {
        setLoginError(res.error || 'Invalid admin email or password.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status, paymentStatus }),
      });

      if (res.ok) {
        setActionNotice(`✓ Order status updated to "${status}"`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      setActionNotice('⚠️ Error updating order status.');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order permanently?')) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Order record removed.');
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      setActionNotice('⚠️ Error deleting order.');
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${inquiryId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Inquiry removed.');
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      setActionNotice('⚠️ Error deleting inquiry.');
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
        setShowAddUserModal(false);
        setNewUser({ name: '', email: '', password: '', role: 'CLIENT', phone: '' });
        setActionNotice(`✓ User "${data.user.name}" created successfully!`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to create user');
      }
    } catch {
      alert('Error creating user.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ User account removed.');
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      setActionNotice('⚠️ Error deleting user.');
    }
  };

  // Product CMS Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      category: categoriesList[0]?.id || 'Wedding Cards',
      badge: '100 PCS @ ₹2,500',
      price: '₹2,500',
      numericPrice: 2500,
      unit: '100 Cards',
      image: '/images/wedding/scroll_royal_blue_velvet.png',
      description: 'Handcrafted luxury printing with custom foil stamping and textured board.',
      features: 'High Quality Offset Print\nFast Dispatch in 3 Days\nPremium Cardstock',
      customizerId: 'wedding-card',
      isActive: true,
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: any) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title || '',
      category: prod.category || 'Wedding Cards',
      badge: prod.badge || '',
      price: prod.price || '',
      numericPrice: prod.numericPrice || 2000,
      unit: prod.unit || '100 Units',
      image: prod.image || '/images/wedding/scroll_royal_blue_velvet.png',
      description: prod.description || '',
      features: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || ''),
      customizerId: prod.customizerId || 'custom-order',
      isActive: prod.isActive !== false,
    });
    setShowProductModal(true);
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        // Show preview immediately
        setProductForm((prev) => ({ ...prev, image: base64Data }));

        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Data, folder: 'ayushman_print_products' }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            setProductForm((prev) => ({ ...prev, image: data.url }));
            setActionNotice('✓ Image uploaded to Cloud CDN successfully!');
            setTimeout(() => setActionNotice(null), 3000);
          }
        } catch (err) {
          console.warn('CDN upload fallback, using base64 preview:', err);
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingImage(false);
      setUploadError('Failed to read image file. Please try another.');
    }
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        id: editingProduct ? editingProduct.id : undefined,
      };

      const res = await fetch('/api/admin/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowProductModal(false);
        setActionNotice(`✓ Product "${productForm.title}" ${editingProduct ? 'updated' : 'created'} successfully!`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch {
      alert('Error saving product.');
    }
  };

  const handleToggleProductActive = async (product: any) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, isActive: product.isActive === false ? true : false }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch {
      alert('Error updating product status');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to remove this product from the catalog?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Product deleted from catalog.');
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      alert('Error deleting product');
    }
  };

  // Category CMS Handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: '',
      label: '',
      icon: '🏷️',
      description: '',
    });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      label: cat.label || '',
      icon: cat.icon || '🏷️',
      description: cat.description || '',
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowCategoryModal(false);
        setActionNotice(`✓ Category "${categoryForm.label}" saved!`);
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to save category');
      }
    } catch {
      alert('Error saving category.');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm(`Are you sure you want to delete category "${categoryId}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(categoryId)}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Category removed.');
        setTimeout(() => setActionNotice(null), 3500);
        fetchAdminData();
      }
    } catch {
      alert('Error deleting category');
    }
  };

  const handleAdminSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingMessage(null);

    if (settingNewPassword && settingNewPassword !== settingConfirmPassword) {
      setSettingMessage({ text: 'New password and confirm password do not match!', type: 'error' });
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

  // Filter Products
  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = productCatFilter === 'ALL' || p.category === productCatFilter;
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <main style={{ minHeight: '80vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '2.5rem', maxWidth: '440px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(11,37,69,0.08)', color: '#0B2545', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1rem' }}>
                🔒
              </div>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#1E1E1E', margin: 0 }}>
                Admin Portal Access
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.4rem' }}>
                Sign in with your master administrator credentials to access printing press operations.
              </p>
            </div>

            {loginError && (
              <div style={{ padding: '0.75rem 1rem', background: '#FFEBEE', color: '#C62828', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.35rem' }}>
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@ayushmancards.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem', color: '#1E1E1E', background: '#FFFFFF' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.35rem' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem', color: '#1E1E1E', background: '#FFFFFF' }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  padding: '0.85rem',
                  borderRadius: '999px',
                  background: '#0B2545',
                  color: '#FFFFFF',
                  border: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 12px rgba(11,37,69,0.2)',
                }}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem', textAlign: 'center', fontSize: '0.78125rem', color: '#6B7280' }}>
              Default Studio Admin: <strong>admin@ayushmancards.com</strong> / <strong>admin123</strong>
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
      <main style={{ minHeight: '90vh', background: '#F8F9FA', padding: '2.5rem 0 4rem' }}>
        <div className="container-wide">

          {/* Action Notification Toast */}
          {actionNotice && (
            <div style={{ position: 'fixed', top: '5rem', right: '2rem', zIndex: 9999, background: '#10B981', color: '#FFF', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
              {actionNotice}
            </div>
          )}

          {/* Header Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1E1E1E', margin: 0 }}>
                  Ayushman Press Master Portal
                </h1>
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: '#FEF3C7', color: '#92400E', fontSize: '0.7rem', fontWeight: 800 }}>
                  ADMIN ACCESS
                </span>
              </div>
              <p style={{ fontSize: '0.84375rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
                Manage print production orders, customer accounts, catalog products, and studio settings.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
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
                ⚙️ Studio Settings
              </button>
            </div>
          </div>

          {/* Analytics Cards Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
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
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Catalog Products</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981', marginTop: '0.2rem' }}>
                {productsList.length}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#6B7280', marginTop: '0.25rem' }}>Across {categoriesList.length} categories</div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Registered Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E1E1E', marginTop: '0.2rem' }}>
                {usersList.length}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#0B2545', marginTop: '0.25rem' }}>{usersList.filter((u) => u.role === 'ADMIN').length} Admins • {usersList.filter((u) => u.role === 'CLIENT').length} Clients</div>
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
              📦 Print Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'products' ? '#0B2545' : 'transparent',
                color: activeTab === 'products' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              🛍️ Products Catalog ({productsList.length})
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'categories' ? '#0B2545' : 'transparent',
                color: activeTab === 'categories' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              📑 Categories ({categoriesList.length})
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
              👥 User Accounts ({usersList.length})
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
              ⚙️ Studio Settings
            </button>
          </div>

          {/* ═══ TAB 1: ORDER MANAGEMENT ═══ */}
          {activeTab === 'orders' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
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
                      const csvHeader = 'Order ID,Customer Name,Phone,Email,Event/Product,Amount,Payment Status,Fulfillment Status,Date\n';
                      const csvRows = orders.map((o) =>
                        `"${o.id}","${o.customerName}","${o.customerPhone}","${o.customerEmail || ''}","${o.eventType}","₹${o.totalAmount}","${o.paymentStatus}","${o.status}","${new Date(o.createdAt).toLocaleDateString()}"`
                      ).join('\n');
                      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.setAttribute('href', url);
                      link.setAttribute('download', `Ayushman_Orders_Export_${new Date().toISOString().split('T')[0]}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #10B981',
                      background: 'rgba(16, 185, 129, 0.08)',
                      color: '#047857',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    📥 Export CSV
                  </button>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF', fontWeight: 600 }}
                  >
                    <option value="ALL">All Statuses ({orders.length})</option>
                    <option value="NEW">Status: New</option>
                    <option value="PROCESSING">Status: Processing</option>
                    <option value="PRINTING">Status: Printing Press</option>
                    <option value="SHIPPED">Status: Shipped</option>
                    <option value="DELIVERED">Status: Delivered</option>
                    <option value="PAID">Payment: PAID</option>
                    <option value="PENDING">Payment: PENDING</option>
                  </select>
                </div>
              </div>

              {loadingData ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                  No orders match the selected filters.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563', textTransform: 'uppercase', fontSize: '0.725rem' }}>
                        <th style={{ padding: '0.75rem' }}>Order Ref</th>
                        <th style={{ padding: '0.75rem' }}>Client Details</th>
                        <th style={{ padding: '0.75rem' }}>Print Item / Job</th>
                        <th style={{ padding: '0.75rem' }}>Amount</th>
                        <th style={{ padding: '0.75rem' }}>Payment</th>
                        <th style={{ padding: '0.75rem' }}>Fulfillment</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: '#0B2545' }}>
                            {o.id}
                            <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'sans-serif' }}>
                              {new Date(o.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{o.customerName}</div>
                            <div style={{ color: '#6B7280', fontSize: '0.75rem' }}>📱 {o.customerPhone}</div>
                            {o.city && <div style={{ color: '#9CA3AF', fontSize: '0.72rem' }}>📍 {o.city}</div>}
                          </td>
                          <td style={{ padding: '0.75rem', maxWidth: '240px' }}>
                            <div style={{ fontWeight: 600, color: '#1E1E1E' }}>{o.eventType}</div>
                            {o.notes && <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>📝 {o.notes}</div>}
                          </td>
                          <td style={{ padding: '0.75rem', fontWeight: 800, color: '#1E1E1E' }}>
                            ₹{o.totalAmount?.toLocaleString()}
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <span style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: '999px',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              background: o.paymentStatus === 'PAID' ? '#D1FAE5' : '#FEF3C7',
                              color: o.paymentStatus === 'PAID' ? '#065F46' : '#92400E',
                            }}>
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <select
                              value={o.status || 'NEW'}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                              style={{
                                padding: '0.35rem 0.5rem',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                background: '#F9FAFB',
                                color: '#1E1E1E',
                              }}
                            >
                              <option value="NEW">NEW</option>
                              <option value="PROCESSING">PROCESSING</option>
                              <option value="PRINTING">PRINTING</option>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setSelectedInvoiceOrder(o)}
                                title="Generate Studio Tax Invoice"
                                style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#1E1E1E', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                              >
                                🧾 Invoice
                              </button>
                              <a
                                href={`https://wa.me/91${o.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${o.customerName}! Ayushman Cards & Graphics is updating you regarding your Order #${o.id}. Status: ${o.status || 'Processing'}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Message on WhatsApp"
                                style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #10B981', background: '#D1FAE5', color: '#065F46', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700 }}
                              >
                                💬 WhatsApp
                              </a>
                              <button
                                onClick={() => handleDeleteOrder(o.id)}
                                title="Delete Order Record"
                                style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}
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

          {/* ═══ TAB 2: PRODUCT MANAGEMENT (CATALOG CMS) ═══ */}
          {activeTab === 'products' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flex: '1 1 300px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search products by title, category, description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                  />

                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF', fontWeight: 600 }}
                  >
                    <option value="ALL">All Categories ({productsList.length})</option>
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: '999px',
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  ➕ Add New Product
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                  No products found. Click "Add New Product" to create one.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      style={{
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: prod.isActive === false ? 0.6 : 1,
                        transition: 'box-shadow 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div style={{ position: 'relative', height: '160px', background: '#F3F4F6' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.image}
                          alt={prod.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', display: 'flex', gap: '0.3rem' }}>
                          <span style={{ padding: '0.2rem 0.55rem', borderRadius: '999px', background: prod.isActive !== false ? '#10B981' : '#6B7280', color: '#FFF', fontSize: '0.68rem', fontWeight: 800 }}>
                            {prod.isActive !== false ? 'ACTIVE' : 'HIDDEN'}
                          </span>
                        </div>
                        <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.6rem' }}>
                          <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', background: 'rgba(0,0,0,0.75)', color: '#FFF', fontSize: '0.72rem', fontWeight: 700 }}>
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1E1E1E', marginBottom: '0.3rem', lineHeight: 1.3 }}>
                            {prod.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.6rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {prod.description}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B2545' }}>
                              {prod.price}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>
                              {prod.unit}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem', borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                          <button
                            onClick={() => handleToggleProductActive(prod)}
                            style={{
                              flex: 1,
                              padding: '0.4rem',
                              borderRadius: '6px',
                              border: '1px solid #D1D5DB',
                              background: '#F9FAFB',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#4B5563',
                            }}
                          >
                            {prod.isActive !== false ? '👁️ Hide' : '👁️ Show'}
                          </button>
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            style={{
                              flex: 1,
                              padding: '0.4rem',
                              borderRadius: '6px',
                              border: '1px solid #0B2545',
                              background: 'rgba(11,37,69,0.06)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              color: '#0B2545',
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            style={{
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid #FCA5A5',
                              background: '#FEE2E2',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              color: '#991B1B',
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 3: CATEGORY MANAGEMENT ═══ */}
          {activeTab === 'categories' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E1E1E', margin: 0 }}>
                    Product Categories ({categoriesList.length})
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0.2rem 0 0' }}>
                    Manage categories displayed across the website filters and homepage carousels.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddCategory}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: '999px',
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  ➕ Add New Category
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {categoriesList.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      background: '#FAFAFA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{cat.icon || '🏷️'}</span>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1E1E1E' }}>
                          {cat.label}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                        ID: <code style={{ background: '#E5E7EB', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>{cat.id}</code>
                      </div>
                      {cat.description && (
                        <div style={{ fontSize: '0.78125rem', color: '#4B5563', marginBottom: '0.75rem' }}>
                          {cat.description}
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', marginBottom: '0.75rem' }}>
                        📦 {productsList.filter((p) => p.category === cat.id).length} Active Products
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          borderRadius: '6px',
                          border: '1px solid #0B2545',
                          background: 'rgba(11,37,69,0.06)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: '#0B2545',
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid #FCA5A5',
                          background: '#FEE2E2',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          color: '#991B1B',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TAB 4: USERS MANAGEMENT ═══ */}
          {activeTab === 'users' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Search user name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: '1 1 300px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                />

                <button
                  onClick={() => setShowAddUserModal(true)}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  ➕ Create User / Admin Account
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563', textTransform: 'uppercase', fontSize: '0.725rem' }}>
                      <th style={{ padding: '0.75rem' }}>User ID</th>
                      <th style={{ padding: '0.75rem' }}>Full Name</th>
                      <th style={{ padding: '0.75rem' }}>Email Address</th>
                      <th style={{ padding: '0.75rem' }}>Mobile</th>
                      <th style={{ padding: '0.75rem' }}>Role</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#6B7280' }}>{u.id}</td>
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#1E1E1E' }}>{u.name}</td>
                        <td style={{ padding: '0.75rem', color: '#4B5563' }}>{u.email}</td>
                        <td style={{ padding: '0.75rem', color: '#6B7280' }}>{u.phone || '—'}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            padding: '0.2rem 0.55rem',
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            background: u.role === 'ADMIN' ? '#FEF3C7' : '#E0E7FF',
                            color: u.role === 'ADMIN' ? '#92400E' : '#3730A3',
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          {u.email !== 'admin@ayushmancards.com' && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ TAB 5: INQUIRIES MANAGEMENT ═══ */}
          {activeTab === 'inquiries' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1rem' }}>
                Customer Messages & Quote Requests ({inquiries.length})
              </h2>

              {inquiries.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>No inquiries received yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {inquiries.map((inq) => (
                    <div key={inq.id} style={{ padding: '1.25rem', border: '1px solid #E5E7EB', borderRadius: '10px', background: '#FAFAFA' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontWeight: 800, color: '#0B2545', fontSize: '0.9375rem' }}>{inq.name}</span>
                          <span style={{ color: '#6B7280', fontSize: '0.78125rem', marginLeft: '0.5rem' }}>📱 {inq.phone} • ✉️ {inq.email}</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{new Date(inq.createdAt).toLocaleString()}</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#1E1E1E', fontWeight: 600, marginBottom: '0.35rem' }}>
                        Requested Service: <span style={{ color: '#10B981' }}>{inq.eventType}</span>
                      </div>
                      <div style={{ fontSize: '0.84375rem', color: '#4B5563', background: '#FFFFFF', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                        "{inq.message}"
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
                        <a
                          href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}! Thank you for contacting Ayushman Cards & Graphics regarding "${inq.eventType}". How can we help you?`)}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', background: '#25D366', color: '#FFF', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          💬 Reply on WhatsApp
                        </a>
                        <a
                          href={`tel:${inq.phone}`}
                          style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFF', color: '#1E1E1E', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}
                        >
                          📞 Call Customer
                        </a>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 6: ADMIN SETTINGS & CREDENTIALS ═══ */}
          {activeTab === 'settings' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.75rem', maxWidth: '640px' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                Admin Master Credentials & Studio Info
              </h2>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                Update your login email, master password, contact number, and printing press business address.
              </p>

              {settingMessage && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.8125rem', fontWeight: 600, background: settingMessage.type === 'success' ? '#D1FAE5' : '#FFEBEE', color: settingMessage.type === 'success' ? '#065F46' : '#C62828' }}>
                  {settingMessage.text}
                </div>
              )}

              <form onSubmit={handleAdminSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                      Admin Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingName}
                      onChange={(e) => setSettingName(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                      Admin Email (Login ID) *
                    </label>
                    <input
                      type="email"
                      required
                      value={settingEmail}
                      onChange={(e) => setSettingEmail(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.3rem' }}>
                    Contact Phone Number (for WhatsApp Alerts)
                  </label>
                  <input
                    type="tel"
                    value={settingPhone}
                    onChange={(e) => setSettingPhone(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                  />
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.75rem' }}>
                    Change Master Password
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                        New Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={settingNewPassword}
                        onChange={(e) => setSettingNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={settingConfirmPassword}
                        onChange={(e) => setSettingConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B2545', marginBottom: '0.75rem' }}>
                    Studio Billing & Tax Invoice Location
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>
                        Studio Street Address
                      </label>
                      <input
                        type="text"
                        value={settingAddress}
                        onChange={(e) => setSettingAddress(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>City</label>
                        <input type="text" value={settingCity} onChange={(e) => setSettingCity(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>State</label>
                        <input type="text" value={settingState} onChange={(e) => setSettingState(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.2rem' }}>Pincode</label>
                        <input type="text" value={settingPincode} onChange={(e) => setSettingPincode(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8125rem', color: '#1E1E1E', background: '#FFFFFF' }} />
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
                  {settingSaving ? '⏳ Saving...' : '💾 Save Settings'}
                </button>
              </form>
            </div>
          )}

        </div>

        {/* ═══ ADD/EDIT PRODUCT MODAL ═══ */}
        {showProductModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowProductModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '2rem', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', margin: 0 }}>
                  {editingProduct ? '✏️ Edit Product' : '➕ Add New Catalog Product'}
                </h3>
                <button onClick={() => setShowProductModal(false)} style={{ background: '#F3F4F6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
              </div>

              <form onSubmit={handleSaveProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Product Title *</label>
                  <input type="text" required value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} placeholder="e.g. Royal Blue Velvet Box Invitation" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Category *</label>
                    <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }}>
                      {categoriesList.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Price Text (Display) *</label>
                    <input type="text" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} placeholder="e.g. ₹3,500" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Numeric Price (₹ for Cart) *</label>
                    <input type="number" required value={productForm.numericPrice} onChange={(e) => setProductForm({ ...productForm, numericPrice: Number(e.target.value) })} style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Unit / Minimum Qty</label>
                    <input type="text" value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })} placeholder="e.g. 100 Cards (₹35/card)" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Badge Text</label>
                  <input type="text" value={productForm.badge} onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })} placeholder="e.g. 100 PCS @ ₹3,500 or BESTSELLER" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }} />
                </div>

                {/* ─── PRODUCT IMAGE UPLOADER & PREVIEW ─── */}
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.5rem' }}>
                    Product Image (Upload from Phone/PC or Paste URL) *
                  </label>

                  {/* Image Preview & Upload Button Row */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #E5E7EB', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                      {productForm.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={productForm.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '1.75rem', color: '#9CA3AF' }}>📷</span>
                      )}
                      {isUploadingImage && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '0.7rem', fontWeight: 700 }}>
                          ⏳
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.55rem 1rem',
                          borderRadius: '8px',
                          background: isUploadingImage ? '#9CA3AF' : '#0B2545',
                          color: '#FFFFFF',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          cursor: isUploadingImage ? 'not-allowed' : 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isUploadingImage ? '⏳ Uploading...' : '📁 Choose Photo from Device'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingImage}
                          onChange={handleProductImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '0.35rem' }}>
                        Supports JPG, PNG, WEBP from your phone camera or laptop.
                      </div>
                    </div>
                  </div>

                  {uploadError && (
                    <div style={{ fontSize: '0.75rem', color: '#DC2626', marginBottom: '0.5rem', fontWeight: 600 }}>
                      ⚠️ {uploadError}
                    </div>
                  )}

                  {/* Manual URL / Path Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', marginBottom: '0.2rem' }}>
                      Or Image URL / Local Path:
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="https://... or /images/visiting_cards/..."
                      style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.78125rem', color: '#1E1E1E', background: '#FFFFFF' }}
                    />
                  </div>

                  {/* Quick Preset Library Pills */}
                  <div style={{ marginTop: '0.6rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4B5563', marginBottom: '0.3rem' }}>
                      ⚡ Quick Preset Gallery Assets:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {[
                        { label: '500 GSM Velvet', path: '/images/visiting_cards/card_500gsm_velvet.jpg' },
                        { label: '800 Micron Velvet', path: '/images/visiting_cards/card_800_micron.jpg' },
                        { label: 'Gold/Silver Fused', path: '/images/visiting_cards/card_800_gold_silver.jpg' },
                        { label: 'Metal Card', path: '/images/visiting_cards/metal.jpg' },
                        { label: '180 Micron NT', path: '/images/visiting_cards/card_180_nt_dripoff.jpg' },
                        { label: 'Spot UV Card', path: '/images/visiting_cards/card_matt_spot_uv.jpg' },
                        { label: 'Textured Linen', path: '/images/visiting_cards/card_matt_texture.jpg' },
                        { label: 'Mini Cards', path: '/images/visiting_cards/card_mini_calling.jpg' },
                        { label: 'Royal Blue Velvet', path: '/images/wedding/scroll_royal_blue_velvet.png' },
                        { label: 'Acrylic Wedding', path: '/images/wedding/acrylic_navy_gold.png' },
                        { label: 'Star Flex Banner', path: '/images/banners/outdoor_flex_banner.jpg' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setProductForm({ ...productForm, image: item.path })}
                          style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.6875rem',
                            fontWeight: productForm.image === item.path ? 700 : 500,
                            border: productForm.image === item.path ? '1px solid #0B2545' : '1px solid #E5E7EB',
                            background: productForm.image === item.path ? '#0B2545' : '#FFFFFF',
                            color: productForm.image === item.path ? '#FFFFFF' : '#374151',
                            cursor: 'pointer',
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Description</label>
                  <textarea rows={2} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} placeholder="Write product material, finish, and printing details..." style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF', fontFamily: 'inherit' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Key Features (One per line)</label>
                  <textarea rows={3} value={productForm.features} onChange={(e) => setProductForm({ ...productForm, features: e.target.value })} placeholder="Gold Foil Embossing&#10;Padded Velvet Box&#10;Wax Seal Attached" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <input type="checkbox" id="prodActive" checked={productForm.isActive} onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })} />
                  <label htmlFor="prodActive" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E1E1E' }}>Active on website store</label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: '#10B981', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {editingProduct ? '💾 Update Product' : '✓ Create Product'}
                  </button>
                  <button type="button" onClick={() => setShowProductModal(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', color: '#1E1E1E', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ═══ ADD/EDIT CATEGORY MODAL ═══ */}
        {showCategoryModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowCategoryModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '2rem', maxWidth: '440px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1rem' }}>
                {editingCategory ? '✏️ Edit Category' : '➕ Add New Category'}
              </h3>
              <form onSubmit={handleSaveCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Category Identifier / ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingCategory}
                    value={categoryForm.id}
                    onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })}
                    placeholder="e.g. Wedding Cards, Flex Banners"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: editingCategory ? '#F3F4F6' : '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Display Label *</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.label}
                    onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })}
                    placeholder="e.g. 💍 Wedding Invitation Cards"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Icon Emoji</label>
                  <input
                    type="text"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    placeholder="💍 or 💳 or 🪧"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Description</label>
                  <textarea
                    rows={2}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    placeholder="Brief description of products in this category..."
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', color: '#1E1E1E', background: '#FFFFFF', fontFamily: 'inherit' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: '#10B981', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {editingCategory ? '💾 Update' : '✓ Save Category'}
                  </button>
                  <button type="button" onClick={() => setShowCategoryModal(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', color: '#1E1E1E', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#F3F4F6',
                      border: 'none',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Invoice Body */}
              <div id="printable-invoice">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '2px solid #0B2545', paddingBottom: '1.25rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B2545', margin: '0 0 0.25rem' }}>
                      AYUSHMAN CARDS N GRAPHICS
                    </h2>
                    <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
                      High-Precision Offset Printing, Wedding Cards & Flex Signage
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#6B7280', marginTop: '0.35rem' }}>
                      Freeganj Main Road, Ujjain, Madhya Pradesh - 456010<br />
                      Phone: +91 9479784979 | GSTIN: 23AABCU9603R1Z2
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.6rem', borderRadius: '4px', background: '#0B2545', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      TAX INVOICE
                    </span>
                    <div style={{ fontSize: '0.84375rem', fontWeight: 700, color: '#1E1E1E' }}>
                      Invoice #{selectedInvoiceOrder.id.replace('bk_', 'INV-2025-')}
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#6B7280' }}>
                      Date: {new Date(selectedInvoiceOrder.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.75rem', background: '#F9FAFB', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      BILLED TO (CLIENT):
                    </div>
                    <div style={{ fontWeight: 700, color: '#1E1E1E', fontSize: '0.9375rem' }}>
                      {selectedInvoiceOrder.customerName}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#4B5563', marginTop: '0.2rem' }}>
                      Phone: {selectedInvoiceOrder.customerPhone}
                    </div>
                    {selectedInvoiceOrder.customerEmail && (
                      <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
                        Email: {selectedInvoiceOrder.customerEmail}
                      </div>
                    )}
                    {selectedInvoiceOrder.address && (
                      <div style={{ fontSize: '0.78125rem', color: '#6B7280', marginTop: '0.2rem' }}>
                        Address: {selectedInvoiceOrder.address}
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                      PAYMENT & DISPATCH:
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#1E1E1E', marginBottom: '0.25rem' }}>
                      Payment Method: <strong>{selectedInvoiceOrder.razorpayPaymentId?.startsWith('WA_') ? 'WhatsApp Order' : selectedInvoiceOrder.razorpayPaymentId?.startsWith('UTR_') ? 'Direct UPI Transfer' : 'Razorpay Gateway'}</strong>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#1E1E1E', marginBottom: '0.25rem' }}>
                      Payment Status: <strong style={{ color: selectedInvoiceOrder.paymentStatus === 'PAID' ? '#10B981' : '#D97706' }}>{selectedInvoiceOrder.paymentStatus}</strong>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#1E1E1E' }}>
                      Order Status: <strong>{selectedInvoiceOrder.status}</strong>
                    </div>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84375rem', marginBottom: '1.75rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', background: '#F3F4F6', color: '#1E1E1E' }}>
                      <th style={{ padding: '0.65rem', textAlign: 'left' }}>Item Description</th>
                      <th style={{ padding: '0.65rem', textAlign: 'center' }}>Job Specs</th>
                      <th style={{ padding: '0.65rem', textAlign: 'right' }}>Total (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '0.75rem 0.65rem' }}>
                        <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{selectedInvoiceOrder.eventType}</div>
                        {selectedInvoiceOrder.notes && (
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>
                            {selectedInvoiceOrder.notes}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem 0.65rem', textAlign: 'center', color: '#4B5563', fontSize: '0.8125rem' }}>
                        {selectedInvoiceOrder.packageType || 'Custom Print Job'}
                      </td>
                      <td style={{ padding: '0.75rem 0.65rem', textAlign: 'right', fontWeight: 700, color: '#1E1E1E' }}>
                        ₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ padding: '0.65rem', textAlign: 'right', fontWeight: 600, color: '#6B7280' }}>Subtotal:</td>
                      <td style={{ padding: '0.65rem', textAlign: 'right', fontWeight: 600 }}>₹{Math.round(selectedInvoiceOrder.totalAmount / 1.18).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding: '0.65rem', textAlign: 'right', fontWeight: 600, color: '#6B7280' }}>CGST (9%) + SGST (9%):</td>
                      <td style={{ padding: '0.65rem', textAlign: 'right', fontWeight: 600 }}>₹{(selectedInvoiceOrder.totalAmount - Math.round(selectedInvoiceOrder.totalAmount / 1.18)).toLocaleString()}</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid #0B2545' }}>
                      <td colSpan={2} style={{ padding: '0.75rem 0.65rem', textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: '#0B2545' }}>
                        Grand Total (INR):
                      </td>
                      <td style={{ padding: '0.75rem 0.65rem', textAlign: 'right', fontWeight: 800, fontSize: '1.25rem', color: '#0B2545' }}>
                        ₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem', fontSize: '0.75rem', color: '#6B7280' }}>
                  <div>
                    <div><strong>Terms & Conditions:</strong></div>
                    <div>1. Goods once printed as per approved proof cannot be returned.</div>
                    <div>2. Subject to Ujjain jurisdiction.</div>
                    <div style={{ marginTop: '0.5rem', color: '#0B2545', fontWeight: 600 }}>Thank you for choosing Ayushman Cards & Graphics!</div>
                  </div>
                  <div style={{ textAlign: 'center', minWidth: '160px' }}>
                    <div style={{ height: '45px', borderBottom: '1px solid #9CA3AF', marginBottom: '0.35rem' }}></div>
                    <div style={{ fontWeight: 700, color: '#1E1E1E' }}>Authorized Signatory</div>
                    <div>Ayushman Cards n Graphics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
