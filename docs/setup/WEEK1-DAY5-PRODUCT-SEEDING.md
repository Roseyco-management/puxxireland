# Week 1 Day 5 - Product Data Seeding
## PUXX Ireland - Complete Setup Guide

This document provides step-by-step instructions to complete Week 1 Day 5.

---

## ✅ Completed Tasks

### 1. Product Seed Data Created
- **File**: `lib/db/seed-data/products.ts`
- **Products**: 14 PUXX flavors with complete data
- **Descriptions**: 300+ words for each product
- **Pricing**: All products €15.00
- **Strengths**: 6mg, 16mg, 20mg, 22mg options
- **SEO**: Meta titles, descriptions, and keywords

### 2. Database Seeding Script Created
- **File**: `lib/db/seed-products.ts`
- **Features**:
  - Creates "Nicotine Pouches" category
  - Inserts all 14 products
  - Links products to category
  - Handles upserts (safe to run multiple times)
  - Detailed console output

### 3. Image Upload Script Created
- **File**: `scripts/upload-product-images.ts`
- **Features**:
  - Uploads 14 product images to Supabase Storage
  - Handles multiple image formats (JPG, PNG, WebP)
  - Provides detailed progress and error reporting
  - Safe to run multiple times (upsert mode)

### 4. API Routes Created
- **GET /api/products** - List all products with filtering
- **GET /api/products/[slug]** - Get single product by slug
- **GET /api/categories** - List all categories

### 5. Supabase Storage Documentation
- **File**: `docs/setup/SUPABASE-STORAGE-SETUP.md`
- Complete guide for setting up storage buckets

---

## 🚀 Next Steps to Complete Day 5

### Step 1: Set Up Supabase Project

If you haven't already:

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project (or use existing)
3. Wait for project to finish provisioning

### Step 2: Get Supabase Credentials

From your Supabase project dashboard:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**
   - **service_role key** (⚠️ keep this secret!)

3. Go to **Project Settings** → **Database**
4. Copy the **Connection String** (Transaction mode)
   - Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Step 3: Update Environment Variables

Add to your `.env` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database URL (for Drizzle)
POSTGRES_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### Step 4: Run Database Migrations

Apply the schema to your Supabase database:

```bash
pnpm db:migrate
```

This will create all 15 tables (10 e-commerce + 5 boilerplate).

### Step 5: Apply RLS Policies

Apply Row Level Security policies to Supabase:

1. Go to Supabase Dashboard → **SQL Editor**
2. Open `lib/db/rls-policies.sql`
3. Copy and paste the contents into the SQL Editor
4. Click **Run**

This will set up proper security for all tables.

### Step 6: Create Supabase Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Configure:
   - **Name**: `product-images`
   - **Public bucket**: ✅ **Enabled**
   - **File size limit**: 5 MB
   - **Allowed MIME types**: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`
4. Click **Create bucket**

### Step 7: Upload Product Images

Run the upload script:

```bash
pnpm tsx scripts/upload-product-images.ts
```

**Expected Output:**
```
📤 Starting product image upload to Supabase Storage...

  ✅ Uploaded: puxxcoolmint22mg.jpg (45.23 KB)
  ✅ Uploaded: puxxspearmint22mg.jpg (43.67 KB)
  ...
  ✅ Uploaded: Medium-Puxx-Applemint-6mg.jpg (41.89 KB)

═══════════════════════════════════════════════════════════
📤 Upload Summary
═══════════════════════════════════════════════════════════
✅ Successful uploads: 14
❌ Failed uploads: 0
📊 Total: 14
═══════════════════════════════════════════════════════════

🎉 All product images uploaded successfully!
```

### Step 8: Seed Product Data

Run the product seeding script:

```bash
pnpm tsx lib/db/seed-products.ts
```

**Expected Output:**
```
🌱 Starting PUXX Ireland product seeding...

📦 Creating category: Nicotine Pouches
✅ Category created: Nicotine Pouches (ID: 1)

🛍️  Inserting 14 PUXX products...

  ✅ PUXX Cool Mint (22mg) - €15.00
  ✅ PUXX Spearmint (22mg) - €15.00
  ✅ PUXX Peppermint (22mg) - €15.00
  ✅ PUXX Cherry (16mg) - €15.00
  ✅ PUXX Watermelon (16mg) - €15.00
  ✅ PUXX Cola (16mg) - €15.00
  ✅ PUXX Citrus (16mg) - €15.00
  ✅ PUXX Strawberry (16mg) - €15.00
  ✅ PUXX Raspberry (16mg) - €15.00
  ✅ PUXX Blueberry (16mg) - €15.00
  ✅ PUXX Grape (16mg) - €15.00
  ✅ PUXX Peach (16mg) - €15.00
  ✅ PUXX Wintergreen (20mg) - €15.00
  ✅ PUXX Applemint (6mg) - €15.00

