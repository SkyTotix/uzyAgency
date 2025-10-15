import { Header, Footer } from "@/components/layout";
import HeroSection from "@/components/features/HeroSection";
import ServicesSectionWrapper from "@/components/features/ServicesSectionWrapper";
import FeaturedWork from "@/components/features/FeaturedWork";
import CTASection from "@/components/features/CTASection";
import { getActiveBackground } from "@/lib/server/data/backgroundData";

export default async function Home() {
  // Obtener el fondo activo en el servidor
  const background = await getActiveBackground();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection background={background} />
        <ServicesSectionWrapper />
        <FeaturedWork />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
