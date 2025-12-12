import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';

export const metadata: Metadata = {
  title: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches | 14 Flavors',
  description: 'Buy premium nicotine pouches in Ireland. 14 delicious flavors, 6mg-22mg strength options. Tobacco-free, high quality. Free delivery over €150. 18+ only.',
  keywords: 'nicotine pouches Ireland, tobacco free pouches, nicotine pouches buy Ireland, best nicotine pouches, PUXX Ireland',
  openGraph: {
    title: 'PUXX Ireland - Premium Tobacco-Free Nicotine Pouches',
    description: 'Buy premium nicotine pouches in Ireland. 14 delicious flavors, 6mg-22mg strength options. Tobacco-free, high quality. Free delivery over €150.',
    type: 'website',
    locale: 'en_IE',
    siteName: 'PUXX Ireland',
  },
};

/**
 * Homepage
 *
 * This page includes Organization and LocalBusiness structured data (JSON-LD)
 * according to the SEO Plan (lines 351-407) and redirects to the products page.
 *
 * The schema markup helps search engines understand:
 * - Business information (Organization schema)
 * - Local business details for local SEO (LocalBusiness schema)
 */
export default function HomePage() {
  // Include schema markup before redirecting
  // The schemas will be rendered in the HTML even though the user is redirected
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      {redirect('/products')}
    </>
  );
}
