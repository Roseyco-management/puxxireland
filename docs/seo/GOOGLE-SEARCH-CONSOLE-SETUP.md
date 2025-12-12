# Google Search Console Setup Guide

**Project:** PUXX Ireland
**Tool:** Google Search Console (GSC)
**Purpose:** Monitor search performance, indexing, and technical SEO health
**Last Updated:** December 2025

---

## Overview

Google Search Console is the most important free SEO tool. It shows exactly how Google sees your website, what keywords you rank for, and what technical issues exist.

**What Google Search Console Does:**
- Shows actual Google search rankings and clicks
- Monitors site indexing status (which pages Google knows about)
- Identifies technical SEO issues (errors, warnings)
- Tracks backlinks to your site
- Measures Core Web Vitals (performance)
- Provides mobile usability insights
- Allows sitemap submission

**Cost:** 100% Free (official Google tool)

---

## Initial Setup

### Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console
2. Sign in with Google account
   - Use business email if available
   - Or personal Gmail account
3. Click "Add Property"

---

### Step 2: Add PUXX Ireland Property

You'll have two options:

#### Option A: Domain Property (Recommended)

**Covers all subdomains and protocols (http, https, www)**

1. Select "Domain" tab
2. Enter: `puxxireland.ie`
3. Click "Continue"

**Verification Method:** DNS verification

4. Copy the TXT record provided by Google
5. Log into your domain registrar (where you bought puxxireland.ie)
6. Add DNS TXT record:
   - Name: `@` or leave blank
   - Type: `TXT`
   - Value: `google-site-verification=xxxxxxxxxxxxxx` (paste from Google)
   - TTL: `3600` or default
7. Save DNS record
8. Wait 5-15 minutes for DNS propagation
9. Return to Google Search Console and click "Verify"

