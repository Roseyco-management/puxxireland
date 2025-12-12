# Google Analytics 4 Quick Reference - PUXX Ireland

Quick reference guide for GA4 tracking implementation and monitoring.

## Setup Checklist

```
[ ] Create GA4 property at analytics.google.com
[ ] Copy Measurement ID (G-XXXXXXXXXX)
[ ] Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env
[ ] Add GA script to app/layout.tsx
[ ] Create lib/analytics/google-analytics.ts
[ ] Test in DebugView
[ ] Deploy to production
[ ] Link Google Search Console
```

## Event Tracking Summary

| Event | When to Track | Function | Location |
|-------|--------------|----------|----------|
| **view_item** | Product page view | `trackViewItem()` | Product detail page |
| **add_to_cart** | Add item to cart | `trackAddToCart()` | Add to cart button |
| **remove_from_cart** | Remove from cart | `trackRemoveFromCart()` | Cart component |
| **view_cart** | Cart page view | `trackViewCart()` | Cart page |
| **begin_checkout** | Start checkout | `trackBeginCheckout()` | Checkout page mount |
| **add_shipping_info** | Select shipping | `trackAddShippingInfo()` | Shipping step |
| **add_payment_info** | Select payment | `trackAddPaymentInfo()` | Payment step |
| **purchase** | Complete order | `trackPurchase()` | Confirmation page |
| **newsletter_signup** | Subscribe | `trackNewsletterSignup()` | Newsletter form |

## Common Usage Examples

### Track Product View
```typescript
import { trackViewItem } from '@/lib/analytics/google-analytics';

trackViewItem({
  id: product.id,
  name: product.name,
  price: product.price,
  category: 'Nicotine Pouches',
  variant: product.nicotineStrength,
});
```

### Track Add to Cart
```typescript
import { trackAddToCart } from '@/lib/analytics/google-analytics';

trackAddToCart(
  {
    id: product.id,
    name: product.name,
    price: product.price,
    category: 'Nicotine Pouches',
    variant: product.nicotineStrength,
  },
  quantity
);
```

### Track Purchase
```typescript
import { trackPurchase } from '@/lib/analytics/google-analytics';

trackPurchase(
  orderId,
  items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    category: 'Nicotine Pouches',
    variant: item.product.nicotineStrength,
  })),
  orderTotal,
  shippingCost,
  0 // tax
);
```

### Track Newsletter Signup
```typescript
import { trackNewsletterSignup } from '@/lib/analytics/google-analytics';

trackNewsletterSignup('footer'); // or 'popup', 'checkout'
```

## GA4 Navigation Quick Links

| Task | Path in GA4 |
|------|-------------|
| **Real-time events** | Reports > Realtime > Overview |
| **Debug mode** | Admin > DebugView |
| **Traffic sources** | Reports > Acquisition > Traffic acquisition |
| **Organic traffic** | Reports > Acquisition > Traffic acquisition → Filter: Organic Search |
| **E-commerce** | Reports > Monetization > Ecommerce purchases |
| **Conversions** | Reports > Engagement > Conversions |
| **Landing pages** | Reports > Engagement > Pages and screens |
| **Create report** | Explore > Create new exploration |
| **Link GSC** | Admin > Product links > Search Console |
| **Custom dimensions** | Admin > Data display > Custom definitions |

## Key Metrics Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Organic Sessions/Week** | Growing | ___ | ⬜ |
| **Engagement Rate** | >60% | ___% | ⬜ |
| **Bounce Rate** | <40% | ___% | ⬜ |
| **Avg Session Duration** | >2 min | ___ | ⬜ |
| **Pages/Session** | >2.5 | ___ | ⬜ |
| **Add to Cart Rate** | >10% | ___% | ⬜ |
| **Conversion Rate** | >2% | ___% | ⬜ |

## Weekly Review Checklist

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
[ ] Note top 3 insights:
    1. _________________________________
    2. _________________________________
    3. _________________________________
[ ] Action items for next week:
    1. _________________________________
    2. _________________________________
    3. _________________________________
