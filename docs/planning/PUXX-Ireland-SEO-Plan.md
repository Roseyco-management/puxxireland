# PUXX Ireland - Comprehensive SEO Plan

**Project:** PUXX Ireland E-commerce Website
**Target Market:** Ireland (18+ nicotine pouch buyers)
**Primary Goal:** Rank #1 for "nicotine pouches Ireland" within 6 months
**Secondary Goals:** Dominate long-tail keywords, build brand authority, drive organic traffic

---

## SEO Objectives

### Primary Targets (Months 1-6)
1. **Rank #1-3 for primary keywords:**
   - "nicotine pouches Ireland"
   - "tobacco free pouches Ireland"
   - "nicotine pouches buy Ireland"
   - "best nicotine pouches Ireland"

2. **Achieve 50,000+ organic visitors/month** by Month 6

3. **Domain Authority (DA) 30+** within 6 months

4. **100+ quality backlinks** from Irish and international sites

5. **Lighthouse SEO score 95+**

### Secondary Targets (Ongoing)
- Rank for all flavor-specific keywords ("cool mint nicotine pouches Ireland", etc.)
- Capture local search ("nicotine pouches Dublin", "nicotine pouches Cork", etc.)
- Build topical authority in nicotine alternative space
- Featured snippets for "what are nicotine pouches", "are nicotine pouches safe", etc.

---

## SEO Technology Stack

### Core SEO Tools (from Resources)

**Location:** `/Users/baileybarry/Resources/repos/seo/`

#### 1. **next-seo** (Meta Tags & Schema)
- **Purpose:** Manage SEO meta tags, Open Graph, Twitter Cards, JSON-LD
- **Implementation:** Every page
- **Priority:** Critical

#### 2. **next-sitemap** (Sitemap Generation)
- **Purpose:** Automated sitemap.xml and robots.txt generation
- **Implementation:** Post-build script
- **Priority:** Critical

#### 3. **react-schemaorg** (Structured Data)
- **Purpose:** Schema.org markup (Product, Organization, LocalBusiness)
- **Implementation:** Product pages, homepage, about
- **Priority:** High

#### 4. **Lighthouse** (Audits & Monitoring)
- **Purpose:** Performance, SEO, accessibility audits
- **Implementation:** CI/CD pipeline + manual testing
- **Priority:** Critical

#### 5. **lighthouse-mcp-server** (Automated Audits)
- **Purpose:** MCP integration for automated Lighthouse audits
- **Implementation:** Development workflow with Claude
- **Priority:** Medium

#### 6. **SEO Audits Toolkit** (Comprehensive Audits)
- **Purpose:** Deep SEO analysis, technical issues, recommendations
- **Implementation:** Monthly audits
- **Priority:** High

#### 7. **SERPBear** (Rank Tracking)
- **Purpose:** Track keyword rankings over time
- **Implementation:** Self-hosted rank tracker
- **Priority:** High

#### 8. **Seonaut** (Crawling & Analysis)
- **Purpose:** Crawl site like Googlebot, find SEO issues
- **Implementation:** Pre-launch + monthly
- **Priority:** Medium

#### 9. **ContentSwift** (Content Optimization)
- **Purpose:** Optimize content for target keywords
- **Implementation:** Content creation workflow
- **Priority:** Medium

#### 10. **Page Auditor** (Page-Level SEO)
- **Purpose:** Audit individual pages for SEO best practices
- **Implementation:** Per-page optimization
- **Priority:** Medium

---

## Technical SEO Implementation

### Phase 1: Foundation Setup (Week 1-2)

#### 1.1 Install next-seo

```bash
npm install next-seo
```

**Configuration:**

```typescript
// lib/seo/defaultSEO.ts
import { DefaultSeoProps } from 'next-seo'

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | PUXX Ireland - World\'s Best Nicotine Pouches',
  defaultTitle: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
  description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150. 18+ only. Shop PUXX - the world\'s best pouches.',
  canonical: 'https://puxxireland.ie',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://puxxireland.ie',
    site_name: 'PUXX Ireland',
    title: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
    description: 'Buy premium tobacco-free nicotine pouches in Ireland. 14 flavors, 6mg-22mg strength options. Free delivery over €150.',
    images: [
      {
        url: 'https://puxxireland.ie/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PUXX Ireland - World\'s Best Nicotine Pouches',
      },
    ],
  },
  twitter: {
    handle: '@puxxireland',
    site: '@puxxireland',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'nicotine pouches Ireland, tobacco free pouches, nicotine pouches buy Ireland, best nicotine pouches, PUXX Ireland',
    },
    {
      name: 'author',
      content: 'PUXX Ireland',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    },
  ],
}
```

**Apply to Root Layout:**

