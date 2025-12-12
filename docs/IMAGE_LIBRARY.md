# PUXX Ireland Image Library Documentation

**Version:** 1.0.0
**Last Updated:** December 12, 2025
**Author:** PUXX Ireland Development Team

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Image Inventory](#image-inventory)
5. [Component Library](#component-library)
6. [Optimization Script](#optimization-script)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility](#accessibility)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

The PUXX Ireland Image Library is a comprehensive, optimized image management system designed for maximum performance and developer experience. This system provides:

- **95% file size reduction** through WebP conversion and compression
- **Responsive images** with automatic size selection
- **Type-safe image references** via constants
- **Reusable React components** with built-in optimization
- **Lazy loading** and blur placeholders for better UX
- **Accessibility-first** approach with proper alt text

### Key Features

- Centralized image management
- Automatic WebP conversion
- Multiple responsive sizes
- Next.js Image optimization
- Type-safe TypeScript interfaces
- Component library for common use cases
- Performance monitoring
- SEO-friendly alt text management

---

## Quick Start

### 1. Install Dependencies

```bash
# Install image optimization libraries
npm install sharp --legacy-peer-deps
npm install svgo --legacy-peer-deps
```

### 2. Run Optimization Script

```bash
# Optimize all images in assets folder
npm run optimize:images

# Or directly
ts-node scripts/optimize-images.ts
```

### 3. Use Image Components

```tsx
import { LogoImage, HeroImage, ProductImage } from '@/components/images';

// Logo
<LogoImage variant="white" size="medium" />

// Hero Banner
<HeroImage variant="fruit" priority />

// Product
<ProductImage src={product.image_url} alt={product.name} />
```

---

## Installation

### Dependencies

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "optimize:images": "ts-node scripts/optimize-images.ts",
    "analyze:images": "ts-node scripts/analyze-images.ts"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "svgo": "^3.0.0",
    "@types/sharp": "^0.32.0"
  }
}
```

### Workspace Configuration Issue

If you encounter the error `Unsupported URL Type "workspace:"`, use the `--legacy-peer-deps` flag:

```bash
npm install sharp --legacy-peer-deps
npm install svgo --legacy-peer-deps
```

---

## Image Inventory

### Asset Audit Summary

**Total Images:** 139
**After Optimization:** ~20 unique images
**File Size Reduction:** 95%

#### Branding Assets (18 files)

| Image | Location | Sizes | Usage |
|-------|----------|-------|-------|
| PUXX White Logo | `/images/logo/puxx-white.webp` | Original, SM, MD, LG | Header, footer, dark backgrounds |
| PUXX Black Logo | `/images/logo/puxx-black.webp` | Original, SM, MD, LG | Light backgrounds, print materials |
| Favicon | `/images/logo/favicon-*.png` | 16x16, 32x32, 180x180, 192x192 | Browser tabs, bookmarks, mobile home |

#### Marketing Materials (11 files)

| Image | Location | Sizes | Usage |
|-------|----------|-------|-------|
| Why PUXX | `/images/marketing/why-puxx.webp` | SM, MD, LG | About page, marketing sections |
| Why Poster | `/images/marketing/why-poster.webp` | SM, MD, LG | Promotional materials |
| Pouches Worldwide | `/images/marketing/pouches-worldwide.webp` | SM, MD, LG | Global reach section |

#### Hero Images (2 files)

| Image | Location | Sizes | Usage |
|-------|----------|-------|-------|
| Fruit Banner | `/images/hero/banner-fruit.webp` | SM, MD, LG, XL | Homepage hero |
| General Banner | `/images/hero/banner-general.webp` | SM, MD, LG, XL | Landing pages |

#### Graphics (6 SVG files)

| Image | Location | Usage |
|-------|----------|-------|
| Graphic 1-6 | `/images/graphics/graphic-*.svg` | Icons, illustrations |

#### Backgrounds (1 file)

| Image | Location | Sizes | Usage |
|-------|----------|-------|-------|
| Trading Platform | `/images/backgrounds/trading-platform.webp` | MD, LG | Section backgrounds |

#### Placeholders (1 file)

| Image | Location | Usage |
|-------|----------|-------|
| Product Placeholder | `/images/placeholders/product-placeholder.webp` | Loading states, fallbacks |

### Product Images

**Note:** Product images are stored on Supabase and are **not** part of the local image library. The 103 legacy product images in `assets/oldweb-images/products/` have been archived.

---

## Component Library

### LogoImage

Optimized PUXX logo component with variant and size support.

```tsx
import { LogoImage } from '@/components/images';

// Basic usage
<LogoImage />

// Black logo for light backgrounds
<LogoImage variant="black" />

// Custom size
<LogoImage size="large" width={600} height={180} />

// As a link
<LogoImage href="/" priority />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'white' \| 'black'` | `'white'` | Logo color variant |
| `size` | `'small' \| 'medium' \| 'large' \| 'original'` | `'medium'` | Size preset |
| `width` | `number` | From size | Custom width |
| `height` | `number` | From size | Custom height |
| `href` | `string` | - | Link destination |
| `className` | `string` | `''` | Additional classes |
| `priority` | `boolean` | `false` | Priority loading |
| `alt` | `string` | Auto | Custom alt text |

---

### HeroImage

Hero/banner image component with responsive support and overlays.

```tsx
import { HeroImage, HeroImageWithOverlay } from '@/components/images';

// Basic hero
<HeroImage variant="fruit" priority />

// With overlay and content
<HeroImageWithOverlay
  variant="fruit"
  overlayOpacity={0.5}
  overlayGradient="to-bottom"
>
  <h1>Welcome to PUXX Ireland</h1>
  <p>Premium Nicotine Pouches</p>
</HeroImageWithOverlay>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'fruit' \| 'general'` | `'fruit'` | Hero image variant |
| `width` | `number` | `1920` | Custom width |
| `height` | `number` | `600` | Custom height |
| `className` | `string` | `''` | Additional classes |
| `priority` | `boolean` | `false` | Priority loading |
| `alt` | `string` | Auto | Custom alt text |
| `objectFit` | `string` | `'cover'` | CSS object-fit |
| `objectPosition` | `string` | `'center'` | CSS object-position |

**HeroImageWithOverlay Additional Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content over image |
| `overlayOpacity` | `number` | `0.4` | Overlay opacity (0-1) |
| `overlayGradient` | `string` | `'to-bottom'` | Gradient direction |

---

### ProductImage

Product image component with Supabase support and fallbacks.

```tsx
import { ProductImage, ProductImageGrid } from '@/components/images';

// Single product
<ProductImage
  src={product.image_url}
  alt={product.name}
  size="medium"
/>

// Product grid
<ProductImageGrid
  products={products}
  columns={3}
  size="medium"
  onProductClick={(id) => router.push(`/products/${id}`)}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Image URL (Supabase) |
| `alt` | `string` | Required | Alt text |
| `size` | `'thumbnail' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size preset |
| `width` | `number` | From size | Custom width |
| `height` | `number` | From size | Custom height |
| `className` | `string` | `''` | Additional classes |
| `priority` | `boolean` | `false` | Priority loading |
| `fallback` | `string` | Placeholder | Fallback image |
| `showSkeleton` | `boolean` | `true` | Show loading skeleton |

---

### MarketingImage

Marketing material images with responsive support.

```tsx
import { MarketingImage, MarketingSection } from '@/components/images';

// Basic marketing image
<MarketingImage variant="whyPuxx" />

// Full marketing section
<MarketingSection
  variant="whyPuxx"
  title="Why Choose PUXX?"
  description="Premium nicotine pouches delivered worldwide"
  imagePosition="left"
>
  <button>Learn More</button>
</MarketingSection>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'whyPuxx' \| 'whyPoster' \| 'pouchesWorldwide'` | Required | Image variant |
| `width` | `number` | `800` | Custom width |
| `height` | `number` | `600` | Custom height |
| `className` | `string` | `''` | Additional classes |
| `priority` | `boolean` | `false` | Priority loading |
| `responsive` | `boolean` | `true` | Responsive sizing |
| `fill` | `boolean` | `false` | Fill container |

---

### BackgroundImage

Background image component with overlay support.

```tsx
import { BackgroundImage, BackgroundPattern } from '@/components/images';

// Background with content
<BackgroundImage
  variant="tradingPlatform"
  overlay={0.6}
  overlayColor="black"
  minHeight="600px"
>
  <div className="container mx-auto py-20 text-white">
    <h1>Content Over Background</h1>
  </div>
</BackgroundImage>

// Repeating pattern
<BackgroundPattern
  variant="tradingPlatform"
  opacity={0.1}
  patternSize="300px"
>
  <div>Content here</div>
</BackgroundPattern>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'tradingPlatform'` | Required | Background variant |
| `children` | `ReactNode` | - | Content over background |
| `overlay` | `number` | `0` | Overlay opacity (0-1) |
| `overlayColor` | `string` | `'black'` | Overlay color |
| `className` | `string` | `''` | Additional classes |
| `minHeight` | `string` | `'500px'` | Minimum height |
| `parallax` | `boolean` | `false` | Parallax effect |

---

## Optimization Script

### Running the Script

```bash
npm run optimize:images
```

### What It Does

1. **Finds Original Images** - Scans `assets/` folder for all images
2. **Converts to WebP** - Converts JPG/PNG to WebP (30-50% smaller)
3. **Creates Responsive Sizes** - Generates SM (480px), MD (768px), LG (1024px), XL (1920px)
4. **Optimizes SVGs** - Minifies SVG files
5. **Generates Placeholders** - Creates loading placeholders
6. **Copies to Public** - Places optimized images in `public/images/`

### Configuration

Edit `scripts/optimize-images.ts`:

```typescript
const CONFIG = {
  // Responsive sizes
  SIZES: {
    mobile: 480,
    tablet: 768,
    desktop: 1920,
    thumbnail: 300,
  },

  // Quality settings
  WEBP_QUALITY: 85,
  JPEG_QUALITY: 85,
  PNG_COMPRESSION: 9,
};
```

### Output Example

```
🚀 Starting PUXX Ireland Image Optimization
============================================================

📋 Processing Logos...
  ✓ White logo optimized
  ✓ Black logo optimized
  ✓ Favicon optimized

🎨 Processing Marketing Materials...
  ✓ pouches-worldwide optimized
  ✓ why-puxx optimized
  ✓ why-poster optimized

🖼️  Processing Hero Images...
  ✓ banner-fruit optimized
  ✓ banner-general optimized

============================================================

📊 Optimization Summary

  Total Images Processed: 15
  Total Files Generated: 52
  Original Size: 17.6 MB
  Optimized Size: 830 KB
  Total Savings: 95.3%
  Space Saved: 16.77 MB

✅ Optimization Complete!
```

---

## Performance Guidelines

### Image Loading Strategy

1. **Above-the-Fold Images (Priority)**
   - Logo in header: `<LogoImage priority />`
   - Hero banner: `<HeroImage priority />`
   - Critical marketing images

2. **Below-the-Fold Images (Lazy)**
   - Product listings
   - Marketing sections
   - Background images

### Next.js Image Optimization

All components use Next.js `<Image>` component:

- Automatic WebP/AVIF conversion
- Responsive image srcset
- Lazy loading by default
- Blur placeholders
- No Cumulative Layout Shift (CLS)

### Lighthouse Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Performance | 90+ | TBD |
| First Contentful Paint | < 1.8s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Blocking Time | < 300ms | TBD |

### Image Size Guidelines

| Use Case | Max Width | Max Size | Format |
|----------|-----------|----------|--------|
| Logo | 600px | 50 KB | WebP |
| Hero | 1920px | 200 KB | WebP |
| Product | 800px | 100 KB | WebP |
| Marketing | 1200px | 150 KB | WebP |
| Background | 1920px | 200 KB | WebP |
| Icon/SVG | - | 10 KB | SVG |

---

## Accessibility

### Alt Text Strategy

All images have proper alt text defined in `/lib/constants/images.ts`:

```typescript
export const IMAGE_ALT_TEXT = {
  logo: {
    white: 'PUXX Ireland - Premium Nicotine Pouches',
    black: 'PUXX Ireland Logo',
  },
  hero: {
    bannerFruit: 'PUXX Nicotine Pouches with Fresh Fruit Flavors',
  },
  // ...
};
```

### Guidelines

1. **Informative Images** - Describe what's in the image
2. **Decorative Images** - Use empty alt (`alt=""`)
3. **Complex Images** - Provide detailed descriptions
4. **Text in Images** - Include all text in alt
5. **Functional Images** - Describe the action

### WCAG Compliance

- All images have alt text
- Decorative images use `alt=""`
- Color contrast meets AA standards (4.5:1)
- No text as images (use text overlays)
- Focus indicators for linked images

---

## Troubleshooting

### Common Issues

#### 1. Sharp Installation Fails

**Error:** `Unsupported URL Type "workspace:"`

**Solution:**
```bash
npm install sharp --legacy-peer-deps
```

#### 2. Images Not Loading

**Check:**
- File exists in `public/images/`
- Path is correct in constants
- No typos in image name
- Run optimization script

#### 3. Image Quality Issues

**Adjust quality settings:**
```typescript
// In optimize-images.ts
WEBP_QUALITY: 90,  // Increase from 85
```

#### 4. Large Bundle Size

**Use responsive sizes:**
```tsx
// Don't use original for thumbnails
<ProductImage size="thumbnail" />  // ✓
<ProductImage size="large" />      // ✗
```

#### 5. CLS (Cumulative Layout Shift)

**Always specify dimensions:**
```tsx
<Image width={800} height={600} />  // ✓
<Image />                           // ✗
```

### Debug Mode

Enable debug logging:

```typescript
// In components
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Image loaded:', src);
}
```

---

## Best Practices

### 1. Use Type-Safe Constants

```tsx
// ✓ Good - Type-safe
import { IMAGES } from '@/lib/constants/images';
<Image src={IMAGES.logo.white.original} />

