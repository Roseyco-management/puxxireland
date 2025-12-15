import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { products } from '@/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

const bulkActionSchema = z.object({
  action: z.enum(['activate', 'deactivate', 'delete', 'feature', 'unfeature']),
  productIds: z.array(z.number()).min(1, 'At least one product ID is required'),
});

/**
 * POST /api/admin/products/bulk
 * Performs bulk operations on multiple products
 *
 * Body:
 * - action: 'activate' | 'deactivate' | 'delete' | 'feature' | 'unfeature'
 * - productIds: number[] - Array of product IDs
 */
export async function POST(request: NextRequest) {
  const db = getDb();
  try {
    const body = await request.json();

    // Validate input
    const result = bulkActionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { action, productIds } = result.data;

    // Check if products exist
    const existingProducts = await db
      .select({ id: products.id })
      .from(products)
      .where(inArray(products.id, productIds));

    if (existingProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 404 }
      );
    }

    // Perform bulk action
    let updateData: Partial<typeof products.$inferInsert> = {
      updatedAt: new Date(),
    };

    switch (action) {
      case 'activate':
        updateData.isActive = true;
        break;
      case 'deactivate':
        updateData.isActive = false;
        break;
      case 'delete':
        // Soft delete
        updateData.isActive = false;
        break;
      case 'feature':
        updateData.isFeatured = true;
        break;
      case 'unfeature':
        updateData.isFeatured = false;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    await db
      .update(products)
      .set(updateData)
      .where(inArray(products.id, productIds));

    const actionMessages = {
      activate: 'activated',
      deactivate: 'deactivated',
      delete: 'deleted',
      feature: 'marked as featured',
      unfeature: 'unmarked as featured',
    };

    return NextResponse.json({
      success: true,
      message: `${productIds.length} product(s) ${actionMessages[action]} successfully`,
      count: productIds.length,
    });
  } catch (error) {
    console.error('Error performing bulk action:', error);
    return NextResponse.json(
      { error: 'Failed to perform bulk action' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products/bulk
 * Permanently deletes multiple products (hard delete)
 *
 * Query parameters:
 * - ids: comma-separated list of product IDs
 */
export async function DELETE(request: NextRequest) {
  const db = getDb();
  try {
    const searchParams = request.nextUrl.searchParams;
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json(
        { error: 'Product IDs are required' },
        { status: 400 }
      );
    }

    const productIds = idsParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));

    if (productIds.length === 0) {
      return NextResponse.json(
        { error: 'Valid product IDs are required' },
        { status: 400 }
      );
    }

    // Check if products exist
    const existingProducts = await db
      .select({ id: products.id })
      .from(products)
      .where(inArray(products.id, productIds));

    if (existingProducts.length === 0) {
      return NextResponse.json(
        { error: 'No products found' },
        { status: 404 }
      );
    }

    // Hard delete (permanent deletion)
    // Note: This will cascade delete related records due to foreign key constraints
    await db
      .delete(products)
      .where(inArray(products.id, productIds));

    return NextResponse.json({
      success: true,
      message: `${existingProducts.length} product(s) permanently deleted`,
      count: existingProducts.length,
    });
  } catch (error) {
    console.error('Error deleting products:', error);
    return NextResponse.json(
      { error: 'Failed to delete products' },
      { status: 500 }
    );
  }
}
