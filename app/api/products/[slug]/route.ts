import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/products/[slug]
 * Fetches a single product by slug with category information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug is required',
        },
        { status: 400 }
      );
    }

    // Fetch product with categories
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(
          categories(*)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (productError || !productData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Extract categories from the nested structure
    const categories = productData.product_categories?.map((pc: any) => pc.categories).filter(Boolean) || [];

    return NextResponse.json({
      success: true,
      product: {
        ...productData,
        categories,
        product_categories: undefined, // Remove the join field from response
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
