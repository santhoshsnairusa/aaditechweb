import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AADIT Techno Solutions",
  description: "Engineering Intelligence. Building Reliable Technology. AADIT Techno Solutions delivers advanced embedded systems, semiconductor engineering, AI/ML, FPGA, automated testing, communication, and edge-computing solutions.",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/Fav_icon_dark.png',
        href: '/images/Fav_icon_dark.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/Fav_icon_white.png',
        href: '/images/Fav_icon_white.png',
      },
    ],
  },
  openGraph: {
    title: "AADIT Techno Solutions",
    description: "Engineering Intelligence. Building Reliable Technology.",
    url: "https://www.aadittech.com",
    siteName: "AADIT Techno Solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-secondary-950 text-secondary-900 dark:text-secondary-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
