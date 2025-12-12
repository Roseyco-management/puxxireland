'use client';

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/db/schema';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters, FilterOptions } from '@/components/products/product-filters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, SlidersHorizontal, ArrowUpDown, X, ShoppingBag, Package } from 'lucide-react';
import Image from 'next/image';

// Flavor category mapping
const FLAVOR_CATEGORIES = {
  mint: ['Cool Mint', 'Spearmint', 'Peppermint'],
  fruit: ['Cherry', 'Watermelon', 'Strawberry', 'Raspberry', 'Blueberry', 'Grape', 'Peach'],
  citrus: ['Citrus'],
  unique: ['Cola', 'Wintergreen', 'Applemint'],
};

type SortOption = 'name-asc' | 'name-desc' | 'strength-asc' | 'strength-desc' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'strength-asc', label: 'Strength: Low to High' },
  { value: 'strength-desc', label: 'Strength: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    strength: null,
    flavorCategory: null,
    featured: false,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.flavor?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Apply strength filter
    if (filters.strength) {
      filtered = filtered.filter(
        (product) => product.nicotineStrength === filters.strength
      );
    }

    // Apply flavor category filter
    if (filters.flavorCategory) {
      const categoryFlavors = FLAVOR_CATEGORIES[filters.flavorCategory as keyof typeof FLAVOR_CATEGORIES];
      filtered = filtered.filter(
        (product) => product.flavor && categoryFlavors.includes(product.flavor)
      );
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter((product) => product.isFeatured);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'strength-asc': {
          const aStrength = parseInt(a.nicotineStrength?.replace('mg', '') || '0');
          const bStrength = parseInt(b.nicotineStrength?.replace('mg', '') || '0');
          return aStrength - bStrength;
        }
        case 'strength-desc': {
          const aStrength = parseInt(a.nicotineStrength?.replace('mg', '') || '0');
          const bStrength = parseInt(b.nicotineStrength?.replace('mg', '') || '0');
          return bStrength - aStrength;
        }
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  const handleClearFilters = () => {
    setFilters({
      strength: null,
      flavorCategory: null,
      featured: false,
    });
    setSearchQuery('');
  };

  const getSortLabel = () => {
    return SORT_OPTIONS.find((option) => option.value === sortBy)?.label || 'Sort by';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading our premium collection...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-irish py-16 lg:py-24">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <Package className="h-10 w-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight text-white leading-tight mb-6">
              Premium Nicotine Pouches
              <br />
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black mt-2 inline-block">
                14 Delicious Flavors
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Tobacco-free satisfaction delivered across Ireland. All products €15.00 with fast, reliable shipping.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8 justify-center text-base lg:text-lg text-white/90">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white" />
                <span className="font-medium">100% Tobacco-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white" />
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white" />
                <span className="font-medium">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - Desktop */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-8">
              {/* Filter Header */}
              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading text-foreground">Filter Products</h2>
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Refine your search to find your perfect nicotine pouch
                </p>
              </div>

              {/* Filters */}
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search and Sort bar */}
            <div className="bg-white rounded-xl border shadow-sm p-4 lg:p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name, flavor, or strength..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden h-11"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Sort dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-[200px] h-11">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      {getSortLabel()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[220px]">
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile filters */}
              {showMobileFilters && (
                <div className="lg:hidden mt-6 pt-6 border-t">
                  <ProductFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              )}
            </div>

            {/* Results count and active filters */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-base text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> of{' '}
                  <span className="font-semibold text-foreground">{products.length}</span> products
                </p>

                {/* Active filter badges */}
                {(filters.strength || filters.flavorCategory || filters.featured || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:bg-primary/20 rounded-full p-0.5">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {filters.strength && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                        {filters.strength}
                        <button
                          onClick={() => setFilters({ ...filters, strength: null })}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {filters.flavorCategory && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                        {filters.flavorCategory}
                        <button
                          onClick={() => setFilters({ ...filters, flavorCategory: null })}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {filters.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                        Featured
                        <button
                          onClick={() => setFilters({ ...filters, featured: false })}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Product grid */}
            <ProductGrid products={filteredAndSortedProducts} />

            {/* Empty state with CTA */}
            {filteredAndSortedProducts.length === 0 && products.length > 0 && (
              <div className="mt-8 text-center">
                <Button onClick={handleClearFilters} size="lg" className="gradient-emerald">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-emerald p-10 lg:p-14 text-center">
            <div className="relative z-10">
              <ShoppingBag className="h-12 w-12 text-white mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4">
                Can't Decide? Try a Variety Pack
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Explore different flavors and strengths to find your favorites. Free delivery on orders over €150.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
                  <a href="#top">
                    Browse All Products
                  </a>
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
