'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminPortalPage() {
  const { user, login, logout, refreshUser } = useAuth();

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
  const [bannersList, setBannersList] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, paidOrders: 0 });
  const [loadingData, setLoadingData] = useState(true);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'categories' | 'banners' | 'users' | 'inquiries' | 'settings'>('orders');
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

  // Hero Banner CMS Modal State
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [isUploadingBannerImg, setIsUploadingBannerImg] = useState(false);
  const [bannerUploadError, setBannerUploadError] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badge: 'ROYAL COLLECTION 2026',
    image: '/images/wedding/scroll_royal_blue_velvet.png',
    link: '/products?category=Wedding Cards',
    buttonText: 'Explore Collection',
    displayOrder: 1,
    isActive: true,
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
      const [ordersRes, usersRes, inquiriesRes, productsRes, categoriesRes, bannersRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/users'),
        fetch('/api/inquiries'),
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/banners'),
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

      if (bannersRes && bannersRes.ok) {
        const bannersData = await bannersRes.json();
        if (bannersData.success) {
          setBannersList(bannersData.banners || []);
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
      setSettingCity((user as any).city || '');
      setSettingState((user as any).state || '');
      setSettingPincode((user as any).pincode || '');
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await login({ email: adminEmail, password: adminPassword });
      if (res && res.success) {
        window.location.reload();
      } else {
        setLoginError(res?.error || 'Invalid administrator credentials.');
      }
    } catch {
      setLoginError('Network or authorization error.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setActionNotice(`✓ Order #${orderId.slice(-6)} status set to ${newStatus}`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchAdminData();
      }
    } catch {
      alert('Error updating order status');
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, paymentStatus }),
      });
      if (res.ok) {
        setActionNotice(`✓ Payment status updated to ${paymentStatus}`);
        setTimeout(() => setActionNotice(null), 3000);
        fetchAdminData();
      }
    } catch {
      alert('Error updating payment status');
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setUploadError(null);
    setProductForm({
      title: '',
      category: categoriesList[0]?.id || 'Wedding Cards',
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
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: any) => {
    setEditingProduct(prod);
    setUploadError(null);
    setProductForm({
      title: prod.title,
      category: prod.category,
      badge: prod.badge || '',
      price: prod.price || `₹${prod.numericPrice || 0}`,
      numericPrice: prod.numericPrice || 0,
      unit: prod.unit || '100 Cards',
      image: prod.image,
      description: prod.description || '',
      features: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || ''),
      customizerId: prod.customizerId || 'wedding-card',
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
        setProductForm((prev) => ({ ...prev, image: base64Data }));

        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Data, folder: 'ayushman_products' }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            setProductForm((prev) => ({ ...prev, image: data.url }));
            setActionNotice('✓ Image uploaded to Cloud CDN successfully!');
            setTimeout(() => setActionNotice(null), 3000);
          }
        } catch {
          // fallback
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingImage(false);
      setUploadError('Failed to read image file.');
    }
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = productForm.features
        ? productForm.features.split('\n').map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        ...productForm,
        id: editingProduct ? editingProduct.id : undefined,
        features: featuresArray,
      };

      const res = await fetch('/api/admin/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowProductModal(false);
        setActionNotice(`✓ Product "${productForm.title}" saved successfully!`);
        setTimeout(() => setActionNotice(null), 3500);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('catalogUpdated'));
          localStorage.setItem('ayushman_catalog_updated_at', Date.now().toString());
        }
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch {
      alert('Error saving product.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Product removed from store.');
        setTimeout(() => setActionNotice(null), 3500);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('catalogUpdated'));
          localStorage.setItem('ayushman_catalog_updated_at', Date.now().toString());
        }
        fetchAdminData();
      }
    } catch {
      alert('Error deleting product');
    }
  };

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ id: '', label: '', icon: '🏷️', description: '' });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      label: cat.label,
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
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('catalogUpdated'));
          localStorage.setItem('ayushman_catalog_updated_at', Date.now().toString());
        }
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
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('catalogUpdated'));
          localStorage.setItem('ayushman_catalog_updated_at', Date.now().toString());
        }
        fetchAdminData();
      }
    } catch {
      alert('Error deleting category');
    }
  };

  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setBannerUploadError(null);
    setBannerForm({
      title: '',
      subtitle: '',
      badge: 'ROYAL COLLECTION 2026',
      image: '/images/wedding/scroll_royal_blue_velvet.png',
      link: '/products?category=Wedding Cards',
      buttonText: 'Explore Now',
      displayOrder: (bannersList.length || 0) + 1,
      isActive: true,
    });
    setShowBannerModal(true);
  };

  const handleOpenEditBanner = (bnr: any) => {
    setEditingBanner(bnr);
    setBannerUploadError(null);
    setBannerForm({
      title: bnr.title || '',
      subtitle: bnr.subtitle || '',
      badge: bnr.badge || '',
      image: bnr.image || '/images/wedding/scroll_royal_blue_velvet.png',
      link: bnr.link || '/products',
      buttonText: bnr.buttonText || 'Explore Now',
      displayOrder: bnr.displayOrder || 1,
      isActive: bnr.isActive !== false,
    });
    setShowBannerModal(true);
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBannerImg(true);
    setBannerUploadError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        setBannerForm((prev) => ({ ...prev, image: base64Data }));

        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Data, folder: 'ayushman_hero_banners' }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            setBannerForm((prev) => ({ ...prev, image: data.url }));
            setActionNotice('✓ Banner image uploaded to CDN successfully!');
            setTimeout(() => setActionNotice(null), 3000);
          }
        } catch {
          // fallback
        } finally {
          setIsUploadingBannerImg(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingBannerImg(false);
      setBannerUploadError('Failed to read image file.');
    }
  };

  const handleSaveBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...bannerForm,
        id: editingBanner ? editingBanner.id : undefined,
      };

      const res = await fetch('/api/admin/banners', {
        method: editingBanner ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowBannerModal(false);
        setActionNotice(`✓ Hero Banner "${bannerForm.title || 'Slide'}" saved successfully!`);
        setTimeout(() => setActionNotice(null), 3500);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('bannersUpdated'));
          localStorage.setItem('ayushman_banners_updated_at', Date.now().toString());
        }
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to save hero banner');
      }
    } catch {
      alert('Error saving hero banner.');
    }
  };

  const handleToggleBannerActive = async (banner: any) => {
    try {
      const res = await fetch('/api/admin/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: banner.id, isActive: banner.isActive === false }),
      });
      if (res.ok) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('bannersUpdated'));
          localStorage.setItem('ayushman_banners_updated_at', Date.now().toString());
        }
        fetchAdminData();
      }
    } catch {
      alert('Error updating banner status');
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this hero banner?')) return;
    try {
      const res = await fetch(`/api/admin/banners?id=${bannerId}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice('✓ Hero Banner removed.');
        setTimeout(() => setActionNotice(null), 3500);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('bannersUpdated'));
          localStorage.setItem('ayushman_banners_updated_at', Date.now().toString());
        }
        fetchAdminData();
      }
    } catch {
      alert('Error deleting banner');
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
        setActionNotice(`✓ Account for ${newUser.name} created!`);
        setTimeout(() => setActionNotice(null), 3000);
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
        fetchAdminData();
      }
    } catch {
      alert('Error deleting user');
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!confirm('Delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${inquiryId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAdminData();
      }
    } catch {
      alert('Error deleting inquiry');
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
      setSettingMessage({ text: 'Network error updating settings.', type: 'error' });
    }
  };

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

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = productCatFilter === 'ALL' || p.category === productCatFilter;
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.badge?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredUsers = usersList.filter((u) => {
    return (
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery)
    );
  });

  if (!user || user.role !== 'ADMIN') {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '2.5rem', maxWidth: '440px', width: '100%', border: '1px solid #E5E7EB', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#0B2545', margin: '0 0 0.5rem' }}>
              🛡️ Admin Portal Login
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0 0 1.5rem' }}>
              Restricted management area for Ayushman Cards n Graphics.
            </p>

            {loginError && (
              <div style={{ padding: '0.65rem', borderRadius: '8px', background: '#FEE2E2', color: '#991B1B', fontSize: '0.8125rem', marginBottom: '1.25rem', fontWeight: 600 }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.35rem' }}>Admin Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@ayushmancards.com"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.35rem' }}>Master Password</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '999px',
                  background: '#0B2545',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: loginLoading ? 'wait' : 'pointer',
                }}
              >
                {loginLoading ? 'Authenticating...' : 'Sign In as Administrator'}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '85vh', background: '#F9FAFB', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: '#0B2545', margin: 0 }}>
                🛡️ Studio Admin Portal & Operations
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
                Manage live catalog products, categories, hero banners, orders fulfillment, customer accounts, and tax invoices.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={fetchAdminData}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', color: '#0B2545', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
              >
                🔄 Refresh Sync
              </button>
              <button
                onClick={() => logout()}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#FEE2E2', color: '#991B1B', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          </div>

          {actionNotice && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: '#0B2545', color: '#FFF', fontSize: '0.84375rem', fontWeight: 600, marginBottom: '1.25rem' }}>
              {actionNotice}
            </div>
          )}

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

          {/* Navigation Tabs Bar */}
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
              onClick={() => setActiveTab('banners')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'banners' ? '#0B2545' : 'transparent',
                color: activeTab === 'banners' ? '#FFFFFF' : '#4B5563',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>🖼️</span> Hero Banners ({bannersList.length})
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
              💬 Messages & Quotes ({inquiries.length})
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
              ⚙️ Studio & Admin Credentials
            </button>
          </div>

          {/* ═══ TAB 1: ORDERS FULFILLMENT ═══ */}
          {activeTab === 'orders' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flex: '1 1 320px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search client name, phone, order ID, event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: '1 1 220px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem' }}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', background: '#FFFFFF' }}
                  >
                    <option value="ALL">All Order Statuses</option>
                    <option value="NEW">NEW</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="PRINTING">PRINTING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="PAID">Paid Only</option>
                  </select>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563', textTransform: 'uppercase', fontSize: '0.725rem' }}>
                      <th style={{ padding: '0.75rem' }}>Order ID</th>
                      <th style={{ padding: '0.75rem' }}>Customer & Contact</th>
                      <th style={{ padding: '0.75rem' }}>Product / Specs</th>
                      <th style={{ padding: '0.75rem' }}>Total Amount</th>
                      <th style={{ padding: '0.75rem' }}>Payment Status</th>
                      <th style={{ padding: '0.75rem' }}>Fulfillment Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right' }}>Tax Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: '#0B2545' }}>
                          #{o.id.slice(-6).toUpperCase()}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{o.customerName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>📱 {o.customerPhone}</div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: 600, color: '#1E1E1E' }}>{o.eventType}</div>
                          <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>{o.packageType || 'Custom Print Job'}</div>
                        </td>
                        <td style={{ padding: '0.75rem', fontWeight: 800, color: '#1E1E1E' }}>
                          ₹{o.totalAmount?.toLocaleString()}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <select
                            value={o.paymentStatus || 'PENDING'}
                            onChange={(e) => handleUpdatePaymentStatus(o.id, e.target.value)}
                            style={{
                              padding: '0.3rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid #D1D5DB',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: o.paymentStatus === 'PAID' ? '#D1FAE5' : '#FEF3C7',
                              color: o.paymentStatus === 'PAID' ? '#065F46' : '#92400E',
                            }}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PAID">PAID</option>
                            <option value="FAILED">FAILED</option>
                          </select>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <select
                            value={o.status || 'NEW'}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            style={{
                              padding: '0.3rem 0.6rem',
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
                          <button
                            onClick={() => setSelectedInvoiceOrder(o)}
                            style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', background: '#0B2545', color: '#FFFFFF', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            🧾 Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ TAB 2: PRODUCTS CATALOG CMS ═══ */}
          {activeTab === 'products' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flex: '1 1 350px', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Search product name, finish, badge..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: '1 1 200px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem' }}
                  />
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem', background: '#FFFFFF' }}
                  >
                    <option value="ALL">All Categories ({productsList.length})</option>
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleOpenAddProduct}
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
                  ➕ Add New Product
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563', textTransform: 'uppercase', fontSize: '0.725rem' }}>
                      <th style={{ padding: '0.75rem' }}>Product</th>
                      <th style={{ padding: '0.75rem' }}>Category</th>
                      <th style={{ padding: '0.75rem' }}>Price & Unit</th>
                      <th style={{ padding: '0.75rem' }}>Badge Tag</th>
                      <th style={{ padding: '0.75rem' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', background: '#F3F4F6' }} />
                            <div>
                              <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{p.title}</div>
                              <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>Customizer: {p.customizerId || 'wedding-card'}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem', color: '#4B5563' }}>{p.category}</td>
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#1E1E1E' }}>
                          {p.price} <span style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 500 }}>/ {p.unit || 'unit'}</span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          {p.badge && (
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#E0E7FF', color: '#3730A3', fontSize: '0.6875rem', fontWeight: 700 }}>
                              {p.badge}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, background: p.isActive !== false ? '#D1FAE5' : '#FEE2E2', color: p.isActive !== false ? '#065F46' : '#991B1B' }}>
                            {p.isActive !== false ? 'Live' : 'Hidden'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#0B2545', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
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
            </div>
          )}

          {/* ═══ TAB 3: CATEGORIES CMS ═══ */}
          {activeTab === 'categories' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#1E1E1E' }}>
                  Product Categories ({categoriesList.length})
                </h3>
                <button
                  onClick={handleOpenAddCategory}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  ➕ Add New Category
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {categoriesList.map((cat) => (
                  <div key={cat.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '1.25rem', background: '#FAFAFA', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{cat.icon || '🏷️'}</span>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0B2545' }}>{cat.label}</div>
                      </div>
                      <div style={{ fontSize: '0.78125rem', color: '#6B7280', marginBottom: '0.75rem' }}>
                        {cat.description || 'No description'}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', marginBottom: '0.75rem' }}>
                        📦 {productsList.filter((p) => p.category === cat.id).length} Active Products
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem' }}>
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #0B2545', background: 'rgba(11,37,69,0.06)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#0B2545' }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#991B1B' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TAB 4: HERO BANNERS CMS ═══ */}
          {activeTab === 'banners' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.25rem', color: '#1E1E1E' }}>
                    Homepage Hero Banners ({bannersList.length})
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
                    Recommended size: <strong>1920 × 600 px</strong>. Center-cropped and auto-advances on the homepage.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddBanner}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: '999px',
                    background: '#0B2545',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  ➕ Add Hero Banner
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {bannersList.map((bnr, idx) => (
                  <div key={bnr.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ height: '140px', position: 'relative', background: '#0B2545' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={bnr.image} alt={bnr.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                      <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.75)', color: '#FFF', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        Slide #{bnr.displayOrder || idx + 1}
                      </div>
                      <button
                        onClick={() => handleToggleBannerActive(bnr)}
                        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.2rem 0.5rem', borderRadius: '999px', border: 'none', fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', background: bnr.isActive !== false ? '#10B981' : '#EF4444', color: '#FFFFFF' }}
                      >
                        {bnr.isActive !== false ? 'Live' : 'Hidden'}
                      </button>
                    </div>

                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E1E1E', marginBottom: '0.25rem' }}>
                          {bnr.title || 'Untitled Image Banner'}
                        </div>
                        {bnr.subtitle && (
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                            {bnr.subtitle}
                          </div>
                        )}
                        <div style={{ fontSize: '0.725rem', color: '#4B5563', background: '#F8FAFC', padding: '0.4rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
                          🔗 {bnr.link || '/products'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                        <button
                          onClick={() => handleOpenEditBanner(bnr)}
                          style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #0B2545', background: 'rgba(11,37,69,0.06)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#0B2545' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBanner(bnr.id)}
                          style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', color: '#991B1B' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TAB 5: USERS MANAGEMENT ═══ */}
          {activeTab === 'users' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Search user name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '320px', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84375rem' }}
                />
                <button
                  onClick={() => setShowAddUserModal(true)}
                  style={{ padding: '0.65rem 1.35rem', borderRadius: '999px', background: '#0B2545', color: '#FFFFFF', border: 'none', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  ➕ Create User / Admin Account
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#4B5563', textTransform: 'uppercase', fontSize: '0.725rem' }}>
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
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#1E1E1E' }}>{u.name}</td>
                        <td style={{ padding: '0.75rem', color: '#4B5563' }}>{u.email}</td>
                        <td style={{ padding: '0.75rem', color: '#6B7280' }}>{u.phone || '—'}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, background: u.role === 'ADMIN' ? '#FEF3C7' : '#E0E7FF', color: u.role === 'ADMIN' ? '#92400E' : '#3730A3' }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          {u.email !== 'admin@ayushmancards.com' && (
                            <button onClick={() => handleDeleteUser(u.id)} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}>
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

          {/* ═══ TAB 6: INQUIRIES ═══ */}
          {activeTab === 'inquiries' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1.25rem', color: '#1E1E1E' }}>
                Customer Messages & Quote Requests ({inquiries.length})
              </h3>
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
                        <a href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}! Thank you for contacting Ayushman Cards regarding "${inq.eventType}". How can we help you?`)}`} target="_blank" rel="noreferrer" style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', background: '#25D366', color: '#FFF', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700 }}>
                          💬 Reply on WhatsApp
                        </a>
                        <a href={`tel:${inq.phone}`} style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFF', color: '#1E1E1E', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                          📞 Call Customer
                        </a>
                        <button onClick={() => handleDeleteInquiry(inq.id)} style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB 7: SETTINGS & MASTER CREDENTIALS ═══ */}
          {activeTab === 'settings' && (
            <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.75rem', maxWidth: '640px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', margin: '0 0 0.3rem' }}>
                Admin Master Credentials & Studio Info
              </h2>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0 0 1.5rem' }}>
                Update your login email, master password, contact number, and business address.
              </p>

              {settingMessage && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.8125rem', fontWeight: 600, background: settingMessage.type === 'success' ? '#D1FAE5' : '#FFEBEE', color: settingMessage.type === 'success' ? '#065F46' : '#C62828' }}>
                  {settingMessage.text}
                </div>
              )}

              <form onSubmit={handleAdminSettingsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Full Name</label>
                  <input type="text" required value={settingName} onChange={(e) => setSettingName(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Email Address</label>
                  <input type="email" required value={settingEmail} onChange={(e) => setSettingEmail(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Contact Phone</label>
                  <input type="tel" value={settingPhone} onChange={(e) => setSettingPhone(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Printing Studio Address</label>
                  <textarea rows={2} value={settingAddress} onChange={(e) => setSettingAddress(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontFamily: 'inherit' }} />
                </div>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.5rem' }}>Change Master Password (Optional)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <input type="password" placeholder="New Password" value={settingNewPassword} onChange={(e) => setSettingNewPassword(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                    <input type="password" placeholder="Confirm Password" value={settingConfirmPassword} onChange={(e) => setSettingConfirmPassword(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                </div>

                <button type="submit" disabled={settingSaving} style={{ marginTop: '0.5rem', padding: '0.75rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontWeight: 700, cursor: settingSaving ? 'wait' : 'pointer' }}>
                  {settingSaving ? 'Saving Changes...' : 'Save Admin Settings'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ═══ MODALS ═══ */}
        {showProductModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }} onClick={() => setShowProductModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '2rem', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1.25rem' }}>
                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </h3>
              <form onSubmit={handleSaveProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Product Title *</label>
                  <input type="text" required value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Category</label>
                    <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFF' }}>
                      {categoriesList.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Price (INR) *</label>
                    <input type="number" required value={productForm.numericPrice} onChange={(e) => setProductForm({ ...productForm, numericPrice: parseInt(e.target.value) || 0, price: `₹${e.target.value}` })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Image *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <label style={{ padding: '0.55rem 1rem', background: '#0B2545', color: '#FFF', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: isUploadingImage ? 'wait' : 'pointer' }}>
                      📁 {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                      <input type="file" accept="image/*" onChange={handleProductImageUpload} disabled={isUploadingImage} style={{ display: 'none' }} />
                    </label>
                    <input type="text" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} style={{ flex: 1, padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Description</label>
                  <textarea rows={2} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontFamily: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: '#10B981', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {editingProduct ? '💾 Update Product' : '✓ Create Product'}
                  </button>
                  <button type="button" onClick={() => setShowProductModal(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showCategoryModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowCategoryModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '2rem', maxWidth: '440px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1rem' }}>
                {editingCategory ? '✏️ Edit Category' : '➕ Add New Category'}
              </h3>
              <form onSubmit={handleSaveCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Category ID *</label>
                  <input type="text" required disabled={!!editingCategory} value={categoryForm.id} onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: editingCategory ? '#F3F4F6' : '#FFF' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Label *</label>
                  <input type="text" required value={categoryForm.label} onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Icon Emoji</label>
                  <input type="text" value={categoryForm.icon} onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: '#10B981', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {editingCategory ? '💾 Update' : '✓ Save Category'}
                  </button>
                  <button type="button" onClick={() => setShowCategoryModal(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showBannerModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }} onClick={() => setShowBannerModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '2rem', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B2545', marginBottom: '1rem' }}>
                {editingBanner ? '✏️ Edit Hero Banner' : '➕ Create New Hero Banner'}
              </h3>
              <form onSubmit={handleSaveBannerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.35rem' }}>Banner Image * (1920x600 px recommended)</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <label style={{ padding: '0.55rem 1rem', background: '#0B2545', color: '#FFF', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 700, cursor: isUploadingBannerImg ? 'wait' : 'pointer' }}>
                      📁 {isUploadingBannerImg ? 'Uploading...' : 'Upload Image'}
                      <input type="file" accept="image/*" onChange={handleBannerImageUpload} disabled={isUploadingBannerImg} style={{ display: 'none' }} />
                    </label>
                    <input type="text" required value={bannerForm.image} onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })} style={{ flex: 1, padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.25rem' }}>Headline Title</label>
                  <input type="text" value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} placeholder="e.g. Royal Velvet Box Wedding Invitations" style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.25rem' }}>Subtitle</label>
                  <textarea rows={2} value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.25rem' }}>Target Destination Link *</label>
                    <input type="text" required value={bannerForm.link} onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })} style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78125rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.25rem' }}>Order</label>
                    <input type="number" min={1} value={bannerForm.displayOrder} onChange={(e) => setBannerForm({ ...bannerForm, displayOrder: parseInt(e.target.value) || 1 })} style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: '#10B981', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {editingBanner ? '💾 Save Changes' : '✓ Publish Hero Banner'}
                  </button>
                  <button type="button" onClick={() => setShowBannerModal(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddUserModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowAddUserModal(false)}>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.75rem', maxWidth: '420px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '1rem' }}>Create Account</h3>
              <form onSubmit={handleCreateUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Full Name *</label>
                  <input type="text" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Email Address *</label>
                  <input type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Password *</label>
                  <input type="password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E1E1E', marginBottom: '0.2rem' }}>Role</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}>
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.7rem', borderRadius: '999px', background: '#0B2545', color: '#FFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Create Account</button>
                  <button type="button" onClick={() => setShowAddUserModal(false)} style={{ padding: '0.7rem 1rem', borderRadius: '999px', border: '1px solid #D1D5DB', background: '#FFF', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedInvoiceOrder && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }} onClick={() => setSelectedInvoiceOrder(null)}>
            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '2.5rem', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 48px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 600 }}>STUDIO TAX INVOICE / CASH RECEIPT</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => window.print()} style={{ padding: '0.5rem 1rem', borderRadius: '999px', background: '#0B2545', color: '#FFFFFF', border: 'none', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer' }}>🖨️ Print</button>
                  <button onClick={() => setSelectedInvoiceOrder(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F3F4F6', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '2px solid #0B2545', paddingBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0B2545', margin: '0 0 0.25rem' }}>AYUSHMAN CARDS N GRAPHICS</h2>
                    <div style={{ fontSize: '0.78125rem', color: '#6B7280' }}>Freeganj Main Road, Ujjain, MP • GSTIN: 23AABCU9603R1Z2</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.84375rem', fontWeight: 700 }}>Invoice #{selectedInvoiceOrder.id.slice(-6).toUpperCase()}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{new Date(selectedInvoiceOrder.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div style={{ background: '#F9FAFB', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 700, color: '#1E1E1E' }}>Billed To: {selectedInvoiceOrder.customerName}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>Phone: {selectedInvoiceOrder.customerPhone}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#10B981', fontWeight: 700, marginTop: '0.25rem' }}>Payment Status: {selectedInvoiceOrder.paymentStatus}</div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84375rem', marginBottom: '1.5rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E5E7EB', background: '#F3F4F6' }}>
                      <th style={{ padding: '0.65rem', textAlign: 'left' }}>Item Description</th>
                      <th style={{ padding: '0.65rem', textAlign: 'right' }}>Total (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: '0.75rem 0.65rem' }}>{selectedInvoiceOrder.eventType} - {selectedInvoiceOrder.packageType || 'Custom Print'}</td>
                      <td style={{ padding: '0.75rem 0.65rem', textAlign: 'right', fontWeight: 700 }}>₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ padding: '0.75rem 0.65rem', fontWeight: 800, fontSize: '1rem', color: '#0B2545' }}>Grand Total (INR):</td>
                      <td style={{ padding: '0.75rem 0.65rem', textAlign: 'right', fontWeight: 800, fontSize: '1.2rem', color: '#0B2545' }}>₹{selectedInvoiceOrder.totalAmount?.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
