'use client';

import { useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { setAgeVerified } from '@/lib/utils/age-verification';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
}

export function AgeVerificationModal({
  isOpen,
  onVerified,
}: AgeVerificationModalProps) {
  const [isRejected, setIsRejected] = useState(false);

  const handleVerified = () => {
    setAgeVerified();
    onVerified();
  };

  const handleRejected = () => {
    setIsRejected(true);
  };

  const handleGoBack = () => {
    setIsRejected(false);
  };

  // Prevent ESC key from closing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        allowClose={false}
        allowDismiss={false}
        className="max-w-lg p-0 overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        onKeyDown={handleKeyDown}
      >
        {!isRejected ? (
          <div className="relative">
            {/* Header with Logo */}
            <div className="bg-gradient-to-r from-[#009A49] to-[#00A86B] px-6 py-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                  <Logo variant="white" size="md" className="drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 font-montserrat">
                Age Verification Required
              </h1>
              <p className="text-white/90 text-sm">
                You must be 18+ to access this website
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                  <ShieldCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Restricted Content
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-base mb-2">
                  This website sells nicotine products which are restricted to
                  adults only.
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  By entering this site, you confirm that you are of legal age
                  to purchase nicotine products in Ireland (18 years or older).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-5">
                <Button
                  onClick={handleVerified}
                  size="lg"
                  className="w-full h-12 text-base font-semibold gradient-emerald hover:opacity-90 transition-opacity text-white shadow-lg"
                >
                  I am 18 or older - Enter Site
                </Button>

                <Button
                  onClick={handleRejected}
                  size="lg"
                  variant="outline"
                  className="w-full h-12 text-base font-semibold border-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  I am under 18
                </Button>
              </div>

              {/* Legal Notice */}
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <strong className="font-semibold">Legal Notice:</strong> This
                  website is intended for adults only. Nicotine products are
                  age-restricted and can be harmful to health. By continuing,
                  you agree to our{' '}
                  <a
                    href="/terms"
                    className="text-[#009A49] hover:underline font-medium"
                  >
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    className="text-[#009A49] hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <a
                  href="/about#age-verification"
                  className="text-xs text-[#009A49] hover:underline font-medium inline-flex items-center gap-1"
                >
                  Why do we ask this?
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Rejection Screen
          <div className="relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 font-montserrat">
                Access Denied
              </h1>
              <p className="text-white/90 text-sm">
                You must be 18 or older to access this website
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Sorry, You Cannot Enter
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-5">
                This website contains age-restricted content. You must be at
                least 18 years old to access PUXX Ireland.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Looking for Information?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  If you're under 18 and looking for information about nicotine
                  and tobacco use, please visit:
                </p>
                <a
                  href="https://www.hse.ie/eng/health/hl/living/children/tobacco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  HSE Health Information
                </a>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleGoBack}
                  size="default"
                  variant="outline"
                  className="w-full h-10 border-2"
                >
                  Go Back
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  Made a mistake? Click "Go Back" to verify again.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
