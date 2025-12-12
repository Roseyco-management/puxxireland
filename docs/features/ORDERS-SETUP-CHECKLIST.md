# Orders Management System - Setup & Testing Checklist

## Pre-requisites

### 1. Database Setup
- [ ] Verify `orders` table exists in Supabase
- [ ] Verify `order_items` table exists
- [ ] Verify `products` table exists
- [ ] Check that relationships are set up correctly
- [ ] Ensure sample data exists (or create test orders)

### 2. Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] Test Supabase connection works

### 3. Dependencies
```bash
# Verify these are installed
pnpm list @tanstack/react-table  # Should be ^8.21.3
pnpm list jspdf                  # Should be ^3.0.4
pnpm list lucide-react           # Should be ^0.511.0
pnpm list sonner                 # Should be ^2.0.7
```

## Installation Steps

### 1. Verify All Files Exist

Run this command to check:
```bash
ls -la /Users/baileybarry/PuxxIreland/lib/types/orders.ts
ls -la /Users/baileybarry/PuxxIreland/lib/utils/invoice-generator.ts
ls -la /Users/baileybarry/PuxxIreland/components/admin/orders/
ls -la /Users/baileybarry/PuxxIreland/app/api/admin/orders/
ls -la /Users/baileybarry/PuxxIreland/app/\(admin\)/admin/orders/
```

Expected output: All files should exist with no errors.

### 2. Start Development Server

```bash
cd /Users/baileybarry/PuxxIreland
pnpm dev
```

Server should start on http://localhost:3000

### 3. Access Admin Dashboard

1. Navigate to http://localhost:3000/admin
2. Ensure you're logged in as admin
3. Look for "Orders" in the sidebar/navigation

## Testing Checklist

### Orders List Page (`/admin/orders`)

#### Basic Functionality
- [ ] Page loads without errors
- [ ] Orders table displays
- [ ] Statistics cards show correct counts
- [ ] Loading spinner appears initially

