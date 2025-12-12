import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | PUXX Ireland',
  description:
    'Find answers to common questions about PUXX Ireland nicotine pouches, ordering, shipping, and more.',
  openGraph: {
    title: 'FAQ - PUXX Ireland',
    description: 'Get answers to your questions about nicotine pouches',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
