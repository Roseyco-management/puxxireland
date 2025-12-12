# Rank Tracking Setup Guide

**Project:** PUXX Ireland
**Tool:** SERPBear (Self-Hosted Rank Tracker)
**Purpose:** Track keyword rankings over time to measure SEO progress
**Last Updated:** December 2025

---

## Overview

This guide covers how to set up and use SERPBear for tracking PUXX Ireland's keyword rankings. SERPBear is a free, self-hosted rank tracking tool that monitors your Google rankings daily.

**Why SERPBear?**
- Free and open-source
- Self-hosted (privacy and control)
- Daily automatic rank checks
- Tracks unlimited keywords
- Historical data and charts
- No subscription fees

---

## SERPBear Installation

### Step 1: Navigate to SERPBear

```bash
cd /Users/baileybarry/Resources/repos/seo/serpbear
```

### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

### Step 3: Configure Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database (uses SQLite by default)
DATABASE_URL="file:./data/serpbear.db"

# Secret for encryption (generate a random string)
SECRET="your-secret-key-here-make-it-random"

# Optional: Google Search API (for more accurate results)
# GOOGLE_SEARCH_API_KEY="your-api-key"
# GOOGLE_SEARCH_ENGINE_ID="your-engine-id"
```

### Step 4: Initialize Database

```bash
npx prisma db push
```

### Step 5: Start SERPBear

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm run start
```

### Step 6: Access Dashboard

Open browser and navigate to:
```
http://localhost:3000
```

Create your admin account on first visit.

---

## Adding PUXX Ireland Domain

### Step 1: Add New Domain

1. Click "Add Domain" in SERPBear dashboard
2. Enter domain: `puxxireland.ie`
3. Click "Add Domain"

### Step 2: Configure Domain Settings

- **Domain Name:** PUXX Ireland
- **URL:** https://puxxireland.ie
- **Notification Email:** info@puxxireland.ie (optional)
- **Country:** Ireland (IE)
- **Device:** Desktop (can add mobile separately)

---

## Keywords to Track

### Primary Keywords (Daily Tracking - Priority 1)

These are your most important keywords. Track daily and monitor closely.

| Keyword | Monthly Volume (IE) | Current Rank | Target Rank (M6) | Priority |
|---------|---------------------|--------------|------------------|----------|
| nicotine pouches Ireland | 1,200 | TBD | #1-3 | 🔴 Critical |
| tobacco free pouches Ireland | 480 | TBD | #1-3 | 🔴 Critical |
| nicotine pouches buy Ireland | 390 | TBD | #1-3 | 🔴 Critical |
| best nicotine pouches Ireland | 320 | TBD | #1-5 | 🔴 Critical |
| buy nicotine pouches online Ireland | 210 | TBD | #1-5 | 🟡 High |

**How to Add in SERPBear:**
1. Select "PUXX Ireland" domain
2. Click "Add Keywords"
3. Enter each keyword (one per line)
4. Set tracking frequency: "Daily"
5. Click "Add Keywords"

---

### Secondary Keywords (Daily Tracking - Priority 2)

Important keywords for product pages and local SEO.

| Keyword | Monthly Volume (IE) | Target Page | Target Rank (M6) |
|---------|---------------------|-------------|------------------|
| PUXX nicotine pouches | 140 | Homepage | #1 |
| nicotine pouches delivery Ireland | 170 | Shop page | #1-5 |
| cool mint nicotine pouches Ireland | 260 | Product page | #1-10 |
| watermelon nicotine pouches Ireland | 210 | Product page | #1-10 |
| citrus nicotine pouches Ireland | 140 | Product page | #1-10 |
| nicotine pouches Dublin | 180 | Local page | #1-5 |
| nicotine pouches Cork | 90 | Local page | #1-5 |
| nicotine pouches Galway | 60 | Local page | #1-10 |
| nicotine pouch flavors | 320 | Blog post | #1-10 |
| nicotine pouch strength | 210 | Blog post | #1-10 |

**Total Secondary Keywords:** 10

---

### Flavor-Specific Keywords (Weekly Tracking - Priority 3)

Track weekly for all 14 product flavors:

