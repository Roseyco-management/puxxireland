# CartDrawer Integration Guide

## Overview
The CartDrawer is a beautiful slide-out component for PUXX Ireland that displays the shopping cart with smooth animations, Irish green theme, and a premium user experience.

## Features
- Slide-out drawer from the right side using shadcn Sheet component
- Shows cart items with product image, name, strength, and quantity controls
- Free shipping progress bar (Free over €150, otherwise €5.99)
- Subtotal and total calculations
- "View Full Cart" and "Checkout" buttons
- Empty cart state with call-to-action
- Irish green gradient theme
- Fully mobile responsive
- Smooth animations and transitions

## Installation

### Files Created
1. `/components/ui/sheet.tsx` - Sheet component based on Radix UI Dialog
2. `/components/cart/CartDrawer.tsx` - Main cart drawer component
3. `/components/cart/CartButton.tsx` - Cart button with badge to trigger drawer
4. `/components/cart/index.ts` - Barrel export file

## Usage

### 1. Replace Mock Cart Store
The CartDrawer currently uses a temporary mock store. Replace it with the actual cart store:

```tsx
// In CartDrawer.tsx, replace the mock useCartStore with:
import { useCartStore } from '@/lib/store/cart-store';
```

Remove the mock implementation:
```tsx
// DELETE THIS SECTION:
const useCartStore = (): CartStore => {
  // ... mock implementation
};
```

### 2. Add CartDrawer to Your Layout
Add the CartDrawer component to your root layout so it's available globally:

```tsx
// app/layout.tsx
import { CartDrawer } from '@/components/cart';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
```

### 3. Add Cart Button to Header
Use the CartButton component in your header to trigger the drawer:

```tsx
// components/layout/Header.tsx
import { CartButton } from '@/components/cart';

export function Header() {
  return (
    <header>
      {/* ... other header content ... */}
      <CartButton />
    </header>
  );
}
```

### 4. Add to Cart from Product Pages
Use the cart store to add items:

```tsx
'use client';

import { useCart } from '@/components/cart';

export function ProductPage({ product }) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: Date.now(), // Or generate unique ID
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      strength: product.nicotineStrength,
      quantity: 1,
    });

    // Optionally open cart after adding
    openCart();
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

## Cart Store Requirements

The CartDrawer expects the following interface from `lib/store/cart-store.ts`:

```typescript
interface CartItem {
  id: number;
  productId: number;
  name: string;
  slug: string;
  price: number;
  imageUrl: string | null;
  strength: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
```

## Configuration

### Free Shipping Threshold
Update the constants in `CartDrawer.tsx`:

```tsx
const FREE_SHIPPING_THRESHOLD = 150; // €150
const SHIPPING_COST = 5.99; // €5.99
```

### Empty Cart Links
Update the featured categories in the `EmptyCart` component:

```tsx
<Link href="/products?category=pouches">
  Nicotine Pouches
</Link>
<Link href="/products?category=bundles">
  Bundle Deals
</Link>
```

## Styling

The component uses:
- Irish green gradients (`.gradient-emerald`)
- Tailwind CSS with shadcn/ui design system
- Custom color tokens from `app/globals.css`
- Smooth animations using Radix UI primitives

## Routes Required

Make sure these routes exist:
- `/cart` - Full cart page
- `/checkout` - Checkout page
- `/products` - Products listing
- `/products/[slug]` - Individual product page

## Dependencies

The component requires:
- `@radix-ui/react-dialog` (already installed)
- `lucide-react` (already installed)
- `framer-motion` (already installed)
- All shadcn/ui components (button, badge, sheet)

## Accessibility

The component includes:
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure

## Mobile Responsive

- Full width on mobile
- Max width `sm:max-w-lg` on desktop
- Touch-friendly button sizes
- Responsive text sizing
- Optimized images

## Browser Support

Works on all modern browsers with JavaScript enabled.
