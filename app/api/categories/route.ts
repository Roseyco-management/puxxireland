import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { categories } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';

/**
 * GET /api/categories
 * Fetches all product categories
 */
export async function GET(request: NextRequest) {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder));

    return NextResponse.json({
      success: true,
      count: allCategories.length,
      categories: allCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}
