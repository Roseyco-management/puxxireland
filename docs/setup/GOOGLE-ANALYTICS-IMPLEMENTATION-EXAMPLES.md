# Google Analytics 4 Implementation Examples

This document provides code examples for implementing GA4 tracking in the PUXX Ireland website.

## Table of Contents
1. [Root Layout Setup](#root-layout-setup)
2. [Product Page Tracking](#product-page-tracking)
3. [Add to Cart Tracking](#add-to-cart-tracking)
4. [Checkout Flow Tracking](#checkout-flow-tracking)
5. [Purchase Confirmation Tracking](#purchase-confirmation-tracking)
6. [Newsletter Signup Tracking](#newsletter-signup-tracking)

---

## Root Layout Setup

Update `/Users/baileybarry/PuxxIreland/app/layout.tsx` to include Google Analytics:

```tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import { ToastProvider } from '@/lib/utils/toast';
import Script from 'next/script';

export const metadata: Metadata = {
  // ... existing metadata
};

export const viewport: Viewport = {
  maximumScale: 1
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
    >
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

---

## Product Page Tracking

Create a client component to track product views in `/Users/baileybarry/PuxxIreland/components/analytics/TrackProductView.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { trackViewItem } from '@/lib/analytics/google-analytics';

interface TrackProductViewProps {
  product: {
    id: number;
    name: string;
    price: string;
    category?: string;
    variant?: string;
  };
}

export function TrackProductView({ product }: TrackProductViewProps) {
  useEffect(() => {
    // Track product view when component mounts
    trackViewItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: 'Nicotine Pouches',
      variant: product.variant,
    });
  }, [product.id, product.name, product.price, product.variant]);

  // This component doesn't render anything
  return null;
}
```

Then use it in `/Users/baileybarry/PuxxIreland/app/products/[slug]/page.tsx`:

```tsx
import { TrackProductView } from '@/components/analytics/TrackProductView';

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Track product view */}
      <TrackProductView
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          variant: product.nicotineStrength,
        }}
      />

      {/* Rest of the page */}
      <div className="min-h-screen bg-white">
        {/* ... existing content ... */}
      </div>
    </>
  );
}
```

---

## Add to Cart Tracking

Update the `AddToCart` component at `/Users/baileybarry/PuxxIreland/components/products/AddToCart.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { trackAddToCart } from '@/lib/analytics/google-analytics';
import { CartProduct } from '@/lib/store/cart-types';

interface AddToCartProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    stockQuantity: number;
    imageUrl: string | null;
    nicotineStrength: string | null;
    flavor: string | null;
  };
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);

      const cartProduct: CartProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stockQuantity: product.stockQuantity,
        imageUrl: product.imageUrl,
        nicotineStrength: product.nicotineStrength,
        flavor: product.flavor,
      };

      // Add to cart
      addItem(cartProduct, quantity);

      // Track in Google Analytics
      trackAddToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: 'Nicotine Pouches',
          variant: product.nicotineStrength || undefined,
        },
        quantity
      );

      // Success feedback (toast notification)
      // ... your existing success feedback

    } catch (error) {
      console.error('Error adding to cart:', error);
      // ... your existing error handling
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            type="button"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <button
            type="button"
            onClick={incrementQuantity}
            disabled={quantity >= product.stockQuantity}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.stockQuantity} in stock
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

---

## Checkout Flow Tracking

Update `/Users/baileybarry/PuxxIreland/app/checkout/page.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { trackBeginCheckout, trackCheckoutProgress } from '@/lib/analytics/google-analytics';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const [currentStep, setCurrentStep] = useState(1);

  // Track begin_checkout when page loads
  useEffect(() => {
    if (items.length > 0) {
      const cartItems = items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: 'Nicotine Pouches',
        variant: item.product.nicotineStrength || undefined,
      }));

      trackBeginCheckout(cartItems, getTotal());
    }
  }, []); // Only run on mount

  // Track checkout progress when step changes
  useEffect(() => {
    const stepNames = [
      'Cart Review',
      'Customer Info',
      'Shipping Address',
      'Shipping Method',
      'Payment',
      'Confirmation',
    ];

    if (currentStep > 0 && currentStep <= stepNames.length) {
      trackCheckoutProgress(currentStep, stepNames[currentStep - 1]);
    }
  }, [currentStep]);

  return (
    <div>
      {/* Your existing checkout flow */}
    </div>
  );
}
```

For tracking shipping and payment info in the checkout steps:

```tsx
// In Step4ShippingMethod.tsx
import { trackAddShippingInfo } from '@/lib/analytics/google-analytics';

const handleShippingMethodSelect = (method: string, cost: number) => {
  setSelectedShippingMethod(method);

  // Track shipping info
  trackAddShippingInfo(method, cost);
};

// In Step5Payment.tsx
import { trackAddPaymentInfo } from '@/lib/analytics/google-analytics';

const handlePaymentMethodSelect = (method: string) => {
  setSelectedPaymentMethod(method);

  // Track payment info
  trackAddPaymentInfo(method);
};
```

