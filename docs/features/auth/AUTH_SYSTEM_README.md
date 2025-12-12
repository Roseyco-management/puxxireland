# PUXX Ireland Authentication System

## Overview

This document describes the complete authentication system built for PUXX Ireland, an 18+ nicotine pouch e-commerce platform. The system includes login, registration with age verification, password reset functionality, and Google OAuth setup.

## Features Implemented

### 1. Login Page (`/login`)
- Email and password authentication
- "Remember me" checkbox
- "Forgot password?" link
- Password visibility toggle
- Google OAuth button (structure in place, requires setup)
- Form validation with error messages
- Loading states during submission
- Responsive design with Irish green theme (#22c55e)
- Redirects to `/account` after successful login

### 2. Registration Page (`/register`)
- **Personal Information**
  - First Name (required)
  - Last Name (required)
  - Email (required, unique validation)
  - Password (required, min 8 chars, strength indicator)
  - Confirm Password (must match)

- **Age Verification**
  - Date of Birth input (required)
  - Age calculation and validation (must be 18+)
  - "I confirm I am 18 years or older" checkbox (required)

- **Additional Fields**
  - "How did you hear about us?" dropdown:
    - Social Media
    - Friend/Family
    - Search Engine
    - Advertisement
    - Other
  - Marketing consent checkbox (optional)
  - Terms & Conditions acceptance (required)

- **Password Strength Indicator**
  - Visual progress bar
  - Color-coded strength levels (Weak/Fair/Good/Strong)
  - Real-time validation

- **Form Validation**
  - Client-side validation with visual feedback
  - Server-side validation with Zod schemas
  - Password match indicator
  - Email uniqueness check

### 3. Password Reset Flow

#### Forgot Password Page (`/forgot-password`)
- Email input to request password reset
- Success message after submission
- Link back to sign in
- Email enumeration protection

#### Reset Password Page (`/reset-password`)
- Token validation from URL parameter
- New password input with strength indicator
- Confirm password with match validation
- Token expiry handling
- Success message and auto-redirect to login

### 4. Authentication Logic

#### Server Actions (`/app/(auth)/actions.ts`)
- `signIn`: Authenticates user with email/password
- `signUp`: Creates new user with profile and age verification
- `requestPasswordReset`: Initiates password reset flow
- `resetPassword`: Completes password reset with token
- `signOut`: Clears session and redirects to login

#### API Routes
- `/api/auth/login` - POST endpoint for login
- `/api/auth/register` - POST endpoint for registration
- `/api/auth/forgot-password` - POST endpoint for password reset request

### 5. Database Integration

#### Users Table
```sql
- id: serial (primary key)
- name: varchar(100)
- email: varchar(255) (unique, not null)
- passwordHash: text (not null)
- role: varchar(20) (default: 'member')
- createdAt: timestamp
- updatedAt: timestamp
- deletedAt: timestamp (soft delete)
```

#### Profiles Table
```sql
- id: serial (primary key)
- userId: integer (foreign key, unique)
- phone: varchar(20)
- dateOfBirth: timestamp
- ageVerified: boolean (default: false)
- referralSource: varchar(100)
- marketingConsent: boolean (default: false)
- createdAt: timestamp
- updatedAt: timestamp
```

### 6. Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **Session Management**: JWT tokens with 24-hour expiry
- **HTTP-only Cookies**: Secure session storage
- **CSRF Protection**: Built into Next.js
- **Password Requirements**:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
- **Age Verification**: Double-check (checkbox + DOB calculation)
- **Email Enumeration Protection**: Same response for existing/non-existing emails

### 7. Middleware Protection

The middleware (`/middleware.ts`) protects the following routes:
- `/dashboard` (existing)
- `/account` (new)

Unauthenticated users are redirected to `/login`.

### 8. Session Handling

- Sessions stored in HTTP-only, secure cookies
- Automatic session refresh on valid requests
- Session expiry: 24 hours
- Session validation on protected routes

## File Structure

```
/app
  /(auth)
    /layout.tsx                 # Auth pages layout with header/footer
    /login
      /page.tsx                 # Login page
    /register
      /page.tsx                 # Registration page
    /forgot-password
      /page.tsx                 # Forgot password page
    /reset-password
      /page.tsx                 # Reset password page
    /actions.ts                 # Server actions for auth
  /api
    /auth
      /login
        /route.ts               # Login API endpoint
      /register
        /route.ts               # Registration API endpoint
      /forgot-password
        /route.ts               # Password reset request endpoint
  /account
    /page.tsx                   # Protected account dashboard

/lib
  /auth
    /session.ts                 # Session management utilities
    /middleware.ts              # Validation helpers
    /password-reset.ts          # Password reset token utilities
    /oauth.ts                   # Google OAuth configuration

/middleware.ts                  # Route protection middleware
```

## Validation Rules

### Email
- Must be valid email format
- Must be unique in the database
- Maximum 255 characters

### Password
- Minimum 8 characters
- Maximum 100 characters
- Must contain at least:
  - 1 uppercase letter (A-Z)
  - 1 lowercase letter (a-z)
  - 1 number (0-9)
  - 1 special character (!@#$%^&*(),.?":{}|<>)

### Age Verification
- User must be at least 18 years old
- Calculated from date of birth
- Both checkbox confirmation and DOB validation required

### Required Fields
- First Name
- Last Name
- Email
- Password
- Confirm Password
- Date of Birth
- Age verification checkbox
- Terms acceptance checkbox

## User Flow

### Registration Flow
1. User visits `/register`
2. Fills out registration form with all required fields
3. Confirms they are 18+ (checkbox)
4. Enters date of birth (validated to be 18+)
5. Accepts terms & conditions
6. Submits form
7. Server validates all inputs
8. Creates user account in `users` table
9. Creates profile in `profiles` table with age verification
10. Shows success message
11. User can now sign in at `/login`

### Login Flow
1. User visits `/login`
2. Enters email and password
3. Optionally checks "Remember me"
4. Submits form
5. Server validates credentials
6. Creates secure session
7. Redirects to `/account`

### Password Reset Flow
1. User visits `/forgot-password`
2. Enters email address
3. Server sends reset link (when implemented)
4. User clicks link in email
5. Redirected to `/reset-password?token=...`
6. Enters new password (with strength validation)
7. Confirms new password
8. Submits form
9. Server validates token and updates password
10. Redirects to `/login`

## Environment Variables Required

```env
# Database (already configured)
DATABASE_URL=your_supabase_connection_string

# Authentication
AUTH_SECRET=your_auth_secret_here

# Google OAuth (optional, for future implementation)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Color Scheme (Irish Green Theme)

- Primary: `#22c55e` (green-600)
- Primary Hover: `#16a34a` (green-700)
- Primary Dark: `#15803d` (green-800)

## Testing the Authentication System

### Test Registration
1. Navigate to `http://localhost:3000/register`
2. Fill in all required fields
3. Use a birthdate that makes you 18+
4. Check age verification and terms checkboxes
5. Submit form
6. Verify success message appears

### Test Login
1. Navigate to `http://localhost:3000/login`
2. Enter the email and password you just registered
3. Submit form
4. Verify redirect to `/account`
5. Verify user details are displayed

### Test Protected Routes
1. Clear cookies/logout
2. Try to access `/account` directly
3. Verify redirect to `/login`

### Test Session Persistence
1. Login successfully
2. Navigate to different pages
3. Verify session persists
4. Close browser and reopen
5. Navigate to `/account`
6. Verify session still active (if "Remember me" was checked)

## Next Steps / Future Enhancements

### Password Reset Token System
Currently, password reset tokens are not fully implemented. To complete this:

1. Add `passwordResetTokens` table to database schema
2. Run migration to create the table
3. Implement token generation in `requestPasswordReset` action
4. Implement email sending service (SendGrid, Resend, etc.)
5. Implement token validation in `resetPassword` action

### Google OAuth
The structure is in place. To enable:

1. Follow the guide in `OAUTH_SETUP.md`
2. Install NextAuth.js: `npm install next-auth`
3. Create OAuth credentials in Google Cloud Console
4. Add environment variables
5. Create `/app/api/auth/[...nextauth]/route.ts`
6. Update login/register pages to use OAuth

### Additional Features
- Two-factor authentication (2FA)
- Email verification on registration
- Account settings page
- Password change functionality
- Account deletion
- Session management (view active sessions)
- Login history
- OAuth providers (Facebook, Apple)

## Troubleshooting

### Issue: "Invalid email or password"
- Verify the email exists in the database
- Check that the password is correct
- Ensure the user hasn't been soft-deleted (deletedAt is null)

### Issue: "An account with this email already exists"
- The email is already registered
- User should use the login page instead
- Or use password reset if they forgot their password

### Issue: "You must be at least 18 years old"
- Date of birth indicates user is under 18
- This is intentional age gate for nicotine products

### Issue: Redirect loop on protected pages
- Clear cookies and try again
- Check that AUTH_SECRET is set in .env
- Verify middleware is correctly configured

### Issue: Password strength not updating
- JavaScript may not be loading
- Check browser console for errors
- Verify page is client component ('use client')

## Support

For issues or questions about the authentication system:
1. Check this README
2. Review the code comments
3. Check the OAUTH_SETUP.md for OAuth-specific issues
4. Review Next.js 15 authentication documentation

## Credits

Built with:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Supabase PostgreSQL
- bcryptjs
- jose (JWT)
- Zod (validation)