```typescript
// app/layout.tsx
import { DefaultSeo } from 'next-seo'
import { defaultSEO } from '@/lib/seo/defaultSEO'

export default function RootLayout({ children }: { children: React.Node }) {
  return (
    <html lang="en-IE">
      <head>
        <DefaultSeo {...defaultSEO} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Page-Specific SEO:**

```typescript
// app/shop/[slug]/page.tsx
import { NextSeo, ProductJsonLd } from 'next-seo'

export default function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <NextSeo
        title={`${product.name} - ${product.strength}mg Nicotine Pouches`}
        description={`Buy ${product.name} nicotine pouches in Ireland. ${product.description}. €15.00. Free delivery over €150.`}
        canonical={`https://puxxireland.ie/shop/${product.slug}`}
        openGraph={{
          type: 'product',
          title: `${product.name} - PUXX Ireland`,
          description: product.description,
          images: [
            {
              url: product.image_url,
              width: 800,
              height: 800,
              alt: product.name,
            },
          ],
          product: {
            price: {
              amount: product.price_eur,
              currency: 'EUR',
            },
            availability: product.stock_quantity > 0 ? 'in stock' : 'out of stock',
            condition: 'new',
          },
        }}
      />

      <ProductJsonLd
        productName={product.name}
        images={[product.image_url, ...product.gallery_images]}
        description={product.description}
        brand="PUXX"
        color={product.flavor_type}
        manufacturerName="PUXX"
        offers={[
          {
            price: product.price_eur.toString(),
            priceCurrency: 'EUR',
            availability: product.stock_quantity > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `https://puxxireland.ie/shop/${product.slug}`,
            seller: {
              name: 'PUXX Ireland',
            },
          },
        ]}
        aggregateRating={{
          ratingValue: '4.8',
          reviewCount: '127',
        }}
      />

      {/* Product content */}
    </>
  )
}
```

#### 1.2 Install next-sitemap

```bash
npm install next-sitemap
```

**Configuration:**

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://puxxireland.ie',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin/*',
    '/api/*',
    '/checkout/success',
    '/checkout/cancel',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/checkout/success', '/checkout/cancel'],
      },
    ],
    additionalSitemaps: [
      'https://puxxireland.ie/sitemap.xml',
      'https://puxxireland.ie/products-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    if (path.startsWith('/shop/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    if (path === '/shop') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Default
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
```

**Generate Sitemap:**

```json
// package.json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

#### 1.3 Schema.org Markup

**Organization Schema (Homepage):**

```tsx
// app/page.tsx
import { OrganizationJsonLd, LocalBusinessJsonLd } from 'next-seo'

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd
        type="Organization"
        id="https://puxxireland.ie"
        name="PUXX Ireland"
        url="https://puxxireland.ie"
        logo="https://puxxireland.ie/logo.png"
        sameAs={[
          'https://www.instagram.com/puxxireland',
          'https://www.facebook.com/puxxireland',
        ]}
        contactPoint={[
          {
            telephone: '+353-1-XXX-XXXX',
            contactType: 'customer service',
            email: 'info@puxxireland.ie',
            areaServed: 'IE',
            availableLanguage: ['English'],
          },
        ]}
      />

      <LocalBusinessJsonLd
        type="Store"
        id="https://puxxireland.ie"
        name="PUXX Ireland"
        description="Premium tobacco-free nicotine pouches in Ireland"
        url="https://puxxireland.ie"
        telephone="+353-1-XXX-XXXX"
        address={{
          streetAddress: 'Your Street Address',
          addressLocality: 'Dublin',
          addressRegion: 'Dublin',
          postalCode: 'D02 XXXX',
          addressCountry: 'IE',
        }}
        geo={{
          latitude: '53.3498',
          longitude: '-6.2603',
        }}
        images={['https://puxxireland.ie/og-image.jpg']}
        priceRange="€€"
        openingHours={[
          {
            opens: '00:00',
            closes: '23:59',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
          },
        ]}
      />

      {/* Homepage content */}
    </>
  )
}
```

**BreadcrumbList Schema (Product Pages):**

```tsx
// app/shop/[slug]/page.tsx
import { BreadcrumbJsonLd } from 'next-seo'

<BreadcrumbJsonLd
  itemListElements={[
    {
      position: 1,
      name: 'Home',
      item: 'https://puxxireland.ie',
    },
    {
      position: 2,
      name: 'Shop',
      item: 'https://puxxireland.ie/shop',
    },
    {
      position: 3,
      name: product.name,
      item: `https://puxxireland.ie/shop/${product.slug}`,
    },
  ]}
/>
```

#### 1.4 robots.txt Configuration

**Automatic via next-sitemap** (see above)

**Manual (if needed):**

```
# /public/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /checkout/success
Disallow: /checkout/cancel

