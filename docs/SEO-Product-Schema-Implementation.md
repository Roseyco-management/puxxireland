# Product Schema Implementation - PUXX Ireland

**Status:** ✅ Completed
**Date:** December 12, 2025
**Reference:** PUXX-Ireland-SEO-Plan.md (lines 187-252)

## Overview
This document describes the SEO schema implementation for product pages according to the PUXX Ireland SEO Plan. All components use `next-seo` built-in components as specified in the SEO plan (lines 187-252).

## Implementation Files
- **Product Page:** `/Users/baileybarry/PuxxIreland/app/products/[slug]/page.tsx`
- **NextSeo Component:** `/Users/baileybarry/PuxxIreland/components/seo/ProductPageSEO.tsx`
- **Schema Component:** `/Users/baileybarry/PuxxIreland/components/seo/ProductSchema.tsx`

## Architecture

This implementation follows the SEO Plan's recommended approach:
- **Next.js Metadata API** for basic meta tags (title, description, canonical)
- **NextSeo component** (from next-seo) for Open Graph, Twitter Cards, and additional SEO
- **ProductJsonLd and BreadcrumbJsonLd** (from next-seo) for structured data

## SEO Components Implemented

### 1. ProductPageSEO Component (NextSeo)
**Location:** `/Users/baileybarry/PuxxIreland/components/seo/ProductPageSEO.tsx`

Implements NextSeo component with product-specific meta tags as specified in SEO Plan lines 195-220.

**Features:**
- Title pattern: `{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX`
- Dynamic meta description with product details, flavor, price, and USPs
- Canonical URL for each product
- Open Graph product type with pricing and availability
- Multiple product images (main + gallery)
- Twitter Card integration

**Example Output:**
```html
<!-- Meta Tags -->
<title>PUXX Cool Mint Nicotine Pouches 22mg | Buy in Ireland | PUXX</title>
<meta name="description" content="Buy PUXX Cool Mint nicotine pouches in Ireland. Mint flavor. 22mg. €15.00. Tobacco-free. Free delivery over €150. 18+ only. Shop PUXX." />
<link rel="canonical" href="https://puxx.ie/products/cool-mint-22mg" />

<!-- Open Graph -->
<meta property="og:type" content="product" />
<meta property="og:title" content="PUXX Cool Mint - PUXX Ireland" />
<meta property="og:description" content="Refreshing mint flavor with icy coolness" />
<meta property="og:url" content="https://puxx.ie/products/cool-mint-22mg" />
<meta property="og:image" content="https://puxx.ie/products/cool-mint.jpg" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="800" />
<meta property="product:price:amount" content="15.00" />
<meta property="product:price:currency" content="EUR" />
<meta property="product:availability" content="in stock" />
<meta property="product:condition" content="new" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="PUXX Cool Mint - PUXX Ireland" />
<meta name="twitter:description" content="Refreshing mint flavor with icy coolness" />
```

### 2. ProductSchema Component (ProductJsonLd & BreadcrumbJsonLd)
**Location:** `/Users/baileybarry/PuxxIreland/components/seo/ProductSchema.tsx`

Uses next-seo's ProductJsonLd and BreadcrumbJsonLd components as specified in SEO Plan lines 222-246 and 421-440.

**ProductJsonLd Features:**
- Product name, description, and images (main + gallery)
- Brand: PUXX
- Manufacturer: PUXX
- Flavor as color attribute
- Offer details:
  - Price in EUR (formatted to 2 decimals)
  - Availability (InStock/OutOfStock based on stockQuantity)
  - Product URL
  - Seller information (PUXX Ireland)
- Aggregate rating (placeholder: 4.8 rating, 127 reviews as per SEO plan)

**BreadcrumbJsonLd Features:**
- Three-level breadcrumb hierarchy as specified in SEO plan:
  1. Home
  2. Shop
  3. Current product name
- Proper position numbers
- Absolute URLs for each breadcrumb item

