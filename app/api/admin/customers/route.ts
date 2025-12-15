import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { users, profiles, orders, orderItems } from '@/lib/db/schema';
import { eq, desc, sql, ilike, and, gte, lte } from 'drizzle-orm';

/**
 * GET /api/admin/customers
 * Fetches all customers with aggregated order data
 *
 * Query parameters:
 * - search: string - Search by name or email
 * - isGuest: boolean - Filter by guest vs registered
 * - hasOrders: boolean - Filter by customers with/without orders
 * - dateFrom: string - Filter by joined date (ISO format)
 * - dateTo: string - Filter by joined date (ISO format)
 */
export async function GET(request: NextRequest) {
  const db = getDb();
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const isGuest = searchParams.get('isGuest');
    const hasOrders = searchParams.get('hasOrders');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Build base query with aggregated order data
    const customersWithStats = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: profiles.phone,
        createdAt: users.createdAt,
        role: users.role,
        ordersCount: sql<number>`CAST(COUNT(DISTINCT ${orders.id}) AS INTEGER)`,
        totalSpent: sql<string>`COALESCE(SUM(${orders.total}), 0)`,
        lastOrderDate: sql<Date>`MAX(${orders.createdAt})`,
      })
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.userId))
      .leftJoin(orders, eq(users.id, orders.userId))
      .where(
        and(
          // Search filter
          search
            ? sql`(
                LOWER(${users.name}) LIKE LOWER(${`%${search}%`}) OR
                LOWER(${users.email}) LIKE LOWER(${`%${search}%`}) OR
                LOWER(${profiles.phone}) LIKE LOWER(${`%${search}%`})
              )`
            : undefined,
          // Date range filter
          dateFrom ? gte(users.createdAt, new Date(dateFrom)) : undefined,
          dateTo ? lte(users.createdAt, new Date(dateTo)) : undefined
        )
      )
      .groupBy(users.id, profiles.phone)
      .orderBy(desc(users.createdAt));

    // Apply post-query filters
    let filteredCustomers = customersWithStats;

    if (hasOrders !== null) {
      const hasOrdersFilter = hasOrders === 'true';
      filteredCustomers = customersWithStats.filter((c) =>
        hasOrdersFilter ? c.ordersCount > 0 : c.ordersCount === 0
      );
    }

    // Format the response
    const customers = filteredCustomers.map((customer) => ({
      id: customer.id.toString(),
      name: customer.name || 'Guest',
      email: customer.email,
      phone: customer.phone,
      ordersCount: customer.ordersCount,
      totalSpent: parseFloat(customer.totalSpent),
      lastOrderDate: customer.lastOrderDate,
      joinedDate: customer.createdAt,
      isGuest: !customer.name || customer.role === 'guest',
    }));

    return NextResponse.json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customers',
      },
      { status: 500 }
    );
  }
}
