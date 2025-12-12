# PUXX Ireland - Website Build Plan

**Project:** PUXX Ireland E-commerce Website
**Target Market:** Ireland (18+ nicotine pouches)
**Brand Theme:** Emerald green Irish identity with premium black/gold accents
**Reference:** Canada website screenshots + Ireland Visual Brand Guide

---

## Project Overview

### Objectives
1. Launch e-commerce website for Irish market (PUXX Ireland)
2. Implement emerald green Irish branding throughout
3. Maintain PUXX premium identity while adding Irish character
4. Support online sales with age verification (18+)
5. Integrate payment processing (EUR)
6. Build SEO-optimized for Irish market search visibility
7. Create admin dashboard for inventory, orders, and analytics

### Success Metrics
- Page load time < 2 seconds
- Mobile-responsive (100% mobile traffic expected)
- Lighthouse score > 90
- Conversion rate > 2.5%
- Age verification compliance 100%
- SEO: Rank top 3 for "nicotine pouches Ireland" within 6 months

---

## Technology Stack Recommendation

### Core Framework: **Next.js 15 SaaS Starter**

**Selected Boilerplate:** `nextjs-saas-starter`
**Location:** `/Users/baileybarry/Resources/repos/saas/nextjs-saas-starter`

**Why This Stack:**
✅ Production-ready Next.js 15 with App Router
✅ Built-in authentication (NextAuth.js)
✅ Stripe payment integration (already configured)
✅ PostgreSQL database (via Supabase)
✅ Admin dashboard included
✅ RBAC (Role-Based Access Control)
✅ Email templates
✅ SEO-optimized out of the box
✅ Saves 15-20 hours of setup

**Alternative:** `Commerce` template (`repos/ecommerce/commerce`) - Vercel's e-commerce starter with cart, checkout, payment

### Database & Auth: **Supabase**

**Why Supabase:**
- PostgreSQL (robust, scalable)
- Built-in authentication with social providers
- Real-time subscriptions (for admin dashboard live updates)
- Row Level Security (RLS) for data protection
- Storage for product images
- Free tier: 500MB database, 1GB storage, 50K monthly active users
- Edge functions for serverless logic

**Resource:** `/Users/baileybarry/Resources/repos/_monorepos/supabase`

### Payments: **Stripe**

**Why Stripe:**
- EUR currency support
- Strong fraud detection
- PCI compliance handled
- Subscription support (if needed for future)
- Already integrated in nextjs-saas-starter

**Cost:** 1.5% + €0.25 per transaction (European cards)

### UI Components: **Shadcn-ui + Tailwind CSS**

**Resources:**
- Shadcn-ui: `/Users/baileybarry/Resources/repos/ui/shadcn-ui`
- Copy-paste components (not npm dependency)
- Fully customizable with emerald green theme
- Accessible by default

### Animations: **Framer Motion**

**Resource:** `/Users/baileybarry/Resources/repos/animations/framer-motion`

**Use Cases:**
- Product hover effects
- Page transitions
- Hero lightning effects (green)
- Smooth scrolling with Lenis
- Micro-interactions

**Lenis Smooth Scroll:** `/Users/baileybarry/Resources/repos/animations/lenis`

### SEO Tools:
- **next-seo** - Meta tags, Open Graph, JSON-LD
- **next-sitemap** - Automated sitemap generation
- **react-schemaorg** - Structured data for products
- **Lighthouse** - Performance audits

**Resources:** `/Users/baileybarry/Resources/repos/seo/`

### Deployment: **Vercel**

**Why Vercel:**
- Zero-config deployment for Next.js
- Global CDN (fast in Ireland + Europe)
- Automatic HTTPS
- Preview deployments for staging
- Free tier: Unlimited deployments, 100GB bandwidth
- Paid (Pro): €20/month for team collaboration

---

## Phase-by-Phase Build Plan

### PHASE 0: Setup & Planning (Week 1)
**Duration:** 3-5 days

#### Tasks:

**Day 1: Environment Setup**
- [ ] Clone `nextjs-saas-starter` from Resources
- [ ] Set up GitHub repository for PUXX Ireland
- [ ] Configure local development environment
- [ ] Install dependencies (Node.js 18+, pnpm)
- [ ] Set up VS Code with recommended extensions

**Day 2: Supabase Configuration**
- [ ] Create Supabase project (puxx-ireland)
- [ ] Configure authentication providers:
  - Email/password (primary)
  - Google OAuth (optional)
  - Facebook OAuth (optional)
