# SEO Monitoring Checklist & Tools Setup Guide

**Project:** PUXX Ireland E-commerce Website
**Purpose:** Ongoing SEO monitoring, rank tracking, and performance optimization
**Last Updated:** December 2025

---

## Table of Contents

1. [Quick Start Guide (First 4 Weeks)](#quick-start-guide-first-4-weeks)
2. [Weekly Tasks](#weekly-tasks)
3. [Monthly Tasks](#monthly-tasks)
4. [Quarterly Tasks](#quarterly-tasks)
5. [Tools Setup](#tools-setup)
6. [Keywords to Track](#keywords-to-track)
7. [Target Metrics by Month](#target-metrics-by-month)
8. [Issue Response Checklist](#issue-response-checklist)

---

## Quick Start Guide (First 4 Weeks)

### Week 1: Technical Foundation
**Priority:** Critical - Sets up all monitoring infrastructure

- [ ] Install and configure **next-seo** for meta tags
- [ ] Install and configure **next-sitemap** for sitemap generation
- [ ] Add schema.org markup to homepage and product pages
- [ ] Run first **Lighthouse audit** on all key pages (homepage, shop, 3 products)
- [ ] Fix critical issues from Lighthouse (score 95+ target)
- [ ] Set up **Google Search Console** (see [Tools Setup](#tools-setup))
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Verify no indexing blockers in robots.txt
- [ ] Set up **Google Analytics 4** property
- [ ] Install GA4 tracking code on all pages

**Deliverable:** All monitoring tools active, baseline metrics established

---

### Week 2: On-Page Optimization & Baseline
**Priority:** High - Ensures content is optimized before tracking

- [ ] Optimize all meta titles (60-70 characters)
- [ ] Optimize all meta descriptions (150-160 characters)
- [ ] Add descriptive alt text to all images
- [ ] Convert hero images to WebP format
- [ ] Implement lazy loading for below-fold images
- [ ] Create FAQ section on homepage (target featured snippets)
- [ ] Write and publish first 2 blog posts (800+ words each)
- [ ] Run **Lighthouse audit** again to verify improvements
- [ ] Document baseline performance scores

**Deliverable:** All pages optimized for SEO, baseline scores recorded

---

### Week 3: Off-Page Foundation & Local SEO
**Priority:** High - Establishes online presence and citations

- [ ] Create **Google Business Profile** (see [Tools Setup](#tools-setup))
- [ ] Complete all GBP fields (hours, website, phone, description)
- [ ] Add 10+ photos to Google Business Profile
- [ ] Submit site to 20 Irish business directories:
  - [ ] GoldenPages.ie
  - [ ] YellowPages.ie
  - [ ] LocalFind.ie
  - [ ] IrishBusinessHub.com
  - [ ] Yelp Ireland
  - [ ] Bing Places
  - [ ] Apple Maps
  - [ ] 13 additional directories
- [ ] Create social media business profiles:
  - [ ] Instagram Business Profile
  - [ ] Facebook Business Page
  - [ ] Twitter/X Business Account
- [ ] Launch affiliate program page
- [ ] Reach out to 5 Irish lifestyle bloggers for product reviews

**Deliverable:** Local SEO citations complete, social profiles live

---

### Week 4: Content, Links & Rank Tracking
**Priority:** High - Begins content marketing and rank monitoring

- [ ] Publish 2 more blog posts (800+ words each)
- [ ] Write first guest post for Irish lifestyle blog
- [ ] Submit press release to Irish news sites (TheJournal.ie, Independent.ie)
- [ ] Create first linkable asset (e.g., "Ultimate Guide to Nicotine Pouches")
- [ ] Set up **SERPBear** for rank tracking (see [Tools Setup](#tools-setup))
- [ ] Add all primary keywords to SERPBear (daily tracking)
- [ ] Add all secondary keywords to SERPBear (weekly tracking)
- [ ] Set up **Seonaut** for site crawling (see [Tools Setup](#tools-setup))
- [ ] Run first Seonaut crawl to establish baseline
- [ ] Create shared Google Sheet for tracking metrics

**Deliverable:** Rank tracking active, first links built, content calendar launched

---

## Weekly Tasks

### Every Monday Morning (30 minutes)

#### Google Search Console Review
- [ ] Log into Google Search Console
- [ ] Check **Coverage** tab for new errors or warnings
- [ ] Review **Enhancements** for mobile usability issues
- [ ] Check **Core Web Vitals** report for performance drops
- [ ] Note any manual actions or security issues

**Action:** Fix any critical errors within 48 hours

#### Organic Traffic Check
- [ ] Open Google Analytics 4
- [ ] Navigate to **Reports > Acquisition > Traffic Acquisition**
- [ ] Filter to "Organic Search" traffic
- [ ] Compare last 7 days vs. previous 7 days
- [ ] Note significant increases or decreases (>20% change)
- [ ] Check top landing pages (identify winners/losers)

**Action:** Investigate any traffic drops >20% within same day

#### Rankings Spot Check
- [ ] Log into SERPBear
- [ ] Review primary keyword rankings (daily update)
- [ ] Note any position changes >3 spots (up or down)
- [ ] Check if any keywords entered top 10 or top 3

**Action:** Celebrate wins, investigate losses

#### Content Publishing
- [ ] Publish 1 blog post (800+ words minimum)
- [ ] Optimize with target keyword (1% density)
- [ ] Add internal links to 3-5 relevant pages
- [ ] Add 2-3 external links to authoritative sources
- [ ] Add images with descriptive alt text
- [ ] Share on social media (Instagram, Facebook, Twitter)
- [ ] Submit URL to Google Search Console for immediate indexing

**Action:** Maintain consistent publishing schedule

#### Review Monitoring
- [ ] Check Google Business Profile for new reviews
- [ ] Respond to all reviews (positive and negative)
- [ ] Thank customers for 5-star reviews
- [ ] Address concerns in negative reviews professionally
- [ ] Request reviews from recent customers (via email)

**Target:** 2-3 new reviews per week

---

## Monthly Tasks

### First Week of Each Month (2-3 hours)

#### Comprehensive Lighthouse Audit
- [ ] Run Lighthouse on all key pages:
  - [ ] Homepage
  - [ ] Shop page
  - [ ] 3 top-performing product pages
  - [ ] 2 blog posts
  - [ ] Checkout page
- [ ] Record scores for each page:
  - Performance: ___
  - Accessibility: ___
  - Best Practices: ___
  - SEO: ___
- [ ] Export reports to `/audits/lighthouse-YYYY-MM.html`
- [ ] Create list of issues to fix (prioritize by impact)
- [ ] Track month-over-month score improvements

**Target Scores:** Performance 90+, Accessibility 95+, SEO 95+

**Terminal Command:**
```bash
lighthouse https://puxxnicotine.ie --output=html --output-path=./audits/homepage-2025-12.html
lighthouse https://puxxnicotine.ie/shop --output=html --output-path=./audits/shop-2025-12.html
lighthouse https://puxxnicotine.ie/products/cool-mint --output=html --output-path=./audits/product-2025-12.html
```

---

#### Seonaut Site Crawl
- [ ] Open Seonaut tool (see [Tools Setup](#tools-setup))
- [ ] Run full site crawl: `https://puxxnicotine.ie`
- [ ] Review crawl report for issues:
  - [ ] Broken links (404 errors)
  - [ ] Redirect chains (301 → 301)
  - [ ] Missing meta descriptions
  - [ ] Duplicate content
  - [ ] Missing alt text
  - [ ] Orphaned pages (no internal links)
  - [ ] Incorrect canonical tags
  - [ ] Blocked by robots.txt
  - [ ] Pages not in sitemap
- [ ] Export report: `seonaut-crawl-YYYY-MM.csv`
- [ ] Create prioritized fix list:
  - High priority: Broken links, indexing issues
  - Medium priority: Missing meta, duplicate content
  - Low priority: Minor optimization opportunities

**Action:** Fix high-priority issues within 1 week

---

#### SERPBear Rank Review
- [ ] Log into SERPBear dashboard
- [ ] Review keyword rankings (monthly comparison):
  - [ ] How many keywords improved?
  - [ ] How many keywords declined?
  - [ ] Any new top 10 rankings?
  - [ ] Any new top 3 rankings?
- [ ] Export rankings data: `serpbear-rankings-YYYY-MM.csv`
- [ ] Update tracking spreadsheet with:
  - Primary keywords: Current position vs. last month
  - Secondary keywords: Current position vs. last month
  - Long-tail keywords: New rankings
- [ ] Identify keyword opportunities:
  - Keywords stuck at position 11-20 (push to top 10)
  - Keywords at position 4-10 (push to top 3)

**Action:** Create content plan to boost underperforming keywords

---

#### Backlink Analysis
- [ ] Log into Google Search Console
- [ ] Navigate to **Links** report
- [ ] Check **Top linking sites**:
  - [ ] How many new linking domains?
  - [ ] Any high-authority sites (DA 40+)?
  - [ ] Any suspicious/spammy links?
- [ ] Export backlinks: `gsc-backlinks-YYYY-MM.csv`
- [ ] Compare vs. last month:
  - New backlinks: ___
  - Lost backlinks: ___
  - Net change: ___
- [ ] Disavow toxic backlinks (if necessary)

**Target:** 10-20 new backlinks per month

---

#### Content Performance Review
- [ ] Open Google Analytics 4
- [ ] Navigate to **Reports > Engagement > Pages and Screens**
- [ ] Filter to organic traffic only
- [ ] Identify top 10 performing pages:
  - Views: ___
  - Engagement rate: ___
  - Conversion rate: ___
- [ ] Identify underperforming pages:
  - High impressions, low clicks (low CTR)
  - High traffic, high bounce rate
  - Pages with declining traffic
- [ ] Update underperforming content:
  - [ ] Refresh publish date
  - [ ] Add new information/statistics
  - [ ] Improve meta description (boost CTR)
  - [ ] Add more internal links
  - [ ] Add images/videos
  - [ ] Target additional keywords

**Action:** Update 2-3 underperforming posts per month

---

#### Competitor Analysis
- [ ] Identify top 3 competitors in SERPs for primary keywords
- [ ] Analyze competitor content:
  - Word count: ___
  - Content depth: ___
  - Multimedia (images, videos): ___
  - Internal linking: ___
- [ ] Check competitor backlinks (use free tools like Ahrefs backlink checker)
- [ ] Identify content gaps:
  - Topics competitors cover that you don't
  - Keywords competitors rank for
- [ ] Update content strategy based on findings

**Action:** Create 1-2 new pieces of content to fill gaps

---

#### Link Building (Ongoing)
- [ ] Write 1-2 guest posts for Irish lifestyle/health blogs
- [ ] Reach out to 10 new Irish bloggers/influencers
- [ ] Submit to 5 new directories
- [ ] Create 1 linkable asset (infographic, guide, data study)
- [ ] Promote linkable asset via:
  - [ ] Email outreach to journalists
  - [ ] Share on social media
  - [ ] Submit to content aggregators
  - [ ] Post in relevant forums/Reddit

**Target:** 10-20 new backlinks per month

---

#### Google Business Profile Optimization
- [ ] Post weekly update (new products, promotions, tips)
- [ ] Add new photos (products, behind-the-scenes)
- [ ] Update business hours (if changed)
- [ ] Seed Q&A with common questions:
  - "Do you deliver to all of Ireland?"
  - "What nicotine strengths do you offer?"
  - "Are nicotine pouches safe?"
- [ ] Check insights:
  - How many people viewed profile?
  - How many clicked website?
  - How many requested directions?

**Target:** 100+ profile views per month

---

## Quarterly Tasks

### Every 3 Months (Half-day commitment)

#### Comprehensive SEO Audit
- [ ] Run full **SEO Audits Toolkit** analysis
  - Location: `/Users/baileybarry/Resources/repos/seo/seo-audits-toolkit/`
- [ ] Review all audit categories:
  - [ ] Technical SEO (crawlability, indexability, site speed)
  - [ ] On-page SEO (titles, meta, headings, content)
  - [ ] Off-page SEO (backlinks, social signals)
  - [ ] Content quality (uniqueness, depth, readability)
  - [ ] User experience (mobile, navigation, CTAs)
  - [ ] Local SEO (NAP consistency, citations, reviews)
- [ ] Create comprehensive action plan
- [ ] Prioritize fixes by impact (high/medium/low)
- [ ] Schedule implementation over next quarter

**Deliverable:** Quarterly SEO audit report + action plan

---

#### Deep Competitor Analysis
- [ ] Identify top 5 competitors (organic search)
- [ ] Analyze competitor SEO strategies:
  - [ ] Keyword targeting (what they rank for)
  - [ ] Content strategy (topics, frequency)
  - [ ] Backlink profile (quantity, quality, sources)
  - [ ] Technical SEO (site speed, mobile, schema)
  - [ ] Social media presence
- [ ] Use free tools:
  - [ ] SimilarWeb (traffic estimates)
  - [ ] Ahrefs free backlink checker
  - [ ] Google search operator: `site:competitor.com`
- [ ] Create competitive matrix:

| Metric | PUXX Ireland | Competitor 1 | Competitor 2 | Competitor 3 |
|--------|--------------|--------------|--------------|--------------|
| DA | ___ | ___ | ___ | ___ |
| Backlinks | ___ | ___ | ___ | ___ |
| Top 10 keywords | ___ | ___ | ___ | ___ |
| Blog posts/month | ___ | ___ | ___ | ___ |

- [ ] Identify competitive advantages to leverage
- [ ] Identify weaknesses to exploit

**Action:** Adjust strategy to outrank competitors

---

#### Content Strategy Update
- [ ] Review content performance (last 3 months):
  - [ ] Top 10 performing blog posts
  - [ ] Lowest performing blog posts
  - [ ] Content that drove conversions
  - [ ] Content that attracted backlinks
- [ ] Analyze search trends:
  - [ ] Google Trends for Ireland
  - [ ] Google Search Console "Queries" report
  - [ ] Identify rising search terms
- [ ] Update content calendar for next quarter:
  - [ ] 12-16 blog posts (1 per week)
  - [ ] 2-3 linkable assets
  - [ ] 4-6 guest posts
  - [ ] Topic clusters to build topical authority
- [ ] Identify content refresh opportunities:
  - [ ] Update publish dates on evergreen content
  - [ ] Add new sections to comprehensive guides
  - [ ] Refresh statistics and data

**Deliverable:** Q[X] Content Calendar with 12-16 topics

---

#### Technical SEO Deep Dive
- [ ] Check site speed on all pages:
  - [ ] Run GTmetrix tests
  - [ ] Run WebPageTest.org tests
  - [ ] Identify slow pages (>3s load time)
- [ ] Review Core Web Vitals (GSC):
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Check mobile usability:
  - [ ] Test on real devices (iPhone, Android)
  - [ ] Review GSC Mobile Usability report
  - [ ] Fix any mobile-specific issues
- [ ] Verify schema markup:
  - [ ] Test with Google Rich Results Test
  - [ ] Ensure Product schema on all products
  - [ ] Ensure Organization schema on homepage
  - [ ] Ensure LocalBusiness schema
- [ ] Review internal linking:
  - [ ] Orphaned pages (no internal links)
  - [ ] Pages with <3 internal links
  - [ ] Broken internal links
  - [ ] Opportunity to link to new content
- [ ] Check for duplicate content:
  - [ ] Use Siteliner.com
  - [ ] Fix canonical issues
  - [ ] Consolidate thin content

**Action:** Create quarterly technical SEO fix list

---

#### Strategy Review & Adjustment
- [ ] Review quarterly targets vs. actual performance:
  - [ ] Organic traffic: Target ___ | Actual ___
  - [ ] Backlinks: Target ___ | Actual ___
  - [ ] Top 10 keywords: Target ___ | Actual ___
  - [ ] Conversions: Target ___ | Actual ___
- [ ] Identify what's working:
  - [ ] Content types that perform best
  - [ ] Link building tactics that work
  - [ ] Keywords moving up fastest
- [ ] Identify what's not working:
  - [ ] Content that underperforms
  - [ ] Keywords stuck or declining
  - [ ] Tactics that waste time/money
- [ ] Adjust strategy for next quarter:
  - [ ] Double down on what works
  - [ ] Eliminate what doesn't work
  - [ ] Test new tactics (10% of effort)
- [ ] Update 6-month SEO roadmap

**Deliverable:** Quarterly SEO performance report + updated strategy

---

## Tools Setup

### 1. Google Search Console

**Purpose:** Monitor Google search performance, indexing, and technical issues

**Setup Instructions:**

1. **Verify Domain Ownership:**
   - [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
   - [ ] Click "Add Property"
   - [ ] Choose "Domain" (covers all subdomains and protocols)
   - [ ] Enter: `puxxnicotine.ie`
   - [ ] Copy DNS TXT record
   - [ ] Add TXT record to domain DNS settings (via domain registrar)
   - [ ] Click "Verify"

2. **Submit Sitemap:**
   - [ ] Navigate to **Sitemaps** in left sidebar
   - [ ] Enter sitemap URL: `https://puxxnicotine.ie/sitemap.xml`
   - [ ] Click "Submit"
   - [ ] Verify "Success" status (may take 24-48 hours)

3. **Configure Settings:**
   - [ ] Set geographic target: **Ireland**
   - [ ] Set preferred domain: **puxxnicotine.ie** (with or without www)
   - [ ] Enable email notifications for critical issues

4. **Explore Key Reports:**
   - [ ] **Performance** - Search queries, impressions, clicks, CTR, position
   - [ ] **Coverage** - Indexing status, errors, warnings
   - [ ] **Enhancements** - Mobile usability, Core Web Vitals
   - [ ] **Links** - Top linking sites, most linked pages
   - [ ] **Manual Actions** - Penalties (hopefully none!)

**Weekly Check:** Performance report, Coverage errors
**Monthly Check:** Links report, Core Web Vitals

---

### 2. SERPBear (Rank Tracking)

**Purpose:** Track keyword rankings over time in Google search results

**Location:** `/Users/baileybarry/Resources/repos/seo/serpbear`

**Setup Instructions:**

1. **Navigate to SERPBear Directory:**
   ```bash
   cd /Users/baileybarry/Resources/repos/seo/serpbear
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start SERPBear:**
   ```bash
   npm run dev
   ```
   Access at: http://localhost:3000

4. **Configure Settings:**
   - [ ] Set location to **Ireland** (for geo-targeted results)
   - [ ] Set search engine to **Google Ireland** (google.ie)
   - [ ] Configure update frequency:
     - Primary keywords: Daily
     - Secondary keywords: Weekly
     - Long-tail keywords: Monthly

5. **Add Domain:**
   - [ ] Click "Add Domain"
   - [ ] Enter: `puxxnicotine.ie`
   - [ ] Save domain

6. **Add Keywords to Track:**
   - [ ] Click "Add Keyword"
   - [ ] Enter domain: `puxxnicotine.ie`
   - [ ] Add keywords from list in [Keywords to Track](#keywords-to-track) section
   - [ ] Assign tags: "Primary", "Secondary", "Long-tail", "Local"
   - [ ] Set tracking frequency

7. **Run Initial Baseline:**
   - [ ] Click "Refresh All"
   - [ ] Wait for initial rankings to populate (may take 10-30 minutes)
   - [ ] Export baseline: `serpbear-baseline-YYYY-MM-DD.csv`

8. **Set Up Alerts (Optional):**
   - [ ] Configure email alerts for:
     - Keyword enters top 10
     - Keyword enters top 3
     - Keyword drops >5 positions

**Daily Check:** Primary keyword rankings
**Weekly Check:** Secondary keyword rankings
**Monthly Check:** Long-tail keyword rankings, export data

---

### 3. Seonaut (Site Crawler)

**Purpose:** Crawl website like Googlebot, identify technical SEO issues

**Location:** `/Users/baileybarry/Resources/repos/seo/seonaut`

**Setup Instructions:**

1. **Navigate to Seonaut Directory:**
   ```bash
   cd /Users/baileybarry/Resources/repos/seo/seonaut
   ```

2. **Install Dependencies:**
   ```bash
   # Follow installation instructions in repo README
   # May require Python or Node.js depending on version
   ```

3. **Configure Crawl Settings:**
   - [ ] Set starting URL: `https://puxxnicotine.ie`
   - [ ] Set user agent: **Googlebot**
   - [ ] Set crawl depth: **Unlimited** (follow all internal links)
   - [ ] Set crawl rate: **Polite** (1-2 pages per second)
   - [ ] Enable JavaScript rendering (if using client-side rendering)

4. **Run First Crawl:**
   - [ ] Click "Start Crawl" or run command
   - [ ] Wait for crawl to complete (may take 5-30 minutes depending on site size)
   - [ ] Review summary:
     - Total pages crawled: ___
     - Total errors: ___
     - Total warnings: ___

5. **Review Common Issues:**
   - [ ] **404 Errors** - Broken links
   - [ ] **Redirect Chains** - Multiple redirects (301 → 301)
   - [ ] **Missing Meta Descriptions** - Pages without descriptions
   - [ ] **Duplicate Content** - Pages with identical content
   - [ ] **Missing Alt Text** - Images without alt attributes
   - [ ] **Orphaned Pages** - Pages with no internal links
   - [ ] **Incorrect Canonicals** - Canonical tags pointing to wrong URL
   - [ ] **Blocked Resources** - CSS/JS blocked by robots.txt

6. **Export Report:**
   - [ ] Export as CSV: `seonaut-crawl-YYYY-MM-DD.csv`
   - [ ] Export as HTML: `seonaut-report-YYYY-MM-DD.html`

**Monthly Check:** Run full site crawl, fix high-priority issues
**Pre-Launch:** Run crawl before any major site updates

---

### 4. Lighthouse (Performance & SEO Audits)

**Purpose:** Audit page performance, accessibility, SEO, and best practices

**Installation:**

```bash
npm install -g lighthouse
```

**Setup Instructions:**

1. **Create Audit Directory:**
   ```bash
   mkdir -p /Users/baileybarry/PuxxIreland/audits
   cd /Users/baileybarry/PuxxIreland/audits
   ```

2. **Run Audits on Key Pages:**

   **Homepage:**
   ```bash
   lighthouse https://puxxnicotine.ie \
     --output=html \
     --output-path=./homepage-2025-12.html \
     --chrome-flags="--headless"
   ```

   **Shop Page:**
   ```bash
   lighthouse https://puxxnicotine.ie/shop \
     --output=html \
     --output-path=./shop-2025-12.html
   ```

   **Product Page:**
   ```bash
   lighthouse https://puxxnicotine.ie/products/cool-mint \
     --output=html \
     --output-path=./product-cool-mint-2025-12.html
   ```

3. **Review Scores:**
   - [ ] **Performance:** Target 90+ (speed, load time)
   - [ ] **Accessibility:** Target 95+ (screen readers, contrast, alt text)
   - [ ] **Best Practices:** Target 90+ (HTTPS, console errors, security)
   - [ ] **SEO:** Target 95+ (meta tags, crawlability, mobile-friendly)

4. **Review Recommendations:**
   - [ ] Note all "Opportunities" (performance improvements)
   - [ ] Note all "Diagnostics" (potential issues)
   - [ ] Prioritize fixes by potential impact

5. **Track Progress:**
   - [ ] Create spreadsheet: `lighthouse-scores.csv`
   - [ ] Record monthly scores:

   | Date | Page | Performance | Accessibility | Best Practices | SEO |
   |------|------|-------------|---------------|----------------|-----|
   | 2025-12 | Homepage | 92 | 96 | 92 | 98 |
   | 2025-12 | Shop | 88 | 95 | 90 | 97 |

**Monthly Check:** Run audits on 5-7 key pages, track score trends

---

### 5. Google Analytics 4

**Purpose:** Track website traffic, user behavior, and conversions

**Setup Instructions:**

1. **Create GA4 Property:**
   - [ ] Go to [analytics.google.com](https://analytics.google.com)
   - [ ] Click "Admin"
   - [ ] Click "Create Property"
   - [ ] Enter property name: "PUXX Ireland"
   - [ ] Set time zone: **Ireland (GMT)**
   - [ ] Set currency: **EUR**

2. **Add Data Stream:**
   - [ ] Click "Data Streams"
   - [ ] Click "Add Stream" → "Web"
   - [ ] Enter URL: `https://puxxnicotine.ie`
   - [ ] Enable enhanced measurement:
     - Page views
     - Scrolls
     - Outbound clicks
     - Site search
     - Video engagement
     - File downloads

3. **Install Tracking Code:**
   - [ ] Copy GA4 measurement ID (format: `G-XXXXXXXXXX`)
   - [ ] Add to Next.js app:

   ```tsx
   // app/layout.tsx
   import Script from 'next/script'

   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     `}
   </Script>
   ```

4. **Set Up Key Events (Conversions):**
   - [ ] **Add to Cart** - Track when user adds product
   - [ ] **Begin Checkout** - Track checkout initiation
   - [ ] **Purchase** - Track completed orders (most important!)
   - [ ] **Newsletter Signup** - Track email captures
   - [ ] **Product View** - Track product page views

5. **Configure Filters:**
   - [ ] Exclude internal traffic (your IP address)
   - [ ] Exclude developer traffic (test transactions)

6. **Link to Google Search Console:**
   - [ ] In GA4, go to Admin → Product Links → Search Console Links
   - [ ] Link accounts to see search query data in GA4

**Daily Check:** Organic traffic overview
**Weekly Check:** Top landing pages, traffic sources
**Monthly Check:** Conversion funnel, goal completions

---

### 6. Google Business Profile

**Purpose:** Manage local SEO presence, reviews, and local search rankings

**Setup Instructions:**

1. **Create Profile:**
   - [ ] Go to [google.com/business](https://www.google.com/business)
   - [ ] Click "Manage Now"
   - [ ] Enter business name: "PUXX Ireland"
   - [ ] Select category: "Health and Beauty Shop" (or "Tobacco Shop")
   - [ ] Select "Yes" for customer location (if you deliver)
   - [ ] Enter service areas: **All of Ireland** (or specific counties)

2. **Complete Profile:**
   - [ ] Add business description (750 characters max):
     ```
     PUXX Ireland is Ireland's premier destination for premium tobacco-free nicotine pouches. We offer 14 delicious flavors in 6mg, 16mg, and 22mg strengths. All products are tobacco-free, discreet, and convenient. Free delivery on orders over €150. 18+ only. Shop online at puxxnicotine.ie for fast, reliable delivery across Ireland.
     ```
   - [ ] Add phone number: `+353 X XXX XXXX`
   - [ ] Add website: `https://puxxnicotine.ie`
   - [ ] Set business hours: 24/7 (online store)
   - [ ] Add attributes:
     - Online orders available
     - Delivery available

3. **Add Photos:**
   - [ ] Upload 10+ high-quality photos:
     - Logo (1200x1200px)
     - Cover photo (1024x576px)
     - 14 product images (all flavors)
     - Packaging photos
     - Lifestyle photos (people using products)

4. **Add Products:**
   - [ ] If Google Merchant Center integration available:
     - Add all 14 products with prices
     - Include product descriptions
     - Link to product pages

5. **Seed Q&A:**
   - [ ] Post common questions and answers:
     - "Do you deliver to all of Ireland?" - Yes, we deliver nationwide.
     - "What nicotine strengths do you offer?" - 6mg, 16mg, and 22mg.
     - "Are nicotine pouches safe?" - [Link to blog post]
     - "How long does delivery take?" - 2-5 business days.

6. **Enable Messaging (Optional):**
   - [ ] Turn on messaging
   - [ ] Set up auto-replies for common questions
   - [ ] Monitor messages daily

**Weekly Check:** Post updates, respond to reviews
**Monthly Check:** Review insights, add new photos

---

## Keywords to Track

### Primary Keywords (Daily Tracking)

Track these in SERPBear with **daily updates**. These are your money keywords.

| Keyword | Monthly Volume | Difficulty | Current Rank | Target Rank | Notes |
|---------|----------------|------------|--------------|-------------|-------|
| nicotine pouches Ireland | 1,200 | Medium | TBD | #1 | Top priority |
| tobacco free pouches Ireland | 480 | Low | TBD | #1-3 | High intent |
| nicotine pouches buy Ireland | 390 | Low | TBD | #1-3 | Transactional |
| best nicotine pouches Ireland | 320 | Medium | TBD | #1-5 | Commercial |
| buy nicotine pouches online Ireland | 210 | Low | TBD | #1-5 | Transactional |
| nicotine pouches delivery Ireland | 170 | Low | TBD | #1-5 | Commercial |
| PUXX Ireland | 140 | Low | TBD | #1 | Branded |

**Target:** All primary keywords in top 3 by Month 6

---

### Secondary Keywords (Weekly Tracking)

Track these in SERPBear with **weekly updates**.

**Flavor-Specific Keywords:**
- cool mint nicotine pouches Ireland
- watermelon nicotine pouches Ireland
- citrus nicotine pouches Ireland
- apple nicotine pouches Ireland
- cherry nicotine pouches Ireland
- cola nicotine pouches Ireland
- wintergreen nicotine pouches Ireland
- spearmint nicotine pouches Ireland
- berry nicotine pouches Ireland
- tropical nicotine pouches Ireland
- coffee nicotine pouches Ireland
- vanilla nicotine pouches Ireland
- cinnamon nicotine pouches Ireland
- mango nicotine pouches Ireland

**Local Keywords:**
- nicotine pouches Dublin
- nicotine pouches Cork
- nicotine pouches Galway
- nicotine pouches Limerick
- nicotine pouches Waterford

**Category Keywords:**
- nicotine pouch flavors
- nicotine pouch strength
- tobacco free alternatives
- PUXX nicotine pouches

**Target:** All secondary keywords in top 10 by Month 6

---

### Long-Tail Keywords (Monthly Tracking)

Track these in SERPBear with **monthly updates**.

**Informational:**
- what are nicotine pouches
- how to use nicotine pouches
- are nicotine pouches safe
- nicotine pouches vs snus
- nicotine pouches side effects
- how long do nicotine pouches last
- nicotine pouches for beginners
- are nicotine pouches legal in Ireland

**Commercial:**
- where to buy nicotine pouches Ireland
- best nicotine pouch flavors
- nicotine pouches online Ireland
- cheap nicotine pouches Ireland
- nicotine pouches free delivery Ireland

**Comparison:**
- nicotine pouches vs vaping
- nicotine pouches vs cigarettes
- snus vs nicotine pouches
- ZYN vs PUXX

**Target:** All long-tail keywords in top 10 by Month 3

---

## Target Metrics by Month

### Month 1 Targets

**Traffic & Engagement:**
- [ ] Organic traffic: **100+ visitors**
- [ ] Organic sessions: **120+**
- [ ] Average session duration: **1:30+**
- [ ] Bounce rate: **<70%**

**Technical SEO:**
- [ ] Lighthouse SEO score: **95+** (all pages)
- [ ] Lighthouse Performance score: **90+**
- [ ] Lighthouse Accessibility score: **95+**
- [ ] Indexed pages in GSC: **20+**
- [ ] Zero critical errors in GSC Coverage report

**Off-Page SEO:**
- [ ] Backlinks: **10+** (directories, GBP)
- [ ] Referring domains: **8+**
- [ ] Google Business Profile created and verified
- [ ] Social media profiles created (Instagram, Facebook, Twitter)

**Content:**
- [ ] Blog posts published: **4+** (1 per week)
- [ ] Total indexed pages: **25+** (products, blog, static pages)

**Rankings:**
- [ ] Keywords ranking (any position): **10+**
- [ ] Keywords in top 100: **5+**

---

### Month 3 Targets

**Traffic & Engagement:**
- [ ] Organic traffic: **1,000+ visitors/month**
- [ ] Organic sessions: **1,200+**
- [ ] Average session duration: **2:00+**
- [ ] Bounce rate: **<60%**
- [ ] Pages per session: **2.5+**

**Technical SEO:**
- [ ] Lighthouse SEO score: **98+** (all pages)
- [ ] Core Web Vitals: All pages "Good" (GSC)
- [ ] Indexed pages: **40+**
- [ ] Zero errors in GSC Coverage report
- [ ] Mobile usability: Zero issues

**Off-Page SEO:**
- [ ] Backlinks: **30+**
- [ ] Referring domains: **25+**
- [ ] Domain Authority: **15+** (check with free Moz tool)
- [ ] Google Business Profile reviews: **10+**
- [ ] Average GBP rating: **4.5+ stars**

**Content:**
- [ ] Blog posts published: **12+** (cumulative)
- [ ] Guest posts published: **3+**
- [ ] Linkable assets created: **1** (comprehensive guide)

**Rankings:**
- [ ] Keywords ranking (any position): **50+**
- [ ] Keywords in top 50: **20+**
- [ ] Keywords in top 10: **5+**
- [ ] At least 1 keyword in top 3

**Conversions:**
- [ ] Organic conversion rate: **1.5%+**
- [ ] Organic revenue: Track baseline

---

### Month 6 Targets (Success Criteria)

**Traffic & Engagement:**
- [ ] **Organic traffic: 5,000+ visitors/month**
- [ ] Organic sessions: **6,000+**
- [ ] Average session duration: **2:30+**
- [ ] Bounce rate: **<50%**
- [ ] Pages per session: **3.0+**

**Technical SEO:**
- [ ] Lighthouse SEO score: **100** (all pages)
- [ ] Lighthouse Performance score: **95+**
- [ ] Core Web Vitals: 100% pages "Good"
- [ ] Indexed pages: **60+**
- [ ] Zero errors, zero warnings in GSC

**Off-Page SEO:**
- [ ] **Backlinks: 100+**
- [ ] **Referring domains: 80+**
- [ ] **Domain Authority: 30+**
- [ ] Google Business Profile reviews: **50+**
- [ ] Average GBP rating: **4.7+ stars**

**Content:**
- [ ] Blog posts published: **24+** (cumulative)
- [ ] Guest posts published: **10+**
- [ ] Linkable assets: **3+**
- [ ] Total indexed pages: **80+**

**Rankings:**
- [ ] **Keywords ranking (any position): 200+**
- [ ] **Keywords in top 50: 80+**
- [ ] **Keywords in top 10: 30+**
- [ ] **Keywords #1-3: 5+** (including "nicotine pouches Ireland")
- [ ] **At least 1 featured snippet**

**Conversions:**
- [ ] **Organic conversion rate: 2.5%+**
- [ ] Organic revenue: **€10,000+/month** (estimated based on 5,000 visitors × 2.5% conversion × €80 AOV)

**Success Indicator:** #1-3 ranking for "nicotine pouches Ireland"

---

## Issue Response Checklist

### When Rankings Drop >5 Positions

**Immediate Actions (Within 24 Hours):**
- [ ] Check Google Search Console for manual actions/penalties
- [ ] Check Google Analytics for traffic drop confirmation
- [ ] Check if site is accessible (not down)
- [ ] Check if page is indexed in Google: `site:puxxnicotine.ie/page-url`
- [ ] Check for Google algorithm updates (search "Google algorithm update")
- [ ] Review recent changes to affected page (content, technical)

**Investigation (Within 48 Hours):**
- [ ] Run Lighthouse audit on affected page
- [ ] Check Core Web Vitals in GSC
- [ ] Review competitor pages (did they improve?)
- [ ] Check for new backlinks to competitor pages
- [ ] Analyze SERP features (featured snippets, People Also Ask)
- [ ] Review click-through rate in GSC (declining CTR?)

**Remediation (Within 1 Week):**
- [ ] Fix any technical issues found
- [ ] Improve content depth and quality
- [ ] Optimize meta description to improve CTR
- [ ] Add more internal links to affected page
- [ ] Build 3-5 new backlinks to page
- [ ] Update content with fresh information

---

### When Traffic Drops >20%

**Immediate Actions (Same Day):**
- [ ] Verify drop in Google Analytics (not just random variance)
- [ ] Check if drop is organic-only or all traffic
- [ ] Check if drop is site-wide or specific pages
- [ ] Check Google Search Console Performance report
- [ ] Check for site errors (500 errors, site down)
- [ ] Check robots.txt and meta robots (accidentally blocked?)

**Investigation:**
- [ ] Compare traffic by channel (organic, direct, referral, social)
- [ ] Identify pages with biggest traffic loss
- [ ] Check if pages are still indexed: `site:puxxnicotine.ie`
- [ ] Check for Google penalties (GSC Manual Actions)
- [ ] Check for algorithm updates
- [ ] Review seasonality (is this expected?)

**Remediation:**
- [ ] Fix technical issues immediately
- [ ] Improve affected pages
- [ ] Increase content publishing frequency
- [ ] Build more backlinks
- [ ] Promote content on social media

---

### When New GSC Errors Appear

**Priority Response Based on Error Type:**

**Critical Errors (Fix Within 24 Hours):**
- [ ] **Server error (5xx)** - Check hosting, fix server issues
- [ ] **Submitted URL blocked by robots.txt** - Update robots.txt
- [ ] **Submitted URL marked 'noindex'** - Remove noindex tag
- [ ] **Submitted URL not found (404)** - Fix broken URLs or 301 redirect

**High Priority (Fix Within 1 Week):**
- [ ] **Redirect error** - Fix redirect chains or loops
- [ ] **Soft 404** - Add real content or return proper 404
- [ ] **Duplicate content** - Canonicalize or consolidate
- [ ] **Crawl anomaly** - Investigate crawler access issues

**Medium Priority (Fix Within 1 Month):**
- [ ] **Crawled - currently not indexed** - Improve content quality
- [ ] **Page with redirect** - Verify redirect is intentional
- [ ] **Alternate page with proper canonical tag** - No action needed if correct

---

### When Core Web Vitals Fail

**If LCP (Largest Contentful Paint) > 2.5s:**
- [ ] Optimize hero images (WebP format, compression)
- [ ] Preload critical resources
- [ ] Use next/image with priority flag
- [ ] Remove render-blocking resources
- [ ] Enable CDN for assets
- [ ] Optimize server response time

**If FID (First Input Delay) > 100ms:**
- [ ] Reduce JavaScript execution time
- [ ] Code split large bundles
- [ ] Defer non-critical JavaScript
- [ ] Remove unused JavaScript
- [ ] Lazy load below-the-fold content

**If CLS (Cumulative Layout Shift) > 0.1:**
- [ ] Set explicit width/height on all images
- [ ] Reserve space for ads/embeds
- [ ] Avoid inserting content above existing content
- [ ] Use CSS aspect-ratio for responsive elements
- [ ] Preload fonts to avoid FOIT/FOUT

---

## Notes & Best Practices

### General SEO Principles
- **Quality over quantity** - 1 excellent backlink > 10 mediocre ones
- **User intent first** - Optimize for user needs, not just search engines
- **Consistency matters** - Weekly content publishing beats sporadic bursts
- **Mobile-first** - 70%+ of traffic is mobile; optimize for mobile first
- **E-A-T** - Expertise, Authoritativeness, Trustworthiness matter for rankings
- **Local SEO** - Google Business Profile is critical for local visibility

### Content Guidelines
- **Minimum 800 words** for blog posts
- **Original content only** - No duplicate or thin content
- **Update old content** regularly (refresh dates, add info)
- **Internal linking** - Link to 3-5 relevant pages per post
- **External links** - Link to 2-3 authoritative sources
- **Alt text** on all images (descriptive, include keywords naturally)
- **Meta descriptions** - 150-160 characters, compelling, keyword-rich

### Link Building Best Practices
- **Prioritize relevance** over domain authority
- **Avoid black-hat tactics** (PBNs, link farms, paid links)
- **Guest post on quality sites** only (DA 20+, relevant audience)
- **Build relationships** with Irish bloggers and journalists
- **Create shareable assets** (infographics, research, guides)
- **Leverage PR** for high-authority backlinks

### Technical SEO Best Practices
- **HTTPS everywhere** - Use SSL/TLS for all pages
- **Mobile responsive** - Test on real devices
- **Fast loading** - Aim for <2s load time
- **Clean URLs** - Descriptive, keyword-rich, no parameters
- **Structured data** - Schema markup on all key pages
- **XML sitemap** - Auto-generated, up-to-date, submitted to GSC

### Tools Maintenance
- **SERPBear** - Update weekly, export data monthly
- **Seonaut** - Run monthly crawls, fix issues immediately
- **Lighthouse** - Audit monthly, track score trends
- **Google Search Console** - Check weekly for errors
- **Google Analytics** - Review daily traffic, weekly trends

---

## Appendix: Quick Reference

### Key URLs
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Google Business Profile: https://www.google.com/business
- Lighthouse: `npm install -g lighthouse`
- SERPBear: `/Users/baileybarry/Resources/repos/seo/serpbear`
- Seonaut: `/Users/baileybarry/Resources/repos/seo/seonaut`

### Key Metrics to Track
- Organic traffic (GA4)
- Keyword rankings (SERPBear)
- Backlinks (GSC)
- Domain Authority (Moz free tool)
- Lighthouse scores (monthly audits)
- Conversion rate (GA4)
- Google Business Profile reviews

### Support Resources
- SEO Plan: `/Users/baileybarry/PuxxIreland/docs/planning/PUXX-Ireland-SEO-Plan.md`
- Content Calendar: Create from SEO Plan (Month 1-6)
- Rank Tracking Sheet: Create in Google Sheets
- Lighthouse Score Tracker: Create in Google Sheets

### Quick Commands

**Run Lighthouse Audit:**
```bash
cd /Users/baileybarry/PuxxIreland
lighthouse https://puxxnicotine.ie --output=html --output-path=./audits/audit-$(date +%Y%m%d).html
```

**Start SERPBear:**
```bash
cd /Users/baileybarry/Resources/repos/seo/serpbear
npm run dev
# Access at http://localhost:3000
```

**Start Seonaut:**
```bash
cd /Users/baileybarry/Resources/repos/seo/seonaut
# Follow Seonaut instructions in README
```

---

**Last Updated:** December 2025
**Next Review:** Monthly (1st of each month)
**Owner:** PUXX Ireland Marketing Team
**Questions:** Refer to `/Users/baileybarry/PuxxIreland/docs/planning/PUXX-Ireland-SEO-Plan.md`
