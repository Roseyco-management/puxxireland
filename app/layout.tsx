import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { Suspense } from 'react';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import { ToastProvider } from '@/lib/utils/toast';
import { baseMetadata } from '@/lib/seo/metadata';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { MicrosoftClarity } from '@/components/analytics/MicrosoftClarity';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AgeGate } from '@/components/age-verification/AgeGate';

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  maximumScale: 1
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IE"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        {/* Google Analytics 4 */}
        <GoogleAnalytics />
        {/* Meta (Facebook) Pixel */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {/* Microsoft Clarity */}
        <MicrosoftClarity />
      </head>
      <body className="min-h-[100dvh] bg-background font-sans antialiased">
        <AgeGate>
          <ToastProvider>
            <SWRConfig
              value={{
                fallback: {
                  // We do NOT await here
                  // Only components that read this data will suspend
                  '/api/user': getUser(),
                  '/api/team': getTeamForUser()
                }
              }}
            >
              <PublicLayout>{children}</PublicLayout>
            </SWRConfig>
          </ToastProvider>
        </AgeGate>
      </body>
    </html>
  );
}
