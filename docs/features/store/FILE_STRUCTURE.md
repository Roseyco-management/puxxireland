# Cart Store File Structure

```
lib/store/
├── cart-store.ts              # Main Zustand store implementation (363 lines)
│   ├── CartState interface
│   ├── CartActions interface
│   ├── CartComputed interface
│   ├── useCartStore hook
│   ├── useCartReady hook
│   ├── cartSelectors
│   └── formatCartPrice helper
│
├── cart-types.ts              # TypeScript types and interfaces (64 lines)
│   ├── CartProduct interface
│   ├── CartItem interface
│   ├── CartValidation interface
│   ├── CartErrorType enum
│   ├── CART_CONSTANTS
│   └── toCartProduct helper
│
├── index.ts                   # Barrel exports (11 lines)
│   └── Re-exports all public APIs
│
├── cart-store-example.tsx     # Usage examples (379 lines)
│   ├── Example 1: AddToCartButton
│   ├── Example 2: CartSummary
│   ├── Example 3: CartItemRow
│   ├── Example 4: CartBadge
│   ├── Example 5: CartPage
│   └── Example 6: ProductQuantitySelector
│
├── cart-store-test.ts         # Integration tests (290 lines)
│   ├── testBasicOperations()
│   ├── testValidation()
│   ├── testPricingAndShipping()
│   ├── testEdgeCases()
│   └── runAllTests()
│
├── README.md                  # Complete API documentation (543 lines)
│   ├── Features
│   ├── Installation
│   ├── API Reference
│   ├── Business Rules
│   ├── Types
│   ├── Constants
│   ├── Examples
│   └── Best Practices
│
├── QUICK_START.md             # Quick reference guide (185 lines)
│   ├── Installation
│   ├── Basic Usage
│   ├── Important Rules
│   └── Complete Example
│
├── IMPLEMENTATION_SUMMARY.md  # This implementation overview
│   ├── Overview
│   ├── Features
│   ├── Usage Pattern
│   ├── Next Steps
│   └── Success Criteria
│
└── FILE_STRUCTURE.md          # This file
    └── Visual directory structure
```

## Import Paths

```typescript
// Primary import
import {
  useCartStore,
  useCartReady,
  cartSelectors,
  formatCartPrice,
  toCartProduct,
  CartItem,
  CartProduct,
  CartValidation,
  CartErrorType,
  CART_CONSTANTS,
} from '@/lib/store';

// Direct imports (if needed)
import { useCartStore } from '@/lib/store/cart-store';
import { CartProduct } from '@/lib/store/cart-types';
```

## File Purposes

| File | Purpose | When to Use |
|------|---------|-------------|
| `cart-store.ts` | Core implementation | Import hooks and selectors |
| `cart-types.ts` | Type definitions | Import types for components |
| `index.ts` | Exports | Use this for all imports |
| `cart-store-example.tsx` | Code examples | Copy patterns to your components |
| `cart-store-test.ts` | Testing | Run tests to verify functionality |
| `README.md` | Documentation | Reference for API details |
| `QUICK_START.md` | Quick guide | Quick lookup for common tasks |
| `IMPLEMENTATION_SUMMARY.md` | Overview | Understand implementation scope |

## Key Exports

### Hooks
- `useCartStore` - Main store hook
- `useCartReady` - Hydration check hook

### Selectors (optimized)
- `cartSelectors.items`
- `cartSelectors.itemCount`
- `cartSelectors.totalItems`
- `cartSelectors.subtotal`
- `cartSelectors.shippingCost`
- `cartSelectors.total`
- `cartSelectors.hasMinimumOrder`
- `cartSelectors.isFreeShipping`
- `cartSelectors.validation`

### Helpers
- `formatCartPrice(amount)` - Format EUR currency
- `toCartProduct(product)` - Convert DB Product to CartProduct

### Types
- `CartItem` - Cart item with product and quantity
- `CartProduct` - Product info for cart
- `CartValidation` - Validation result type
- `CartStore` - Complete store interface

### Constants
- `CART_CONSTANTS` - Business rule constants
- `CartErrorType` - Error type enum

## Dependencies

```json
{
  "zustand": "^5.0.9"
}
```

## Storage

- **Key:** `puxx-cart-storage`
- **Location:** localStorage
- **Syncs:** Across browser tabs
- **SSR-Safe:** Yes

## Total Lines

| Category | Lines |
|----------|-------|
| Core Code | 438 |
| Examples | 379 |
| Tests | 290 |
| Documentation | 728 |
| **Total** | **1,835** |
