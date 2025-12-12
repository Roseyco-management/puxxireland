import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Heart, CheckCircle, Truck, Lock, Award } from 'lucide-react';
import { PageHeader } from '@/components/static-pages/page-header';
import { Breadcrumbs } from '@/components/static-pages/breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | PUXX Ireland - Premium Nicotine Pouches',
  description:
    "Learn about PUXX Ireland's mission to provide premium tobacco-free nicotine pouches. Discover our story, values, and commitment to quality.",
  openGraph: {
    title: 'About PUXX Ireland',
    description: "Ireland's premier tobacco-free nicotine pouch provider",
  },
};

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'We source only the finest ingredients and manufacturing processes to deliver exceptional quality in every pouch.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'Constantly exploring new flavors and formulations to provide our customers with the best nicotine pouch experience.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Your satisfaction is our priority. We provide excellent customer service and support every step of the way.',
  },
];

const whyPuxx = [
  {
    title: 'Tobacco-Free Formula',
    description:
      'Our pouches contain zero tobacco, offering a cleaner alternative while delivering the nicotine experience you want.',
    icon: CheckCircle,
  },
  {
    title: '14 Delicious Flavors',
    description:
      'From refreshing mint to exotic fruits, we offer a diverse range of flavors to suit every preference.',
    icon: CheckCircle,
  },
  {
    title: 'Premium Quality',
    description:
      'Every pouch is crafted with care, using high-quality ingredients and rigorous quality control standards.',
    icon: CheckCircle,
  },
  {
    title: 'Discreet & Convenient',
    description:
      'Use anywhere, anytime. Our pouches are smoke-free, spit-free, and completely discreet.',
    icon: CheckCircle,
  },
];

const trustBadges = [
  {
    icon: Shield,
    title: '18+ Age Verification',
    description: 'Strict age verification on all orders',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: '256-bit SSL encrypted transactions',
  },
  {
    icon: Truck,
    title: 'Fast Irish Shipping',
    description: '3-5 day delivery across Ireland',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: '30-day satisfaction guarantee',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader
        title="About PUXX Ireland"
        description="Ireland's premier destination for premium tobacco-free nicotine pouches"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading text-foreground mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-4">
                  PUXX Ireland was founded with a clear mission: to bring premium, tobacco-free
                  nicotine pouches to the Irish market. We believe that adults who choose to use
                  nicotine deserve access to modern, clean, and convenient alternatives.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our journey began with a simple observation: the nicotine pouch market in Ireland
                  lacked a dedicated provider focused on quality, variety, and customer service. We
                  set out to change that by partnering with world-class manufacturers and curating
                  a selection of the finest flavors available.
                </p>
                <p className="text-muted-foreground">
                  Today, PUXX Ireland proudly serves customers across the country with 14 unique
                  flavors, fast shipping, and exceptional support. We're not just selling
                  products—we're building a community of satisfied customers who trust us for their
                  nicotine needs.
                </p>
              </div>
            </div>

            <div className="bg-gradient-emerald rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-heading mb-6">Our Mission</h3>
              <blockquote className="text-lg italic border-l-4 border-white pl-6 mb-6">
                "To make premium tobacco-free nicotine pouches accessible to all Irish adults,
                delivering exceptional quality, variety, and service with every order."
              </blockquote>
              <h3 className="text-2xl font-heading mb-4">Our Vision</h3>
              <p className="text-white/90">
                To become Ireland's most trusted and respected nicotine pouch provider, known for
                our commitment to quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose PUXX Section */}
        <section className="mb-16 bg-muted/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-heading text-foreground text-center mb-12">
            Why Choose PUXX?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyPuxx.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-heading text-foreground mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We're a dedicated team of professionals committed to serving our Irish customers with
              excellence. From product selection to customer support, every member of our team
              shares a passion for quality and service.
            </p>
            <div className="bg-muted/30 rounded-lg p-6 max-w-xl mx-auto">
              <h3 className="text-xl font-heading text-foreground mb-3">
                Customer Support Hours
              </h3>
              <p className="text-muted-foreground mb-2">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
              <p className="text-muted-foreground mb-4">Saturday: 10:00 AM - 4:00 PM IST</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:hello@puxxnicotine.ie"
                  className="text-primary hover:underline font-medium"
                >
                  hello@puxxnicotine.ie
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <span className="text-foreground font-medium">+353 1 234 5678</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading text-foreground text-center mb-12">
            Shop with Confidence
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-card border-2 border-primary/20 rounded-lg p-6 text-center hover:border-primary transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <badge.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-heading text-foreground mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-emerald rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-heading mb-4">Ready to Experience PUXX?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our range of 14 premium flavors and find your perfect pouch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              <Link href="/products">Shop Our Products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