✅ Inserted 14 products

🔗 Linking products to category...

✅ Linked 14 products to "Nicotine Pouches" category

═══════════════════════════════════════════════════════════
🎉 Database seeding completed successfully!
═══════════════════════════════════════════════════════════
```

### Step 9: Verify Data in Supabase

1. Go to Supabase Dashboard → **Table Editor**
2. Check these tables:
   - **categories** - Should have 1 row ("Nicotine Pouches")
   - **products** - Should have 14 rows (all PUXX flavors)
   - **product_categories** - Should have 14 rows (linking products to category)

3. Go to **Storage** → **product-images**
   - Should show 14 image files

### Step 10: Test API Routes

Start the development server:

```bash
pnpm dev
```

Test the API endpoints:

**List all products:**
```
GET http://localhost:3000/api/products
```

**List featured products:**
```
GET http://localhost:3000/api/products?featured=true
```

**Get single product:**
```
GET http://localhost:3000/api/products/cool-mint-22mg
```

**List categories:**
```
GET http://localhost:3000/api/categories
```

---

## 📊 Product Inventory Summary

### By Strength:
- **6mg (Mild)**: 1 product
  - Applemint

- **16mg (Medium)**: 9 products
  - Cherry, Watermelon, Cola, Citrus
  - Strawberry, Raspberry, Blueberry, Grape, Peach

- **20mg (Strong)**: 1 product
  - Wintergreen

- **22mg (Extra Strong)**: 3 products
  - Cool Mint, Spearmint, Peppermint

### By Flavor Category:
- **Mint varieties**: Cool Mint, Spearmint, Peppermint (3)
- **Fruit varieties**: Cherry, Watermelon, Strawberry, Raspberry, Blueberry, Grape, Peach (7)
- **Citrus varieties**: Citrus (1)
- **Unique varieties**: Cola (1)
- **Classic varieties**: Wintergreen (1)
- **Hybrid varieties**: Applemint (1)

### Featured Products:
- PUXX Cool Mint (22mg)
- PUXX Spearmint (22mg)
- PUXX Peppermint (22mg)
- PUXX Cherry (16mg)

---

## 📁 Files Created Today

### Seed Data:
- `lib/db/seed-data/products.ts` - Product data for all 14 flavors

### Scripts:
- `lib/db/seed-products.ts` - Database seeding script
- `scripts/upload-product-images.ts` - Image upload script

### API Routes:
- `app/api/products/route.ts` - Products list endpoint
- `app/api/products/[slug]/route.ts` - Single product endpoint
- `app/api/categories/route.ts` - Categories endpoint

### Documentation:
- `docs/setup/SUPABASE-STORAGE-SETUP.md` - Storage setup guide
- `docs/setup/WEEK1-DAY5-PRODUCT-SEEDING.md` - This file

---

## 🎯 Week 1 Day 5 Checklist

- [x] Create product seed data (14 flavors)
- [x] Write unique descriptions (300+ words each)
- [x] Define flavor profiles
- [x] List ingredients
- [x] Set pricing (€15.00 each)
- [x] Create database seeding script
- [x] Create image upload script
- [x] Create API routes for products
- [ ] Upload product images to Supabase Storage (requires Supabase credentials)
- [ ] Run database seeding script (requires database connection)
- [ ] Verify all products in database

---

## 🎉 Week 1 Complete!

After completing Day 5, you will have:

- ✅ Complete development environment (Day 1)
- ✅ Live database with all 15 tables (Day 2)
- ✅ Irish green theme throughout (Day 3)
- ✅ Professional Header & Footer components (Day 4)
- ✅ All 14 PUXX products seeded and ready (Day 5)

**Next Week**: Week 2 - Homepage & Product Listing Pages

---

## 🐛 Troubleshooting

### "POSTGRES_URL environment variable is not set"
- Check your `.env` file
- Ensure `POSTGRES_URL` is set with correct Supabase connection string
- Restart your terminal/IDE after updating `.env`

### "NEXT_PUBLIC_SUPABASE_URL not set"
- Add to `.env` file
- Must start with `NEXT_PUBLIC_` to be available in browser
- Restart dev server after updating

### Image upload fails
- Verify storage bucket exists and is named `product-images`
- Check bucket is set to **Public**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check image files exist in `assets/oldweb-images/products/`

### Seeding script fails with duplicate key error
- Safe to ignore - script uses upserts
- Products will be updated, not duplicated
- Check Supabase Table Editor to verify data

### API routes return 500 error
- Check database connection is working
- Verify migrations have been run
- Check console for detailed error messages
- Ensure `POSTGRES_URL` is set correctly

---

**Status**: Week 1 Day 5 - Ready for Testing ✅
