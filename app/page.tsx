import AboutMe from "@/components/aboutme";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import WorkExperience from "@/components/workexp";
import WorkShowcase from "@/components/workshow";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f4f8fc] text-[#111110]">
      <Hero />
      <AboutMe />
      <WorkExperience />
      <WorkShowcase />
      <Footer />
    </main>
  );
}
