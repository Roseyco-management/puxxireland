# Worldpay Integration Guide for PUXX Ireland

This guide covers integrating Worldpay payment processing into the PUXX Ireland e-commerce platform.

---

## Overview

**Payment Processor**: Worldpay
**Domain**: puxxnicotine.ie
**Currency**: EUR (Euro)
**Age Verification**: 18+ required for all transactions

---

## Worldpay Business Gateway Options

Worldpay offers several integration methods:

### 1. **Worldpay Business Gateway** (Recommended for Small Business)
- Hosted payment pages
- PCI compliance handled by Worldpay
- Quick setup
- Lower development costs
- Good for starting out

### 2. **Worldpay Corporate Gateway** (Enterprise)
- Full API integration
- Complete customization
- Higher transaction volumes
- More complex setup

### 3. **Worldpay Total** (All-in-one)
- Payment processing + merchant account
- Faster setup
- Competitive rates

**Recommendation**: Start with **Worldpay Business Gateway** for fastest launch, then upgrade to Corporate Gateway if needed for custom checkout experience.

---

## Account Setup

### Step 1: Create Worldpay Account

1. Visit [Worldpay.com](https://www.worldpay.com) or [Worldpay UK](https://www.worldpay.com/en-gb)
2. Choose "Worldpay Business Gateway"
3. Complete merchant application:
   - Business details
   - Director information
   - Bank account details
   - Estimated transaction volumes

### Step 2: Age-Restricted Products Declaration

**Important**: Nicotine pouches are age-restricted (18+)

When setting up your account:
- Declare that you sell age-restricted products
- Implement age verification at checkout
- May require additional documentation
- Higher processing fees may apply

### Step 3: Get Credentials

Once approved, retrieve from Worldpay Dashboard:
- **Merchant Code**: Your unique merchant identifier
- **Installation ID**: Identifies your installation
- **XML Password / MD5 Secret**: For transaction security
- **Test Credentials**: For sandbox testing

Add to `.env`:
```bash
WORLDPAY_MERCHANT_CODE=YOUR_MERCHANT_CODE
WORLDPAY_INSTALLATION_ID=YOUR_INSTALLATION_ID
WORLDPAY_SECRET_KEY=YOUR_MD5_SECRET
WORLDPAY_TEST_MODE=true
```

---

## Integration Methods

### Option A: Hosted Payment Pages (Easiest)

**How it works**:
1. Customer completes cart on puxxnicotine.ie
2. Redirects to Worldpay hosted payment page
3. Customer enters card details on Worldpay's secure page
4. Worldpay processes payment
5. Customer redirected back to puxxnicotine.ie with success/failure

**Pros**:
- No PCI compliance burden
- Quick to implement
- Worldpay handles security
- Less development required

**Cons**:
- Customer leaves your site
- Less control over payment UX
- Limited customization

**Implementation**:
```typescript
// lib/payments/worldpay.ts
export async function createHostedPayment(order: Order) {
  const paymentData = {
    merchantCode: process.env.WORLDPAY_MERCHANT_CODE,
    amount: order.total * 100, // Convert to cents
    currency: 'EUR',
    orderCode: order.orderNumber,
    orderDescription: `PUXX Ireland Order #${order.orderNumber}`,
    successURL: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    failureURL: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
    cancelURL: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
  };

  // Redirect to Worldpay hosted page
  const paymentURL = generateWorldpayURL(paymentData);
  return paymentURL;
}
```

### Option B: Server-to-Server API (More Control)

**How it works**:
1. Customer enters card details on your site
2. Your server sends payment request to Worldpay API
3. Worldpay processes and returns result
4. You display success/failure to customer

**Pros**:
- Customer stays on your site
- Full UX control
- Better for conversions

**Cons**:
- Requires PCI compliance (SAQ A-EP or SAQ D)
- More complex implementation
- Need SSL certificate
- Higher development costs

**Implementation**:
```typescript
// lib/payments/worldpay-api.ts
import axios from 'axios';

const WORLDPAY_API_URL = process.env.WORLDPAY_TEST_MODE
  ? 'https://secure-test.worldpay.com/jsp/merchant/xml/paymentService.jsp'
  : 'https://secure.worldpay.com/jsp/merchant/xml/paymentService.jsp';

