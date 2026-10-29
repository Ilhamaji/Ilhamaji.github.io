import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { EducationSection } from "@/components/education";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <ExperienceSection />
        <EducationSection />
      </main>
      <Footer />
    </>
  );
}
