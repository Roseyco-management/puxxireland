# PUXX Ireland - Project Board

**GitHub:** https://github.com/Roseyco-management/puxxireland
**Timeline:** 10 Weeks to Launch + 5 Months SEO
**Status:** 🟢 Active Development

---

## 📊 Project Status

| Phase | Status | Progress | Start Date | End Date |
|-------|--------|----------|------------|----------|
| Phase 0: Setup | 🔵 In Progress | 0% | TBD | TBD |
| Phase 1: Core Website | ⚪ Not Started | 0% | TBD | TBD |
| Phase 2: E-commerce | ⚪ Not Started | 0% | TBD | TBD |
| Phase 3: Admin Dashboard | ⚪ Not Started | 0% | TBD | TBD |
| Phase 4: SEO Foundation | ⚪ Not Started | 0% | TBD | TBD |
| Phase 5: Compliance | ⚪ Not Started | 0% | TBD | TBD |
| Phase 6: Testing & QA | ⚪ Not Started | 0% | TBD | TBD |
| Phase 7: Launch | ⚪ Not Started | 0% | TBD | TBD |

**Legend:**
- 🔵 In Progress
- ⚪ Not Started
- 🟢 Complete
- 🔴 Blocked
- 🟡 In Review

---

## 🗂️ PHASE 0: Setup & Planning (Week 1)

### Day 1: Environment & Tooling

**Status:** 🔵 In Progress

