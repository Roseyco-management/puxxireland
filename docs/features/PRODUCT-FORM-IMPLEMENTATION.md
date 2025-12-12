# Product Create/Edit Forms - Implementation Guide

## Overview

Complete product management system for the PUXX Ireland Admin Dashboard with full CRUD operations, image uploads, and form validation.

## Features Implemented

### 1. Product Form Components

#### `/components/admin/products/ProductForm.tsx`
Main form component with React Hook Form and Zod validation:
- **Auto-generation features**:
  - SKU auto-generated from product name and strength
  - URL slug auto-generated from product name
  - Meta title and description auto-populated
  - Toggle between auto and manual mode
- **Comprehensive validation** for all fields
- **Real-time field updates** with useEffect hooks
- **Loading states** during submission
- **Error handling** with toast notifications

#### `/components/admin/products/ImageUpload.tsx`
Single image upload with drag-and-drop:
- Drag-and-drop interface using react-dropzone
- File size validation (max 5MB)
- Image format validation (JPG, PNG, WEBP)
- Upload to Supabase Storage
- Live preview with remove option
- Loading state during upload

#### `/components/admin/products/ImageGallery.tsx`
Multiple image gallery with reordering:
- Upload up to 4 gallery images
- Drag-and-drop reordering using @dnd-kit
- Individual image removal
- Image counter display
- Batch upload support
- Preview with image numbers

### 2. Form Pages

#### `/app/(admin)/admin/products/new/page.tsx`
Create new product page:
- Clean layout with ProductForm component
- Metadata configuration
- All form fields initialized to defaults

#### `/app/(admin)/admin/products/[id]/edit/page.tsx`
Edit existing product page:
- Fetches product data from API
- Pre-populates form with existing data
- Handles field name mapping (camelCase to snake_case)
- 404 handling for non-existent products

### 3. API Routes

#### `/app/api/admin/products/route.ts`
**GET** - List products with filtering:
- Search by name or SKU
- Filter by category, status, featured
- Sorting (name, price, stock, created)
- Pagination support
- Returns total count for pagination

**POST** - Create product:
- Full validation with Zod schema
- SKU uniqueness check
- Slug uniqueness check
- Category association
- Returns created product

#### `/app/api/admin/products/[id]/route.ts`
**GET** - Get single product:
- Fetch by ID
- Include category information
- 404 handling

**PUT** - Update product:
- Full validation
- Uniqueness checks (excluding current product)
- Category update
- Returns updated product

**DELETE** - Soft delete product:
- Sets isActive to false
- Preserves data for history

#### `/app/api/admin/products/bulk/route.ts`
**POST** - Bulk operations:
- Actions: activate, deactivate, delete, feature, unfeature
- Multiple product IDs support
- Validation of product existence
- Atomic operations

**DELETE** - Hard delete:
- Permanent deletion
- Cascade delete related records

### 4. Validation Schema

#### `/lib/validations/product.ts`
Comprehensive Zod validation:
- **Basic Info**: name (3-200 chars), SKU (uppercase + numbers), description
- **Pricing**: price > 0, compareAtPrice, stockQuantity >= 0
- **Attributes**: strength, flavor, flavor profile, pouches per can
- **Images**: URL validation, max 4 gallery images
- **SEO**: slug (lowercase + hyphens), metaTitle (60 chars), metaDescription (160 chars)
- **Settings**: isFeatured, isActive booleans

Helper functions:
- `generateSlug()` - Creates URL-friendly slug
- `generateSKU()` - Creates unique SKU
- `generateMetaTitle()` - SEO-optimized title
- `generateMetaDescription()` - SEO-optimized description

### 5. Supabase Integration

#### `/lib/supabase/client.ts`
Browser client for client-side operations

#### `/lib/supabase/server.ts`
Server client with cookie handling for SSR

#### `/lib/supabase/storage.ts`
Image upload utilities:
- `uploadImage()` - Single image upload
- `uploadImages()` - Multiple images upload
- `deleteImage()` - Single image deletion
- `deleteImages()` - Multiple images deletion
- Automatic unique filename generation
- Public URL retrieval

### 6. Database Schema Updates

#### `/lib/db/schema.ts`
Added fields to products table:
- `flavorProfile` - Array of flavor tags
- `reorderPoint` - Stock reorder threshold

## Form Fields

### Basic Information
- **Product Name*** (text, 3-200 chars)
- **SKU*** (text, auto-generated or manual, uppercase)
- **Description*** (textarea, 10-5000 chars)
- **Category*** (select: mint, fruit, specialty)

### Pricing & Inventory
- **Price (EUR)*** (number, > 0)
- **Compare At Price** (number, optional)
- **Stock Quantity*** (integer, >= 0)
- **Reorder Point** (integer, default: 10)

### Product Attributes
- **Nicotine Strength** (select: 6mg, 16mg, 22mg)
- **Flavor** (text, e.g., "Mint", "Berry Blast")
- **Flavor Profile** (multi-select checkboxes)
- **Pouches Per Can** (integer, default: 20)
- **Ingredients** (textarea)
- **Usage Instructions** (textarea)

### Images
- **Main Image*** (single upload, required)
- **Gallery Images** (up to 4, drag to reorder)

### SEO
- **URL Slug*** (auto-generated from name)
- **Meta Title** (auto-generated, 60 chars max)
- **Meta Description** (auto-generated, 160 chars max)

