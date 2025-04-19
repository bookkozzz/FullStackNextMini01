import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

const roboto = Roboto({ 
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "My Website",
  description: "My Website 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Header />
        <main className="min-h-[80vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
