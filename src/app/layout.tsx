import type { Metadata } from "next";
import "./globals.css";
import GSAPProvider from "@/components/providers/GSAPProvider";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import { montserrat, satoshi } from "@/lib/fonts";

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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta tags para PWA */}
        <meta name="application-name" content="UziAgency" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UziAgency" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />
        
        {/* Viewport optimizado para PWA */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes" 
        />
      </head>
      <body className={`${montserrat.variable} ${satoshi.variable} font-sans antialiased pt-20`}>
        <GSAPProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
