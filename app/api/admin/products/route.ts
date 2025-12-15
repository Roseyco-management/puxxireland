import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { products, productCategories, categories } from '@/lib/db/schema';
import { eq, and, desc, asc, sql, ilike, or } from 'drizzle-orm';
import { productSchema } from '@/lib/validations/product';

/**
 * GET /api/admin/products
 * Fetches all products (including inactive) with optional filtering for admin
 *
 * Query parameters:
 * - search: string - Search by name or SKU
 * - category: string - Filter by category
 * - status: string - Filter by active status (active, inactive, all)
 * - featured: boolean - Filter by featured status
 * - sort: string - Sort by field (name, price, stock, created)
 * - order: string - Sort order (asc, desc)
 * - page: number - Page number
 * - limit: number - Items per page
 */
export async function GET(request: NextRequest) {
  const db = getDb();
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const search = searchParams.get('search');
    const categorySlug = searchParams.get('category');
    const status = searchParams.get('status') || 'all';
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sort') || 'created';
    const sortOrder = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query conditions
    const conditions = [];

    // Status filter
    if (status === 'active') {
      conditions.push(eq(products.isActive, true));
    } else if (status === 'inactive') {
      conditions.push(eq(products.isActive, false));
    }

    // Featured filter
    if (featured) {
      conditions.push(eq(products.isFeatured, true));
    }

    // Search filter
    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.sku, `%${search}%`)
        )
      );
    }

    // Determine sorting
    let orderColumn;
    switch (sortBy) {
      case 'price':
        orderColumn = products.price;
        break;
      case 'stock':
        orderColumn = products.stockQuantity;
        break;
      case 'name':
        orderColumn = products.name;
        break;
      case 'created':
      default:
        orderColumn = products.createdAt;
        break;
    }

    const orderFunc = sortOrder === 'asc' ? asc : desc;

    // Calculate offset
    const offset = (page - 1) * limit;

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
      .from(products);

    // Add category filter if specified
    if (categorySlug) {
      query = query
        .innerJoin(
          productCategories,
          eq(products.id, productCategories.productId)
        )
        .innerJoin(categories, eq(productCategories.categoryId, categories.id))
        .where(and(...conditions, eq(categories.slug, categorySlug))) as any;
    } else if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    // Get total count
    const countQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const totalCount = countQuery[0]?.count || 0;

    // Execute query with pagination
    const allProducts = await query
      .orderBy(orderFunc(orderColumn))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      count: allProducts.length,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
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

/**
 * POST /api/admin/products
 * Creates a new product
 */
export async function POST(request: NextRequest) {
  const db = getDb();
  try {
    const body = await request.json();

    // Validate input
    const result = productSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if SKU already exists
    if (data.sku) {
      const existingSKU = await db
        .select()
        .from(products)
        .where(eq(products.sku, data.sku))
        .limit(1);

      if (existingSKU.length > 0) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 409 }
        );
      }
    }

    // Check if slug already exists
    const existingSlug = await db
      .select()
      .from(products)
      .where(eq(products.slug, data.slug))
      .limit(1);

    if (existingSlug.length > 0) {
      return NextResponse.json(
        { error: 'A product with this URL slug already exists' },
        { status: 409 }
      );
    }

    // Create product
    const [newProduct] = await db
      .insert(products)
      .values({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price.toString(),
        compareAtPrice: data.compareAtPrice ? data.compareAtPrice.toString() : null,
        sku: data.sku,
        nicotineStrength: data.nicotineStrength,
        flavor: data.flavor,
        flavorProfile: data.flavorProfile,
        pouchesPerCan: data.pouchesPerCan,
        reorderPoint: data.reorderPoint,
        ingredients: data.ingredients,
        usageInstructions: data.usageInstructions,
        imageUrl: data.imageUrl,
        imageGallery: data.imageGallery,
        stockQuantity: data.stockQuantity,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      })
      .returning();

    // Add to category
    if (data.category) {
      const [categoryRecord] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, data.category))
        .limit(1);

      if (categoryRecord) {
        await db.insert(productCategories).values({
          productId: newProduct.id,
          categoryId: categoryRecord.id,
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
