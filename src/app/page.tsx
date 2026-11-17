import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Journey } from "@/components/journey";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <Contact />
    </>
  );
}
