# PUXX Ireland Asset Audit

**Audit Date:** December 12, 2025
**Total Images Found:** 139

## Asset Categories

### 1. Branding Assets (18 files)
**Location:** `assets/oldweb-images/branding/` + `assets/logo/`

#### Logos
- **White Logo (PRIMARY):**
  - `PUXX-LOGO-LONG-WHITE.png` (Original, multiple sizes: 300x90, 600x180, 650x195, 768x231, 1024x307)
  - **Status:** Multiple duplicates at different sizes
  - **Recommendation:** Keep original, generate responsive sizes via optimization

- **Black Logo:**
  - `PUXX-LOGO-LONG-BLACK.png` (Original)
  - **Status:** Single file
  - **Recommendation:** Keep, optimize to WebP

- **Cropped Logo:**
  - `Cropped-Puxx-1.jpg` (Multiple sizes: 300x110, 600x221, 650x239, 768x283, 1024x377)
  - **Status:** Multiple duplicates
  - **Recommendation:** Keep original only

#### Favicons
- `PUXX-FAVICON.jpg` (Original)
- `cropped-PUXX-FAVICON-*.jpg` (32x32, 180x180, 192x192, 270x270)
- **Status:** Multiple favicon sizes
- **Recommendation:** Convert to proper favicon formats (ico, png) with Next.js metadata

### 2. Marketing Assets (11 files)
**Location:** `assets/oldweb-images/marketing/`

- `BLACK-POUCHES-WORLDWIDE.png` - Marketing graphic
- `puxx-banner-fruit.jpg` - Hero banner with fruit
- `puxxbanner.jpg` - General banner
- `why-poster-puxx.jpg` - Why PUXX poster
- `puxx-why.png` (Original + sizes: 226x300, 490x650, 600x797, 768x1020, 771x1024)
- `Trading-Platform-Features-BG.webp` - Background graphic
- **Status:** Mix of marketing materials, some with duplicates
- **Recommendation:** Optimize all, categorize by use case

### 3. Graphics/SVGs (6 files)
**Location:** `assets/oldweb-images/graphics/`

- `image.svg` through `image (5).svg`
- **Status:** Generic SVG files, need better naming
- **Recommendation:** Rename descriptively, optimize SVGs

### 4. Product Images (103 files)
**Location:** `assets/oldweb-images/products/`

**Note:** Products are stored on Supabase. These are legacy images.

#### Flavors (13 products):
Each product has 7 size variants (100x100, 150x150, 300x300, 600x600, 650x650, 768x768, original)

1. Blueberry
2. Grape
3. Medium-Puxx-Applemint-6mg
4. Peach
5. puxcherry16mg
6. puxxcola16mg
7. puxxcoolmint22mg
8. puxxperpermint22mg
9. puxxspearmint22mg
10. puxxwatermelon16mg
11. Raspberry
12. Strawberry
13. UK-Citrus-16mg
14. wintergreen

**Status:** Extreme duplication (91 duplicate files)
**Recommendation:** Archive - products now on Supabase

### 5. Miscellaneous (1 file)
**Location:** `assets/oldweb-images/misc/`

- `17985860-Converted-e1741036962935.png`
- **Status:** Unknown purpose
- **Recommendation:** Verify usage, archive if not needed

## Optimization Priorities

### High Priority (Active Use)
1. White Logo - Used throughout site
2. Black Logo - Used for light backgrounds
3. Hero banners - Above-fold content
4. Marketing materials - Landing pages

### Medium Priority (Occasional Use)
1. SVG graphics - Icons/illustrations
2. Background images

### Low Priority (Archive)
1. Product images - Now on Supabase
2. Multiple logo sizes - Will be regenerated
3. Old favicon sizes - Will use Next.js metadata

## File Size Analysis

### Before Optimization (Estimated)
- Logos: ~500KB total
- Marketing: ~2MB total
- Products: ~15MB total (legacy)
- Graphics: ~100KB total
- **Total:** ~17.6MB

### After Optimization (Target)
- Logos: ~150KB (WebP conversion)
- Marketing: ~600KB (WebP + compression)
- Products: Archive (not needed)
- Graphics: ~80KB (SVG optimization)
- **Target Total:** ~830KB (95% reduction)

## Recommended Public Structure

```
public/
  images/
    logo/
      puxx-white.webp (original)
      puxx-white-sm.webp (480px)
      puxx-white-md.webp (768px)
      puxx-black.webp (original)
      puxx-black-sm.webp (480px)
      puxx-black-md.webp (768px)
    hero/
      banner-fruit.webp (multiple sizes)
      banner-general.webp (multiple sizes)
    marketing/
      pouches-worldwide.webp
      why-puxx.webp
      why-poster.webp
    graphics/
      [descriptive-names].svg (optimized)
    backgrounds/
      trading-platform.webp
    placeholders/
      product-placeholder.webp
```

## Duplicate Elimination Strategy

### Logos
- Keep: 2 original files (white, black)
- Remove: 14 size variants
- **Savings:** 87% file reduction

### Products
- Keep: None (archived - using Supabase)
- Remove: All 103 files
- **Savings:** 100% file reduction

### Marketing
- Keep: 6 original files
- Remove: 5 size variants
- **Savings:** 45% file reduction

## Next Steps

1. Create optimization script
2. Process high-priority images
3. Archive product images
4. Rename and optimize SVGs
5. Generate responsive sizes
6. Create image constants
7. Build component library
8. Document usage patterns
