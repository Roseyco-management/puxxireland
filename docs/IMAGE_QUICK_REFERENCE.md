# PUXX Ireland Image Library - Quick Reference

Quick reference guide for using the image library.

---

## Installation (One-Time Setup)

```bash
npm install sharp svgo @types/sharp --legacy-peer-deps
npm run optimize:images
```

---

## Import Components

```tsx
import {
  LogoImage,
  HeroImage,
  ProductImage,
  MarketingImage,
  BackgroundImage,
} from '@/components/images';
```

---

## Component Cheat Sheet

### LogoImage

```tsx
// White logo (dark backgrounds)
<LogoImage />
<LogoImage variant="white" size="medium" />

// Black logo (light backgrounds)
<LogoImage variant="black" />

// As a link
<LogoImage href="/" priority />

// Custom size
<LogoImage width={400} height={120} />
```

**Sizes:** `small` (200px) | `medium` (400px) | `large` (600px) | `original` (1024px)

---

### HeroImage

```tsx
// Simple hero
<HeroImage variant="fruit" priority />

// With overlay and content
<HeroImageWithOverlay variant="fruit" overlayOpacity={0.5}>
  <h1>Welcome</h1>
</HeroImageWithOverlay>

// Custom height
<HeroImage height={700} />
```

**Variants:** `fruit` | `general`

---

### ProductImage

```tsx
// Single product
<ProductImage src={product.image_url} alt={product.name} />

// Custom size
<ProductImage size="large" />

// Product grid
<ProductImageGrid
  products={products}
  columns={3}
  onProductClick={(id) => router.push(`/products/${id}`)}
/>
```

**Sizes:** `thumbnail` (150px) | `small` (300px) | `medium` (600px) | `large` (800px)

---

### MarketingImage

```tsx
// Marketing image
<MarketingImage variant="whyPuxx" />

// Full section
<MarketingSection
  variant="whyPuxx"
  title="Why Choose PUXX?"
  description="..."
  imagePosition="left"
>
  <button>Learn More</button>
</MarketingSection>
```

**Variants:** `whyPuxx` | `whyPoster` | `pouchesWorldwide`

---

### BackgroundImage

```tsx
// Background with overlay
<BackgroundImage variant="tradingPlatform" overlay={0.6}>
  <div>Content here</div>
</BackgroundImage>

// Repeating pattern
<BackgroundPattern variant="tradingPlatform" opacity={0.1}>
  <div>Content</div>
</BackgroundPattern>
```

**Variants:** `tradingPlatform`

---

## Image Constants

```tsx
import { IMAGES } from '@/lib/constants/images';

// Logo paths
IMAGES.logo.white.original
IMAGES.logo.white.small
IMAGES.logo.black.medium

// Hero paths
IMAGES.hero.bannerFruit.desktop
IMAGES.hero.bannerGeneral.mobile

// Marketing paths
IMAGES.marketing.whyPuxx.tablet
IMAGES.marketing.pouchesWorldwide.original
```

---

## Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `priority` | `boolean` | `false` | Load image immediately (above-fold) |
| `className` | `string` | `''` | Additional CSS classes |
| `alt` | `string` | Auto | Custom alt text |
| `width` | `number` | Auto | Custom width |
| `height` | `number` | Auto | Custom height |

---

## Performance Tips

### Above-the-Fold (Use `priority`)
```tsx
<LogoImage priority />          // Header logo
<HeroImage priority />           // Hero banner
```

### Below-the-Fold (Lazy load)
```tsx
<ProductImageGrid products={products} />  // Product listings
<MarketingImage variant="whyPuxx" />      // Marketing sections
```

---

## Responsive Sizing

### Automatic (Recommended)
```tsx
<MarketingImage responsive />    // Automatically serves correct size
```

### Manual
```tsx
// Mobile
<LogoImage size="small" className="md:hidden" />

// Desktop
<LogoImage size="large" className="hidden md:block" />
```

---

## Error Handling

```tsx
// With fallback image
<ProductImage
  src={product.image_url}
  alt={product.name}
  fallback="/images/placeholders/product-placeholder.webp"
/>

// With loading skeleton
<ProductImage showSkeleton={true} />
```

---

## Accessibility

### Good Alt Text
```tsx
// ✓ Descriptive
<ProductImage alt="PUXX Cherry 16mg Nicotine Pouches" />

// ✗ Generic
<ProductImage alt="Product" />
```

### Decorative Images
```tsx
// Use empty alt for decorative images
<BackgroundImage alt="" />
```

---

## File Paths Reference

```
public/images/
├── logo/
│   ├── puxx-white.webp (original)
│   ├── puxx-white-sm.webp (480px)
│   ├── puxx-white-md.webp (768px)
│   └── puxx-white-lg.webp (1024px)
├── hero/
│   └── banner-fruit[-sm|-md|-lg].webp
├── marketing/
│   └── why-puxx[-sm|-md|-lg].webp
└── placeholders/
    └── product-placeholder.webp
```

---

## Troubleshooting

### Images not loading?
1. Run `npm run optimize:images`
2. Check `public/images/` folder
3. Verify import paths

### TypeScript errors?
```bash
# Restart TypeScript server
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Sharp installation fails?
```bash
npm install sharp --legacy-peer-deps
```

---

## Full Documentation

See `/docs/IMAGE_LIBRARY.md` for complete documentation.

---

## Quick Links

- **Installation Guide:** `/INSTALLATION_GUIDE.md`
- **Usage Examples:** `/examples/ImageUsageExamples.tsx`
- **Component Source:** `/components/images/`
- **Image Constants:** `/lib/constants/images.ts`
- **Optimization Script:** `/scripts/optimize-images.ts`
