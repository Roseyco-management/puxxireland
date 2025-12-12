# Contact Form - Quick Start Guide

## 5-Minute Setup

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Copy the key (starts with `re_`)

### 2. Add to .env File

```bash
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=your-email@example.com
```

### 3. Verify Email (Development)

In Resend dashboard:
- Go to "Domains" → "Add email addresses"
- Verify the email you want to receive notifications at

### 4. Test It

```bash
npm run dev
# or
pnpm dev
```

Visit: `http://localhost:3000/contact`

## Production Setup

### Before Going Live:

1. **Verify your domain** in Resend (puxx.ie)
2. **Update from addresses** in the email templates to use your verified domain
3. **Set production environment variables**
4. **Test email delivery**

## Customization

### Change Contact Info

Edit: `/Users/baileybarry/PuxxIreland/app/contact/page.tsx`

Look for:
- `hello@puxx.ie`
- `+353 1 234 5678`
- Business hours
- Location

### Change Email Recipient

Edit: `/Users/baileybarry/PuxxIreland/.env`

```bash
ADMIN_EMAIL=your-actual-email@puxx.ie
```

### Customize Email Design

Edit: `/Users/baileybarry/PuxxIreland/lib/email/templates.ts`

Look for:
- Colors: `#22c55e`, `#16a34a`
- Text content
- Layout structure

## Common Issues

**Emails not sending?**
- Check API key is set correctly
- Verify recipient email in Resend (development)
- Check spam folder
- View logs in terminal

**Form not submitting?**
- Check browser console (F12)
- All required fields filled?
- Valid email format?
- Irish phone format? (+353 or 0)

**Rate limited?**
- Wait 15 minutes, or
- Restart dev server, or
- Use different browser/incognito

## Quick Links

- [Full Setup Guide](CONTACT_PAGE_SETUP.md)
- [Resend Dashboard](https://resend.com/overview)
- [Resend Docs](https://resend.com/docs)

---

**Need Help?** Read the full setup guide: `CONTACT_PAGE_SETUP.md`
