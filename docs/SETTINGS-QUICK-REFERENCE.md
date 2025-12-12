# Settings & User Management - Quick Reference

## Pages & Routes

### Settings
- `/admin/settings` - Overview
- `/admin/settings/general` - Site info, contact, social media
- `/admin/settings/payments` - Stripe, Worldpay configuration
- `/admin/settings/shipping` - Shipping zones and methods
- `/admin/settings/taxes` - VAT configuration
- `/admin/settings/email-templates` - Email template editor
- `/admin/settings/users` - Admin users and roles

### Account
- `/admin/account/profile` - Personal information
- `/admin/account/security` - Password, 2FA
- `/admin/account/activity` - Activity log

## API Endpoints

### Settings
```typescript
GET    /api/admin/settings/general
PUT    /api/admin/settings/general

GET    /api/admin/settings/payments
PUT    /api/admin/settings/payments

GET    /api/admin/settings/taxes
PUT    /api/admin/settings/taxes

GET    /api/admin/settings/shipping
POST   /api/admin/settings/shipping
PUT    /api/admin/settings/shipping/[id]
DELETE /api/admin/settings/shipping/[id]

GET    /api/admin/settings/email-templates
PUT    /api/admin/settings/email-templates/[slug]
```

### Users & Activity
```typescript
GET    /api/admin/users
POST   /api/admin/users (not implemented)
DELETE /api/admin/users/[id]

GET    /api/admin/activity
POST   /api/admin/activity
```

## Database Tables

### settings
Stores general, payment, and tax settings as JSONB.

### shipping_zones
Stores shipping zones with countries and methods array.

### email_templates
Stores customizable email templates with HTML content.

## Default Settings Keys

1. `general` - Site name, logo, contact info, social media, store preferences
2. `payments` - Stripe and Worldpay credentials, test mode
3. `taxes` - VAT configuration, rate, display mode

## Email Template Slugs

1. `order-confirmation`
2. `shipping-confirmation`
3. `delivery-confirmation`
4. `order-cancellation`
5. `refund-confirmation`
6. `welcome-email`
7. `password-reset`

## User Roles

- **admin** - Full access (all permissions)
- **manager** - Products, orders, customers, analytics
- **support** - View only, can update order status

## Permissions

Defined in `/lib/admin/rbac.ts`:
- `view_settings`, `edit_settings` - Admin only
- `manage_users` - Admin only
- `view_products`, `create_products`, `edit_products`, `delete_products`
- `view_orders`, `edit_orders`, `delete_orders`
- `view_customers`, `edit_customers`, `delete_customers`
- `view_analytics`
- `view_marketing`, `edit_marketing`

## Component Imports

```typescript
// Forms
import { GeneralSettingsForm } from "@/components/admin/settings/GeneralSettingsForm";
import { PaymentSettingsForm } from "@/components/admin/settings/PaymentSettingsForm";
import { TaxSettingsForm } from "@/components/admin/settings/TaxSettingsForm";

// Shipping
import { ShippingZoneTable } from "@/components/admin/settings/ShippingZoneTable";
import { ShippingZoneForm } from "@/components/admin/settings/ShippingZoneForm";

// Email
import { EmailTemplateEditor } from "@/components/admin/settings/EmailTemplateEditor";

// Users
import { UserRoleTable } from "@/components/admin/settings/UserRoleTable";

// Activity
import { ActivityLog } from "@/components/admin/settings/ActivityLog";
```

## Type Imports

```typescript
import {
  GeneralSettings,
  PaymentSettings,
  TaxSettings,
  ShippingZone,
  ShippingMethod,
  EmailTemplate,
  AdminUser,
  Role,
  ActivityEntry,
} from "@/lib/types/settings";

// Schemas for validation
import {
  generalSettingsSchema,
  paymentSettingsSchema,
  taxSettingsSchema,
  shippingZoneSchema,
  emailTemplateSchema,
} from "@/lib/types/settings";
```

## Common Patterns

### Fetching Settings
```typescript
const response = await fetch("/api/admin/settings/general");
const data = await response.json();
```

### Updating Settings
```typescript
const response = await fetch("/api/admin/settings/general", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

### Creating a Shipping Zone
```typescript
const response = await fetch("/api/admin/settings/shipping", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(zoneData),
});
```

### Logging Activity
```typescript
await fetch("/api/admin/activity", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "Updated product",
    details: "PUXX Cool Mint",
  }),
});
```

## Styling

All components use Tailwind CSS with:
- Irish green theme: `emerald-600`, `emerald-700`
- Dark mode: `dark:` variants
- Rounded corners: `rounded-lg`
- Shadows: `shadow-sm`, `hover:shadow-md`
- Responsive: `sm:`, `lg:` breakpoints

## Next Steps

1. Run database migration
2. Navigate to `/admin/settings` to configure
3. Set up payment credentials
4. Configure shipping zones
5. Customize email templates
6. Add admin users and assign roles