Sitemap: https://puxxireland.ie/sitemap.xml
```

---

### Phase 2: On-Page SEO Optimization (Week 2-4)

#### 2.1 Homepage Optimization

**Title Tag:**
```
PUXX Ireland - Premium Tobacco-Free Nicotine Pouches | 14 Flavors
```
*Length: 69 characters (under 60-70 limit)*

**Meta Description:**
```
Buy premium nicotine pouches in Ireland. 14 delicious flavors, 6mg-22mg strength options. Tobacco-free, high quality. Free delivery over €150. 18+ only.
```
*Length: 156 characters (under 160 limit)*

**H1:**
```
Experience the World's Best Nicotine Pouches in Ireland
```

**H2s:**
- Premium Tobacco-Free Flavour Nicotine Pouches
- 14 Delicious Flavors to Choose From
- Why Choose PUXX Ireland?
- Fast & Free Delivery Across Ireland

**Content Requirements:**
- Minimum 800 words
- Include primary keyword "nicotine pouches Ireland" 3-5 times (1% keyword density)
- Include related keywords: tobacco-free, flavors, strength, Ireland, buy, shop
- Add FAQ section (target featured snippets)
- Internal links to all product categories

#### 2.2 Shop Page Optimization

**Title Tag:**
```
Buy Nicotine Pouches Ireland | 14 Flavors Available | PUXX Ireland
```

**Meta Description:**
```
Shop all 14 PUXX nicotine pouch flavors. Mint, fruit & specialty options. 6mg, 16mg, 22mg strengths. €15 per tin. Free delivery over €150. 18+ only.
```

**H1:**
```
Shop Nicotine Pouches in Ireland
```

**H2s:**
- Filter by Flavor Type
- Filter by Strength
- All PUXX Nicotine Pouches

**Content:**
- Product grid (main content)
- Introductory paragraph (150-200 words)
- USPs: Free delivery, 14 flavors, fast shipping

#### 2.3 Product Page Optimization (Template)

**Title Tag Pattern:**
```
{Product Name} Nicotine Pouches {Strength}mg | Buy in Ireland | PUXX
```

**Example:**
```
PUXX Cool Mint Nicotine Pouches 22mg | Buy in Ireland | PUXX
```
*Length: 64 characters*

**Meta Description Pattern:**
```
Buy {Product Name} nicotine pouches in Ireland. {Flavor description}. {Strength}mg. €15.00. Tobacco-free. Free delivery over €150. 18+ only. Shop PUXX.
```

**Example:**
```
Buy PUXX Cool Mint nicotine pouches in Ireland. Refreshing mint flavor with icy coolness. 22mg strength. €15.00. Tobacco-free. Free delivery over €150. 18+ only.
```
*Length: 159 characters*

**H1:**
```
{Product Name} Nicotine Pouches - {Strength}mg
```

**H2s:**
- Product Description
- Flavor Profile
- Strength & Usage
- Ingredients
- Why Choose {Product Name}?
- Shipping Information
- Related Products

**Content Requirements:**
- Minimum 300 words per product
- Unique descriptions (no duplicate content)
- Include flavor keywords
- Usage instructions
- Benefits
- Internal links to related flavors

#### 2.4 Category Pages (Future)

**Create dedicated category pages:**

**Mint Nicotine Pouches Ireland** (`/shop/mint`)
- List all mint flavors
- 500+ words of unique content about mint pouches
- Internal links to products

**Fruit Nicotine Pouches Ireland** (`/shop/fruit`)
- List all fruit flavors
- 500+ words about fruit pouches
- Internal links to products

**Specialty Nicotine Pouches Ireland** (`/shop/specialty`)
- Cola, wintergreen, etc.
- 500+ words about specialty flavors

#### 2.5 Local SEO Pages

**City-Specific Landing Pages:**

**/nicotine-pouches-dublin**
- "Buy Nicotine Pouches in Dublin"
- Mention Dublin-specific delivery info
- 400-500 words
- Link to shop page

**/nicotine-pouches-cork**
**/nicotine-pouches-galway**
**/nicotine-pouches-limerick**
**/nicotine-pouches-waterford**

**Benefits:**
- Capture local search traffic
- Lower competition keywords
- Higher conversion (local intent)

#### 2.6 Informational Content (Blog)

**SEO-Optimized Blog Posts:**

1. **"What Are Nicotine Pouches? Complete Guide (2025)"**
   - Target: "what are nicotine pouches"
   - Target: "nicotine pouches explained"
   - 1500+ words
   - FAQ schema

2. **"Nicotine Pouches vs Snus: Which Is Better?"**
   - Target: "nicotine pouches vs snus"
   - Comparison table
   - 1200+ words

3. **"Are Nicotine Pouches Safe? What You Need to Know"**
   - Target: "are nicotine pouches safe"
   - Medical facts
   - Disclaimer
   - 1000+ words

4. **"Best Nicotine Pouch Flavors in Ireland (2025)"**
   - Target: "best nicotine pouch flavors"
   - Product roundup
   - Internal links to all products
   - 1500+ words

5. **"How to Use Nicotine Pouches: Complete Beginner's Guide"**
   - Target: "how to use nicotine pouches"
   - Step-by-step instructions
   - Video (future)
   - 800+ words

6. **"Nicotine Pouch Strength Guide: 6mg vs 16mg vs 22mg"**
   - Target: "nicotine pouch strength"
   - Comparison table
   - Recommendations
   - 1000+ words

7. **"Where to Buy Nicotine Pouches in Ireland"**
   - Target: "where to buy nicotine pouches Ireland"
   - List PUXX as #1 option
   - Mention convenience, pricing, delivery
   - 800+ words

**Blog SEO Requirements:**
- Publish 2-4 posts per month
- Minimum 800 words per post
- Include images (with alt text)
- Internal links to products
- External links to authoritative sources
- FAQ schema on relevant posts
- Social sharing buttons

---

### Phase 3: Performance Optimization (Week 3-4)

#### 3.1 Lighthouse Audits

**Install Lighthouse:**
```bash
npm install -g lighthouse
```

**Run Audits:**
```bash
# Audit homepage
lighthouse https://puxxireland.ie --output=html --output-path=./audits/homepage.html

