# Meta (Facebook) Pixel & Conversions API Setup Guide

## What You Need

You have received:
1. **Meta CAPI Access Token** - For server-side conversion tracking
2. **Meta Pixel ID** - For client-side tracking (you'll need to get this)

## Step 1: Get Your Meta Pixel ID

1. Go to **Meta Events Manager**: https://business.facebook.com/events_manager2/
2. Click on your **Data Sources** or create a new **Pixel**
3. Copy your **Pixel ID** (format: numbers like `123456789012345`)

## Step 2: Add to Environment Variables

Create or update your `.env` file:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BYJVE1QD7M

# Meta (Facebook) Pixel & Conversions API
NEXT_PUBLIC_META_PIXEL_ID=YOUR_PIXEL_ID_HERE
META_CAPI_ACCESS_TOKEN=EAAL0gOJ6sxwBQFbaifVSiwXQmnOAEoOtFOVBZCam6CCu7LQcZBYJntVXpiV80jWZADpeZB5KkwvWZB5iItGZAckuZA3AdhyvPZAArq1NHttrEu2j8frMenRDAi67fwpYEfFfpCGKsBrZCrQDF9Cs8WgDLosTjqAZAjiVsDl8WWHs53evz6Cshnwu6yIPyspdVigZAZA5xQZDZD
```

⚠️ **IMPORTANT**: Never commit this `.env` file to git! It's already in `.gitignore`.

## Step 3: Restart Your Development Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
pnpm run dev
```

## Step 4: Verify Meta Pixel is Working

### Option 1: Meta Pixel Helper (Chrome Extension)
1. Install: https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc
2. Visit your site
3. Click the extension icon - you should see your Pixel ID and "PageView" event

### Option 2: Meta Events Manager
1. Go to **Events Manager** > **Test Events**
2. Browse your website
3. You should see events appearing in real-time

## What Gets Tracked

### Automatic Events
- ✅ **PageView** - Every page load (automatic)

### E-commerce Events (Already Integrated)
- ✅ **ViewContent** - Product page views
- ✅ **AddToCart** - When user adds product to cart
- ✅ **InitiateCheckout** - When user starts checkout
- ✅ **Purchase** - When order is completed (needs integration)

### How to Use in Your Components

```tsx
import { trackMetaAddToCart, trackMetaViewContent } from '@/lib/analytics/meta-pixel'

// Track product view
trackMetaViewContent({
  content_name: product.name,
  content_ids: [product.id],
  content_type: 'product',
  value: product.priceEur,
  currency: 'EUR'
})

// Track add to cart
trackMetaAddToCart({
  content_name: product.name,
  content_ids: [product.id],
  content_type: 'product',
  value: product.priceEur * quantity,
  currency: 'EUR'
})
```

## Already Integrated Components

The Meta Pixel tracking is already added to:

1. **Root Layout** (`app/layout.tsx`) - Automatic PageView tracking
2. **Helper Functions** (`lib/analytics/meta-pixel.ts`) - Ready to use

## Next Steps: Add Conversion Tracking

### 1. Product Page - Track ViewContent

Update `/app/products/[slug]/page.tsx`:

```tsx
import { trackMetaViewContent } from '@/lib/analytics/meta-pixel'

// Add after product loads
useEffect(() => {
  if (product) {
    trackMetaViewContent({
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.priceEur,
      currency: 'EUR'
    })
  }
}, [product])
```

### 2. Add to Cart - Track AddToCart

Update `/components/products/AddToCart.tsx`:

```tsx
import { trackMetaAddToCart } from '@/lib/analytics/meta-pixel'

// Inside handleAddToCart function
trackMetaAddToCart({
  content_name: product.name,
  content_ids: [product.id],
  content_type: 'product',
  value: product.priceEur * quantity,
  currency: 'EUR'
})
```

### 3. Checkout Page - Track InitiateCheckout

Update `/app/checkout/page.tsx`:

```tsx
import { trackMetaInitiateCheckout } from '@/lib/analytics/meta-pixel'

// When checkout loads
trackMetaInitiateCheckout({
  content_ids: cartItems.map(item => item.productId),
  contents: cartItems.map(item => ({
    id: item.productId,
    quantity: item.quantity
  })),
  value: totalValue,
  currency: 'EUR',
  num_items: cartItems.length
})
```

### 4. Purchase - Track Purchase (After Payment Success)

```tsx
import { trackMetaPurchase } from '@/lib/analytics/meta-pixel'

// After successful payment
trackMetaPurchase({
  content_ids: orderItems.map(item => item.productId),
  contents: orderItems.map(item => ({
    id: item.productId,
    quantity: item.quantity
  })),
  value: orderTotal,
  currency: 'EUR',
  num_items: orderItems.length
})
```

## Meta Conversions API (Server-Side)

The `META_CAPI_ACCESS_TOKEN` you have is for server-side conversion tracking. This requires additional implementation:

### Benefits of Conversions API:
- More accurate tracking (bypasses ad blockers)
- Better attribution for iOS 14.5+ users
- Duplicate event removal when combined with Pixel

### Implementation (Optional - Advanced)

Create `/app/api/meta-capi/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [body.event],
        access_token: process.env.META_CAPI_ACCESS_TOKEN,
      }),
    }
  )

  return NextResponse.json(await response.json())
}
```

## Troubleshooting

### Pixel Not Loading
- Check `.env` file has `NEXT_PUBLIC_META_PIXEL_ID` set
- Restart dev server after adding environment variables
- Check browser console for errors

### Events Not Showing in Events Manager
- Make sure Pixel Helper shows the Pixel is active
- Check that you're looking at "Test Events" not "Live Events"
- Clear browser cache and cookies

### Ad Blockers
- Ad blockers may prevent Meta Pixel from loading
- Test in incognito/private mode
- Consider implementing Conversions API for more reliable tracking

## Security Notes

1. ✅ **NEXT_PUBLIC_META_PIXEL_ID** - Safe to expose (public)
2. ⚠️ **META_CAPI_ACCESS_TOKEN** - NEVER expose client-side (stays in `.env`)
3. 🔒 Always use `.env` file, never hardcode tokens

## Facebook Ads Integration

Once Meta Pixel is tracking conversions, you can:

1. **Create Custom Audiences** based on:
   - Site visitors
   - Product viewers
   - Cart abandoners
   - Purchasers

2. **Set Up Conversion Campaigns** optimizing for:
   - Add to Cart
   - Initiate Checkout
   - Purchase

3. **Track ROAS** (Return on Ad Spend) directly in Ads Manager

## Support

- **Meta Events Manager**: https://business.facebook.com/events_manager2/
- **Meta Pixel Documentation**: https://developers.facebook.com/docs/meta-pixel
- **Conversions API Docs**: https://developers.facebook.com/docs/marketing-api/conversions-api

---

**Setup Complete!** Your Meta Pixel is now ready to track conversions and build audiences for Facebook & Instagram ads.
