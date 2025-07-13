import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EasyWedding - Beautiful Digital Wedding Invitations',
  description: 'Create beautiful digital wedding invitations for Southeast Asia. Mobile-optimized, customizable, and easy to share.',
  keywords: 'wedding invitation, digital invitation, Southeast Asia, mobile wedding, online invitation',
  authors: [{ name: 'EasyWedding Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'EasyWedding - Beautiful Digital Wedding Invitations',
    description: 'Create beautiful digital wedding invitations for Southeast Asia',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyWedding - Beautiful Digital Wedding Invitations',
    description: 'Create beautiful digital wedding invitations for Southeast Asia',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 