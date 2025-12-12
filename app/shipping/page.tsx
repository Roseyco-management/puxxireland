import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Package, RotateCcw, MapPin, Clock, Shield, Mail } from 'lucide-react';
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
    description: 'Email hello@puxxnicotine.ie within 30 days of delivery',
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
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-irish">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Truck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">
            Shipping & Returns
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Fast, secure delivery across Ireland with our hassle-free 30-day return policy
          </p>
          <div className="flex flex-wrap items-center gap-8 justify-center text-base lg:text-lg text-white/90">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-white" />
              <span className="font-medium">Free Over €150</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-white" />
              <span className="font-medium">3-5 Day Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-6 w-6 text-white" />
              <span className="font-medium">30-Day Returns</span>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Shipping & Returns' }]} />

        {/* Shipping Information Section */}
        <section className="mb-20 lg:mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-foreground mb-6">
              Shipping Information
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver premium nicotine pouches to your door across Ireland with secure, tracked
              shipping.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-card border-2 border-primary/20 rounded-2xl p-8 lg:p-10 hover:border-primary hover:shadow-lg transition-all group"
              >
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl gradient-emerald mb-6 group-hover:scale-110 transition-transform">
                  <option.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading text-foreground mb-3">{option.title}</h3>
                <p className="text-lg text-primary font-semibold mb-6">{option.description}</p>
                <ul className="space-y-3">
                  {option.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-base text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Delivery Coverage */}
          <div className="bg-muted/30 rounded-2xl p-10 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-heading text-foreground mb-3">Ireland-Wide</h3>
                <p className="text-base text-muted-foreground">
                  We deliver to all addresses in the Republic of Ireland
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-heading text-foreground mb-3">Order Cutoff</h3>
                <p className="text-base text-muted-foreground">
                  Orders placed before 2 PM ship same business day
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-emerald mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-heading text-foreground mb-3">Age Verified</h3>
                <p className="text-base text-muted-foreground">
                  All deliveries require 18+ age verification
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="mb-20 lg:mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-foreground mb-6">
              Delivery Process
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your order from purchase to your doorstep
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {deliverySteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-8 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-heading mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">{item.title}</h3>
                  <p className="text-base text-muted-foreground">{item.description}</p>
                </div>
                {index < deliverySteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 transform z-10">
                    <div className="w-8 h-0.5 bg-primary/30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 lg:p-10 bg-amber-50 border-2 border-amber-500/30 rounded-2xl">
            <div className="flex gap-4">
              <Shield className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg lg:text-xl text-foreground font-heading mb-3">Age Verification Required</h4>
                <p className="text-base text-muted-foreground">
                  A person aged 18 or over must be present to receive the delivery. Valid photo ID
                  may be requested. If no adult is available, the package will be returned to the
                  depot for collection or redelivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Partners */}
        <section className="mb-20 lg:mb-24">
          <div className="bg-card border-2 border-primary/10 rounded-3xl p-10 md:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground text-center mb-12">
              Our Shipping Partners
            </h2>
            <div className="grid sm:grid-cols-3 gap-10 lg:gap-12 text-center">
              <div className="group">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">
                  An Post
                </div>
                <p className="text-base text-muted-foreground">Ireland's trusted postal service</p>
              </div>
              <div className="group">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">
                  DPD
                </div>
                <p className="text-base text-muted-foreground">Fast parcel delivery</p>
              </div>
              <div className="group">
                <div className="text-5xl lg:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">
                  Fastway
                </div>
                <p className="text-base text-muted-foreground">Express courier service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy Section */}
        <section className="mb-20 lg:mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full gradient-emerald mx-auto mb-6">
              <RotateCcw className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-foreground mb-6">
              Returns Policy
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              We want you to be completely satisfied. That's why we offer a 30-day return policy.
            </p>
          </div>

          {/* Return Eligibility */}
          <div className="bg-muted/30 rounded-3xl p-10 md:p-12 lg:p-16 mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading text-foreground mb-10 text-center">
              What Can Be Returned?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <div className="bg-card border-2 border-primary/50 rounded-2xl p-8 lg:p-10 hover:border-primary transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full gradient-emerald">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl lg:text-2xl font-heading text-foreground">Eligible for Return</h4>
                </div>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Unopened products in original packaging</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Products in resalable condition</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Returned within 30 days of delivery</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Proof of purchase provided</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border-2 border-destructive/50 rounded-2xl p-8 lg:p-10 hover:border-destructive transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-destructive">
                    <span className="text-white text-2xl">✗</span>
                  </div>
                  <h4 className="text-xl lg:text-2xl font-heading text-foreground">Not Eligible</h4>
                </div>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Opened nicotine pouches (health & safety)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Damaged packaging (unless our fault)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Products past 30-day return window</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Products without proof of purchase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading text-foreground mb-12 text-center">
              How to Return Your Order
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {returnSteps.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary text-2xl font-heading mb-6">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-heading text-foreground mb-3">{item.title}</h4>
                    <p className="text-base text-muted-foreground">{item.description}</p>
                  </div>
                  {index < returnSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 transform z-10">
                      <div className="w-8 h-0.5 bg-primary/30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-card border-2 border-primary/10 rounded-2xl p-10 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-heading text-foreground mb-8">Refund Information</h3>
            <div className="space-y-4 text-base text-muted-foreground">
              <p className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <span>
                  Refunds are processed within 5-7 business days after we receive your return
                </span>
              </p>
              <p className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <span>Refunds are issued to the original payment method</span>
              </p>
              <p className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <span>
                  You'll receive an email confirmation when your refund is processed
                </span>
              </p>
              <p className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <span>
                  Return shipping costs are the customer's responsibility unless the product was
                  damaged or defective
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Damaged or Missing Items */}
        <section className="mb-20 lg:mb-24">
          <div className="relative overflow-hidden bg-gradient-irish rounded-3xl p-10 md:p-12 lg:p-16 text-white">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm">
                  <Mail className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-heading mb-6">Damaged or Missing Items?</h2>
                <p className="text-lg text-white/95 mb-6">
                  If your order arrives damaged or has missing items, we'll make it right
                  immediately.
                </p>
                <ul className="space-y-3 text-base text-white/90 mb-8 max-w-2xl">
                  <li className="flex items-start">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 flex-shrink-0 mr-3 mt-0.5">
                      <span className="font-bold">1</span>
                    </div>
                    <span>
                      Contact us within 48 hours of delivery at{' '}
                      <strong className="text-white">hello@puxxnicotine.ie</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 flex-shrink-0 mr-3 mt-0.5">
                      <span className="font-bold">2</span>
                    </div>
                    <span>Provide photos of the damaged packaging/product</span>
                  </li>
                  <li className="flex items-start">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 flex-shrink-0 mr-3 mt-0.5">
                      <span className="font-bold">3</span>
                    </div>
                    <span>Include your order number</span>
                  </li>
                  <li className="flex items-start">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 flex-shrink-0 mr-3 mt-0.5">
                      <span className="font-bold">4</span>
                    </div>
                    <span>We'll send a replacement or full refund - no return needed</span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
                >
                  <Link href="mailto:hello@puxxnicotine.ie">Contact Support</Link>
                </Button>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="mb-16">
          <div className="bg-muted/30 rounded-3xl p-10 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading text-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Check our FAQ page or contact our customer support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-emerald hover:opacity-90 text-lg px-8">
                <Link href="/faq">View FAQs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="mailto:hello@puxxnicotine.ie">Email Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
