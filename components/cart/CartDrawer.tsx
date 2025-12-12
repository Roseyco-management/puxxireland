'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useCartStore, formatCartPrice, cartSelectors } from '@/lib/store/cart-store';
import { CART_CONSTANTS, CartItem as CartItemType } from '@/lib/store/cart-types';

const FREE_SHIPPING_THRESHOLD = CART_CONSTANTS.FREE_SHIPPING_THRESHOLD;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore(cartSelectors.items);
  const subtotal = useCartStore(cartSelectors.subtotal);
  const total = useCartStore(cartSelectors.total);
  const shippingCost = useCartStore(cartSelectors.shippingCost);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const amountUntilFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg flex flex-col p-0 gap-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-6 border-b border-border bg-gradient-emerald">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <SheetTitle className="text-white text-xl font-heading">
                  Shopping Cart
                </SheetTitle>
                <SheetDescription className="text-white/90 text-sm">
                  {items.length === 0
                    ? 'Your cart is empty'
                    : `${items.length} ${items.length === 1 ? 'item' : 'items'}`}
                </SheetDescription>
              </div>
            </div>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center justify-between text-white text-sm mb-2">
                <span className="font-medium">Free shipping progress</span>
                <span className="font-bold">
                  {formatCartPrice(amountUntilFreeShipping)} to go
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {subtotal >= FREE_SHIPPING_THRESHOLD && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  You qualify for FREE shipping!
                </span>
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {items.length > 0 && (
          <div className="border-t border-border bg-muted/30 px-6 py-6 space-y-4">
            {/* Subtotal and Shipping */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCartPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                {shippingCost === 0 ? (
                  <span className="font-semibold text-primary">FREE</span>
                ) : (
                  <span className="font-medium">{formatCartPrice(shippingCost)}</span>
                )}
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg">Total</span>
                <span className="font-heading text-2xl text-primary">
                  {formatCartPrice(total)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                asChild
                className="w-full gradient-emerald hover:opacity-90 transition-opacity h-12 text-base font-semibold"
                onClick={onClose}
              >
                <Link href="/checkout">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Checkout Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full h-11 font-medium hover:bg-accent/50 transition-all"
                onClick={onClose}
              >
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const price = parseFloat(item.product.price);
  const itemTotal = price * item.quantity;

  return (
    <div className="flex gap-4 group hover:bg-accent/5 p-3 -mx-3 rounded-lg transition-all">
      {/* Product Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted hover:border-primary transition-colors"
      >
        {item.product.imageUrl ? (
          <Image
            src={item.product.imageUrl}
            alt={`${item.product.name} nicotine pouches ${item.product.nicotineStrength || ''} - ${item.product.flavor || 'premium flavor'}`}
            fill
            className="object-cover"
            sizes="96px"
            loading="lazy"
            quality={75}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-emerald">
            <span className="text-sm font-heading text-white">PUXX</span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link
            href={`/products/${item.product.slug}`}
            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight"
          >
            {item.product.name}
          </Link>
          {item.product.nicotineStrength && (
            <Badge
              variant="outline"
              className="mt-1.5 text-xs font-bold border-primary/30 text-primary"
            >
              {item.product.nicotineStrength}
            </Badge>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-muted rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-lg hover:bg-accent"
              onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-lg hover:bg-accent"
              onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-heading text-lg text-primary">
              {formatCartPrice(itemTotal)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
              onClick={() => onRemove(item.product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-emerald opacity-10 rounded-full blur-2xl" />
        <div className="relative p-6 bg-muted rounded-full">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>

      <h3 className="font-heading text-2xl text-foreground mb-2">
        Your cart is empty
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Looks like you haven't added any products yet. Start shopping to fill your
        cart!
      </p>

      <div className="space-y-3 w-full max-w-xs">
        <Button
          asChild
          className="w-full gradient-emerald hover:opacity-90 transition-opacity h-11 font-semibold"
          onClick={onClose}
        >
          <Link href="/products">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full hover:bg-accent/50 transition-all"
          onClick={onClose}
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      {/* Featured Categories */}
      <div className="mt-12 w-full max-w-sm">
        <p className="text-sm font-semibold text-muted-foreground mb-4">
          Popular Categories
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/products?category=pouches"
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/5 transition-all group"
            onClick={onClose}
          >
            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Nicotine Pouches
            </div>
          </Link>
          <Link
            href="/products?category=bundles"
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/5 transition-all group"
            onClick={onClose}
          >
            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Bundle Deals
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
