# PUXX Ireland Admin Dashboard - Complete Build Guide

**Project:** PUXX Ireland E-commerce Admin Dashboard
**Built With:** Next.js 15, TypeScript, TailAdmin Pro, Supabase, TanStack Table, Recharts
**Theme:** Irish Green (#009A49)
**Date:** December 12, 2025

---

## What Has Been Built

### 1. Core Infrastructure ✅

**Admin Layout System**
- Route group: `app/(admin)` for admin-only pages
- Responsive sidebar with collapsible/expandable states
- Header with search, notifications, theme toggle, user menu
- Mobile-first design with backdrop overlay
- Irish green theme throughout

**Authentication & Security**
- Middleware protection for `/admin/*` routes
- Supabase authentication integration
- Role-based access control (Admin, Manager, Support)
- Automatic redirect to login if unauthorized
- Session refresh on navigation

**Design System**
- Emerald green (#009A49) primary color
- Deep forest green (#00563F) accents
- Shamrock green (#00A86B) highlights
- Consistent component styling
- Dark mode support

### 2. Dashboard Overview ✅

**Real-time Stats**
- Today's revenue, orders, new customers, low stock count
- Stat cards with icons and color coding
- Trend indicators (coming soon)

**Charts & Visualizations**
- Revenue over time (7-day area chart with emerald gradient)
- Sales by category (pie chart)
- Recent orders list (latest 5 with status badges)
- Top products (best sellers with images and revenue)
- Low stock alerts (products needing restock)

**Real-time Features**
- Live order notifications via Supabase Realtime
- Toast notifications with sound
- Auto-refresh on new orders

### 3. Products Management ✅

**Product List**
- TanStack Table with 20 products per page
- Search by name or SKU
- Filter by category (Mint, Fruit, Specialty)
- Filter by status (Active, Inactive)
- Export to CSV
- Bulk actions: Activate, Deactivate, Delete

**Table Features**
- Sortable columns (Name, Price, Stock)
- Row selection with checkboxes
- Color-coded stock levels (red if 0, orange if ≤10)
- Image thumbnails
- Status badges
- Actions per row: View, Edit, Delete

---

## How to Use the Admin Dashboard

### Accessing the Dashboard

1. **URL:** `https://your-domain.com/admin`
2. **Login required:** Users must have role `admin`, `manager`, or `support`
3. **First-time setup:** Create admin user in Supabase:

```sql
-- Update user role to admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### User Roles & Permissions

**Admin (Full Access)**
- Dashboard, Products, Orders, Customers
- Analytics, Marketing, Settings
- User management

**Manager (Operations)**
- Dashboard, Products, Orders, Customers, Analytics
- Cannot access Settings or manage users

**Support (Customer Service)**
- Dashboard (view only)
- Products (view only)
- Orders (view and update status)
- Customers (view only)

### Navigation

**Sidebar Menu:**
- **Dashboard** - Overview stats and charts
- **E-commerce** → Products, Orders, Customers
- **Analytics** - Revenue, Products, Traffic (pending)
- **Marketing** → Email Subscribers (pending)
- **Settings** → General, Payments, Shipping, Taxes, Email Templates, Users (pending)
- **Account** → Profile, Security, Activity Log (pending)

**Header:**
- Search bar (desktop)
- Theme toggle (light/dark)
- Notifications (real-time alerts)
- User menu (profile, sign out)

---

## Development Guide

### Running Locally

```bash
# Install dependencies (already done)
pnpm install

# Start development server
pnpm dev

# Access admin dashboard
http://localhost:3000/admin
```

### Project Structure

```
/app/(admin)/                    # Admin route group
  layout.tsx                     # Admin layout wrapper
  admin/
    page.tsx                     # Dashboard overview
    products/page.tsx            # Products list
    ...

/components/admin/               # Admin components
  AdminSidebar.tsx
  AdminHeader.tsx
  dashboard/                     # Dashboard components
  products/                      # Product components
  ...

/lib/admin/                      # Admin utilities
  rbac.ts                        # Role-based access control

/middleware.ts                   # Route protection
```

### Key Technologies

**Frontend:**
- Next.js 15 App Router
- TypeScript
- Tailwind CSS (Irish green theme)
- TanStack Table v8 (data tables)
- Recharts (analytics charts)
- React Hook Form + Zod (forms & validation)
- Sonner (toast notifications)

**Backend:**
- Supabase (database, auth, realtime)
- PostgreSQL (data storage)
- Row Level Security (RLS)

**File Handling:**
- react-dropzone (image uploads)
- Supabase Storage (image hosting)
- jsPDF (invoice generation)

---

## Extending the Dashboard

### Adding a New Page

1. **Create page file:**
```tsx
// app/(admin)/admin/new-feature/page.tsx
"use client";

export default function NewFeaturePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          New Feature
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Description of new feature
        </p>
      </div>
      {/* Content */}
    </div>
  );
}
```

2. **Add to sidebar:**
```tsx
// components/admin/AdminSidebar.tsx
const navItems: NavItem[] = [
  // ... existing items
  {
    icon: <NewIcon size={20} />,
    name: "New Feature",
    path: "/admin/new-feature",
    roles: ["admin"], // Optional: restrict by role
  },
];
```

3. **Add RBAC permission (optional):**
```tsx
// lib/admin/rbac.ts
export type Permission =
  // ... existing permissions
  | 'view_new_feature' | 'edit_new_feature';

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    // ... existing permissions
    'view_new_feature', 'edit_new_feature'
  ],
  // ...
};
```

### Creating an API Route

```tsx
// app/api/admin/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();

  // Check authentication
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile || !['admin', 'manager'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch data
  const { data, error } = await supabase
    .from('your_table')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
```

### Adding Real-time Features

```tsx
// In your component
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function YourComponent() {
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('your-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'your_table' },
        (payload) => {
          toast.success('New item added!');
          // Refresh your data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <div>Your component</div>;
}
```

---

## Completing the Dashboard

### Priority 1: Product Management (2-3 hours)

**Create Product Form**
- Image upload with drag-drop (react-dropzone)
- Form validation with Zod
- Upload to Supabase Storage
- Auto-generate SKU

**Files to create:**
- `app/(admin)/admin/products/new/page.tsx`
- `app/(admin)/admin/products/[id]/edit/page.tsx`
- `components/admin/products/ProductForm.tsx`
- `components/admin/products/ImageUpload.tsx`

### Priority 2: Orders Management (3-4 hours)

**Order List & Detail**
- TanStack Table with filters
- Status update workflow
- Invoice generation with jsPDF
- Tracking number input

**Files to create:**
- `app/(admin)/admin/orders/page.tsx`
- `app/(admin)/admin/orders/[id]/page.tsx`
- `components/admin/orders/OrderTable.tsx`
- `components/admin/orders/OrderDetail.tsx`
- `components/admin/orders/InvoicePDF.tsx`

### Priority 3: Analytics Dashboard (2-3 hours)

**Charts & Reports**
- Revenue over time (daily, weekly, monthly)
- Product performance metrics
- Google Analytics 4 integration
- Export functionality

**Files to create:**
- `app/(admin)/admin/analytics/page.tsx`
- `components/admin/analytics/RevenueReport.tsx`
- `components/admin/analytics/ProductsReport.tsx`
- `components/admin/analytics/TrafficReport.tsx`

### Priority 4: Settings Pages (4-5 hours)

**Configuration Screens**
- General settings (site info, branding)
- Payment settings (Stripe)
- Shipping settings (zones, methods)
- Tax settings (VAT)
- Email templates editor
- User management

**Files to create:**
- `app/(admin)/admin/settings/*/page.tsx` (6 pages)
- `components/admin/settings/*.tsx` (3 components)

### Priority 5: API Routes (3-4 hours)

**Backend Endpoints**
- Dashboard stats
- Products CRUD
- Orders CRUD
- Customers CRUD
- Analytics data
- Settings CRUD

**Files to create:**
- `app/api/admin/*/route.ts` (~20 files)

---

## Database Setup

### Required Tables

```sql
-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer';

-- Create admin activity log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create email subscribers
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_admin_activity_log_user_id ON admin_activity_log(user_id);
CREATE INDEX idx_admin_activity_log_created_at ON admin_activity_log(created_at DESC);
CREATE INDEX idx_email_subscribers_status ON email_subscribers(status);
```

### Row Level Security (RLS)

```sql
-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Admin users can do everything
CREATE POLICY "Admin full access to products"
ON products FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'manager')
  )
);

