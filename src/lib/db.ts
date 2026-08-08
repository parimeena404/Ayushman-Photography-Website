import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const SUPABASE_DB_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:i1v8Jwz6kl0vXdzt@db.iyhvcfgcbwcsagwlzabs.supabase.co:5432/postgres';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    let pool = globalForPrisma.pool;
    if (!pool) {
      pool = new pg.Pool({
        connectionString: SUPABASE_DB_URL,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 15000,
      });
      pool.on('error', (err) => {
        console.error('Idle pg client error:', err.message);
      });
      if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.pool = pool;
      }
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (err) {
    console.warn('Prisma adapter fallback to standard PrismaClient:', err);
    return new PrismaClient();
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
