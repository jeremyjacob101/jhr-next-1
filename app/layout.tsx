import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import AccessibilityControls from "@/components/AccessibilityControls";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <ExitIntentPopup />
        <AccessibilityControls />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
