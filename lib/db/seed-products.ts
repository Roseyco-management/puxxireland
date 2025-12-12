/**
 * Database Seeding Script for PUXX Ireland Products
 * Seeds categories and products into the database
 *
 * Usage: pnpm tsx lib/db/seed-products.ts
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { categories, products, productCategories } from './schema';
import { productsSeedData } from './seed-data/products';

// Initialize database connection
const connectionString = process.env.POSTGRES_URL!;

if (!connectionString) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Starting PUXX Ireland product seeding...\n');

  try {
    // 1. Create "Nicotine Pouches" category
    console.log('📦 Creating category: Nicotine Pouches');
    const [category] = await db
      .insert(categories)
      .values({
        name: 'Nicotine Pouches',
        slug: 'nicotine-pouches',
        description:
          'Premium tobacco-free nicotine pouches in 14 delicious flavors. Available in 6mg, 16mg, 20mg, and 22mg strengths. Discreet, clean, and satisfying.',
        displayOrder: 1,
      })
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: 'Nicotine Pouches',
          description:
            'Premium tobacco-free nicotine pouches in 14 delicious flavors. Available in 6mg, 16mg, 20mg, and 22mg strengths. Discreet, clean, and satisfying.',
          displayOrder: 1,
        },
      })
      .returning();

    console.log(`✅ Category created: ${category.name} (ID: ${category.id})\n`);

    // 2. Get Supabase URL for image paths
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      console.warn(
        '⚠️  NEXT_PUBLIC_SUPABASE_URL not set. Using relative image paths.'
      );
    }

    // 3. Insert all products
    console.log('🛍️  Inserting 14 PUXX products...\n');

    const insertedProducts = [];

    for (const productData of productsSeedData) {
      // Construct full image URL if Supabase URL is available
      const imageUrl = supabaseUrl
        ? `${supabaseUrl}/storage/v1/object/public/product-images/${productData.image_url}`
        : `/images/products/${productData.image_url}`;

      // Generate SKU from slug
      const sku = `PUXX-${productData.slug.toUpperCase()}`;

      const [insertedProduct] = await db
        .insert(products)
        .values({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          price: productData.price.toFixed(2),
          sku: sku,
          nicotineStrength: productData.nicotine_strength,
          flavor: productData.flavor,
          pouchesPerCan: 20, // All PUXX products have 20 pouches per can
          ingredients: productData.ingredients,
          usageInstructions: productData.usage_instructions,
          imageUrl: imageUrl,
          stockQuantity: productData.stock_quantity,
          isActive: productData.is_active,
          isFeatured: productData.is_featured,
          metaTitle: productData.meta_title,
          metaDescription: productData.meta_description,
        })
        .onConflictDoUpdate({
          target: products.slug,
          set: {
            name: productData.name,
            description: productData.description,
            price: productData.price.toFixed(2),
            nicotineStrength: productData.nicotine_strength,
            flavor: productData.flavor,
            ingredients: productData.ingredients,
            usageInstructions: productData.usage_instructions,
            imageUrl: imageUrl,
            stockQuantity: productData.stock_quantity,
            isActive: productData.is_active,
            isFeatured: productData.is_featured,
            metaTitle: productData.meta_title,
            metaDescription: productData.meta_description,
          },
        })
        .returning();

      insertedProducts.push(insertedProduct);
      console.log(
        `  ✅ ${insertedProduct.name} (${insertedProduct.nicotineStrength}) - €${insertedProduct.price}`
      );
    }

    console.log(`\n✅ Inserted ${insertedProducts.length} products\n`);

    // 4. Link all products to the "Nicotine Pouches" category
    console.log('🔗 Linking products to category...\n');

    for (const product of insertedProducts) {
      await db
        .insert(productCategories)
        .values({
          productId: product.id,
          categoryId: category.id,
        })
        .onConflictDoNothing();
    }

    console.log(
      `✅ Linked ${insertedProducts.length} products to "${category.name}" category\n`
    );

    // 5. Display summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎉 Database seeding completed successfully!');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('Summary:');
    console.log(`  📦 Categories: 1`);
    console.log(`  🛍️  Products: ${insertedProducts.length}`);
    console.log(`  🔗 Product-Category Links: ${insertedProducts.length}`);
    console.log('');
    console.log('Featured Products:');
    insertedProducts
      .filter((p) => p.isFeatured)
      .forEach((p) => {
        console.log(`  ⭐ ${p.name} (${p.nicotineStrength})`);
      });
    console.log('');
    console.log('Flavor Breakdown:');
    console.log('  🌿 Mint varieties: Cool Mint, Spearmint, Peppermint');
    console.log('  🍓 Fruit varieties: Cherry, Watermelon, Strawberry, Raspberry,');
    console.log('                      Blueberry, Grape, Peach');
    console.log('  🍋 Citrus varieties: Citrus');
    console.log('  🥤 Unique varieties: Cola');
    console.log('  ❄️  Classic varieties: Wintergreen');
    console.log('  🍏 Hybrid varieties: Applemint');
    console.log('');
    console.log('Strength Options:');
    console.log('  • 6mg (Mild): Applemint');
    console.log('  • 16mg (Medium): Cherry, Watermelon, Cola, Citrus,');
    console.log('                   Strawberry, Raspberry, Blueberry, Grape, Peach');
    console.log('  • 20mg (Strong): Wintergreen');
    console.log('  • 22mg (Extra Strong): Cool Mint, Spearmint, Peppermint');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════\n');

    // 6. Close database connection
    await client.end();
    console.log('✅ Database connection closed\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    await client.end();
    process.exit(1);
  }
}

// Run the seed function
seed();
