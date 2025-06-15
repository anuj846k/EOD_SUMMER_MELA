import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Baloo_2 } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const baloo_2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo_2",
});

export const metadata: Metadata = {
  title: "EOD Adventure Park",
  description: "Summer Mela free entry from June 16-30",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${baloo_2.variable} font-sans antialiased`}
      >
        <Toaster position="top-right" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
