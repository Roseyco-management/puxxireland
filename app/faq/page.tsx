'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Search,
  Package,
  Truck,
  ShoppingCart,
  UserCircle,
  Info,
  X
} from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Note: metadata export removed as this is now a client component for search functionality
// SEO is handled via the FAQ schema at the bottom of the page

// FAQ Categories with metadata
const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    icon: Info,
    description: 'Learn about nicotine pouches and PUXX products'
  },
  {
    id: 'ordering',
    title: 'Ordering',
    icon: ShoppingCart,
    description: 'How to place and manage orders'
  },
  {
    id: 'shipping',
    title: 'Shipping',
    icon: Truck,
    description: 'Delivery information and tracking'
  },
  {
    id: 'products',
    title: 'Products',
    icon: Package,
    description: 'Flavors, strengths, and product details'
  },
  {
    id: 'account',
    title: 'Account & Returns',
    icon: UserCircle,
    description: 'Account management and return policies'
  }
];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Combine all FAQs with their category
  const allFAQs = useMemo(() => [
    ...generalFAQs.map(faq => ({ ...faq, category: 'general' })),
    ...orderingFAQs.map(faq => ({ ...faq, category: 'ordering' })),
    ...shippingFAQs.map(faq => ({ ...faq, category: 'shipping' })),
    ...productFAQs.map(faq => ({ ...faq, category: 'products' })),
    ...accountReturnsFAQs.map(faq => ({ ...faq, category: 'account' })),
  ], []);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = allFAQs;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.title.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }

    return filtered;
  }, [allFAQs, searchQuery, activeCategory]);

  // Group filtered FAQs by category
  const groupedFAQs = useMemo(() => {
    const grouped: Record<string, typeof allFAQs> = {};
    filteredFAQs.forEach(faq => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFAQs]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-irish">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Everything you need to know about PUXX nicotine pouches, ordering, and delivery
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-4 text-white/80 text-sm">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards - Quick Navigation */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              const categoryFAQCount = groupedFAQs[category.id]?.length || 0;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(isActive ? null : category.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-emerald text-white shadow-lg'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 ${
                    isActive ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <h3 className={`text-lg font-heading mb-2 ${
                    isActive ? 'text-white' : 'text-foreground'
                  }`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm ${
                    isActive ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {categoryFAQCount} question{categoryFAQCount !== 1 ? 's' : ''}
                  </p>
                </button>
              );
            })}
          </div>

          {activeCategory && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setActiveCategory(null)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear filter
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(groupedFAQs).length > 0 ? (
            <div className="space-y-12">
              {faqCategories.map((category) => {
                const categoryFAQs = groupedFAQs[category.id];
                if (!categoryFAQs || categoryFAQs.length === 0) return null;

                const Icon = category.icon;

                return (
                  <section key={category.id} id={category.id} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-heading text-foreground">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                      <Accordion
                        items={categoryFAQs.map(({ title, content }) => ({ title, content }))}
                      />
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-muted mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-heading text-foreground mb-3">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse all categories
              </p>
              <Button onClick={() => { setSearchQuery(''); setActiveCategory(null); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald p-12 lg:p-16">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-white/10 backdrop-blur-sm">
                    <MessageCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl lg:text-4xl font-heading text-white mb-4">
                    Still Have Questions?
                  </h2>
                  <p className="text-xl text-white/90 mb-8">
                    Our customer support team is here to help. We typically respond within 24 hours during business hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold text-lg"
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
                      className="border-2 border-white text-white hover:bg-white/10 text-lg"
                    >
                      <Link href="/contact">Contact Form</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-white/75 mt-6">
                    Support Hours: Monday-Friday 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* FAQ Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFAQs.map((faq) => ({
              '@type': 'Question',
              name: faq.title,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.title, // Simplified for schema
              },
            })),
          }),
        }}
      />
    </div>
  );
}
