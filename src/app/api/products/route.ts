import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products = await db.product.findMany({
      where: { isActive: true },
    });

    const categories = await db.category.findMany();

    if (category && category !== 'All Products') {
      products = products.filter((p: any) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter((p: any) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Attach counts to categories
    const categoriesWithCount = categories.map((cat: any) => ({
      ...cat,
      count: products.filter((p: any) => p.category === cat.id).length,
    }));

    return NextResponse.json({
      success: true,
      products,
      categories: [
        { id: 'All Products', label: '🌟 All Products', icon: '🌟', count: products.length },
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
