import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { PageHeader } from '@/components/static-pages/page-header';
import { Breadcrumbs } from '@/components/static-pages/breadcrumbs';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | PUXX Ireland',
  description:
    'Find answers to common questions about PUXX Ireland nicotine pouches, ordering, shipping, and more.',
  openGraph: {
    title: 'FAQ - PUXX Ireland',
    description: 'Get answers to your questions about nicotine pouches',
  },
};

// FAQ Data organized by category
const generalFAQs = [
  {
    title: 'What are nicotine pouches?',
    content: (
      <div className="space-y-3">
        <p>
          Nicotine pouches are small, tobacco-free pouches containing nicotine, flavoring, and
          plant-based fibers. They're designed to be placed between your gum and lip, where nicotine
          is absorbed through the oral mucosa.
        </p>
        <p>
          Unlike traditional tobacco products, nicotine pouches are smoke-free, spit-free, and
          completely discreet. They offer a modern alternative for adults who use nicotine.
        </p>
      </div>
    ),
  },
  {
    title: 'Are PUXX products tobacco-free?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Yes, 100% tobacco-free.</strong> All PUXX nicotine pouches contain zero tobacco
          leaf or tobacco-derived ingredients.
        </p>
        <p>
          Our pouches use synthetic or tobacco-free nicotine, combined with food-grade flavorings,
          plant fibers, and pH adjusters for optimal nicotine delivery and taste.
        </p>
      </div>
    ),
  },
  {
    title: 'Who can buy PUXX products?',
    content: (
      <div className="space-y-3">
        <p>
          <strong className="text-primary">
            PUXX products are strictly for adults aged 18 years and over.
          </strong>
        </p>
        <p>
          By law, nicotine products can only be sold to individuals who meet the legal age
          requirement. We implement strict age verification at checkout and upon delivery to ensure
          compliance.
        </p>
        <p>
          Our products are intended for current adult nicotine users and are not suitable for
          pregnant or breastfeeding women, or individuals with certain health conditions.
        </p>
      </div>
    ),
  },
  {
    title: 'How do I use nicotine pouches?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Using nicotine pouches is simple:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Remove one pouch from the can</li>
          <li>Place it between your upper lip and gum</li>
          <li>Leave it in place for 20-60 minutes</li>
          <li>
            You may feel a tingling sensation - this is normal as nicotine is being absorbed
          </li>
          <li>Remove and dispose of the pouch responsibly when finished</li>
        </ol>
        <p className="text-sm italic">
          Tip: Most of our cans have a storage compartment in the lid for used pouches.
        </p>
      </div>
    ),
  },
  {
    title: 'How long does a pouch last?',
    content: (
      <div className="space-y-3">
        <p>
          Most users keep a nicotine pouch in place for <strong>20-60 minutes</strong>. The exact
          duration depends on:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Personal preference</li>
          <li>Nicotine strength of the pouch</li>
          <li>How quickly you want nicotine delivery</li>
          <li>Flavor intensity preference</li>
        </ul>
        <p>
          You can remove the pouch earlier if you've received enough nicotine, or keep it in longer
          for extended flavor and effect. There's no single "correct" duration - it's about what
          works for you.
        </p>
      </div>
    ),
  },
];

const orderingFAQs = [
  {
    title: 'How do I place an order?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Ordering is easy:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Browse our <Link href="/products" className="text-primary hover:underline">products page</Link> and select your favorite flavors
          </li>
          <li>Add products to your cart</li>
          <li>Proceed to checkout</li>
          <li>Complete age verification</li>
          <li>Enter shipping and payment information</li>
          <li>Review and confirm your order</li>
          <li>Receive confirmation email with tracking information</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'What payment methods do you accept?',
    content: (
      <div className="space-y-3">
        <p>We accept the following secure payment methods:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Visa, Mastercard, American Express</li>
          <li>Debit cards (Visa Debit, Mastercard Debit)</li>
          <li>PayPal</li>
          <li>Apple Pay and Google Pay</li>
        </ul>
        <p>
          All transactions are processed through secure, PCI-DSS compliant payment gateways. We
          never store your full payment card details.
        </p>
      </div>
    ),
  },
  {
    title: 'Do you offer discounts or promotions?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Yes!</strong> We regularly offer special promotions and discounts:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Free shipping</strong> on orders over €150
          </li>
          <li>Seasonal sales and holiday promotions</li>
          <li>Email newsletter exclusive offers</li>
          <li>Bulk purchase discounts (coming soon)</li>
          <li>First-time customer welcome offers</li>
        </ul>
        <p>
          Subscribe to our newsletter to receive exclusive deals and be the first to know about new
          flavors and promotions.
        </p>
      </div>
    ),
  },
  {
    title: 'Can I modify or cancel my order?',
    content: (
      <div className="space-y-3">
        <p>
          We process orders quickly to ensure fast delivery, which means modifications can be
          challenging.
        </p>
        <p>
          <strong>To modify or cancel:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Contact us immediately at{' '}
            <a href="mailto:hello@puxxnicotine.ie" className="text-primary hover:underline">
              hello@puxxnicotine.ie
            </a>
          </li>
          <li>Include your order number</li>
          <li>Specify the changes you need</li>
        </ul>
        <p>
          If your order hasn't been dispatched yet (usually within 1 business day), we can often
          make changes or cancel it. Once shipped, you'll need to wait for delivery and follow our{' '}
          <Link href="/shipping" className="text-primary hover:underline">
            return process
          </Link>
          .
        </p>
      </div>
    ),
  },
];

