# PUXX Ireland - Admin Dashboard Build Plan

**Project:** PUXX Ireland Admin Dashboard
**Purpose:** Manage inventory, orders, customers, and analytics
**Theme:** Emerald green Irish branding
**Users:** Admin, Store Manager, Support Staff

---

## Dashboard Overview

### Objectives
1. Centralized control panel for all e-commerce operations
2. Real-time order monitoring and fulfillment
3. Inventory management with low-stock alerts
4. Customer relationship management (CRM)
5. Sales analytics and reporting
6. Product catalog management
7. Settings and configuration
8. Mobile-responsive for on-the-go management

### Key Features
- **Real-time Dashboard** - Live sales, orders, customers
- **Product Management** - CRUD operations, bulk editing, image uploads
- **Order Management** - Status updates, tracking, invoicing
- **Customer Database** - Profiles, order history, notes
- **Analytics & Reports** - Revenue, trends, conversions
- **Role-Based Access Control (RBAC)** - Admin, Manager, Support
- **Email Templates** - Order confirmations, shipping updates
- **Settings** - Site config, payment, shipping, taxes

---

## Technology Stack

### Base Template: TailAdmin Pro Next.js 16.x

**Location:** `/Users/baileybarry/Resources/repos/templates/TailAdmin-Pro-Next.js-16.0x/`

**What's Included:**
✅ Next.js 16.x with App Router
✅ TypeScript
✅ Tailwind CSS
✅ Multiple dashboard layouts (2 default, 3+ e-commerce focused)
✅ 200+ UI components
✅ Chart library integration (Recharts)
✅ Data tables (TanStack Table)
✅ Form validation (React Hook Form)
✅ Authentication screens
✅ Dark mode support
✅ Fully responsive
✅ Production-ready code

**License Cost:** €99 one-time (already recommended in website plan)

### Additional Tools

**Data Visualization:**
- **Recharts** (`/Users/baileybarry/Resources/repos/analytics/recharts`)
  - Line charts (revenue trends)
  - Bar charts (product sales)
  - Pie charts (category distribution)
  - Area charts (traffic over time)

**Data Tables:**
- **TanStack Table v8** (`/Users/baileybarry/Resources/repos/tables/tanstack-table`)
  - Sorting, filtering, pagination
  - Column resizing
  - Row selection (bulk actions)
  - Server-side pagination support
  - Export to CSV

**Real-Time Features:**
- **Supabase Realtime** (included in main stack)
  - Live order notifications
  - Stock level updates
  - Customer activity tracking

**File Uploads:**
- **Supabase Storage**
  - Product images
  - Customer documents
  - Invoice PDFs

**Form Management:**
- **React Hook Form** (`/Users/baileybarry/Resources/repos/forms/react-hook-form`)
- **Zod** validation (`/Users/baileybarry/Resources/repos/forms/zod`)

---

## Dashboard Structure

### Main Navigation

```
SIDEBAR MENU
│
├── 📊 Dashboard            # Overview stats
├── 🛍️ E-commerce
│   ├── Products            # Product management
│   ├── Orders              # Order processing
│   ├── Customers           # Customer database
│   ├── Reviews             # Product reviews (future)
│   └── Coupons             # Discount codes (future)
├── 📈 Analytics
│   ├── Overview            # Sales analytics
│   ├── Revenue             # Revenue reports
│   ├── Products            # Product performance
│   └── Traffic             # Site traffic (GA4 integration)
├── 📧 Marketing
│   ├── Email Campaigns     # Newsletter (future)
│   ├── Subscribers         # Email list
│   └── Referrals           # Affiliate program (future)
├── ⚙️ Settings
│   ├── General             # Site settings
│   ├── Payments            # Stripe configuration
│   ├── Shipping            # Shipping zones, rates
│   ├── Taxes               # VAT configuration
│   ├── Email Templates     # Transactional emails
│   └── Users & Roles       # Admin user management
├── 👤 Account
│   ├── Profile             # Admin profile
│   ├── Security            # Password, 2FA
│   └── Activity Log        # Admin action history
└── 🔒 Logout
```

---

## Page-by-Page Implementation

### 1. Dashboard Overview (`/admin/dashboard`)

#### Layout
- **4 Stat Cards** (Top Row)
  - Total Revenue (Today)
  - Total Orders (Today)
  - New Customers (Today)
  - Low Stock Items

