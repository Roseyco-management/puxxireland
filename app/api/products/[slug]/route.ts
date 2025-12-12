import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { products, categories, productCategories } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * GET /api/products/[slug]
 * Fetches a single product by slug with category information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug is required',
        },
        { status: 400 }
      );
    }

    // Fetch product with categories
    const result = await db
      .select({
        product: products,
        category: categories,
      })
      .from(products)
      .leftJoin(
        productCategories,
        eq(products.id, productCategories.productId)
      )
      .leftJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(and(eq(products.slug, slug), eq(products.isActive, true)))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Combine product data with categories
    const productData = result[0].product;
    const categoriesData = result
      .filter((r) => r.category !== null)
      .map((r) => r.category);

    return NextResponse.json({
      success: true,
      product: {
        ...productData,
        categories: categoriesData,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