# Audit shop page
lighthouse https://puxxireland.ie/shop --output=html --output-path=./audits/shop.html

# Audit product page
lighthouse https://puxxireland.ie/shop/cool-mint --output=html --output-path=./audits/product.html
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

**Common Issues to Fix:**
- Unoptimized images → Convert to WebP, use next/image
- Render-blocking resources → Inline critical CSS, defer JS
- Large bundle size → Code splitting, lazy loading
- Missing meta descriptions → Add with next-seo
- Missing alt text → Add to all images
- Low contrast text → Fix color combinations

#### 3.2 Core Web Vitals Optimization

**Target Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Optimizations:**

**LCP (Largest Contentful Paint):**
```tsx
// Use next/image with priority for hero image
import Image from 'next/image'

<Image
  src="/hero-banner.jpg"
  alt="PUXX Nicotine Pouches"
  width={1920}
  height={1080}
  priority // Preload above-the-fold image
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Low-quality placeholder
/>
```

**FID (First Input Delay):**
- Minimize JavaScript execution
- Use code splitting
- Lazy load non-critical components

```tsx
// Lazy load components below the fold
import dynamic from 'next/dynamic'

const ProductGrid = dynamic(() => import('@/components/products/ProductGrid'), {
  loading: () => <ProductGridSkeleton />,
})
```

**CLS (Cumulative Layout Shift):**
- Set explicit width/height on all images
- Reserve space for dynamic content
- Avoid inserting content above existing content

```tsx
// Always set dimensions
<Image src={product.image} alt={product.name} width={600} height={600} />

// Reserve space for dynamic content
<div className="min-h-[400px]">
  {/* Content loads here */}
</div>
```

#### 3.3 Image Optimization

**Use next/image everywhere:**
```tsx
import Image from 'next/image'

// Product images
<Image
  src={product.image_url}
  alt={`${product.name} nicotine pouches`}
  width={600}
  height={600}
  quality={85}
  loading="lazy"
/>
```

**Image Alt Text Pattern:**
```
{Product Name} nicotine pouches {strength}mg - {flavor description}
```

**Example:**
```
PUXX Cool Mint nicotine pouches 22mg - refreshing mint flavor
```

**Convert to WebP:**
- Use sharp or imagemin during build
- Serve WebP with JPEG fallback
- Next.js handles this automatically with next/image

#### 3.4 Lazy Loading

**Lazy load below-the-fold content:**
```tsx
import { lazy, Suspense } from 'react'

const ProductShowcase = lazy(() => import('@/components/ProductShowcase'))
const FeaturedProducts = lazy(() => import('@/components/FeaturedProducts'))

<Suspense fallback={<div>Loading...</div>}>
  <ProductShowcase />
</Suspense>
```

**Intersection Observer for images:**
```tsx
import { useInView } from 'react-intersection-observer'

function ProductCard({ product }: { product: Product }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref}>
      {inView && <Image src={product.image} alt={product.name} width={300} height={300} />}
    </div>
  )
}
```

---

### Phase 4: Off-Page SEO & Link Building (Month 2-6)

#### 4.1 Link Building Strategy

**Target: 100+ quality backlinks in 6 months**

**High-Priority Backlinks (DA 40+):**

1. **Irish Business Directories (20+ links)**
   - Yelp Ireland
   - YellowPages.ie
   - LocalFind.ie
   - IrishBusinessHub.com
   - GoldenPages.ie
   - Chamber of Commerce listings
   - Irish E-commerce Association

2. **Industry Directories (10+ links)**
   - Tobacco alternative directories
   - Harm reduction websites
   - Vaping/nicotine pouch forums
   - Reddit (r/nicotinepouches - nofollow but traffic)

3. **News & PR (5-10 links)**
   - Irish Times (sponsored content or press release)
   - Independent.ie
   - TheJournal.ie
   - RTE News (if newsworthy story)
   - Irish health/lifestyle blogs