- **Revenue Chart** (Main Section, Left)
  - Line chart showing revenue over time
  - Filters: Today, Week, Month, Year, Custom
  - Comparison to previous period
  - Green gradient under line (emerald theme)

- **Recent Orders** (Main Section, Right)
  - Latest 5 orders
  - Order number, customer, total, status
  - Quick actions: View, Update Status

- **Top Products** (Second Row, Left)
  - Best sellers (by revenue)
  - Product name, sales count, revenue
  - Product image thumbnail

- **Low Stock Alerts** (Second Row, Right)
  - Products below reorder threshold
  - Current stock, reorder point
  - "Update Stock" button

- **Sales by Category** (Third Row)
  - Pie chart: Mint vs Fruit vs Specialty
  - Percentage breakdown

#### Components to Build

```tsx
// components/admin/DashboardStats.tsx
interface StatCardProps {
  title: string
  value: string | number
  change: number // percentage change
  icon: ReactNode
  trend: 'up' | 'down'
  color: 'green' | 'red' | 'blue' | 'orange'
}

export function StatCard({ title, value, change, icon, trend, color }: StatCardProps) {
  // Render stat card with emerald green for positive trends
}
```

```tsx
// components/admin/RevenueChart.tsx
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface RevenueData {
  date: string
  revenue: number
}

export function RevenueChart({ data, period }: { data: RevenueData[], period: string }) {
  // Emerald green line chart
  // Gradient fill under line
}
```

```tsx
// components/admin/RecentOrders.tsx
import { OrderTable } from './OrderTable'

export function RecentOrders({ orders }: { orders: Order[] }) {
  // Display latest orders with status badges
  // Green badge for completed, yellow for processing, etc.
}
```

```tsx
// components/admin/TopProducts.tsx
interface ProductSales {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
}

export function TopProducts({ products }: { products: ProductSales[] }) {
  // List with product thumbnails and sales metrics
}
```

```tsx
// components/admin/LowStockAlerts.tsx
interface StockAlert {
  productId: string
  productName: string
  currentStock: number
  reorderPoint: number
}

export function LowStockAlerts({ alerts }: { alerts: StockAlert[] }) {
  // Alert list with "Restock" button
  // Red badge for critical (< 5), yellow for low (< 20)
}
```

```tsx
// components/admin/CategorySalesChart.tsx
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts'

export function CategorySalesChart({ data }: { data: CategorySales[] }) {
  // Pie chart with emerald green, teal, orange slices
}
```

#### API Routes

```typescript
// app/api/admin/dashboard/route.ts
export async function GET(req: Request) {
  // Fetch dashboard stats from Supabase
  // Return:
  // - Total revenue (today, week, month, year)
  // - Total orders (today, week, month, year)
  // - New customers (today, week, month)
  // - Low stock items
  // - Top products
  // - Revenue data (for chart)
  // - Category sales
}
```

#### Real-Time Features

**Supabase Realtime Subscription:**
```typescript
// Subscribe to new orders
const ordersSubscription = supabase
  .channel('orders')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
      // Show toast notification
      // Update order count
      // Refresh revenue chart
      playNotificationSound()
    }
  )
  .subscribe()
```

**Toast Notifications:**
- "New order #PUXX-IE-00042 - €75.00"
- Sound alert
- Auto-dismiss after 5s
- Click to view order

---

### 2. Products Management (`/admin/products`)

#### Product List View

**Features:**
- **Data Table** (TanStack Table)
  - Columns: Image, Name, SKU, Category, Strength, Price, Stock, Status, Actions
  - Sortable columns
  - Search bar (name, SKU)
  - Filters:
    - Category (All, Mint, Fruit, Specialty)
    - Strength (6mg, 16mg, 22mg)
    - Status (Active, Inactive, Out of Stock)
  - Pagination (20 per page)
  - Bulk actions: Delete, Activate, Deactivate

- **Header Actions**
  - "Add Product" button (emerald green)
  - "Import CSV" button (optional)
  - "Export CSV" button

**Components:**

```tsx
// components/admin/ProductTable.tsx
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  strength: number
  price: number
  stock: number
  active: boolean
  image: string
}

export function ProductTable({ products }: { products: Product[] }) {
  // TanStack Table implementation
  // Row actions: Edit, Delete, Duplicate
  // Bulk selection checkboxes
}
```

```tsx
// components/admin/ProductFilters.tsx
export function ProductFilters({ onFilter }: { onFilter: (filters: Filters) => void }) {
  // Category dropdown
  // Strength dropdown
  // Status dropdown
  // Search input
}
```

