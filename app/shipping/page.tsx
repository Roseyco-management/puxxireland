import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Package, RotateCcw, MapPin, Clock, Shield, Mail } from 'lucide-react';
import { PageHeader } from '@/components/static-pages/page-header';
import { Breadcrumbs } from '@/components/static-pages/breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Shipping & Returns | PUXX Ireland',
  description:
    'Learn about PUXX Ireland shipping policies, delivery times, and our 30-day return policy. Free shipping on orders over €150.',
  openGraph: {
    title: 'Shipping & Returns - PUXX Ireland',
    description: 'Fast delivery across Ireland with easy returns',
  },
};

const shippingOptions = [
  {
    icon: Truck,
    title: 'Standard Shipping',
    description: 'Free on orders over €150',
    details: ['3-5 business days', '€5.95 flat rate', 'Track your order online'],
  },
  {
    icon: Package,
    title: 'Express Shipping',
    description: 'Get your order faster',
    details: ['1-2 business days', '€12.95 flat rate', 'Priority handling'],
  },
];

const deliverySteps = [
  {
    step: 1,
    title: 'Order Placed',
    description: 'You place your order and receive confirmation email',
  },
  {
    step: 2,
    title: 'Processing',
    description: 'We prepare your order for shipment (1 business day)',
  },
  {
    step: 3,
    title: 'Dispatched',
    description: 'Your order ships with tracking number provided',
  },
  {
    step: 4,
    title: 'Delivery',
    description: 'Age verification required - must be 18+ to receive',
  },
];

const returnSteps = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Email hello@puxx.ie within 30 days of delivery',
  },
  {
    step: 2,
    title: 'Get Authorization',
    description: 'Receive return authorization and shipping instructions',
  },
  {
    step: 3,
    title: 'Ship Product',
    description: 'Return unopened products in original packaging',
  },
  {
    step: 4,
    title: 'Receive Refund',
    description: 'Get full refund within 5-7 business days of receipt',
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title="Shipping & Returns"
        description="Fast delivery across Ireland with hassle-free returns"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Shipping & Returns' }]} />

        {/* Shipping Information Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading text-foreground mb-4">Shipping Information</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver premium nicotine pouches to your door across Ireland with secure, tracked
              shipping.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-card border-2 border-primary/20 rounded-lg p-8 hover:border-primary transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-2">{option.title}</h3>
                <p className="text-primary font-semibold mb-4">{option.description}</p>
                <ul className="space-y-2">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Delivery Coverage */}
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-2">Ireland-Wide</h3>
                  <p className="text-muted-foreground">
                    We deliver to all addresses in the Republic of Ireland
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-2">Order Cutoff</h3>
                  <p className="text-muted-foreground">
                    Orders placed before 2 PM ship same business day
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-2">Age Verified</h3>
                  <p className="text-muted-foreground">
                    All deliveries require 18+ age verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading text-foreground mb-4">Delivery Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your order from purchase to your doorstep
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {deliverySteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-heading text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < deliverySteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-primary"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded">
            <div className="flex gap-3">
              <Shield className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-foreground font-semibold mb-1">Age Verification Required</h4>
                <p className="text-sm text-muted-foreground">
                  A person aged 18 or over must be present to receive the delivery. Valid photo ID
                  may be requested. If no adult is available, the package will be returned to the
                  depot for collection or redelivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Partners */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-heading text-foreground text-center mb-8">
              Our Shipping Partners
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">An Post</div>
                <p className="text-muted-foreground">Ireland's trusted postal service</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">DPD</div>
                <p className="text-muted-foreground">Fast parcel delivery</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Fastway</div>
                <p className="text-muted-foreground">Express courier service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <RotateCcw className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-heading text-foreground mb-4">Returns Policy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We want you to be completely satisfied. That's why we offer a 30-day return policy.
            </p>
          </div>

          {/* Return Eligibility */}
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-8">
            <h3 className="text-2xl font-heading text-foreground mb-6">What Can Be Returned?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border-2 border-primary/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <h4 className="text-lg font-heading text-foreground">Eligible for Return</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Unopened products in original packaging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Products in resalable condition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Returned within 30 days of delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Proof of purchase provided</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border-2 border-destructive/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✗</span>
                  </div>
                  <h4 className="text-lg font-heading text-foreground">Not Eligible</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Opened nicotine pouches (health & safety)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Damaged packaging (unless our fault)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Products past 30-day return window</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Products without proof of purchase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading text-foreground mb-6 text-center">
              How to Return Your Order
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {returnSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-card border border-border rounded-lg p-6 h-full">
                    <div className="w-12 h-12 bg-primary/10 border-2 border-primary text-primary rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-lg font-heading text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {index < returnSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-0.5 bg-primary/30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-heading text-foreground mb-4">Refund Information</h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span>
                  Refunds are processed within 5-7 business days after we receive your return
                </span>
              </p>
              <p className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span>Refunds are issued to the original payment method</span>
              </p>
              <p className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span>
                  You'll receive an email confirmation when your refund is processed
                </span>
              </p>
              <p className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span>
                  Return shipping costs are the customer's responsibility unless the product was
                  damaged or defective
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Damaged or Missing Items */}
        <section className="mb-16">
          <div className="bg-gradient-emerald rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <Mail className="h-20 w-20 text-white/90" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-heading mb-4">Damaged or Missing Items?</h2>
                <p className="text-white/90 mb-4">
                  If your order arrives damaged or has missing items, we'll make it right
                  immediately.
                </p>
                <ul className="space-y-2 text-white/90 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>
                      Contact us within 48 hours of delivery at{' '}
                      <strong className="text-white">hello@puxx.ie</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>Provide photos of the damaged packaging/product</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Include your order number</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>We'll send a replacement or full refund - no return needed</span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <Link href="mailto:hello@puxx.ie">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section>
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-heading text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Check our FAQ page or contact our customer support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-emerald hover:opacity-90">
                <Link href="/faq">View FAQs</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="mailto:hello@puxx.ie">Email Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
