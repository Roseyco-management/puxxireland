import { ReactNode } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | PUXX Ireland',
  description: 'Sign in or create an account with PUXX Ireland - Premium nicotine pouches',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-xl font-bold text-white">P</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  PUXX Ireland
                </span>
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              18+ only. By using PUXX Ireland, you confirm you are of legal age.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