const shippingFAQs = [
  {
    title: 'Where do you ship?',
    content: (
      <div className="space-y-3">
        <p>
          We currently ship to all addresses within the <strong>Republic of Ireland</strong>.
        </p>
        <p>
          We're working on expanding our delivery coverage to Northern Ireland and other EU
          countries. Sign up for our newsletter to be notified when we expand our shipping regions.
        </p>
      </div>
    ),
  },
  {
    title: 'How long does delivery take?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Standard Shipping:</strong> 3-5 business days
        </p>
        <p>
          <strong>Express Shipping:</strong> 1-2 business days
        </p>
        <p>
          Orders placed before 2:00 PM are typically dispatched the same business day. Delivery
          times exclude weekends and public holidays.
        </p>
        <p className="text-sm italic">
          Note: Age verification is required at delivery, which may affect delivery speed if no one
          aged 18+ is available to receive the package.
        </p>
      </div>
    ),
  },
  {
    title: 'Do you offer express shipping?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Yes!</strong> Express shipping is available at checkout for €12.95.
        </p>
        <p>Express shipping offers:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>1-2 business day delivery</li>
          <li>Priority processing and handling</li>
          <li>Premium courier service</li>
          <li>Real-time tracking updates</li>
        </ul>
        <p>
          Perfect when you need your pouches quickly or want to ensure delivery by a specific date.
        </p>
      </div>
    ),
  },
  {
    title: 'How can I track my order?',
    content: (
      <div className="space-y-3">
        <p>
          <strong>Track your order easily:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Check your email for the shipping confirmation message</li>
          <li>Click the tracking link provided</li>
          <li>
            Or visit our{' '}
            <Link href="/track" className="text-primary hover:underline">
              order tracking page
            </Link>{' '}
            and enter your order number
          </li>
        </ol>
        <p>
          You'll receive tracking information within 24 hours of your order being dispatched. The
          tracking link allows you to see real-time updates on your package's journey.
        </p>
      </div>
    ),
  },
];