| Keyword | Target Page |
|---------|-------------|
| cool mint nicotine pouches Ireland | /shop/cool-mint |
| watermelon nicotine pouches Ireland | /shop/watermelon |
| Arctic mint nicotine pouches Ireland | /shop/arctic-mint |
| citrus nicotine pouches Ireland | /shop/citrus |
| strawberry nicotine pouches Ireland | /shop/strawberry |
| berry blast nicotine pouches Ireland | /shop/berry-blast |
| tropical ice nicotine pouches Ireland | /shop/tropical-ice |
| pineapple nicotine pouches Ireland | /shop/pineapple |
| fresh mint nicotine pouches Ireland | /shop/fresh-mint |
| spearmint nicotine pouches Ireland | /shop/spearmint |
| wintergreen nicotine pouches Ireland | /shop/wintergreen |
| cola nicotine pouches Ireland | /shop/cola |
| cinnamon nicotine pouches Ireland | /shop/cinnamon |
| vanilla nicotine pouches Ireland | /shop/vanilla |

**How to Add in SERPBear:**
1. Select "PUXX Ireland" domain
2. Click "Add Keywords"
3. Paste all 14 keywords (one per line)
4. Set tracking frequency: "Weekly"
5. Tag as: "Products" or "Flavors"
6. Click "Add Keywords"

**Total Flavor Keywords:** 14

---

### Local SEO Keywords (Weekly Tracking - Priority 3)

Track for all major Irish cities:

| Keyword | Target Page | Monthly Volume (IE) |
|---------|-------------|---------------------|
| nicotine pouches Dublin | /nicotine-pouches-dublin | 180 |
| nicotine pouches Cork | /nicotine-pouches-cork | 90 |
| nicotine pouches Galway | /nicotine-pouches-galway | 60 |
| nicotine pouches Limerick | /nicotine-pouches-limerick | 40 |
| nicotine pouches Waterford | /nicotine-pouches-waterford | 30 |
| buy nicotine pouches Dublin | N/A | 70 |
| buy nicotine pouches Cork | N/A | 35 |

**Total Local Keywords:** 7

---

### Long-Tail Keywords (Monthly Tracking - Priority 4)

Informational keywords for blog content:

| Keyword | Monthly Volume | Target Page | Target Rank (M6) |
|---------|----------------|-------------|------------------|
| where to buy nicotine pouches Ireland | 110 | Blog post | #1-5 |
| are nicotine pouches legal in Ireland | 90 | FAQ/Blog | #1-5 |
| nicotine pouches vs snus | 320 | Blog post | #1-10 |
| how to use nicotine pouches | 720 | Blog post | #1-10 |
| are nicotine pouches safe | 1,900 | Blog post | #1-20 |
| best nicotine pouch flavors | 210 | Blog post | #1-10 |
| nicotine pouches side effects | 390 | Blog post | #1-20 |
| what are nicotine pouches | 12,100 | Blog post | #1-30 |
| nicotine pouches explained | 480 | Blog post | #1-20 |
| how long do nicotine pouches last | 720 | Blog post | #1-10 |
| nicotine pouches for beginners | 210 | Blog post | #1-10 |
| tobacco alternatives Ireland | 260 | Blog post | #1-10 |

**How to Add in SERPBear:**
1. Select "PUXX Ireland" domain
2. Click "Add Keywords"
3. Paste all long-tail keywords
4. Set tracking frequency: "Monthly"
5. Tag as: "Informational" or "Blog"
6. Click "Add Keywords"

**Total Long-Tail Keywords:** 12

---

## Complete Keyword List Summary

### By Priority

| Priority | Type | Count | Tracking Frequency |
|----------|------|-------|-------------------|
| 🔴 Priority 1 | Primary Keywords | 5 | Daily |
| 🟡 Priority 2 | Secondary Keywords | 10 | Daily |
| 🟢 Priority 3 | Flavor Keywords | 14 | Weekly |
| 🟢 Priority 3 | Local Keywords | 7 | Weekly |
| 🔵 Priority 4 | Long-Tail Keywords | 12 | Monthly |
| **TOTAL** | **All Keywords** | **48** | **Mixed** |

### Quick Add List (Copy-Paste Format)

**Primary Keywords (Daily):**
```
nicotine pouches Ireland
tobacco free pouches Ireland
nicotine pouches buy Ireland
best nicotine pouches Ireland
buy nicotine pouches online Ireland
```

**Secondary Keywords (Daily):**
```
PUXX nicotine pouches
nicotine pouches delivery Ireland
cool mint nicotine pouches Ireland
watermelon nicotine pouches Ireland
citrus nicotine pouches Ireland
nicotine pouches Dublin
nicotine pouches Cork
nicotine pouches Galway
nicotine pouch flavors
nicotine pouch strength
```

