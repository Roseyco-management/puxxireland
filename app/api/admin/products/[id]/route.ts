import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { products, productCategories, categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { productSchema } from '@/lib/validations/product';

/**
 * GET /api/admin/products/[id]
 * Fetches a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get category
    const productCategoryRel = await db
      .select({
        categorySlug: categories.slug,
        categoryName: categories.name,
      })
      .from(productCategories)
      .innerJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(eq(productCategories.productId, productId))
      .limit(1);

    const category = productCategoryRel[0]?.categorySlug || null;

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        category,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/products/[id]
 * Updates a product
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

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

    // Check if product exists
    const [existingProduct] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if SKU is being changed and if it conflicts
    if (data.sku && data.sku !== existingProduct.sku) {
      const existingSKU = await db
        .select()
        .from(products)
        .where(eq(products.sku, data.sku))
        .limit(1);

      if (existingSKU.length > 0 && existingSKU[0].id !== productId) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 409 }
        );
      }
    }

    // Check if slug is being changed and if it conflicts
    if (data.slug !== existingProduct.slug) {
      const existingSlug = await db
        .select()
        .from(products)
        .where(eq(products.slug, data.slug))
        .limit(1);

      if (existingSlug.length > 0 && existingSlug[0].id !== productId) {
        return NextResponse.json(
          { error: 'A product with this URL slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId))
      .returning();

    // Update category if changed
    if (data.category) {
      // Remove existing category associations
      await db
        .delete(productCategories)
        .where(eq(productCategories.productId, productId));

      // Add new category
      const [categoryRecord] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, data.category))
        .limit(1);

      if (categoryRecord) {
        await db.insert(productCategories).values({
          productId: productId,
          categoryId: categoryRecord.id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/[id]
 * Soft deletes a product (sets isActive to false)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const [existingProduct] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Soft delete (set isActive to false)
    await db
      .update(products)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId));

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
