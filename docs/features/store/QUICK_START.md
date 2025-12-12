# Cart Store Quick Start Guide

## Installation

Already installed! Zustand is in your dependencies.

## Import

```tsx
import { useCartStore, toCartProduct, formatCartPrice } from '@/lib/store';
```

## Basic Usage

### 1. Add to Cart

```tsx
'use client';

import { useCartStore, toCartProduct } from '@/lib/store';

export function AddToCart({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    try {
      addItem(toCartProduct(product), 1);
      alert('Added to cart!');
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### 2. Show Cart Count

```tsx
'use client';

import { useCartStore, useCartReady, cartSelectors } from '@/lib/store';

export function CartBadge() {
  const count = useCartStore(cartSelectors.totalItems);
  const isReady = useCartReady();

  if (!isReady || count === 0) return null;

  return <span className="badge">{count}</span>;
}
```

### 3. Display Cart Total

```tsx
'use client';

import { useCartStore, cartSelectors, formatCartPrice } from '@/lib/store';

export function CartTotal() {
  const total = useCartStore(cartSelectors.total);

  return <div>Total: {formatCartPrice(total)}</div>;
}
```

### 4. Remove from Cart

```tsx
const removeItem = useCartStore((state) => state.removeItem);

<button onClick={() => removeItem(productId)}>Remove</button>
```

### 5. Update Quantity

```tsx
const updateQuantity = useCartStore((state) => state.updateQuantity);

<button onClick={() => updateQuantity(productId, newQuantity)}>
  Update
</button>
```

## Important Rules

### Always Check Hydration

```tsx
const isReady = useCartReady();
if (!isReady) return <Loading />;
```

This prevents hydration errors in Next.js.

### Always Convert Products

```tsx
import { toCartProduct } from '@/lib/store';

// Convert DB Product to CartProduct before adding
const cartProduct = toCartProduct(dbProduct);
addItem(cartProduct, quantity);
```

### Handle Errors

```tsx
try {
  addItem(product, quantity);
} catch (error) {
  // Show error to user
  alert(error.message);
}
```

## Business Rules

- **Minimum Order:** 5 tins
- **Free Shipping:** Orders over €150
- **Standard Shipping:** €10 flat rate
- **Max per Item:** 100 units

## Validation

```tsx
const validation = useCartStore((state) => state.validate());

if (!validation.isValid) {
  // Show errors
  validation.errors.forEach(error => {
    console.error(error.message);
  });
}

// Show warnings (e.g., "Add €X more for free shipping!")
validation.warnings.forEach(warning => {
  console.log(warning.message);
});
```

## Complete Example

```tsx
'use client';

import { useCartStore, useCartReady, toCartProduct, formatCartPrice } from '@/lib/store';

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isReady = useCartReady();

  if (!isReady) return <div>Loading...</div>;

  const handleAddToCart = () => {
    try {
      addItem(toCartProduct(product), 1);
      alert('Added to cart!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{formatCartPrice(parseFloat(product.price))}</p>
      <button
        onClick={handleAddToCart}
        disabled={product.stockQuantity <= 0}
      >
        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
```

## Need More?

- See `README.md` for full documentation
- See `cart-store-example.tsx` for comprehensive examples
- See `cart-store-test.ts` for test cases
