import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SONDER Photography | Professional Wedding Photography in Hungary",
  description:
    "Capture your special moments with artistic vision and timeless elegance. Professional wedding photography services in Hungary.",
  keywords:
    "wedding photography, Hungary wedding photographer, professional photography, wedding videography, SONDER photography",
  openGraph: {
    title: "SONDER Photography | Professional Wedding Photography in Hungary",
    description:
      "Capture your special moments with artistic vision and timeless elegance",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SONDER Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SONDER Photography | Professional Wedding Photography in Hungary",
    description: "Professional wedding photography services in Hungary",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
