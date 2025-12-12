import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems, products, cartItems } from '@/lib/db/schema';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';
import { getDateRangeFromPeriod } from '@/lib/analytics/utils';
import type { TimePeriod, ProductPerformance } from '@/lib/analytics/types';

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

    // Get product sales performance
    const productSales = await db
      .select({
        productId: orderItems.productId,
        productName: orderItems.productName,
        productSku: orderItems.productSku,
        revenue: sql<number>`COALESCE(SUM(${orderItems.total}), 0)`,
        orders: sql<number>`COUNT(DISTINCT ${orderItems.orderId})`,
        quantity: sql<number>`SUM(${orderItems.quantity})`,
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
      .groupBy(orderItems.productId, orderItems.productName, orderItems.productSku)
      .orderBy(desc(sql`SUM(${orderItems.total})`));

    // Get add to cart data
    const addToCartData = await db
      .select({
        productId: cartItems.productId,
        addToCartCount: sql<number>`COUNT(DISTINCT ${cartItems.userId})`,
      })
      .from(cartItems)
      .where(
        and(
          gte(cartItems.createdAt, dateRange.start),
          lte(cartItems.createdAt, dateRange.end)
        )
      )
      .groupBy(cartItems.productId);

    const addToCartMap = new Map(
      addToCartData.map(item => [Number(item.productId), Number(item.addToCartCount)])
    );

    // Get all products with stock info
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        sku: products.sku,
        stockQuantity: products.stockQuantity,
        price: products.price,
      })
      .from(products)
      .where(eq(products.isActive, true));

    // Combine data into product performance metrics
    const productPerformance: ProductPerformance[] = allProducts.map(product => {
      const sales = productSales.find(s => Number(s.productId) === product.id);
      const addToCarts = addToCartMap.get(product.id) || 0;
      const purchases = sales ? Number(sales.orders) : 0;

      // Calculate rates (using mock view data - integrate with GA4 for real data)
      const views = Math.max(addToCarts * 3, purchases * 5); // Estimate based on cart adds
      const addToCartRate = views > 0 ? (addToCarts / views) * 100 : 0;
      const purchaseRate = addToCarts > 0 ? (purchases / addToCarts) * 100 : 0;

      return {
        id: product.id,
        name: product.name,
        sku: product.sku || '',
        views,
        addToCartRate,
        purchaseRate,
        revenue: sales ? Number(sales.revenue) : 0,
        profitMargin: null, // Would need cost data
        stockQuantity: product.stockQuantity,
      };
    });

    // Sort by revenue descending
    productPerformance.sort((a, b) => b.revenue - a.revenue);

    // Get top products by revenue (for charts)
    const topProducts = productSales.slice(0, 10).map(product => ({
      id: Number(product.productId),
      name: product.productName,
      revenue: Number(product.revenue),
      orders: Number(product.orders),
      quantity: Number(product.quantity),
    }));

    return NextResponse.json({
      data: {
        performance: productPerformance,
        topProducts,
      },
      period,
      dateRange: {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      },
    });
  } catch (error) {
    console.error('Analytics products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product analytics' },
      { status: 500 }
    );
  }
}
