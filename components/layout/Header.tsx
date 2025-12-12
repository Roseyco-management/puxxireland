'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-heading text-gradient-emerald">
              PUXX
            </span>
            <span className="ml-2 text-sm text-muted-foreground">Ireland</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href="/cart"
            className="relative -m-2 p-2 text-foreground hover:text-primary transition-colors"
          >
            <span className="sr-only">Cart</span>
            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            {/* Cart count badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>

          <Button asChild variant="ghost" size="sm">
            <Link href="/sign-in">
              <User className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>

          <Button asChild size="sm" className="gradient-emerald hover:opacity-90">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <Link
                href="/cart"
                className="flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Cart (0)
              </Link>

              <Link
                href="/sign-in"
                className="flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-3 h-5 w-5" />
                Login
              </Link>

              <Button asChild className="w-full gradient-emerald">
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
