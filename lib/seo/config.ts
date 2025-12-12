import { DefaultSeoProps } from 'next-seo';

export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | PUXX Ireland',
  defaultTitle: 'PUXX Ireland - Premium Nicotine Pouches',
  description:
    'Experience the world\'s best nicotine pouches. 14 unique flavors, fresh and tobacco-free. Fast delivery across Ireland. Shop premium pouches at PUXX Ireland.',
  canonical: 'https://puxx.ie',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://puxx.ie',
    siteName: 'PUXX Ireland',
    title: 'PUXX Ireland - Premium Nicotine Pouches',
    description:
      'Experience the world\'s best nicotine pouches. 14 unique flavors, fresh and tobacco-free. Fast delivery across Ireland.',
    images: [
      {
        url: 'https://puxx.ie/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PUXX Ireland - Premium Nicotine Pouches',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@puxxireland',
    site: '@puxxireland',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content:
        'nicotine pouches, nicotine pouches Ireland, tobacco-free pouches, PUXX, nicotine products Ireland, snus alternative, smoke-free nicotine',
    },
    {
      name: 'author',
      content: 'PUXX Ireland',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

// Schema.org structured data for organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PUXX Ireland',
  url: 'https://puxx.ie',
  logo: 'https://puxx.ie/logo.png',
  description:
    'Premium nicotine pouches delivered across Ireland. 14 unique flavors, fresh and tobacco-free.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'hello@puxx.ie',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.facebook.com/puxxireland',
    'https://www.instagram.com/puxxireland',
    'https://twitter.com/puxxireland',
  ],
};
