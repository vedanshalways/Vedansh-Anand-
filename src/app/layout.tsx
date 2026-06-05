import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Background from '@/components/Background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vedansh Anand',
  description: 'Personal portfolio of Vedansh Anand — Builder, Developer, Innovator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black text-white min-h-screen">
        <Background />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Nav />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
