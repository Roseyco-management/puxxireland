'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  nicotineStrength: string | null;
  flavor: string | null;
  imageUrl: string | null;
  stockQuantity: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.price);
  const isInStock = product.stockQuantity > 0;

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover-lift transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-emerald">
              <span className="text-4xl font-heading text-white">PUXX</span>
            </div>
          )}

          {/* Stock indicator */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Flavor & Strength */}
          <div className="flex items-center justify-between text-xs">
            {product.flavor && (
              <span className="px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                {product.flavor}
              </span>
            )}
            {product.nicotineStrength && (
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">
                {product.nicotineStrength}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-heading text-primary">
              €{price.toFixed(2)}
            </span>
            {product.compareAtPrice && parseFloat(product.compareAtPrice) > price && (
              <span className="text-sm text-muted-foreground line-through">
                €{parseFloat(product.compareAtPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          className="w-full gradient-emerald hover:opacity-90"
          disabled={!isInStock}
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart functionality
            console.log('Add to cart:', product.id);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
