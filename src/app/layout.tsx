import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AADIT Techno Solutions",
  description: "Engineering Intelligence. Building Reliable Technology. AADIT Techno Solutions delivers advanced embedded systems, semiconductor engineering, AI/ML, FPGA, automated testing, communication, and edge-computing solutions.",
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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
