# Google OAuth Setup Guide for PUXX Ireland

This guide will help you set up Google OAuth authentication for the PUXX Ireland application.

## Prerequisites

- Google Cloud Platform account
- Access to PUXX Ireland codebase
- Environment variables configured

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project "PUXX Ireland" or similar
4. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google People API"
3. Click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Fill in the application information:
   - App name: PUXX Ireland
   - User support email: your-email@example.com
   - Developer contact email: your-email@example.com
4. Add scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Add test users (for development)
6. Save and continue

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - Name: PUXX Ireland Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://your-production-domain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-production-domain.com/api/auth/callback/google` (production)
5. Click "Create"
6. Copy the Client ID and Client Secret

## Step 5: Add Environment Variables

Add the following to your `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

To generate a secure NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

## Step 6: Install NextAuth.js

```bash
npm install next-auth
```

## Step 7: Create NextAuth Route Handler

Create the file `/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from '@/lib/db/drizzle';
import { users, profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email!))
        .limit(1);

      if (existingUser.length === 0) {
        // Create new user
        const [newUser] = await db
          .insert(users)
          .values({
            email: user.email!,
            name: user.name || '',
            passwordHash: '', // OAuth users don't have passwords
            role: 'member',
          })
          .returning();

        // Create profile - age verification required
        await db.insert(profiles).values({
          userId: newUser.id,
          ageVerified: false,
          marketingConsent: false,
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email!))
          .limit(1);

        if (user.length > 0) {
          session.user.id = user[0].id;
          session.user.role = user[0].role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

## Step 8: Update Login Page

Replace the disabled Google button in `/app/(auth)/login/page.tsx`:

```typescript
import { signIn } from 'next-auth/react';

// Replace the disabled button with:
<button
  onClick={() => signIn('google', { callbackUrl: '/account' })}
  className="w-full flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
>
  {/* Google SVG icon */}
  Sign in with Google
</button>
```

## Step 9: Handle Age Verification for OAuth Users

Users who sign up via Google OAuth won't have age verification initially. You should:

1. Check if user has `ageVerified: false` after OAuth login
2. Redirect to an age verification page
3. Collect date of birth and verify they're 18+
4. Update profile with `ageVerified: true`

## Step 10: Test OAuth Flow

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Click "Sign in with Google"
4. Complete the Google OAuth flow
5. Verify user is created in database
6. Confirm redirect to account page works

## Security Considerations

1. **Never commit credentials**: Keep `.env` in `.gitignore`
2. **Use HTTPS in production**: OAuth requires secure connections
3. **Implement CSRF protection**: NextAuth.js handles this automatically
4. **Age verification**: Ensure OAuth users complete age verification
5. **Session management**: Use secure, httpOnly cookies
6. **Rate limiting**: Implement rate limiting on auth endpoints

## Troubleshooting

### Error: redirect_uri_mismatch
- Ensure redirect URI in Google Console exactly matches your app's URL
- Check for trailing slashes
- Verify HTTP vs HTTPS

### Error: invalid_client
- Double-check your Client ID and Client Secret
- Ensure they're correctly set in `.env`

### User not being created
- Check database connection
- Verify schema is up to date
- Check server logs for errors

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
