# PUXX Ireland Shopping Cart Store

A production-ready shopping cart state management system built with Zustand for PUXX Ireland's e-commerce platform.

## Features

- **Persistent Cart**: Automatically saves to localStorage and syncs across tabs
- **Stock Validation**: Real-time stock checking and quantity limits
- **Business Rules**: Enforces minimum order (5 tins) and free shipping threshold (€150)
- **Type Safety**: Full TypeScript support with comprehensive types
- **Error Handling**: Robust error handling with clear error messages
- **Performance**: Optimized selectors to prevent unnecessary re-renders
- **SSR Compatible**: Handles server-side rendering without hydration issues

## Installation

The required dependency is already installed:

```bash
pnpm add zustand
```

## Quick Start

### Basic Usage

```tsx
'use client';

import { useCartStore, toCartProduct, formatCartPrice } from '@/lib/store';
import type { Product } from '@/lib/db/schema';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    try {
      const cartProduct = toCartProduct(product);
      addItem(cartProduct, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart - {formatCartPrice(parseFloat(product.price))}
    </button>
  );
}
```

## API Reference

### Cart Actions

#### `addItem(product: CartProduct, quantity?: number)`
Adds a product to the cart or increases quantity if already in cart.

```tsx
const addItem = useCartStore((state) => state.addItem);
addItem(cartProduct, 2); // Add 2 units
```

**Validates:**
- Stock availability
- Maximum quantity per item (100)
- Prevents out-of-stock additions

**Throws:** Error if validation fails

---

#### `removeItem(productId: number)`
Removes a product completely from the cart.

```tsx
const removeItem = useCartStore((state) => state.removeItem);
removeItem(123);
```

---

#### `updateQuantity(productId: number, quantity: number)`
Updates the quantity of a cart item. Removes item if quantity is 0 or less.

```tsx
const updateQuantity = useCartStore((state) => state.updateQuantity);
updateQuantity(123, 5); // Set to 5 units
```

**Validates:**
- Stock availability
- Maximum quantity limits

**Throws:** Error if validation fails

---

#### `clearCart()`
Removes all items from the cart.

```tsx
const clearCart = useCartStore((state) => state.clearCart);
clearCart();
```

---

#### `getItem(productId: number)`
Gets a specific cart item.

```tsx
const getItem = useCartStore((state) => state.getItem);
const item = getItem(123); // Returns CartItem | undefined
```

---

### Cart Computed Values

#### `getItemCount()`
Returns the number of unique items in the cart.

```tsx
const itemCount = useCartStore((state) => state.getItemCount());
// Returns: 3 (if cart has 3 different products)
```

---

#### `getTotalItems()`
Returns the total quantity of all items.

```tsx
const totalItems = useCartStore((state) => state.getTotalItems());
// Returns: 15 (if cart has 15 total tins across all products)
```

---

#### `getSubtotal()`
Returns the cart subtotal (before shipping).

```tsx
const subtotal = useCartStore((state) => state.getSubtotal());
// Returns: 89.50 (number)
```

---

#### `getShippingCost()`
Returns shipping cost based on subtotal.

```tsx
const shipping = useCartStore((state) => state.getShippingCost());
// Returns: 0 if subtotal >= €150, otherwise 10
```

---

#### `getTotal()`
Returns the total cost (subtotal + shipping).

```tsx
const total = useCartStore((state) => state.getTotal());
// Returns: 99.50 (number)
```

---

#### `hasMinimumOrder()`
Checks if cart meets minimum order requirement (5 tins).

```tsx
const hasMin = useCartStore((state) => state.hasMinimumOrder());
// Returns: boolean
```

---

#### `isFreeShipping()`
Checks if cart qualifies for free shipping (€150+).

```tsx
const isFree = useCartStore((state) => state.isFreeShipping());
// Returns: boolean
```

---

#### `validate()`
Validates the entire cart and returns errors/warnings.

```tsx
const validation = useCartStore((state) => state.validate());

if (!validation.isValid) {
  validation.errors.forEach(error => {
    console.error(error.message);
  });
}

validation.warnings.forEach(warning => {
  console.log(warning.message); // e.g., "Add €60.50 more for free shipping!"
});
```

**Returns:**
```typescript
{
  isValid: boolean;
  errors: Array<{
    type: CartErrorType;
    message: string;
    productId?: number;
  }>;
  warnings: Array<{
    message: string;
  }>;
}
```

---

### Optimized Selectors

Use pre-built selectors for better performance:

```tsx
import { useCartStore, cartSelectors } from '@/lib/store';

// Instead of:
const subtotal = useCartStore((state) => state.getSubtotal());

// Use:
const subtotal = useCartStore(cartSelectors.subtotal);
```

Available selectors:
- `cartSelectors.items`
- `cartSelectors.itemCount`
- `cartSelectors.totalItems`
- `cartSelectors.subtotal`
- `cartSelectors.shippingCost`
- `cartSelectors.total`
- `cartSelectors.hasMinimumOrder`
- `cartSelectors.isFreeShipping`
- `cartSelectors.validation`

---

### Hydration Hook

Prevents hydration mismatches in SSR:

```tsx
import { useCartReady } from '@/lib/store';

export function CartButton() {
  const isReady = useCartReady();
  const itemCount = useCartStore((state) => state.getItemCount());

  if (!isReady) {
    return <div>Loading...</div>; // Render loading state until hydrated
  }

  return <div>Cart ({itemCount})</div>;
}
```

---

## Business Rules

