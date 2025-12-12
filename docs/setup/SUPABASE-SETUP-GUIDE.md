# Supabase Setup Guide - PUXX Ireland

This guide walks you through setting up Supabase for the PUXX Ireland e-commerce platform.

## Prerequisites

- GitHub account (for Supabase login)
- Database schema and migrations already generated (in `lib/db/`)

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in the project details:
   - **Name**: `puxx-ireland`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Europe West (London) - closest to Ireland
   - **Pricing Plan**: Free tier is fine for development
6. Click "Create new project"
7. Wait 2-3 minutes for the project to be provisioned

## Step 2: Get Database Connection String

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **Database**
2. Scroll down to "Connection string"
3. Select "URI" tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the database password you created in Step 1

## Step 3: Update Environment Variables

1. Open `/Users/baileybarry/PuxxIreland/.env`
2. Replace the `POSTGRES_URL` with your Supabase connection string:
   ```env
   POSTGRES_URL=postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
   ```
3. Save the file

## Step 4: Run Database Migrations

Now that Supabase is connected, run the migrations to create all tables:

```bash
# Generate migrations (already done, but run again if schema changed)
pnpm db:generate

# Run migrations to create tables
pnpm db:migrate
```

This will create all 15 tables:
- users, teams, team_members, activity_logs, invitations
- profiles, products, categories, product_categories
- cart_items, orders, order_items
- coupons, reviews, newsletter_subscribers

## Step 5: Apply Row Level Security Policies

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Create a new query
4. Copy the contents of `/Users/baileybarry/PuxxIreland/lib/db/rls-policies.sql`
5. Paste it into the SQL Editor
6. Click "Run" to execute the policies

These policies ensure:
- Users can only access their own data (profiles, cart, orders)
- Products are publicly readable but only admins can modify
- Reviews require approval from admins before being public
- Newsletter subscriptions are public but management is admin-only

## Step 6: Configure Authentication

### Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. **Email** should be enabled by default
3. Configure email settings:
   - Confirm email: Enabled (recommended)
   - Double confirm email changes: Enabled
   - Enable email confirmations: Yes

### Enable Google OAuth (Optional)

1. In **Authentication** → **Providers**, find **Google**
2. Click "Enable"
3. Follow the prompts to set up Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret to Supabase
4. Save the configuration

### Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email template
3. Add PUXX branding (emerald green #009A49)
4. Update the company name to "PUXX Ireland"

## Step 7: Create Admin User

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Fill in:
   - **Email**: your admin email
   - **Password**: strong password
   - **Auto Confirm User**: Yes (check this box)
4. Click "Create user"
5. Copy the User ID (UUID format)

### Promote User to Admin

1. Go to **SQL Editor**
2. Run this query (replace `YOUR-USER-ID` with the UUID):
   ```sql
   UPDATE users
   SET role = 'admin'
   WHERE id = (
     SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'
   );
   ```
3. This gives the user admin privileges

## Step 8: Test Database Connection

Run this command to test the connection:

```bash
# This will attempt to connect to the database
pnpm exec tsx -e "import { drizzle } from 'drizzle-orm/postgres-js'; import postgres from 'postgres'; const sql = postgres(process.env.POSTGRES_URL); const db = drizzle(sql); console.log('Database connected successfully!');"
```

If you see "Database connected successfully!", you're all set!

## Step 9: Set up Supabase Storage (Week 1 Day 5)

**Note**: This is for later when we upload product images

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `product-images`
3. Make it **Public**
4. Set up storage policies:
   ```sql
   -- Allow public to read images
   CREATE POLICY "Public can view product images"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'product-images');

   -- Allow admins to upload images
   CREATE POLICY "Admins can upload product images"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'product-images' AND
     is_admin()
   );
   ```

## Troubleshooting

### Connection Refused

- Check that you're using the correct connection string
- Verify the password is correct
- Make sure you're using the "Connection Pooler" URL (port 6543), not the direct connection

### RLS Policies Not Working

- Make sure you've enabled RLS on all tables
- Verify the policies are created by checking **Database** → **Tables** → select table → **Policies** tab
- Check that `auth.uid()` is working (user must be authenticated)

### Migrations Fail

- Check for syntax errors in the schema
- Ensure all foreign keys reference existing tables
- Try running migrations one at a time to identify the issue

## Next Steps

With Supabase configured, you're ready for:
- **Day 3**: Configure Tailwind with Irish green theme
- **Day 4**: Build core website infrastructure
- **Day 5**: Seed product data into database

## Useful Supabase Links

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