- [ ] Set up environment variables (.env.local)
- [ ] Test database connection
- [ ] Enable Row Level Security (RLS)

**Day 3: Design System Setup**
- [ ] Configure Tailwind with Irish green color palette
  - Primary: #009A49 (Emerald Green)
  - Secondary: #00563F (Deep Forest Green)
  - Accent: #00A86B (Shamrock Green)
  - Black: #000000
  - Cream: #F5E6D3
  - Gold: #D4AF37
- [ ] Install Shadcn-ui components
- [ ] Create component library structure
- [ ] Set up Framer Motion
- [ ] Configure fonts (Montserrat, Inter)

**Day 4: Database Schema Design**
- [ ] Design database schema (see schema section below)
- [ ] Create migration files
- [ ] Run migrations in Supabase
- [ ] Seed initial data (products, categories)
- [ ] Set up storage buckets for images

**Day 5: Planning Review**
- [ ] Review requirements against plan
- [ ] Create project board (GitHub Projects or Linear)
- [ ] Set up staging environment on Vercel
- [ ] Document architecture decisions
- [ ] Plan sprint 1

**Deliverables:**
✅ Local dev environment running
✅ Supabase project configured
✅ Database schema created
✅ Design system implemented
✅ Project roadmap finalized

---

### PHASE 1: Core Website Structure (Week 2-3)
**Duration:** 10-12 days

#### 1.1 Layout & Navigation (Days 1-2)

**Header Component:**
```tsx
// components/layout/Header.tsx
- Yellow alert banner (conditional)
- Black warning bar ("This product contains nicotine...")
- Emerald green navigation bar
  - PUXX logo (white/cream on green)
  - Nav links: Home, Shop, My Account, Contact
  - Cart icon with item count
- Deep forest green promo bar ("Minimum Order Quantity 5 | Free Delivery €150+")
```

**Footer Component:**
```tsx
// components/layout/Footer.tsx
- Deep forest green background
- PUXX logo (white)
- Company info: "Premium tobacco-free pouches since 2023. 18+ only."
- Column links: Pages, Sales, Connect
- Social media icons (Instagram, Facebook)
- Copyright: © 2025 PUXX Ireland
```

**Mobile Menu:**
- Hamburger icon
- Slide-out drawer with emerald green background
- Full navigation
- Cart preview

**Tasks:**
- [ ] Create Header component with responsive design
- [ ] Create Footer component
- [ ] Create MobileMenu component
- [ ] Implement sticky header on scroll
- [ ] Add cart badge with item count
- [ ] Test on mobile, tablet, desktop

#### 1.2 Homepage (Days 3-5)

**Hero Section:**
- Emerald green background with gradient
- Green lightning/energy effects (Framer Motion)
- Headline: "EXPERIENCE THE WORLD'S BEST NICOTINE POUCHES"
- Subheading: "Premium Tobacco-Free Flavour Nicotine Pouches"
- CTA button: "SHOP NOW" (emerald green, white text)
- Product tins with green energy animation

**Product Showcase Grid:**
- 14 product cards (3-4 visible, scrollable)
- Product images with hover effects
- Flavor name + price
- "Add to Cart" on hover
- Color-coded badges (strength levels)

**Feature Sections:**
1. **Taste the Difference**
   - Image: Product with fresh ingredients
   - Text: Quality messaging
   - Green accent gradient

2. **Pioneering Fresh Pouches**
   - Image: Innovation visual
   - Text: Brand story
   - Shamrock icon (subtle)

3. **Abundant Variety**
   - Image: All 14 flavors grid
   - Text: Flavor range messaging
   - Interactive flavor filter

**Tasks:**
- [ ] Build Hero component with animations
- [ ] Create ProductShowcase with Framer Motion
- [ ] Build FeatureSections (3 sections)
- [ ] Implement scroll animations (fade-in, slide-up)
- [ ] Add green lightning effects with Three.js or Lottie
- [ ] Mobile optimization
- [ ] Performance optimization (lazy loading images)

#### 1.3 Shop Page (Days 6-8)

**Features:**
- Product grid layout (responsive: 1, 2, 3, 4 columns)
- Filters:
  - Flavor type (Mint, Fruit, Specialty)
  - Strength (6mg, 16mg, 22mg)
  - Price range
  - Availability
- Sorting:
  - Featured
  - Price: Low to High
  - Price: High to Low
  - Name: A-Z
  - Newest