#### Add/Edit Product Form

**Form Fields:**

**Basic Info:**
- Product Name (text, required)
- SKU (text, auto-generated or manual)
- Description (textarea, rich text editor optional)
- Category (dropdown: Mint, Fruit, Specialty)

**Pricing & Inventory:**
- Price (EUR) (number, required)
- Stock Quantity (number, required)
- Reorder Point (number) - trigger low stock alert

**Product Attributes:**
- Strength (dropdown: 6mg, 16mg, 22mg)
- Flavor Type (dropdown: matches category)
- Flavor Profile (multi-select: Sweet, Minty, Fresh, Fruity, Bold)

**Images:**
- Main Image (drag-drop upload, required)
- Gallery Images (up to 4 additional images)
- Image preview
- Drag to reorder

**SEO:**
- Meta Title (auto-generated from product name, editable)
- Meta Description (textarea)
- URL Slug (auto-generated, editable)

**Settings:**
- Featured Product (checkbox)
- Active (checkbox)

**Components:**

```tsx
// components/admin/ProductForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  sku: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['mint', 'fruit', 'specialty']),
  price: z.number().min(0.01),
  stock: z.number().int().min(0),
  reorderPoint: z.number().int().min(0),
  strength: z.enum(['6', '16', '22']),
  flavorProfile: z.array(z.string()).min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  featured: z.boolean(),
  active: z.boolean(),
})

export function ProductForm({ product, mode }: { product?: Product, mode: 'create' | 'edit' }) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      active: true,
      featured: false,
      stock: 0,
      reorderPoint: 10,
    }
  })

  // Handle form submission
  // Upload images to Supabase Storage
  // Create/update product in database
}
```

```tsx
// components/admin/ImageUpload.tsx
import { useDropzone } from 'react-dropzone'

export function ImageUpload({
  onUpload,
  multiple = false,
  maxFiles = 1
}: ImageUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles,
    onDrop: async (files) => {
      // Upload to Supabase Storage
      // Return public URLs
      onUpload(urls)
    }
  })

  // Drag-drop zone with emerald green border on hover
}
```

#### API Routes

```typescript
// app/api/admin/products/route.ts
export async function GET(req: Request) {
  // Fetch all products with filters, sorting, pagination
  // Return products array + total count
}

export async function POST(req: Request) {
  // Create new product
  // Upload images to Supabase Storage
  // Return created product
}
```

```typescript
// app/api/admin/products/[id]/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Fetch single product
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  // Update product
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // Soft delete product (set active = false)
}
```

---

### 3. Orders Management (`/admin/orders`)

#### Order List View

**Features:**
- **Data Table** (TanStack Table)
  - Columns: Order #, Date, Customer, Items, Total, Payment, Status, Actions
  - Sortable columns (date, total)
  - Search bar (order number, customer name, email)
  - Filters:
    - Status (All, Pending, Processing, Shipped, Delivered, Cancelled)
    - Payment Status (Paid, Pending, Failed, Refunded)
    - Date Range (Today, Week, Month, Custom)
  - Pagination (25 per page)
  - Export to CSV

- **Status Badges:**
  - Pending: Yellow
  - Processing: Blue
  - Shipped: Emerald Green
  - Delivered: Dark Green
  - Cancelled: Red
  - Refunded: Gray

**Components:**

```tsx
// components/admin/OrderTable.tsx
interface Order {
  id: string
  orderNumber: string
  createdAt: Date
  customerName: string
  customerEmail: string
  itemCount: number
  total: number
  paymentStatus: string
  status: string
}

export function OrderTable({ orders }: { orders: Order[] }) {
  // TanStack Table implementation
  // Row actions: View, Update Status, Print Invoice
  // Status badge component
}
```

```tsx
// components/admin/OrderStatusBadge.tsx
export function OrderStatusBadge({ status }: { status: string }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-emerald-100 text-emerald-800 border-emerald-600',
    delivered: 'bg-green-100 text-green-800 border-green-600',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  )
}
```

#### Order Detail Modal/Page

**Sections:**

**Order Header:**
- Order number (PUXX-IE-00042)
- Order date & time
- Status dropdown (update order status)
- "Print Invoice" button
- "Send Tracking Email" button

**Customer Information:**
- Name
- Email
- Phone
- Shipping Address
- Billing Address (if different)

**Order Items:**
- Product table:
  - Image
  - Product Name
  - SKU
  - Quantity
  - Price
  - Subtotal