-- Similar policies for orders, customers, etc.
```

---

## Testing Checklist

### Authentication
- [ ] Login redirects to dashboard
- [ ] Unauthorized users redirected to home
- [ ] Session persists on refresh
- [ ] Logout clears session

### Dashboard
- [ ] Stats cards display correctly
- [ ] Revenue chart renders
- [ ] Recent orders list updates
- [ ] Top products show images
- [ ] Low stock alerts appear
- [ ] Real-time notifications work

### Products
- [ ] Product list loads
- [ ] Search filters work
- [ ] Category filter works
- [ ] Status filter works
- [ ] Sorting works
- [ ] Pagination works
- [ ] Bulk actions work
- [ ] CSV export works

### Responsive Design
- [ ] Mobile sidebar toggles
- [ ] Tables scroll horizontally
- [ ] Forms stack on mobile
- [ ] Charts resize properly

### Dark Mode
- [ ] Toggle switches theme
- [ ] All components styled
- [ ] Charts use dark colors
- [ ] Preference persists

---

## Deployment

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@puxxnicotine.ie

# Site
NEXT_PUBLIC_SITE_URL=https://puxxnicotine.ie
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Support & Maintenance

### Monitoring
- Set up Vercel Analytics
- Configure Supabase alerts
- Monitor error logs
- Track API usage

### Updates
- Review Supabase migrations
- Update dependencies monthly
- Test new features in staging
- Document changes

### Backup
- Supabase auto-backups enabled
- Export data regularly
- Keep local backups of images

---

## Resources

**Documentation:**
- [TailAdmin Pro Docs](https://tailadmin.com/docs)
- [TanStack Table Docs](https://tanstack.com/table)
- [Recharts Documentation](https://recharts.org)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

**Components:**
- [Lucide Icons](https://lucide.dev)
- [Sonner Toasts](https://sonner.emilkowal.ski)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

**Tools:**
- [jsPDF](https://github.com/parallax/jsPDF)
- [react-dropzone](https://react-dropzone.js.org)

---

**Last Updated:** December 12, 2025
**Version:** 1.0 (Foundation)
**Status:** 30% Complete - Ready for Extension