- Pagination or infinite scroll
- Product quick view modal

**Product Card:**
```tsx
// components/products/ProductCard.tsx
- Product image (600x600)
- Product name
- Strength badge (emerald green)
- Price (€15.00)
- "Add to Cart" button (emerald green)
- "Quick View" on hover
- Favorite icon (heart)
```

**Tasks:**
- [ ] Create Shop page layout
- [ ] Build ProductCard component
- [ ] Implement filtering logic (client-side or Supabase)
- [ ] Implement sorting
- [ ] Add pagination
- [ ] Create QuickView modal
- [ ] Add "Add to Cart" functionality
- [ ] Mobile responsiveness
- [ ] Loading states

#### 1.4 Product Detail Page (Days 9-10)

**Layout:**
- Left: Product image gallery (main + thumbnails)
- Right: Product information
  - Product name
  - Price (€15.00)
  - Strength indicator
  - Description
  - Flavor profile
  - Ingredients
  - Usage instructions
  - Quantity selector
  - "Add to Cart" button (large, emerald green)
  - Stock status

**Additional Sections:**
- Related products
- Customer reviews (future phase)
- Shipping information
- Age verification reminder

**Tasks:**
- [ ] Create ProductDetail page template
- [ ] Build ImageGallery component (zoom, thumbnails)
- [ ] Build ProductInfo component
- [ ] Implement quantity selector
- [ ] Add "Add to Cart" with size selection
- [ ] Create RelatedProducts section
- [ ] Schema.org markup for SEO (Product schema)
- [ ] Mobile optimization

#### 1.5 Other Pages (Days 11-12)

**Contact Page:**
- Contact form (First Name, Last Name, Phone, Email, Message)
- Consent checkbox
- Emerald green submit button
- Contact information (email, social)
- Map (optional)

**My Account Page:**
- Login/Register split layout
- Registration fields:
  - Email, Name, Phone
  - "How did you hear about us?" dropdown
  - Age verification checkbox (18+)
- Account dashboard (post-login):
  - Order history
  - Saved addresses
  - Account details
  - Logout

**Static Pages:**
- About Us
- Terms & Conditions
- Privacy Policy
- Shipping & Returns
- FAQ

**Tasks:**
- [ ] Create Contact page with form validation
- [ ] Build Login/Register pages
- [ ] Create Account dashboard
- [ ] Write static page content
- [ ] Style with Irish green theme
- [ ] Form validation with React Hook Form + Zod
- [ ] Email integration for contact form

**Deliverables:**
✅ Complete website structure
✅ All pages designed and functional
✅ Navigation working
✅ Emerald green branding applied
✅ Mobile responsive

---

### PHASE 2: E-commerce Functionality (Week 4-5)
**Duration:** 10-12 days

#### 2.1 Shopping Cart (Days 1-3)

**Cart Features:**
- Add/remove items
- Update quantities
- Persistent cart (localStorage + database for logged-in users)
- Cart badge counter
- Minimum order quantity validation (5 tins)
- Free shipping threshold indicator (€150)
- Cart subtotal
- Estimated shipping
- Total price

**Components:**
```tsx
// components/cart/CartDrawer.tsx - Slide-out cart
// components/cart/CartPage.tsx - Full cart page
// components/cart/CartItem.tsx - Individual item
// components/cart/CartSummary.tsx - Price breakdown
```

**Tasks:**
- [ ] Create cart state management (Zustand or React Context)
- [ ] Build CartDrawer component
- [ ] Build CartPage
- [ ] Add "Add to Cart" functionality across site
- [ ] Implement minimum order validation (5 tins)
- [ ] Add free shipping indicator
- [ ] Persist cart to localStorage
- [ ] Sync cart with database (logged-in users)
- [ ] Empty cart state
- [ ] Mobile cart optimization

#### 2.2 Checkout Flow (Days 4-7)

**Checkout Steps:**
1. **Cart Review**
   - Review items
   - Apply coupon code (optional)
   - Proceed to checkout

2. **Customer Information**
   - Email
   - Age verification (18+ checkbox)
   - Create account option

3. **Shipping Address**
   - Name
   - Address (Irish address format)
   - City/County
   - Eircode (postal code)
   - Phone

4. **Shipping Method**
   - Standard (Free over €150, otherwise €5.99)
   - Express (€9.99, 1-2 days)

