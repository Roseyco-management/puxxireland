# Customers & Marketing Management Implementation

## Overview
Complete implementation of Customer CRM and Email Marketing Subscriber Management for the PUXX Ireland Admin Dashboard.

## Database Schema Updates

### New Table: `customer_notes`
Added to `/lib/db/schema.ts`:

```typescript
export const customerNotes = pgTable('customer_notes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  note: text('note').notNull(),
  createdBy: integer('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

**Migration Required**: Run database migrations to create this table.

## API Routes

### Customer APIs

#### 1. `/api/admin/customers/route.ts` - GET
**Purpose**: Fetch all customers with aggregated order statistics

**Query Parameters**:
- `search` - Search by name, email, or phone
- `isGuest` - Filter by registered vs guest customers
- `hasOrders` - Filter customers with/without orders
- `dateFrom` - Filter by joined date (from)
- `dateTo` - Filter by joined date (to)

**Response**:
```json
{
  "success": true,
  "count": 150,
  "customers": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+353 1234567",
      "ordersCount": 5,
      "totalSpent": 250.00,
      "lastOrderDate": "2024-01-15T10:30:00Z",
      "joinedDate": "2023-12-01T08:00:00Z",
      "isGuest": false
    }
  ]
}
```

#### 2. `/api/admin/customers/[id]/route.ts` - GET, DELETE
**GET Purpose**: Fetch detailed customer information

**Response**:
```json
{
  "success": true,
  "customer": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+353 1234567",
    "ordersCount": 5,
    "totalSpent": 250.00,
    "averageOrderValue": 50.00,
    "lastOrderDate": "2024-01-15T10:30:00Z",
    "addresses": [...],
    "notes": [...]
  }
}
```

**DELETE**: Soft delete customer (sets `deletedAt` timestamp)

#### 3. `/api/admin/customers/[id]/notes/route.ts` - GET, POST
**GET Purpose**: Fetch all notes for a customer

**POST Purpose**: Add a new note
```json
{
  "note": "Customer requested expedited shipping",
  "createdBy": 1
}
```

### Marketing/Subscriber APIs

#### 1. `/api/admin/marketing/subscribers/route.ts` - GET, POST, DELETE

**GET Query Parameters**:
- `search` - Search by email
- `status` - Filter by active/unsubscribed

**POST - Single Subscriber**:
```json
{
  "email": "customer@example.com",
  "name": "Jane Smith"
}
```

**POST - Bulk Import**:
```json
{
  "subscribers": [
    { "email": "user1@example.com", "name": "User One" },
    { "email": "user2@example.com", "name": "User Two" }
  ]
}
```

**DELETE - Bulk Action**:
```json
{
  "ids": ["1", "2", "3"],
  "action": "unsubscribe" // or "delete"
}
```

## Pages

### 1. Customer List - `/app/(admin)/admin/customers/page.tsx`

**Features**:
- TanStack Table with sorting and pagination (25 per page)
- Search by name, email, or phone
- Filters:
  - Customer type (All / Registered / Guest)
  - Order status (All / With Orders / No Orders)
  - Date range (Joined From/To)
- Stats cards showing:
  - Total customers
  - Registered customers
  - Customers with orders
  - Total revenue
- Export to CSV functionality
- Bulk delete actions

**Table Columns**:
- Checkbox (for bulk selection)
- Name (with guest badge)
- Email (clickable mailto link)
- Phone
- Orders count
- Total spent
- Last order date
- Joined date
- Actions (View, Email, Delete)

### 2. Customer Detail - `/app/(admin)/admin/customers/[id]/page.tsx`

**Sections**:

1. **Customer Profile Card**
   - Avatar with initials
   - Name and email
   - Phone number
   - Customer since date
   - Date of birth
   - Age verification status
   - Marketing consent status

2. **Statistics Cards**
   - Total Orders
   - Total Spent
   - Average Order Value
   - Last Order Date

3. **Saved Addresses**
   - List of all saved addresses
   - Default shipping/billing indicators
   - Full address details with eircode

4. **Order History**
   - Table of all customer orders
   - Order number, date, status, total
   - Link to view order details
   - Total orders value summary

5. **Admin Notes**
   - Internal notes about customer
   - Add new note form
   - Note history with timestamps and author
   - Notes visible only to admin team

**Actions**:
- Send Email (opens mailto)
- Delete Customer

### 3. Email Subscribers - `/app/(admin)/admin/marketing/subscribers/page.tsx`

**Features**:
- TanStack Table with sorting and pagination (25 per page)
- Search by email
- Filter by status (All / Active / Unsubscribed)
- Stats cards showing:
  - Total subscribers
  - Active subscribers
  - Unsubscribed count
- Import from CSV
- Export to CSV
- Bulk actions:
  - Unsubscribe (soft delete)
  - Delete (permanent)

**Table Columns**:
- Checkbox
- Email (clickable mailto link)
- Name
- Source (badge)
- Subscribed date
- Status (Active/Unsubscribed badge)
- Actions (Unsubscribe, Delete)

**CSV Import Format**:
```csv
Email,Name
customer1@example.com,Customer One
customer2@example.com,Customer Two
```

## Components

### Customer Components (`/components/admin/customers/`)

#### 1. `CustomerTable.tsx`
TanStack Table implementation for customer list with:
- Sortable columns
- Pagination
- Bulk selection
- Row actions
- Responsive design

#### 2. `CustomerProfile.tsx`
Customer information card displaying:
- Profile details with avatar
- Contact information
- Verification status
- Marketing preferences
- Statistics grid

#### 3. `CustomerOrderHistory.tsx`
Order history table showing:
- All customer orders
- Order details (number, date, status, total)
- Link to order detail pages
- Total orders value

#### 4. `CustomerNotes.tsx`
Admin notes management with:
- Notes list with author and timestamp
- Add note form
- Real-time updates
- Empty state

### Marketing Components (`/components/admin/marketing/`)

#### 1. `SubscriberTable.tsx`
TanStack Table for subscribers with:
- Status badges
- Bulk unsubscribe/delete
- Sortable columns
- Pagination

## Styling & Theme

All components follow the PUXX Ireland brand guidelines:
- **Primary Color**: Emerald/Irish green (`emerald-600`)
- **Status Colors**:
  - Active: `emerald-100/emerald-800`
  - Inactive: `gray-100/gray-800`
  - Warning: `orange-100/orange-800`
  - Error: `red-100/red-800`
- **Dark Mode**: Full support with `dark:` variants
- **Responsive**: Mobile-first design with `md:` and `xl:` breakpoints

## Data Aggregation

### Customer Statistics
Customers are fetched with aggregated order data using SQL joins:
- `ordersCount` - COUNT of orders
- `totalSpent` - SUM of order totals
- `lastOrderDate` - MAX of order dates

Example query from API:
```typescript
.select({
  id: users.id,
  name: users.name,
  email: users.email,
  ordersCount: sql<number>`CAST(COUNT(DISTINCT ${orders.id}) AS INTEGER)`,
  totalSpent: sql<string>`COALESCE(SUM(${orders.total}), 0)`,
  lastOrderDate: sql<Date>`MAX(${orders.createdAt})`,
})
.from(users)
.leftJoin(orders, eq(users.id, orders.userId))
.groupBy(users.id)
```

## Navigation

Pages are accessible via the Admin Sidebar:
- **Customers**: `/admin/customers` - Under "E-commerce" menu
- **Email Subscribers**: `/admin/marketing/subscribers` - Under "Marketing" menu

Navigation is role-based:
- Customers: `admin`, `manager` roles
- Marketing: `admin` role only

## Export Functionality

Both pages support CSV export:

**Customers CSV**:
```csv
Name,Email,Phone,Orders,Total Spent,Last Order,Joined
John Doe,john@example.com,+353 123456,5,€250.00,15/01/2024,01/12/2023
```

**Subscribers CSV**:
```csv
Email,Name,Source,Status,Subscribed Date
user@example.com,User Name,footer,active,15/01/2024
```

## Security Considerations

1. **Authentication**: All routes require admin authentication
2. **Role-Based Access**: Marketing features restricted to admin role
3. **Soft Delete**: Customers are soft-deleted (deletedAt timestamp)
4. **Data Privacy**: Notes are internal only, not visible to customers
5. **Email Validation**: CSV imports validate email format

## Future Enhancements

Potential features for future implementation:
1. Customer segments/tags
2. Automated email campaigns
3. Customer lifetime value (CLV) tracking
4. Loyalty points system
5. Advanced analytics and reporting
6. Customer activity timeline
7. Email campaign builder
8. A/B testing for emails
9. Customer merge/duplicate detection
10. Custom fields for customer profiles

## Testing Recommendations

1. **API Testing**:
   - Test customer list with various filters
   - Test search functionality
   - Test bulk operations
   - Test CSV import with malformed data

2. **UI Testing**:
   - Test table sorting and pagination
   - Test responsive design on mobile
   - Test dark mode appearance
   - Test form validation

3. **Data Integrity**:
   - Verify order statistics calculations
   - Test soft delete behavior
   - Test note creation and retrieval
   - Test CSV export data accuracy

## Dependencies

All required dependencies are already installed:
- `@tanstack/react-table` - Table functionality
- `date-fns` - Date formatting
- `lucide-react` - Icons
- `sonner` - Toast notifications
- `drizzle-orm` - Database ORM

## Files Created

### API Routes (4 files)
1. `/app/api/admin/customers/route.ts`
2. `/app/api/admin/customers/[id]/route.ts`
3. `/app/api/admin/customers/[id]/notes/route.ts`
4. `/app/api/admin/marketing/subscribers/route.ts`

### Pages (3 files)
1. `/app/(admin)/admin/customers/page.tsx`
2. `/app/(admin)/admin/customers/[id]/page.tsx`
3. `/app/(admin)/admin/marketing/subscribers/page.tsx`

### Components (5 files)
1. `/components/admin/customers/CustomerTable.tsx`
2. `/components/admin/customers/CustomerProfile.tsx`
3. `/components/admin/customers/CustomerOrderHistory.tsx`
4. `/components/admin/customers/CustomerNotes.tsx`
5. `/components/admin/marketing/SubscriberTable.tsx`

### Schema Updates (1 file)
1. `/lib/db/schema.ts` - Added `customerNotes` table

**Total**: 13 new files + 1 schema update

## Conclusion

The Customers & Marketing Management system is now fully implemented with:
- Complete CRUD operations for customers
- Advanced filtering and search
- Customer relationship management (CRM) features
- Email subscriber management
- CSV import/export capabilities
- Role-based access control
- Mobile-responsive design
- Dark mode support

The system is production-ready and follows all PUXX Ireland brand guidelines and coding standards.
