import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import {
  ArrowRight,
  Package,
  Leaf,
  Smile,
  Star,
  ShoppingBag,
  Truck,
  Shield
} from 'lucide-react';

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

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products?featured=true&limit=4`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-irish opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight">
                Ireland's Premium{' '}
                <span className="text-gradient-emerald">Tobacco-Free</span>{' '}
                Nicotine Pouches
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                14 delicious flavors. Clean satisfaction. Delivered to your door.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="gradient-emerald hover:opacity-90 text-lg">
                  <Link href="/shop">
                    Shop All Flavors
                    <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Age Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-12 lg:mt-0 relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Placeholder for hero image - using gradient background */}
                <div className="absolute inset-0 gradient-emerald rounded-3xl opacity-20 blur-3xl" />
                <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border-2 border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl font-heading text-gradient-emerald block mb-4">PUXX</span>
                    <p className="text-xl text-muted-foreground">14 Unique Flavors</p>
                    <p className="text-sm text-muted-foreground mt-2">Tobacco-Free Premium Pouches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
              Featured Flavors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular nicotine pouches, loved by customers across Ireland
            </p>
          </div>

          {/* Products Grid */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available at the moment.</p>
            </div>
          )}

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why PUXX Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
              Why Choose PUXX?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium quality nicotine pouches designed for the modern Irish lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3">Tobacco-Free & Clean</h3>
              <p className="text-muted-foreground">
                100% tobacco-free pouches made with premium ingredients for a clean experience
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3">14 Delicious Flavors</h3>
              <p className="text-muted-foreground">
                From refreshing mint to exotic fruits, find your perfect flavor match
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Smile className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3">Discreet & Convenient</h3>
              <p className="text-muted-foreground">
                Use anywhere, anytime without smoke or smell. Perfect for on-the-go
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Carefully crafted pouches that deliver consistent satisfaction every time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with PUXX is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                  1
                </div>
                <h3 className="text-2xl font-heading mb-4">Choose Your Flavor</h3>
                <p className="text-muted-foreground">
                  Browse our collection of 14 premium flavors and find the ones that suit your taste
                </p>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                  2
                </div>
                <h3 className="text-2xl font-heading mb-4">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Add your favorites to the cart and complete our secure checkout process
                </p>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-heading mb-6">
                3
              </div>
              <h3 className="text-2xl font-heading mb-4">Enjoy Delivered</h3>
              <p className="text-muted-foreground">
                Fast delivery to your door. Start enjoying your PUXX pouches right away
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-irish p-12 lg:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-6">
                Ready to Try PUXX?
              </h2>
              <p className="text-xl text-white/90 mb-4">
                Experience Ireland's finest nicotine pouches today
              </p>
              <p className="text-lg text-white/80 mb-8">
                Free delivery on orders over €150
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
