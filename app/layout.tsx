import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'PUXX Ireland - Premium Nicotine Pouches',
  description: 'Experience the world\'s best nicotine pouches. 14 flavors, fast delivery across Ireland. Fresh, tobacco-free pouches delivered to your door.'
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
