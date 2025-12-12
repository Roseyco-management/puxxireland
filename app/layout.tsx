import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'PUXX Ireland - Premium Nicotine Pouches',
  description: 'Experience the world\'s best nicotine pouches. 14 flavors, fast delivery across Ireland. Fresh, tobacco-free pouches delivered to your door.',
  metadataBase: new URL('https://puxxnicotine.ie'),
  applicationName: 'PUXX Ireland',
  keywords: ['nicotine pouches', 'PUXX', 'Ireland', 'tobacco-free', 'nicotine', 'pouches', 'premium'],
  authors: [{ name: 'PUXX Ireland' }],
  creator: 'PUXX Ireland',
  publisher: 'PUXX Ireland',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://puxxnicotine.ie',
    siteName: 'PUXX Ireland',
    title: 'PUXX Ireland - Premium Nicotine Pouches',
    description: 'Experience the world\'s best nicotine pouches. 14 flavors, fast delivery across Ireland.',
    images: [
      {
        url: '/images/logo/PUXX-LOGO-LONG-WHITE.png',
        width: 1200,
        height: 630,
        alt: 'PUXX Ireland - Premium Nicotine Pouches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUXX Ireland - Premium Nicotine Pouches',
    description: 'Experience the world\'s best nicotine pouches. 14 flavors, fast delivery across Ireland.',
    images: ['/images/logo/PUXX-LOGO-LONG-WHITE.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PUXX Ireland',
  },
};

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
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="min-h-[100dvh] bg-background font-sans antialiased">
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
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
