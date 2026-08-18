import fs from 'fs';
import path from 'path';
import os from 'os';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  role: string; // 'ADMIN' | 'CLIENT'
  createdAt: string;
  updatedAt: string;
}

export interface BookingRecord {
  id: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  city?: string | null;
  address?: string | null;
  notes?: string | null;
  packageType: string;
  totalAmount: number;
  depositAmount: number;
  paymentStatus: string; // 'PAID' | 'PENDING' | 'FAILED'
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  status: string; // 'NEW' | 'PROCESSING' | 'PRINTING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  createdAt: string;
  updatedAt: string;
}

export interface InquiryRecord {
  id: string;
  userId?: string | null;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date?: string | null;
  message: string;
  createdAt: string;
}

interface DBStore {
  users: UserRecord[];
  bookings: BookingRecord[];
  inquiries: InquiryRecord[];
}

const DB_FILE_PATH = path.join(os.tmpdir(), 'ayushman_print_db.json');

declare global {
  // eslint-disable-next-line no-var
  var __ayushmanInMemoryDB: DBStore | undefined;
}

// Only the admin account is pre-seeded — all other data comes from real usage
const DEFAULT_STORE: DBStore = {
  users: [
    {
      id: 'usr_admin_default',
      name: 'Studio Admin',
      email: 'admin@ayushmancards.com',
      password: 'admin123',
      phone: '9479784979',
      address: 'Freeganj Main Road',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      pincode: '456010',
      role: 'ADMIN',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  ],
  bookings: [],
  inquiries: [],
};

function readStore(): DBStore {
  if (globalThis.__ayushmanInMemoryDB) {
    return globalThis.__ayushmanInMemoryDB;
  }

  let store: DBStore = DEFAULT_STORE;

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.users) && parsed.users.length > 0) {
        store = parsed;
      }
    }
  } catch (err) {
    console.warn('Warning reading DB store:', err);
  }

  // Ensure default admin exists if store has no admin
  if (!store.users.some((u) => u.email.toLowerCase().trim() === 'admin@ayushmancards.com')) {
    store.users.push(DEFAULT_STORE.users[0]);
  }

  globalThis.__ayushmanInMemoryDB = store;
  return store;
}

function writeStore(store: DBStore) {
  globalThis.__ayushmanInMemoryDB = store;
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.warn('DB file write warning (using in-memory store):', err);
  }
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

class UserClient {
  async findUnique(args: { where: { email?: string; id?: string }; select?: any }): Promise<UserRecord | null> {
    const store = readStore();
    const { email, id } = args.where;
    if (email) {
      const cleanEmail = email.toLowerCase().trim();
      const user = store.users.find((u) => u.email.toLowerCase().trim() === cleanEmail);
      return user || null;
    }
    if (id) {
      const user = store.users.find((u) => u.id === id);
      return user || null;
    }
    return null;
  }

  async create(args: { data: { name: string; email: string; password: string; phone?: string; role?: string; address?: string; city?: string; state?: string; pincode?: string }; select?: any }): Promise<UserRecord> {
    const store = readStore();
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
    store.users.push(newUser);
    writeStore(store);
    return newUser;
  }

  async update(args: { where: { id: string }; data: Partial<UserRecord> }): Promise<UserRecord> {
    const store = readStore();
    const idx = store.users.findIndex((u) => u.id === args.where.id);
    if (idx === -1) {
      throw new Error('User not found');
    }
    const updated: UserRecord = {
      ...store.users[idx],
      ...args.data,
      updatedAt: new Date().toISOString(),
    };
    store.users[idx] = updated;
    writeStore(store);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const store = readStore();
    const initialLen = store.users.length;
    store.users = store.users.filter((u) => u.id !== args.where.id);
    writeStore(store);
    return store.users.length < initialLen;
  }

  async findMany(): Promise<UserRecord[]> {
    const store = readStore();
    return store.users;
  }
}

class BookingClient {
  async create(args: { data: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt'> }): Promise<BookingRecord> {
    const store = readStore();
    const now = new Date().toISOString();
    const newBooking: BookingRecord = {
      ...args.data,
      id: generateId('bk'),
      createdAt: now,
      updatedAt: now,
    };
    store.bookings.push(newBooking);
    writeStore(store);
    return newBooking;
  }

  async update(args: { where: { razorpayOrderId?: string; id?: string }; data: Partial<BookingRecord> }): Promise<BookingRecord> {
    const store = readStore();
    const { razorpayOrderId, id } = args.where;
    const idx = store.bookings.findIndex((b) => (razorpayOrderId && b.razorpayOrderId === razorpayOrderId) || (id && b.id === id));
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
      store.bookings.push(syntheticBooking);
      writeStore(store);
      return syntheticBooking;
    }
    const updated: BookingRecord = {
      ...store.bookings[idx],
      ...args.data,
      updatedAt: new Date().toISOString(),
    };
    store.bookings[idx] = updated;
    writeStore(store);
    return updated;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const store = readStore();
    const initialLen = store.bookings.length;
    store.bookings = store.bookings.filter((b) => b.id !== args.where.id);
    writeStore(store);
    return store.bookings.length < initialLen;
  }

  async findMany(args?: { where?: { customerEmail?: string; userId?: string }; orderBy?: any; take?: number }): Promise<BookingRecord[]> {
    const store = readStore();
    let result = store.bookings;
    if (args?.where?.customerEmail) {
      const cleanEmail = args.where.customerEmail.toLowerCase().trim();
      result = result.filter((b) => b.customerEmail.toLowerCase().trim() === cleanEmail);
    }
    if (args?.where?.userId) {
      result = result.filter((b) => b.userId === args.where?.userId);
    }
    return result;
  }

  async findFirst(args?: { where?: { razorpayOrderId?: string } }): Promise<BookingRecord | null> {
    const store = readStore();
    if (args?.where?.razorpayOrderId) {
      return store.bookings.find((b) => b.razorpayOrderId === args.where?.razorpayOrderId) || null;
    }
    return store.bookings[0] || null;
  }

  async findUnique(args: { where: { id: string } }): Promise<BookingRecord | null> {
    const store = readStore();
    return store.bookings.find((b) => b.id === args.where.id) || null;
  }
}

class InquiryClient {
  async create(args: { data: Omit<InquiryRecord, 'id' | 'createdAt'> }): Promise<InquiryRecord> {
    const store = readStore();
    const newInquiry: InquiryRecord = {
      ...args.data,
      id: generateId('inq'),
      createdAt: new Date().toISOString(),
    };
    store.inquiries.push(newInquiry);
    writeStore(store);
    return newInquiry;
  }

  async findMany(args?: { where?: { email?: string; userId?: string }; orderBy?: any; take?: number }): Promise<InquiryRecord[]> {
    const store = readStore();
    let result = store.inquiries;
    if (args?.where?.email) {
      const cleanEmail = args.where.email.toLowerCase().trim();
      result = result.filter((i) => i.email.toLowerCase().trim() === cleanEmail);
    }
    return result;
  }

  async delete(args: { where: { id: string } }): Promise<boolean> {
    const store = readStore();
    const initialLen = store.inquiries.length;
    store.inquiries = store.inquiries.filter((i) => i.id !== args.where.id);
    writeStore(store);
    return store.inquiries.length < initialLen;
  }
}

export const db: any = {
  user: new UserClient(),
  booking: new BookingClient(),
  inquiry: new InquiryClient(),
};
