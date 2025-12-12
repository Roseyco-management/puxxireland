'use client';

import { useState, useEffect } from 'react';
import { useCheckoutStore } from '@/lib/stores/checkout-store';
import { useCartStore } from '@/lib/store/cart-store';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { Step1CartReview } from '@/components/checkout/Step1CartReview';
import { Step2CustomerInfo } from '@/components/checkout/Step2CustomerInfo';
import { Step3ShippingAddress } from '@/components/checkout/Step3ShippingAddress';
import { Step4ShippingMethod } from '@/components/checkout/Step4ShippingMethod';
import { Step5Payment } from '@/components/checkout/Step5Payment';
import { Step6Confirmation } from '@/components/checkout/Step6Confirmation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { trackBeginCheckout, trackCheckoutProgress } from '@/lib/analytics/google-analytics';

export default function CheckoutPage() {
  const { currentStep, setCurrentStep } = useCheckoutStore();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const [mounted, setMounted] = useState(false);
  const [hasTrackedBeginCheckout, setHasTrackedBeginCheckout] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track begin_checkout when page loads (only once)
  useEffect(() => {
    if (mounted && items.length > 0 && !hasTrackedBeginCheckout) {
      const cartItems = items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: 'Nicotine Pouches',
        variant: item.product.nicotineStrength || undefined,
      }));

      trackBeginCheckout(cartItems, getTotal());
      setHasTrackedBeginCheckout(true);
    }
  }, [mounted, items, getTotal, hasTrackedBeginCheckout]);

  // Track checkout progress when step changes
  useEffect(() => {
    if (!mounted) return;

    const stepNames = [
      'Cart Review',
      'Customer Info',
      'Shipping Address',
      'Shipping Method',
      'Payment',
      'Confirmation',
    ];

    if (currentStep > 0 && currentStep <= stepNames.length) {
      trackCheckoutProgress(currentStep, stepNames[currentStep - 1]);
    }
  }, [currentStep, mounted]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CartReview onNext={handleNext} />;
      case 2:
        return (
          <Step2CustomerInfo onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 3:
        return (
          <Step3ShippingAddress
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Step4ShippingMethod onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 5:
        return <Step5Payment onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <Step6Confirmation />;
      default:
        return <Step1CartReview onNext={handleNext} />;
    }
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-heading text-foreground">
                  PUXX Ireland
                </h1>
                <p className="text-xs text-muted-foreground">Secure Checkout</p>
              </div>
            </Link>

            {/* Back to Shop Link */}
            {currentStep < 6 && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/products" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Shop</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Progress Indicator */}
        {currentStep < 6 && (
          <div className="mb-12">
            <CheckoutProgress currentStep={currentStep} totalSteps={6} />
          </div>
        )}

        {/* Step Content */}
        <div className="mb-8">{renderStep()}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} PUXX Ireland. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/shipping"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
