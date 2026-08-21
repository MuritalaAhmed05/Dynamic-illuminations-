import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: {
    default: 'Dynamic Illuminations | Innovative Lighting & Solar Solutions',
    template: '%s | Dynamic Illuminations',
  },
  description: 'Brightening your world with innovative architectural, commercial, and solar lighting solutions in Nigeria.',
  keywords: ['Lighting Solutions', 'Solar Energy', 'Architectural Lighting', 'Smart Home', 'CCTV Installation', 'Nigeria'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 antialiased">
        <AuthProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