const productFAQs = [
  {
    title: 'How many flavors do you have?',
    content: (
      <div className="space-y-3">
        <p>
          PUXX Ireland offers <strong className="text-primary">14 unique flavors</strong> to suit
          every preference:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Mint:</strong> Cool Mint, Spearmint, Peppermint
          </li>
          <li>
            <strong>Fruit:</strong> Cherry, Watermelon, Strawberry, Raspberry, Blueberry, Grape,
            Peach
          </li>
          <li>
            <strong>Citrus:</strong> Citrus
          </li>
          <li>
            <strong>Unique:</strong> Cola, Wintergreen, Applemint
          </li>
        </ul>
        <p>
          All flavors are available at €15.00 per can. Explore our full range on the{' '}
          <Link href="/products" className="text-primary hover:underline">
            products page
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    title: 'What nicotine strengths are available?',
    content: (
      <div className="space-y-3">
        <p>We offer pouches in multiple nicotine strengths:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>6mg:</strong> Light strength, perfect for beginners or occasional users
          </li>
          <li>
            <strong>16mg:</strong> Medium strength, our most popular option
          </li>
          <li>
            <strong>20mg:</strong> Strong strength for experienced users
          </li>
          <li>
            <strong>22mg:</strong> Extra strong for maximum nicotine delivery
          </li>
        </ul>
        <p>
          Choose a strength based on your current nicotine consumption and preferences. If you're
          unsure, start with a lower strength and adjust as needed.
        </p>
      </div>
    ),
  },
  {
    title: 'How many pouches are in each can?',
    content: (
      <div className="space-y-3">
        <p>
          Each PUXX can contains <strong>20 nicotine pouches</strong>.
        </p>
        <p>
          With typical use (1-2 pouches per hour), one can should last approximately 1-2 days
          depending on your consumption habits. Many customers purchase multiple cans to ensure
          they always have their favorite flavors on hand.
        </p>
      </div>
    ),
  },
  {
    title: 'What is the shelf life of nicotine pouches?',
    content: (
      <div className="space-y-3">
        <p>
          Unopened PUXX nicotine pouches have a shelf life of approximately{' '}
          <strong>12-18 months</strong> from the production date when stored properly.
        </p>
        <p>
          <strong>Storage tips:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Store in a cool, dry place away from direct sunlight</li>
          <li>Keep the can sealed when not in use</li>
          <li>Refrigeration can extend freshness (optional)</li>
          <li>Avoid extreme temperatures</li>
        </ul>
        <p>
          Check the production or expiry date printed on the bottom of each can. For best flavor
          and effect, use before the expiry date.
        </p>
      </div>
    ),
  },
];

const accountReturnsFAQs = [
  {
    title: 'How do I create an account?',
    content: (
      <div className="space-y-3">
        <p>
          Creating an account is optional but recommended for faster checkout and order tracking.
        </p>
        <p>
          <strong>To create an account:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Click "Sign Up" in the top navigation or{' '}
            <Link href="/sign-up" className="text-primary hover:underline">
              click here
            </Link>
          </li>
          <li>Enter your email address and create a password</li>
          <li>Verify your age (18+ required)</li>
          <li>Complete your profile information</li>
          <li>Verify your email address via the confirmation link</li>
        </ol>
        <p>
          <strong>Account benefits:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Faster checkout</li>
          <li>Order history and tracking</li>
          <li>Saved addresses and payment methods</li>
          <li>Exclusive member offers (coming soon)</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Can I return products?',
    content: (
      <div className="space-y-3">
        <p>
          Yes! We offer a <strong>30-day return policy</strong> for unopened products.
        </p>
        <p>
          <strong>Eligible for return:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Unopened products in original packaging</li>
          <li>Products in resalable condition</li>
          <li>Returned within 30 days of delivery</li>
        </ul>
        <p>
          <strong>Not eligible:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Opened nicotine pouches (health and safety reasons)</li>
        </ul>
        <p>
          For complete details and return instructions, visit our{' '}
          <Link href="/shipping" className="text-primary hover:underline">
            Shipping & Returns
          </Link>{' '}
          page or contact us at hello@puxxnicotine.ie.
        </p>
      </div>
    ),
  },
  {
    title: 'What if my order is damaged?',
    content: (
      <div className="space-y-3">
        <p>
          We're sorry if your order arrived damaged! We'll make it right immediately.
        </p>
        <p>
          <strong>If you receive damaged products:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Contact us within 48 hours at{' '}
            <a href="mailto:hello@puxxnicotine.ie" className="text-primary hover:underline">
              hello@puxxnicotine.ie
            </a>
          </li>
          <li>Include your order number</li>
          <li>Provide photos of the damaged packaging and/or products</li>
          <li>Describe the damage</li>
        </ol>
        <p>
          We'll send you a replacement or issue a full refund - <strong>no return needed</strong>.
          Your satisfaction is our priority, and we'll resolve the issue as quickly as possible.
        </p>
      </div>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about PUXX Ireland products and services"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'FAQ' }]} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-heading text-foreground">Categories</h2>
              </div>
              <nav className="space-y-2">
                <a
                  href="#general"
                  className="block py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  General Questions
                </a>
                <a
                  href="#ordering"
                  className="block py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  Ordering
                </a>
                <a
                  href="#shipping"
                  className="block py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  Shipping
                </a>
                <a
                  href="#products"
                  className="block py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  Products
                </a>
                <a
                  href="#account"
                  className="block py-2 px-3 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  Account & Returns
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* General Questions */}
            <section id="general" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-heading text-foreground mb-6">General Questions</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <Accordion items={generalFAQs} />
              </div>
            </section>

            {/* Ordering */}
            <section id="ordering" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-heading text-foreground mb-6">Ordering</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <Accordion items={orderingFAQs} />
              </div>
            </section>

            {/* Shipping */}
            <section id="shipping" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-heading text-foreground mb-6">Shipping</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <Accordion items={shippingFAQs} />
              </div>
            </section>

            {/* Products */}
            <section id="products" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-heading text-foreground mb-6">Products</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <Accordion items={productFAQs} />
              </div>
            </section>

            {/* Account & Returns */}
            <section id="account" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-heading text-foreground mb-6">Account & Returns</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <Accordion items={accountReturnsFAQs} />
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-emerald rounded-2xl p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-20 w-20 text-white/90" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-heading mb-4">Still Have Questions?</h2>
                  <p className="text-white/90 mb-6">
                    Our customer support team is here to help. We typically respond within 24 hours
                    during business hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold"
                    >
                      <a href="mailto:hello@puxxnicotine.ie">
                        <Mail className="mr-2 h-5 w-5" />
                        Email Us
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Link href="/contact">Contact Form</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-white/75 mt-4">
                    Support Hours: Monday-Friday 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAQ Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              ...generalFAQs,
              ...orderingFAQs,
              ...shippingFAQs,
              ...productFAQs,
              ...accountReturnsFAQs,
            ].map((faq) => ({
              '@type': 'Question',
              name: faq.title,
              acceptedAnswer: {
                '@type': 'Answer',
                text: typeof faq.content === 'string' ? faq.content : faq.title,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
