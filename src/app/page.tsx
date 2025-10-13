import { Header, Footer } from "@/components/layout";
import { HeroSection, ScrollSection, ContactForm } from "@/components/features";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ScrollSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