**Flavor Keywords (Weekly):**
```
cool mint nicotine pouches Ireland
watermelon nicotine pouches Ireland
Arctic mint nicotine pouches Ireland
citrus nicotine pouches Ireland
strawberry nicotine pouches Ireland
berry blast nicotine pouches Ireland
tropical ice nicotine pouches Ireland
pineapple nicotine pouches Ireland
fresh mint nicotine pouches Ireland
spearmint nicotine pouches Ireland
wintergreen nicotine pouches Ireland
cola nicotine pouches Ireland
cinnamon nicotine pouches Ireland
vanilla nicotine pouches Ireland
```

**Local Keywords (Weekly):**
```
nicotine pouches Dublin
nicotine pouches Cork
nicotine pouches Galway
nicotine pouches Limerick
nicotine pouches Waterford
buy nicotine pouches Dublin
buy nicotine pouches Cork
```

**Long-Tail Keywords (Monthly):**
```
where to buy nicotine pouches Ireland
are nicotine pouches legal in Ireland
nicotine pouches vs snus
how to use nicotine pouches
are nicotine pouches safe
best nicotine pouch flavors
nicotine pouches side effects
what are nicotine pouches
nicotine pouches explained
how long do nicotine pouches last
nicotine pouches for beginners
tobacco alternatives Ireland
```

---

## Target Rankings by Month

### Month 1 (Baseline)

**Goal:** Establish baseline rankings

- Record initial rankings for all keywords
- Most keywords may not rank yet (100+)
- Some brand keywords (PUXX nicotine pouches) should appear
- Focus: Get all pages indexed

**Expected Baseline:**
- Primary keywords: Position 50-100+ (not ranking yet)
- Long-tail keywords: Position 30-100 (easier to rank)
- Brand keywords: Position 1-20

---

### Month 3 (Early Progress)

**Goal:** Start gaining traction

| Keyword Type | Target Position | Success Criteria |
|--------------|----------------|------------------|
| **Primary Keywords** | 20-50 | Appearing on pages 2-5 |
| **Secondary Keywords** | 10-30 | Some first page rankings |
| **Long-Tail Keywords** | 1-20 | Multiple first page rankings |
| **Flavor Keywords** | 20-50 | Product pages gaining visibility |
| **Local Keywords** | 10-30 | Competing with local results |

**Month 3 Specific Targets:**
- "nicotine pouches Ireland" → Position 20-40
- "tobacco free pouches Ireland" → Position 15-35
- "where to buy nicotine pouches Ireland" → Position 5-15
- "PUXX nicotine pouches" → Position 1-3
- At least 5 keywords in top 10

---

### Month 6 (Primary Goals)

**Goal:** Achieve #1-3 rankings for primary keywords

| Keyword | Month 1 Baseline | Month 3 Target | Month 6 Target | Success = |
|---------|------------------|----------------|----------------|-----------|
| **nicotine pouches Ireland** | 100+ | 20-40 | **#1-3** | 🎯 PRIMARY GOAL |
| tobacco free pouches Ireland | 100+ | 15-35 | #1-5 | Critical |
| nicotine pouches buy Ireland | 100+ | 15-30 | #1-5 | Critical |
| best nicotine pouches Ireland | 100+ | 10-25 | #1-5 | High |
| buy nicotine pouches online Ireland | 100+ | 10-30 | #1-10 | High |
| PUXX nicotine pouches | 20-50 | 1-5 | #1 | Branded |

