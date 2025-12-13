# Age Verification System

A professional age verification system for PUXX Ireland nicotine pouch website, ensuring compliance with Irish regulations requiring age verification for nicotine products.

## Features

- Full-screen modal with backdrop blur
- Premium Irish green theme (#009A49)
- PUXX Ireland branding with logo
- Dual storage (cookies + localStorage) for redundancy
- 30-day cookie expiration
- Cannot be dismissed without verification
- Prevents scrolling when modal is open
- Keyboard accessible (ESC disabled for verification)
- Cannot be bypassed with browser back button
- Responsive design for all devices
- Clear rejection flow for under-18 users

## Components

### AgeGate (Wrapper Component)

The main provider that wraps your application and manages age verification state.

```tsx
import { AgeGate } from '@/components/age-verification';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AgeGate>
          {children}
        </AgeGate>
      </body>
    </html>
  );
}
```

### AgeVerificationModal

The modal component that displays the age verification interface.

**Features:**
- PUXX Ireland logo
- Clear legal messaging
- Two action buttons:
  - "I am 18 or older" - Verifies age and closes modal
  - "I am under 18" - Shows rejection screen with HSE information
- Legal disclaimer with links to Terms & Privacy Policy
- "Why we ask this" informational link

### Utilities

Located in `/lib/utils/age-verification.ts`:

- `isAgeVerified()` - Check if user has been verified
- `setAgeVerified()` - Mark user as verified (sets cookie + localStorage)
- `clearAgeVerification()` - Clear verification (for testing)
- `getVerificationTimestamp()` - Get when user was verified

## Usage

### Basic Implementation

The age gate is already integrated in the root layout and will automatically appear for first-time visitors.

### Testing

To test the age verification modal, you can clear the verification in browser console:

```javascript
// Clear verification
localStorage.removeItem('puxx_age_verified');
document.cookie = 'puxx_age_verified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
location.reload();
```

Or use the utility function:

```tsx
import { clearAgeVerification } from '@/lib/utils/age-verification';

// In a component or dev tool
clearAgeVerification();
window.location.reload();
```

## Design Specifications

### Colors

- Primary Green: `#009A49` (Irish green)
- Gradient: `linear-gradient(135deg, #009A49 0%, #00A86B 100%)`
- Rejection Red: `from-red-600 to-red-500`

### Modal Structure

1. **Header Section**
   - Green gradient background
   - PUXX logo with backdrop blur effect
   - "Age Verification Required" heading
   - Subtitle text

2. **Content Section**
   - Shield icon with amber background
   - "Restricted Content" heading
   - Clear explanation text
   - Two large action buttons
   - Legal notice box with links

3. **Rejection Screen**
   - Red gradient header
   - Alert triangle icon
   - "Access Denied" messaging
   - HSE information link for minors
   - "Go Back" option

## Security

- Uses both cookies and localStorage for redundancy
- Cookie has 30-day expiration
- Secure and SameSite=Strict cookie settings
- Cannot be dismissed without action
- ESC key disabled
- Click outside overlay disabled
- Prevents scrolling when active

## Legal Compliance

This system ensures compliance with:
- Irish age-restricted product sales regulations
- GDPR (privacy policy linked)
- Consumer protection requirements
- Age verification best practices

## Browser Support

- Modern browsers with localStorage support
- Cookie support required
- Graceful degradation for older browsers

## Files

- `/components/age-verification/AgeGate.tsx` - Main wrapper component
- `/components/age-verification/AgeVerificationModal.tsx` - Modal UI component
- `/components/ui/dialog.tsx` - Dialog primitive component
- `/lib/utils/age-verification.ts` - Cookie/localStorage utilities

## Configuration

### Cookie Expiry

To change the cookie expiration (default 30 days), modify in `/lib/utils/age-verification.ts`:

```typescript
const COOKIE_EXPIRY_DAYS = 30; // Change this value
```

### Redirect URL for Under-18

To change where under-18 users are directed, modify the HSE link in `AgeVerificationModal.tsx`:

```tsx
href="https://www.hse.ie/eng/health/hl/living/children/tobacco/"
```

## Accessibility

- Keyboard navigation support
- Screen reader friendly with ARIA labels
- Clear focus states
- High contrast design
- Semantic HTML structure

## Analytics Integration

Consider tracking these events:

- Age verification modal shown
- User verified (18+)
- User rejected (under 18)
- Verification timestamp

Add to your analytics setup as needed.
