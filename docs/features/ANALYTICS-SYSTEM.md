# Analytics & Reports Dashboard

Complete analytics system for the PUXX Ireland Admin Dashboard with comprehensive charts, reports, and insights.

## Overview

The analytics system provides detailed insights into:
- Revenue performance and trends
- Product sales and conversion metrics
- Customer behavior and segmentation
- Traffic sources and visitor analytics (GA4 integration ready)

## Features

### 1. Analytics Overview (`/admin/analytics`)

**Metrics Cards:**
- Total Revenue (with period comparison)
- Total Orders (with trend)
- Average Order Value
- Conversion Rate
- Return Customer Rate
- Customer Lifetime Value

**Charts:**
- Revenue over time (daily granularity)
- Sales by category (pie chart)
- Top 10 products by revenue (bar chart)
- Conversion funnel visualization

**Time Period Filters:**
- Today
- Last 7 Days
- Last 30 Days
- Last Year
- Custom date range

**Export:**
- CSV export of overview metrics

### 2. Revenue Analytics (`/admin/analytics/revenue`)

**Summary Stats:**
- Total revenue for period
- Total completed orders
- Growth rate (period over period)

**Revenue Charts:**
- Daily revenue trends
- Weekly revenue trends
- Monthly revenue trends
- Toggle between day/week/month views

**Detailed Breakdowns:**
- Revenue by product (top 20)
- Revenue by category
- Revenue by customer segment (new vs returning)
- Export functionality for each breakdown

**Insights:**
- Top performing products
- Category distribution
- Customer segment analysis
- Average order values per segment

### 3. Product Performance (`/admin/analytics/products`)

**Summary Stats:**
- Total revenue from all products
- Number of active products (with sales)
- Average conversion rate
- Best performing product

**Product Metrics Table:**
Sortable by any column:
- Product name and SKU
- Views (estimated - requires GA4 for accurate data)
- Add to cart rate
- Purchase rate
- Revenue
- Stock quantity

**Features:**
- Color-coded conversion rates (red/yellow/green)
- Stock alerts (low stock warning)
- CSV export of full product performance data
- Interactive sorting

**Charts:**
- Top 10 products bar chart
- Product details table

**Alerts:**
- Low stock products (< 10 units)
- Out of stock products

### 4. Traffic Analytics (`/admin/analytics/traffic`)

**Note:** This page displays mock data by default. Integrate with Google Analytics 4 API for real data.

**Traffic Metrics:**
- Page views
- Unique visitors
- Bounce rate
- Average session duration

**Charts & Breakdowns:**
- Traffic sources (pie chart)
  - Direct, Organic Search, Social Media, Referral
- Device breakdown
  - Mobile, Desktop, Tablet (with percentages)
- Top pages (bar chart)
- Top locations (table)

**GA4 Integration Guide:**
Step-by-step instructions for integrating Google Analytics 4:
1. Install dependencies
2. Set up service account
3. Configure environment variables
4. Update API route

## Technical Architecture

### API Routes

**`/api/admin/analytics/metrics`**
- GET: Fetches overview metrics and comparison data
- Query params: `period`, `startDate`, `endDate`

**`/api/admin/analytics/revenue`**
- GET: Fetches revenue breakdowns
- Returns: daily, weekly, monthly data, product breakdown, category breakdown, customer segments

**`/api/admin/analytics/products`**
- GET: Fetches product performance metrics
- Returns: product performance table data, top products

**`/api/admin/analytics/traffic`**
- GET: Fetches traffic analytics (mock data)
- Note: Requires GA4 integration for real data

### Components

**Core Components:**
- `MetricCards` - Display key metrics with trends
- `RevenueChart` - Area chart for revenue over time
- `CategorySalesChart` - Pie chart for category distribution
- `TopProductsChart` - Horizontal bar chart for top products
- `ConversionFunnelChart` - Visual funnel representation
- `ProductPerformanceTable` - Sortable product metrics table
- `RevenueReport` - Detailed revenue breakdowns
- `GoogleAnalyticsWidget` - Traffic analytics display
- `TimePeriodSelector` - Time period filter component

**Utility Functions:**
- `getDateRangeFromPeriod` - Convert period to date range
- `formatCurrency` - Format numbers as EUR currency
- `formatPercentage` - Format numbers as percentages
- `formatDate` - Format dates for display
- `exportToCSV` - Export data to CSV file
- `calculateTrend` - Calculate trend between periods

