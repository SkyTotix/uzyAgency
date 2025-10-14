import { Header, Footer } from "@/components/layout";
import { HeroSection, ScrollSection, ContactForm, ServiceList } from "@/components/features";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ScrollSection />
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <ServiceList />
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
