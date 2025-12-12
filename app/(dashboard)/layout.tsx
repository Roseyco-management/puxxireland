import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
