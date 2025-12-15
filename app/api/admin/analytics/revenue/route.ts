import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { orders, orderItems, products, categories, productCategories, users } from '@/lib/db/schema';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';
import { getDateRangeFromPeriod } from '@/lib/analytics/utils';
import type { TimePeriod, RevenueBreakdown } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
  const db = getDb();
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = (searchParams.get('period') || 'month') as TimePeriod;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let dateRange;
    if (period === 'custom' && startDate && endDate) {
      dateRange = {
        start: new Date(startDate),
        end: new Date(endDate),
      };
    } else {
      dateRange = getDateRangeFromPeriod(period);
    }

    // Get revenue by day
    const revenueByDay = await db
      .select({
        date: sql<string>`DATE(${orders.createdAt})`,
        revenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        orders: sql<number>`COUNT(${orders.id})`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, dateRange.start),
          lte(orders.createdAt, dateRange.end),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(sql`DATE(${orders.createdAt})`)
      .orderBy(sql`DATE(${orders.createdAt})`);

    // Get revenue by week (last 12 weeks)
    const twelveWeeksAgo = new Date();
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

    const revenueByWeek = await db
      .select({
        date: sql<string>`DATE_TRUNC('week', ${orders.createdAt})`,
        revenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        orders: sql<number>`COUNT(${orders.id})`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, twelveWeeksAgo),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(sql`DATE_TRUNC('week', ${orders.createdAt})`)
      .orderBy(sql`DATE_TRUNC('week', ${orders.createdAt})`);

    // Get revenue by month (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const revenueByMonth = await db
      .select({
        date: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        revenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        orders: sql<number>`COUNT(${orders.id})`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, twelveMonthsAgo),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    // Get revenue by product
    const revenueByProduct = await db
      .select({
        productName: orderItems.productName,
        revenue: sql<number>`COALESCE(SUM(${orderItems.total}), 0)`,
        orders: sql<number>`COUNT(DISTINCT ${orderItems.orderId})`,
      })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .where(
        and(
          gte(orders.createdAt, dateRange.start),
          lte(orders.createdAt, dateRange.end),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(orderItems.productName)
      .orderBy(desc(sql`SUM(${orderItems.total})`))
      .limit(20);

    // Get revenue by category
    const revenueByCategory = await db
      .select({
        name: categories.name,
        revenue: sql<number>`COALESCE(SUM(${orderItems.total}), 0)`,
        orders: sql<number>`COUNT(DISTINCT ${orderItems.orderId})`,
      })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .innerJoin(products, eq(orderItems.productId, products.id))
      .innerJoin(productCategories, eq(products.id, productCategories.productId))
      .innerJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(
        and(
          gte(orders.createdAt, dateRange.start),
          lte(orders.createdAt, dateRange.end),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(categories.id, categories.name)
      .orderBy(desc(sql`SUM(${orderItems.total})`));

    // Get revenue by customer segment (new vs returning)
    const customerSegments = await db
      .select({
        userId: orders.userId,
        totalOrders: sql<number>`COUNT(${orders.id})`,
        revenue: sql<number>`SUM(${orders.total})`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, dateRange.start),
          lte(orders.createdAt, dateRange.end),
          eq(orders.paymentStatus, 'succeeded')
        )
      )
      .groupBy(orders.userId);

    const newCustomers = customerSegments.filter(c => Number(c.totalOrders) === 1);
    const returningCustomers = customerSegments.filter(c => Number(c.totalOrders) > 1);

    const revenueByCustomerSegment = [
      {
        segment: 'New Customers',
        revenue: newCustomers.reduce((sum, c) => sum + Number(c.revenue), 0),
        customers: newCustomers.length,
      },
      {
        segment: 'Returning Customers',
        revenue: returningCustomers.reduce((sum, c) => sum + Number(c.revenue), 0),
        customers: returningCustomers.length,
      },
    ];

    const breakdown: RevenueBreakdown = {
      byDay: revenueByDay.map(row => ({
        date: row.date,
        revenue: Number(row.revenue),
        orders: Number(row.orders),
      })),
      byWeek: revenueByWeek.map(row => ({
        date: row.date,
        revenue: Number(row.revenue),
        orders: Number(row.orders),
      })),
      byMonth: revenueByMonth.map(row => ({
        date: row.date,
        revenue: Number(row.revenue),
        orders: Number(row.orders),
      })),
      byProduct: revenueByProduct.map(row => ({
        productName: row.productName,
        revenue: Number(row.revenue),
        orders: Number(row.orders),
      })),
      byCategory: revenueByCategory.map(row => ({
        name: row.name,
        value: Number(row.revenue),
        revenue: Number(row.revenue),
        orders: Number(row.orders),
      })),
      byCustomerSegment: revenueByCustomerSegment,
    };

    return NextResponse.json({
      data: breakdown,
      period,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      },
    });
  } catch (error) {
    console.error('Analytics revenue error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue analytics' },
      { status: 500 }
    );
  }
}
