import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const navigation = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Best Sellers', href: '/shop?sort=popular' },
      { name: 'New Arrivals', href: '/shop?sort=new' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping & Returns', href: '/shipping' },
      { name: 'Track Order', href: '/track' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'Twitter', href: '#', icon: Twitter },
    ],
  };

  return (
    <footer className="bg-secondary text-secondary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <Logo variant="white" size="lg" className="h-12 w-auto" />
            <p className="text-sm leading-6 text-cream/80">
              Premium nicotine pouches delivered across Ireland. Experience the world's best pouches with 14 unique flavors.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-cream/60 hover:text-primary transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-heading text-cream">Shop</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-cream/80 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-heading text-cream">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-cream/80 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-heading text-cream">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-cream/80 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-heading text-cream">Newsletter</h3>
                <p className="mt-6 text-sm leading-6 text-cream/80">
                  Get exclusive offers and updates delivered to your inbox.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-cream ring-1 ring-inset ring-white/10 placeholder:text-cream/40 focus:ring-2 focus:ring-inset focus:ring-primary sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-cream/60">
              &copy; {new Date().getFullYear()} PUXX Ireland. All rights reserved.
            </p>
            <p className="text-xs leading-5 text-cream/60">
              Must be 18+ to purchase nicotine products.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
