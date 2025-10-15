import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sin Conexión | UziAgency',
  description: 'No hay conexión a internet disponible.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

