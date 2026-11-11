import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const allActiveProducts = await db.product.findMany({
      where: { isActive: true },
    });

    const categories = await db.category.findMany();

    // Attach accurate counts across all active products before category/search filtering
    const categoriesWithCount = categories.map((cat: any) => ({
      ...cat,
      count: allActiveProducts.filter(
        (p: any) => p.category?.trim().toLowerCase() === cat.id?.trim().toLowerCase()
      ).length,
    }));

    let products = allActiveProducts;

    if (category && category !== 'All Products') {
      const catLower = category.trim().toLowerCase();
      products = products.filter((p: any) => p.category?.trim().toLowerCase() === catLower);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter((p: any) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      products,
      categories: [
        { id: 'All Products', label: '🌟 All Products', icon: '🌟', count: allActiveProducts.length },
        ...categoriesWithCount,
      ],
    });
  } catch (error: any) {
    console.error('Error in public products API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