#### Table Features
- [ ] Orders display in table
- [ ] All columns visible (Order #, Date, Customer, Items, Total, Payment, Status, Actions)
- [ ] Click on row navigates to detail page
- [ ] Pagination controls work (Previous/Next)
- [ ] Page shows correct order count

#### Sorting
- [ ] Click Order # column header - sorts alphabetically
- [ ] Click Date column header - sorts by date
- [ ] Click Total column header - sorts by amount
- [ ] Sort direction toggles (asc/desc)
- [ ] Icons change (ChevronUp/Down/UpDown)

#### Filtering
- [ ] Search box filters by order number
- [ ] Search box filters by customer name
- [ ] Search box filters by email
- [ ] Status filter dropdown works
- [ ] Payment status filter dropdown works
- [ ] Date range filter works:
  - [ ] Today
  - [ ] Last 7 Days
  - [ ] Last 30 Days
  - [ ] Custom (shows date pickers)
- [ ] Custom date range selects specific dates
- [ ] Filters combine correctly

#### Actions
- [ ] Refresh button reloads orders
- [ ] Export CSV button downloads file
- [ ] CSV contains filtered data
- [ ] CSV filename includes date
- [ ] View icon (eye) navigates to detail
- [ ] Print icon opens invoice in new tab

#### Status Badges
- [ ] Pending shows yellow badge
- [ ] Processing shows blue badge
- [ ] Shipped shows emerald badge
- [ ] Delivered shows green badge
- [ ] Cancelled shows red badge
- [ ] Refunded shows gray badge

### Order Detail Page (`/admin/orders/[id]`)

#### Navigation
- [ ] Back button returns to orders list
- [ ] URL shows correct order ID
- [ ] Page loads order data
- [ ] Loading spinner shows initially

#### Order Header
- [ ] Order number displays correctly
- [ ] Order date formatted properly (Irish locale)
- [ ] Print Invoice button visible

#### Status Section
- [ ] Current status badge displays
- [ ] Status dropdown shows all options
- [ ] Changing status enables Update button
- [ ] Update button shows loading state
- [ ] Toast notification on success
- [ ] Status updates in UI after save

#### Order Items
- [ ] All items display
- [ ] Product images load (or show placeholder)
- [ ] Product names correct
- [ ] SKUs display
- [ ] Quantities correct
- [ ] Prices formatted as €X.XX
- [ ] Line totals calculated correctly

#### Order Summary
- [ ] Subtotal correct
- [ ] Shipping cost displays
- [ ] Tax (23%) calculated
- [ ] Discount shows (if applicable)
- [ ] Total highlighted in emerald
- [ ] All amounts formatted as €X.XX

#### Payment Information
- [ ] Payment method displays
- [ ] Payment status shows
- [ ] Transaction ID present (if available)
- [ ] Layout clean and readable

#### Customer Information
- [ ] Customer name displays
- [ ] Email address shows
- [ ] Phone number shows (if available)
- [ ] Information formatted nicely

#### Shipping Address
- [ ] Full address displays
- [ ] City and postcode show
- [ ] Country displays
- [ ] Address formatted properly

#### Order Timeline
- [ ] Timeline displays vertically
- [ ] Icons appropriate for each status
- [ ] Dates formatted correctly
- [ ] Emerald line shows progress
- [ ] Completed items highlighted
- [ ] Future items grayed out
- [ ] Notes display for events

#### Admin Notes
- [ ] Textarea shows existing notes
- [ ] Can type new notes
- [ ] Save button works
- [ ] Toast notification on save
- [ ] Notes persist after refresh

### Invoice PDF (`/api/admin/orders/[id]/invoice`)

#### Generation
- [ ] PDF generates without errors
- [ ] Opens in new browser tab
- [ ] Can be downloaded
- [ ] Filename includes order number

#### Content
- [ ] PUXX Ireland logo/header (emerald green)
- [ ] Company information present
- [ ] Invoice number matches order number
- [ ] Invoice date correct
- [ ] Customer billing info complete
- [ ] All order items listed
- [ ] Quantities and prices correct
- [ ] Subtotal, shipping, tax shown
- [ ] Total highlighted
- [ ] Payment info included
- [ ] Footer with terms & conditions

#### Formatting
- [ ] Professional layout
- [ ] Proper alignment
- [ ] Readable fonts
- [ ] Good spacing
- [ ] Brand colors used
- [ ] No text overlap
- [ ] Multi-page if needed

### CSV Export (`/api/admin/orders/export`)

#### Export Functionality
- [ ] CSV downloads immediately
- [ ] Filename includes date
- [ ] Opens in spreadsheet apps
- [ ] All columns present

#### Data Accuracy
- [ ] All orders included (or filtered subset)
- [ ] Order numbers correct
- [ ] Dates formatted properly
- [ ] Customer info complete
- [ ] Addresses full
- [ ] Item counts accurate
- [ ] Amounts match dashboard
- [ ] Payment info included
- [ ] Status values correct

#### CSV Formatting
- [ ] Headers clear
- [ ] Commas escaped properly
- [ ] Quotes handled correctly
- [ ] No broken rows
- [ ] UTF-8 encoding

### API Routes

#### GET /api/admin/orders
- [ ] Returns orders array
- [ ] Includes order items
- [ ] Filters work correctly
- [ ] Pagination info included
- [ ] Unauthorized without login
- [ ] Proper error handling

#### GET /api/admin/orders/[id]
- [ ] Returns single order
- [ ] Includes all items
- [ ] Includes product images
- [ ] 404 for invalid ID
- [ ] Unauthorized without login

#### PATCH /api/admin/orders/[id]
- [ ] Updates order status
- [ ] Saves admin notes
- [ ] Returns updated order
- [ ] Sets completed_at when delivered
- [ ] Validates input
- [ ] Unauthorized without login

#### GET /api/admin/orders/export
- [ ] Returns CSV file
- [ ] Respects filters
- [ ] Proper headers
- [ ] Downloadable
- [ ] Unauthorized without login

#### GET /api/admin/orders/[id]/invoice
- [ ] Returns PDF
- [ ] Proper content-type
- [ ] Inline display
- [ ] 404 for invalid ID
- [ ] Unauthorized without login

### Responsive Design

#### Desktop (1920px)
- [ ] Full layout displays
- [ ] Sidebar visible
- [ ] Table readable
- [ ] All columns fit

#### Tablet (768px)
- [ ] Layout adapts
- [ ] Filters stack if needed
- [ ] Table scrolls horizontally
- [ ] Detail page readable

#### Mobile (375px)
- [ ] Fully responsive
- [ ] Filters stack vertically
- [ ] Table scrolls
- [ ] Touch targets adequate
- [ ] Text readable
- [ ] No horizontal scroll (page)

### Dark Mode

- [ ] Toggle dark mode
- [ ] All components adapt
- [ ] Colors readable
- [ ] Contrast adequate
- [ ] Badges visible
- [ ] No white flashes

### Performance

- [ ] Page loads quickly (<2s)
- [ ] No console errors
- [ ] No console warnings
- [ ] Images lazy load
- [ ] Smooth scrolling
- [ ] Transitions smooth
- [ ] No layout shifts

### Error Handling

#### Network Errors
- [ ] Toast on fetch failure
- [ ] Graceful degradation
- [ ] Retry option available

#### Invalid Data
- [ ] Empty states show
- [ ] "No orders found" message
- [ ] "Order not found" page

#### Auth Errors
- [ ] Redirects to login
- [ ] Shows error message
- [ ] Maintains return URL

### Accessibility

- [ ] Keyboard navigation works
- [ ] Tab order logical
- [ ] Focus visible
- [ ] ARIA labels present
- [ ] Screen reader friendly
- [ ] Color not sole indicator
- [ ] Sufficient contrast

## Common Issues & Solutions

### Orders Not Loading
**Problem**: Blank table or loading spinner forever
**Solution**:
1. Check browser console for errors
2. Verify Supabase connection in .env
3. Check if orders exist in database
4. Verify authentication is working

### Invoice Not Generating
**Problem**: PDF fails to generate or blank
**Solution**:
1. Check console for jsPDF errors
2. Verify order has items
3. Check all required fields present
4. Test with different orders

### Filters Not Working
**Problem**: Filters don't affect results
**Solution**:
1. Check API route receives params
2. Verify Supabase query applies filters
3. Check state updates correctly
4. Test each filter individually

### Status Updates Failing
**Problem**: Status doesn't save
**Solution**:
1. Check PATCH API route
2. Verify authentication
3. Check Supabase permissions
4. Review error in console

## Post-Testing

### Production Checklist
- [ ] All tests passed
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile tested
- [ ] Dark mode tested
- [ ] Accessibility checked
- [ ] Error states handled

### Optional Enhancements
- [ ] Add email notifications
- [ ] Implement real-time updates
- [ ] Add tracking numbers
- [ ] Create analytics
- [ ] Add bulk actions

## Support

If issues persist:
1. Check documentation in `/docs/features/`
2. Review component source code
3. Verify database schema
4. Test with sample data
5. Check Supabase logs

## Success Criteria

All checkboxes above should be checked before considering the Orders Management System production-ready.