export async function processPayment(paymentDetails: PaymentDetails) {
  const xmlRequest = `
    <?xml version="1.0"?>
    <!DOCTYPE paymentService PUBLIC "-//WorldPay//DTD WorldPay PaymentService v1//EN"
      "http://dtd.worldpay.com/paymentService_v1.dtd">
    <paymentService version="1.4" merchantCode="${process.env.WORLDPAY_MERCHANT_CODE}">
      <submit>
        <order orderCode="${paymentDetails.orderCode}">
          <description>${paymentDetails.description}</description>
          <amount value="${paymentDetails.amount}" currencyCode="EUR" exponent="2"/>
          <paymentDetails>
            <CARD-SSL>
              <cardNumber>${paymentDetails.cardNumber}</cardNumber>
              <expiryDate>
                <date month="${paymentDetails.expMonth}" year="${paymentDetails.expYear}"/>
              </expiryDate>
              <cardHolderName>${paymentDetails.cardHolderName}</cardHolderName>
              <cvc>${paymentDetails.cvc}</cvc>
            </CARD-SSL>
          </paymentDetails>
          <shopper>
            <shopperEmailAddress>${paymentDetails.email}</shopperEmailAddress>
          </shopper>
        </order>
      </submit>
    </paymentService>
  `;

  const response = await axios.post(WORLDPAY_API_URL, xmlRequest, {
    auth: {
      username: process.env.WORLDPAY_MERCHANT_CODE!,
      password: process.env.WORLDPAY_SECRET_KEY!,
    },
    headers: {
      'Content-Type': 'text/xml',
    },
  });

  return parseWorldpayResponse(response.data);
}
```

### Option C: Worldpay Frames (Best of Both Worlds)

**How it works**:
- Embed Worldpay iframe on your checkout page
- Card details entered in iframe (PCI handled by Worldpay)
- Your server processes payment via API
- Customer never leaves your site

**Pros**:
- PCI compliance simplified (SAQ A)
- Customer stays on site
- Good UX control
- Secure

**Cons**:
- Moderate complexity
- Still need some server-side integration

---

## Recommended Architecture for PUXX Ireland

### Phase 1: Launch (Use Hosted Pages)
- Start with Worldpay Business Gateway hosted pages
- Fastest time to market
- Lowest development cost
- Focus on getting sales

### Phase 2: Optimize (Migrate to Frames)
- Once established, implement Worldpay Frames
- Keep customers on site
- Improve conversion rates
- Maintain PCI compliance simplicity

### Phase 3: Scale (Full API if needed)
- Only if transaction volume justifies it
- Full customization
- Advanced features (subscriptions, recurring, etc.)

---

## Implementation Checklist

### Week 4 Tasks

- [ ] Sign up for Worldpay Business Gateway account
- [ ] Complete merchant application
- [ ] Declare age-restricted products
- [ ] Get test credentials
- [ ] Configure environment variables
- [ ] Build shopping cart page
- [ ] Implement cart functionality (add/remove/update)
- [ ] Create checkout page with:
  - [ ] Order summary
  - [ ] Shipping address form
  - [ ] Age verification (18+) checkbox
  - [ ] Terms acceptance
- [ ] Integrate Worldpay hosted payment page:
  - [ ] Generate payment URL with order details
  - [ ] Redirect to Worldpay
  - [ ] Handle success/failure callbacks
  - [ ] Update order status in database
- [ ] Create order confirmation page
- [ ] Send order confirmation email
- [ ] Test full checkout flow

### Security Requirements

- [ ] SSL certificate installed (HTTPS required)
- [ ] Age verification at checkout (18+)
- [ ] Secure order processing
- [ ] Payment callback verification
- [ ] Order tampering prevention (hash verification)
- [ ] GDPR compliance for payment data

---

## Testing

### Test Mode

Worldpay provides test credentials and test card numbers:

**Test Card Numbers**:
- **Successful Payment**: 4444 3333 2222 1111
- **Declined**: 4444 3333 2222 2222
- **3D Secure**: 4917 3010 0000 0009

**Test Details**:
- CVV: Any 3 digits
- Expiry: Any future date
- Name: Any name

### Test Checklist

- [ ] Successful payment flow
- [ ] Declined payment handling
- [ ] 3D Secure authentication
- [ ] Order confirmation email sent
- [ ] Order saved to database correctly
- [ ] Inventory updated
- [ ] Age verification enforced
- [ ] Callback URL handling
- [ ] Error handling (network failures, timeouts)

---

## Transaction Fees

Worldpay typical fees (confirm with your account manager):
- **Transaction Fee**: 1.5% - 3.5% per transaction
- **Monthly Fee**: £0 - £25
- **Setup Fee**: £0 - £100 (often waived)
- **Chargeback Fee**: £15 - £25 per chargeback

**Age-Restricted Products**: May incur higher fees or additional verification costs.

---

## Age Verification Integration

Since PUXX products are 18+, you must:

1. **Checkout Page**: Require checkbox: "I confirm I am 18 years or older"
2. **Database**: Store age verification consent
3. **Order Processing**: Block order if not verified
4. **Delivery**: Include 18+ signature requirement in shipping

Optional: Integrate third-party age verification:
- **AgeChecked** (UK/Ireland)
- **Yoti** (Digital ID verification)
- **GBG Trust ID**

---

## Post-Payment Webhooks

Worldpay sends payment notifications via HTTP POST:

```typescript
// app/api/worldpay/webhook/route.ts
export async function POST(request: Request) {
  const data = await request.formData();

  const orderCode = data.get('orderCode');
  const transStatus = data.get('transStatus');
  const rawAuthMessage = data.get('rawAuthMessage');

  // Verify callback authenticity
  if (!verifyWorldpayCallback(data)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Update order in database
  if (transStatus === 'Y') {
    await updateOrderStatus(orderCode, 'paid');
    await sendOrderConfirmation(orderCode);
  } else {
    await updateOrderStatus(orderCode, 'failed');
  }

  return new Response('OK', { status: 200 });
}
```

---

## Support & Documentation

- **Worldpay Developer Portal**: https://developer.worldpay.com
- **Support Phone**: 0800 096 3736 (UK)
- **Email**: merchantservices@worldpay.com
- **Integration Guides**: Available in Worldpay merchant dashboard
- **Test Environment**: https://secure-test.worldpay.com

---

## Next Steps

1. **Sign up** for Worldpay Business Gateway
2. **Get test credentials** from dashboard
3. **Add to .env** file
4. **Build cart & checkout** pages (Week 4)
5. **Integrate hosted payment** page
6. **Test thoroughly** with test cards
7. **Go live** with production credentials

Once Week 4 implementation begins, this guide will be updated with actual code examples and complete integration details.

---

**Last Updated**: December 12, 2025
**Status**: Ready for Week 4 Implementation