### Types

All analytics types are defined in `/lib/analytics/types.ts`:
- `TimePeriod` - Time period options
- `DateRange` - Start and end dates
- `RevenueData` - Revenue time series data
- `CategorySalesData` - Category breakdown
- `TopProduct` - Product revenue metrics
- `ProductPerformance` - Product analytics metrics
- `ConversionFunnelData` - Funnel stage data
- `AnalyticsMetrics` - Overview metrics
- `RevenueBreakdown` - Revenue breakdown structure
- `TrafficMetrics` - GA4 traffic data

## Database Queries

The analytics system queries the following tables:
- `orders` - Revenue and order data
- `order_items` - Product-level sales data
- `products` - Product information
- `categories` - Category data
- `product_categories` - Product-category relationships
- `cart_items` - Add to cart tracking
- `users` - Customer data

**Performance Considerations:**
- Queries use appropriate indexes
- Date range filtering on indexed `created_at` columns
- Aggregations done at database level
- Results cached where appropriate

## Styling

All charts use the PUXX Ireland brand colors:
- Primary: `#009A49` (Emerald green)
- Gradient variations: `#00A86B`, `#00563F`, `#10B981`, `#059669`

**Chart Features:**
- Responsive sizing
- Dark mode support
- Custom tooltips with dark background
- Gradient fills under area charts
- Color-coded metrics (green for good, yellow for warning, red for poor)

## Export Functionality

**Supported Exports:**
- Overview metrics → CSV
- Revenue by product → CSV
- Revenue by category → CSV
- Product performance table → CSV

**Export Format:**
- Headers in first row
- Proper escaping of special characters
- Automatic date in filename
- Download triggered via browser

## Integration with Google Analytics 4

**Setup Steps:**

1. **Install Dependencies:**
```bash
npm install @google-analytics/data
```

2. **Create Service Account:**
- Go to Google Cloud Console
- Create a new service account
- Grant Analytics Viewer permissions
- Download JSON key file

3. **Environment Variables:**
```env
GA4_PROPERTY_ID=123456789
GA4_CLIENT_EMAIL=analytics@project.iam.gserviceaccount.com
GA4_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

4. **Update API Route:**
See commented example code in `/app/api/admin/analytics/traffic/route.ts`

**Available GA4 Metrics:**
- Real-time active users
- Page views and unique visitors
- Bounce rate and session duration
- Traffic sources and campaigns
- Device and location data
- E-commerce events (product views, add to cart, purchases)

## Security

**Access Control:**
- Analytics routes require admin/manager role
- API routes validate authentication
- Sensitive data filtered based on permissions

**Data Privacy:**
- Customer data aggregated for privacy
- No PII exposed in analytics exports
- Compliant with GDPR requirements

## Performance

**Optimization Strategies:**
- Database query optimization with proper indexes
- Parallel API calls on frontend
- Data aggregation at database level
- Response caching for expensive queries
- Lazy loading of chart components

**Recommended Caching:**
- Cache overview metrics for 5 minutes
- Cache product performance for 15 minutes
- Cache traffic data for 1 hour
- Invalidate on relevant data changes

## Future Enhancements

**Planned Features:**
1. Real-time analytics dashboard
2. Advanced customer segmentation
3. Cohort analysis
4. A/B testing results
5. Predictive analytics (demand forecasting)
6. Custom report builder
7. Scheduled email reports
8. Multi-currency support
9. Inventory forecasting
10. ROI calculator for marketing campaigns

## Troubleshooting

**Common Issues:**

1. **No data showing:**
   - Check database has order data
   - Verify date range includes orders
   - Check payment status filter (only 'succeeded' orders counted)

2. **Incorrect metrics:**
   - Verify time zone settings
   - Check currency conversion if applicable
   - Ensure database migrations are up to date

3. **GA4 integration not working:**
   - Verify service account credentials
   - Check property ID is correct
   - Ensure service account has Analytics Viewer role
   - Check API quota limits

4. **Export failing:**
   - Check browser allows downloads
   - Verify data is available before export
   - Check file permissions on server

## Support

For questions or issues:
1. Check this documentation
2. Review the code comments in components
3. Check the API route implementations
4. Review the build plan at `/docs/planning/PUXX-Ireland-Dashboard-Build-Plan.md`

## License

Part of the PUXX Ireland e-commerce platform.