5. **Payment**
   - Stripe Elements integration
   - Card payment (Visa, Mastercard, Amex)
   - Apple Pay / Google Pay
   - Order summary sidebar

6. **Confirmation**
   - Order number
   - Confirmation email sent
   - Order tracking

**Tasks:**
- [ ] Create CheckoutPage with step indicator
- [ ] Build multi-step form with validation
- [ ] Integrate Stripe Checkout or Elements
- [ ] Implement age verification
- [ ] Add shipping cost calculation
- [ ] Create order confirmation page
- [ ] Set up order confirmation emails
- [ ] Test payment flow (Stripe test mode)
- [ ] Error handling (payment failures)
- [ ] Mobile checkout optimization

#### 2.3 Order Management (Days 8-10)

**Order Processing:**
- Create order in database on payment success
- Send confirmation email (customer)
- Send notification email (admin)
- Update inventory
- Generate invoice

**Order Status:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled
- Refunded

**Customer Order Tracking:**
- View order history in "My Account"
- Order details page
- Tracking number (when shipped)
- Download invoice

**Tasks:**
- [ ] Create Order model in database
- [ ] Implement order creation on payment success
- [ ] Set up email templates (order confirmation, shipping notification)
- [ ] Build order history page
- [ ] Create order details page
- [ ] Add invoice generation (PDF)
- [ ] Implement order status updates
- [ ] Add tracking number field

**Deliverables:**
✅ Fully functional shopping cart
✅ Complete checkout flow with Stripe
✅ Order management system
✅ Email notifications
✅ Order tracking

---

### PHASE 3: Admin Dashboard (Week 6)
**Duration:** 5-7 days

#### 3.1 Dashboard Setup (Days 1-2)

**Selected Template:** TailAdmin Pro Next.js 16.x
**Location:** `/Users/baileybarry/Resources/repos/templates/TailAdmin-Pro-Next.js-16.0x/`

**Why TailAdmin Pro:**
✅ Premium Next.js 16.x admin template
✅ Multiple dashboard layouts
✅ Pre-built charts (Recharts)
✅ Data tables (TanStack Table)
✅ Form components
✅ Authentication UI
✅ Dark mode
✅ Fully responsive

**Adapt with Irish Green:**
- Replace primary colors with emerald green
- Update accent colors to shamrock green
- Maintain black/cream for premium feel

