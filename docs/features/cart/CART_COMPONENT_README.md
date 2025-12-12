# PUXX Ireland Cart Components

Beautiful, responsive cart components for the PUXX Ireland e-commerce platform.

## Components

### 🛒 CartDrawer
Main slide-out cart drawer component with:
- Smooth slide-in animation from right
- Irish green gradient header
- Free shipping progress bar
- Real-time total calculations
- Empty cart state
- Mobile responsive design
- Product image thumbnails
- Quantity controls
- Remove item functionality

### 🔘 CartButton
Cart trigger button with:
- Item count badge
- Multiple variant support (default, outline, ghost)
- Accessible ARIA labels
- Hover states

### 📦 Sheet Component
Reusable shadcn Sheet component built on Radix UI Dialog.

## File Structure

```
components/cart/
├── CartDrawer.tsx      # Main cart drawer component
├── CartButton.tsx      # Cart trigger button with badge
├── CartItem.tsx        # Full cart page item (existing)
├── CartSummary.tsx     # Full cart page summary (existing)
├── index.ts            # Barrel exports
├── INTEGRATION.md      # Integration guide
├── EXAMPLE.tsx         # Code examples
└── README.md           # This file

components/ui/
└── sheet.tsx           # Sheet/Dialog component
```

## Quick Start

1. **Add CartDrawer to layout:**
```tsx
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

2. **Add CartButton to header:**
```tsx
import { CartButton } from '@/components/cart';

export function Header() {
  return (
    <header>
      <CartButton />
    </header>
  );
}
```

3. **Add items to cart:**
```tsx
import { useCart } from '@/components/cart';

const { addItem, openCart } = useCart();

addItem({
  id: Date.now(),
  productId: product.id,
  name: product.name,
  slug: product.slug,
  price: parseFloat(product.price),
  imageUrl: product.imageUrl,
  strength: product.nicotineStrength,
  quantity: 1,
});

openCart();
```

## Features

✅ Free shipping threshold (€150)
✅ Shipping cost calculation (€5.99)
✅ Real-time cart totals
✅ Quantity increase/decrease
✅ Remove items
✅ Empty cart state
✅ Progress bar for free shipping
✅ Link to full cart page (/cart)
✅ Link to checkout (/checkout)
✅ Irish green theme
✅ Smooth animations
✅ Mobile responsive
✅ Keyboard accessible
✅ Screen reader friendly

## Integration

See [INTEGRATION.md](./INTEGRATION.md) for detailed integration instructions.

See [EXAMPLE.tsx](./EXAMPLE.tsx) for code examples.

## Requirements

### Cart Store
The CartDrawer requires a cart store at `/lib/store/cart-store.ts` with:
- items: CartItem[]
- isOpen: boolean
- openCart()
- closeCart()
- toggleCart()
- addItem()
- removeItem()
- updateQuantity()
- getTotal()
- getItemCount()

Currently uses a temporary mock - replace with actual Zustand store.

### Routes
- `/cart` - Full cart page
- `/checkout` - Checkout page
- `/products` - Products listing
- `/products/[slug]` - Product detail

## Styling

Uses PUXX Ireland brand colors:
- Emerald Green: #009A49
- Shamrock Green: #00A86B
- Forest Green: #00563F
- Gold: #D4AF37
- Cream: #F5E6D3

Custom gradients:
- `.gradient-emerald` - Primary green gradient
- `.gradient-forest` - Dark green gradient
- `.gradient-irish` - Multi-tone Irish gradient

## Dependencies

- @radix-ui/react-dialog
- lucide-react
- framer-motion
- tailwindcss
- shadcn/ui components

## Browser Support

All modern browsers with JavaScript enabled.

## License

Copyright PUXX Ireland 2025