- Order Summary:
  - Subtotal
  - Shipping
  - Tax (VAT 23%)
  - **Total**

**Payment Information:**
- Payment Method (Stripe)
- Payment Status
- Payment ID (Stripe)
- Transaction Date

**Shipping Information:**
- Shipping Method (Standard / Express)
- Tracking Number (input field)
- Shipped Date
- Estimated Delivery
- "Mark as Shipped" button

**Order Timeline:**
- Order Placed (timestamp)
- Payment Confirmed (timestamp)
- Processing Started (timestamp)
- Shipped (timestamp)
- Delivered (timestamp)

**Admin Notes:**
- Internal notes (textarea)
- Note history with timestamps

**Components:**

```tsx
// components/admin/OrderDetailModal.tsx
export function OrderDetailModal({ order, onClose }: { order: Order, onClose: () => void }) {
  // Modal layout
  // Sections: Customer, Items, Payment, Shipping, Timeline, Notes
  // Actions: Update Status, Add Tracking, Print Invoice
}
```

```tsx
// components/admin/OrderTimeline.tsx
interface TimelineEvent {
  status: string
  timestamp: Date
  user?: string
}

export function OrderTimeline({ events }: { events: TimelineEvent[] }) {
  // Vertical timeline with emerald green line
  // Icons for each status
}
```

```tsx
// components/admin/InvoicePDF.tsx
import { jsPDF } from 'jspdf'

export function generateInvoicePDF(order: Order) {
  const doc = new jsPDF()

  // Header: PUXX Ireland logo, company info
  // Order details
  // Customer info
  // Items table
  // Total
  // Footer: Terms & Conditions

  doc.save(`PUXX-Invoice-${order.orderNumber}.pdf`)
}
```

#### API Routes

```typescript
// app/api/admin/orders/route.ts
export async function GET(req: Request) {
  // Fetch orders with filters, sorting, pagination
  // Join with customer, order_items, products
  // Return orders array + total count
}
```

```typescript
// app/api/admin/orders/[id]/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Fetch single order with all details
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  // Update order status, tracking number, notes
  // Send email notification on status change
}
```

```typescript
// app/api/admin/orders/[id]/invoice/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Generate and return PDF invoice
}
```

---

### 4. Customers (`/admin/customers`)

#### Customer List View

**Features:**
- **Data Table**
  - Columns: Name, Email, Phone, Orders, Total Spent, Last Order, Joined Date, Actions
  - Sortable columns
  - Search bar (name, email, phone)
  - Filters:
    - Registered vs Guest
    - Has Orders vs No Orders
    - Joined Date Range
  - Pagination (25 per page)

**Components:**

```tsx
// components/admin/CustomerTable.tsx
interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  ordersCount: number
  totalSpent: number
  lastOrderDate?: Date
  joinedDate: Date
  isGuest: boolean
}

export function CustomerTable({ customers }: { customers: Customer[] }) {
  // TanStack Table implementation
  // Row actions: View, Email, Delete
}
```

#### Customer Detail Page

**Sections:**

**Customer Information:**
- Name
- Email
- Phone
- Joined Date
- Total Orders
- Total Spent
- Average Order Value
- Last Order Date

**Order History:**
- Table of all orders
- Same columns as main order table
- Click to view order details

**Saved Addresses:**
- List of shipping addresses
- Edit/Delete actions

**Admin Notes:**
- Internal notes about customer
- Note history

**Actions:**
- Send Email
- View in Stripe
- Deactivate Account (if needed)

**Components:**

```tsx
// components/admin/CustomerProfile.tsx
export function CustomerProfile({ customer }: { customer: Customer }) {
  // Customer info card
  // Stats: Orders, Spent, AOV
}
```

```tsx
// components/admin/CustomerOrderHistory.tsx
export function CustomerOrderHistory({ customerId }: { customerId: string }) {
  // Table of customer's orders
  // Link to order details
}
```

---

### 5. Analytics (`/admin/analytics`)

#### Overview Tab

**Charts:**
- **Revenue Over Time** (Line Chart)
  - Daily, Weekly, Monthly views
  - Year-over-year comparison
  - Emerald green line with gradient fill

- **Sales by Category** (Pie Chart)
  - Mint vs Fruit vs Specialty
  - Revenue or order count

- **Top Products** (Bar Chart)
  - Top 10 products by revenue
  - Horizontal bar chart with emerald bars