4. **Guest Posting (15+ links)**
   - Irish lifestyle blogs
   - Health & wellness blogs (tobacco alternatives)
   - E-commerce blogs (business story)
   - Write 800+ word articles with natural link to PUXX Ireland

5. **Partnerships & Collaborations (10+ links)**
   - Partner with Irish retailers (cross-promotion)
   - Affiliate program (offer 10% commission)
   - Irish influencers (product reviews)
   - Podcast sponsorships

6. **Local SEO Citations (30+ links)**
   - Google Business Profile (primary)
   - Bing Places
   - Apple Maps
   - Facebook Business Page
   - Instagram Business Profile
   - TripAdvisor (if applicable)
   - Yelp Ireland
   - All local directories

7. **Content Syndication (10+ links)**
   - Publish blog posts on Medium
   - Republish on LinkedIn
   - Share on industry forums
   - Submit to content aggregators

**Link Building Tactics:**

**Month 1-2: Foundation**
- [ ] Create Google Business Profile
- [ ] Submit to 20 Irish business directories
- [ ] Create social media profiles (Instagram, Facebook, Twitter/X)
- [ ] Reach out to 10 Irish bloggers for reviews
- [ ] Submit press release to Irish news sites

**Month 3-4: Content & Outreach**
- [ ] Publish 8 blog posts (2 per month)
- [ ] Write 5 guest posts for Irish lifestyle blogs
- [ ] Launch affiliate program
- [ ] Partner with 3-5 Irish influencers
- [ ] Create linkable asset (e.g., "Ultimate Guide to Nicotine Pouches")

**Month 5-6: Scale & Amplify**
- [ ] Continue guest posting (2 per month)
- [ ] Launch PR campaign (news coverage)
- [ ] Create infographic (shareable content)
- [ ] Sponsor Irish podcast or event
- [ ] Build relationships with Irish media

#### 4.2 Content Marketing

**"Linkable Assets" - High-Value Content:**

1. **"The Ultimate Guide to Nicotine Pouches (2025)"**
   - 3000+ words
   - Comprehensive resource
   - Share on Reddit, forums, social media
   - Attract natural backlinks

2. **"Nicotine Pouches in Ireland: Market Report 2025"**
   - Data and statistics
   - Shareable infographic
   - Cite by journalists and bloggers

3. **"Flavor Profiles: A Guide to Choosing Your Perfect Nicotine Pouch"**
   - Interactive quiz (future)
   - Visual guide
   - Shareable on social media

4. **"History of Nicotine Pouches: From Snus to Modern Alternatives"**
   - Educational content
   - Citations and sources
   - Backlink magnet

**Content Distribution:**
- Publish on PUXX Ireland blog
- Republish on Medium (with canonical link)
- Share on LinkedIn
- Submit to Reddit (r/nicotinepouches)
- Email to Irish health/lifestyle journalists
- Share in Facebook groups
- Tweet thread summaries

#### 4.3 Local SEO

**Google Business Profile Optimization:**

**Setup:**
- [ ] Claim Google Business Profile
- [ ] Category: "Health and Beauty Shop" or "Tobacco Shop" (closest match)
- [ ] Add photos (storefront if physical, product photos if online-only)
- [ ] Complete all fields (hours, website, phone, email)
- [ ] Add service areas (Ireland, all counties)

**Optimization:**
- [ ] Post weekly updates (new products, promotions)
- [ ] Respond to all reviews (5-star and negative)
- [ ] Add Q&A (seed with common questions)
- [ ] Upload product catalog (if available via Google Merchant Center)

**Get Reviews:**
- Email customers after delivery (request review)
- Incentivize with €5 discount on next order
- Target: 50+ reviews with 4.5+ star average in 6 months

**Local Citations:**
- Ensure NAP (Name, Address, Phone) consistency across all directories
- Use same business name: "PUXX Ireland"
- Use same address format
- Use same phone number

---

### Phase 5: Technical SEO Monitoring (Ongoing)

#### 5.1 Rank Tracking with SERPBear

**Install SERPBear:**
```bash
# Clone from Resources
cd /Users/baileybarry/Resources/repos/seo/serpbear

# Install dependencies
npm install

# Configure keywords to track
```

**Keywords to Track:**

**Primary (Daily Tracking):**
- nicotine pouches Ireland
- tobacco free pouches Ireland
- nicotine pouches buy Ireland
- best nicotine pouches Ireland
- buy nicotine pouches online Ireland

**Secondary (Weekly Tracking):**
- PUXX nicotine pouches
- cool mint nicotine pouches Ireland
- watermelon nicotine pouches Ireland
- [All 14 flavor-specific keywords]
- nicotine pouches Dublin
- nicotine pouches Cork
- nicotine pouches Galway

