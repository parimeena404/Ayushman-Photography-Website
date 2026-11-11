/**
 * Turso Cloud Database Client
 *
 * Replaces the ephemeral file-based JSON store with a persistent
 * Turso (LibSQL) cloud database. All writes are durable across Vercel
 * serverless function restarts.
 *
 * Uses @libsql/client/web for clean Vercel serverless & Next.js bundler compatibility.
 */

import { createClient, Client } from '@libsql/client/web';
import fs from 'fs';
import path from 'path';

// Inline types to avoid circular dependency with db.ts
export interface UserRecord {
  id: string; name: string; email: string; password: string;
  phone?: string | null; address?: string | null; city?: string | null;
  state?: string | null; pincode?: string | null; role: string;
  createdAt: string; updatedAt: string;
}
export interface BookingRecord {
  id: string; userId?: string | null; customerName: string; customerEmail: string;
  customerPhone: string; eventType: string; eventDate: string; city?: string | null;
  address?: string | null; notes?: string | null; packageType: string;
  totalAmount: number; depositAmount: number; paymentStatus: string;
  razorpayOrderId?: string | null; razorpayPaymentId?: string | null;
  razorpaySignature?: string | null; status: string;
  uploadedFiles?: { name: string; size: string; previewUrl?: string; type?: string }[] | null;
  driveLink?: string | null; printInstructions?: string | null;
  whatsappFollowup?: boolean; createdAt: string; updatedAt: string;
}
export interface InquiryRecord {
  id: string; userId?: string | null; name: string; email: string;
  phone: string; eventType: string; date?: string | null; message: string; createdAt: string;
}
export interface CategoryRecord {
  id: string; label: string; icon: string; description?: string;
  createdAt: string; updatedAt: string;
}
export interface PaperOption { label: string; extraPrice: number; }
export interface QuantityOption { qty: number; multiplier: number; }
export interface ProductRecord {
  id: string; customizerId: string; title: string; category: string;
  badge: string; price: string; numericPrice: number; unit: string; image: string;
  description: string; rating?: number; reviews?: number; features?: string[];
  paperOptions?: PaperOption[]; quantityOptions?: QuantityOption[];
  cornerOptions?: string[]; isActive?: boolean; createdAt: string; updatedAt: string;
}
export interface SettingsRecord {
  id: string; shopName: string; proprietor: string; address: string;
  city: string; state: string; pincode: string; phonePrimary: string;
  phoneSecondary: string; whatsappNumber: string; whatsappMessage: string;
  instagramUrl: string; instagramHandle: string; facebookUrl: string;
  youtubeUrl: string; email: string; updatedAt: string;
}
export interface BannerRecord {
  id: string; title: string; subtitle?: string; badge?: string; image: string;
  link?: string; buttonText?: string; displayOrder?: number; isActive: boolean;
  createdAt: string; updatedAt: string;
}
export interface CouponRecord {
  id: string; code: string; discountType: 'PERCENT' | 'FLAT'; discountValue: number;
  minOrderAmount: number; isActive: boolean; expiryDate?: string;
  usageCount: number; createdAt: string;
}

