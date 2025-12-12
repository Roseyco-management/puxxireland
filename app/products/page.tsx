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
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of premium nicotine pouches. All products €15.00 with fast delivery across Ireland.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - Desktop */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
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
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products by name or flavor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Sort dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-[180px]">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      {getSortLabel()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile filters */}
              {showMobileFilters && (
                <div className="lg:hidden mt-4 pt-4 border-t">
                  <ProductFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              )}
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Product grid */}
            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
