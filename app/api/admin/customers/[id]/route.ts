import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { users, profiles, orders, addresses, customerNotes } from '@/lib/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

/**
 * GET /api/admin/customers/[id]
 * Fetches a single customer with detailed information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const db = getDb();

    // Fetch customer with profile
    const customerData = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        phone: profiles.phone,
        dateOfBirth: profiles.dateOfBirth,
        ageVerified: profiles.ageVerified,
        marketingConsent: profiles.marketingConsent,
      })
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.userId))
      .where(eq(users.id, customerId))
      .limit(1);

    if (!customerData.length) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    const customer = customerData[0];

    // Fetch order statistics
    const orderStats = await db
      .select({
        ordersCount: sql<number>`CAST(COUNT(*) AS INTEGER)`,
        totalSpent: sql<string>`COALESCE(SUM(${orders.total}), 0)`,
        lastOrderDate: sql<Date>`MAX(${orders.createdAt})`,
      })
      .from(orders)
      .where(eq(orders.userId, customerId));

    const stats = orderStats[0];

    // Fetch customer addresses
    const customerAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, customerId))
      .orderBy(desc(addresses.isDefaultShipping));

    // Fetch customer notes
    const notes = await db
      .select({
        id: customerNotes.id,
        note: customerNotes.note,
        createdAt: customerNotes.createdAt,
        createdBy: customerNotes.createdBy,
        createdByName: users.name,
        createdByEmail: users.email,
      })
      .from(customerNotes)
      .leftJoin(users, eq(customerNotes.createdBy, users.id))
      .where(eq(customerNotes.userId, customerId))
      .orderBy(desc(customerNotes.createdAt));

    // Calculate average order value
    const avgOrderValue =
      stats.ordersCount > 0
        ? parseFloat(stats.totalSpent) / stats.ordersCount
        : 0;

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id.toString(),
        name: customer.name || 'Guest',
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.dateOfBirth,
        ageVerified: customer.ageVerified,
        marketingConsent: customer.marketingConsent,
        joinedDate: customer.createdAt,
        isGuest: !customer.name || customer.role === 'guest',
        ordersCount: stats.ordersCount,
        totalSpent: parseFloat(stats.totalSpent),
        averageOrderValue: avgOrderValue,
        lastOrderDate: stats.lastOrderDate,
        addresses: customerAddresses,
        notes: notes.map((note) => ({
          id: note.id,
          note: note.note,
          createdAt: note.createdAt,
          createdBy: {
            id: note.createdBy,
            name: note.createdByName,
            email: note.createdByEmail,
          },
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customer',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/customers/[id]
 * Soft delete a customer (mark as deleted)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const db = getDb();

    // Soft delete by setting deletedAt timestamp
    await db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, customerId));

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete customer',
      },
      { status: 500 }
    );
  }
}