**Long-Tail (Monthly Tracking):**
- where to buy nicotine pouches Ireland
- nicotine pouches delivery Ireland
- best tobacco free nicotine pouches
- nicotine pouches vs snus
- are nicotine pouches safe

**Target Rankings:**
- Primary keywords: #1-3 by Month 6
- Secondary keywords: #1-5 by Month 6
- Long-tail keywords: #1-10 by Month 3

#### 5.2 Site Audits with Seonaut

**Install Seonaut:**
```bash
cd /Users/baileybarry/Resources/repos/seo/seonaut
```

**Run Monthly Audits:**
- [ ] Crawl site like Googlebot
- [ ] Check for broken links (404s)
- [ ] Find duplicate content
- [ ] Identify missing meta descriptions
- [ ] Check for missing alt text
- [ ] Find orphaned pages (no internal links)
- [ ] Check for redirect chains
- [ ] Verify canonical tags
- [ ] Check robots.txt and sitemaps

**Fix Issues:**
- Create checklist from audit report
- Prioritize by impact (high, medium, low)
- Fix high-priority issues within 1 week
- Fix medium-priority issues within 1 month

#### 5.3 Google Search Console

**Setup:**
- [ ] Verify domain ownership
- [ ] Submit sitemap.xml
- [ ] Monitor search performance (impressions, clicks, CTR, position)
- [ ] Check coverage issues (errors, warnings)
- [ ] Review mobile usability
- [ ] Check Core Web Vitals

**Weekly Tasks:**
- Review search performance (top queries, top pages)
- Check for new coverage issues
- Monitor Core Web Vitals

**Monthly Tasks:**
- Export search performance data
- Analyze top queries (find new keyword opportunities)
- Identify underperforming pages (improve)
- Check for new backlinks (Backlinks report)

#### 5.4 Google Analytics 4

**Setup:**
- [ ] Create GA4 property
- [ ] Install tracking code
- [ ] Set up conversions:
  - Add to cart
  - Begin checkout
  - Purchase
  - Newsletter signup

**SEO Metrics to Track:**
- Organic traffic (sessions, users)
- Organic conversion rate
- Top landing pages (organic)
- Bounce rate (organic)
- Average session duration (organic)
- Pages per session (organic)

**Weekly Review:**
- Check organic traffic trend
- Identify top-performing pages
- Identify drop-offs (fix issues)

**Monthly Review:**
- Compare month-over-month growth
- Analyze traffic sources (organic, direct, referral, social)
- Review conversion funnel (where users drop off)
- Identify content gaps (high bounce rate pages)

---

## Content Calendar (First 6 Months)

### Month 1
**Week 1:**
- Publish: "What Are Nicotine Pouches? Complete Guide (2025)"
- Optimize homepage, shop page, all product pages
- Submit to Google Search Console

**Week 2:**
- Publish: "Nicotine Pouches vs Snus: Which Is Better?"
- Create Google Business Profile
- Submit to 10 Irish directories

**Week 3:**
- Publish: "Best Nicotine Pouch Flavors in Ireland (2025)"
- Write guest post for Irish lifestyle blog #1

**Week 4:**
- Publish: "How to Use Nicotine Pouches: Complete Beginner's Guide"
- Launch affiliate program
- Submit press release

### Month 2
**Week 1:**
- Publish: "Are Nicotine Pouches Safe? What You Need to Know"
- Create local landing pages (Dublin, Cork)

**Week 2:**
- Publish: "Nicotine Pouch Strength Guide: 6mg vs 16mg vs 22mg"
- Write guest post #2

**Week 3:**
- Publish: "Where to Buy Nicotine Pouches in Ireland"
- Reach out to 5 Irish influencers

**Week 4:**
- Publish: "PUXX Flavor Profile Guide" (linkable asset)
- Create infographic

### Month 3
**Week 1:**
- Publish: "Top 10 Benefits of Switching to Nicotine Pouches"
- Write guest post #3

**Week 2:**
- Publish: "Nicotine Pouches for Beginners: Everything You Need to Know"
- Create local landing pages (Galway, Limerick, Waterford)

**Week 3:**
- Publish: "How Long Do Nicotine Pouches Last?"
- Outreach to Irish news sites

**Week 4:**
- Publish: "Nicotine Pouches vs Vaping: Pros and Cons"
- Write guest post #4

### Month 4
**Week 1:**
- Publish: "The Science Behind Nicotine Pouches"
- Partner with Irish podcast

**Week 2:**
- Publish: "Mint Nicotine Pouches: A Complete Guide"
- Create category page (/shop/mint)

**Week 3:**
- Publish: "Fruit Nicotine Pouches: Best Flavors Ranked"
- Create category page (/shop/fruit)

**Week 4:**
- Publish: "How to Store Nicotine Pouches for Maximum Freshness"
- Write guest post #5

### Month 5
**Week 1:**
- Publish: "Nicotine Pouches in Ireland: Market Trends 2025"
- Launch PR campaign

