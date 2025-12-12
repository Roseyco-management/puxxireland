# PUXX Ireland Auth System - Quick Start Guide

## Getting Started in 5 Minutes

### 1. Ensure Environment Variables

Make sure your `.env` file has:
```env
DATABASE_URL=your_supabase_connection_string
AUTH_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate AUTH_SECRET if needed:
```bash
openssl rand -base64 32
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test the System

#### Register a New Account
1. Visit: http://localhost:3000/register
2. Fill in all fields (use a birthdate that makes you 18+)
3. Check age verification and terms boxes
4. Click "Create Account"
5. See success message

#### Login
1. Visit: http://localhost:3000/login
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to: http://localhost:3000/account

#### Test Protected Routes
1. Sign out from account page
2. Try to visit: http://localhost:3000/account
3. You'll be redirected to login (route protection working!)

## Available Routes

### Public Routes
- `/login` - Sign in page
- `/register` - Sign up page
- `/forgot-password` - Request password reset
- `/reset-password` - Reset password (with token)

### Protected Routes
- `/account` - User dashboard (requires login)
- `/dashboard` - Admin dashboard (requires login)

## File Locations

### Pages
- Login: `/app/(auth)/login/page.tsx`
- Register: `/app/(auth)/register/page.tsx`
- Forgot Password: `/app/(auth)/forgot-password/page.tsx`
- Reset Password: `/app/(auth)/reset-password/page.tsx`
- Account: `/app/account/page.tsx`

### Server Logic
- Actions: `/app/(auth)/actions.ts`
- Session: `/lib/auth/session.ts`
- Middleware: `/middleware.ts`

### API Routes
- Login: `/app/api/auth/login/route.ts`
- Register: `/app/api/auth/register/route.ts`
- Forgot Password: `/app/api/auth/forgot-password/route.ts`

## Common Tasks

### Add More Protected Routes
Edit `/middleware.ts`:
```typescript
const protectedRoutes = ['/dashboard', '/account', '/orders'];
```

### Change Session Duration
Edit `/lib/auth/session.ts`:
```typescript
const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
// Change to 7 days:
const expiresInSevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
```

### Customize Password Requirements
Edit `/app/(auth)/actions.ts`:
```typescript
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;
```

### Change Age Requirement
Edit `/app/(auth)/actions.ts`:
```typescript
if (age < 18) {
  // Change to 21:
  // if (age < 21) {
```

## Troubleshooting

### Can't Login
- Check if user exists in database
- Verify password is correct
- Check browser console for errors
- Ensure AUTH_SECRET is set

### Registration Fails
- Verify all required fields are filled
- Check age is 18+ based on birthdate
- Ensure email is unique
- Check database connection

### Session Not Persisting
- Clear browser cookies
- Check AUTH_SECRET is set
- Verify middleware is running
- Check cookie settings in browser

### Redirect Issues
- Ensure middleware.ts matcher is correct
- Check protected routes list
- Verify session cookie exists
- Check browser allows cookies

## Next Steps

1. **Complete Password Reset**
   - Add password reset token table to database
   - Set up email service (SendGrid/Resend)
   - Test full password reset flow

2. **Enable Google OAuth** (Optional)
   - See: `OAUTH_SETUP.md`
   - Install NextAuth.js
   - Configure Google Cloud Console

3. **Add Email Verification**
   - Send verification email on registration
   - Create email verification page
   - Update profile schema

## Documentation

- **Full Documentation**: `AUTH_SYSTEM_README.md`
- **OAuth Setup**: `OAUTH_SETUP.md`
- **Build Summary**: `WEEK3_DAY4_SUMMARY.md`

## Support

Check the documentation files above for detailed information on:
- System architecture
- Security features
- Database schema
- Validation rules
- User flows
- API endpoints

---

**Happy coding! 🚀**