const DEFAULT_PAPER_OPTIONS: PaperOption[] = [
  { label: '350 GSM Premium Matte', extraPrice: 0 },
  { label: 'Glossy Laminated (350 GSM)', extraPrice: 30 },
  { label: 'Velvet Touch Soft-Feel', extraPrice: 80 },
  { label: 'Spot UV Selective Coating', extraPrice: 150 },
  { label: 'Royal Gold Foil Embossed', extraPrice: 250 },
];
const DEFAULT_QUANTITY_OPTIONS: QuantityOption[] = [
  { qty: 100, multiplier: 1 }, { qty: 250, multiplier: 2.2 },
  { qty: 500, multiplier: 3.8 }, { qty: 1000, multiplier: 6.5 },
];
const PRODUCT_QUANTITY_TIERS: Record<string, QuantityOption[]> = {
  'vc-metal': [{ qty: 10, multiplier: 1 }, { qty: 25, multiplier: 2.2 }, { qty: 50, multiplier: 4 }, { qty: 100, multiplier: 7.2 }],
  'vc-500-velvet': [{ qty: 500, multiplier: 1 }, { qty: 1000, multiplier: 1.8 }, { qty: 2000, multiplier: 3.2 }, { qty: 5000, multiplier: 7 }],
  'vc-500-matt': [{ qty: 500, multiplier: 1 }, { qty: 1000, multiplier: 1.8 }, { qty: 2000, multiplier: 3.2 }, { qty: 5000, multiplier: 7 }],
  'vc-180-nt': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'vc-matt-spotuv': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'vc-matt-texture': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'vc-gloss-lamination': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'vc-uncoated': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'vc-mini-cards': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'st-1': [{ qty: 500, multiplier: 1 }, { qty: 1000, multiplier: 1.8 }, { qty: 2000, multiplier: 3.2 }, { qty: 5000, multiplier: 7 }],
  'st-2': [{ qty: 10, multiplier: 1 }, { qty: 20, multiplier: 1.85 }, { qty: 50, multiplier: 4 }, { qty: 100, multiplier: 7.2 }],
  'st-3': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.25 }, { qty: 10, multiplier: 8 }],
  'st-4': [{ qty: 500, multiplier: 1 }, { qty: 1000, multiplier: 1.8 }, { qty: 2000, multiplier: 3.2 }, { qty: 5000, multiplier: 7 }],
  'flex-2': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.5 }, { qty: 10, multiplier: 8.5 }],
  'flex-3': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.5 }, { qty: 10, multiplier: 8.5 }],
  'stk-1': [{ qty: 500, multiplier: 1 }, { qty: 1000, multiplier: 1.8 }, { qty: 2000, multiplier: 3.2 }, { qty: 5000, multiplier: 7 }],
  'stk-2': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'stk-3': [{ qty: 1000, multiplier: 1 }, { qty: 2000, multiplier: 1.85 }, { qty: 5000, multiplier: 4 }, { qty: 10000, multiplier: 7.2 }],
  'pb-1': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.5 }, { qty: 10, multiplier: 8.5 }],
  'pb-2': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.5 }, { qty: 10, multiplier: 8.5 }],
  'gift-1': [{ qty: 10, multiplier: 1 }, { qty: 25, multiplier: 2.25 }, { qty: 50, multiplier: 4.2 }, { qty: 100, multiplier: 7.8 }],
  'gift-2': [{ qty: 5, multiplier: 1 }, { qty: 10, multiplier: 1.9 }, { qty: 25, multiplier: 4.3 }, { qty: 50, multiplier: 8 }],
  'gift-3': [{ qty: 1, multiplier: 1 }, { qty: 2, multiplier: 1.9 }, { qty: 5, multiplier: 4.5 }, { qty: 10, multiplier: 8.5 }],
};
const DEFAULT_CORNER_OPTIONS: string[] = ['Standard Cut', 'Rounded Corners'];
const DEFAULT_SETTINGS: SettingsRecord = {
  id: 'site-settings', shopName: 'Ayushman Cards & Graphics',
  proprietor: 'Rajesh Saatoliya', address: '63, Varruchi Marg, Freeganj Ujjain',
  city: 'Ujjain', state: 'Madhya Pradesh', pincode: '456001',
  phonePrimary: '9479784979', phoneSecondary: '9893022451',
  whatsappNumber: '+919479784979',
  whatsappMessage: 'Hello Ayushman Cards & Graphics Press, I would like to inquire about wedding cards, visiting cards, flex banners & printing services.',
  instagramUrl: 'https://instagram.com/ayushmancards_ujjain',
  instagramHandle: '@ayushmancards_ujjain',
  facebookUrl: 'https://facebook.com/ayushmancards',
  youtubeUrl: 'https://youtube.com/@ayushmancards',
  email: 'ayushmancardspress@gmail.com',
  updatedAt: '2025-01-01T00:00:00.000Z',
};
const DEFAULT_COUPONS: CouponRecord[] = [
  { id: 'c-1', code: 'FESTIVE20', discountType: 'PERCENT', discountValue: 20, minOrderAmount: 1000, isActive: true, usageCount: 42, createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'c-2', code: 'BULKPRINT15', discountType: 'PERCENT', discountValue: 15, minOrderAmount: 5000, isActive: true, usageCount: 19, createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'c-3', code: 'ROYAL500', discountType: 'FLAT', discountValue: 500, minOrderAmount: 3000, isActive: true, usageCount: 28, createdAt: '2025-01-01T00:00:00.000Z' },
];