**ProductJsonLd Schema Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PUXX Cool Mint",
  "image": [
    "https://puxx.ie/products/cool-mint-main.jpg",
    "https://puxx.ie/products/cool-mint-2.jpg",
    "https://puxx.ie/products/cool-mint-3.jpg"
  ],
  "description": "Refreshing mint flavor with icy coolness",
  "brand": "PUXX",
  "color": "Mint",
  "manufacturerName": "PUXX",
  "offers": [
    {
      "price": "15.00",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://puxx.ie/products/cool-mint-22mg",
      "seller": {
        "name": "PUXX Ireland"
      }
    }
  ],
  "aggregateRating": {
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

**BreadcrumbJsonLd Schema Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "position": 1,
      "name": "Home",
      "item": "https://puxx.ie"
    },
    {
      "position": 2,
      "name": "Shop",
      "item": "https://puxx.ie/products"
    },
    {
      "position": 3,
      "name": "PUXX Cool Mint",
      "item": "https://puxx.ie/products/cool-mint-22mg"
    }
  ]
}
```

## Dynamic Data Mapping

All product data is dynamically mapped from the database:

| Schema Field | Product Field | Notes |
|-------------|---------------|-------|
| productName | product.name | Product name |
| description | product.description | Full product description |
| images | product.imageUrl + product.imageGallery | Main image + gallery images |
| price | product.price | Converted to number, formatted to 2 decimals |
| availability | product.stockQuantity | InStock if > 0, OutOfStock if 0 |
| color | product.flavor | Flavor used as color attribute |
| brand | "PUXX" | Hardcoded brand name |
| manufacturerName | "PUXX" | Hardcoded manufacturer |
| nicotineStrength | product.nicotineStrength | Used in title and description |
| sku | product.sku | Not currently in schema, available if needed |

## Product Fields from Database

Based on the schema (lib/db/schema.ts), available product fields include:

```typescript
{
  id: number;
  name: string;
  slug: string;
  description: string;
  price: Decimal;
  compareAtPrice: Decimal | null;
  sku: string | null;
  nicotineStrength: string | null;
  flavor: string | null;
  pouchesPerCan: number | null;
  ingredients: string | null;
  usageInstructions: string | null;
  imageUrl: string | null;
  imageGallery: string[] | null;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## Future Enhancements

### 1. Aggregate Rating (When Reviews are Implemented)
Uncomment and populate lines 140-143:
```typescript
aggregateRating={{
  ratingValue: calculateAverageRating(reviews).toString(),
  reviewCount: reviews.length.toString(),
}}
```

### 2. Additional Schema Fields
Consider adding:
- `gtin` (Global Trade Item Number) if available
- `mpn` (Manufacturer Part Number)
- `review` array with individual reviews
- `additionalProperty` for nicotine strength, pouches per can, etc.

### 3. Enhanced Product Information
Add to ProductJsonLd:
```typescript
additionalProperty: [
  {
    "@type": "PropertyValue",
    "name": "Nicotine Strength",
    "value": product.nicotineStrength
  },
  {
    "@type": "PropertyValue",
    "name": "Pouches Per Can",
    "value": product.pouchesPerCan
  }
]
```

### 4. Video Schema
When product videos are added:
```typescript
video: {
  name: `${product.name} Review`,
  description: `Watch our review of ${product.name}`,
  thumbnailUrl: videoThumbnailUrl,
  contentUrl: videoUrl,
  uploadDate: videoUploadDate,
}
```

## SEO Best Practices Applied

1. **Unique, Dynamic Content:** All meta tags and schema use actual product data
2. **Proper URL Structure:** Canonical URLs prevent duplicate content issues
3. **Image Optimization:** Alt text includes product name and flavor
4. **Structured Data:** Google can display rich snippets in search results
5. **Breadcrumbs:** Help users and search engines understand site structure
6. **Open Graph:** Optimized social media sharing

## Testing

### Verify Schema Implementation
1. **Google Rich Results Test:**
   - URL: https://search.google.com/test/rich-results
   - Enter product page URL
   - Verify Product schema is detected

2. **Schema Markup Validator:**
   - URL: https://validator.schema.org/
   - Enter product page URL or paste HTML
   - Check for validation errors

3. **Browser DevTools:**
   - View page source
   - Search for `<script type="application/ld+json">`
   - Verify JSON-LD is properly formatted

### Expected Results
- Product schema should be valid with no errors
- BreadcrumbList schema should be valid
- Open Graph tags should be present and properly formatted
- Canonical URL should point to correct product page

## Environment Variables

Ensure these variables are set in your environment:

```bash
# .env.local (for production)
BASE_URL=https://puxx.ie
NEXT_PUBLIC_BASE_URL=https://puxx.ie
```

For development:
```bash
# .env.local (for development)
BASE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Note:**
- `BASE_URL` is used server-side (generateMetadata, API routes)
- `NEXT_PUBLIC_BASE_URL` is used client-side (ProductPageSEO and ProductSchema components)
- The SEO plan specifies `https://puxx.ie` as the primary domain

## Dependencies

Required packages (already installed):
- `next` (v15.6.0) - Next.js framework with built-in Metadata API
- `next-seo` (v7.0.1) - Used for NextSeo, ProductJsonLd, and BreadcrumbJsonLd components

## Related Documentation

- SEO Plan: `/Users/baileybarry/PuxxIreland/docs/planning/PUXX-Ireland-SEO-Plan.md`
- Product Schema: `/Users/baileybarry/PuxxIreland/lib/db/schema.ts`
- Product Types: `/Users/baileybarry/PuxxIreland/lib/types/product.ts`

## Compliance with SEO Plan (Lines 187-252)

This implementation satisfies ALL requirements from the SEO Plan:

### ✅ NextSeo Component (lines 195-220)
- [x] Title pattern: `{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX`
- [x] Meta description with product details (flavor, strength, price, USPs)
- [x] Open Graph product type
- [x] Product pricing in EUR
- [x] Availability status (in stock / out of stock)
- [x] Canonical URL
- [x] Twitter Card integration

### ✅ ProductJsonLd Schema (lines 222-246)
- [x] Product name
- [x] Product images (main + gallery)
- [x] Product description
- [x] Brand: PUXX
- [x] Manufacturer: PUXX
- [x] Color (flavor)
- [x] Offers with price in EUR
- [x] Availability status (schema.org format)
- [x] Seller information (PUXX Ireland)
- [x] Aggregate rating (placeholder: 4.8 rating, 127 reviews)

### ✅ BreadcrumbJsonLd Schema (lines 421-440)
- [x] Home > Shop > Product Name hierarchy
- [x] Proper position numbers
- [x] Full URLs for each breadcrumb item

### ✅ Additional SEO Features
- [x] Dynamic product data mapping
- [x] SEO-friendly URLs (canonical)
- [x] Image optimization (multiple images, proper alt text)
- [x] Base URL: https://puxx.ie
- [x] URL pattern: https://puxx.ie/products/{slug}

## Support

For questions or issues with the SEO implementation, refer to:
- [next-seo Documentation](https://github.com/garmeeh/next-seo)
- [Schema.org Product Documentation](https://schema.org/Product)
- [Google Search Central - Product Schema](https://developers.google.com/search/docs/appearance/structured-data/product)