**Week 2:**
- Publish: "Are Nicotine Pouches Better Than Cigarettes?"
- Write guest post #6

**Week 3:**
- Publish: "Common Nicotine Pouch Myths Debunked"
- Sponsor Irish event/charity

**Week 4:**
- Publish: "Holiday Gift Guide: Best Nicotine Pouches for Every Flavor Preference"
- Write guest post #7

### Month 6
**Week 1:**
- Publish: "6-Month Review: What We've Learned About Nicotine Pouches in Ireland"
- Analyze SEO performance

**Week 2:**
- Publish: "Customer Favorites: Top-Selling PUXX Flavors"
- Plan Month 7-12 content

**Week 3:**
- Publish: "New Year, New Habits: Switching to Nicotine Pouches"
- Continue link building

**Week 4:**
- Publish: "PUXX Ireland: Our Story and Mission"
- Launch video content (YouTube SEO)

---

## Keyword Research & Targeting

### Primary Keywords (High Priority)

| Keyword | Monthly Volume (IE) | Difficulty | Intent | Priority |
|---------|---------------------|------------|--------|----------|
| nicotine pouches Ireland | 1,200 | Medium | Commercial | 1 |
| tobacco free pouches Ireland | 480 | Low | Commercial | 1 |
| nicotine pouches buy Ireland | 390 | Low | Transactional | 1 |
| best nicotine pouches Ireland | 320 | Medium | Commercial | 2 |
| buy nicotine pouches online Ireland | 210 | Low | Transactional | 2 |
| nicotine pouches delivery Ireland | 170 | Low | Commercial | 3 |
| PUXX Ireland | 140 | Low | Branded | 1 |

### Secondary Keywords (Medium Priority)

| Keyword | Monthly Volume (IE) | Difficulty | Intent | Target Page |
|---------|---------------------|------------|--------|-------------|
| cool mint nicotine pouches | 260 | Low | Commercial | Product page |
| watermelon nicotine pouches | 210 | Low | Commercial | Product page |
| citrus nicotine pouches | 140 | Low | Commercial | Product page |
| nicotine pouches Dublin | 180 | Low | Local | Local page |
| nicotine pouches Cork | 90 | Low | Local | Local page |
| nicotine pouch flavors | 320 | Medium | Informational | Blog post |
| nicotine pouch strength | 210 | Low | Informational | Blog post |
| tobacco free alternatives | 480 | Medium | Informational | Blog post |

### Long-Tail Keywords (Lower Priority, Higher Conversion)

| Keyword | Monthly Volume (IE) | Difficulty | Intent | Target Page |
|---------|---------------------|------------|--------|-------------|
| where to buy nicotine pouches Ireland | 110 | Low | Commercial | Blog post |
| are nicotine pouches legal in Ireland | 90 | Low | Informational | FAQ |
| nicotine pouches vs snus | 320 | Low | Informational | Blog post |
| how to use nicotine pouches | 720 | Low | Informational | Blog post |
| are nicotine pouches safe | 1,900 | Medium | Informational | Blog post |
| best nicotine pouch flavors | 210 | Low | Commercial | Blog post |
| nicotine pouches side effects | 390 | Low | Informational | Blog post |

### Informational Keywords (Content Opportunities)

| Keyword | Monthly Volume | Difficulty | Target Page |
|---------|----------------|------------|-------------|
| what are nicotine pouches | 12,100 | Medium | Blog post |
| nicotine pouches explained | 480 | Low | Blog post |
| how long do nicotine pouches last | 720 | Low | Blog post |
| nicotine pouches for beginners | 210 | Low | Blog post |
| tobacco alternatives Ireland | 260 | Low | Blog post |

---

## SEO Success Metrics & KPIs

### Month 1 Targets
- [ ] Lighthouse SEO score: 95+
- [ ] Indexed pages: 20+
- [ ] Organic traffic: 100+ visitors
- [ ] Backlinks: 10+
- [ ] Google Business Profile created

### Month 3 Targets
- [ ] Organic traffic: 1,000+ visitors/month
- [ ] Backlinks: 30+
- [ ] Keywords ranking (any position): 50+
- [ ] Keywords in top 50: 20+
- [ ] Keywords in top 10: 5+
- [ ] Domain Authority: 15+

### Month 6 Targets (Success Criteria)
- [ ] **Organic traffic: 5,000+ visitors/month**
- [ ] **Backlinks: 100+**
- [ ] **Keywords ranking (any position): 200+**
- [ ] **Keywords in top 10: 30+**
- [ ] **Keywords #1-3: 5+ (including "nicotine pouches Ireland")**
- [ ] **Domain Authority: 30+**
- [ ] **Conversion rate (organic): 2.5%+**
- [ ] **Google Business Profile reviews: 50+**

---

## Tools & Resources Summary

### From Resources Folder (`/Users/baileybarry/Resources/repos/seo/`)