### Settings
- **Featured Product** (checkbox)
- **Active** (checkbox, default: true)

## Usage

### Create New Product
```bash
Navigate to: /admin/products/new
```

1. Fill in basic information
2. Set pricing and inventory
3. Select product attributes
4. Upload main image and gallery images
5. Review auto-generated SEO fields
6. Toggle featured/active status
7. Click "Create Product"

### Edit Existing Product
```bash
Navigate to: /admin/products/[id]/edit
```

1. Form loads with existing data
2. Modify any fields as needed
3. Upload new images or keep existing
4. Click "Update Product"

### Bulk Operations
From the products list page:
1. Select multiple products using checkboxes
2. Choose action: Activate, Deactivate, Delete
3. Confirm action

## API Usage Examples

### Create Product
```typescript
const response = await fetch('/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Velo Ice Cool',
    sku: 'VELO-16-ABC1',
    description: 'Cool mint flavor with 16mg nicotine',
    category: 'mint',
    price: 6.99,
    stockQuantity: 100,
    nicotineStrength: '16mg',
    imageUrl: 'https://...',
    slug: 'velo-ice-cool-16mg',
    isActive: true,
  })
});
```

### Update Product
```typescript
const response = await fetch('/api/admin/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    price: 7.99,
    stockQuantity: 150,
  })
});
```

### Bulk Activate
```typescript
const response = await fetch('/api/admin/products/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'activate',
    productIds: [1, 2, 3, 4],
  })
});
```

## Image Upload Flow

1. User drags/selects image file
2. Validate file size (< 5MB) and format
3. Generate unique filename with timestamp
4. Upload to Supabase Storage bucket "products"
5. Get public URL
6. Update form field with URL
7. Display preview

## Validation Rules

### Required Fields
- Product Name
- SKU
- Description
- Category
- Price
- Stock Quantity
- URL Slug
- Main Image (for new products)

### Field Constraints
- Name: 3-200 characters
- SKU: Uppercase letters, numbers, hyphens only
- Description: 10-5000 characters
- Price: > €0.01, max €9,999.99
- Stock: 0-99,999 units
- Slug: Lowercase letters, numbers, hyphens only
- Meta Title: Max 60 characters
- Meta Description: Max 160 characters
- Gallery: Max 4 images

## Error Handling

### Form Validation Errors
- Displayed inline under each field
- Red text with specific error message
- Form submission blocked until resolved

### Upload Errors
- Toast notification for failures
- Specific error messages (file size, format, network)
- Retry option available

### API Errors
- Toast notification with error details
- 400: Validation error
- 404: Product not found
- 409: SKU/slug conflict
- 500: Server error

## Mobile Responsiveness

- Responsive grid layout (1 column mobile, 3 columns desktop)
- Touch-friendly drag-and-drop
- Optimized image previews
- Stacked form sections on mobile
- Full-width inputs on small screens

## Future Enhancements

- [ ] Bulk import from CSV
- [ ] Rich text editor for description
- [ ] Product variants (size, color)
- [ ] Inventory history tracking
- [ ] Low stock email alerts
- [ ] Product duplication
- [ ] Image editing/cropping
- [ ] Multi-language support
- [ ] Product reviews integration
- [ ] Related products picker

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Form Management**: React Hook Form 7.68
- **Validation**: Zod 3.24
- **File Upload**: react-dropzone 14.3
- **Drag & Drop**: @dnd-kit 6.3
- **Database**: Drizzle ORM + PostgreSQL
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner

## File Structure

```
/app
  /(admin)/admin/products
    /page.tsx                     # Product list
    /new/page.tsx                 # Create product
    /[id]/edit/page.tsx          # Edit product
  /api/admin/products
    /route.ts                     # GET (list), POST (create)
    /[id]/route.ts               # GET, PUT, DELETE
    /bulk/route.ts               # Bulk operations

/components/admin/products
  /ProductForm.tsx               # Main form component
  /ProductTable.tsx              # List table component
  /ImageUpload.tsx               # Single image upload
  /ImageGallery.tsx              # Gallery with reorder

/lib
  /validations
    /product.ts                   # Zod schema & helpers
  /supabase
    /client.ts                    # Browser client
    /server.ts                    # Server client
    /storage.ts                   # Upload utilities
  /db
    /schema.ts                    # Database schema
```

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Database
POSTGRES_URL=postgresql://xxx

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Database Migration

After updating schema, run:
```bash
pnpm db:generate  # Generate migration
pnpm db:migrate   # Apply migration
```

## Testing Checklist

- [ ] Create product with all fields
- [ ] Create product with minimum required fields
- [ ] Upload main image
- [ ] Upload multiple gallery images
- [ ] Reorder gallery images
- [ ] Edit existing product
- [ ] Update product images
- [ ] Validate all form fields
- [ ] Test auto-generation (SKU, slug, meta)
- [ ] Test SKU uniqueness validation
- [ ] Test slug uniqueness validation
- [ ] Bulk activate products
- [ ] Bulk deactivate products
- [ ] Delete single product
- [ ] Search products
- [ ] Filter by category
- [ ] Sort products
- [ ] Mobile responsiveness
- [ ] Error handling

## Support

For issues or questions:
- Check validation rules in `/lib/validations/product.ts`
- Review API documentation in route files
- Check console for error messages
- Verify Supabase Storage bucket permissions
