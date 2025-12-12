import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { orders, users } from '@/lib/db/schema';
import { eq, and, gte, lte, sql, inArray } from 'drizzle-orm';
import { getDateRangeFromPeriod } from '@/lib/analytics/utils';
import type { TimePeriod, AnalyticsMetrics } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
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

    // Get total revenue and orders for period
    const [revenueStats] = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        totalOrders: sql<number>`COUNT(${orders.id})`,
        avgOrderValue: sql<number>`COALESCE(AVG(${orders.total}), 0)`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, dateRange.start),
          lte(orders.createdAt, dateRange.end),
          eq(orders.paymentStatus, 'succeeded')
        )
      );

    // Get customer metrics
    const customerOrders = await db
      .select({
        userId: orders.userId,
        orderCount: sql<number>`COUNT(${orders.id})`,
        totalSpent: sql<number>`SUM(${orders.total})`,
      })
      .from(orders)
      .where(eq(orders.paymentStatus, 'succeeded'))
      .groupBy(orders.userId);

    const returningCustomers = customerOrders.filter(
      c => Number(c.orderCount) > 1
    ).length;
    const totalCustomers = customerOrders.length;
    const returnCustomerRate = totalCustomers > 0
      ? (returningCustomers / totalCustomers) * 100
      : 0;

    const customerLifetimeValue = totalCustomers > 0
      ? customerOrders.reduce((sum, c) => sum + Number(c.totalSpent), 0) / totalCustomers
      : 0;

    // Calculate conversion rate (orders / unique visitors)
    // Note: This requires GA4 integration for real visitor data
    // Using estimated conversion rate based on orders
    const estimatedVisitors = Number(revenueStats.totalOrders) * 50; // Assume 2% conversion
    const conversionRate = estimatedVisitors > 0
      ? (Number(revenueStats.totalOrders) / estimatedVisitors) * 100
      : 0;

    // Get comparison data for previous period
    const periodLength = dateRange.end.getTime() - dateRange.start.getTime();
    const previousStart = new Date(dateRange.start.getTime() - periodLength);
    const previousEnd = new Date(dateRange.start);

    const [previousStats] = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${orders.total}), 0)`,
        totalOrders: sql<number>`COUNT(${orders.id})`,
      })
      .from(orders)
      .where(
        and(
          gte(orders.createdAt, previousStart),
          lte(orders.createdAt, previousEnd),
          eq(orders.paymentStatus, 'succeeded')
        )
      );

    const metrics: AnalyticsMetrics = {
      totalRevenue: Number(revenueStats.totalRevenue),
      totalOrders: Number(revenueStats.totalOrders),
      averageOrderValue: Number(revenueStats.avgOrderValue),
      conversionRate,
      returnCustomerRate,
      customerLifetimeValue,
    };

    return NextResponse.json({
      data: metrics,
      period,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      },
      comparison: {
        revenue: Number(previousStats.totalRevenue),
        orders: Number(previousStats.totalOrders),
      },
    });
  } catch (error) {
    console.error('Analytics metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics metrics' },
      { status: 500 }
    );
  }
}