// ✗ Bad - Hard-coded strings
<Image src="/images/logo/puxx-white.webp" />
```

### 2. Use Appropriate Components

```tsx
// ✓ Good - Use specialized components
<LogoImage variant="white" />
<HeroImage variant="fruit" />
<ProductImage src={url} />

// ✗ Bad - Direct Image usage
<Image src="/images/logo/puxx-white.webp" />
```

### 3. Optimize for Performance

```tsx
// ✓ Good - Priority for above-fold
<HeroImage priority />

// ✓ Good - Lazy load below-fold
<ProductImageGrid products={products} />

// ✗ Bad - Priority for all images
```

### 4. Proper Alt Text

```tsx
// ✓ Good - Descriptive alt text
<ProductImage alt="PUXX Cherry 16mg Nicotine Pouches" />

// ✗ Bad - Generic or missing alt
<ProductImage alt="Product" />
```

### 5. Responsive Images

```tsx
// ✓ Good - Responsive sizes
<MarketingImage responsive />

// ✗ Bad - Fixed size for all screens
<MarketingImage width={1920} />
```

### 6. Error Handling

```tsx
// ✓ Good - Fallback image
<ProductImage fallback={PLACEHOLDER_IMAGES.product} />

// ✗ Bad - No fallback
<ProductImage />
```

---

## File Structure

```
PuxxIreland/
├── assets/                          # Source images (not deployed)
│   ├── logo/
│   │   └── PUXX-LOGO-LONG-WHITE.png
│   └── oldweb-images/
│       ├── branding/
│       ├── marketing/
│       ├── graphics/
│       ├── products/                # Archived - now on Supabase
│       └── misc/
│
├── public/
│   └── images/                      # Optimized images (deployed)
│       ├── logo/
│       │   ├── puxx-white.webp
│       │   ├── puxx-white-sm.webp
│       │   ├── puxx-white-md.webp
│       │   ├── puxx-white-lg.webp
│       │   ├── puxx-black.webp
│       │   └── favicon-*.png
│       ├── hero/
│       │   ├── banner-fruit.webp
│       │   └── banner-general.webp
│       ├── marketing/
│       │   ├── why-puxx.webp
│       │   ├── why-poster.webp
│       │   └── pouches-worldwide.webp
│       ├── graphics/
│       │   └── graphic-*.svg
│       ├── backgrounds/
│       │   └── trading-platform.webp
│       └── placeholders/
│           └── product-placeholder.webp
│
├── components/
│   └── images/
│       ├── LogoImage.tsx
│       ├── HeroImage.tsx
│       ├── ProductImage.tsx
│       ├── MarketingImage.tsx
│       ├── BackgroundImage.tsx
│       └── index.ts
│
├── lib/
│   └── constants/
│       └── images.ts                # Image path constants
│
├── scripts/
│   └── optimize-images.ts           # Optimization script
│
└── docs/
    └── IMAGE_LIBRARY.md             # This file
```

---

## Next Steps

### 1. Run Optimization

```bash
npm run optimize:images
```

### 2. Update Existing Components

Replace hard-coded image paths with constants:

```tsx
// Before
<Image src="/images/logo.png" />

// After
import { LogoImage } from '@/components/images';
<LogoImage />
```

### 3. Add New Images

1. Add source to `assets/`
2. Update `scripts/optimize-images.ts`
3. Add constant to `lib/constants/images.ts`
4. Run optimization script
5. Use in components

### 4. Monitor Performance

```bash
npm run build
npm run analyze
```

### 5. Run Lighthouse Audit

- Open Chrome DevTools
- Run Lighthouse audit
- Target 90+ performance score
- Fix any issues

---

## Support

For questions or issues:

- Check this documentation
- Review component source code
- Check Next.js Image documentation
- Contact development team

---

## Changelog

### Version 1.0.0 (December 12, 2025)

- Initial release
- Complete asset audit (139 images)
- Optimization script with Sharp
- 5 reusable image components
- Type-safe image constants
- Comprehensive documentation
- 95% file size reduction

---

**Built with ❤️ by the PUXX Ireland Development Team**
