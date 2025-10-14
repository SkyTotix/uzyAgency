import { Header, Footer } from "@/components/layout";
import { HeroSection, ScrollSection, ContactForm, ServiceList, ProjectShowcase } from "@/components/features";
import { getFeaturedProjects } from "@/lib/server/data/projectData";

export default async function Home() {
  // Obtener proyectos destacados desde Sanity
  const featuredProjects = await getFeaturedProjects(3);

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
        <ProjectShowcase projects={featuredProjects} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
