/**
 * EXAMPLE: How to integrate CartDrawer into your application
 *
 * This file shows example implementations. DO NOT import this file directly.
 * Copy the relevant code to your actual components.
 */

// ============================================
// EXAMPLE 1: Add to Root Layout
// ============================================

// File: app/layout.tsx
import { CartDrawer } from '@/components/cart';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Cart drawer available globally */}
        <CartDrawer />
      </body>
    </html>
  );
}

// ============================================
// EXAMPLE 2: Add Cart Button to Header
// ============================================

// File: components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { CartButton } from '@/components/cart';
import { Logo } from '@/components/Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Add Cart Button */}
          <CartButton />
        </div>
      </div>
    </header>
  );
}

// ============================================
// EXAMPLE 3: Add to Cart from Product Card
// ============================================

// File: components/ProductCard.tsx
'use client';

import { useCart } from '@/components/cart';

export function ProductCard({ product }) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: Date.now(), // Generate unique cart item ID
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      strength: product.nicotineStrength,
      quantity: 1,
    });

    // Automatically open cart to show feedback
    openCart();
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Product Detail Page with Variants
// ============================================

// File: app/products/[slug]/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart';

export default function ProductPage({ product }) {
  const { addItem, openCart } = useCart();
  const [selectedStrength, setSelectedStrength] = useState(product.strengths[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      strength: selectedStrength,
      quantity: quantity,
    });

    openCart();
  };

  return (
    <div>
      <h1>{product.name}</h1>

      {/* Strength selector */}
      <select
        value={selectedStrength}
        onChange={(e) => setSelectedStrength(e.target.value)}
      >
        {product.strengths.map(strength => (
          <option key={strength} value={strength}>
            {strength}
          </option>
        ))}
      </select>

      {/* Quantity selector */}
      <div>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button onClick={handleAddToCart}>
        Add {quantity} to Cart
      </button>
    </div>
  );
}

// ============================================
// EXAMPLE 5: Programmatically Open/Close Cart
// ============================================

// Any component can control the cart
'use client';

import { useCart } from '@/components/cart';

export function SomeComponent() {
  const { openCart, closeCart, toggleCart, isOpen } = useCart();

  return (
    <div>
      <button onClick={openCart}>Open Cart</button>
      <button onClick={closeCart}>Close Cart</button>
      <button onClick={toggleCart}>Toggle Cart</button>
      <p>Cart is {isOpen ? 'open' : 'closed'}</p>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Display Cart Item Count
// ============================================

'use client';

import { useCart } from '@/components/cart';

export function CartItemCount() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <div>
      You have {count} items in your cart
    </div>
  );
}

// ============================================
// EXAMPLE 7: Custom Cart Button with Badge
// ============================================

'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart';
import { Badge } from '@/components/ui/badge';

export function CustomCartButton() {
  const { openCart, getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-accent rounded-lg"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge className="absolute -top-1 -right-1">
          {itemCount}
        </Badge>
      )}
    </button>
  );
}
