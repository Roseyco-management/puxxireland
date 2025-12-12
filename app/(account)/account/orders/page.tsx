import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Package, Eye } from 'lucide-react';
import { format } from '@/lib/date-utils';

export default async function OrdersPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get all user orders with items count
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  const ordersWithItems = await Promise.all(
    userOrders.map(async (order) => {
      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
      return { ...order, itemCount: items.length };
    })
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
      case 'refunded':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-2">
          View and track all your orders
        </p>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            {ordersWithItems.length} order{ordersWithItems.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ordersWithItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here
              </p>
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Order Number
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersWithItems.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">
                            #{order.orderNumber}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {format(new Date(order.createdAt), 'dd MMM yyyy')}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-semibold">
                          €{parseFloat(order.total).toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Link href={`/account/orders/${order.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-600 text-green-600 hover:bg-green-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {ordersWithItems.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {format(new Date(order.createdAt), 'dd MMM yyyy')}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                      </span>
                      <span className="font-semibold text-gray-900">
                        €{parseFloat(order.total).toFixed(2)}
                      </span>
                    </div>

                    <Link href={`/account/orders/${order.id}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