- **Conversion Funnel** (Funnel Chart)
  - Visitors → Product Views → Add to Cart → Checkout → Purchase
  - Conversion rate at each stage

**Metrics Cards:**
- Total Revenue (Period)
- Total Orders (Period)
- Average Order Value
- Conversion Rate
- Return Customer Rate
- Customer Lifetime Value (CLV)

#### Revenue Tab

**Features:**
- Revenue by day/week/month
- Revenue by product
- Revenue by category
- Revenue by customer segment
- Compare periods
- Export data to CSV

**Components:**

```tsx
// components/admin/RevenueReport.tsx
import { Bar, BarChart, Line, LineChart } from 'recharts'

export function RevenueReport({ period }: { period: 'day' | 'week' | 'month' | 'year' }) {
  // Fetch revenue data from Supabase
  // Display line chart
  // Display summary stats
}
```

#### Products Tab

**Metrics:**
- Product views (requires Google Analytics integration)
- Add to cart rate
- Purchase rate
- Revenue per product
- Profit margin (if cost data available)

**Table:**
- Product name
- Views
- Adds to Cart
- Purchases
- Conversion Rate
- Revenue
- Sort by any column

#### Traffic Tab (Google Analytics Integration)

**Metrics:**
- Page views
- Unique visitors
- Bounce rate
- Average session duration
- Traffic sources (Direct, Organic, Social, Referral)
- Top pages
- Device breakdown (Mobile, Desktop, Tablet)
- Location (Ireland, UK, EU, Other)

**Components:**

```tsx
// components/admin/GoogleAnalyticsWidget.tsx
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export function GoogleAnalyticsWidget() {
  // Fetch data from Google Analytics 4 API
  // Display traffic metrics
  // Charts: Traffic over time, Sources, Devices, Locations
}
```

---

### 6. Marketing

#### Email Subscribers (`/admin/marketing/subscribers`)

**Features:**
- List of newsletter subscribers
- Import CSV
- Export CSV
- Send bulk email (via email service)
- Unsubscribe management

**Components:**

```tsx
// components/admin/SubscriberTable.tsx
interface Subscriber {
  id: string
  email: string
  subscribedAt: Date
  source: string // footer form, checkout, popup
  status: 'active' | 'unsubscribed'
}

export function SubscriberTable({ subscribers }: { subscribers: Subscriber[] }) {
  // Table with email, source, date, status
  // Actions: Export, Unsubscribe
}
```

#### Email Campaigns (Future Phase)

**Features:**
- Create email campaigns
- Template editor
- Schedule send
- A/B testing
- Campaign analytics (open rate, click rate)

---

### 7. Settings

#### General Settings (`/admin/settings/general`)

**Fields:**
- Site Name (PUXX Ireland)
- Site Logo (upload)
- Favicon (upload)
- Contact Email
- Support Email
- Phone Number
- Company Address
- Instagram URL
- Facebook URL
- Minimum Order Quantity (default: 5)
- Free Shipping Threshold (default: €150)

#### Payment Settings (`/admin/settings/payments`)

**Stripe Configuration:**
- Stripe Publishable Key (Live)
- Stripe Secret Key (Live)
- Stripe Publishable Key (Test)
- Stripe Secret Key (Test)
- Test Mode (toggle)
- Webhook Secret
- Accepted Currencies (EUR)
- Payment Methods Enabled (Card, Apple Pay, Google Pay)

#### Shipping Settings (`/admin/settings/shipping`)

**Shipping Zones:**
- Zone Name (e.g., "Ireland")
- Countries (Ireland)
- Shipping Methods:
  - Standard (Free over €150, otherwise €5.99)
  - Express (€9.99, 1-2 days)

**Table:**
- Zone | Method | Cost | Free Threshold | Estimated Days | Actions (Edit, Delete)

**Components:**

```tsx
// components/admin/ShippingZoneForm.tsx
export function ShippingZoneForm({ zone }: { zone?: ShippingZone }) {
  // Form to create/edit shipping zone
  // Add multiple shipping methods per zone
}
```

#### Tax Settings (`/admin/settings/taxes`)

**VAT Configuration:**
- Enable Tax Calculation (toggle)
- Tax Name (VAT)
- Tax Rate (23% - Ireland standard rate)
- Tax Display (Inclusive or Exclusive)
- Tax Number (VAT Registration Number)

#### Email Templates (`/admin/settings/email-templates`)

**Templates:**
- Order Confirmation
- Shipping Confirmation
- Delivery Confirmation
- Order Cancellation
- Refund Confirmation
- Welcome Email (new customer)
- Password Reset

