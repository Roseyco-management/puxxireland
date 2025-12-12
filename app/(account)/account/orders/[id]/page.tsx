import { getUser } from '@/lib/db/queries';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db/drizzle';
import { orders, orderItems, products } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, MapPin, CreditCard, ShoppingCart } from 'lucide-react';
import { format } from '@/lib/date-utils';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get order
  const orderResult = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, parseInt(id)), eq(orders.userId, user.id)))
    .limit(1);

  if (orderResult.length === 0) {
    notFound();
  }

  const order = orderResult[0];

  // Get order items
  const items = await db
    .select({
      orderItem: orderItems,
      product: products,
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, order.id));

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/account/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{order.orderNumber}
          </h1>
          <p className="text-gray-600 mt-2">
            Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
          </p>
        </div>
        <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm px-4 py-2">
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription>
                {items.length} item{items.length !== 1 ? 's' : ''} in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.orderItem.id}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    {item.product?.imageUrl && (
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.product.imageUrl}
                          alt={item.orderItem.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">
                        {item.orderItem.productName}
                      </h4>
                      {item.orderItem.productSku && (
                        <p className="text-sm text-gray-600 mt-1">
                          SKU: {item.orderItem.productSku}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.orderItem.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        €{parseFloat(item.orderItem.total).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        €{parseFloat(item.orderItem.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reorder Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Reorder Items (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          {order.status !== 'cancelled' && order.status !== 'refunded' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
                <CardDescription>Track your order status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status !== 'pending' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? '✓' : '2'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Processing</p>
                      <p className="text-sm text-gray-600">Your order is being prepared</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {order.status === 'shipped' || order.status === 'delivered' ? '✓' : '3'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Shipped</p>
                      <p className="text-sm text-gray-600">Your order is on the way</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === 'delivered'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {order.status === 'delivered' ? '✓' : '4'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-600">
                        {order.completedAt
                          ? format(new Date(order.completedAt), 'MMM dd, yyyy h:mm a')
                          : 'Estimated delivery date'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.subtotal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.shippingCost).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  €{parseFloat(order.tax).toFixed(2)}
                </span>
              </div>
              {parseFloat(order.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -€{parseFloat(order.discount).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    €{parseFloat(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-900">{order.shippingName}</p>
                <p className="text-gray-700">{order.shippingAddress}</p>
                <p className="text-gray-700">
                  {order.shippingCity}, {order.shippingPostcode}
                </p>
                <p className="text-gray-700">{order.shippingCountry}</p>
                {order.shippingPhone && (
                  <p className="text-gray-700 mt-2">{order.shippingPhone}</p>
                )}
                {order.shippingEmail && (
                  <p className="text-gray-700">{order.shippingEmail}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {order.paymentMethod || 'Card'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.currency && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-medium text-gray-900">
                      {order.currency}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
