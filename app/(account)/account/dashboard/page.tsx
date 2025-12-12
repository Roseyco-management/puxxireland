import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, profiles, orderItems } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/date-utils';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get user profile
  const userProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);

  // Get user orders
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))
    .limit(5);

  // Get recent orders with items
  const recentOrders = await Promise.all(
    userOrders.slice(0, 3).map(async (order) => {
      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));
      return { ...order, items };
    })
  );

  const totalOrders = userOrders.length;
  const profile = userProfile[0] || null;

  // Get first name from user name
  const firstName = user.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your orders and account settings
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Orders */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {totalOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {recentOrders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-green-600 mt-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {profile?.ageVerified ? 'Verified' : 'Active'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/products">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Products
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                <Package className="h-4 w-4 mr-2" />
                View All Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest orders</CardDescription>
            </div>
            {totalOrders > 3 && (
              <Link href="/account/orders">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No orders yet</p>
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </p>
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'success'
                            : order.status === 'shipped'
                            ? 'info'
                            : order.status === 'processing'
                            ? 'warning'
                            : order.status === 'cancelled'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} •
                      €{parseFloat(order.total).toFixed(2)} •
                      {' '}{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
