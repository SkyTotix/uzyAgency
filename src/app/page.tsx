import { Header, Footer } from "@/components/layout";
import HeroSection from "@/components/features/HeroSection";
import ServicesSectionWrapper from "@/components/features/ServicesSectionWrapper";
import FeaturedWork from "@/components/features/FeaturedWork";
import CTASection from "@/components/features/CTASection";
import VideoBackground from "@/components/features/VideoBackground";
import { getActiveBackground } from "@/lib/server/data/backgroundData";

export default async function Home() {
  // Obtener el fondo activo en el servidor
  const background = await getActiveBackground();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Wrapper con video de fondo que se extiende hasta FeaturedWork */}
        <div className="relative">
          <VideoBackground />
          <HeroSection background={background} />
          <ServicesSectionWrapper />
          <FeaturedWork />
        </div>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
