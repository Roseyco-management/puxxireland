# Orders Management System - Quick Reference

## Quick Links

- **Orders List**: `/admin/orders`
- **Order Detail**: `/admin/orders/[id]`
- **Invoice PDF**: `/api/admin/orders/[id]/invoice`
- **CSV Export**: `/api/admin/orders/export`

## Common Tasks

### Add New Order Status

1. Update enum in `/lib/types/orders.ts`:
```typescript
export enum OrderStatus {
  // ... existing statuses
  YOUR_STATUS = 'your_status',
}
```

2. Add color in `ORDER_STATUS_COLORS`
3. Add label in `OrderTimeline.tsx` `STATUS_LABELS`
4. Add icon in `OrderTimeline.tsx` `STATUS_ICONS`

### Customize Invoice

Edit `/lib/utils/invoice-generator.ts`:
- Company info: Lines 53-58
- Colors: Lines 7-9
- Layout: Adjust positions in generateInvoicePDF()

### Add Filter

Edit `/components/admin/orders/OrderFilters.tsx`:
- Add to `OrderFiltersType` interface
- Add UI element in component
- Update API route to handle new filter

### Send Email on Status Change

In `/app/api/admin/orders/[id]/route.ts` (PATCH):
```typescript
// After successful update
if (status && status !== order.status) {
  await sendOrderStatusEmail({
    to: order.shipping_email,
    orderNumber: order.order_number,
    status: status,
  });
}
```

## API Examples

### Fetch Orders with Filters
```typescript
const response = await fetch(
  '/api/admin/orders?status=processing&paymentStatus=succeeded'
);
const { orders, total } = await response.json();
```

### Update Order Status
```typescript
const response = await fetch(`/api/admin/orders/${orderId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'shipped',
    notes: 'Shipped via DPD',
  }),
});
```

### Generate Invoice
```typescript
// In browser
window.open(`/api/admin/orders/${orderId}/invoice`, '_blank');

// Download directly
const response = await fetch(`/api/admin/orders/${orderId}/invoice`);
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
// ... download logic
```

## Component Usage

### OrderStatusBadge
```tsx
import { OrderStatusBadge } from '@/components/admin/orders/OrderStatusBadge';

<OrderStatusBadge status={OrderStatus.SHIPPED} />
```

### OrderTimeline
```tsx
import { OrderTimeline } from '@/components/admin/orders/OrderTimeline';
import { getOrderTimeline } from '@/lib/types/orders';

const timeline = getOrderTimeline(order);
<OrderTimeline
  events={timeline}
  currentStatus={order.status}
/>
```

### OrderFilters
```tsx
import { OrderFilters } from '@/components/admin/orders/OrderFilters';

const [filters, setFilters] = useState<OrderFiltersType>({
  status: 'all',
  paymentStatus: 'all',
  dateRange: 'all',
  search: '',
});

<OrderFilters
  filters={filters}
  onFiltersChange={setFilters}
/>
```

### OrderTable
```tsx
import { OrderTable } from '@/components/admin/orders/OrderTable';

<OrderTable
  orders={orders}
  onRefresh={fetchOrders}
/>
```

## Database Queries

### Fetch Order with Items
```typescript
const { data: order } = await supabase
  .from('orders')
  .select(`
    *,
    order_items (
      id,
      product_id,
      product_name,
      product_sku,
      quantity,
      price,
      total,
      products (
        image_url
      )
    )
  `)
  .eq('id', orderId)
  .single();
```

### Filter Orders by Status
```typescript
const { data: orders } = await supabase
  .from('orders')
  .select('*, order_items(*)')
  .eq('status', 'processing')
  .order('created_at', { ascending: false });
```

### Search Orders
```typescript
const { data: orders } = await supabase
  .from('orders')
  .select('*, order_items(*)')
  .or(`order_number.ilike.%${search}%,shipping_name.ilike.%${search}%`)
  .order('created_at', { ascending: false });
```

## Status Flow

```
pending → processing → shipped → delivered
              ↓
          cancelled / refunded
```

## Payment Status Flow

```
pending → processing → succeeded
              ↓
           failed / refunded
```

## Common Issues

### Orders Not Loading
1. Check Supabase connection
2. Verify authentication
3. Check browser console for errors
4. Ensure orders table exists and has data

### Invoice Not Generating
1. Check order has items
2. Verify jsPDF is installed
3. Check console for errors
4. Ensure all order fields are present

### Filters Not Working
1. Verify API route is handling filter params
2. Check filter state is updating
3. Ensure Supabase query is applying filters
4. Check network tab for correct query params

### CSV Export Empty
1. Verify orders exist matching filters
2. Check API route is returning data
3. Ensure CSV formatting is correct
4. Check browser console for download errors

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Keyboard Shortcuts

- `Ctrl/Cmd + P`: Print invoice (when on detail page)
- `Esc`: Close modals/dialogs
- `Enter`: Submit forms

## Performance Tips

1. **Pagination**: Orders are paginated at 25 per page
2. **Filtering**: Apply filters before large exports
3. **Caching**: Consider implementing SWR for real-time updates
4. **Images**: Order item images are lazy-loaded

## Accessibility

- All buttons have ARIA labels
- Keyboard navigation supported
- Screen reader friendly
- Focus states visible
- Color contrast meets WCAG AA

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Dark Mode

All components support dark mode automatically via Tailwind's `dark:` classes.

## Future Enhancements

See main documentation for planned features.