**Tasks:**
- [ ] Install TailAdmin Pro
- [ ] Configure emerald green theme
- [ ] Set up admin routes (/admin/*)
- [ ] Implement admin-only access (RBAC)
- [ ] Create admin layout
- [ ] Set up navigation sidebar

#### 3.2 Dashboard Pages (Days 3-5)

**Pages to Build:**

1. **Dashboard Overview** (`/admin/dashboard`)
   - Sales summary (today, week, month)
   - Revenue chart (line graph)
   - Top products
   - Recent orders
   - Low stock alerts
   - Customer count

2. **Products Management** (`/admin/products`)
   - Product list table (sortable, filterable)
   - Add/Edit/Delete products
   - Bulk actions (delete, update stock)
   - Image upload
   - Variant management (flavors, strengths)

3. **Orders Management** (`/admin/orders`)
   - Order list table
   - Order status updates
   - Order details modal
   - Filter by status, date
   - Export orders (CSV)
   - Print invoices

4. **Customers** (`/admin/customers`)
   - Customer list
   - Customer details
   - Order history per customer
   - Customer notes

5. **Analytics** (`/admin/analytics`)
   - Revenue trends
   - Product performance
   - Customer acquisition
   - Traffic sources (integrate Google Analytics)
   - Conversion rate

6. **Settings** (`/admin/settings`)
   - Site settings (name, logo, contact)
   - Shipping settings
   - Payment settings (Stripe keys)
   - Email templates
   - Tax configuration

**Components:**
```tsx
// components/admin/DashboardStats.tsx
// components/admin/RevenueChart.tsx (Recharts)
// components/admin/ProductTable.tsx (TanStack Table)
// components/admin/OrderTable.tsx
// components/admin/ProductForm.tsx
```

**Tasks:**
- [ ] Build Dashboard Overview with stats cards
- [ ] Implement revenue chart with Recharts
- [ ] Create ProductTable with TanStack Table
- [ ] Build ProductForm (add/edit)
- [ ] Create OrderTable with status updates
- [ ] Build CustomerTable
- [ ] Add Analytics page with charts
- [ ] Create Settings page
- [ ] Implement image upload (Supabase Storage)
- [ ] Add CSV export functionality

#### 3.3 Real-Time Features (Days 6-7)

**Real-Time Updates with Supabase:**
- New order notifications
- Low stock alerts
- Live sales counter
- Customer activity feed

**Tasks:**
- [ ] Set up Supabase real-time subscriptions
- [ ] Add real-time order notifications (toast)
- [ ] Create activity feed component
- [ ] Implement live sales counter
- [ ] Add low stock alerts

**Deliverables:**
✅ Full admin dashboard
✅ Product management CRUD
✅ Order management system
✅ Analytics & reporting
✅ Real-time notifications
✅ Emerald green Irish branding

---

### PHASE 4: SEO & Performance (Week 7)
**Duration:** 5-7 days
*(See dedicated SEO Plan document)*

**Overview:**
- [ ] Implement next-seo for all pages
- [ ] Generate sitemaps with next-sitemap
- [ ] Add schema.org markup (Product, Organization, LocalBusiness)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Implement Core Web Vitals optimizations
- [ ] Set up Google Analytics & Search Console
- [ ] Create robots.txt
- [ ] Optimize meta tags and OG images
- [ ] Build backlink strategy
- [ ] Content marketing plan

**Reference:** Full SEO Plan (separate document)

---

### PHASE 5: Age Verification & Compliance (Week 8)
**Duration:** 3-5 days

#### 5.1 Age Verification

**Implementation Options:**

**Option 1: Checkbox Verification (Minimum)**
- 18+ checkbox at registration
- 18+ checkbox at checkout
- Store verification timestamp

**Option 2: Age Gate (Recommended)**
- Landing page age gate before site access
- Date of birth entry
- Cookie/session storage
- Re-verify after 24 hours

**Option 3: ID Verification (Maximum Compliance)**
- Third-party service (e.g., Yoti, Onfido)
- Upload government ID
- AI/human verification
- Cost: €0.50-1.50 per verification

**Recommended:** Option 2 (Age Gate) for launch, upgrade to Option 3 if required by Irish regulations

**Tasks:**
- [ ] Research Irish age verification requirements
- [ ] Implement age gate landing page
- [ ] Add age verification to registration
- [ ] Add age verification to checkout
- [ ] Store verification in database
- [ ] Add re-verification logic (24h)
- [ ] Create under-18 rejection page

#### 5.2 Legal Compliance

**Required Pages:**
- [ ] Terms & Conditions (Irish law)
- [ ] Privacy Policy (GDPR compliant)
- [ ] Cookie Policy
- [ ] Refund Policy
- [ ] Shipping Policy

**Required Notices:**
- [ ] Nicotine warning banner (every page)
- [ ] "18+ only" notice (footer, checkout)
- [ ] GDPR cookie consent banner
- [ ] Newsletter opt-in consent

**Tasks:**
- [ ] Draft legal documents (consult solicitor)
- [ ] Implement cookie consent banner
- [ ] Add GDPR data export/delete functionality
- [ ] Create privacy-compliant analytics setup
- [ ] Add newsletter consent checkboxes

#### 5.3 Payment Compliance

**Stripe Requirements:**
- [ ] Terms of Service link in checkout
- [ ] Refund policy link in checkout
- [ ] Business information in footer
- [ ] Secure payment badge

**Tasks:**
- [ ] Add Stripe-required links to checkout
- [ ] Display security badges (SSL, Stripe)
- [ ] Test refund flow
- [ ] Set up webhooks for payment events

**Deliverables:**
✅ Age verification implemented
✅ Legal pages completed
✅ GDPR compliance
✅ Payment compliance

---

### PHASE 6: Testing & QA (Week 9)
**Duration:** 5-7 days

#### 6.1 Functional Testing

**Areas to Test:**
- [ ] User registration & login
- [ ] Product browsing & search
- [ ] Add to cart functionality
- [ ] Cart updates (add, remove, quantity)
- [ ] Checkout flow (all steps)
- [ ] Payment processing (Stripe test mode)
- [ ] Order confirmation emails
- [ ] Admin login
- [ ] Product management (CRUD)
- [ ] Order management
- [ ] Age verification

**Testing Checklist:**
- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on iOS (Safari, Chrome)
- [ ] Test on Android (Chrome, Samsung Internet)
- [ ] Test on tablet (iPad, Android)
- [ ] Test with screen readers (accessibility)
- [ ] Test keyboard navigation

#### 6.2 Performance Testing

**Tools:**
- Lighthouse (in Chrome DevTools)
- PageSpeed Insights (Google)
- WebPageTest
- GTmetrix

**Targets:**
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 95
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 95
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Blocking Time (TBT) < 300ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

**Optimization Tasks:**
- [ ] Optimize images (WebP, next/image)
- [ ] Minify CSS/JS
- [ ] Enable compression (Brotli)
- [ ] Implement code splitting
- [ ] Lazy load images below fold
- [ ] Preload critical resources
- [ ] Add caching headers

#### 6.3 Security Testing

**Checks:**
- [ ] SQL injection prevention (Supabase RLS)
- [ ] XSS protection
- [ ] CSRF tokens in forms
- [ ] Rate limiting (Vercel)
- [ ] Secure headers (CSP, HSTS)
- [ ] Environment variables secured
- [ ] API keys not exposed
- [ ] HTTPS enforced

**Tools:**
- [ ] OWASP ZAP security scan
- [ ] Snyk dependency scan
- [ ] Lighthouse security audit

#### 6.4 User Acceptance Testing (UAT)

**Test Users:**
- Internal team (5 people)
- Beta customers (10 people)

**Feedback Areas:**
- Ease of navigation
- Checkout experience
- Mobile usability
- Irish branding appeal
- Loading speeds
- Any bugs/issues

**Tasks:**
- [ ] Recruit UAT participants
- [ ] Create UAT test script
- [ ] Collect feedback
- [ ] Prioritize fixes
- [ ] Implement critical fixes

**Deliverables:**
✅ All major bugs fixed
✅ Performance targets met
✅ Security audit passed
✅ UAT feedback incorporated

---

### PHASE 7: Launch Preparation (Week 10)
**Duration:** 3-5 days

#### 7.1 Pre-Launch Checklist

**Content:**
- [ ] All product descriptions written
- [ ] All product images uploaded (high quality)
- [ ] Legal pages finalized
- [ ] About Us page content
- [ ] Contact information updated
- [ ] Social media links added

**Technical:**
- [ ] Domain purchased (puxxireland.ie or puxx.ie)
- [ ] DNS configured
- [ ] SSL certificate active (auto via Vercel)
- [ ] Production environment variables set
- [ ] Database backups configured
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics tracking verified (Google Analytics 4)
- [ ] Google Tag Manager installed
- [ ] Facebook Pixel (if using ads)
- [ ] Email service configured (SendGrid or Postmark)

**Payments:**
- [ ] Stripe account activated (Ireland)
- [ ] Live payment keys configured
- [ ] Test transaction completed
- [ ] Refund process tested
- [ ] Webhook endpoints verified

**SEO:**
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Robots.txt configured
- [ ] Meta tags verified on all pages
- [ ] Schema markup validated
- [ ] OG images set

**Marketing:**
- [ ] Instagram profile created (@puxxireland)
- [ ] Facebook page created
- [ ] Email templates designed
- [ ] Launch announcement email drafted
- [ ] Social media posts scheduled
- [ ] Press release written (optional)

#### 7.2 Soft Launch (Beta)

**Plan:**
- Launch to limited audience (friends, family, beta list)
- Monitor for 3-5 days
- Collect feedback
- Fix any critical issues
- Test order fulfillment process

**Tasks:**
- [ ] Deploy to production
- [ ] Send beta launch emails
- [ ] Monitor error logs
- [ ] Track first orders
- [ ] Process test orders end-to-end
- [ ] Collect feedback
- [ ] Make adjustments

#### 7.3 Public Launch

**Launch Day Checklist:**
- [ ] Final deployment
- [ ] Announce on social media
- [ ] Send launch email to full list
- [ ] Monitor server performance
- [ ] Monitor orders
- [ ] Respond to customer inquiries
- [ ] Track analytics

**Post-Launch (Week 1):**
- [ ] Daily performance monitoring
- [ ] Customer support responses
- [ ] Fix any bugs reported
- [ ] Collect customer feedback
- [ ] Adjust based on data

**Deliverables:**
✅ Website live on custom domain
✅ All systems operational
✅ Orders processing successfully
✅ Customer support active
✅ Marketing campaigns launched

---

## Database Schema

### Tables

**users** (Supabase Auth)
```sql
- id (uuid, primary key)
- email (text, unique)
- created_at (timestamp)
- updated_at (timestamp)
```

**profiles** (extends users)
```sql
- id (uuid, foreign key → users.id)
- first_name (text)
- last_name (text)
- phone (text)
- date_of_birth (date)
- age_verified (boolean)
- age_verified_at (timestamp)
- referral_source (text) -- How did you hear about us?
- created_at (timestamp)
- updated_at (timestamp)
```

**products**
```sql
- id (uuid, primary key)
- name (text) -- e.g., "PUXX Cool Mint"
- slug (text, unique) -- e.g., "cool-mint"
- description (text)
- flavor_type (text) -- Mint, Fruit, Specialty
- strength_mg (integer) -- 6, 16, 22
- price_eur (decimal) -- 15.00
- stock_quantity (integer)
- sku (text, unique)
- featured (boolean)
- active (boolean)
- image_url (text)
- gallery_images (jsonb) -- Array of image URLs
- flavor_profile (jsonb) -- {sweet, minty, fresh, etc.}
- ingredients (text)
- created_at (timestamp)
- updated_at (timestamp)
```

**categories**
```sql
- id (uuid, primary key)
- name (text) -- Mint, Fruit, Specialty
- slug (text, unique)
- description (text)
- created_at (timestamp)
```

**product_categories** (many-to-many)
```sql
- product_id (uuid, foreign key → products.id)
- category_id (uuid, foreign key → categories.id)
```

**cart_items**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → users.id, nullable for guest)
- session_id (text, for guest carts)
- product_id (uuid, foreign key → products.id)
- quantity (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

**orders**
```sql
- id (uuid, primary key)
- order_number (text, unique) -- PUXX-IE-00001
- user_id (uuid, foreign key → users.id, nullable for guest)
- status (text) -- pending, processing, shipped, delivered, cancelled
- subtotal (decimal)
- shipping_cost (decimal)
- total (decimal)
- currency (text) -- EUR
- payment_status (text) -- pending, paid, failed, refunded
- payment_id (text) -- Stripe payment ID
- shipping_name (text)
- shipping_email (text)
- shipping_phone (text)
- shipping_address_line1 (text)
- shipping_address_line2 (text)
- shipping_city (text)
- shipping_county (text)
- shipping_eircode (text)
- shipping_country (text) -- Ireland
- shipping_method (text) -- standard, express
- tracking_number (text, nullable)
- notes (text, nullable)
- age_verified (boolean)
- created_at (timestamp)
- updated_at (timestamp)
- shipped_at (timestamp, nullable)
- delivered_at (timestamp, nullable)
```

**order_items**
```sql
- id (uuid, primary key)
- order_id (uuid, foreign key → orders.id)
- product_id (uuid, foreign key → products.id)
- product_name (text) -- Snapshot at order time
- product_sku (text)
- quantity (integer)
- price_eur (decimal) -- Price at order time
- created_at (timestamp)
```

**coupons** (optional, future)
```sql
- id (uuid, primary key)
- code (text, unique)
- discount_type (text) -- percentage, fixed
- discount_value (decimal)
- min_order_value (decimal, nullable)
- max_uses (integer, nullable)
- uses_count (integer, default 0)
- active (boolean)
- expires_at (timestamp, nullable)
- created_at (timestamp)
```

**reviews** (optional, future)
```sql
- id (uuid, primary key)
- product_id (uuid, foreign key → products.id)
- user_id (uuid, foreign key → users.id)
- order_id (uuid, foreign key → orders.id)
- rating (integer) -- 1-5
- title (text)
- comment (text)
- verified_purchase (boolean)
- approved (boolean)
- created_at (timestamp)
```

**newsletter_subscribers**
```sql
- id (uuid, primary key)
- email (text, unique)
- subscribed (boolean)
- subscribed_at (timestamp)
- unsubscribed_at (timestamp, nullable)
```

### Row Level Security (RLS) Policies

**Enable RLS on all tables**

**products** (public read, admin write)
```sql
-- Anyone can read active products
CREATE POLICY "Public products are viewable by everyone"
ON products FOR SELECT
USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Only admins can modify products"
ON products FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');
```

**orders** (user can read own, admin can read all)
```sql
-- Users can read their own orders
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Admins can read all orders
CREATE POLICY "Admins can view all orders"
ON orders FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- Only system can create orders (via Edge Function)
```

**profiles** (user can read/update own, admin can read all)
```sql
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

---

## File Structure

```
puxx-ireland/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   ├── (site)/
│   │   ├── page.tsx                  # Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx              # Shop grid
│   │   │   └── [slug]/page.tsx       # Product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── account/
│   │   │   ├── page.tsx              # Account dashboard
│   │   │   ├── orders/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── about/page.tsx
│   │   ├── terms/page.tsx
│   │   └── privacy/page.tsx
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout
│   │   ├── dashboard/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx              # Product list
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── products/route.ts
│   │   ├── cart/route.ts
│   │   ├── checkout/route.ts
│   │   ├── orders/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   └── admin/[...]/route.ts
│   ├── layout.tsx                    # Root layout
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Sidebar.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── ProductDetail.tsx
│   │   └── QuickView.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderSummary.tsx
│   ├── admin/
│   │   ├── DashboardStats.tsx
│   │   ├── RevenueChart.tsx
│   │   ├── ProductTable.tsx
│   │   ├── OrderTable.tsx
│   │   └── ProductForm.tsx
│   └── ui/
│       ├── button.tsx                # Shadcn components
│       ├── input.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── [50+ Shadcn components]
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   ├── utils.ts
│   ├── validations.ts                # Zod schemas
│   └── constants.ts
│
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useAuth.ts
│   └── useOrders.ts
│
├── styles/
│   ├── globals.css
│   └── animations.css
│
├── public/
│   ├── images/
│   │   ├── products/                 # From organized folder
│   │   ├── branding/
│   │   ├── marketing/
│   │   └── graphics/
│   ├── fonts/
│   └── favicon.ico
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_products.sql
│   │   ├── 003_orders.sql
│   │   └── [more migrations]
│   └── seed.sql
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Cost Estimate

### Development Costs
| Item | Cost |
|------|------|
| Developer time (solo, 10 weeks @ 40h/week) | €0 (internal) or €20,000-40,000 (freelance) |
| TailAdmin Pro license | €99 one-time |
| Design assets (if needed) | €0-500 |

### Monthly Operational Costs
| Service | Cost |
|---------|------|
| **Hosting (Vercel)** | €0 (Free tier) or €20/month (Pro) |
| **Database (Supabase)** | €0 (Free tier up to 500MB) or €25/month (Pro) |
| **Payment Processing (Stripe)** | 1.5% + €0.25 per transaction |
| **Domain (puxxireland.ie)** | €15/year (~€1.25/month) |
| **Email Service (SendGrid)** | €0 (Free tier 100/day) or €20/month |
| **Error Monitoring (Sentry)** | €0 (Free tier) or €26/month |
| **Analytics (Google)** | €0 (Free) |
| **SSL Certificate** | €0 (Included with Vercel) |

**Total Monthly (Minimum):** ~€1.25/month (domain only, using all free tiers)
**Total Monthly (Recommended):** ~€90/month (Pro tiers + email + monitoring)

### Scaling Costs (per 1000 orders/month)
- Stripe fees: €17.50 per 1000 orders @ €15/order
- Supabase: Scale to €25-100/month depending on data
- Vercel: Scale to €20-150/month depending on traffic

---

## Key Resources Used

1. **nextjs-saas-starter** - Main boilerplate
   `/Users/baileybarry/Resources/repos/saas/nextjs-saas-starter`

2. **TailAdmin Pro** - Admin dashboard
   `/Users/baileybarry/Resources/repos/templates/TailAdmin-Pro-Next.js-16.0x/`

3. **Supabase** - Database & auth
   `/Users/baileybarry/Resources/repos/_monorepos/supabase`

4. **Shadcn-ui** - UI components
   `/Users/baileybarry/Resources/repos/ui/shadcn-ui`

5. **Framer Motion** - Animations
   `/Users/baileybarry/Resources/repos/animations/framer-motion`

6. **next-seo** - SEO optimization
   `/Users/baileybarry/Resources/repos/seo/next-seo`

7. **E-commerce Recipe**
   `/Users/baileybarry/Resources/recipes/ecommerce-ultimate-template.md`

8. **MVP Planning Framework**
   `/Users/baileybarry/Resources/planning/guides/`

---

## Next Steps

1. Review this plan
2. Approve technology stack
3. Set up development environment (Phase 0)
4. Begin Phase 1 implementation
5. Reference SEO Plan (separate document) for Phase 4
6. Reference Dashboard Plan (separate document) for Phase 3 details

---

**Document Created:** December 2025
**Estimated Timeline:** 10 weeks (solo developer) or 6 weeks (2 developers)
**Ready to Build:** Yes - All resources available in /Users/baileybarry/Resources