- [x] Initialize Git repository
- [x] Create GitHub repository (https://github.com/Roseyco-management/puxxireland)
- [x] Create project documentation structure
- [x] Add all planning documents
- [x] Organize assets folder
- [ ] Clone nextjs-saas-starter from Resources
- [ ] Set up local development environment
- [ ] Install Node.js 18+ and pnpm
- [ ] Configure VS Code workspace
- [ ] Install recommended VS Code extensions
- [ ] Set up ESLint + Prettier
- [ ] Create .env.example template
- [ ] Test local environment

**Deliverable:** ✅ Local dev environment running

---

### Day 2: Supabase & Database

**Status:** ⚪ Not Started

- [ ] Create Supabase project (puxx-ireland)
- [ ] Configure authentication providers
  - [ ] Email/password authentication
  - [ ] Google OAuth
  - [ ] Facebook OAuth (optional)
- [ ] Set up environment variables (.env.local)
- [ ] Test database connection
- [ ] Enable Row Level Security (RLS)
- [ ] Create initial admin user
- [ ] Create database schema
  - [ ] profiles table
  - [ ] products table
  - [ ] categories table
  - [ ] product_categories table (junction)
  - [ ] cart_items table
  - [ ] orders table
  - [ ] order_items table
  - [ ] coupons table
  - [ ] reviews table (future)
  - [ ] newsletter_subscribers table
- [ ] Set up RLS policies on all tables
- [ ] Create database indexes for performance
- [ ] Run database migrations
- [ ] Test queries

**Deliverable:** ✅ Database configured with all tables

---

### Day 3: Design System & Branding

**Status:** ⚪ Not Started

- [ ] Configure Tailwind with Irish green palette
  - [ ] Primary: #009A49 (Emerald Green)
  - [ ] Secondary: #00563F (Deep Forest Green)
  - [ ] Accent: #00A86B (Shamrock Green)
  - [ ] Gold: #D4AF37
  - [ ] Black: #000000
  - [ ] Cream: #F5E6D3
- [ ] Install Shadcn-ui components
  - [ ] Button
  - [ ] Input
  - [ ] Card
  - [ ] Dialog
  - [ ] Dropdown
  - [ ] Badge
  - [ ] Tabs
  - [ ] Toast
  - [ ] Select
  - [ ] Form components
- [ ] Set up typography (Montserrat Bold + Inter)
- [ ] Configure Framer Motion
- [ ] Install Lenis (smooth scrolling)
- [ ] Create base component library structure
- [ ] Set up globals.css with emerald green theme
- [ ] Create color utility classes
- [ ] Export product images (all sizes)
- [ ] Create OG images (1200x630)
- [ ] Prepare logo files (SVG, PNG, WebP)
- [ ] Create favicon set

**Deliverable:** ✅ Complete design system implemented

---

### Day 4: Core Infrastructure

**Status:** ⚪ Not Started

- [ ] Set up app router structure
- [ ] Create root layout with emerald green theme
- [ ] Build Header component
  - [ ] Yellow alert banner (conditional)
  - [ ] Black warning bar (nicotine warning)
  - [ ] Emerald green navigation bar
  - [ ] Logo (white/cream on green)
  - [ ] Nav links: Home, Shop, My Account, Contact
  - [ ] Cart icon with item count
  - [ ] Deep forest green promo bar
- [ ] Build Footer component
  - [ ] Deep forest green background
  - [ ] PUXX logo (white)
  - [ ] Company info
  - [ ] Column links (Pages, Sales, Connect)
  - [ ] Social media icons
  - [ ] Copyright
- [ ] Build MobileMenu component
- [ ] Set up authentication flow
  - [ ] Login page
  - [ ] Register page
  - [ ] Password reset
- [ ] Configure NextAuth.js
- [ ] Test auth flow end-to-end
- [ ] Install next-seo
- [ ] Install next-sitemap
- [ ] Configure defaultSEO settings
- [ ] Set up robots.txt
- [ ] Create sitemap configuration

**Deliverable:** ✅ Core infrastructure ready

---

### Day 5: Product Data Seeding

**Status:** ⚪ Not Started

- [ ] Create product seed data (14 flavors)
  - [ ] Cool Mint (22mg)
  - [ ] Peppermint (22mg)
  - [ ] Spearmint (22mg)
  - [ ] Apple Mint (6mg)
  - [ ] Blueberry
  - [ ] Cherry (16mg)
  - [ ] Citrus (16mg)
  - [ ] Grape
  - [ ] Peach
  - [ ] Raspberry
  - [ ] Strawberry
  - [ ] Watermelon (16mg)
  - [ ] Cola (16mg)
  - [ ] Wintergreen
- [ ] Upload product images to Supabase Storage
- [ ] Run database migrations
- [ ] Seed products into database
- [ ] Seed categories (Mint, Fruit, Specialty)
- [ ] Test product queries
- [ ] Create API routes for products
  - [ ] GET /api/products
  - [ ] GET /api/products/[id]
  - [ ] POST /api/products (admin)
  - [ ] PUT /api/products/[id] (admin)
  - [ ] DELETE /api/products/[id] (admin)
- [ ] Write unique descriptions (300+ words each)
- [ ] Define flavor profiles
- [ ] List ingredients
- [ ] Create usage instructions template

**Deliverable:** ✅ All 14 products in database with images

---

## 🗂️ PHASE 1: Core Website (Week 2-3)

### Week 2, Day 1-2: Homepage

**Status:** ⚪ Not Started

- [ ] Build hero section
  - [ ] Emerald green background with gradient
  - [ ] Green lightning effects (Framer Motion)
  - [ ] Headline: "EXPERIENCE THE WORLD'S BEST NICOTINE POUCHES"
  - [ ] Subheading: "Premium Tobacco-Free Flavour Nicotine Pouches"
  - [ ] CTA button (emerald green, white text)
  - [ ] Product tins with green energy animation
- [ ] Create product showcase grid
  - [ ] Display 14 products
  - [ ] 3-4 visible, scrollable
  - [ ] Hover effects
  - [ ] "Add to Cart" on hover
  - [ ] Color-coded badges (strength levels)
- [ ] Build "Taste the Difference" section
  - [ ] Image: Product with fresh ingredients
  - [ ] Text: Quality messaging
  - [ ] Green accent gradient
- [ ] Build "Pioneering Fresh Pouches" section
  - [ ] Image: Innovation visual
  - [ ] Text: Brand story
  - [ ] Shamrock icon (subtle)
- [ ] Build "Abundant Variety" section
  - [ ] Image: All 14 flavors grid
  - [ ] Text: Flavor range messaging
  - [ ] Interactive flavor filter
- [ ] Add scroll animations (fade-in, slide-up)
- [ ] Add green lightning effects (Three.js or Lottie)
- [ ] Mobile optimization
- [ ] Performance optimization (lazy loading images)
- [ ] Add schema.org Organization markup
- [ ] Add LocalBusinessJsonLd
- [ ] Run Lighthouse audit (target 90+)

**Deliverable:** ✅ Homepage complete and optimized

---

### Week 2, Day 3-4: Shop Page

**Status:** ⚪ Not Started

- [ ] Create shop page layout
- [ ] Build ProductCard component
  - [ ] Product image (600x600)
  - [ ] Product name
  - [ ] Strength badge (emerald green)
  - [ ] Price (€15.00)
  - [ ] "Add to Cart" button
  - [ ] "Quick View" on hover
  - [ ] Favorite icon
- [ ] Implement product grid (responsive: 1, 2, 3, 4 columns)
- [ ] Add filter sidebar
  - [ ] Category (All, Mint, Fruit, Specialty)
  - [ ] Strength (6mg, 16mg, 22mg)
  - [ ] Price range
  - [ ] Availability
- [ ] Implement sorting
  - [ ] Featured
  - [ ] Price: Low to High
  - [ ] Price: High to Low
  - [ ] Name: A-Z
  - [ ] Newest
- [ ] Add search functionality
- [ ] Implement pagination (20 per page)
- [ ] Create QuickView modal
- [ ] Add "Add to Cart" functionality
- [ ] Mobile filter drawer
- [ ] Loading states with skeletons
- [ ] SEO optimization (meta tags, H1, content)

**Deliverable:** ✅ Shop page with filtering and sorting

---

### Week 2, Day 5 + Week 3, Day 1-2: Product Detail Pages

**Status:** ⚪ Not Started

- [ ] Create product detail page template
- [ ] Build image gallery
  - [ ] Main image with zoom
  - [ ] Thumbnails (4-5 images)
  - [ ] Click to zoom
- [ ] Build product info section
  - [ ] Product name
  - [ ] Price (€15.00)
  - [ ] Strength indicator (emerald green)
  - [ ] Description
  - [ ] Flavor profile
  - [ ] Ingredients
  - [ ] Usage instructions
  - [ ] Quantity selector
  - [ ] "Add to Cart" button (large, emerald green)
  - [ ] Stock status
- [ ] Build "Related Products" section
- [ ] Add product reviews section (placeholder)
- [ ] Implement ProductJsonLd schema
- [ ] Add BreadcrumbJsonLd schema
- [ ] Optimize meta tags for each product
  - [ ] Title: "{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX"
  - [ ] Description: "Buy {Product Name}... €15.00. Free delivery over €150. 18+ only."
- [ ] Mobile optimization
- [ ] Test "Add to Cart" from product page

**Deliverable:** ✅ 14 product pages complete with schema markup

---

### Week 3, Day 3: Contact Page

**Status:** ⚪ Not Started

- [ ] Create contact form (React Hook Form + Zod)
- [ ] Add form fields
  - [ ] First Name (required)
  - [ ] Last Name (required)
  - [ ] Phone
  - [ ] Email (required)
  - [ ] Message (required)
  - [ ] Consent checkbox
- [ ] Implement form validation
- [ ] Set up email service (SendGrid/Postmark)
- [ ] Send email on form submission
- [ ] Add emerald green submit button
- [ ] Success/error messages
- [ ] Mobile responsive
- [ ] Add contact info
  - [ ] Email: info@puxxireland.ie
  - [ ] Phone (if available)
  - [ ] Social media links

**Deliverable:** ✅ Contact page with working form

---

### Week 3, Day 4: My Account Pages

**Status:** ⚪ Not Started

- [ ] Create Login page
  - [ ] Email/password fields
  - [ ] "Remember me" checkbox
  - [ ] "Forgot password" link
  - [ ] Social login (Google)
- [ ] Create Register page
  - [ ] Email, Name, Phone fields
  - [ ] Age verification checkbox (18+)
  - [ ] "How did you hear about us?" dropdown
  - [ ] Password + Confirm password
  - [ ] Terms acceptance checkbox
- [ ] Create account dashboard layout
- [ ] Build "Order History" page
  - [ ] List of all orders
  - [ ] Order number, date, total, status
  - [ ] "View Details" button
- [ ] Build "Account Details" page
  - [ ] Edit name, email, phone
  - [ ] Change password
  - [ ] Delete account option
- [ ] Build "Saved Addresses" section
  - [ ] List addresses
  - [ ] Add new address
  - [ ] Edit/delete addresses
- [ ] Add logout functionality
- [ ] Mobile responsive

**Deliverable:** ✅ Complete account system

---

### Week 3, Day 5: Static Pages

**Status:** ⚪ Not Started

- [ ] Write and publish About Us page
  - [ ] Company story
  - [ ] Mission and values
  - [ ] Why PUXX Ireland
- [ ] Write Terms & Conditions (consult legal)
  - [ ] Purchase terms
  - [ ] Age restriction (18+)
  - [ ] Shipping terms
  - [ ] Returns/refunds
  - [ ] Liability
- [ ] Write Privacy Policy (GDPR compliant)
  - [ ] Data collection
  - [ ] Data usage
  - [ ] Data storage
  - [ ] User rights (export, delete)
  - [ ] Cookies
- [ ] Write Shipping & Returns policy
  - [ ] Shipping zones
  - [ ] Delivery times
  - [ ] Free shipping (€150+)
  - [ ] Returns process
  - [ ] Refund policy
- [ ] Write FAQ page
  - [ ] What are nicotine pouches?
  - [ ] How to use them?
  - [ ] Shipping questions
  - [ ] Age verification
  - [ ] Payment methods
- [ ] Style all pages with emerald green theme
- [ ] Add internal links
- [ ] SEO optimization for each page
- [ ] Mobile responsive

**Deliverable:** ✅ All static pages complete

---

## 🗂️ PHASE 2: E-commerce Functionality (Week 4-5)

### Week 4, Day 1-2: Shopping Cart

**Status:** ⚪ Not Started

- [ ] Set up cart state management (Zustand)
  - [ ] Create cart store
  - [ ] Actions: addItem, removeItem, updateQuantity, clearCart
  - [ ] Persist to localStorage
- [ ] Build CartDrawer component (slide-out)
  - [ ] Cart header with close button
  - [ ] Cart items list
  - [ ] Cart summary (subtotal, shipping, total)
  - [ ] "Checkout" button
  - [ ] Empty cart state
- [ ] Build CartPage (full page view)
  - [ ] Cart items table
  - [ ] Update quantities
  - [ ] Remove items
  - [ ] Cart summary sidebar
  - [ ] "Continue Shopping" button
  - [ ] "Proceed to Checkout" button
- [ ] Build CartItem component
  - [ ] Product image
  - [ ] Product name + strength
  - [ ] Price
  - [ ] Quantity selector
  - [ ] Subtotal
  - [ ] Remove button
- [ ] Build CartSummary component
  - [ ] Subtotal
  - [ ] Shipping cost
  - [ ] Free shipping indicator (€150)
  - [ ] Total
- [ ] Implement "Add to Cart" across all pages
  - [ ] Shop page
  - [ ] Product detail page
  - [ ] Homepage (product showcase)
- [ ] Implement minimum order validation (5 tins)
- [ ] Free shipping indicator (€150 threshold)
- [ ] Persist cart to localStorage
- [ ] Sync cart with database (logged-in users)
- [ ] Cart badge counter in header
- [ ] Mobile cart optimization

**Deliverable:** ✅ Fully functional shopping cart

---

### Week 4, Day 3-5 + Week 5, Day 1-2: Checkout Flow

**Status:** ⚪ Not Started

- [ ] Create multi-step checkout page
  - [ ] Step indicator (1-5)
  - [ ] Progress bar
- [ ] Step 1: Cart Review
  - [ ] Display all items
  - [ ] Edit quantities
  - [ ] Apply coupon code field
  - [ ] Subtotal display
  - [ ] "Continue" button
- [ ] Step 2: Customer Information
  - [ ] Email field
  - [ ] Age verification checkbox (18+)
  - [ ] "Create account" checkbox
  - [ ] Password fields (if creating account)
- [ ] Step 3: Shipping Address
  - [ ] Name fields (first, last)
  - [ ] Address fields (line1, line2)
  - [ ] City field
  - [ ] County field
  - [ ] Eircode (postal code)
  - [ ] Phone number
  - [ ] "Save address" checkbox
- [ ] Step 4: Shipping Method
  - [ ] Standard (Free over €150, otherwise €5.99)
  - [ ] Express (€9.99, 1-2 days)
  - [ ] Calculate shipping cost
  - [ ] Display estimated delivery
- [ ] Step 5: Payment
  - [ ] Integrate Stripe Elements
  - [ ] Card payment form
  - [ ] Apple Pay / Google Pay
  - [ ] Order summary sidebar
  - [ ] Terms & Privacy checkboxes
  - [ ] "Place Order" button
- [ ] Step 6: Order Confirmation
  - [ ] Order number (PUXX-IE-00001)
  - [ ] Order summary
  - [ ] "Thank you" message
  - [ ] Email confirmation sent message
  - [ ] "Track Order" button
- [ ] Implement form validation (React Hook Form + Zod)
- [ ] Error handling (payment failures)
- [ ] Loading states
- [ ] Mobile checkout optimization
- [ ] Test full checkout flow

**Deliverable:** ✅ Complete checkout with Stripe integration

---

### Week 5, Day 3-5: Order Management

**Status:** ⚪ Not Started

- [ ] Create Order model in database (already done in Phase 0)
- [ ] Implement order creation on payment success
  - [ ] Stripe webhook handler
  - [ ] Create order in database
  - [ ] Generate unique order number (PUXX-IE-00001)
  - [ ] Update inventory (deduct stock)
  - [ ] Clear cart
- [ ] Set up Stripe webhooks
  - [ ] payment_intent.succeeded
  - [ ] payment_intent.payment_failed
  - [ ] charge.refunded
- [ ] Handle payment confirmation webhook
- [ ] Send order confirmation email (customer)
  - [ ] Order number
  - [ ] Items ordered
  - [ ] Shipping address
  - [ ] Total paid
  - [ ] Estimated delivery
  - [ ] Tracking link (when available)
- [ ] Send order notification email (admin)
  - [ ] New order alert
  - [ ] Order details
  - [ ] Customer info
  - [ ] Link to admin dashboard
- [ ] Create order history page (customer view)
  - [ ] List all orders
  - [ ] Order number, date, status, total
  - [ ] "View Details" button
- [ ] Create order details page (customer view)
  - [ ] Order information
  - [ ] Items ordered
  - [ ] Shipping address
  - [ ] Payment info
  - [ ] Order timeline
  - [ ] Tracking number (if shipped)
  - [ ] Download invoice button
- [ ] Generate invoice PDF
  - [ ] Company header (PUXX Ireland)
  - [ ] Order details
  - [ ] Customer info
  - [ ] Items table
  - [ ] Total breakdown
  - [ ] Footer (terms)
- [ ] Test order flow end-to-end
  - [ ] Place order (Stripe test card)
  - [ ] Verify order created
  - [ ] Verify inventory deducted
  - [ ] Verify emails sent
  - [ ] Verify invoice generated

**Deliverable:** ✅ Order management system operational

---

## 🗂️ PHASE 3: Admin Dashboard (Week 6)

### Day 1-2: Dashboard Setup

**Status:** ⚪ Not Started

- [ ] Install TailAdmin Pro Next.js 16.x
- [ ] Configure emerald green theme
  - [ ] Update primary colors
  - [ ] Update accent colors
  - [ ] Update button styles
  - [ ] Update badges
  - [ ] Update charts colors
- [ ] Set up admin routes (/admin/*)
- [ ] Implement admin-only middleware
  - [ ] Check if user is logged in
  - [ ] Check if user has admin role
  - [ ] Redirect if unauthorized
- [ ] Create admin layout with sidebar
  - [ ] Logo
  - [ ] Navigation menu (Dashboard, Products, Orders, Customers, Analytics, Settings)
  - [ ] User profile dropdown
  - [ ] Logout button
- [ ] Build navigation menu
- [ ] Add role-based access control (RBAC)
  - [ ] Admin role: Full access
  - [ ] Manager role: Products, Orders, Customers
  - [ ] Support role: Orders only
  - [ ] Update profiles table with role field
  - [ ] Create RLS policies based on role
- [ ] Create admin login page
- [ ] Test admin authentication

**Deliverable:** ✅ Admin dashboard foundation

---

### Day 3: Dashboard Overview Page

**Status:** ⚪ Not Started

- [ ] Build 4 stat cards
  - [ ] Total Revenue (Today) - emerald green
  - [ ] Total Orders (Today) - blue
  - [ ] New Customers (Today) - orange
  - [ ] Low Stock Items - red
- [ ] Build revenue chart (Recharts line chart)
  - [ ] Emerald green line
  - [ ] Gradient fill
  - [ ] Date range filter (Today, Week, Month, Year, Custom)
  - [ ] Comparison to previous period
- [ ] Build recent orders table
  - [ ] Latest 5 orders
  - [ ] Order number, customer, total, status
  - [ ] Quick actions: View, Update Status
- [ ] Build top products section
  - [ ] Best sellers by revenue
  - [ ] Product name, sales count, revenue
  - [ ] Product image thumbnail
- [ ] Build low stock alerts
  - [ ] Products below reorder threshold
  - [ ] Current stock, reorder point
  - [ ] "Update Stock" button
  - [ ] Red badge for critical (< 5)
  - [ ] Yellow badge for low (< 20)
- [ ] Build sales by category pie chart
  - [ ] Mint vs Fruit vs Specialty
  - [ ] Percentage breakdown
  - [ ] Emerald green, teal, orange slices
- [ ] Implement real-time order notifications (Supabase Realtime)
  - [ ] Subscribe to new orders
  - [ ] Show toast notification
  - [ ] Play notification sound
  - [ ] Update order count
  - [ ] Refresh revenue chart
- [ ] Test real-time features

**Deliverable:** ✅ Dashboard overview with real-time data

---

### Day 4: Products Management

**Status:** ⚪ Not Started

- [ ] Build product list table (TanStack Table)
  - [ ] Columns: Image, Name, SKU, Category, Strength, Price, Stock, Status, Actions
  - [ ] Sortable columns
  - [ ] Search bar (name, SKU)
  - [ ] Filters (Category, Strength, Status)
  - [ ] Pagination (20 per page)
  - [ ] Bulk selection checkboxes
  - [ ] Bulk actions: Delete, Activate, Deactivate
- [ ] Add "Add Product" button (emerald green)
- [ ] Build "Add Product" form
  - [ ] Product name
  - [ ] SKU (auto-generated or manual)
  - [ ] Description (textarea, rich text editor optional)
  - [ ] Category (dropdown)
  - [ ] Price (EUR)
  - [ ] Stock quantity
  - [ ] Reorder point
  - [ ] Strength (dropdown: 6mg, 16mg, 22mg)
  - [ ] Flavor profile (multi-select)
  - [ ] Image upload (main image)
  - [ ] Gallery images (up to 4)
  - [ ] Image preview
  - [ ] Drag to reorder images
  - [ ] SEO fields (meta title, description, slug)
  - [ ] Featured product checkbox
  - [ ] Active checkbox
- [ ] Build "Edit Product" form (same as add)
- [ ] Implement delete product (soft delete)
  - [ ] Confirmation dialog
  - [ ] Set active = false
- [ ] Implement bulk actions
  - [ ] Delete selected
  - [ ] Activate selected
  - [ ] Deactivate selected
- [ ] Test CRUD operations
  - [ ] Create product
  - [ ] Read/list products
  - [ ] Update product
  - [ ] Delete product

**Deliverable:** ✅ Complete product management

---

### Day 5: Orders & Customers Management

**Status:** ⚪ Not Started

#### Orders Management
- [ ] Build orders list table (TanStack Table)
  - [ ] Columns: Order #, Date, Customer, Items, Total, Payment, Status, Actions
  - [ ] Sortable columns
  - [ ] Search bar (order number, customer name, email)
  - [ ] Filters (Status, Payment Status, Date Range)
  - [ ] Pagination (25 per page)
- [ ] Add status badges
  - [ ] Pending: Yellow
  - [ ] Processing: Blue
  - [ ] Shipped: Emerald Green
  - [ ] Delivered: Dark Green
  - [ ] Cancelled: Red
  - [ ] Refunded: Gray
- [ ] Build order detail modal
  - [ ] Order header (number, date, status dropdown)
  - [ ] Customer information
  - [ ] Order items table
  - [ ] Order summary (subtotal, shipping, total)
  - [ ] Payment information
  - [ ] Shipping information
  - [ ] Tracking number input
  - [ ] Order timeline
  - [ ] Admin notes (textarea)
  - [ ] "Print Invoice" button
  - [ ] "Send Tracking Email" button
  - [ ] "Mark as Shipped" button
- [ ] Implement order status updates
  - [ ] Update status dropdown
  - [ ] Send email on status change
  - [ ] Update order timeline
- [ ] Add tracking number input
  - [ ] Save tracking number
  - [ ] Send tracking email to customer
- [ ] Generate invoice PDF button
  - [ ] Use jsPDF or similar
  - [ ] Company header, order details, items table
  - [ ] Download as PDF
- [ ] Test order updates

#### Customers Management
- [ ] Build customer list table
  - [ ] Columns: Name, Email, Phone, Orders, Total Spent, Last Order, Joined, Actions
  - [ ] Sortable columns
  - [ ] Search bar (name, email, phone)
  - [ ] Filters (Registered vs Guest, Has Orders)
  - [ ] Pagination (25 per page)
- [ ] Build customer detail page
  - [ ] Customer info card
  - [ ] Stats: Orders, Total Spent, AOV
  - [ ] Order history table
  - [ ] Saved addresses
  - [ ] Admin notes
  - [ ] "Send Email" button
  - [ ] "Deactivate Account" button
- [ ] Test customer management

**Deliverable:** ✅ Order and customer management

---

### Day 6-7: Analytics & Settings

**Status:** ⚪ Not Started

#### Analytics
- [ ] Build analytics page
  - [ ] Revenue over time (line chart, emerald green)
  - [ ] Sales by category (pie chart)
  - [ ] Top products (bar chart, emerald bars)
  - [ ] Conversion funnel (funnel chart)
- [ ] Build metrics cards
  - [ ] Total Revenue (Period)
  - [ ] Total Orders (Period)
  - [ ] Average Order Value
  - [ ] Conversion Rate
  - [ ] Return Customer Rate
  - [ ] Customer Lifetime Value (CLV)
- [ ] Add date range filters
- [ ] Export data to CSV

#### Settings
- [ ] Build General Settings page
  - [ ] Site name
  - [ ] Site logo upload
  - [ ] Favicon upload
  - [ ] Contact email
  - [ ] Support email
  - [ ] Phone number
  - [ ] Company address
  - [ ] Instagram URL
  - [ ] Facebook URL
  - [ ] Minimum order quantity (default: 5)
  - [ ] Free shipping threshold (default: €150)
- [ ] Build Payment Settings page
  - [ ] Stripe Publishable Key (Live)
  - [ ] Stripe Secret Key (Live)
  - [ ] Stripe Publishable Key (Test)
  - [ ] Stripe Secret Key (Test)
  - [ ] Test mode toggle
  - [ ] Webhook secret
  - [ ] Accepted currencies (EUR)
- [ ] Build Shipping Settings page
  - [ ] Shipping zones table
  - [ ] Add shipping zone (e.g., "Ireland")
  - [ ] Shipping methods per zone
    - [ ] Standard (Free over €150, otherwise €5.99)
    - [ ] Express (€9.99, 1-2 days)
- [ ] Build Tax Settings page
  - [ ] Enable tax calculation toggle
  - [ ] Tax name (VAT)
  - [ ] Tax rate (23% - Ireland standard rate)
  - [ ] Tax display (Inclusive or Exclusive)
  - [ ] VAT Registration Number
- [ ] Build Email Templates page
  - [ ] List templates (Order Confirmation, Shipping, Delivery, etc.)
  - [ ] Edit template (Subject, HTML editor)
  - [ ] Variables ({{orderNumber}}, {{customerName}}, etc.)
  - [ ] Preview pane
  - [ ] Send test email
- [ ] Build Users & Roles page
  - [ ] List admin users
  - [ ] Add admin user
  - [ ] Edit user role (Admin, Manager, Support)
  - [ ] Remove admin user
- [ ] Test all settings updates
- [ ] Add activity log
  - [ ] Log all admin actions
  - [ ] Display log with filters

**Deliverable:** ✅ Complete admin dashboard

---

## 🗂️ PHASE 4: SEO Foundation (Week 7)

### Day 1-2: Technical SEO

**Status:** ⚪ Not Started

- [ ] Configure next-seo for all pages
  - [ ] Homepage
  - [ ] Shop page
  - [ ] Product pages (all 14)
  - [ ] Contact page
  - [ ] About page
  - [ ] Static pages
- [ ] Add schema.org markup
  - [ ] OrganizationJsonLd (homepage)
  - [ ] LocalBusinessJsonLd (homepage)
  - [ ] ProductJsonLd (all product pages)
  - [ ] BreadcrumbJsonLd (all pages)
  - [ ] FAQPageJsonLd (FAQ page)
- [ ] Generate sitemap.xml (next-sitemap)
  - [ ] Configure next-sitemap.config.js
  - [ ] Set priorities (homepage: 1.0, shop: 0.9, products: 0.9)
  - [ ] Set changefreq (daily for shop, weekly for products)
  - [ ] Run postbuild script
- [ ] Configure robots.txt
  - [ ] Allow all (except /admin, /api)
  - [ ] Sitemap URL
- [ ] Set up Google Search Console
  - [ ] Verify domain ownership
  - [ ] Submit sitemap
- [ ] Set up Google Analytics 4
  - [ ] Create GA4 property
  - [ ] Install tracking code
  - [ ] Configure events (page_view, add_to_cart, purchase)
  - [ ] Test tracking
- [ ] Run Lighthouse audits on all key pages
  - [ ] Homepage
  - [ ] Shop page
  - [ ] Product detail page
  - [ ] Checkout page
- [ ] Fix critical SEO issues
- [ ] Target Lighthouse SEO score 95+

**Deliverable:** ✅ Technical SEO foundation complete

---

### Day 3-4: On-Page SEO & Content

**Status:** ⚪ Not Started

- [ ] Optimize all meta titles (60-70 chars)
  - [ ] Homepage: "PUXX Ireland - Premium Tobacco-Free Nicotine Pouches | 14 Flavors"
  - [ ] Shop: "Buy Nicotine Pouches Ireland | 14 Flavors Available | PUXX Ireland"
  - [ ] Products: "{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX"
- [ ] Optimize all meta descriptions (150-160 chars)
  - [ ] Unique for each page
  - [ ] Include primary keyword
  - [ ] Include CTA
- [ ] Add alt text to all images
  - [ ] Pattern: "{Product Name} nicotine pouches {strength}mg - {flavor description}"
- [ ] Optimize H1s, H2s, H3s
  - [ ] One H1 per page
  - [ ] Include primary keyword in H1
  - [ ] Logical hierarchy
- [ ] Add FAQ section to homepage
  - [ ] What are nicotine pouches?
  - [ ] How to use them?
  - [ ] Are they safe?
  - [ ] Shipping to Ireland?
  - [ ] Age restriction?
- [ ] Write and publish first 2 blog posts
  - [ ] "What Are Nicotine Pouches? Complete Guide (2025)" (1500+ words)
  - [ ] "Best Nicotine Pouch Flavors in Ireland (2025)" (1500+ words)
- [ ] Create blog layout
  - [ ] Blog listing page
  - [ ] Blog post template
  - [ ] Author bio
  - [ ] Related posts
  - [ ] Social sharing buttons
- [ ] Add social sharing buttons
- [ ] Internal linking strategy
  - [ ] Link from homepage to all product categories
  - [ ] Link from products to related products
  - [ ] Link from blog posts to products
- [ ] Optimize images (WebP, compression)
  - [ ] Use next/image
  - [ ] Set explicit width/height
  - [ ] Lazy load below fold

**Deliverable:** ✅ On-page SEO optimized + 2 blog posts live

---

### Day 5-7: Link Building & Local SEO

**Status:** ⚪ Not Started

- [ ] Create Google Business Profile
  - [ ] Complete all fields
  - [ ] Category: "Health and Beauty Shop" or closest match
  - [ ] Add photos (products, logo, cover image)
  - [ ] Add service areas (Ireland, all counties)
  - [ ] Write business description (keywords: nicotine pouches, tobacco-free, Ireland)
  - [ ] Add attributes (Online service, Delivery)
  - [ ] Verify business
- [ ] Submit to 20 Irish business directories
  - [ ] GoldenPages.ie
  - [ ] YellowPages.ie
  - [ ] LocalFind.ie
  - [ ] Yelp Ireland
  - [ ] Chamber of Commerce
  - [ ] Irish Business Hub
  - [ ] IrishBusinessHub.com
  - [ ] Irish E-commerce Association
  - [ ] [12 more directories]
- [ ] Create social media profiles
  - [ ] Instagram (@puxxireland)
    - [ ] Profile photo (logo)
    - [ ] Bio: "Premium tobacco-free nicotine pouches in Ireland 🇮🇪 | 14 flavors | Free delivery €150+ | 18+ only"
    - [ ] Link to website
  - [ ] Facebook (PUXX Ireland)
    - [ ] Cover photo, profile photo
    - [ ] About section
    - [ ] Contact info
    - [ ] Shop section
  - [ ] Twitter/X (@puxxireland)
- [ ] Set up rank tracking (SERPBear)
  - [ ] Install SERPBear
  - [ ] Add 20 primary keywords
    - [ ] nicotine pouches Ireland
    - [ ] tobacco free pouches Ireland
    - [ ] nicotine pouches buy Ireland
    - [ ] best nicotine pouches Ireland
    - [ ] buy nicotine pouches online Ireland
    - [ ] [15 more keywords]
  - [ ] Configure daily tracking
  - [ ] Set baseline rankings
- [ ] Write and submit press release
  - [ ] "New Premium Nicotine Pouch Brand Launches in Ireland"
  - [ ] Submit to Irish news sites
    - [ ] TheJournal.ie
    - [ ] Independent.ie
    - [ ] Irish Times
    - [ ] RTE News
    - [ ] Local newspapers
- [ ] Reach out to 10 Irish bloggers for product reviews
  - [ ] Research Irish lifestyle/health bloggers
  - [ ] Draft outreach email
  - [ ] Offer free product samples
  - [ ] Request honest review with backlink
- [ ] Launch affiliate program
  - [ ] Create affiliate page
  - [ ] 10% commission on sales
  - [ ] Provide marketing materials
  - [ ] Sign up first 5 affiliates

**Deliverable:** ✅ SEO foundation + link building started

---

## 🗂️ PHASE 5: Compliance & Legal (Week 8)

### Day 1-2: Age Verification

**Status:** ⚪ Not Started

- [ ] Implement age gate landing page
  - [ ] Full-screen modal on first visit
  - [ ] Date of birth entry (DD/MM/YYYY)
  - [ ] Calculate age (must be 18+)
  - [ ] Block if under 18 (show rejection page)
  - [ ] Cookie/session storage (24h)
  - [ ] Re-verify after 24 hours
- [ ] Add age verification to registration
  - [ ] "I am 18 years or older" checkbox (required)
  - [ ] Date of birth field
  - [ ] Store verification in database
  - [ ] Timestamp of verification
- [ ] Add age verification to checkout
  - [ ] "I confirm I am 18 years or older to purchase this product" checkbox (required)
  - [ ] Cannot proceed without checking
- [ ] Store verification in database
  - [ ] age_verified (boolean)
  - [ ] age_verified_at (timestamp)
- [ ] Create under-18 rejection page
  - [ ] Clear message: "You must be 18+ to access this site"
  - [ ] Explanation of age restriction
  - [ ] Link to responsible use resources
- [ ] Test age verification flow
  - [ ] Under 18 (blocked)
  - [ ] 18+ (allowed)
  - [ ] Re-verification after 24h
- [ ] Add "18+ only" notices
  - [ ] Footer (every page)
  - [ ] Checkout page
  - [ ] Product pages
  - [ ] Homepage

**Deliverable:** ✅ Age verification implemented

---

### Day 3-4: Legal Pages & GDPR

**Status:** ⚪ Not Started

- [ ] Draft Terms & Conditions (consult solicitor)
  - [ ] Definitions
  - [ ] Age restriction (18+)
  - [ ] Product information
  - [ ] Ordering and payment
  - [ ] Shipping and delivery
  - [ ] Returns and refunds
  - [ ] Limitation of liability
  - [ ] Governing law (Irish law)
  - [ ] Dispute resolution
- [ ] Draft Privacy Policy (GDPR compliant)
  - [ ] Data controller information
  - [ ] Data collected (personal info, usage data)
  - [ ] Lawful basis for processing
  - [ ] How data is used
  - [ ] Data sharing (Stripe, email service)
  - [ ] Data retention
  - [ ] User rights (access, export, delete, object)
  - [ ] Cookies
  - [ ] Contact for data requests
- [ ] Draft Cookie Policy
  - [ ] What are cookies
  - [ ] Cookies we use (essential, analytics, marketing)
  - [ ] Third-party cookies (Google Analytics, Stripe)
  - [ ] How to control cookies
- [ ] Draft Refund Policy
  - [ ] Return window (14 days)
  - [ ] Conditions for returns (unopened, unused)
  - [ ] Refund process
  - [ ] Processing time
  - [ ] Exclusions
- [ ] Draft Shipping Policy
  - [ ] Shipping zones (Ireland)
  - [ ] Delivery times (3-5 business days)
  - [ ] Shipping costs (Free over €150, otherwise €5.99)
  - [ ] Order tracking
  - [ ] Missing/damaged orders
- [ ] Implement cookie consent banner
  - [ ] Banner at bottom of page
  - [ ] "This site uses cookies" message
  - [ ] "Accept All" button
  - [ ] "Manage Preferences" button
  - [ ] Cookie settings modal (Essential, Analytics, Marketing)
  - [ ] Save preferences to localStorage
- [ ] Add GDPR data export functionality
  - [ ] "Export My Data" button in account settings
  - [ ] Generate JSON file with user data
  - [ ] Download link
- [ ] Add GDPR data delete functionality
  - [ ] "Delete My Account" button
  - [ ] Confirmation modal
  - [ ] Delete user data
  - [ ] Anonymize order history
  - [ ] Send deletion confirmation email
- [ ] Add newsletter opt-in consent
  - [ ] Checkbox on registration
  - [ ] Checkbox on checkout
  - [ ] Checkbox in footer
  - [ ] Clear consent language
- [ ] Add transactional email consent (checkout)
  - [ ] "I consent to receive transactional emails related to my order" checkbox
- [ ] Review all forms for GDPR compliance
  - [ ] Contact form
  - [ ] Registration form
  - [ ] Checkout form
  - [ ] Newsletter signup
- [ ] Add privacy policy links to all forms

**Deliverable:** ✅ Legal compliance complete

---

### Day 5: Payment & Nicotine Compliance

**Status:** ⚪ Not Started

- [ ] Add nicotine warning banner (all pages)
  - [ ] Black bar at top
  - [ ] White text: "WARNING: This product contains nicotine. Nicotine is an addictive chemical"
  - [ ] Display on every page
  - [ ] Cannot be dismissed
- [ ] Add Stripe-required links to checkout
  - [ ] Terms of Service link
  - [ ] Refund Policy link
  - [ ] Privacy Policy link
- [ ] Display security badges
  - [ ] SSL badge (footer)
  - [ ] Stripe badge (checkout)
  - [ ] "Secure Checkout" badge
- [ ] Test refund flow (Stripe test mode)
  - [ ] Process test order
  - [ ] Refund from Stripe dashboard
  - [ ] Verify webhook received
  - [ ] Verify refund email sent
  - [ ] Verify order status updated
- [ ] Set up Stripe webhooks (production)
  - [ ] Add webhook endpoint URL
  - [ ] Configure events (payment_intent.succeeded, etc.)
  - [ ] Get webhook secret
  - [ ] Update environment variables
- [ ] Verify webhook endpoints
  - [ ] Test payment success webhook
  - [ ] Test payment failure webhook
  - [ ] Test refund webhook
- [ ] Add business information to footer
  - [ ] Company name: PUXX Ireland
  - [ ] Registered address (if applicable)
  - [ ] VAT number (if registered)
  - [ ] Contact email
- [ ] Review Irish nicotine product regulations
  - [ ] Age restrictions (18+) ✓
  - [ ] Packaging requirements
  - [ ] Advertising restrictions
  - [ ] Sale restrictions
  - [ ] Health warnings ✓
- [ ] Ensure compliance with all requirements

**Deliverable:** ✅ Full compliance with Irish regulations

---

## 🗂️ PHASE 6: Testing & QA (Week 9)

### Day 1-2: Functional Testing

**Status:** ⚪ Not Started

- [ ] Test user registration
  - [ ] Email registration
  - [ ] Google OAuth
  - [ ] Email verification
  - [ ] Age verification
- [ ] Test user login
  - [ ] Email/password
  - [ ] Google OAuth
  - [ ] "Remember me"
  - [ ] Session persistence
- [ ] Test password reset
  - [ ] Request reset email
  - [ ] Click reset link
  - [ ] Set new password
  - [ ] Login with new password
- [ ] Test product browsing
  - [ ] Homepage product grid
  - [ ] Shop page
  - [ ] Filters (category, strength, price)
  - [ ] Sorting (featured, price, name)
  - [ ] Search
  - [ ] Pagination
- [ ] Test product detail pages (all 14)
  - [ ] Images display
  - [ ] Information correct
  - [ ] "Add to Cart" works
  - [ ] Quantity selector
  - [ ] Related products
- [ ] Test shopping cart
  - [ ] Add to cart (shop page, product page, homepage)
  - [ ] Update quantities
  - [ ] Remove items
  - [ ] Cart badge updates
  - [ ] Minimum order validation (5 tins)
  - [ ] Free shipping indicator (€150)
  - [ ] Cart persistence (localStorage)
  - [ ] Cart sync (logged-in users)
- [ ] Test checkout flow (all 5 steps)
  - [ ] Cart review
  - [ ] Customer information
  - [ ] Shipping address (Irish address)
  - [ ] Shipping method (Standard, Express)
  - [ ] Payment (Stripe test cards)
    - [ ] Successful payment (4242 4242 4242 4242)
    - [ ] Failed payment (4000 0000 0000 0002)
    - [ ] 3D Secure (4000 0027 6000 3184)
  - [ ] Order confirmation
- [ ] Test order emails
  - [ ] Order confirmation (customer)
  - [ ] Order notification (admin)
- [ ] Test order history
  - [ ] View all orders
  - [ ] View order details
  - [ ] Download invoice
- [ ] Test age verification
  - [ ] Age gate on first visit
  - [ ] Under 18 (blocked)
  - [ ] 18+ (allowed)
  - [ ] Re-verification after 24h
  - [ ] Checkout age verification
- [ ] Test contact form
  - [ ] Fill form
  - [ ] Submit
  - [ ] Verify email sent
  - [ ] Check spam folder
- [ ] Test newsletter signup
  - [ ] Submit email
  - [ ] Verify stored in database
  - [ ] Verify confirmation email (if implemented)
- [ ] Test admin dashboard
  - [ ] Admin login
  - [ ] View dashboard (stats, charts)
  - [ ] Product management (add, edit, delete)
  - [ ] Order management (view, update status, add tracking)
  - [ ] Customer management
  - [ ] Settings updates
  - [ ] Real-time notifications (new order)

**Test on All Browsers:**
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

**Test on All Devices:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad, Android tablet)
- [ ] Mobile (iPhone 14, iPhone SE, Android)

**Test Accessibility:**
- [ ] Screen reader (NVDA, VoiceOver)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators
- [ ] Alt text on images

**Deliverable:** ✅ All features tested and working

---

### Day 3: Performance Testing

**Status:** ⚪ Not Started

- [ ] Run Lighthouse audits on all key pages
  - [ ] Homepage
  - [ ] Shop page
  - [ ] Product detail page (Cool Mint)
  - [ ] Checkout page
  - [ ] Blog post
- [ ] Target scores (all pages)
  - [ ] Performance: 90+
  - [ ] Accessibility: 95+
  - [ ] Best Practices: 90+
  - [ ] SEO: 95+
- [ ] Measure Core Web Vitals
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Optimize images (if needed)
  - [ ] Further compress
  - [ ] Convert to WebP
  - [ ] Lazy load
- [ ] Minify CSS/JS
  - [ ] Verify Next.js minification
  - [ ] Check bundle sizes
- [ ] Enable compression
  - [ ] Brotli (Vercel default)
  - [ ] Gzip fallback
- [ ] Implement code splitting
  - [ ] Dynamic imports for heavy components
  - [ ] Route-based splitting (Next.js default)
- [ ] Lazy load images below fold
  - [ ] Use next/image loading="lazy"
  - [ ] Intersection Observer
- [ ] Preload critical resources
  - [ ] Hero image
  - [ ] Logo
  - [ ] Critical fonts
- [ ] Add caching headers
  - [ ] Vercel handles this
  - [ ] Verify in Network tab
- [ ] Test on slow 3G connection
  - [ ] Chrome DevTools Network throttling
  - [ ] Acceptable load times?
- [ ] Test with throttled CPU
  - [ ] Chrome DevTools Performance
  - [ ] 4x slowdown
- [ ] Run PageSpeed Insights (Google)
  - [ ] Get mobile score
  - [ ] Get desktop score
  - [ ] Fix recommendations
- [ ] Run GTmetrix
  - [ ] Get performance score
  - [ ] Get structure score
  - [ ] Fix recommendations
- [ ] Fix all performance issues
  - [ ] Document issues found
  - [ ] Prioritize (high, medium, low)
  - [ ] Fix high priority
  - [ ] Fix medium priority
  - [ ] Document low priority for later

**Deliverable:** ✅ Lighthouse 90+ on all metrics

---

### Day 4: Security Testing

**Status:** ⚪ Not Started

- [ ] Run OWASP ZAP security scan
  - [ ] Full site scan
  - [ ] Review alerts
  - [ ] Fix critical issues
  - [ ] Fix high issues
  - [ ] Document medium/low for review
- [ ] Run Snyk dependency scan
  - [ ] Scan package.json
  - [ ] Review vulnerabilities
  - [ ] Update vulnerable packages
  - [ ] Fix critical vulnerabilities
- [ ] Check for SQL injection vulnerabilities
  - [ ] Supabase RLS protects against this
  - [ ] Test admin inputs
  - [ ] Verify parameterized queries
- [ ] Check for XSS vulnerabilities
  - [ ] Test all user inputs (forms)
  - [ ] Verify React escapes output
  - [ ] Check for dangerouslySetInnerHTML usage
- [ ] Verify CSRF tokens in forms
  - [ ] NextAuth.js handles this
  - [ ] Test form submissions
- [ ] Test rate limiting (Vercel)
  - [ ] Verify Vercel rate limits active
  - [ ] Test API routes (max requests)
- [ ] Verify secure headers
  - [ ] CSP (Content Security Policy)
  - [ ] HSTS (HTTP Strict Transport Security)
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Check headers with securityheaders.com
- [ ] Check environment variables (not exposed)
  - [ ] NEXT_PUBLIC_* only public vars
  - [ ] No secrets in client-side code
  - [ ] Check browser DevTools Network/Console
- [ ] Verify API keys not in client-side code
  - [ ] Check source code
  - [ ] Check bundle
  - [ ] No Stripe secret key exposed
- [ ] Test RLS policies (Supabase)
  - [ ] Regular user can't access admin data
  - [ ] Support user can't delete orders
  - [ ] Users can only see their own orders
  - [ ] Test in Supabase dashboard
- [ ] Verify HTTPS enforced
  - [ ] No mixed content warnings
  - [ ] All resources loaded via HTTPS
  - [ ] Check in browser console
- [ ] Test password strength requirements
  - [ ] Minimum 8 characters
  - [ ] Reject weak passwords (123456, password)
  - [ ] Test during registration
- [ ] Test 2FA (if implemented)
  - [ ] Setup 2FA
  - [ ] Login with 2FA
  - [ ] Test backup codes
- [ ] Review Stripe webhook security
  - [ ] Verify webhook signature
  - [ ] Check webhook secret configured
  - [ ] Test invalid signature
- [ ] Fix all critical security issues

**Deliverable:** ✅ Security audit passed

---

### Day 5: User Acceptance Testing (UAT)

**Status:** ⚪ Not Started

- [ ] Recruit 5 internal testers
  - [ ] Friends, family, colleagues
  - [ ] Provide test accounts
- [ ] Recruit 10 beta customers
  - [ ] Email list (if available)
  - [ ] Social media followers
  - [ ] Offer 20% discount for participation
- [ ] Create UAT test script
  - [ ] Browse products
  - [ ] Add 5 products to cart
  - [ ] Proceed to checkout
  - [ ] Complete purchase (Stripe test card provided)
  - [ ] Check order confirmation email
  - [ ] View order in "My Account"
  - [ ] Rate overall experience (1-10)
  - [ ] Report any bugs or issues
  - [ ] Provide feedback on design/UX
- [ ] Send UAT instructions to participants
  - [ ] Test URL (staging.puxxireland.ie)
  - [ ] Test Stripe card (4242 4242 4242 4242)
  - [ ] Feedback form link (Google Form)
- [ ] Collect feedback via Google Form
  - [ ] Overall experience rating
  - [ ] Ease of navigation
  - [ ] Checkout experience
  - [ ] Mobile usability
  - [ ] Loading speeds
  - [ ] Design/branding (like the green?)
  - [ ] Any bugs/issues
  - [ ] Open feedback
- [ ] Analyze feedback
  - [ ] Compile all responses
  - [ ] Identify common issues
  - [ ] Categorize feedback (bugs, UX, design, content)
- [ ] Prioritize issues
  - [ ] Critical (blocking launch)
  - [ ] High (fix before launch)
  - [ ] Medium (nice to have)
  - [ ] Low (post-launch)
- [ ] Fix critical issues
  - [ ] Document issue
  - [ ] Fix
  - [ ] Test fix
  - [ ] Re-test with UAT participant
- [ ] Fix high priority issues
- [ ] Document medium/low issues for post-launch
  - [ ] Create GitHub issues
  - [ ] Add to backlog
- [ ] Re-test fixes with beta users
  - [ ] Email updated test site
  - [ ] Request re-test
  - [ ] Confirm issues resolved

**Deliverable:** ✅ UAT feedback incorporated, critical bugs fixed

---

## 🗂️ PHASE 7: Launch (Week 10)

### Day 1-2: Pre-Launch Checklist

**Status:** ⚪ Not Started

#### Content
- [ ] All product descriptions finalized
- [ ] All product images uploaded (high quality)
- [ ] Legal pages reviewed and published
  - [ ] Terms & Conditions
  - [ ] Privacy Policy
  - [ ] Cookie Policy
  - [ ] Refund Policy
  - [ ] Shipping Policy
- [ ] About Us page content finalized
- [ ] Contact information updated
- [ ] Social media links added
- [ ] Blog posts published (at least 2)

#### Technical
- [ ] Domain purchased (puxxireland.ie)
- [ ] DNS configured (point to Vercel)
- [ ] SSL certificate active (auto via Vercel)
- [ ] Production environment variables set
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] STRIPE_PUBLISHABLE_KEY (live)
  - [ ] STRIPE_SECRET_KEY (live)
  - [ ] STRIPE_WEBHOOK_SECRET
  - [ ] SENDGRID_API_KEY
  - [ ] SENDGRID_FROM_EMAIL
  - [ ] NEXT_PUBLIC_SITE_URL
  - [ ] NEXT_PUBLIC_GA_ID (Google Analytics)
- [ ] Database backups configured (Supabase)
- [ ] Error monitoring set up (Sentry)
  - [ ] Create Sentry project
  - [ ] Install Sentry SDK
  - [ ] Configure DSN
  - [ ] Test error reporting
- [ ] Google Analytics tracking verified
  - [ ] GA4 property created
  - [ ] Tracking code installed
  - [ ] Events configured
  - [ ] Test tracking (Real-time view)
- [ ] Google Tag Manager installed (optional)
- [ ] Facebook Pixel (if using ads)
- [ ] Email service configured (SendGrid/Postmark)
  - [ ] API key set
  - [ ] Verified sender email
  - [ ] Test email send

#### Payments
- [ ] Stripe account activated (Ireland)
  - [ ] Business information complete
  - [ ] Bank account connected
  - [ ] Identity verification complete
- [ ] Live payment keys configured
- [ ] Test live transaction (small amount, then refund)
- [ ] Refund process tested (live mode)
- [ ] Webhook endpoints verified (production)
  - [ ] Webhook URL: https://puxxireland.ie/api/webhooks/stripe
  - [ ] Events: payment_intent.succeeded, etc.
  - [ ] Secret saved in env vars
- [ ] Payout schedule configured (daily, weekly, monthly)

#### SEO
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC
- [ ] Robots.txt configured
- [ ] Meta tags verified on all pages
- [ ] Schema markup validated (Google Rich Results Test)
- [ ] OG images set for all pages
- [ ] Canonical URLs verified

#### Marketing
- [ ] Instagram profile created (@puxxireland)
  - [ ] Profile photo (logo)
  - [ ] Bio written
  - [ ] Link to website
  - [ ] First 5 posts scheduled
- [ ] Facebook page created
  - [ ] Cover photo, profile photo
  - [ ] About section
  - [ ] Shop tab enabled
- [ ] Launch announcement email drafted
  - [ ] Subject: "PUXX Ireland is Now Live! 🇮🇪"
  - [ ] Offer: 10% off with code LAUNCH10
  - [ ] CTA: Shop Now
- [ ] Social media posts scheduled (launch day)
  - [ ] Instagram posts (3-5)
  - [ ] Facebook posts (3-5)
  - [ ] Twitter/X posts (5-10)
- [ ] Press release written
- [ ] Beta customer list (50-100 emails)
- [ ] Influencer outreach list (10-20 influencers)

**Deliverable:** ✅ All pre-launch items complete

---

### Day 3: Soft Launch (Beta)

**Status:** ⚪ Not Started

#### Morning (9:00 AM)
- [ ] Deploy to production (Vercel)
  - [ ] Merge to main branch
  - [ ] Verify deployment successful
  - [ ] Check build logs
- [ ] Verify site is live at puxxireland.ie
  - [ ] Homepage loads
  - [ ] Shop page loads
  - [ ] Product pages load
  - [ ] Checkout works
  - [ ] Admin dashboard accessible

#### Late Morning (11:00 AM)
- [ ] Send beta launch emails (50-100 people)
  - [ ] Subject: "You're Invited: PUXX Ireland Beta Launch 🇮🇪"
  - [ ] Exclusive 20% off code: BETA20
  - [ ] Request feedback
- [ ] Announce on personal social media
  - [ ] LinkedIn post
  - [ ] Instagram story
  - [ ] Facebook post

#### Throughout Day
- [ ] Monitor error logs (Sentry)
  - [ ] Check for errors
  - [ ] Fix critical errors immediately
  - [ ] Document non-critical for later
- [ ] Monitor server performance (Vercel Analytics)
  - [ ] Response times
  - [ ] Error rates
  - [ ] Traffic volume
- [ ] Monitor first orders
  - [ ] Verify orders created correctly
  - [ ] Verify payment processing
  - [ ] Verify confirmation emails sent
  - [ ] Verify inventory deducted
  - [ ] Check admin dashboard
- [ ] Process first test orders end-to-end
  - [ ] Place order (real product, real payment)
  - [ ] Receive payment
  - [ ] Pack product
  - [ ] Ship product
  - [ ] Update tracking number
  - [ ] Verify customer receives confirmation
  - [ ] Follow up with customer
- [ ] Respond to beta customer questions
  - [ ] Email support
  - [ ] Social media DMs
  - [ ] Same-day responses
- [ ] Collect feedback via email
  - [ ] Ask: "How was your experience?"
  - [ ] "Any issues?"
  - [ ] "What could be improved?"
- [ ] Monitor Google Analytics
  - [ ] Traffic sources
  - [ ] Page views
  - [ ] Conversion rate
  - [ ] Cart abandonment
- [ ] Fix any bugs reported
  - [ ] Hotfix if critical
  - [ ] Test fix
  - [ ] Deploy fix
  - [ ] Notify reporter
- [ ] Make adjustments based on feedback

#### Evening (6:00 PM)
- [ ] Review day's performance
  - [ ] Total orders: ___
  - [ ] Total revenue: €___
  - [ ] Conversion rate: ___%
  - [ ] Top traffic sources
  - [ ] Issues encountered
- [ ] Document learnings
- [ ] Plan adjustments for public launch

**Target Metrics (3-day beta):**
- 10+ orders
- 0 critical bugs
- 0 payment failures
- Positive feedback from beta users

**Deliverable:** ✅ Soft launch successful, bugs fixed

---

### Day 4-5: Public Launch

**Status:** ⚪ Not Started

#### Launch Day Timeline

**9:00 AM - Pre-Launch Check**
- [ ] Verify site is online (puxxireland.ie)
- [ ] Test checkout flow one final time
  - [ ] Add product to cart
  - [ ] Complete checkout
  - [ ] Verify order created
  - [ ] Verify email sent
- [ ] Verify Stripe is in live mode
- [ ] Verify email service is working
- [ ] Verify inventory levels correct (stock for all products)
- [ ] Team briefing (if team)
  - [ ] Roles and responsibilities
  - [ ] Response protocols
  - [ ] Contact info

**10:00 AM - Social Media Announcement**
- [ ] Post launch announcement on Instagram
  - [ ] Image: Product hero shot with Irish flag
  - [ ] Caption: "We're LIVE! 🇮🇪 PUXX Ireland is now open..."
  - [ ] Hashtags: #PUXXIreland #NicotinePouches #TobaccoFree
  - [ ] Link in bio
- [ ] Post launch announcement on Facebook
  - [ ] Similar content
  - [ ] Shop Now button
- [ ] Post on Twitter/X
  - [ ] Thread (5-10 tweets)
  - [ ] Intro, products, offer, link
- [ ] Post on LinkedIn (personal + company page)
  - [ ] Business story angle
  - [ ] "Excited to announce..."
- [ ] Share in relevant Facebook groups
  - [ ] Irish business groups
  - [ ] E-commerce groups
  - [ ] Nicotine alternative groups
- [ ] Share in Irish business communities

**11:00 AM - Email Campaign**
- [ ] Send launch email to full list (500-1000 emails)
  - [ ] Subject: "PUXX Ireland is Now Live! 🇮🇪"
  - [ ] Offer: 10% off first order with code LAUNCH10
  - [ ] CTA: Shop Now
  - [ ] Beautiful design (emerald green theme)
- [ ] Send personalized emails to influencers
  - [ ] Personal note
  - [ ] Free product offer
  - [ ] Request for review/shoutout
- [ ] Send email to press contacts
  - [ ] Personal pitch
  - [ ] Press release attached
  - [ ] Offer interview/more info

**12:00 PM - Press Release**
- [ ] Submit press release to Irish news sites
  - [ ] TheJournal.ie (press@thejournal.ie)
  - [ ] Independent.ie (news@independent.ie)
  - [ ] Irish Times (newsdesk@irishtimes.com)
  - [ ] RTE News (newsonline@rte.ie)
  - [ ] Local newspapers (Cork, Dublin, Galway)
- [ ] Post press release on company blog
- [ ] Share press release on social media
- [ ] Submit to PR newswire (if budget)

**2:00 PM - Influencer Outreach**
- [ ] Send product samples to 10 Irish influencers
  - [ ] Package with personal note
  - [ ] Include discount code for followers
  - [ ] Request review/unboxing video
- [ ] Offer affiliate partnership
  - [ ] 10% commission on sales
  - [ ] Unique tracking link
  - [ ] Marketing materials
- [ ] Follow up via email
  - [ ] Confirm shipment
  - [ ] Provide additional info
  - [ ] Available for questions

**4:00 PM - Monitoring & Response**
- [ ] Monitor website traffic (Google Analytics)
  - [ ] Real-time visitors
  - [ ] Traffic sources
  - [ ] Top pages
  - [ ] Conversion funnel
- [ ] Monitor orders dashboard (real-time)
  - [ ] New order notifications
  - [ ] Order count
  - [ ] Revenue
  - [ ] Average order value
- [ ] Respond to customer inquiries
  - [ ] Email support
  - [ ] Instagram DMs
  - [ ] Facebook messages
  - [ ] Twitter/X mentions
  - [ ] Same-hour responses
- [ ] Respond to social media comments
  - [ ] Thank supporters
  - [ ] Answer questions
  - [ ] Engage with community
- [ ] Monitor for any errors or issues
  - [ ] Sentry (errors)
  - [ ] Vercel (performance)
  - [ ] Google Search Console (issues)

**6:00 PM - Evening Check-In**
- [ ] Review day's performance
  - [ ] Total orders: ___
  - [ ] Total revenue: €___
  - [ ] Traffic: ___ visitors
  - [ ] Top traffic source: ___
  - [ ] Conversion rate: ___%
  - [ ] Any issues: ___
- [ ] Celebrate first day success! 🎉
  - [ ] Team celebration (if team)
  - [ ] Social media thank you post
  - [ ] Personal reflection

**Post-Launch (Week 1)**
- [ ] Daily performance monitoring
  - [ ] Orders
  - [ ] Revenue
  - [ ] Traffic
  - [ ] Conversion rate
  - [ ] Issues
- [ ] Customer support responses (same day)
  - [ ] Email support
  - [ ] Social media DMs
  - [ ] Phone (if available)
- [ ] Fix any bugs reported
  - [ ] Hotfix critical bugs
  - [ ] Document non-critical for sprint
- [ ] Collect customer feedback
  - [ ] Post-purchase survey
  - [ ] Follow-up emails
  - [ ] Social media listening
- [ ] Adjust based on data
  - [ ] Optimize underperforming pages
  - [ ] Improve cart abandonment
  - [ ] Refine messaging
- [ ] Ship orders within 24-48 hours
  - [ ] Pack orders
  - [ ] Ship via courier
  - [ ] Update tracking numbers
  - [ ] Send shipping notifications
- [ ] Follow up with customers
  - [ ] Did they receive order?
  - [ ] Quality satisfaction?
  - [ ] Any issues?
- [ ] Request reviews
  - [ ] 5-star Google review
  - [ ] Facebook review
  - [ ] Trustpilot (if using)
  - [ ] Offer €5 discount for review

**Deliverables:** ✅ Public launch successful, orders flowing

---

## 🗂️ PHASE 8: Post-Launch SEO & Growth (Month 2-6)

### Month 2: Content & Link Building

**Status:** ⚪ Not Started

#### Week 1
- [ ] Publish 2 blog posts (800-1500 words each)
  - [ ] "Nicotine Pouches vs Snus: Which Is Better?"
  - [ ] "How to Use Nicotine Pouches: Complete Beginner's Guide"
- [ ] Write guest post for Irish lifestyle blog #1
  - [ ] Research target blogs
  - [ ] Pitch article idea
  - [ ] Write 800+ word article
  - [ ] Include natural link to PUXX Ireland
  - [ ] Submit for publication
- [ ] Submit to 10 more Irish directories
  - [ ] Research directories
  - [ ] Create listings
  - [ ] Verify listings live

#### Week 2
- [ ] Publish 2 blog posts
  - [ ] "Are Nicotine Pouches Safe? What You Need to Know"
  - [ ] "Nicotine Pouch Strength Guide: 6mg vs 16mg vs 22mg"
- [ ] Create local landing pages
  - [ ] /nicotine-pouches-dublin
  - [ ] /nicotine-pouches-cork
  - [ ] Write unique content (400-500 words each)
  - [ ] SEO optimize
  - [ ] Link to shop page
- [ ] Reach out to 5 Irish influencers
  - [ ] Send DMs
  - [ ] Offer free products
  - [ ] Request reviews

#### Week 3
- [ ] Publish 2 blog posts
  - [ ] "Where to Buy Nicotine Pouches in Ireland"
  - [ ] "PUXX Flavor Profile Guide" (linkable asset)
- [ ] Write guest post #2
- [ ] Create infographic
  - [ ] "Nicotine Pouch Guide" or "Strength Comparison"
  - [ ] Shareable, visual
  - [ ] Embed on blog post
  - [ ] Share on social media

#### Week 4
- [ ] Publish 1 blog post
  - [ ] "Top 10 Benefits of Switching to Nicotine Pouches"
- [ ] Create local landing pages
  - [ ] /nicotine-pouches-galway
  - [ ] /nicotine-pouches-limerick
  - [ ] /nicotine-pouches-waterford
- [ ] Outreach to Irish news sites
  - [ ] Pitch story ideas
  - [ ] Offer expert quotes
  - [ ] Send press kit
- [ ] Review Month 2 SEO performance
  - [ ] Keywords ranking: ___
  - [ ] Backlinks gained: ___
  - [ ] Organic traffic: ___
  - [ ] Conversion rate: ___%

**Monthly Targets:**
- 8 blog posts published
- 2 guest posts published
- 20+ backlinks gained
- 500+ organic visitors
- 5+ keywords in top 50

---

### Month 3-4: Scale Content & Partnerships

**Status:** ⚪ Not Started

#### Ongoing Tasks (Each Month)
- [ ] Publish 8-10 blog posts (2-3 per week)
- [ ] Write 2 guest posts for Irish blogs
- [ ] Build 15-20 backlinks
- [ ] Partner with 2-3 Irish influencers (product reviews)
- [ ] Submit 1 press release
- [ ] Create 1 shareable asset (infographic, guide, video)
- [ ] Monitor rankings (weekly with SERPBear)
- [ ] Update old content (refresh dates, add new info)
- [ ] Respond to all comments on blog posts
- [ ] Share content on social media (daily)
- [ ] Email newsletter (bi-weekly)

**Month 3 Targets:**
- 1,000+ organic visitors/month
- 50+ backlinks total
- 20+ keywords in top 50
- 10+ keywords in top 20
- 3+ keywords in top 10

**Month 4 Targets:**
- 2,000+ organic visitors/month
- 70+ backlinks total
- 30+ keywords in top 50
- 15+ keywords in top 20
- 5+ keywords in top 10
- Domain Authority 20+

---

### Month 5-6: Authority Building & Rank #1

**Status:** ⚪ Not Started

#### Ongoing Tasks (Each Month)
- [ ] Publish 8-10 blog posts
- [ ] Write 2-3 guest posts (higher DA sites)
- [ ] Build 20+ backlinks (focus on quality)
- [ ] Launch PR campaign (get news coverage)
  - [ ] Pitch to Irish Times
  - [ ] Pitch to Independent.ie
  - [ ] Pitch to RTE
- [ ] Sponsor Irish podcast or event
  - [ ] Research podcasts
  - [ ] Negotiate sponsorship
  - [ ] Provide ad copy/talking points
- [ ] Create video content (YouTube SEO)
  - [ ] Product reviews
  - [ ] How-to videos
  - [ ] Behind the scenes
  - [ ] Optimize for YouTube SEO
- [ ] Get featured in Irish media
  - [ ] Offer expert commentary
  - [ ] Provide data/insights
  - [ ] Be source for articles
- [ ] Build relationships with journalists
  - [ ] Follow on Twitter
  - [ ] Engage with articles
  - [ ] Offer to help
- [ ] Continue influencer partnerships
  - [ ] Send more products
  - [ ] Request ongoing coverage
  - [ ] Affiliate commissions
- [ ] Run link building campaign (targeted outreach)
  - [ ] Identify target sites
  - [ ] Personalized outreach emails
  - [ ] Offer value (guest post, data, quote)

**Month 5 Targets:**
- 3,500+ organic visitors/month
- 85+ backlinks total
- "nicotine pouches Ireland" in top 5
- 40+ keywords in top 50
- 20+ keywords in top 20
- 8+ keywords in top 10
- Domain Authority 25+

**Month 6 Targets (SUCCESS CRITERIA):**
- **5,000+ organic visitors/month** ✅
- **100+ backlinks total** ✅
- **"nicotine pouches Ireland" in top 3** ✅
- **50+ keywords in top 50** ✅
- **30+ keywords in top 20** ✅
- **10+ keywords in top 10** ✅
- **Domain Authority 30+** ✅
- **50+ Google reviews (4.5+ stars)** ✅
- **Conversion rate 2.5%+** ✅

---

## 📊 Overall Project Metrics

### Development Metrics
- **Total Tasks:** 500+
- **Estimated Hours:** 300-400
- **Timeline:** 10 weeks
- **Team Size:** 1-2 developers

### SEO Metrics (Month 6 Target)
- **Organic Traffic:** 5,000+ visitors/month
- **Backlinks:** 100+ quality backlinks
- **Domain Authority:** 30+
- **Keywords Top 10:** 30+
- **Primary Keyword:** #1-3 for "nicotine pouches Ireland"

### Business Metrics (Month 6 Target)
- **Total Orders:** 1,000+
- **Revenue:** €15,000+
- **Conversion Rate:** 3%
- **Average Order Value:** €85
- **Customer Retention:** 30%

---

## 🎯 How to Use This Project Board

1. **As a Checklist:** Check off tasks as you complete them
2. **As a Gantt Chart:** Track start/end dates for each phase
3. **Import to GitHub Projects:** Use this structure to create GitHub issues
4. **Team Collaboration:** Assign tasks to team members
5. **Progress Tracking:** Update status emojis as you go

**Status Emoji Legend:**
- 🔵 In Progress
- ⚪ Not Started
- 🟢 Complete
- 🔴 Blocked
- 🟡 In Review

---

## 📝 Notes

- This board is synchronized with `docs/PUXX-Ireland-MASTER-ROADMAP.md`
- Update both documents when making changes
- Review progress weekly
- Adjust timeline as needed
- Celebrate milestones! 🎉

---

**Last Updated:** December 2025
**Project Status:** 🔵 Active Development
**Next Milestone:** Complete Phase 0 (Week 1)
