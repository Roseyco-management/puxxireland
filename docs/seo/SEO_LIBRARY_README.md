# PUXX Ireland SEO Configuration

This directory contains SEO configuration and utilities for the PUXX Ireland website, implementing the comprehensive SEO plan from `docs/planning/PUXX-Ireland-SEO-Plan.md`.

## Files Overview

### `metadata.ts`
Base metadata configuration for Next.js 15 App Router. Used in `app/layout.tsx` as the default metadata for all pages.

**Features:**
- Title template with PUXX Ireland branding
- SEO-optimized description targeting "nicotine pouches Ireland"
- Open Graph and Twitter Card configuration
- Canonical URL configuration
- Locale set to `en_IE` for Irish market

### `defaultSEO.ts`
Legacy next-seo configuration (for reference). The actual implementation uses Next.js 15 Metadata API in `metadata.ts`.

### `product-metadata.ts`
Helper functions for generating product-specific SEO metadata and structured data.

**Functions:**
- `generateProductMetadata(product)` - Generates Next.js Metadata for product pages
- `generateProductJsonLd(product)` - Generates Product schema JSON-LD
- `generateProductBreadcrumbJsonLd(product)` - Generates Breadcrumb schema

### `schema.ts`
Pre-configured JSON-LD schemas for the website:
- `organizationSchema` - Organization data for PUXX Ireland
- `localBusinessSchema` - Local business data for Irish SEO
- `websiteSchema` - Website search functionality
- `faqSchema` - FAQ structured data for featured snippets

### `JsonLd.tsx`
React component for adding JSON-LD structured data to pages.

## Usage Examples

### Homepage with Structured Data

```tsx
// app/page.tsx
import { JsonLd } from '@/lib/seo/JsonLd'
import { organizationSchema, localBusinessSchema, faqSchema, websiteSchema } from '@/lib/seo/schema'

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema, faqSchema]} />
      {/* page content */}
    </>
  )
}
```

### Product Page with SEO

```tsx
// app/shop/[slug]/page.tsx
import { generateProductMetadata, generateProductJsonLd, generateProductBreadcrumbJsonLd } from '@/lib/seo/product-metadata'
import { JsonLd } from '@/lib/seo/JsonLd'

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}

  return generateProductMetadata(product)
}

// Product page component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  return (
    <>
      <JsonLd data={[
        generateProductJsonLd(product),
        generateProductBreadcrumbJsonLd(product)
      ]} />
      {/* product page content */}
    </>
  )
}
```

### Custom Page Metadata

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Our Story',
  description: 'Learn about PUXX Ireland, our mission to provide premium tobacco-free nicotine pouches, and our commitment to quality.',
  alternates: {
    canonical: 'https://puxx.ie/about',
  },
}

export default function AboutPage() {
  return (
    // page content
  )
}
```

## SEO Best Practices Implemented

### 1. Title Tags
- **Homepage:** "PUXX Ireland - Premium Tobacco-Free Nicotine Pouches"
- **Product Pages:** "{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX"
- **Template:** "%s | PUXX Ireland - World's Best Nicotine Pouches"
- **Length:** 60-70 characters optimal

### 2. Meta Descriptions
- **Length:** Under 160 characters
- **Keywords:** "nicotine pouches Ireland", "tobacco-free", specific flavors/strengths
- **Call to Action:** "Free delivery over €150", "18+ only"

### 3. Canonical URLs
All pages have canonical URLs to prevent duplicate content issues.

### 4. Open Graph & Twitter Cards
- Proper OG tags for social sharing
- 1200x630px images for optimal display
- Twitter large image cards configured

### 5. Structured Data (JSON-LD)
- **Organization Schema:** Business information
- **Local Business Schema:** Irish market targeting
- **Product Schema:** Rich snippets in search results
- **Breadcrumb Schema:** Enhanced navigation in SERPs
- **FAQ Schema:** Featured snippet opportunities

### 6. Keywords
- **Primary:** nicotine pouches Ireland, tobacco free pouches Ireland
- **Secondary:** Product-specific (e.g., "cool mint nicotine pouches Ireland")
- **Long-tail:** Strength-specific, flavor-specific combinations

## Key SEO Metrics

Based on the SEO plan targets:

### Month 1
- Lighthouse SEO score: 95+
- All meta tags properly configured
- Structured data implemented

### Month 3
- Organic traffic: 1,000+ visitors/month
- Keywords in top 50: 20+

### Month 6
- Organic traffic: 5,000+ visitors/month
- Keywords #1-3: 5+ (including "nicotine pouches Ireland")
- Domain Authority: 30+

## Technical Implementation

### Next.js 15 App Router
This implementation uses Next.js 15's App Router Metadata API, which is different from the `next-seo` package used in Pages Router.

**Key differences:**
- Use `export const metadata: Metadata` instead of `<NextSeo>` component
- Metadata is static by default, use `generateMetadata()` for dynamic pages
- JSON-LD is added via `<script>` tags in components

### Locale Configuration
- HTML lang attribute: `en-IE`
- Open Graph locale: `en_IE`
- All content targeted at Irish market (€ currency, Irish references)

## Monitoring & Testing

### Tools
- **Google Search Console:** Track impressions, clicks, rankings
- **Lighthouse:** Test SEO score (target: 95+)
- **Schema Validator:** https://validator.schema.org/
- **Rich Results Test:** https://search.google.com/test/rich-results

### Regular Audits
Run these commands to test SEO:

```bash
# Lighthouse audit
npx lighthouse https://puxx.ie --output=html --output-path=./audits/homepage.html

# Test structured data
curl https://puxx.ie | grep -o 'application/ld+json'
```

## Related Documentation

- Full SEO Plan: `/docs/planning/PUXX-Ireland-SEO-Plan.md`
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org: https://schema.org/

## Next Steps

1. Create OG image at `/public/og-image.jpg` (1200x630px)
2. Add FAQ section to homepage for FAQ schema
3. Implement product-specific metadata on all product pages
4. Set up Google Search Console and submit sitemap
5. Monitor rankings and adjust keywords as needed
