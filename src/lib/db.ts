import fs from 'fs';
import path from 'path';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role: string;
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
  paymentStatus: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  razorpaySignature?: string | null;
  status: string;
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

const DB_FILE_PATH = path.resolve(process.cwd(), 'data_store.json');

function readStore(): DBStore {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Warning reading DB store:', err);
  }
  return { users: [], bookings: [], inquiries: [] };
}

function writeStore(store: DBStore) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB store:', err);
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

  async create(args: { data: { name: string; email: string; password: string; phone?: string; role?: string }; select?: any }): Promise<UserRecord> {
    const store = readStore();
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: generateId('usr'),
      name: args.data.name,
      email: args.data.email.toLowerCase().trim(),
      password: args.data.password,
      phone: args.data.phone || null,
      role: args.data.role || 'CLIENT',
      createdAt: now,
      updatedAt: now,
    };
    store.users.push(newUser);
    writeStore(store);
    return newUser;
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
      throw new Error(`Booking not found`);
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
}

export const db: any = {
  user: new UserClient(),
  booking: new BookingClient(),
  inquiry: new InquiryClient(),
};
