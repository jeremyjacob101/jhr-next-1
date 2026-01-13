import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JHR | Jerusalem Heritage Realty",
  description:
    "JHR - Jerusalem Heritage Realty - Premium Real Estate in Jerusalem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