**Pros:**
- ✅ Covers all URLs (https://puxxireland.ie, https://www.puxxireland.ie, etc.)
- ✅ No need to add verification file to website
- ✅ Recommended for most sites

**Cons:**
- ⚠️ Requires DNS access
- ⚠️ Slightly more technical

---

#### Option B: URL Prefix Property (Alternative)

**Covers specific URL only**

1. Select "URL prefix" tab
2. Enter: `https://puxxireland.ie`
3. Click "Continue"

**Verification Methods (choose one):**

**Method 1: HTML File Upload**
1. Download verification file (e.g., `google1234567890abcdef.html`)
2. Upload to website root:
   ```bash
   # Place in /public folder for Next.js
   /Users/baileybarry/PuxxIreland/public/google1234567890abcdef.html
   ```
3. Verify file is accessible:
   ```
   https://puxxireland.ie/google1234567890abcdef.html
   ```
4. Click "Verify" in Google Search Console

**Method 2: HTML Meta Tag**
1. Copy meta tag from Google:
   ```html
   <meta name="google-site-verification" content="xxxxxxxxxxxxxx" />
   ```
2. Add to website `<head>` section:
   ```tsx
   // app/layout.tsx
   export const metadata = {
     verification: {
       google: 'xxxxxxxxxxxxxx', // Paste verification code here
     },
   }
   ```
3. Deploy changes
4. Click "Verify" in Google Search Console

**Method 3: Google Analytics**
1. If Google Analytics is already installed
2. Use same Google account
3. Google will automatically verify via GA code

**Pros:**
- ✅ No DNS access needed
- ✅ Easy HTML file upload

**Cons:**
- ⚠️ Only covers one specific URL
- ⚠️ May need to add www. separately

---

### Step 3: Verify Ownership

After adding DNS record or verification file:

1. Click "Verify" in Google Search Console
2. If successful: "Ownership verified" ✅
3. If failed: Check DNS propagation or file accessibility

**Troubleshooting:**
- DNS not propagated yet → Wait 30 minutes and try again
- Verification file not found → Check file path and URL accessibility
- Meta tag not found → Verify code is in `<head>` and deployed

---

## Post-Setup Configuration

### Step 4: Submit Sitemap

**What is a sitemap?**
A file that lists all pages on your website, helping Google discover and index them faster.

**Location:**
- Sitemap URL: `https://puxxireland.ie/sitemap.xml`
- Generated automatically by `next-sitemap` (see SEO Plan)

**How to Submit:**
1. In Google Search Console, go to "Sitemaps" (left sidebar)
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Status should show "Success" within minutes

**Additional sitemaps to submit:**
- `sitemap.xml` (main sitemap)
- `product-sitemap.xml` (if you create product-specific sitemap)

**Note:** If sitemaps don't exist yet, you need to:
1. Install and configure `next-sitemap` (see SEO Plan Phase 1)
2. Run build: `npm run build`
3. Verify sitemap exists: `https://puxxireland.ie/sitemap.xml`
4. Then submit to GSC

---

### Step 5: Set Preferred Domain (Optional)

If you have both `www` and non-www versions:

**Recommended:** Use `https://puxxireland.ie` (non-www)

**How to set:**
1. Ensure both versions redirect to preferred version
2. Use canonical tags to specify preferred URL:
   ```tsx
   // In next-seo config
   canonical: 'https://puxxireland.ie'
   ```

---

### Step 6: Set Target Country

Tell Google your site targets Ireland:

1. Go to "Settings" (left sidebar, bottom)
2. Scroll to "International Targeting"
3. Click "Country" tab
4. Select "Ireland" from dropdown
5. Save

**This helps Google show your site to Irish users in search results.**

---

### Step 7: Configure Users and Permissions

Add team members if needed:

1. Go to "Settings" → "Users and permissions"
2. Click "Add user"
3. Enter email address
4. Choose permission level:
   - **Owner:** Full control (only for trusted users)
   - **Full:** Can see all data and take actions
   - **Restricted:** Can see most data, limited actions

**Recommended:**
- Owner: You (business owner)
- Full: SEO manager, developer
- Restricted: Marketing team, analytics viewers

---

## Understanding Google Search Console Reports

### 1. Overview Dashboard

**Path:** Google Search Console → Overview

**What You See:**
- Total clicks (last 3 months)
- Total impressions
- Average CTR
- Average position
- Quick links to Performance, Coverage, Enhancements

**Use Case:** Quick health check of SEO performance

---

### 2. Performance Report (Most Important)

**Path:** Google Search Console → Performance

**What You See:**

| Metric | Definition | Target |
|--------|------------|--------|
| **Clicks** | Total clicks from Google Search to your site | Increasing trend |
| **Impressions** | How many times your site appeared in search results | Growing |
| **CTR** | Click-through rate (Clicks / Impressions × 100) | 3%+ average |
| **Position** | Average ranking position for your keywords | Decreasing (lower = better) |

**Tabs to Explore:**

**Queries (Keywords):**
- Shows all keywords your site ranks for
- See clicks, impressions, CTR, position for each keyword
- **Use for:** Keyword research, finding opportunities

**Pages:**
- Shows all pages that get traffic from Google
- See which pages perform best
- **Use for:** Identifying top content, finding underperformers

**Countries:**
- Geographic breakdown of traffic
- Should be mostly Ireland for PUXX Ireland
- **Use for:** Verifying local SEO targeting

**Devices:**
- Desktop vs. Mobile vs. Tablet
- **Use for:** Mobile optimization priorities

**Date Range:**
- Default: Last 3 months
- Compare: Last 3 months vs. previous 3 months
- **Use for:** Tracking growth trends

---

### 3. Coverage Report (Indexing)

**Path:** Google Search Console → Coverage

**What You See:**

| Status | Meaning | Action |
|--------|---------|--------|
| **Valid** | Pages successfully indexed by Google | ✅ Good |
| **Valid with warnings** | Indexed but has minor issues | ⚠️ Review |
| **Error** | Not indexed due to errors | 🔴 Fix immediately |
| **Excluded** | Intentionally not indexed | ℹ️ Verify intentional |

**Common Errors to Fix:**
- **404 Not Found:** Broken links → Fix or redirect
- **Soft 404:** Page appears empty → Add content
- **Server error (5xx):** Website issue → Fix server
- **Redirect error:** Redirect chains → Simplify redirects
- **Blocked by robots.txt:** Unintentionally blocked → Update robots.txt

**Common Exclusions (Usually OK):**
- Duplicate page
- Crawled - currently not indexed (low priority page)
- Excluded by 'noindex' tag (intentional)
- Page removed (intentional)

**Goal:** All important pages should show as "Valid"

---

### 4. Sitemaps Report

**Path:** Google Search Console → Sitemaps

**What You See:**
- List of submitted sitemaps
- Status (Success, Error)
- Discovered URLs (how many pages Google found in sitemap)

**Actions:**
- Submit new sitemaps
- Resubmit if status shows error
- Check for coverage (# discovered should match # of pages on site)

---

### 5. Core Web Vitals

**Path:** Google Search Console → Experience → Core Web Vitals

**What You See:**

Mobile and Desktop performance metrics:

| Metric | What It Measures | Target |
|--------|------------------|--------|
| **LCP** | Largest Contentful Paint (loading speed) | < 2.5s |
| **FID** | First Input Delay (interactivity) | < 100ms |
| **CLS** | Cumulative Layout Shift (visual stability) | < 0.1 |

**Status:**
- **Good:** Green ✅
- **Needs Improvement:** Orange ⚠️
- **Poor:** Red 🔴

**Goal:** All pages in "Good" status

**How to Fix:** See Lighthouse audits and SEO Plan Phase 3

---

### 6. Mobile Usability

**Path:** Google Search Console → Experience → Mobile Usability

**What You See:**
- Errors affecting mobile users
- Common issues:
  - Text too small to read
  - Clickable elements too close together
  - Content wider than screen
  - Viewport not set

**Goal:** Zero errors

**How to Fix:** Ensure responsive design, use viewport meta tag

---

### 7. Links Report

**Path:** Google Search Console → Links

**What You See:**

**External Links:**
- Total backlinks to your site
- Top linking sites (which domains link to you)
- Top linked pages (which of your pages get most backlinks)

**Internal Links:**
- How your pages link to each other
- Most linked pages (important for SEO structure)

**Use Case:**
- Track backlink growth (Month 1: 10+ → Month 6: 100+)
- Identify top linking domains
- Find pages that need more internal links

---

### 8. Manual Actions

**Path:** Google Search Console → Security & Manual Actions → Manual Actions

**What You See:**
- Penalties from Google (rare)
- Reasons: Spam, hacking, unnatural links, etc.

**Goal:** "No issues detected" ✅

**If you get a manual action:**
1. Read the issue description
2. Fix the problem (remove spam, disavow bad links, etc.)
3. Submit reconsideration request

---

### 9. Security Issues

**Path:** Google Search Console → Security & Manual Actions → Security Issues

**What You See:**
- Hacking attempts
- Malware detected
- Phishing warnings

**Goal:** "No issues detected" ✅

**If you get a security issue:**
1. Fix immediately (clean up hacked content)
2. Update passwords and secure server
3. Request review from Google

---

## Weekly GSC Checklist

Use this checklist as part of your weekly SEO monitoring:

### Quick Health Check (5 minutes)
- [ ] **Performance Report:**
  - Total clicks this week vs. last week (increasing?)
  - Average position for "nicotine pouches Ireland" (improving?)
  - Any major drops in clicks? (investigate if >20% drop)

- [ ] **Coverage Report:**
  - Any new errors? (fix within 24 hours)
  - Total valid pages increasing? (as you add content)

- [ ] **Core Web Vitals:**
  - Status: Good, Needs Improvement, or Poor?
  - Any new poor URLs? (fix this week)

### Review Top Queries (10 minutes)
- [ ] **Go to Performance → Queries**
- [ ] **Sort by clicks** (descending)
  - What keywords are driving traffic?
  - Are they relevant? (should be nicotine pouch-related)

- [ ] **Sort by impressions** (descending)
  - What keywords show up a lot but get few clicks?
  - Low CTR opportunities (improve meta titles/descriptions)

- [ ] **Filter: Position 11-20** (page 2)
  - Keywords close to page 1
  - Optimize these pages to push to page 1

### Identify Opportunities (10 minutes)
- [ ] **Find high-impression, low-click keywords**
  - Filter: Impressions > 100, CTR < 2%
  - Rewrite meta descriptions to be more compelling
  - Add power words: "Best", "Free Delivery", "2025 Guide"

- [ ] **Find high-position keywords not ranking well**
  - Filter: Position > 10, Impressions > 50
  - These are opportunities to optimize and improve

---

## Monthly GSC Deep Dive

### Export Data for Records
- [ ] **Go to Performance Report**
- [ ] **Set date range:** Last 28 days
- [ ] **Export:**
  - Queries (all keywords)
  - Pages (all URLs)
- [ ] **Save to:** `/docs/seo/gsc-data/month-X-queries.csv`

### Compare Month-Over-Month
- [ ] **Date range:** Last 28 days vs. previous 28 days
- [ ] **Compare:**
  - Total clicks: +/- %?
  - Total impressions: +/- %?
  - Average CTR: +/- %?
  - Average position: Improving?

- [ ] **Document trends:**
  - Growth rate per month
  - Top movers (keywords that jumped in rankings)
  - Declining keywords (need attention)

### Page-by-Page Analysis
- [ ] **Go to Performance → Pages**
- [ ] **Identify:**
  - **Top performers:** High clicks, good CTR, low bounce rate
  - **Underperformers:** High impressions, low clicks (optimize meta tags)
  - **No traffic pages:** Not ranking at all (need better optimization or backlinks)

### Link Analysis
- [ ] **Go to Links → External Links**
- [ ] **Check:**
  - Total backlinks: Increasing?
  - New linking domains this month?
  - Quality of new backlinks (DA 40+?)

- [ ] **Export top linking sites**
  - Keep record of all backlinks
  - Monitor for lost links (reach out to reclaim)

---

## Quarterly GSC Audit

### Coverage Audit
- [ ] **Go to Coverage Report**
- [ ] **Review all errors:**
  - Fix or document reason (e.g., intentionally excluded)
- [ ] **Review excluded pages:**
  - Should they be indexed?
  - If yes, fix issue (add content, remove noindex tag)

### Performance Trends
- [ ] **Set date range:** Last 6 months
- [ ] **Analyze:**
  - Overall traffic trend (growing?)
  - Seasonal patterns (holidays, peak shopping times)
  - Algorithm update impacts (did rankings drop suddenly?)

### Search Appearance
- [ ] **Check for rich results:**
  - Product schema showing?
  - FAQ schema showing?
  - Breadcrumbs showing?
- [ ] **Test URLs with Rich Results Test:**
  - https://search.google.com/test/rich-results

---

## Common GSC Issues and Fixes

### Issue 1: Pages Not Indexed

**Symptoms:**
- Pages submitted in sitemap but not showing as "Valid"
- Coverage report shows "Discovered - currently not indexed"

**Causes:**
- Low-quality content (thin content, duplicate)
- Poor internal linking (page is orphaned)
- Robots.txt blocking
- Noindex tag on page

**Fixes:**
1. Add more unique content (300+ words minimum)
2. Add internal links from homepage or main pages
3. Check robots.txt isn't blocking page
4. Remove noindex tag if unintentional
5. Request indexing via "URL Inspection" tool

---

### Issue 2: Low CTR Despite High Impressions

**Symptoms:**
- Keywords showing thousands of impressions
- But very few clicks (CTR < 2%)

**Cause:**
- Boring or irrelevant meta titles/descriptions
- Not compelling enough to click

**Fixes:**
1. Rewrite meta title to be more compelling:
   - ❌ "Nicotine Pouches | PUXX Ireland"
   - ✅ "Buy Premium Nicotine Pouches Ireland | 14 Flavors | Free Delivery"

2. Improve meta description:
   - ❌ "We sell nicotine pouches in Ireland."
   - ✅ "Shop Ireland's best nicotine pouches. 14 delicious flavors, 6mg-22mg strengths. Free delivery over €150. Order today!"

3. Add power words: Best, Premium, Free, New, Guide, 2025
4. Include numbers: 14 flavors, €150, 22mg, etc.
5. Include CTA: Shop now, Buy today, Learn more

---

### Issue 3: Declining Rankings

**Symptoms:**
- Keywords that ranked well are dropping
- Average position increasing (getting worse)

**Causes:**
- Competitors improving their SEO
- Google algorithm update
- Technical issues (site speed, broken links)
- Lost backlinks

**Fixes:**
1. Check for Google algorithm updates (Google Search News)
2. Analyze competitors (what did they change?)
3. Run technical audit (Lighthouse, Seonaut)
4. Check backlinks (any lost? reclaim them)
5. Update and improve content (freshen dates, add more info)

---

### Issue 4: Mobile Usability Errors

**Symptoms:**
- Errors in Mobile Usability report
- Poor mobile rankings despite good desktop

**Cause:**
- Not mobile-responsive
- Viewport not set
- Touch elements too small

**Fixes:**
1. Ensure responsive design (use Tailwind responsive classes)
2. Add viewport meta tag (should be in `<head>`):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```
3. Increase button/link sizes (44px × 44px minimum touch target)
4. Test on real mobile devices

---

### Issue 5: Soft 404 Errors

**Symptoms:**
- Coverage report shows "Soft 404" errors
- Page exists but Google thinks it's empty

**Cause:**
- Page has very little content
- Mostly boilerplate text
- Looks like an error page to Google

**Fixes:**
1. Add more unique content (300+ words)
2. Ensure page has clear headings and structure
3. Return proper 200 status code
4. If page should be a 404, return proper 404 status

---

## URL Inspection Tool

**Most Powerful GSC Feature for Troubleshooting**

**How to Use:**
1. Copy any URL from your site
2. Paste into search bar at top of GSC
3. Click "Enter"

**What You See:**
- Indexing status (indexed or not)
- Coverage status (valid, error, excluded)
- Sitemaps that reference this URL
- Last crawl date
- Crawl allowed? (robots.txt check)
- Indexing allowed? (noindex check)
- Canonical URL (what Google thinks is the main version)

**Actions:**
- **Request Indexing:** Force Google to recrawl this page (use after fixing issues)
- **View Crawled Page:** See exactly what Googlebot saw
- **Test Live URL:** See current state vs. indexed state

**Use Cases:**
- New page not indexed yet → Request indexing
- Updated page content → Request indexing to refresh
- Fixing errors → Test live URL to verify fix

---

## Data Export and Reporting

### Export Performance Data

1. **Go to:** Performance Report
2. **Set filters:**
   - Date range: Last 28 days
   - Country: Ireland (for local data)
3. **Click:** Export button (top right)
4. **Choose format:** Google Sheets or CSV
5. **Save to:** `/docs/seo/gsc-data/`

### Create Monthly Report

**Metrics to Include:**
- Total clicks (vs. last month)
- Total impressions (vs. last month)
- Average CTR (vs. last month)
- Average position (vs. last month)
- Top 10 queries by clicks
- Top 10 pages by clicks
- New backlinks count
- Total indexed pages
- Coverage errors (count)

**Template:**

```
PUXX Ireland - Google Search Console Report
Month: January 2025
Report Date: February 1, 2025

OVERVIEW
- Total Clicks: 1,234 (+23% vs. Dec)
- Total Impressions: 45,678 (+35% vs. Dec)
- Average CTR: 2.7% (-0.2% vs. Dec)
- Average Position: 28.5 (-3.2 vs. Dec) [Lower is better]

TOP KEYWORDS
1. nicotine pouches Ireland - 234 clicks, Position 12
2. best nicotine pouches - 123 clicks, Position 8
3. PUXX nicotine pouches - 98 clicks, Position 2
... [Top 10]

TOP PAGES
1. /shop - 456 clicks, CTR 3.2%
2. / (homepage) - 345 clicks, CTR 2.8%
3. /shop/cool-mint - 123 clicks, CTR 4.1%
... [Top 10]

TECHNICAL HEALTH
- Indexed Pages: 47 (+3 vs. Dec)
- Coverage Errors: 2 (down from 5)
- Mobile Usability Errors: 0
- Core Web Vitals: 98% Good URLs

BACKLINKS
- Total External Links: 42 (+8 vs. Dec)
- Linking Domains: 28 (+5 vs. Dec)

ACTIONS NEEDED
- Fix 2 coverage errors (404 pages)
- Improve CTR for "nicotine pouches buy Ireland" (rewrite meta desc)
- Request indexing for 3 new blog posts
```

---

## GSC Best Practices

### Do's
- ✅ Check GSC weekly (minimum)
- ✅ Fix errors immediately (within 24-48 hours)
- ✅ Submit sitemaps for all important content
- ✅ Use URL Inspection tool to diagnose issues
- ✅ Export data monthly for records
- ✅ Monitor Core Web Vitals and fix poor URLs
- ✅ Track backlinks and disavow spam if needed

### Don'ts
- ❌ Ignore coverage errors (fix them!)
- ❌ Request indexing too often (once per URL is enough)
- ❌ Panic over small ranking fluctuations (normal)
- ❌ Ignore mobile usability issues
- ❌ Submit sitemaps with errors (test first)

---

## Integration with Other SEO Tools

### Google Search Console + SERPBear
- **GSC:** Shows actual clicks and impressions from Google
- **SERPBear:** Tracks daily ranking positions
- **Use together:** GSC for traffic data, SERPBear for rank trends

### Google Search Console + Google Analytics
- **GSC:** Shows search performance (before click)
- **GA4:** Shows on-site behavior (after click)
- **Use together:** Full funnel from search → click → conversion

### Google Search Console + Lighthouse
- **GSC:** Shows Core Web Vitals in production (real user data)
- **Lighthouse:** Shows performance in lab tests
- **Use together:** Lighthouse to diagnose, GSC to verify real-world impact

---

## Troubleshooting: Property Not Showing Data

**Issue:** You verified the property, but no data appears.

**Reason:** Google Search Console data takes time to populate.

**Timeline:**
- **Immediately:** Sitemap and URL Inspection work
- **1-2 days:** Coverage data starts appearing
- **2-7 days:** Performance data (clicks, impressions) appears
- **1-2 weeks:** Full historical data available

**Solution:** Be patient, data will come. Focus on submitting sitemaps and fixing any coverage errors in the meantime.

---

## Next Steps After GSC Setup

1. ✅ Verify ownership (DNS or HTML method)
2. ✅ Submit sitemap.xml
3. ✅ Set target country (Ireland)
4. ✅ Wait 2-7 days for data to populate
5. ✅ Review Coverage report (fix errors)
6. ✅ Review Performance report (baseline rankings)
7. ✅ Add to weekly SEO monitoring routine
8. ✅ Export data monthly for records

---

## Resources

- **Google Search Console:** https://search.google.com/search-console
- **GSC Help Center:** https://support.google.com/webmasters
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Sitemap Configuration:** See `/docs/planning/PUXX-Ireland-SEO-Plan.md` (Phase 1)
- **Weekly Checklist:** See `/docs/seo/SEO-MONITORING-CHECKLIST.md`

---

**Last Updated:** December 2025
**Maintained By:** SEO Team
**Questions?** Refer to SEO Plan or Google's official documentation
