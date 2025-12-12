# Google Analytics 4 - Complete Implementation Guide

**PUXX Ireland E-commerce Analytics Tracking**

This comprehensive guide documents the complete Google Analytics 4 implementation for PUXX Ireland, including setup instructions, tracking implementation, and monitoring guidelines aligned with the SEO plan (lines 1053-1082).

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Environment Setup](#environment-setup)
4. [Implementation Details](#implementation-details)
5. [Events Tracked](#events-tracked)
6. [SEO Metrics Monitoring](#seo-metrics-monitoring)
7. [Testing & Verification](#testing--verification)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Configuration](#advanced-configuration)

---

## Overview

### What's Implemented

The PUXX Ireland website now has complete GA4 tracking for:

- **Page Views**: Automatic tracking on all pages
- **E-commerce Events**: Product views, add to cart, checkout, purchase
- **Conversion Tracking**: All critical conversion events configured
- **SEO Metrics**: Organic traffic, landing pages, user behavior
- **Custom Events**: Newsletter signups, form submissions

### Architecture

```
app/layout.tsx
└── GoogleAnalytics component (loads GA4 script)

lib/analytics/google-analytics.ts
└── Helper functions for all tracking events

Components with Tracking:
├── components/analytics/TrackProductView.tsx (product page views)
├── components/products/AddToCart.tsx (add to cart events)
└── app/checkout/page.tsx (begin checkout, checkout progress)
```

---

## Quick Start

### 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 Property (or use existing)
   - **Property name**: PUXX Ireland Website
   - **Time zone**: (GMT+00:00) Dublin, Edinburgh, Lisbon, London
   - **Currency**: Euro (EUR)
3. Create a Data Stream for your website:
   - **Platform**: Web
   - **Website URL**: https://puxxnicotine.ie
   - **Stream name**: PUXX Ireland Production
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variable

Add to your `.env` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID from step 1.

### 3. Deploy and Test

```bash
# Build and run locally to test
npm run build
npm start

# Or deploy to production
git add .
git commit -m "Add Google Analytics 4 tracking"
git push
```

### 4. Verify Tracking

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Go to GA4 **Admin** > **DebugView**
3. Browse your site with debugger enabled
4. Watch events appear in real-time in DebugView

---

## Environment Setup

### Environment Variables

The implementation requires one environment variable:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Your GA4 Measurement ID | `G-ABC123XYZ` |

### .env File Setup

Your `.env` file should include:

```bash
# Google Analytics 4 (Week 5 - SEO & Analytics)
# Get this from GA4 Dashboard -> Admin -> Data Streams -> Your Stream -> Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Multiple Environments

For different environments, you can use separate GA4 properties:

```bash
# Development
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEV1234567

# Staging
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-STG1234567

# Production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PRD1234567
```

**Tip**: Create separate GA4 properties for dev/staging/production to avoid mixing test data with production analytics.

---

## Implementation Details

### 1. GoogleAnalytics Component

**File**: `/components/analytics/GoogleAnalytics.tsx`

This client component loads the GA4 tracking script and is included in the root layout.

```tsx
'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics Measurement ID is not set.');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
```

**Included in**: `/app/layout.tsx`

```tsx
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en-IE">
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Analytics Helper Library

**File**: `/lib/analytics/google-analytics.ts`

Provides type-safe helper functions for all GA4 events. Key functions:

- `trackViewItem(product)` - Track product page views
- `trackAddToCart(product, quantity)` - Track add to cart
- `trackRemoveFromCart(product, quantity)` - Track cart removals
- `trackBeginCheckout(items, total)` - Track checkout start
- `trackCheckoutProgress(step, stepName)` - Track checkout steps
- `trackPurchase(orderId, items, total, shipping, tax)` - Track purchases
- `trackNewsletterSignup(method)` - Track newsletter signups

**Example usage**:

```tsx
import { trackAddToCart } from '@/lib/analytics/google-analytics';

trackAddToCart({
  id: product.id,
  name: product.name,
  price: product.price,
  category: 'Nicotine Pouches',
  variant: product.nicotineStrength,
}, quantity);
```

### 3. Product View Tracking

**File**: `/components/analytics/TrackProductView.tsx`

Client component that tracks product page views automatically.

**Used in**: `/app/products/[slug]/page.tsx`

```tsx
import { TrackProductView } from '@/components/analytics/TrackProductView';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  return (
    <>
      <TrackProductView
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          category: 'Nicotine Pouches',
          variant: product.nicotineStrength,
        }}
      />
      {/* Rest of page */}
    </>
  );
}
```

### 4. Add to Cart Tracking

**File**: `/components/products/AddToCart.tsx`

Tracks when users add products to cart.

```tsx
import { trackAddToCart } from '@/lib/analytics/google-analytics';

const handleAddToCart = async () => {
  // Add to cart
  addItem(cartProduct, quantity);

  // Track in GA4
  trackAddToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: 'Nicotine Pouches',
    variant: product.nicotineStrength || undefined,
  }, quantity);

  // Show success message
  showToast('Added to cart!');
};
```

### 5. Checkout Tracking

**File**: `/app/checkout/page.tsx`

Tracks checkout initiation and progress through checkout steps.

```tsx
import { trackBeginCheckout, trackCheckoutProgress } from '@/lib/analytics/google-analytics';

// Track begin_checkout when page loads
useEffect(() => {
  if (items.length > 0) {
    const cartItems = items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      category: 'Nicotine Pouches',
      variant: item.product.nicotineStrength,
    }));

    trackBeginCheckout(cartItems, getTotal());
  }
}, []);

// Track checkout progress
useEffect(() => {
  trackCheckoutProgress(currentStep, stepNames[currentStep - 1]);
}, [currentStep]);
```

---

## Events Tracked

### Core E-commerce Events

| Event Name | When Triggered | Data Captured | Priority |
|------------|----------------|---------------|----------|
| **page_view** | All page loads | Page path, title | High |
| **view_item** | Product page view | Product details, price | High |
| **add_to_cart** | Add product to cart | Product, quantity, value | Critical |
| **remove_from_cart** | Remove from cart | Product, quantity | Medium |
| **view_cart** | Cart page view | All cart items, total | Medium |
| **begin_checkout** | Start checkout | All items, cart total | Critical |
| **checkout_progress** | Each checkout step | Step number, step name | High |
| **add_shipping_info** | Select shipping | Shipping method, cost | Medium |
| **add_payment_info** | Select payment | Payment method | Medium |
| **purchase** | Order completed | Transaction ID, items, revenue | Critical |

### Additional Events

| Event Name | When Triggered | Data Captured |
|------------|----------------|---------------|
| **newsletter_signup** | Newsletter subscription | Source location |
| **search** | Site search | Search query |
| **form_submit** | Form submission | Form name, form ID |

### Event Parameters

All e-commerce events include:

```javascript
{
  currency: 'EUR',           // Always EUR for Ireland
  value: 5.99,               // Transaction/item value
  items: [                   // Product items array
    {
      item_id: '1',          // Product ID
      item_name: 'PUXX Blue Ice',
      item_category: 'Nicotine Pouches',
      item_variant: '14mg',  // Nicotine strength
      price: 5.99,
      quantity: 1
    }
  ]
}
```

---

## SEO Metrics Monitoring

### Key SEO Metrics to Track (SEO Plan Lines 1053-1082)

#### 1. Organic Traffic Metrics

Track these in **Reports > Acquisition > Traffic acquisition** (filter by Organic Search):

| Metric | Description | Target |
|--------|-------------|--------|
| **Organic Sessions** | Total sessions from search | Monitor weekly growth |
| **Organic Users** | Unique visitors from search | Track month-over-month |
| **New Users** | First-time organic visitors | 60-80% of total |
| **Engagement Rate** | % of engaged sessions | >60% |
| **Average Session Duration** | Time per organic session | >2 minutes |
| **Pages per Session** | Pages viewed per session | >2.5 pages |

#### 2. Conversion Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| **Organic Conversion Rate** | % of organic sessions that purchase | 2-3% |
| **Add to Cart Rate** | % adding products to cart | 10-15% |
| **Checkout Initiation** | % of carts that start checkout | 50-60% |
| **Purchase Completion** | % of checkouts that complete | 70-80% |

#### 3. Content Performance

Monitor in **Reports > Engagement > Pages and screens**:

- Top organic landing pages
- Pages with high bounce rates (>60%)
- High-exit pages
- Average engagement time per page

### Custom Reports for SEO

#### SEO Performance Dashboard

1. Go to **Explore > Create new exploration**
2. Choose **Free form**
3. Configure:
   - **Dimensions**: Session default channel group, Landing page, Device category
   - **Metrics**: Sessions, Engaged sessions, Engagement rate, Conversions, Total revenue
   - **Filters**: Session default channel group = Organic Search
4. Save as: **"SEO Performance Dashboard"**

#### E-commerce Funnel Report

1. Go to **Explore > Create new exploration**
2. Choose **Funnel exploration**
3. Add steps:
   - Step 1: `view_item` (Product pages)
   - Step 2: `add_to_cart`
   - Step 3: `begin_checkout`
   - Step 4: `purchase`
4. Save as: **"E-commerce Conversion Funnel"**

### Link Google Search Console

Connect GSC to GA4 for keyword data:

1. Go to **Admin > Product links > Search Console**
2. Click **Link**
3. Select your Search Console property
4. Complete the linking process
5. View data in **Reports > Acquisition > Search Console**

---

## Testing & Verification

### 1. Using GA4 DebugView

**Best for**: Real-time event verification during development

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Enable the extension
3. Go to **GA4 Admin > DebugView**
4. Browse your site
5. Watch events appear in real-time

**What to verify**:
- Events fire correctly
- Parameters are included
- Values are accurate

### 2. Using Realtime Reports

**Best for**: Quick production verification

1. Go to **Reports > Realtime > Overview**
2. Browse your site in another tab
3. Watch for:
   - Page views appearing
   - Events being tracked
   - User count incrementing

### 3. Browser Console Verification

In development, the analytics library logs warnings:

```
Google Analytics is not available  // If GA_MEASUREMENT_ID not set
```

Check browser console for errors or warnings.

### 4. Test Checklist

Before going live, verify:

```
[ ] Measurement ID is set in .env
[ ] Page views tracking on all pages
[ ] Product view tracking on product pages
[ ] Add to cart tracking works
[ ] Remove from cart tracking works
[ ] Begin checkout tracking on checkout page
[ ] Checkout progress tracking on step changes
[ ] Events appear in DebugView
[ ] No console errors related to GA
[ ] Data appears in Realtime reports
```

---

## Troubleshooting

### Problem: No data showing in GA4

**Possible causes**:

1. **Measurement ID not set**
   - Check `.env` file has `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Restart dev server after adding env variable

2. **Wrong Measurement ID**
   - Verify ID matches your GA4 property
   - Format should be `G-XXXXXXXXXX`

3. **Data processing delay**
   - Wait 24-48 hours for data to appear in standard reports
   - Use DebugView or Realtime for immediate verification

4. **Ad blockers**
   - Disable ad blockers when testing
   - Consider server-side tracking for production (advanced)

### Problem: Events not tracking

**Possible causes**:

1. **JavaScript errors**
   - Check browser console for errors
   - Verify GA script loaded successfully

2. **Function not called**
   - Add console.log before tracking call
   - Verify component renders and event fires

3. **Incorrect parameters**
   - Check event parameters match expected format
   - Verify required fields are included

### Problem: Duplicate events

**Possible causes**:

1. **React strict mode**
   - Normal in development (components mount twice)
   - Won't happen in production

2. **Missing useEffect dependencies**
   - Use empty array `[]` to track only on mount
   - Add proper dependencies to avoid re-tracking

**Solution**:
```tsx
useEffect(() => {
  trackViewItem(product);
}, []); // Empty array = run once on mount
```

### Problem: Events show in DebugView but not in reports

**This is normal**:
- DebugView is real-time
- Standard reports have 24-48 hour delay
- Use Realtime reports for faster verification (4-hour delay)

---

## Advanced Configuration

### Custom Dimensions

Create custom dimensions for advanced segmentation:

1. Go to **Admin > Data display > Custom definitions**
2. Click **Create custom dimension**
3. Examples:

| Dimension Name | Scope | Parameter Name | Description |
|----------------|-------|----------------|-------------|
| Traffic Source Type | Event | `traffic_source_type` | Organic vs Paid |
| Landing Page Path | Event | `landing_page` | First page visited |
| Device Category | User | `device_category` | Mobile/Desktop/Tablet |
| Product Category | Event | `item_category` | Product type |

### Enhanced E-commerce Settings

Enable in GA4:

1. Go to **Admin > Data display > Ecommerce Settings**
2. Toggle **Enable ecommerce data collection** to ON

This enables:
- Purchase revenue tracking
- Product performance reports
- Shopping behavior analysis

### Conversions Configuration

Mark key events as conversions:

1. Go to **Admin > Events**
2. Toggle **Mark as conversion** for:
   - `purchase` (already a conversion by default)
   - `begin_checkout`
   - `add_to_cart`
   - `newsletter_signup`

### Google Ads Integration

If running Google Ads:

1. Go to **Admin > Product links > Google Ads**
2. Link your Google Ads account
3. Import GA4 conversions to Google Ads
4. Use for campaign optimization

### BigQuery Export (Advanced)

For advanced analysis:

1. Go to **Admin > Product links > BigQuery**
2. Link to Google Cloud project
3. Enable daily export
4. Query raw event data in BigQuery

---

## Weekly Monitoring Checklist

Use this checklist every Monday:

```
WEEK OF: ___________

[ ] Open GA4 > Acquisition > Traffic acquisition
[ ] Filter by "Organic Search"
[ ] Record metrics:
    Sessions this week: _______
    Sessions last week: _______
    Change: _______%

[ ] Check top 5 landing pages
[ ] Identify pages with >60% bounce rate
[ ] Review conversion funnel drop-offs
[ ] Screenshot key data

[ ] Top 3 insights:
    1. _________________________________
    2. _________________________________
    3. _________________________________

[ ] Action items for next week:
    1. _________________________________
    2. _________________________________
    3. _________________________________
```

---

## Monthly Monitoring Checklist

Use this checklist on the first Monday of each month:

```
MONTH: ___________

GROWTH ANALYSIS
[ ] Organic sessions: This month vs last = _____%
[ ] Organic users: This month vs last = _____%
[ ] Conversion rate: This month vs last = _____%

TRAFFIC SOURCES
[ ] Organic: ____%
[ ] Direct: ____%
[ ] Referral: ____%
[ ] Social: ____%

CONVERSION FUNNEL
[ ] Product view → Add to cart: ____%
[ ] Add to cart → Checkout: ____%
[ ] Checkout → Purchase: ____%
[ ] Biggest drop-off: ________________

CONTENT PERFORMANCE
[ ] Top 5 organic landing pages identified
[ ] High-bounce pages identified and documented
[ ] Content improvement plan created

SEO PERFORMANCE
[ ] Top queries reviewed (via Search Console)
[ ] Pages ranking 5-15 identified (opportunity)
[ ] Low CTR pages optimized

MONTHLY GOALS FOR NEXT MONTH
[ ] Organic traffic target: _______ sessions
[ ] Conversion rate target: _______%
[ ] New content pieces: _______
```

---

## Resources

### Documentation
- [GA4 Official Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [E-commerce Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)

### Tools
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [Tag Assistant](https://tagassistant.google.com/)
- [Google Search Console](https://search.google.com/search-console)

### Support
- [GA4 Help Center](https://support.google.com/analytics)
- [GA4 Community](https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics)
- [YouTube: Google Analytics](https://www.youtube.com/user/googleanalytics)

---

## Summary

### What's Been Implemented

1. **GoogleAnalytics Component**: Loads GA4 script in root layout
2. **Analytics Helper Library**: Type-safe tracking functions
3. **Product View Tracking**: Automatic tracking on product pages
4. **Add to Cart Tracking**: Tracks cart additions
5. **Checkout Tracking**: Tracks checkout start and progress
6. **Environment Configuration**: Simple .env setup

### What's Next

1. **Add Purchase Tracking**: Implement in confirmation component
2. **Add Newsletter Tracking**: Implement in newsletter signup forms
3. **Set Up Custom Reports**: Create SEO and funnel reports in GA4
4. **Link Search Console**: Connect for keyword data
5. **Configure Conversions**: Mark key events as conversions
6. **Monitor & Optimize**: Weekly and monthly reviews

### Key Metrics to Monitor (Per SEO Plan)

- Organic traffic growth
- Conversion rate
- Add to cart rate
- Checkout completion rate
- Top landing pages
- Bounce rate per page
- Pages per session

---

**Document Version**: 1.0
**Last Updated**: December 12, 2025
**Maintained By**: PUXX Ireland Development Team

**Related Documentation**:
- [GOOGLE-ANALYTICS-SETUP.md](./GOOGLE-ANALYTICS-SETUP.md) - Detailed GA4 setup guide
- [GOOGLE-ANALYTICS-QUICK-REFERENCE.md](./GOOGLE-ANALYTICS-QUICK-REFERENCE.md) - Quick reference
- [GOOGLE-ANALYTICS-IMPLEMENTATION-EXAMPLES.md](./GOOGLE-ANALYTICS-IMPLEMENTATION-EXAMPLES.md) - Code examples
- [SEO Implementation Plan](/docs/seo/) - Full SEO strategy
