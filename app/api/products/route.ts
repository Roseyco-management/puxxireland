import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/products
 * Fetches all active products with optional filtering
 *
 * Query parameters:
 * - featured: boolean - Filter by featured products
 * - flavor: string - Filter by flavor
 * - strength: string - Filter by nicotine strength
 * - category: string - Filter by category slug
 * - sort: string - Sort by field (name, price, strength)
 * - order: string - Sort order (asc, desc)
 * - limit: number - Limit results
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const featured = searchParams.get('featured') === 'true';
    const flavor = searchParams.get('flavor');
    const strength = searchParams.get('strength');
    const categorySlug = searchParams.get('category');
    const sortBy = searchParams.get('sort') || 'name';
    const sortOrder = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Build query
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (featured) {
      query = query.eq('is_featured', true);
    }

    if (flavor) {
      query = query.eq('flavor', flavor);
    }

    if (strength) {
      query = query.eq('nicotine_strength', strength);
    }

    if (categorySlug) {
      // For category filtering, we need to join with product_categories and categories
      query = supabase
        .from('products')
        .select(`
          *,
          product_categories!inner(
            categories!inner(slug)
          )
        `)
        .eq('is_active', true)
        .eq('product_categories.categories.slug', categorySlug);
    }

    // Apply sorting
    const sortColumn = sortBy === 'price' ? 'price' : sortBy === 'strength' ? 'nicotine_strength' : 'name';
    query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

    // Apply limit
    query = query.limit(limit);

    const { data: allProducts, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      count: allProducts?.length || 0,
      products: allProducts || [],
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