**Template Editor:**
- Subject line
- HTML editor (with variables: {{orderNumber}}, {{customerName}}, {{total}}, etc.)
- Preview
- Send Test Email

**Components:**

```tsx
// components/admin/EmailTemplateEditor.tsx
import { useState } from 'react'

export function EmailTemplateEditor({ template }: { template: EmailTemplate }) {
  const [subject, setSubject] = useState(template.subject)
  const [html, setHtml] = useState(template.html)

  // Rich text editor for HTML
  // Variable picker (insert {{orderNumber}})
  // Preview pane
  // Save button
}
```

#### Users & Roles (`/admin/settings/users`)

**Features:**
- List of admin users
- Add/Remove admin users
- Roles:
  - **Admin** - Full access
  - **Manager** - Products, Orders, Customers (no Settings)
  - **Support** - View Orders, Update Order Status, View Customers (no Products, no Settings)

**Components:**

```tsx
// components/admin/UserRoleTable.tsx
interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'support'
  lastLogin: Date
  createdAt: Date
}

export function UserRoleTable({ users }: { users: AdminUser[] }) {
  // Table with user info and role
  // Actions: Edit Role, Remove User
}
```

---

### 8. Account & Security

#### Profile (`/admin/account/profile`)

**Fields:**
- Name
- Email (read-only, change via Supabase)
- Profile Photo (upload)
- Phone

#### Security (`/admin/account/security`)

**Features:**
- Change Password
- Enable Two-Factor Authentication (2FA)
- Active Sessions (list of login sessions)
- Security Log (login history, IP addresses)

#### Activity Log (`/admin/account/activity`)

**Features:**
- Log of all admin actions
- Filterable by action type, date
- Columns: Date, User, Action, Details

**Examples:**
- "Updated product: PUXX Cool Mint"
- "Changed order #PUXX-IE-00042 status to Shipped"
- "Created new product: PUXX Citrus"
- "Deleted customer #12345"

**Components:**

```tsx
// components/admin/ActivityLog.tsx
interface ActivityEntry {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: string
  details: string
  ipAddress?: string
}

export function ActivityLog({ entries }: { entries: ActivityEntry[] }) {
  // Table with timestamp, user, action, details
  // Filter by user, action type, date range
}
```

---

## Real-Time Features Implementation

### Supabase Realtime Setup

```typescript
// lib/supabase/realtime.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Subscribe to new orders
export function subscribeToNewOrders(callback: (order: Order) => void) {
  return supabase
    .channel('new-orders')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        callback(payload.new as Order)
      }
    )
    .subscribe()
}

// Subscribe to stock updates
export function subscribeToStockUpdates(callback: (product: Product) => void) {
  return supabase
    .channel('stock-updates')
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'products' },
      (payload) => {
        const product = payload.new as Product
        if (product.stock_quantity <= product.reorder_point) {
          callback(product)
        }
      }
    )
    .subscribe()
}

// Subscribe to order status changes
export function subscribeToOrderStatusChanges(callback: (order: Order) => void) {
  return supabase
    .channel('order-status')
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders', filter: 'status=neq.pending' },
      (payload) => {
        callback(payload.new as Order)
      }
    )
    .subscribe()
}
```

### Real-Time Dashboard Component

```tsx
// components/admin/RealtimeDashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { subscribeToNewOrders, subscribeToStockUpdates } from '@/lib/supabase/realtime'
import { toast } from 'sonner'

export function RealtimeDashboard() {
  const [liveOrderCount, setLiveOrderCount] = useState(0)
  const [lowStockAlerts, setLowStockAlerts] = useState<Product[]>([])

  useEffect(() => {
    // Subscribe to new orders
    const ordersSubscription = subscribeToNewOrders((order) => {
      setLiveOrderCount(prev => prev + 1)

      // Show toast notification
      toast.success(`New order: ${order.order_number}`, {
        description: `€${order.total} from ${order.shipping_name}`,
        action: {
          label: 'View',
          onClick: () => router.push(`/admin/orders/${order.id}`)
        }
      })

      // Play notification sound
      const audio = new Audio('/sounds/notification.mp3')
      audio.play()
    })

    // Subscribe to stock updates
    const stockSubscription = subscribeToStockUpdates((product) => {
      setLowStockAlerts(prev => [...prev, product])

      toast.warning(`Low stock: ${product.name}`, {
        description: `Only ${product.stock_quantity} left`,
        action: {
          label: 'Restock',
          onClick: () => router.push(`/admin/products/${product.id}/edit`)
        }
      })
    })

    // Cleanup
    return () => {
      ordersSubscription.unsubscribe()
      stockSubscription.unsubscribe()
    }
  }, [])

  return (
    <div className="space-y-4">
      <StatCard
        title="Live Orders Today"
        value={liveOrderCount}
        icon={<ShoppingBag />}
        color="green"
      />

      {lowStockAlerts.length > 0 && (
        <LowStockAlerts alerts={lowStockAlerts} />
      )}
    </div>
  )
}
```

