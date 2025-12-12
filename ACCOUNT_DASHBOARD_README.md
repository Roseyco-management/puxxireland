# PUXX Ireland Account Dashboard & User Management

## Overview

This is a comprehensive account management system built for PUXX Ireland e-commerce platform. It provides users with a complete dashboard to manage their orders, profile, and addresses.

## Features Implemented

### 1. Account Layout (`app/(account)/layout.tsx`)
- Protected route group requiring authentication
- Responsive sidebar navigation (desktop) / hamburger menu (mobile)
- User info display at the top
- Irish green theme (#22c55e, #16a34a, #15803d)
- Navigation items:
  - Dashboard (overview)
  - Order History
  - Account Details
  - Saved Addresses
  - Logout

### 2. Dashboard Overview (`app/(account)/account/dashboard/page.tsx`)
- Personalized welcome message with user's first name
- Quick stats cards:
  - Total Orders count
  - Recent Orders count
  - Account Status (Active/Verified)
- Quick action buttons:
  - Shop Products
  - View All Orders
- Recent orders summary table (last 3 orders)
- Empty state with call-to-action
- Mobile responsive design

### 3. Order History (`app/(account)/account/orders/page.tsx`)
- Complete order listing with:
  - Order Number
  - Date
  - Items count
  - Total Amount (EUR)
  - Status badges (color-coded)
  - View Details action
- Desktop: Table view
- Mobile: Card view
- Empty state with shopping CTA
- Status badge variants:
  - Delivered: Green (success)
  - Shipped: Blue (info)
  - Processing: Yellow (warning)
  - Cancelled/Refunded: Red (destructive)
  - Pending: Default

### 4. Order Details (`app/(account)/account/orders/[id]/page.tsx`)
- Complete order information:
  - Order number, date, and status
  - Items ordered with images, quantities, and prices
  - Order summary (subtotal, shipping, tax, discount, total)
  - Shipping address
  - Payment method and status
- Visual order tracking timeline:
  - Order Placed
  - Processing
  - Shipped
  - Delivered
- Reorder button (placeholder for future implementation)
- Back to orders navigation
- Mobile responsive

### 5. Account Details (`app/(account)/account/details/page.tsx`)
- Profile information editing:
  - First Name
  - Last Name
  - Email (display only)
  - Phone Number
  - Date of Birth (display only)
  - Marketing consent toggle
- Form validation
- Success/error messages
- Save changes functionality

### 6. Change Password Section
- Secure password update form:
  - Current Password
  - New Password
  - Confirm New Password
- Client-side validation:
  - Minimum 8 characters
  - Passwords must match
  - New password must be different from current
- Success/error feedback

### 7. Saved Addresses (`app/(account)/account/addresses/page.tsx`)
- List of all saved addresses
- Address cards displaying:
  - Name
  - Full address (line 1, line 2, city, county, eircode)
  - Country (Ireland)
  - Phone number
  - Default shipping/billing badges
- Actions for each address:
  - Edit
  - Set as default shipping
  - Set as default billing
  - Delete
- Add new address functionality
- Empty state with CTA
- Mobile responsive grid layout

### 8. Logout Functionality
- Logout button in sidebar navigation
- API endpoint to clear session cookie
- Redirect to homepage after logout
- Client-side session clearing

## Database Schema

### Addresses Table
```sql
CREATE TABLE "addresses" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL,
  "name" varchar(200) NOT NULL,
  "address_line_1" varchar(255) NOT NULL,
  "address_line_2" varchar(255),
  "city" varchar(100) NOT NULL,
  "county" varchar(100),
  "eircode" varchar(20),
  "country" varchar(2) DEFAULT 'IE' NOT NULL,
  "phone" varchar(20),
  "is_default_shipping" boolean DEFAULT false NOT NULL,
  "is_default_billing" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
```

## API Routes

### Profile Management
- `GET /api/account/profile` - Get user profile
- `PUT /api/account/profile` - Update user profile

### Password Management
- `PUT /api/account/password` - Change password

### Address Management
- `GET /api/account/addresses` - Get all user addresses
- `POST /api/account/addresses` - Create new address
- `GET /api/account/addresses/[id]` - Get specific address
- `PUT /api/account/addresses/[id]` - Update address
- `DELETE /api/account/addresses/[id]` - Delete address

### Authentication
- `POST /api/auth/logout` - Logout user

## Components

### Account Components (`components/account/`)
- `AccountNav.tsx` - Sidebar navigation with mobile menu
- `ProfileForm.tsx` - Profile editing form
- `ChangePasswordForm.tsx` - Password change form
- `AddressCard.tsx` - Individual address card with actions
- `AddAddressButton.tsx` - Button to open add address modal
- `AddressFormModal.tsx` - Modal form for adding/editing addresses
- `DeleteAddressDialog.tsx` - Confirmation dialog for deleting addresses

## Design System

### Colors (Irish Green Theme)
- Primary Green: `#22c55e` (green-600)
- Hover Green: `#16a34a` (green-700)
- Dark Green: `#15803d` (green-800)
- Light Green: `#bbf7d0` (green-200)
- Background Green: `#f0fdf4` (green-50)

### Status Colors
- Success (Delivered): Green
- Info (Shipped): Blue
- Warning (Processing): Yellow
- Destructive (Cancelled/Failed): Red
- Default (Pending): Gray

## Features & Functionality

### Security Features
- Protected routes (authentication required)
- Password hashing with bcrypt
- Session-based authentication
- User-specific data access
- SQL injection protection with Drizzle ORM

### User Experience
- Loading states on all forms
- Success/error messages
- Form validation
- Mobile-first responsive design
- Accessible components
- Empty states with CTAs
- Confirmation dialogs for destructive actions

### Data Management
- Real-time data refresh after mutations
- Optimistic UI updates
- Proper error handling
- TypeScript type safety

## File Structure

```
app/
├── (account)/
│   ├── layout.tsx                    # Account layout with sidebar
│   └── account/
│       ├── dashboard/
│       │   └── page.tsx              # Dashboard overview
│       ├── orders/
│       │   ├── page.tsx              # Order history
│       │   └── [id]/
│       │       └── page.tsx          # Order details
│       ├── details/
│       │   └── page.tsx              # Account details & password
│       └── addresses/
│           └── page.tsx              # Saved addresses
├── api/
│   ├── account/
│   │   ├── profile/
│   │   │   └── route.ts              # Profile API
│   │   ├── password/
│   │   │   └── route.ts              # Password API
│   │   └── addresses/
│   │       ├── route.ts              # Addresses list API
│   │       └── [id]/
│   │           └── route.ts          # Individual address API
│   └── auth/
│       └── logout/
│           └── route.ts              # Logout API

components/
└── account/
    ├── AccountNav.tsx                # Navigation sidebar
    ├── ProfileForm.tsx               # Profile form
    ├── ChangePasswordForm.tsx        # Password form
    ├── AddressCard.tsx               # Address card
    ├── AddAddressButton.tsx          # Add address button
    ├── AddressFormModal.tsx          # Address form modal
    └── DeleteAddressDialog.tsx       # Delete confirmation

lib/
└── db/
    ├── schema.ts                     # Database schema (updated)
    └── migrations/
        └── 0001_add_addresses_table.sql  # Addresses migration
```

## Navigation URLs

- Dashboard: `/account/dashboard`
- Order History: `/account/orders`
- Order Details: `/account/orders/[id]`
- Account Details: `/account/details`
- Saved Addresses: `/account/addresses`

## Dependencies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Drizzle ORM
- PostgreSQL (via Supabase)
- date-fns (date formatting)
- lucide-react (icons)
- bcryptjs (password hashing)

## Usage

1. Users must be authenticated to access any account pages
2. All pages are mobile responsive
3. Forms include validation and error handling
4. API routes are protected and user-specific
5. Irish address format supported (Eircode, Counties)

## Mobile Responsive Features

- Hamburger menu for navigation on mobile
- Card-based layouts instead of tables on mobile
- Stacked form fields on smaller screens
- Full-width modals on mobile
- Touch-friendly buttons and links

## Future Enhancements

- Reorder functionality (add items to cart from past orders)
- Order cancellation
- Order tracking integration
- Address autocomplete/validation
- Email notifications for order updates
- Export order history
- Wishlist/favorites
- Account deletion
- Two-factor authentication

## Testing Recommendations

1. Test all forms with valid and invalid data
2. Verify authentication protection on all routes
3. Test mobile responsiveness
4. Verify address CRUD operations
5. Test password change with various scenarios
6. Verify order display with different statuses
7. Test empty states
8. Verify Irish address format handling

## Notes

- All monetary values are in EUR
- Country is defaulted to Ireland (IE)
- Date of birth and email cannot be changed (security)
- Default addresses are mutually exclusive
- Deleting an address is permanent
- Session expires after 24 hours
- All timestamps are in UTC
