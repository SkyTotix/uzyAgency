import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/providers/GSAPProvider";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UziAgency | High-Performance Digital Development",
  description: "Agencia digital especializada en desarrollo web de alto rendimiento, animaciones profesionales y experiencias digitales extraordinarias. Transformamos ideas en realidad con tecnología de vanguardia.",
  keywords: ["desarrollo web", "animaciones", "agencia digital", "Next.js", "React", "GSAP", "Tailwind CSS", "experiencias digitales"],
  authors: [{ name: "UziAgency Team" }],
  creator: "UziAgency",
  publisher: "UziAgency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "UziAgency | High-Performance Digital Development",
    description: "Agencia digital especializada en desarrollo web de alto rendimiento, animaciones profesionales y experiencias digitales extraordinarias.",
    url: '/',
    siteName: 'UziAgency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UziAgency - High-Performance Digital Development',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "UziAgency | High-Performance Digital Development",
    description: "Agencia digital especializada en desarrollo web de alto rendimiento y animaciones profesionales.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GSAPProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