**Critical (Use Immediately):**
- ✅ next-seo - Meta tags & OG
- ✅ next-sitemap - Sitemaps
- ✅ react-schemaorg - Structured data
- ✅ Lighthouse - Performance audits

**High Priority (Use Regularly):**
- ✅ SERPBear - Rank tracking
- ✅ Seonaut - Site crawling
- ✅ SEO Audits Toolkit - Comprehensive audits
- ✅ Page Auditor - Page-level SEO

**Medium Priority (Use as Needed):**
- ✅ ContentSwift - Content optimization
- ✅ LibreCrawl - Web crawling
- ✅ python-seo-analyzer - Python-based analysis
- ✅ awesome-seo-tools - Curated tools list

### SEO Workflow Recipe

**Location:** `/Users/baileybarry/Resources/recipes/seo-content-creation-workflow.md`

**Workflow:**
1. **Research** - Use Perplexity MCP for keyword research & SERP analysis
2. **Create** - Write content with Claude
3. **Optimize** - Use ContentSwift to optimize for target keywords
4. **Implement** - Add meta tags with next-seo
5. **Audit** - Run Lighthouse audit
6. **Monitor** - Track rankings with SERPBear

---

## Quick Start Checklist

### Week 1: Technical Foundation
- [ ] Install next-seo
- [ ] Install next-sitemap
- [ ] Configure defaultSEO
- [ ] Add schema.org markup (homepage, products)
- [ ] Run first Lighthouse audit
- [ ] Fix critical issues
- [ ] Submit sitemap to Google Search Console

### Week 2: On-Page Optimization
- [ ] Optimize all meta titles and descriptions
- [ ] Add alt text to all images
- [ ] Optimize hero images (WebP, lazy load)
- [ ] Create FAQ section on homepage
- [ ] Write first 2 blog posts
- [ ] Set up Google Analytics 4

### Week 3: Off-Page Foundation
- [ ] Create Google Business Profile
- [ ] Submit to 20 Irish directories
- [ ] Create social media profiles
- [ ] Launch affiliate program
- [ ] Reach out to 5 Irish bloggers

### Week 4: Content & Links
- [ ] Publish 2 more blog posts
- [ ] Write first guest post
- [ ] Submit press release
- [ ] Create linkable asset
- [ ] Set up rank tracking with SERPBear

---

## Monthly SEO Checklist

### Every Week
- [ ] Publish 1 blog post (800+ words)
- [ ] Check Google Search Console for issues
- [ ] Review Google Analytics (organic traffic)
- [ ] Respond to Google Business Profile reviews
- [ ] Share content on social media

### Every Month
- [ ] Run Lighthouse audit
- [ ] Run Seonaut site crawl
- [ ] Check SERPBear rankings
- [ ] Write 1-2 guest posts
- [ ] Build 10+ backlinks
- [ ] Review and fix any SEO issues
- [ ] Analyze top-performing content
- [ ] Identify new keyword opportunities
- [ ] Update old content (refresh dates, add info)

### Every Quarter
- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Update content strategy
- [ ] Review and update meta tags
- [ ] Analyze backlink profile
- [ ] Check for broken links
- [ ] Update local citations

---

## Budget Estimate

### Tools & Services (Monthly)
| Item | Cost |
|------|------|
| Google Search Console | Free |
| Google Analytics 4 | Free |
| Google Business Profile | Free |
| Lighthouse | Free |
| SERPBear (self-hosted) | Free |
| Seonaut (self-hosted) | Free |
| SendGrid (email for outreach) | €0-20/month |
| **Total Tools** | **€0-20/month** |

### Content Creation (Monthly)
| Item | Cost |
|------|------|
| Blog posts (8-10 per month @ €50-100 each) | €400-1,000 |
| Guest posts (2 per month @ €100-200 each) | €200-400 |
| Infographics/visual content | €100-300 |
| **Total Content** | **€700-1,700/month** |

### Link Building (Monthly)
| Item | Cost |
|------|------|
| Directory submissions | €50-100 |
| Sponsored content / PR | €500-2,000 |
| Influencer partnerships | €300-1,000 |
| **Total Link Building** | **€850-3,100/month** |

**Total Monthly SEO Budget:** €1,550-4,820/month

**6-Month Total:** €9,300-28,920

*Note: Can reduce costs significantly by doing content creation in-house with Claude*

---

## Next Steps

1. ✅ Review this SEO plan
2. ✅ Approve budget allocation
3. ✅ Begin Week 1 tasks (technical foundation)
4. ✅ Start content calendar (Month 1)
5. ✅ Set up rank tracking
6. ✅ Launch link building campaign
7. ✅ Monitor and adjust strategy based on results

---

**Document Created:** December 2025
**Ready to Execute:** Yes - All tools available in Resources folder
**Expected Results:** #1-3 rankings for primary keywords within 6 months
**Integrates With:** Website Build Plan (Phase 4)
