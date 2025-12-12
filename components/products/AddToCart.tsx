'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductWithCategories } from '@/lib/types/product';
import { getStockStatus } from '@/lib/types/product';

interface AddToCartProps {
  product: ProductWithCategories;
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const stockInfo = getStockStatus(product.stockQuantity);
  const maxQuantity = Math.min(product.stockQuantity, 10);
  const isOutOfStock = stockInfo.status === 'out_of_stock';

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > maxQuantity) return maxQuantity;
      return newQuantity;
    });
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem('puxx_cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      // Check if product already in cart
      const existingItemIndex = cart.findIndex(
        (item: any) => item.productId === product.id
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.push({
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity,
          nicotineStrength: product.nicotineStrength,
          flavor: product.flavor,
        });
      }

      // Save to localStorage
      localStorage.setItem('puxx_cart', JSON.stringify(cart));

      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));

      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Reset quantity
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-3 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= maxQuantity}
              className="p-3 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Max: {maxQuantity} per order
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        size="lg"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg transition-all disabled:bg-gray-300"
      >
        {isAdding ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Adding...
          </span>
        ) : showSuccess ? (
          <span className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            Added to Cart!
          </span>
        ) : isOutOfStock ? (
          'Out of Stock'
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </span>
        )}
      </Button>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in slide-in-from-top-2">
          <p className="text-green-800 text-sm font-medium text-center">
            {quantity} x {product.name} added to your cart
          </p>
        </div>
      )}

      {/* Out of Stock Warning */}
      {isOutOfStock && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-medium text-center">
            This product is currently out of stock
          </p>
        </div>
      )}
    </div>
  );
}
