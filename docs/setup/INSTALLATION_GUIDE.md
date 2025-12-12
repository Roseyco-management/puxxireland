# PUXX Ireland Image Library - Installation Guide

## Quick Start

Follow these steps to set up and use the optimized image library.

---

## Step 1: Install Dependencies

Due to workspace configuration issues in the project, use the `--legacy-peer-deps` flag:

```bash
npm install sharp --legacy-peer-deps
npm install svgo --legacy-peer-deps
npm install @types/sharp --legacy-peer-deps --save-dev
```

### Verify Installation

```bash
node -e "console.log(require('sharp'))"
```

If you see output without errors, Sharp is installed correctly.

---

## Step 2: Add NPM Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "optimize:images": "ts-node scripts/optimize-images.ts",
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Step 3: Run Image Optimization

This will process all images in the `assets/` folder and create optimized versions in `public/images/`:

```bash
npm run optimize:images
```

### Expected Output

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

🌄 Processing Backgrounds...
  ✓ Background optimized

✨ Processing SVG Graphics...
  ✓ 6 SVG graphics processed

🎭 Generating Placeholders...
  ✓ Product placeholder generated

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

## Step 4: Verify Output

Check that images were created in `public/images/`:

```bash
ls -la public/images/logo/
ls -la public/images/hero/
ls -la public/images/marketing/
```

You should see WebP files like:
- `puxx-white.webp`
- `puxx-white-sm.webp`
- `puxx-white-md.webp`
- etc.

---

## Step 5: Use Image Components

### Import Components

```tsx
import {
  LogoImage,
  HeroImage,
  ProductImage,
  MarketingImage,
  BackgroundImage,
} from '@/components/images';
```

### Use in Your Pages

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      {/* Header Logo */}
      <header className="bg-black py-4">
        <LogoImage variant="white" size="medium" href="/" priority />
      </header>

      {/* Hero Section */}
      <HeroImageWithOverlay variant="fruit" priority overlayOpacity={0.4}>
        <h1 className="text-5xl font-bold">Welcome to PUXX Ireland</h1>
        <p className="text-xl mt-4">Premium Nicotine Pouches</p>
      </HeroImageWithOverlay>

      {/* Marketing Section */}
      <MarketingSection
        variant="whyPuxx"
        title="Why Choose PUXX?"
        description="Premium quality, worldwide delivery, trusted by thousands."
        imagePosition="left"
      >
        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Learn More
        </button>
      </MarketingSection>

      {/* Products */}
      <section className="py-12">
        <ProductImageGrid
          products={products}
          columns={3}
          size="medium"
          onProductClick={(id) => router.push(`/products/${id}`)}
        />
      </section>
    </main>
  );
}
```

---

## Step 6: Configure Next.js

Ensure your `next.config.js` has proper image configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      // Add your Supabase domain for product images
      'your-project.supabase.co',
    ],
  },
};

module.exports = nextConfig;
```

---

## Step 7: Test in Development

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- Logo loads correctly
- Hero banner displays
- Images are responsive
- No console errors

---

## Troubleshooting

### Issue: Sharp Installation Fails

**Error:** `Unsupported URL Type "workspace:"`

**Solution:**
```bash
npm install sharp --legacy-peer-deps
```

### Issue: Images Not Found

**Check:**
1. Run `npm run optimize:images`
2. Verify files exist in `public/images/`
3. Check console for 404 errors
4. Verify import paths are correct

### Issue: TypeScript Errors

**Error:** `Cannot find module '@/components/images'`

**Solution:**
Check `tsconfig.json` has path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Images Load Slowly

**Check:**
1. Are you using `priority` for above-fold images?
2. Are responsive sizes being generated?
3. Is Next.js Image optimization enabled?
4. Run Lighthouse audit to diagnose

---

## Performance Checklist

- [ ] Sharp installed successfully
- [ ] Optimization script runs without errors
- [ ] Images created in `public/images/`
- [ ] Components import correctly
- [ ] Logo displays in header
- [ ] Hero image loads with priority
- [ ] Product images lazy load
- [ ] No console errors
- [ ] Lighthouse Performance > 90
- [ ] No Cumulative Layout Shift (CLS)

---

## Next Steps

1. **Read Full Documentation**: See `docs/IMAGE_LIBRARY.md`
2. **Update Existing Components**: Replace hard-coded image paths
3. **Add New Images**: Follow the workflow in the docs
4. **Run Performance Audit**: Use Chrome Lighthouse
5. **Monitor Bundle Size**: Check Next.js build output

---

## File Structure Reference

```
PuxxIreland/
├── assets/                    # Source images (DON'T delete)
├── public/images/             # Optimized images (generated)
├── components/images/         # React components
├── lib/constants/images.ts    # Image path constants
├── scripts/optimize-images.ts # Optimization script
└── docs/IMAGE_LIBRARY.md      # Full documentation
```

---

## Support

For issues or questions:
- Check `docs/IMAGE_LIBRARY.md`
- Review component source code
- Check Next.js Image documentation: https://nextjs.org/docs/api-reference/next/image

---

**Ready to build? Start with `npm run optimize:images`!**
