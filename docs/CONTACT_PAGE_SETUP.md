# PUXX Ireland Contact Page Setup Guide

## Overview

The contact page has been successfully built for Week 3 Day 3 with email integration using Resend. This guide will help you set up and configure the contact form to start receiving customer inquiries.

## Features Implemented

### 1. Contact Form Component (`components/contact/contact-form.tsx`)
- React Hook Form for form management
- Zod validation for all fields
- Real-time field validation
- Loading states during submission
- Success/error message display with animations
- Irish phone number format validation
- Required consent checkbox

### 2. Contact Page (`app/contact/page.tsx`)
- Professional layout with Irish green theme (#22c55e, #16a34a, #15803d)
- Responsive design (mobile-first)
- Contact information sidebar with:
  - Email: hello@puxx.ie
  - Phone: +353 1 234 5678
  - Business hours
  - Location information
- Quick help section
- SEO metadata optimized

### 3. Email Integration (`app/api/contact/route.ts`)
- Resend email service integration
- Rate limiting (3 submissions per 15 minutes per IP)
- Admin notification email with customer details
- Auto-reply confirmation email to customer
- Professional HTML email templates
- Error handling and validation

### 4. Email Templates (`lib/email/templates.ts`)
- HTML email templates with PUXX brand colors
- Admin notification template with customer details
- Customer auto-reply template
- Mobile-responsive email design

## Setup Instructions

### Step 1: Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "PUXX Ireland Contact Form")
5. Copy the API key (starts with `re_`)

### Step 3: Configure Domain (Important!)

For production, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `puxx.ie`
4. Add the DNS records provided by Resend to your domain
5. Wait for verification (usually takes a few minutes to hours)

**Note:** For development/testing, you can use Resend's default sending domain, but emails will only be sent to verified email addresses.

### Step 4: Add Environment Variables

Add these to your `.env` file:

```bash
# Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=admin@puxx.ie
```

**Important:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- Set `ADMIN_EMAIL` to the email where you want to receive contact form submissions
- Never commit your `.env` file to version control

### Step 5: Verify Email Addresses (Development Only)

If you haven't verified your domain yet:

1. Go to Resend dashboard → **Domains**
2. Click on "Add email addresses"
3. Add the admin email you want to receive notifications at
4. Verify the email address through the link sent

### Step 6: Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Navigate to `http://localhost:3000/contact`

3. Fill out the form with test data:
   - First Name: Test
   - Last Name: User
   - Email: your-verified-email@example.com
   - Phone: +353 1 234 5678 (optional)
   - Message: This is a test message
   - Check the consent box

4. Submit the form

5. Check your admin email for the notification
6. Check the customer email for the auto-reply

## Email Configuration Details

### From Addresses

The contact form uses two "from" addresses:

1. **Admin Notification:** `PUXX Ireland Contact Form <noreply@puxx.ie>`
2. **Auto-Reply:** `PUXX Ireland <hello@puxx.ie>`

### Email Templates

Two HTML email templates are generated:

#### Admin Notification Email
- Customer details (name, email, phone, timestamp)
- Full message content
- Quick reply button
- Professional PUXX branding

#### Auto-Reply Email
- Personalized greeting
- Confirmation of receipt
- Expected response time (24 hours)
- Contact information
- Professional PUXX branding

## Form Validation

The contact form validates:

- **First Name:** Required, minimum 1 character
- **Last Name:** Required, minimum 1 character
- **Email:** Required, valid email format
- **Phone:** Optional, Irish phone format (`+353` or `0` followed by 8-10 digits)
- **Message:** Required, minimum 10 characters
- **Consent:** Required checkbox

## Rate Limiting

To prevent spam, the API implements rate limiting:
- **Limit:** 3 submissions per 15 minutes per IP address
- **Response:** 429 status code with retry time
- **Storage:** In-memory (consider Redis for production)

## Security Features

1. **Server-side Validation:** All data validated with Zod on the server
2. **Rate Limiting:** Prevents spam and abuse
3. **CORS Protection:** Only POST and OPTIONS methods allowed
4. **IP Tracking:** For rate limiting and abuse prevention
5. **Environment Variables:** Sensitive keys stored securely

## Troubleshooting

### Email Not Sending

1. **Check API Key:**
   ```bash
   echo $RESEND_API_KEY
   ```
   Should output your API key starting with `re_`

2. **Check Domain Verification:**
   - Log into Resend dashboard
   - Verify your domain is verified (green checkmark)

3. **Check Email Address:**
   - In development, ensure recipient email is verified in Resend
   - Check spam folder

4. **Check Server Logs:**
   ```bash
   # Look for error messages
   npm run dev
   ```

### Form Not Submitting

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for JavaScript errors

2. **Check Network Tab:**
   - See if request is sent to `/api/contact`
   - Check response status and body

3. **Validate Form Data:**
   - Ensure all required fields are filled
   - Check email format
   - Check phone number format (Irish only)

### Rate Limiting Issues

If you're testing and hit rate limit:

1. **Wait 15 minutes**, or
2. **Restart development server** (clears in-memory rate limit), or
3. **Use different browser/incognito** (different IP tracking)

## Production Deployment

### Before Deploying:

1. **Verify Domain in Resend:**
   - Add DNS records
   - Wait for verification

2. **Set Environment Variables:**
   ```bash
   RESEND_API_KEY=re_live_key_here
   ADMIN_EMAIL=admin@puxx.ie
   ```

3. **Update Email Addresses:**
   - In `app/api/contact/route.ts`, ensure "from" addresses use your verified domain
   - Current setup uses `puxx.ie` domain

4. **Consider Redis for Rate Limiting:**
   - Current in-memory solution won't work across multiple servers
   - Implement Redis-based rate limiting for production

5. **Monitor Email Delivery:**
   - Set up Resend webhooks for delivery tracking
   - Monitor bounce and complaint rates

## File Structure

```
/Users/baileybarry/PuxxIreland/
├── app/
│   ├── contact/
│   │   └── page.tsx                    # Contact page
│   └── api/
│       └── contact/
│           └── route.ts                # Contact API endpoint
├── components/
│   ├── contact/
│   │   └── contact-form.tsx           # Contact form component
│   └── ui/
│       ├── checkbox.tsx               # Checkbox component (new)
│       └── textarea.tsx               # Textarea component (new)
├── lib/
│   └── email/
│       └── templates.ts               # Email templates
└── docs/
    └── CONTACT_PAGE_SETUP.md          # This file
```

## Dependencies Added

```json
{
  "react-hook-form": "^7.68.0",
  "@hookform/resolvers": "^5.2.2",
  "resend": "^6.6.0"
}
```

## Resend Pricing

- **Free Tier:** 3,000 emails/month, 100 emails/day
- **Pro Tier:** $20/month for 50,000 emails
- Perfect for small to medium businesses

## Support

For issues or questions:
- **Resend Documentation:** https://resend.com/docs
- **React Hook Form:** https://react-hook-form.com
- **Zod Validation:** https://zod.dev

## Next Steps

1. Set up Resend account and verify domain
2. Add environment variables to `.env`
3. Test the contact form
4. Customize email templates if needed
5. Add contact page to navigation menu
6. Monitor submissions in Resend dashboard

## Customization Options

### Update Contact Information

Edit `/Users/baileybarry/PuxxIreland/app/contact/page.tsx`:
- Email address
- Phone number
- Business hours
- Location details

### Customize Email Templates

Edit `/Users/baileybarry/PuxxIreland/lib/email/templates.ts`:
- Change colors
- Update branding
- Modify content
- Add logo images

### Adjust Rate Limiting

Edit `/Users/baileybarry/PuxxIreland/app/api/contact/route.ts`:
```typescript
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // Change window
const RATE_LIMIT_MAX_REQUESTS = 3;        // Change limit
```

### Add Fields to Form

1. Update schema in `contact-form.tsx`
2. Add form fields to JSX
3. Update email templates
4. Update API validation

---

**Built for PUXX Ireland - Week 3 Day 3**
**Contact Form with Email Integration ✓**