### Minimum Order Requirement
- **Minimum:** 5 tins per order
- **Enforced:** During checkout validation
- **Error Message:** "Minimum order is 5 tins. You have X tins."

### Free Shipping
- **Threshold:** €150.00
- **Standard Shipping:** €10.00 flat rate
- **Warning:** Shows "Add €X more for free shipping!" when close

### Stock Validation
- **Out of Stock:** Cannot add to cart
- **Insufficient Stock:** Prevents adding more than available
- **Maximum per Item:** 100 units

---

## Types

### CartProduct
```typescript
interface CartProduct {
  id: number;
  name: string;
  slug: string;
  price: string; // Decimal as string
  nicotineStrength: string | null;
  flavor: string | null;
  imageUrl: string | null;
  stockQuantity: number;
  sku: string | null;
}
```

### CartItem
```typescript
interface CartItem {
  product: CartProduct;
  quantity: number;
}
```

### CartValidation
```typescript
interface CartValidation {
  isValid: boolean;
  errors: Array<{
    type: CartErrorType;
    message: string;
    productId?: number;
  }>;
  warnings: Array<{
    message: string;
  }>;
}
```

### CartErrorType
```typescript
enum CartErrorType {
  MINIMUM_ORDER = 'MINIMUM_ORDER',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
  MAX_QUANTITY_EXCEEDED = 'MAX_QUANTITY_EXCEEDED',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
}
```

---

## Constants

```typescript
const CART_CONSTANTS = {
  MIN_ORDER_QUANTITY: 5,      // Minimum 5 tins
  FREE_SHIPPING_THRESHOLD: 150, // Free shipping over €150
  MAX_QUANTITY_PER_ITEM: 100,  // Max 100 units per product
};
```

---

## Helper Functions

### `toCartProduct(product: Product): CartProduct`
Converts database Product to CartProduct format.

```tsx
import { toCartProduct } from '@/lib/store';

const cartProduct = toCartProduct(dbProduct);
addItem(cartProduct, 1);
```

### `formatCartPrice(amount: number): string`
Formats number as EUR currency.

```tsx
import { formatCartPrice } from '@/lib/store';

formatCartPrice(99.99); // "€99.99"
```

---

## Examples

See `/lib/store/cart-store-example.tsx` for comprehensive examples including:

1. **Add to Cart Button** - Simple add to cart
2. **Cart Summary** - Display totals and validation
3. **Cart Item Row** - Item with quantity controls
4. **Cart Badge** - Header cart icon with count
5. **Full Cart Page** - Complete cart implementation
6. **Quantity Selector** - Advanced quantity selection

---

## Persistence

The cart automatically persists to `localStorage` under the key `puxx-cart-storage`.

**Storage format:**
```json
{
  "state": {
    "items": [
      {
        "product": { /* CartProduct */ },
        "quantity": 2
      }
    ]
  },
  "version": 0
}
```

**Features:**
- Automatic save on every change
- Syncs across browser tabs
- SSR-safe (doesn't break server rendering)
- Handles hydration properly

---

## Error Handling

All cart actions use try-catch blocks and throw descriptive errors:

```tsx
try {
  addItem(product, 10);
} catch (error) {
  if (error instanceof Error) {
    // Show user-friendly error
    alert(error.message); // "Only 5 units of Product X available"
  }
}
```

Common errors:
- `"Only X units of {product} available"` - Insufficient stock
- `"{product} is currently out of stock"` - Out of stock
- `"Maximum 100 units per product"` - Quantity limit exceeded
- `"Product not found in cart"` - Invalid product ID

---

## Best Practices

### 1. Always Check Hydration
```tsx
const isReady = useCartReady();
if (!isReady) return <LoadingState />;
```

### 2. Use Selectors for Performance
```tsx
// Good - only re-renders when total changes
const total = useCartStore(cartSelectors.total);

// Less optimal - creates new selector each render
const total = useCartStore((state) => state.getTotal());
```

### 3. Handle Errors Gracefully
```tsx
try {
  addItem(product, quantity);
  // Show success toast
} catch (error) {
  // Show error toast
}
```

### 4. Validate Before Checkout
```tsx
const validation = useCartStore(cartSelectors.validation);

if (!validation.isValid) {
  // Show errors to user
  return;
}

// Proceed to checkout
```

### 5. Convert DB Products
```tsx
import { toCartProduct } from '@/lib/store';

// Always convert DB Product to CartProduct
const cartProduct = toCartProduct(dbProduct);
addItem(cartProduct);
```

---

## Future Enhancements

Potential additions for future development:

1. **Database Sync** - Sync cart with database for logged-in users
2. **Cart Expiration** - Clear old items after X days
3. **Product Variants** - Handle size/color variants
4. **Coupons** - Apply discount codes
5. **Wishlist** - Save for later functionality
6. **Cart Recovery** - Email abandoned cart reminders

---

## Testing

Example test cases:

```typescript
// Test minimum order validation
const validation = store.validate();
expect(validation.errors).toContainEqual({
  type: CartErrorType.MINIMUM_ORDER,
  message: expect.stringContaining('Minimum order is 5 tins')
});

// Test free shipping
store.addItem(product, 20); // €160 total
expect(store.getShippingCost()).toBe(0);

// Test stock validation
expect(() => {
  store.addItem(outOfStockProduct, 1);
}).toThrow('out of stock');
```

---

## Support

For issues or questions:
1. Check the examples in `cart-store-example.tsx`
2. Review this README
3. Check TypeScript types for API documentation
4. Contact development team

---

## License

Proprietary - PUXX Ireland © 2025