```

## Monthly Review Checklist

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
[ ] Email: ____%

CONVERSION FUNNEL
[ ] Product view → Add to cart: ____%
[ ] Add to cart → Checkout: ____%
[ ] Checkout → Purchase: ____%
[ ] Biggest drop-off point: ________________

CONTENT PERFORMANCE
[ ] Top 5 organic landing pages identified
[ ] Bottom 5 high-bounce pages identified
[ ] Content improvement plan created

SEO PERFORMANCE (via Search Console)
[ ] Top performing queries reviewed
[ ] Pages ranking 5-15 (opportunity) identified
[ ] Low CTR pages optimized

PRODUCT PERFORMANCE
[ ] Top 5 selling products: ________________
[ ] 0-sale products identified: ____________
[ ] Product page optimization plan created

DEVICE ANALYSIS
[ ] Mobile conversion rate: ____%
[ ] Desktop conversion rate: ____%
[ ] Mobile UX improvements needed: _________

MONTHLY GOALS FOR NEXT MONTH
[ ] Organic traffic target: _______ sessions
[ ] Conversion rate target: _______%
[ ] New content pieces: _______
[ ] Top 3 priorities:
    1. _________________________________
    2. _________________________________
    3. _________________________________
```

## Troubleshooting Quick Guide

| Issue | Quick Fix |
|-------|-----------|
| **No data showing** | Wait 24-48hrs, check DebugView, verify Measurement ID |
| **Events not tracking** | Check browser console, verify GA script loaded, check function calls |
| **Duplicate page views** | Use `useEffect(() => {...}, [])` with empty dependency array |
| **E-commerce data missing** | Enable in Admin > Ecommerce Settings, verify `currency`, `value`, `items` |
| **Organic traffic = 0** | Wait for indexing, check robots.txt, verify sitemap submitted |

## GA4 vs Universal Analytics

| Feature | GA4 | Universal Analytics |
|---------|-----|---------------------|
| **Measurement model** | Event-based | Session-based |
| **Cross-platform** | Yes (web + app) | No |
| **Machine learning** | Built-in | Limited |
| **Privacy** | Cookieless options | Cookie-based |
| **Future support** | Active | Sunset July 2023 |

## Important GA4 Limits

| Limit | Value |
|-------|-------|
| **Events per property** | 500 distinct events |
| **Event parameters** | 25 per event |
| **User properties** | 25 per property |
| **Custom dimensions** | 50 (event), 25 (user) |
| **Conversions** | 30 per property |
| **Data retention** | 2 months (free) / 14 months (360) |

## Custom Report Templates

### SEO Performance Report

**Dimensions**: Session default channel group, Landing page, Device category
**Metrics**: Sessions, Engaged sessions, Engagement rate, Conversions, Total revenue
**Filter**: Session default channel group = Organic Search

### E-commerce Funnel

**Steps**:
1. page_view (product pages)
2. add_to_cart
3. begin_checkout
4. purchase

**Segment**: All users or specific traffic source

### Top Landing Pages (Organic)

**Dimensions**: Landing page, Device category
**Metrics**: Sessions, Bounce rate, Conversions, Average engagement time
**Filter**: Session default channel group = Organic Search
**Sort by**: Sessions (descending)

## Useful GA4 Shortcuts

| Action | Shortcut |
|--------|----------|
| **Change date range** | Click date picker (top right) |
| **Add filter** | Click "+ Add filter" above chart |
| **Add comparison** | Click "Add comparison" |
| **Export data** | Share (top right) > Download as CSV/PDF |
| **Create report** | Explore > Blank exploration |
| **Real-time view** | Reports > Realtime |

## Integration Checklist

```
[ ] Google Search Console linked
[ ] Google Ads linked (if using)
[ ] BigQuery export configured (optional, for advanced)
[ ] Custom alerts set up
[ ] Weekly email reports configured
[ ] Team access granted
[ ] Goals/Conversions configured
[ ] E-commerce settings enabled
```

## Support Resources

- **GA4 Help Center**: https://support.google.com/analytics
- **GA4 Documentation**: https://developers.google.com/analytics/devguides/collection/ga4
- **YouTube Channel**: Google Analytics on YouTube
- **Community**: https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics

---

**Print this page for quick reference during weekly/monthly reviews!**

**Last Updated**: December 12, 2025