---

## Purchase Confirmation Tracking

Update `/Users/baileybarry/PuxxIreland/components/checkout/Step6Confirmation.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { trackPurchase } from '@/lib/analytics/google-analytics';

interface ConfirmationProps {
  orderId: string;
  orderTotal: number;
  shippingCost: number;
  items: Array<{
    product: {
      id: number;
      name: string;
      price: string;
      nicotineStrength: string | null;
    };
    quantity: number;
  }>;
}

export function Step6Confirmation({
  orderId,
  orderTotal,
  shippingCost,
  items,
}: ConfirmationProps) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Track purchase in Google Analytics
    const purchaseItems = items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      category: 'Nicotine Pouches',
      variant: item.product.nicotineStrength || undefined,
    }));

    trackPurchase(
      orderId,
      purchaseItems,
      orderTotal,
      shippingCost,
      0, // Tax (Ireland VAT is included in price)
      undefined // Coupon code if applicable
    );

    // Clear cart after successful purchase
    clearCart();
  }, [orderId, orderTotal, shippingCost, items, clearCart]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600">
          Thank you for your order. We've sent a confirmation email to your inbox.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Order Number:</span>
          <span className="font-medium text-gray-900">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total:</span>
          <span className="font-medium text-gray-900">
            €{orderTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Additional confirmation details */}
    </div>
  );
}
```

---

## Newsletter Signup Tracking

Create a newsletter signup component with tracking at `/Users/baileybarry/PuxxIreland/components/newsletter/NewsletterSignup.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { trackNewsletterSignup } from '@/lib/analytics/google-analytics';

interface NewsletterSignupProps {
  location?: 'footer' | 'popup' | 'checkout' | 'other';
}

export function NewsletterSignup({ location = 'other' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      setIsSubmitting(true);

      // Call your newsletter API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Track newsletter signup in Google Analytics
        trackNewsletterSignup(location);

        setIsSuccess(true);
        setEmail('');

        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        Get exclusive offers and product updates delivered to your inbox.
      </p>

      {isSuccess ? (
        <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg">
          Successfully subscribed! Check your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}
```

Use in footer or other locations:

```tsx
// In app/components/footer/Footer.tsx
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Other footer sections */}

          <div>
            <NewsletterSignup location="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Additional Tracking Examples

### Track Remove from Cart

Update cart components to track removals:

```tsx
import { trackRemoveFromCart } from '@/lib/analytics/google-analytics';

const handleRemoveItem = (item: CartItem) => {
  // Remove from cart
  removeItem(item.product.id);

  // Track in Google Analytics
  trackRemoveFromCart(
    {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      category: 'Nicotine Pouches',
      variant: item.product.nicotineStrength || undefined,
    },
    item.quantity
  );
};
```

### Track Search

If you have a search feature:

```tsx
import { trackSearch } from '@/lib/analytics/google-analytics';

const handleSearch = (query: string) => {
  // Perform search
  performSearch(query);

  // Track search in Google Analytics
  trackSearch(query);
};
```

### Track Form Submissions

For contact forms:

```tsx
import { trackFormSubmit } from '@/lib/analytics/google-analytics';

const handleContactFormSubmit = async (data: FormData) => {
  try {
    // Submit form
    await submitContactForm(data);

    // Track in Google Analytics
    trackFormSubmit('Contact Form', 'contact-form-main');
  } catch (error) {
    console.error('Form submission error:', error);
  }
};
```

---

## Testing Your Implementation

### 1. Use GA4 DebugView

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Go to GA4 Admin > DebugView
3. Navigate your site with the debugger enabled
4. Verify events appear in real-time

### 2. Check Browser Console

Events are logged to the console in development mode. Check for:
- "Google Analytics is not available" warnings (means GA_MEASUREMENT_ID not set)
- Event tracking confirmations

### 3. Verify with Google Tag Assistant

1. Install [Tag Assistant](https://tagassistant.google.com/)
2. Visit your site
3. Verify GA4 tag is firing correctly
4. Check that events have correct parameters

---

## Common Issues and Solutions

### Events Not Showing in GA4

**Problem**: Events don't appear in GA4 reports
**Solutions**:
- Wait 24-48 hours for data to process
- Check DebugView for real-time verification
- Verify Measurement ID is correct
- Ensure events are being fired (check browser console)

### Multiple Page Views

**Problem**: Page views being tracked multiple times
**Solution**: Use `useEffect` with empty dependency array to track only once:

```tsx
useEffect(() => {
  trackPageView(window.location.pathname);
}, []); // Empty array = run once on mount
```

### Missing E-commerce Data

**Problem**: E-commerce events tracked but no data in reports
**Solutions**:
- Verify Ecommerce Settings are enabled in GA4
- Check that `currency` and `value` are included in events
- Ensure `items` array has required fields (item_id, item_name, price)

---

**Last Updated**: December 12, 2025
**Related Documentation**: [GOOGLE-ANALYTICS-SETUP.md](./GOOGLE-ANALYTICS-SETUP.md)