---

## Design System (Irish Green Theme)

### Color Palette for Dashboard

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Irish Green Theme
        primary: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#009A49', // Emerald Green (Main)
          600: '#00563F', // Deep Forest Green
          700: '#00472F',
          800: '#003821',
          900: '#002615',
        },
        accent: {
          500: '#00A86B', // Shamrock Green
        },
        // Keep existing colors for product badges, status
        success: '#009A49',
        warning: '#FFA500',
        error: '#DC2626',
        info: '#3B82F6',
      }
    }
  }
}
```

### Component Styling

**Buttons:**
```tsx
// Primary Button (Emerald Green)
<Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
  Add Product
</Button>

// Secondary Button
<Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
  Cancel
</Button>
```

**Badges:**
```tsx
// Status Badges with Irish Green
<Badge className="bg-emerald-100 text-emerald-800 border-emerald-600">
  Active
</Badge>
```

**Charts:**
```tsx
// Line Chart with Emerald Green
<LineChart data={revenueData}>
  <Line
    type="monotone"
    dataKey="revenue"
    stroke="#009A49"
    strokeWidth={3}
    fill="url(#emeraldGradient)"
  />
  <defs>
    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#009A49" stopOpacity={0.3} />
      <stop offset="100%" stopColor="#009A49" stopOpacity={0} />
    </linearGradient>
  </defs>
</LineChart>
```

---

## API Routes Summary

```
app/api/admin/
├── dashboard/
│   └── route.ts                 # GET dashboard stats
├── products/
│   ├── route.ts                 # GET all, POST new
│   ├── [id]/route.ts            # GET, PUT, DELETE product
│   └── bulk/route.ts            # POST bulk actions
├── orders/
│   ├── route.ts                 # GET all orders
│   ├── [id]/route.ts            # GET, PATCH order
│   ├── [id]/invoice/route.ts   # GET invoice PDF
│   └── export/route.ts          # GET CSV export
├── customers/
│   ├── route.ts                 # GET all customers
│   └── [id]/route.ts            # GET, DELETE customer
├── analytics/
│   ├── revenue/route.ts         # GET revenue data
│   ├── products/route.ts        # GET product analytics
│   └── traffic/route.ts         # GET traffic data (GA4)
├── marketing/
│   └── subscribers/route.ts     # GET, POST, DELETE subscribers
├── settings/
│   ├── general/route.ts         # GET, PUT general settings
│   ├── payments/route.ts        # GET, PUT payment settings
│   ├── shipping/route.ts        # GET, POST, PUT, DELETE shipping
│   ├── taxes/route.ts           # GET, PUT tax settings
│   └── email-templates/route.ts # GET, PUT templates
└── users/
    └── route.ts                 # GET, POST, DELETE admin users
```

---

## Security & Permissions

### Row Level Security (RLS)

**Admin-Only Access:**
```sql
-- Only users with admin role can access dashboard
CREATE POLICY "Only admins can access admin functions"
ON orders FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'manager', 'support')
  )
);
```

### Middleware Protection

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  // Protect /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || !['admin', 'manager', 'support'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
```

### Role-Based Access Control

```typescript
// lib/rbac.ts
type Role = 'admin' | 'manager' | 'support'

type Permission =
  | 'view_dashboard'
  | 'view_products' | 'create_products' | 'edit_products' | 'delete_products'
  | 'view_orders' | 'edit_orders' | 'delete_orders'
  | 'view_customers' | 'edit_customers' | 'delete_customers'
  | 'view_analytics'
  | 'view_settings' | 'edit_settings'
  | 'manage_users'

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'view_dashboard',
    'view_products', 'create_products', 'edit_products', 'delete_products',
    'view_orders', 'edit_orders', 'delete_orders',
    'view_customers', 'edit_customers', 'delete_customers',
    'view_analytics',
    'view_settings', 'edit_settings',
    'manage_users'
  ],
  manager: [
    'view_dashboard',
    'view_products', 'create_products', 'edit_products', 'delete_products',
    'view_orders', 'edit_orders',
    'view_customers', 'edit_customers',
    'view_analytics'
  ],
  support: [
    'view_dashboard',
    'view_products',
    'view_orders', 'edit_orders',
    'view_customers'
  ]
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission)
}
```

