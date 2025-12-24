import { useState } from "react";
import RollingIntro from "@/components/RollingIntro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Rolling Intro */}
      {showIntro && <RollingIntro onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <main className="bg-background min-h-screen overflow-x-hidden">
        <Hero />
        <Projects />
        {/* <Experience />
        <Testimonials /> */}
        <Footer />
      </main>
    </div>
  );
};

export default Index;
