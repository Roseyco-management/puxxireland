# Analytics Dashboard - Quick Reference

## Quick Access

**URLs:**
- Overview: `/admin/analytics`
- Revenue: `/admin/analytics/revenue`
- Products: `/admin/analytics/products`
- Traffic: `/admin/analytics/traffic`

**API Endpoints:**
- Metrics: `GET /api/admin/analytics/metrics?period=month`
- Revenue: `GET /api/admin/analytics/revenue?period=month`
- Products: `GET /api/admin/analytics/products?period=month`
- Traffic: `GET /api/admin/analytics/traffic`

## Component Imports

```typescript
import {
  MetricCards,
  RevenueChart,
  CategorySalesChart,
  TopProductsChart,
  ConversionFunnelChart,
  ProductPerformanceTable,
  RevenueReport,
  GoogleAnalyticsWidget,
  TimePeriodSelector,
} from '@/components/admin/analytics';
```

## Utility Imports

```typescript
import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatDate,
  exportToCSV,
  calculateTrend,
  getDateRangeFromPeriod,
} from '@/lib/analytics/utils';

import type {
  TimePeriod,
  DateRange,
  RevenueData,
  CategorySalesData,
  TopProduct,
  ProductPerformance,
  ConversionFunnelData,
  AnalyticsMetrics,
  RevenueBreakdown,
  TrafficMetrics,
} from '@/lib/analytics/types';
```

## Common Use Cases

### Fetch Analytics Data

```typescript
// Overview metrics
const response = await fetch('/api/admin/analytics/metrics?period=month');
const { data, comparison } = await response.json();

// Revenue breakdown
const response = await fetch('/api/admin/analytics/revenue?period=week');
const { data } = await response.json();

// Product performance
const response = await fetch('/api/admin/analytics/products?period=year');
const { data } = await response.json();
```

### Custom Date Range

```typescript
const startDate = new Date('2025-01-01');
const endDate = new Date('2025-12-31');

const params = new URLSearchParams({
  period: 'custom',
  startDate: startDate.toISOString(),
  endDate: endDate.toISOString(),
});

const response = await fetch(`/api/admin/analytics/revenue?${params}`);
```

### Export Data to CSV

```typescript
import { exportToCSV } from '@/lib/analytics/utils';

const data = [
  { Product: 'VELO Ice Cool', Revenue: 1234.56, Orders: 42 },
  { Product: 'ZYN Cool Mint', Revenue: 987.65, Orders: 35 },
];

exportToCSV(data, 'sales-report-2025-12-12.csv');
```

### Format Values

```typescript
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/analytics/utils';

formatCurrency(1234.56); // "€1,234.56"
formatPercentage(42.5); // "42.5%"
formatNumber(1234567); // "1,234,567"
```

### Calculate Trends

```typescript
import { calculateTrend } from '@/lib/analytics/utils';

const trend = calculateTrend(1500, 1200);
// { value: 25, isPositive: true }

const trend2 = calculateTrend(900, 1200);
// { value: 25, isPositive: false }
```

## Chart Examples

### Revenue Chart

```typescript
<RevenueChart
  data={[
    { date: '2025-12-01', revenue: 1234, orders: 15 },
    { date: '2025-12-02', revenue: 2345, orders: 23 },
  ]}
  title="Revenue Overview"
  subtitle="Last 7 days"
  height={400}
/>
```

### Top Products Chart

```typescript
<TopProductsChart
  data={[
    { id: 1, name: 'VELO Ice Cool', revenue: 5000, orders: 120, quantity: 360 },
    { id: 2, name: 'ZYN Cool Mint', revenue: 4200, orders: 98, quantity: 294 },
  ]}
  title="Top Products"
  subtitle="By revenue"
/>
```

### Metric Cards

```typescript
<MetricCards
  totalRevenue={125000}
  totalOrders={450}
  averageOrderValue={278}
  conversionRate={2.5}
  returnCustomerRate={35}
  customerLifetimeValue={1250}
  comparison={{ revenue: 110000, orders: 420 }}
/>
```

## Time Periods

Available options:
- `'today'` - Current day
- `'week'` - Last 7 days
- `'month'` - Last 30 days
- `'year'` - Last 365 days
- `'custom'` - Custom date range

## Color Scheme

```typescript
const COLORS = {
  primary: '#009A49',
  secondary: '#00A86B',
  dark: '#00563F',
  light: '#10B981',
  accent: '#059669',
};
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## Database Queries

### Revenue by Period

```sql
SELECT
  DATE(created_at) as date,
  SUM(total) as revenue,
  COUNT(id) as orders
FROM orders
WHERE created_at >= $1
  AND created_at <= $2
  AND payment_status = 'succeeded'
GROUP BY DATE(created_at)
ORDER BY date;
```

### Top Products

```sql
SELECT
  oi.product_name,
  SUM(oi.total) as revenue,
  COUNT(DISTINCT oi.order_id) as orders,
  SUM(oi.quantity) as quantity
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= $1
  AND o.created_at <= $2
  AND o.payment_status = 'succeeded'
GROUP BY oi.product_name
ORDER BY revenue DESC
LIMIT 10;
```

## GA4 Integration

```typescript
// Install package
npm install @google-analytics/data

// Environment variables
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=analytics@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."

// Usage example (see /api/admin/analytics/traffic/route.ts for full code)
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA4_CLIENT_EMAIL,
    private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});
```

## Troubleshooting

**No data showing:**
```bash
# Check database has orders
psql -U postgres -d puxx_ireland -c "SELECT COUNT(*) FROM orders WHERE payment_status = 'succeeded';"

# Verify API response
curl http://localhost:3000/api/admin/analytics/metrics?period=month
```

**Chart not rendering:**
```typescript
// Ensure data has correct format
const data = [
  { date: '2025-12-12', revenue: 100, orders: 5 }, // ✅ Correct
  { date: '12-12-2025', revenue: 100 },            // ❌ Wrong date format
];
```

**Export not working:**
```typescript
// Check browser allows downloads
// Verify data exists before export
if (data.length === 0) {
  console.error('No data to export');
  return;
}
exportToCSV(data, 'filename.csv');
```

## Performance Tips

1. **Use parallel fetching:**
```typescript
const [metrics, revenue, products] = await Promise.all([
  fetch('/api/admin/analytics/metrics'),
  fetch('/api/admin/analytics/revenue'),
  fetch('/api/admin/analytics/products'),
]);
```

2. **Cache expensive queries:**
```typescript
// In API route
export const revalidate = 300; // Cache for 5 minutes
```

3. **Limit data fetched:**
```typescript
// Only fetch what's needed
.limit(10) // Top 10 products
.slice(0, 20) // First 20 results
```

## Support Links

- Full Documentation: `/docs/features/ANALYTICS-SYSTEM.md`
- Implementation Summary: `/docs/ANALYTICS-IMPLEMENTATION-SUMMARY.md`
- Build Plan: `/docs/planning/PUXX-Ireland-Dashboard-Build-Plan.md`
- Code: `/app/(admin)/admin/analytics/`