---

## Performance Optimization

### Server-Side Pagination

```typescript
// app/api/admin/products/route.ts
export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  // Fetch products with pagination
  const { data: products, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)

  return NextResponse.json({
    products,
    total: count,
    page,
    totalPages: Math.ceil(count / limit)
  })
}
```

### Database Indexes

```sql
-- Add indexes for common queries
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_customer ON orders(user_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_category ON products(category);
```

### Caching Strategy

```typescript
// Use React Query for data caching
import { useQuery } from '@tanstack/react-query'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 60 * 1000, // Cache for 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}
```

---

## Testing Checklist

### Functional Testing
- [ ] Login as admin, manager, support - verify permissions
- [ ] Create product with images
- [ ] Edit product
- [ ] Delete product
- [ ] Bulk delete products
- [ ] View order list
- [ ] Update order status
- [ ] Generate invoice PDF
- [ ] Add tracking number
- [ ] Search/filter orders
- [ ] Export orders to CSV
- [ ] View customer list
- [ ] View customer details
- [ ] View analytics charts
- [ ] Update settings (general, payment, shipping, tax)
- [ ] Test real-time order notifications
- [ ] Test low stock alerts
- [ ] Add admin user
- [ ] Change admin user role
- [ ] Remove admin user

### Security Testing
- [ ] Attempt to access /admin without login (should redirect)
- [ ] Attempt to access /admin as regular user (should block)
- [ ] Test RLS policies (support user can't delete orders)
- [ ] Verify API routes check authentication
- [ ] Test CSRF protection
- [ ] Check for SQL injection vulnerabilities
- [ ] Verify sensitive data not exposed in API responses

### Performance Testing
- [ ] Test with 1000+ products (pagination works)
- [ ] Test with 10,000+ orders (queries fast)
- [ ] Measure dashboard load time (< 2s)
- [ ] Test image uploads (multiple files)
- [ ] Test CSV export with large datasets
- [ ] Monitor database query performance

---

## Deployment

### Environment Variables

```bash
# .env.local (Production)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@puxxireland.ie

NEXT_PUBLIC_SITE_URL=https://puxxireland.ie
```

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy main branch to production
4. Set up preview deployments for PRs

---

## Timeline Estimate

**Total: 5-7 days (40-56 hours)**

| Phase | Task | Duration |
|-------|------|----------|
| Day 1 | Setup TailAdmin Pro, configure Irish green theme | 6-8 hours |
| Day 2 | Build Dashboard Overview page with charts | 6-8 hours |
| Day 3 | Build Products Management (list, form, upload) | 8-10 hours |
| Day 4 | Build Orders Management (list, detail, status updates) | 8-10 hours |
| Day 5 | Build Customers, Analytics pages | 6-8 hours |
| Day 6 | Build Settings pages, Email templates | 6-8 hours |
| Day 7 | Real-time features, testing, deployment | 6-8 hours |

---

## Key Resources Used

1. **TailAdmin Pro Next.js 16.x**
   `/Users/baileybarry/Resources/repos/templates/TailAdmin-Pro-Next.js-16.0x/`

2. **Recharts** (Charts)
   `/Users/baileybarry/Resources/repos/analytics/recharts`

3. **TanStack Table** (Data tables)
   `/Users/baileybarry/Resources/repos/tables/tanstack-table`

4. **React Hook Form** (Forms)
   `/Users/baileybarry/Resources/repos/forms/react-hook-form`

5. **Zod** (Validation)
   `/Users/baileybarry/Resources/repos/forms/zod`

6. **Supabase** (Database, Auth, Realtime)
   `/Users/baileybarry/Resources/repos/_monorepos/supabase`

---

## Next Steps

1. Review dashboard plan
2. Install TailAdmin Pro
3. Configure Irish green theme
4. Begin implementation (follow website build plan Phase 3)
5. Deploy to staging for testing
6. Launch with main website

---

**Document Created:** December 2025
**Ready to Build:** Yes - All resources available
**Integrates With:** Website Build Plan (Phase 3)
