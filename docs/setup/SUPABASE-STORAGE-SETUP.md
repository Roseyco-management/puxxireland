# Supabase Storage Setup Guide
## Product Images for PUXX Ireland

This guide explains how to set up Supabase Storage buckets for product images.

---

## 1. Create Storage Bucket

### Via Supabase Dashboard:

1. Go to **Storage** in your Supabase project dashboard
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ **Enabled** (products need to be publicly accessible)
   - **File size limit**: 5 MB (sufficient for optimized product images)
   - **Allowed MIME types**: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`

4. Click **Create bucket**

---

## 2. Upload Product Images

### Option A: Manual Upload (Supabase Dashboard)

1. Open the `product-images` bucket
2. Click **Upload file**
3. Upload all 14 product images from `assets/oldweb-images/products/`:
   - `puxxcoolmint22mg.jpg`
   - `puxxspearmint22mg.jpg`
   - `puxxperpermint22mg.jpg`
   - `puxcherry16mg.jpg`
   - `puxxwatermelon16mg.jpg`
   - `puxxcola16mg.jpg`
   - `UK-Citrus-16mg.jpg`
   - `Strawberry.jpg`
   - `Raspberry.jpg`
   - `Blueberry.jpg`
   - `Grape.jpg`
   - `Peach.jpg`
   - `wintergreen.jpg`
   - `Medium-Puxx-Applemint-6mg.jpg`

### Option B: Programmatic Upload (Script)

Create a script to upload all images:

```typescript
// scripts/upload-product-images.ts
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const productImages = [
  'puxxcoolmint22mg.jpg',
  'puxxspearmint22mg.jpg',
  'puxxperpermint22mg.jpg',
  'puxcherry16mg.jpg',
  'puxxwatermelon16mg.jpg',
  'puxxcola16mg.jpg',
  'UK-Citrus-16mg.jpg',
  'Strawberry.jpg',
  'Raspberry.jpg',
  'Blueberry.jpg',
  'Grape.jpg',
  'Peach.jpg',
  'wintergreen.jpg',
  'Medium-Puxx-Applemint-6mg.jpg',
];

async function uploadProductImages() {
  for (const imageName of productImages) {
    const imagePath = path.join(
      process.cwd(),
      'assets/oldweb-images/products',
      imageName
    );

    // Read the file
    const fileBuffer = fs.readFileSync(imagePath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(imageName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${imageName}:`, error);
    } else {
      console.log(`✅ Uploaded: ${imageName}`);
    }
  }

  console.log('All product images uploaded!');
}

uploadProductImages();
```

Run the script:
```bash
pnpm tsx scripts/upload-product-images.ts
```

---

## 3. Set Up Storage Policies

For public access to product images, ensure these policies are in place:

```sql
-- Allow public read access to product images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated uploads (for admin dashboard)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated updates (for admin dashboard)
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated deletes (for admin dashboard)
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);
```

---

## 4. Get Public URLs

Once uploaded, product image URLs will be:

```
https://[your-project-ref].supabase.co/storage/v1/object/public/product-images/[image-name]
```

Example:
```
https://your-project.supabase.co/storage/v1/object/public/product-images/puxxcoolmint22mg.jpg
```

---

## 5. Update Product Seed Data

In the seeding script, construct full image URLs:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const fullImageUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${product.image_url}`;
```

---

## 6. Environment Variables

Ensure these are set in `.env`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Next Steps

After setting up storage:
1. ✅ Upload all 14 product images
2. Run the database seeding script
3. Verify images are accessible via public URLs
4. Test product display on the website

---

## Troubleshooting

### Images not accessible?
- Check bucket is set to **Public**
- Verify storage policies are in place
- Confirm CORS settings allow your domain

### Upload errors?
- Check file size limits (max 5MB)
- Verify MIME types are allowed
- Ensure service role key has storage permissions

---

**Storage Setup Complete!** ✅