**Month 6 Overall Targets:**
- **Primary keywords (#1-3):** 5+ keywords (including "nicotine pouches Ireland")
- **Keywords in top 10:** 30+ keywords
- **Keywords in top 50:** 50+ keywords
- **Total ranking keywords:** 200+ keywords

**Success Criteria:**
- ✅ "Nicotine pouches Ireland" ranks #1-3
- ✅ At least 2 other primary keywords in top 5
- ✅ 30+ keywords ranking on page 1 (positions 1-10)
- ✅ Strong visibility across all keyword categories

---

## Using SERPBear: Best Practices

### Daily Tasks
1. **Check primary keyword rankings**
   - Log into SERPBear
   - Review "Keywords" tab
   - Sort by "Change" to see biggest movers
   - Note any significant drops (>10 positions)

2. **Monitor ranking trends**
   - Click on each primary keyword
   - Review ranking chart (7-day, 30-day view)
   - Look for patterns (steady growth, volatility, decline)

### Weekly Tasks
1. **Export ranking data**
   - Export all keyword rankings to CSV
   - Save to `/docs/seo/ranking-data/week-X.csv`
   - Track week-over-week changes in spreadsheet

2. **Analyze ranking changes**
   - Which keywords improved?
   - Which keywords declined?
   - Any new keywords ranking?
   - Which pages are performing best?

### Monthly Tasks
1. **Comprehensive ranking review**
   - Compare month-over-month rankings
   - Identify top movers (winners and losers)
   - Update keyword targets if needed
   - Add new keyword opportunities

2. **Reporting**
   - Create monthly ranking report
   - Include charts and trends
   - Highlight achievements and concerns
   - Share with stakeholders

---

## Interpreting Ranking Data

### Good Signs
- ✅ Steady upward trend over 4+ weeks
- ✅ Primary keywords moving from page 2-3 to page 1
- ✅ Multiple keywords improving simultaneously
- ✅ Long-tail keywords reaching top 5

### Warning Signs
- ⚠️ Sudden drops (>10 positions) in multiple keywords
- ⚠️ Consistent decline over 2+ weeks
- ⚠️ Volatility (ranking bouncing 20+ positions daily)
- ⚠️ No improvement after 6-8 weeks of optimization

### Actions to Take

**If keywords improve:**
- Analyze what worked (content, backlinks, technical fixes)
- Double down on successful tactics
- Replicate for other keywords

**If keywords decline:**
- Check for technical issues (site down, indexing errors)
- Review Google Search Console for manual actions
- Analyze competitor changes (did they improve?)
- Review content quality and relevance
- Check for algorithm updates

**If keywords are stagnant:**
- Increase content depth (add 500+ words)
- Build more backlinks to target pages
- Improve internal linking structure
- Optimize meta tags and CTR

---

## Alternative: Google Search Console for Rankings

If SERPBear has issues, you can also track rankings via Google Search Console:

1. **Go to:** Google Search Console → Performance
2. **Filter by:** Queries
3. **Date range:** Last 28 days (or custom)
4. **Sort by:** Average position
5. **Export data:** Download CSV for record-keeping

**Pros:**
- Official Google data
- Includes impressions and clicks
- Free and reliable

**Cons:**
- No historical charts (only 16 months of data)
- Doesn't show exact daily rankings
- Less visual than SERPBear

**Recommendation:** Use both tools
- SERPBear for daily rank tracking and trends
- Google Search Console for actual traffic and click data

---

## Troubleshooting SERPBear

### Issue: Keywords not updating

**Solution:**
1. Check internet connection
2. Verify cron job is running (if production)
3. Manually trigger rank check:
   ```bash
   npm run check-ranks
   ```

### Issue: Inaccurate rankings

**Cause:** Google may be showing personalized results

**Solution:**
1. Use incognito/private browsing to verify
2. Use VPN set to Ireland for accurate local rankings
3. Configure Google Search API for more accurate results

### Issue: Too slow to check all keywords

**Solution:**
1. Reduce tracking frequency for low-priority keywords
2. Use Google Search API (faster than scraping)
3. Stagger rank checks throughout the day

---

## Keyword Tracking Spreadsheet Template

Create a Google Sheet to complement SERPBear:

| Date | Keyword | Rank | Change | Impressions (GSC) | Clicks (GSC) | CTR | Target Page | Notes |
|------|---------|------|--------|-------------------|--------------|-----|-------------|-------|
| 2025-01-01 | nicotine pouches Ireland | 87 | — | 450 | 12 | 2.7% | Homepage | Baseline |
| 2025-01-08 | nicotine pouches Ireland | 72 | +15 | 680 | 18 | 2.6% | Homepage | Improving |
| 2025-01-15 | nicotine pouches Ireland | 58 | +14 | 920 | 35 | 3.8% | Homepage | Page 6 → 5 |

**Download Template:** [Create in Google Sheets]

---

## Next Steps After Setup

1. ✅ Install and configure SERPBear
2. ✅ Add PUXX Ireland domain
3. ✅ Add all 48 keywords (use copy-paste lists above)
4. ✅ Set tracking frequencies (daily, weekly, monthly)
5. ✅ Record baseline rankings (Month 1)
6. ✅ Create weekly ranking review routine
7. ✅ Export data monthly for reporting
8. ✅ Compare against Month 3 and Month 6 targets

---

## Resources

- **SERPBear Location:** `/Users/baileybarry/Resources/repos/seo/serpbear`
- **SERPBear Documentation:** [Check README in repo]
- **Google Search Console:** https://search.google.com/search-console
- **SEO Plan:** `/docs/planning/PUXX-Ireland-SEO-Plan.md`
- **Monitoring Checklist:** `/docs/seo/SEO-MONITORING-CHECKLIST.md`

---

**Last Updated:** December 2025
**Maintained By:** SEO Team
**Review:** Monthly (update keyword list as needed)
