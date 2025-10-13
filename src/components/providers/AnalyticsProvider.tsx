"use client";

import { Analytics } from '@vercel/analytics/react';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Solo cargar Analytics en producción
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <>
      {children}
      {isProduction && <Analytics />}
    </>
  );
}
