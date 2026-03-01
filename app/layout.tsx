import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Header from './components/Header';
import "./globals.css";
import PageContainer from './components/PageContainer';
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "blog",
    template: "%s | blog",
  },
  description: "Thoughtful engineering notes, practical guides, and experiments.",
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml'
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${grotesk.variable} antialiased`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.24),rgba(14,165,233,0))]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fbff_0%,#ffffff_40%,#ffffff_100%)]" />
          </div>
          <Header />
          <main className="flex-grow">
            <PageContainer>
              {children}
            </PageContainer>
          </main>
          <footer className="mt-16 border-t border-slate-200/70 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-slate-600">
              &copy; {new Date().getFullYear()} blog. All rights reserved.
            </div>
          </footer>
          <div className="py-3 text-center text-xs text-slate-500">
            Built at {process.env.NEXT_PUBLIC_BUILD_TIME} | v{process.env.NEXT_PUBLIC_VERSION}
          </div>
        </div>
      </body>
    </html>
  );
}
