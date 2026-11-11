/**
 * Migration & Sync API: Seeds / syncs Turso cloud database from data_store.json
 *
 * Usage:
 *   GET  /api/admin/migrate -> status & DB backend info
 *   POST /api/admin/migrate -> seed missing collections, { mode: 'syncQuantities' } to patch qty tiers, or { force: true } to reset from seed
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { isTursoConfigured, tursoDb } from '@/lib/turso-db';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function readBundledSeed() {
  const fs = require('fs') as typeof import('fs');
  const path = require('path') as typeof import('path');
  const candidates = [
    path.resolve(process.cwd(), 'data_store.json'),
    '/var/task/data_store.json',
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return JSON.parse(fs.readFileSync(candidate, 'utf-8'));
      }
    } catch {
      continue;
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isTursoConfigured()) {
      return NextResponse.json({
        error: 'TURSO_DATABASE_URL is not set. Currently using Local JSON File DB.'
      }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const force = Boolean(body?.force);
    const mode = body?.mode || 'seed';

    const sourceData = readBundledSeed();
    if (!sourceData) {
      return NextResponse.json({ error: 'Could not read data_store.json source file' }, { status: 500 });
    }

    const { createClient } = await import('@libsql/client/web');
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!.trim(),
      authToken: (process.env.TURSO_AUTH_TOKEN || '').trim() || undefined,
    });

    await client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS kv_store (
        key   TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    const results: Record<string, any> = {};

    if (mode === 'syncQuantities') {
      const existingProducts = await tursoDb.product.findMany();
      const seedMap = new Map<string, any>();
      if (Array.isArray(sourceData.products)) {
        for (const sp of sourceData.products) {
          seedMap.set(sp.id, sp);
        }
      }
      const isStaleDefault = (q: any[]) =>
        Array.isArray(q) && q.length === 4 &&
        q[0]?.qty === 100 && q[1]?.qty === 250 && q[2]?.qty === 500 && q[3]?.qty === 1000;

      let updatedCount = 0;
      const syncedProducts = existingProducts.map((p: any) => {
        const seedItem = seedMap.get(p.id);
        if (seedItem?.quantityOptions && (!Array.isArray(p.quantityOptions) || isStaleDefault(p.quantityOptions))) {
          const seedIsDifferent = !isStaleDefault(seedItem.quantityOptions);
          if (seedIsDifferent || !Array.isArray(p.quantityOptions)) {
            updatedCount++;
            return { ...p, quantityOptions: seedItem.quantityOptions, updatedAt: new Date().toISOString() };
          }
        }
        return p;
      });

      await client.execute({
        sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
        args: ['products', JSON.stringify(syncedProducts)],
      });
      results.syncQuantities = { checked: existingProducts.length, updatedCount, status: 'ok' };
      client.close();

      return NextResponse.json({
        success: true,
        message: `Synced quantity tiers for ${updatedCount} catalog item(s).`,
        results,
      });
    }

    if (Array.isArray(sourceData.products) && sourceData.products.length > 0) {
      const existingProducts = await tursoDb.product.findMany();
      const productsToSeed = force ? sourceData.products : (existingProducts.length === 0 ? sourceData.products : []);
      if (productsToSeed.length > 0) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['products', JSON.stringify(productsToSeed)],
        });
        results.products = { seeded: productsToSeed.length, status: 'ok' };
      } else {
        results.products = { seeded: 0, status: 'already_exists', count: existingProducts.length };
      }

      const existingCats = await tursoDb.category.findMany();
      const catsToSeed = force ? sourceData.categories : (existingCats.length === 0 ? (sourceData.categories || []) : []);
      if (catsToSeed.length > 0) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['categories', JSON.stringify(catsToSeed)],
        });
        results.categories = { seeded: catsToSeed.length, status: 'ok' };
      } else {
        results.categories = { seeded: 0, status: 'already_exists', count: existingCats.length };
      }

      const existingBanners = await tursoDb.banner.findMany();
      const bannersToSeed = force ? sourceData.banners : (existingBanners.length === 0 ? (sourceData.banners || []) : []);
      if (bannersToSeed.length > 0) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['banners', JSON.stringify(bannersToSeed)],
        });
        results.banners = { seeded: bannersToSeed.length, status: 'ok' };
      } else {
        results.banners = { seeded: 0, status: 'already_exists', count: existingBanners.length };
      }

      const existingCoupons = await tursoDb.coupon.findMany();
      const couponsToSeed = force ? (sourceData.coupons || []) : (existingCoupons.length === 0 ? (sourceData.coupons || []) : []);
      if (couponsToSeed.length > 0) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['coupons', JSON.stringify(couponsToSeed)],
        });
        results.coupons = { seeded: couponsToSeed.length, status: 'ok' };
      } else {
        results.coupons = { seeded: 0, status: 'already_exists', count: existingCoupons.length };
      }

      if (sourceData.settings && force) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['settings', JSON.stringify(sourceData.settings)],
        });
        results.settings = { status: 'ok' };
      }

      const existingUsers = await tursoDb.user.findMany();
      const hasAdmin = existingUsers.some((u: any) => u.role === 'ADMIN');
      if (!hasAdmin && Array.isArray(sourceData.users)) {
        await client.execute({
          sql: 'INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)',
          args: ['users', JSON.stringify(sourceData.users)],
        });
        results.users = { seeded: sourceData.users.length, status: 'ok' };
      } else {
        results.users = { seeded: 0, status: 'already_exists', count: existingUsers.length };
      }
    }

    client.close();

    return NextResponse.json({
      success: true,
      message: 'Migration completed',
      results,
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: error?.message || 'Migration failed', stack: error?.stack?.split('\n').slice(0, 5) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tursoConfigured = isTursoConfigured();
  let adminInfo: Record<string, any> = {};
  try {
    const user = await getCurrentUser();
    if (user?.role === 'ADMIN') {
      const [products, categories, banners, bookings, coupons] = await Promise.all([
        db.product.findMany(),
        db.category.findMany(),
        db.banner.findMany(),
        db.booking.findMany(),
        db.coupon.findMany(),
      ]);
      adminInfo = {
        counts: {
          products: products.length,
          categories: categories.length,
          banners: banners.length,
          orders: bookings.length,
          coupons: coupons.length,
        },
      };
    }
  } catch {
    // Non-fatal telemetry lookup
  }

  return NextResponse.json({
    tursoConfigured,
    storageMode: tursoConfigured ? 'Turso Cloud DB' : 'Local File JSON',
    message: tursoConfigured
      ? 'Turso Cloud DB is connected and active.'
      : 'TURSO_DATABASE_URL is not configured. Using Local/Ephemeral JSON store.',
    ...adminInfo,
  });
}