// --------------------------------------------------------------------------
// Client singleton & Bundled seed helper
// --------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line no-var
  var __tursoClient: Client | undefined;
  // eslint-disable-next-line no-var
  var __bundledSeedCache: any | null | undefined;
}

export function isTursoConfigured(): boolean {
  const url = (process.env.TURSO_DATABASE_URL || '').trim();
  const token = (process.env.TURSO_AUTH_TOKEN || '').trim();
  if (!url || url === '[SENSITIVE]' || token === '[SENSITIVE]') return false;
  return url.startsWith('libsql://') || url.startsWith('https://') || url.startsWith('http://');
}

function getTursoClient(): Client | null {
  if (!isTursoConfigured()) return null;
  const url = process.env.TURSO_DATABASE_URL!.trim();
  const token = (process.env.TURSO_AUTH_TOKEN || '').trim();

  if (!globalThis.__tursoClient) {
    globalThis.__tursoClient = createClient({
      url,
      authToken: token || undefined,
    });
  }
  return globalThis.__tursoClient;
}

function loadBundledSeed(): any | null {
  if (globalThis.__bundledSeedCache !== undefined) {
    return globalThis.__bundledSeedCache;
  }
  const candidates = [
    path.resolve(process.cwd(), 'data_store.json'),
    '/var/task/data_store.json',
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        const parsed = JSON.parse(fs.readFileSync(candidate, 'utf-8'));
        globalThis.__bundledSeedCache = parsed;
        return parsed;
      }
    } catch {
      continue;
    }
  }
  globalThis.__bundledSeedCache = null;
  return null;
}

// --------------------------------------------------------------------------
// Schema bootstrap
// --------------------------------------------------------------------------

let schemaInitialized = false;

