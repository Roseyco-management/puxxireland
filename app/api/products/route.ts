import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { products, categories, productCategories } from '@/lib/db/schema';
import { eq, and, desc, asc, sql } from 'drizzle-orm';

/**
 * GET /api/products
 * Fetches all active products with optional filtering
 *
 * Query parameters:
 * - featured: boolean - Filter by featured products
 * - flavor: string - Filter by flavor
 * - strength: string - Filter by nicotine strength
 * - category: string - Filter by category slug
 * - sort: string - Sort by field (name, price, strength)
 * - order: string - Sort order (asc, desc)
 * - limit: number - Limit results
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const featured = searchParams.get('featured') === 'true';
    const flavor = searchParams.get('flavor');
    const strength = searchParams.get('strength');
    const categorySlug = searchParams.get('category');
    const sortBy = searchParams.get('sort') || 'name';
    const sortOrder = searchParams.get('order') || 'asc';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build query conditions
    const conditions = [eq(products.isActive, true)];

    if (featured) {
      conditions.push(eq(products.isFeatured, true));
    }

    if (flavor) {
      conditions.push(eq(products.flavor, flavor));
    }

    if (strength) {
      conditions.push(eq(products.nicotineStrength, strength));
    }

    // Build the query
    let query = db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        sku: products.sku,
        nicotineStrength: products.nicotineStrength,
        flavor: products.flavor,
        pouchesPerCan: products.pouchesPerCan,
        ingredients: products.ingredients,
        usageInstructions: products.usageInstructions,
        imageUrl: products.imageUrl,
        imageGallery: products.imageGallery,
        stockQuantity: products.stockQuantity,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        metaTitle: products.metaTitle,
        metaDescription: products.metaDescription,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .where(and(...conditions));

    // Apply category filter if specified
    if (categorySlug) {
      query = db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          description: products.description,
          price: products.price,
          compareAtPrice: products.compareAtPrice,
          sku: products.sku,
          nicotineStrength: products.nicotineStrength,
          flavor: products.flavor,
          pouchesPerCan: products.pouchesPerCan,
          ingredients: products.ingredients,
          usageInstructions: products.usageInstructions,
          imageUrl: products.imageUrl,
          imageGallery: products.imageGallery,
          stockQuantity: products.stockQuantity,
          isActive: products.isActive,
          isFeatured: products.isFeatured,
          metaTitle: products.metaTitle,
          metaDescription: products.metaDescription,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        })
        .from(products)
        .innerJoin(
          productCategories,
          eq(products.id, productCategories.productId)
        )
        .innerJoin(categories, eq(productCategories.categoryId, categories.id))
        .where(
          and(...conditions, eq(categories.slug, categorySlug))
        );
    }

    // Apply sorting
    const orderColumn =
      sortBy === 'price'
        ? products.price
        : sortBy === 'strength'
          ? products.nicotineStrength
          : products.name;

    query =
      sortOrder === 'desc'
        ? query.orderBy(desc(orderColumn))
        : query.orderBy(asc(orderColumn));

    // Apply limit
    query = query.limit(limit);

    // Execute query
    const allProducts = await query;

    return NextResponse.json({
      success: true,
      count: allProducts.length,
      products: allProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
