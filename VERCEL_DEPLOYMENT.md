# Vercel Deployment Guide

## Prerequisites
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login
```

## Quick Deployment

### Option 1: Use Vercel CLI (Recommended)
```bash
# Link your project to Vercel (run this first time only)
vercel link

# Set environment variables one by one
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add BASE_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
vercel env add AUTH_SECRET production
vercel env add RESEND_API_KEY production
vercel env add ADMIN_EMAIL production

# Optional analytics/tracking
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
vercel env add NEXT_PUBLIC_META_PIXEL_ID production
vercel env add META_CAPI_ACCESS_TOKEN production
vercel env add NEXT_PUBLIC_CLARITY_ID production

# Worldpay payment configuration
vercel env add WORLDPAY_MERCHANT_CODE production
vercel env add WORLDPAY_INSTALLATION_ID production
vercel env add WORLDPAY_SECRET_KEY production
vercel env add WORLDPAY_TEST_MODE production

# Deploy to production
vercel --prod
```

### Option 2: Use Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Import your Git repository
3. Add environment variables in Settings → Environment Variables
4. Copy values from your `.env` file (but update URLs for production)

## Required Environment Variables

### Database & Authentication (REQUIRED)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (secret!)
- `AUTH_SECRET` - Secret for JWT token signing (generate with `openssl rand -base64 32`)

### Application URLs (REQUIRED)
- `BASE_URL` - Your production URL (e.g., https://puxx.ie)
- `NEXT_PUBLIC_BASE_URL` - Same as BASE_URL
- `NEXT_PUBLIC_SITE_URL` - Your main site URL

### Email (REQUIRED)
- `RESEND_API_KEY` - Resend API key for transactional emails
- `ADMIN_EMAIL` - Admin email address

### Payment Gateway (REQUIRED)
- `WORLDPAY_MERCHANT_CODE` - Your Worldpay merchant code
- `WORLDPAY_INSTALLATION_ID` - Worldpay installation ID
- `WORLDPAY_SECRET_KEY` - Worldpay secret key
- `WORLDPAY_TEST_MODE` - Set to `false` for production

### Analytics (OPTIONAL)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 ID
- `NEXT_PUBLIC_META_PIXEL_ID` - Facebook Pixel ID
- `META_CAPI_ACCESS_TOKEN` - Meta Conversions API token
- `NEXT_PUBLIC_CLARITY_ID` - Microsoft Clarity project ID

## Important Notes

⚠️ **Security**: Never commit `.env` file to git!

⚠️ **Production URLs**: Update BASE_URL and NEXT_PUBLIC_BASE_URL to your production domain

⚠️ **Worldpay**: Set `WORLDPAY_TEST_MODE=false` for production

✅ **Database**: No need for POSTGRES_URL - we're using Supabase client directly

## Post-Deployment Checklist

- [ ] Verify admin login works at https://your-domain.com/login
- [ ] Test product browsing at https://your-domain.com/shop
- [ ] Check age verification modal appears on first visit
- [ ] Verify cart functionality
- [ ] Test checkout flow (use test mode first)
- [ ] Check admin dashboard at https://your-domain.com/admin
- [ ] Verify email sending (order confirmations, etc.)

## Troubleshooting

**Issue**: Admin won't load or redirects to login
- Check AUTH_SECRET is set correctly
- Verify SUPABASE keys are correct
- Check browser console for errors

**Issue**: Products not loading
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is set

**Issue**: Emails not sending
- Verify RESEND_API_KEY is correct
- Check ADMIN_EMAIL is set

## Admin Credentials

**Email**: admin@puxxireland.ie
**Password**: PuxxAdmin123!

(Remember to create a new admin user with a secure password after deployment!)
