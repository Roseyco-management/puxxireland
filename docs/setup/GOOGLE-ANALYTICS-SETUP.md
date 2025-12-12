# Google Analytics 4 Setup Guide - PUXX Ireland

This guide provides step-by-step instructions for setting up Google Analytics 4 (GA4) for PUXX Ireland, including e-commerce tracking, conversion events, and SEO-specific monitoring.

## Table of Contents
1. [GA4 Property Setup](#ga4-property-setup)
2. [Installation in Next.js](#installation-in-nextjs)
3. [Environment Configuration](#environment-configuration)
4. [Conversion Events](#conversion-events)
5. [Custom Dimensions for SEO](#custom-dimensions-for-seo)
6. [Organic Traffic Tracking](#organic-traffic-tracking)
7. [Key Metrics to Monitor](#key-metrics-to-monitor)
8. [Review Checklist](#review-checklist)

---

## GA4 Property Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. In the **Account** column, click **Create Account** (or select existing)
   - Account name: `PUXX Ireland`
   - Check all data sharing settings as needed

4. In the **Property** column, click **Create Property**
   - Property name: `PUXX Ireland Website`
   - Reporting time zone: `(GMT+00:00) Dublin, Edinburgh, Lisbon, London`
   - Currency: `Euro (EUR)`
   - Click **Next**

5. Business Information
   - Industry: `Retail and Consumer Goods`
   - Business size: Select appropriate size
   - Business objectives: Select `Get baseline reports` and `Measure online sales`
   - Click **Create**

6. Accept Terms of Service

### 2. Set Up Data Stream

1. Select platform: **Web**
2. Configure web stream:
   - Website URL: `https://puxxnicotine.ie`
   - Stream name: `PUXX Ireland Production`
   - Enable **Enhanced measurement** (recommended)
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads

3. Click **Create stream**
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
   - Save this for environment configuration

### 3. Enable E-commerce Settings

1. In your data stream, go to **Configure tag settings**
2. Click **Show more** under **Enhanced measurement**
3. Ensure these are enabled:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - File downloads

4. Go to **Admin** > **Data display** > **Ecommerce Settings**
5. Toggle **Enable ecommerce data collection** to ON

---

## Installation in Next.js

### 1. Install Required Package

```bash
npm install react-ga4
```

Or if you prefer the official gtag approach (recommended):

```bash
# No package needed - we'll use the official Google Analytics script
```

### 2. Add Analytics Script to Root Layout

Update `/Users/baileybarry/PuxxIreland/app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-[100dvh] bg-background font-sans antialiased">
        <ToastProvider>
          <SWRConfig
            value={{
              fallback: {
                '/api/user': getUser(),
                '/api/team': getTeamForUser()
              }
            }}
          >
            {children}
          </SWRConfig>
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 3. Create Analytics Helper Library

Create `/Users/baileybarry/PuxxIreland/lib/analytics/google-analytics.ts`:

See the implementation file created alongside this guide.

---

## Environment Configuration

### 1. Add to `.env` file

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Add to `.env.example` file

```bash
# Google Analytics 4
# Get this from GA4 Dashboard -> Admin -> Data Streams -> Your Stream
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Verify in Development

The tracking will only work when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. You can:

- **Development**: Set to your GA4 Measurement ID to test (creates test data)
- **Production**: Always set to production GA4 Measurement ID
- **Optional**: Create separate GA4 properties for dev/staging/production

---

## Conversion Events

GA4 will automatically track these **recommended e-commerce events** when you implement the tracking functions:

### 1. Add to Cart Event

**Event name**: `add_to_cart`

**When to track**: User clicks "Add to Cart" button

**Data captured**:
```typescript
{
  currency: 'EUR',
  value: 5.99,
  items: [{
    item_id: '1',
    item_name: 'PUXX Blue Ice',
    item_category: 'Nicotine Pouches',
    item_variant: '14mg',
    price: 5.99,
    quantity: 1
  }]
}
```

**Implementation location**:
- `/Users/baileybarry/PuxxIreland/components/cart/CartButton.tsx`
- `/Users/baileybarry/PuxxIreland/app/products/[slug]/page.tsx`

### 2. Begin Checkout Event

**Event name**: `begin_checkout`

**When to track**: User navigates to checkout page

**Data captured**:
```typescript
{
  currency: 'EUR',
  value: 23.96,
  items: [/* all cart items */]
}
```

**Implementation location**:
- `/Users/baileybarry/PuxxIreland/app/checkout/page.tsx`

### 3. Purchase Event

**Event name**: `purchase`

**When to track**: Order successfully completed

**Data captured**:
```typescript
{
  transaction_id: 'ORDER-12345',
  value: 23.96,
  tax: 0,
  shipping: 10.00,
  currency: 'EUR',
  items: [/* all purchased items */]
}
```

**Implementation location**:
- `/Users/baileybarry/PuxxIreland/components/checkout/Step6Confirmation.tsx`
- After successful payment processing

### 4. Newsletter Signup Event

**Event name**: `newsletter_signup`

**When to track**: User subscribes to newsletter

**Data captured**:
```typescript
{
  method: 'footer' | 'popup' | 'checkout'
}
```

**Implementation location**:
- Newsletter signup form components
- `/Users/baileybarry/PuxxIreland/components/footer/*` (if newsletter form exists)

### 5. View Item Event (Optional but Recommended)

**Event name**: `view_item`

**When to track**: User views a product page

**Data captured**:
```typescript
{
  currency: 'EUR',
  value: 5.99,
  items: [{
    item_id: '1',
    item_name: 'PUXX Blue Ice',
    item_category: 'Nicotine Pouches',
    price: 5.99
  }]
}
```

**Implementation location**:
- `/Users/baileybarry/PuxxIreland/app/products/[slug]/page.tsx`

---

## Custom Dimensions for SEO

Custom dimensions help you segment and analyze SEO-specific data.

### 1. Create Custom Dimensions in GA4

1. Go to **Admin** > **Data display** > **Custom definitions**
2. Click **Create custom dimension**
3. Add these dimensions:

| Dimension Name | Scope | Description | Parameter Name |
|---------------|-------|-------------|----------------|
| Traffic Source Type | Event | Organic vs Paid vs Direct | `traffic_source_type` |
| Landing Page Path | Event | First page user lands on | `landing_page` |
| User Device Category | User | Mobile, Desktop, Tablet | `device_category` |
| Page Category | Event | Product, Blog, Static | `page_category` |

### 2. Implementation in Analytics Helper

These are automatically captured via our helper functions:

```typescript
// Already included in lib/analytics/google-analytics.ts
gtag('set', 'user_properties', {
  device_category: 'mobile' | 'desktop' | 'tablet'
});
```

---

## Organic Traffic Tracking

### 1. Default Source Tracking

GA4 automatically tracks traffic sources, including:
- **Organic Search**: Google, Bing, DuckDuckGo
- **Direct**: Direct URL entry
- **Referral**: Links from other websites
- **Social**: Facebook, Instagram, Twitter
- **Email**: Email campaigns

### 2. Verify Organic Traffic

1. Go to **Reports** > **Acquisition** > **Traffic acquisition**
2. View breakdown by:
   - Session default channel group
   - Session source/medium
   - Session campaign

### 3. Filter for Organic Search

1. In any report, click **Add filter**
2. Select **Session default channel group**
3. Choose **Organic Search**
4. Apply filter

### 4. Track Keyword Performance (Limited)

Note: Google no longer provides keyword data for organic search. However, you can:

1. Use **Google Search Console** (primary source for keyword data)
2. Link GSC to GA4:
   - Go to **Admin** > **Product links** > **Search Console**
   - Click **Link** and follow prompts
3. View keyword data in **Reports** > **Acquisition** > **Search Console**

---

## Key Metrics to Monitor

### 1. Organic Traffic Metrics

Track these metrics specifically for **organic search traffic**:

| Metric | Description | Target/Benchmark |
|--------|-------------|------------------|
| **Sessions** | Total organic sessions | Monitor weekly growth |
| **Users** | Unique organic visitors | Track month-over-month |
| **New Users** | First-time organic visitors | 60-80% of users |
| **Engaged Sessions** | Sessions >10s or 2+ pages | >60% |
| **Engagement Rate** | % of engaged sessions | >60% |
| **Bounce Rate** | % single-page sessions | <40% ideal |
| **Average Session Duration** | Time spent per session | >2 minutes ideal |
| **Pages per Session** | Pages viewed per session | >2.5 pages ideal |

### 2. E-commerce Metrics

| Metric | Description | Target/Benchmark |
|--------|-------------|------------------|
| **Organic Conversion Rate** | % of organic sessions that purchase | 2-3% good |
| **Add to Cart Rate** | % of sessions that add to cart | 10-15% |
| **Checkout Initiation Rate** | % of cart additions that checkout | 50-60% |
| **Purchase Completion Rate** | % of checkouts that complete | 70-80% |
| **Average Order Value** | Average purchase amount | Track trend |
| **Revenue per Session** | Revenue / Total sessions | Track trend |

### 3. Content Performance Metrics

| Metric | Description | What to Track |
|--------|-------------|---------------|
| **Top Landing Pages** | Pages users arrive on | Optimize top 10 |
| **Exit Pages** | Pages users leave from | Fix high-exit pages |
| **Product Page Views** | Individual product views | Identify popular products |
| **Time on Page** | Engagement per page | Improve low-time pages |

---

## Review Checklist

### Weekly Review (Every Monday)

Use this checklist to review performance weekly:

#### 1. Organic Traffic Trend
- [ ] Open **Reports** > **Acquisition** > **Traffic acquisition**
- [ ] Filter by **Organic Search**
- [ ] Compare to previous week:
  - [ ] Sessions increased/decreased by ____%
  - [ ] Users increased/decreased by ____%
  - [ ] Note any significant changes (+/- 20%)

#### 2. Top Performing Pages
- [ ] Go to **Reports** > **Engagement** > **Pages and screens**
- [ ] Filter by **Session default channel group** = **Organic Search**
- [ ] Identify top 10 landing pages:
  - [ ] Which products are getting most organic traffic?
  - [ ] Are blog posts driving traffic?
  - [ ] Note any new pages in top 10

#### 3. Identify Drop-offs and Issues
- [ ] Check **Bounce Rate** by landing page
  - [ ] Any pages >60% bounce rate? → Investigate and fix
- [ ] Check **Exit Rate** by page
  - [ ] Any unexpected high-exit pages? → Improve content
- [ ] Review **Events** > **Conversions**
  - [ ] Any broken conversion tracking? → Fix immediately

#### 4. Quick Actions
- [ ] Screenshot key metrics for weekly report
- [ ] Note top 3 insights
- [ ] Create action items for improvements

---

### Monthly Review (First Monday of Month)

#### 1. Month-over-Month Growth Analysis
- [ ] Open **Reports** > **Acquisition** > **Traffic acquisition**
- [ ] Change date range to **Last month**
- [ ] Compare to previous month:
  ```
  Organic Sessions: [Current Month] vs [Previous Month] = ____% change
  Organic Users: [Current Month] vs [Previous Month] = ____% change
  Organic Conversion Rate: [Current Month] vs [Previous Month] = ____% change
  ```

#### 2. Traffic Source Analysis
- [ ] Go to **Reports** > **Acquisition** > **Traffic acquisition**
- [ ] View breakdown by all channels:
  - [ ] Organic Search: ____%
  - [ ] Direct: ____%
  - [ ] Referral: ____%
  - [ ] Social: ____%
  - [ ] Email: ____%
- [ ] Are we too dependent on one channel?
- [ ] Which channels need more focus?

#### 3. Conversion Funnel Analysis
- [ ] Go to **Explore** > **Create new exploration** > **Funnel exploration**
- [ ] Set up e-commerce funnel:
  1. Page view (any product)
  2. add_to_cart
  3. begin_checkout
  4. purchase
- [ ] Identify drop-off points:
  - [ ] Product view → Add to cart: ____% (target >10%)
  - [ ] Add to cart → Begin checkout: ____% (target >50%)
  - [ ] Begin checkout → Purchase: ____% (target >70%)
- [ ] Where is biggest drop-off? → Prioritize improvement

#### 4. Content Gap Analysis
- [ ] Go to **Reports** > **Engagement** > **Pages and screens**
- [ ] Sort by **Bounce rate** (highest first)
- [ ] Identify pages with:
  - [ ] High traffic + High bounce = Poor content quality
  - [ ] Low traffic + Low bounce = Hidden gem (promote more)
  - [ ] High exit rate = Need better CTAs
- [ ] Create content improvement plan for worst 5 pages

#### 5. SEO Landing Page Performance
- [ ] Go to **Reports** > **Acquisition** > **Search Console**
- [ ] Review:
  - [ ] Top queries driving traffic
  - [ ] Average position for key terms
  - [ ] Click-through rate by page
- [ ] Identify opportunities:
  - [ ] Pages ranking 5-15 (easy wins)
  - [ ] Low CTR pages (improve titles/descriptions)

#### 6. Product Performance
- [ ] Go to **Reports** > **Monetization** > **Ecommerce purchases**
- [ ] Identify:
  - [ ] Top selling products
  - [ ] Products with high views but low conversions
  - [ ] Products with 0 organic sales
- [ ] Actions:
  - [ ] Optimize low-conversion product pages
  - [ ] Create content for 0-sale products

#### 7. Mobile vs Desktop Performance
- [ ] Add **Device category** as secondary dimension
- [ ] Compare:
  - [ ] Mobile conversion rate vs Desktop
  - [ ] Mobile bounce rate vs Desktop
  - [ ] Mobile session duration vs Desktop
- [ ] If mobile underperforms → Prioritize mobile UX

#### 8. Monthly Action Plan
- [ ] List top 5 insights from this month
- [ ] Create 3-5 action items for next month
- [ ] Set specific goals for next month:
  - [ ] Organic traffic goal: _____ sessions
  - [ ] Conversion rate goal: _____%
  - [ ] New content pieces: _____

---

## Setting Up Reports in GA4

### 1. Create Custom Report for SEO Performance

1. Go to **Explore** > **Create new exploration**
2. Choose **Free form**
3. Configure:
   - **Dimensions**: Add `Session default channel group`, `Landing page`, `Device category`
   - **Metrics**: Add `Sessions`, `Engaged sessions`, `Engagement rate`, `Conversions`, `Total revenue`
   - **Filters**: Session default channel group = Organic Search
4. Save as: **"SEO Performance Dashboard"**

### 2. Create E-commerce Funnel Report

1. Go to **Explore** > **Create new exploration**
2. Choose **Funnel exploration**
3. Add steps:
   - Step 1: `page_view` (Product pages)
   - Step 2: `add_to_cart`
   - Step 3: `begin_checkout`
   - Step 4: `purchase`
4. Save as: **"E-commerce Conversion Funnel"**

### 3. Set Up Alerts

1. Go to **Admin** > **Custom insights**
2. Create alerts for:
   - Organic traffic drops >20% week-over-week
   - Conversion rate drops >15% week-over-week
   - Site errors spike

---

## Troubleshooting

### Analytics Not Tracking

1. **Check Measurement ID**: Verify it's correct in `.env`
2. **Check Browser Console**: Look for GA4 errors
3. **Use GA4 DebugView**:
   - Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   - Go to **Admin** > **DebugView**
   - Navigate your site and verify events appear

### Events Not Showing

1. **Wait 24-48 hours**: GA4 can take time to process
2. **Check DebugView**: Real-time event verification
3. **Verify Event Names**: Must match GA4 recommended events exactly
4. **Check Parameters**: Ensure all required parameters are included

### E-commerce Data Not Appearing

1. **Verify E-commerce is enabled**: Admin > Ecommerce Settings
2. **Check event parameters**: Must include `currency`, `value`, `items`
3. **Use correct event names**: `add_to_cart`, `begin_checkout`, `purchase`

---

## Additional Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [E-commerce Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)
- [Google Search Console Integration](https://support.google.com/analytics/answer/9308681)

---

## Next Steps

1. [ ] Create GA4 property
2. [ ] Add Measurement ID to environment variables
3. [ ] Implement tracking code in `app/layout.tsx`
4. [ ] Create `lib/analytics/google-analytics.ts` helper file
5. [ ] Add tracking to cart functionality
6. [ ] Add tracking to checkout flow
7. [ ] Add tracking to newsletter signup
8. [ ] Test in development using DebugView
9. [ ] Deploy to production
10. [ ] Wait 24-48 hours for initial data
11. [ ] Set up custom reports
12. [ ] Link Google Search Console
13. [ ] Schedule weekly and monthly reviews

---

**Last Updated**: December 12, 2025
**Maintained by**: PUXX Ireland Development Team