async function ensureSchema(client: Client): Promise<void> {
  if (schemaInitialized) return;

  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS kv_store (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  schemaInitialized = true;
}

// --------------------------------------------------------------------------
// Generic get / set helpers
// --------------------------------------------------------------------------

async function kvGet<T>(key: string): Promise<T | null> {
  const client = getTursoClient();
  if (!client) return null;

  await ensureSchema(client);
  const result = await client.execute({
    sql: 'SELECT value FROM kv_store WHERE key = ?',
    args: [key],
  });

  if (result.rows.length === 0) return null;
  try {
    return JSON.parse(result.rows[0][0] as string) as T;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  const client = getTursoClient();
  if (!client) return;

  await ensureSchema(client);
  await client.execute({
    sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
    args: [key, JSON.stringify(value)],
  });
}

// --------------------------------------------------------------------------
// Default admin user
// --------------------------------------------------------------------------

const DEFAULT_ADMIN_USER: UserRecord = {
  id: 'usr_admin_default',
  name: 'Studio Admin',
  email: 'admin@ayushmancards.com',
  password: 'admin123',
  role: 'ADMIN',
  phone: '9479784979',
  address: '63, Varruchi Marg, Freeganj Ujjain',
  city: 'Ujjain',
  state: 'Madhya Pradesh',
  pincode: '456001',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
};

// --------------------------------------------------------------------------
// Collection helpers (auto-seed ONLY when key is missing === null, never when [])
// --------------------------------------------------------------------------

async function getUsers(): Promise<UserRecord[]> {
  const users = await kvGet<UserRecord[]>('users');
  if (users === null || users.length === 0) {
    const seed = loadBundledSeed();
    const defaults = Array.isArray(seed?.users) && seed.users.length > 0 ? seed.users : [DEFAULT_ADMIN_USER];
    if (!defaults.some((u: UserRecord) => u.email.toLowerCase().trim() === 'admin@ayushmancards.com')) {
      defaults.push(DEFAULT_ADMIN_USER);
    }
    await kvSet('users', defaults);
    return defaults;
  }
  const hasAdmin = users.some((u) => u.email.toLowerCase().trim() === 'admin@ayushmancards.com');
  if (!hasAdmin) {
    users.push(DEFAULT_ADMIN_USER);
    await kvSet('users', users);
  }
  return users;
}

async function getProducts(): Promise<ProductRecord[]> {
  const products = await kvGet<ProductRecord[]>('products');
  if (products === null) {
    const seed = loadBundledSeed();
    const initial: ProductRecord[] = Array.isArray(seed?.products) ? seed.products : [];
    if (initial.length > 0) {
      await kvSet('products', initial);
    }
    return initial;
  }
  return products;
}

async function getCategories(): Promise<CategoryRecord[]> {
  const categories = await kvGet<CategoryRecord[]>('categories');
  if (categories === null) {
    const seed = loadBundledSeed();
    const initial: CategoryRecord[] = Array.isArray(seed?.categories) ? seed.categories : [];
    if (initial.length > 0) {
      await kvSet('categories', initial);
    }
    return initial;
  }
  return categories;
}

async function getBookings(): Promise<BookingRecord[]> {
  return (await kvGet<BookingRecord[]>('bookings')) || [];
}

async function getInquiries(): Promise<InquiryRecord[]> {
  return (await kvGet<InquiryRecord[]>('inquiries')) || [];
}

async function getBanners(): Promise<BannerRecord[]> {
  const banners = await kvGet<BannerRecord[]>('banners');
  if (banners === null) {
    const seed = loadBundledSeed();
    const initial: BannerRecord[] = Array.isArray(seed?.banners) ? seed.banners : [];
    if (initial.length > 0) {
      await kvSet('banners', initial);
    }
    return initial;
  }
  return banners;
}

async function getCoupons(): Promise<CouponRecord[]> {
  const coupons = await kvGet<CouponRecord[]>('coupons');
  if (coupons === null) {
    const seed = loadBundledSeed();
    const initial: CouponRecord[] = Array.isArray(seed?.coupons) && seed.coupons.length > 0
      ? seed.coupons
      : [...DEFAULT_COUPONS];
    await kvSet('coupons', initial);
    return initial;
  }
  return coupons;
}

async function getSettings(): Promise<SettingsRecord> {
  const settings = await kvGet<SettingsRecord>('settings');
  if (!settings) {
    const seed = loadBundledSeed();
    const initial = seed?.settings ? { ...DEFAULT_SETTINGS, ...seed.settings } : { ...DEFAULT_SETTINGS };
    await kvSet('settings', initial);
    return initial;
  }
  return { ...DEFAULT_SETTINGS, ...settings };
}

// --------------------------------------------------------------------------
// ID generator
// --------------------------------------------------------------------------

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// --------------------------------------------------------------------------
// UserClient
// --------------------------------------------------------------------------

export class TursoUserClient {
  async findUnique(args: { where: { email?: string; id?: string }; select?: unknown }): Promise<UserRecord | null> {
    const users = await getUsers();
    const { email, id } = args.where;
    if (email) {
      const cleanEmail = email.toLowerCase().trim();
      return users.find((u) => u.email.toLowerCase().trim() === cleanEmail) || null;
    }
    if (id) {
      return users.find((u) => u.id === id) || null;
    }
    return null;
  }

  async create(args: { data: { name: string; email: string; password: string; phone?: string; role?: string; address?: string; city?: string; state?: string; pincode?: string }; select?: unknown }): Promise<UserRecord> {
    const users = await getUsers();
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: generateId('usr'),
      name: args.data.name,
      email: args.data.email.toLowerCase().trim(),
      password: args.data.password,
      phone: args.data.phone || null,
      address: args.data.address || null,
      city: args.data.city || null,
      state: args.data.state || null,
      pincode: args.data.pincode || null,
      role: args.data.role || 'CLIENT',
      createdAt: now,
      updatedAt: now,
    };
    users.push(newUser);
    await kvSet('users', users);
    return newUser;
  }

  async update(args: { where: { id: string }; data: Partial<UserRecord> }): Promise<UserRecord> {
    const users = await getUsers();
    const idx = users.findIndex((u) => u.id === args.where.id);
    if (idx === -1) throw new Error('User not found');
    const updated: UserRecord = { ...users[idx], ...args.data, updatedAt: new Date().toISOString() };
    users[idx] = updated;
    await kvSet('users', users);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const users = await getUsers();
    const initial = users.length;
    const filtered = users.filter((u) => u.id !== args.where.id);
    if (filtered.length === initial) return false;
    await kvSet('users', filtered);
    return true;
  }

  async findMany(): Promise<UserRecord[]> {
    return getUsers();
  }
}

// --------------------------------------------------------------------------
// ProductClient
// --------------------------------------------------------------------------

function enrichProduct(p: ProductRecord): ProductRecord {
  return {
    ...p,
    paperOptions: Array.isArray(p.paperOptions) ? p.paperOptions : DEFAULT_PAPER_OPTIONS,
    quantityOptions: Array.isArray(p.quantityOptions) ? p.quantityOptions : (PRODUCT_QUANTITY_TIERS[p.id] || DEFAULT_QUANTITY_OPTIONS),
    cornerOptions: Array.isArray(p.cornerOptions) ? p.cornerOptions : DEFAULT_CORNER_OPTIONS,
  };
}

export class TursoProductClient {
  async findMany(args?: { where?: { category?: string; isActive?: boolean } }): Promise<ProductRecord[]> {
    let products = await getProducts();
    if (args?.where?.category && args.where.category !== 'All Products') {
      const catLower = args.where.category.trim().toLowerCase();
      products = products.filter((p) => p.category.trim().toLowerCase() === catLower);
    }
    if (args?.where?.isActive !== undefined) {
      products = products.filter((p) => (p.isActive !== false) === args.where!.isActive);
    }
    return products.map(enrichProduct);
  }

  async findUnique(args: { where: { id: string } }): Promise<ProductRecord | null> {
    const products = await getProducts();
    const cleanId = args.where.id.trim();
    const prod = products.find((p) => p.id.trim() === cleanId) || null;
    return prod ? enrichProduct(prod) : null;
  }

  async create(args: { data: Omit<ProductRecord, 'id' | 'createdAt' | 'updatedAt'> }): Promise<ProductRecord> {
    const products = await getProducts();
    const now = new Date().toISOString();
    const newProduct: ProductRecord = {
      ...args.data,
      id: generateId('prd'),
      paperOptions: Array.isArray(args.data.paperOptions) ? args.data.paperOptions : DEFAULT_PAPER_OPTIONS,
      quantityOptions: Array.isArray(args.data.quantityOptions) ? args.data.quantityOptions : DEFAULT_QUANTITY_OPTIONS,
      cornerOptions: Array.isArray(args.data.cornerOptions) ? args.data.cornerOptions : DEFAULT_CORNER_OPTIONS,
      isActive: args.data.isActive !== undefined ? args.data.isActive : true,
      createdAt: now,
      updatedAt: now,
    };
    products.unshift(newProduct);
    await kvSet('products', products);
    return newProduct;
  }

  async update(args: { where: { id: string }; data: Partial<ProductRecord> }): Promise<ProductRecord> {
    const products = await getProducts();
    const cleanId = args.where.id.trim();
    const idx = products.findIndex((p) => p.id.trim() === cleanId);
    if (idx === -1) throw new Error('Product not found');
    const updated: ProductRecord = { ...products[idx], ...args.data, updatedAt: new Date().toISOString() };
    products[idx] = updated;
    await kvSet('products', products);
    return enrichProduct(updated);
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const products = await getProducts();
    const cleanId = args.where.id.trim();
    const initial = products.length;
    const filtered = products.filter((p) => p.id.trim() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('products', filtered);
    return true;
  }
}

// --------------------------------------------------------------------------
// CategoryClient
// --------------------------------------------------------------------------

export class TursoCategoryClient {
  async findMany(): Promise<CategoryRecord[]> {
    return getCategories();
  }

  async findUnique(args: { where: { id: string } }): Promise<CategoryRecord | null> {
    const categories = await getCategories();
    const cleanId = args.where.id.trim().toLowerCase();
    return categories.find((c) => c.id.trim().toLowerCase() === cleanId || c.label.trim().toLowerCase() === cleanId) || null;
  }

  async create(args: { data: { id: string; label: string; icon?: string; description?: string } }): Promise<CategoryRecord> {
    const categories = await getCategories();
    const now = new Date().toISOString();
    const catId = args.data.id.trim();
    const cleanId = catId.toLowerCase();

    const existingIdx = categories.findIndex((c) => c.id.trim().toLowerCase() === cleanId);
    if (existingIdx !== -1) {
      categories[existingIdx] = {
        ...categories[existingIdx],
        label: args.data.label.trim(),
        icon: args.data.icon || categories[existingIdx].icon || '🏷️',
        description: args.data.description !== undefined ? args.data.description : categories[existingIdx].description,
        updatedAt: now,
      };
      await kvSet('categories', categories);
      return categories[existingIdx];
    }

    const newCat: CategoryRecord = {
      id: catId,
      label: args.data.label.trim(),
      icon: args.data.icon || '🏷️',
      description: args.data.description || '',
      createdAt: now,
      updatedAt: now,
    };
    categories.push(newCat);
    await kvSet('categories', categories);
    return newCat;
  }

  async update(args: { where: { id: string }; data: Partial<CategoryRecord> }): Promise<CategoryRecord> {
    const categories = await getCategories();
    const cleanId = args.where.id.trim().toLowerCase();
    const idx = categories.findIndex((c) => c.id.trim().toLowerCase() === cleanId);
    if (idx === -1) throw new Error('Category not found');
    const updated: CategoryRecord = { ...categories[idx], ...args.data, updatedAt: new Date().toISOString() };
    categories[idx] = updated;
    await kvSet('categories', categories);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const categories = await getCategories();
    const cleanId = args.where.id.trim().toLowerCase();
    const initial = categories.length;
    const filtered = categories.filter((c) => c.id.trim().toLowerCase() !== cleanId && c.label.trim().toLowerCase() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('categories', filtered);
    return true;
  }
}

// --------------------------------------------------------------------------
// BannerClient
// --------------------------------------------------------------------------

export class TursoBannerClient {
  async findMany(args?: { where?: { isActive?: boolean } }): Promise<BannerRecord[]> {
    let banners = await getBanners();
    if (args?.where?.isActive !== undefined) {
      banners = banners.filter((b) => (b.isActive !== false) === args.where!.isActive);
    }
    return banners.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async findUnique(args: { where: { id: string } }): Promise<BannerRecord | null> {
    const banners = await getBanners();
    return banners.find((b) => b.id === args.where.id) || null;
  }

  async create(args: { data: Omit<BannerRecord, 'id' | 'createdAt' | 'updatedAt'> }): Promise<BannerRecord> {
    const banners = await getBanners();
    const now = new Date().toISOString();
    const newBanner: BannerRecord = {
      ...args.data,
      id: generateId('bnr'),
      isActive: args.data.isActive !== undefined ? args.data.isActive : true,
      displayOrder: args.data.displayOrder || (banners.length + 1),
      createdAt: now,
      updatedAt: now,
    };
    banners.push(newBanner);
    await kvSet('banners', banners);
    return newBanner;
  }

  async update(args: { where: { id: string }; data: Partial<BannerRecord> }): Promise<BannerRecord> {
    const banners = await getBanners();
    const idx = banners.findIndex((b) => b.id === args.where.id);
    if (idx === -1) throw new Error('Banner not found');
    const updated: BannerRecord = { ...banners[idx], ...args.data, updatedAt: new Date().toISOString() };
    banners[idx] = updated;
    await kvSet('banners', banners);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const banners = await getBanners();
    const cleanId = args.where.id.trim();
    const initial = banners.length;
    const filtered = banners.filter((b) => b.id.trim() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('banners', filtered);
    return true;
  }
}

// --------------------------------------------------------------------------
// BookingClient
// --------------------------------------------------------------------------

export class TursoBookingClient {
  async create(args: { data: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt'> }): Promise<BookingRecord> {
    const bookings = await getBookings();
    const now = new Date().toISOString();
    const newBooking: BookingRecord = { ...args.data, id: generateId('bk'), createdAt: now, updatedAt: now };
    bookings.push(newBooking);
    await kvSet('bookings', bookings);
    return newBooking;
  }

  async update(args: { where: { razorpayOrderId?: string; id?: string }; data: Partial<BookingRecord> }): Promise<BookingRecord> {
    const bookings = await getBookings();
    const { razorpayOrderId, id } = args.where;
    const idx = bookings.findIndex((b) => (razorpayOrderId && b.razorpayOrderId === razorpayOrderId) || (id && b.id === id));
    if (idx === -1) {
      const syntheticBooking: BookingRecord = {
        id: id || generateId('bk'),
        customerName: 'Customer',
        customerEmail: 'customer@ayushmancards.com',
        customerPhone: '9479784979',
        eventType: 'Print Order',
        eventDate: new Date().toISOString().split('T')[0],
        packageType: 'Custom Order',
        totalAmount: 1000,
        depositAmount: 1000,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...args.data,
      };
      bookings.push(syntheticBooking);
      await kvSet('bookings', bookings);
      return syntheticBooking;
    }
    const updated: BookingRecord = { ...bookings[idx], ...args.data, updatedAt: new Date().toISOString() };
    bookings[idx] = updated;
    await kvSet('bookings', bookings);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const bookings = await getBookings();
    const cleanId = args.where.id.trim();
    const initial = bookings.length;
    const filtered = bookings.filter((b) => b.id.trim() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('bookings', filtered);
    return true;
  }

  async findMany(args?: { where?: { customerEmail?: string; userId?: string; matchAny?: boolean }; orderBy?: { createdAt?: 'asc' | 'desc' }; take?: number }): Promise<BookingRecord[]> {
    let bookings = await getBookings();
    const cleanEmail = args?.where?.customerEmail?.toLowerCase().trim();
    const targetUserId = args?.where?.userId;

    if (args?.where?.matchAny && (cleanEmail || targetUserId)) {
      bookings = bookings.filter((b) =>
        (cleanEmail && b.customerEmail?.toLowerCase().trim() === cleanEmail) ||
        (targetUserId && b.userId === targetUserId)
      );
    } else {
      if (cleanEmail) {
        bookings = bookings.filter((b) => b.customerEmail?.toLowerCase().trim() === cleanEmail);
      }
      if (targetUserId) {
        bookings = bookings.filter((b) => b.userId === targetUserId);
      }
    }

    if (args?.orderBy?.createdAt) {
      const dir = args.orderBy.createdAt === 'asc' ? 1 : -1;
      bookings.sort((a, b) => dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    }
    if (args?.take && args.take > 0) {
      bookings = bookings.slice(0, args.take);
    }
    return bookings;
  }

  async findFirst(args?: { where?: { razorpayOrderId?: string } }): Promise<BookingRecord | null> {
    const bookings = await getBookings();
    if (args?.where?.razorpayOrderId) {
      return bookings.find((b) => b.razorpayOrderId === args.where!.razorpayOrderId) || null;
    }
    return bookings[0] || null;
  }

  async findUnique(args: { where: { id: string } }): Promise<BookingRecord | null> {
    const bookings = await getBookings();
    return bookings.find((b) => b.id === args.where.id) || null;
  }

  async updateMany(args: { where: { razorpayOrderId?: string; status?: string; paymentStatus?: string }; data: Partial<BookingRecord> }): Promise<number> {
    const bookings = await getBookings();
    let count = 0;
    const updated = bookings.map((b) => {
      let matches = true;
      if (args.where.razorpayOrderId && b.razorpayOrderId !== args.where.razorpayOrderId) matches = false;
      if (args.where.status && b.status !== args.where.status) matches = false;
      if (args.where.paymentStatus && b.paymentStatus !== args.where.paymentStatus) matches = false;
      if (matches) {
        count++;
        return { ...b, ...args.data, updatedAt: new Date().toISOString() };
      }
      return b;
    });
    await kvSet('bookings', updated);
    return count;
  }
}

// --------------------------------------------------------------------------
// InquiryClient
// --------------------------------------------------------------------------

export class TursoInquiryClient {
  async create(args: { data: Omit<InquiryRecord, 'id' | 'createdAt'> }): Promise<InquiryRecord> {
    const inquiries = await getInquiries();
    const newInquiry: InquiryRecord = { ...args.data, id: generateId('inq'), createdAt: new Date().toISOString() };
    inquiries.push(newInquiry);
    await kvSet('inquiries', inquiries);
    return newInquiry;
  }

  async findMany(args?: { where?: { email?: string; userId?: string }; orderBy?: { createdAt?: 'asc' | 'desc' }; take?: number }): Promise<InquiryRecord[]> {
    let inquiries = await getInquiries();
    if (args?.where?.email) {
      const cleanEmail = args.where.email.toLowerCase().trim();
      inquiries = inquiries.filter((i) => i.email?.toLowerCase().trim() === cleanEmail);
    }
    if (args?.orderBy?.createdAt) {
      const dir = args.orderBy.createdAt === 'asc' ? 1 : -1;
      inquiries.sort((a, b) => dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    }
    if (args?.take && args.take > 0) {
      inquiries = inquiries.slice(0, args.take);
    }
    return inquiries;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const inquiries = await getInquiries();
    const cleanId = args.where.id.trim();
    const initial = inquiries.length;
    const filtered = inquiries.filter((i) => i.id.trim() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('inquiries', filtered);
    return true;
  }
}

// --------------------------------------------------------------------------
// CouponClient
// --------------------------------------------------------------------------

export class TursoCouponClient {
  async findMany(): Promise<CouponRecord[]> {
    const coupons = await getCoupons();
    return [...coupons].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findByCode(code: string): Promise<CouponRecord | null> {
    const coupons = await getCoupons();
    const cleanCode = code.toUpperCase().trim();
    return coupons.find((c) => c.code.toUpperCase().trim() === cleanCode) || null;
  }

  async create(args: { data: Omit<CouponRecord, 'id' | 'createdAt'> }): Promise<CouponRecord> {
    const coupons = await getCoupons();
    const cleanCode = args.data.code.toUpperCase().trim();
    const existingIdx = coupons.findIndex((c) => c.code.toUpperCase().trim() === cleanCode);
    if (existingIdx !== -1) {
      throw new Error(`Coupon code "${cleanCode}" already exists.`);
    }
    const newCoupon: CouponRecord = {
      ...args.data,
      code: cleanCode,
      id: generateId('cpn'),
      createdAt: new Date().toISOString(),
    };
    coupons.unshift(newCoupon);
    await kvSet('coupons', coupons);
    return newCoupon;
  }

  async update(args: { where: { id: string }; data: Partial<CouponRecord> }): Promise<CouponRecord> {
    const coupons = await getCoupons();
    const cleanId = args.where.id.trim();
    const idx = coupons.findIndex((c) => c.id.trim() === cleanId);
    if (idx === -1) throw new Error('Coupon not found');
    const updated: CouponRecord = { ...coupons[idx], ...args.data };
    coupons[idx] = updated;
    await kvSet('coupons', coupons);
    return updated;
  }

  async incrementUsage(code: string): Promise<void> {
    const coupons = await getCoupons();
    const cleanCode = code.toUpperCase().trim();
    const idx = coupons.findIndex((c) => c.code.toUpperCase().trim() === cleanCode);
    if (idx !== -1) {
      coupons[idx] = { ...coupons[idx], usageCount: (coupons[idx].usageCount || 0) + 1 };
      await kvSet('coupons', coupons);
    }
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const coupons = await getCoupons();
    const cleanId = args.where.id.trim();
    const initial = coupons.length;
    const filtered = coupons.filter((c) => c.id.trim() !== cleanId);
    if (filtered.length === initial) return false;
    await kvSet('coupons', filtered);
    return true;
  }
}

// --------------------------------------------------------------------------
// SettingsClient
// --------------------------------------------------------------------------

export class TursoSettingsClient {
  async get(): Promise<SettingsRecord> {
    return getSettings();
  }

  async update(data: Partial<SettingsRecord>): Promise<SettingsRecord> {
    const current = await getSettings();
    const updated: SettingsRecord = { ...current, ...data, updatedAt: new Date().toISOString() };
    await kvSet('settings', updated);
    return updated;
  }
}

// --------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------

export const tursoDb = {
  user: new TursoUserClient(),
  booking: new TursoBookingClient(),
  inquiry: new TursoInquiryClient(),
  category: new TursoCategoryClient(),
  product: new TursoProductClient(),
  banner: new TursoBannerClient(),
  coupon: new TursoCouponClient(),
  settings: new TursoSettingsClient(),
};
