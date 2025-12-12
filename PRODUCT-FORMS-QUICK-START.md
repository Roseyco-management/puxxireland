# Product Forms - Quick Start Guide

## What Was Built

Complete product create/edit forms for PUXX Ireland Admin Dashboard with:
- Full CRUD operations
- Image uploads to Supabase Storage
- Drag-and-drop image reordering
- Auto-generation (SKU, slug, SEO)
- Comprehensive validation
- Bulk operations

## Quick Setup (3 Steps)

### 1. Run Database Migration
```bash
pnpm db:generate
pnpm db:migrate
```

### 2. Setup Supabase Storage
1. Go to Supabase Dashboard → Storage
2. Create bucket: `products`
3. Make bucket public

### 3. Set Environment Variables
Add to `.env`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

## Routes

- `/admin/products` - Product list
- `/admin/products/new` - Create product
- `/admin/products/[id]/edit` - Edit product

## Key Files

### Components
- `/components/admin/products/ProductForm.tsx`
- `/components/admin/products/ImageUpload.tsx`
- `/components/admin/products/ImageGallery.tsx`

### API Routes
- `/app/api/admin/products/route.ts` - List & Create
- `/app/api/admin/products/[id]/route.ts` - Get, Update, Delete
- `/app/api/admin/products/bulk/route.ts` - Bulk operations

### Utilities
- `/lib/validations/product.ts` - Zod schema
- `/lib/supabase/storage.ts` - Image uploads

## Form Fields

**Required:** Name, SKU, Description, Category, Price, Stock, Slug, Main Image

**Optional:** Compare Price, Reorder Point, Strength, Flavor, Flavor Profile, Pouches, Ingredients, Instructions, Gallery Images, Meta Title, Meta Description, Featured, Active

## Auto-Generated Fields

- **SKU**: From name + strength (e.g., "VELO-16-ABC1")
- **Slug**: From name (e.g., "velo-ice-cool")
- **Meta Title**: Name + strength + branding
- **Meta Description**: Product summary + CTA

Toggle between auto/manual mode with buttons.

## Image Upload

- **Main Image**: Required, single upload
- **Gallery**: Up to 4 images, drag to reorder
- **Formats**: JPG, PNG, WEBP
- **Max Size**: 5MB per file
- **Storage**: Supabase Storage bucket "products"

## Validation Rules

- Name: 3-200 chars
- SKU: Uppercase + numbers + hyphens
- Description: 10-5000 chars
- Price: €0.01 - €9,999.99
- Stock: 0-99,999
- Slug: Lowercase + numbers + hyphens
- Meta Title: Max 60 chars
- Meta Description: Max 160 chars

## API Endpoints

### List Products
```bash
GET /api/admin/products
Query: ?search=velo&category=mint&status=active&sort=name&order=asc
```

### Create Product
```bash
POST /api/admin/products
Body: { name, sku, description, category, price, ... }
```

### Get Product
```bash
GET /api/admin/products/1
```

### Update Product
```bash
PUT /api/admin/products/1
Body: { price: 7.99, stockQuantity: 150 }
```

### Delete Product
```bash
DELETE /api/admin/products/1
```

### Bulk Operations
```bash
POST /api/admin/products/bulk
Body: { action: "activate", productIds: [1,2,3] }
```

## Testing

1. Navigate to `/admin/products/new`
2. Fill in product name: "Test Product"
3. Upload an image
4. Click "Create Product"
5. Verify product appears in list
6. Click edit, modify fields
7. Click "Update Product"

## Troubleshooting

**Images not uploading?**
- Check Supabase bucket "products" exists
- Verify bucket is public
- Check file size < 5MB

**Validation errors?**
- Check required fields are filled
- Verify SKU format (UPPERCASE-123)
- Verify slug format (lowercase-123)

**API errors?**
- Check database connection
- Run migrations: `pnpm db:migrate`
- Check server logs

## Documentation

Full docs: `/docs/features/PRODUCT-FORM-IMPLEMENTATION.md`

## Packages Added

```bash
@supabase/ssr@0.8.0
@dnd-kit/core@6.3.1
@dnd-kit/sortable@10.0.0
@dnd-kit/utilities@3.2.2
```

## Features

- ✓ Create/Edit products
- ✓ Image upload with preview
- ✓ Gallery with reordering
- ✓ Auto-generation (SKU, slug, SEO)
- ✓ Comprehensive validation
- ✓ Search & filters
- ✓ Bulk operations
- ✓ Mobile responsive
- ✓ Dark mode
- ✓ Loading states
- ✓ Error handling
- ✓ Toast notifications

## Support

For detailed documentation, see:
- `/docs/features/PRODUCT-FORM-IMPLEMENTATION.md` - Full guide
- `/docs/features/PRODUCT-FORM-SUMMARY.md` - Build summary
- `/docs/features/PRODUCT-FORM-CHECKLIST.md` - Testing checklist

Built with Next.js 15, React Hook Form, Zod, Supabase Storage, and Tailwind CSS.
