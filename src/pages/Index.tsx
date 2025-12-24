import { useState, useEffect } from "react";
import RollingIntro from "@/components/RollingIntro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Skip intro on subsequent visits in same session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro-seen");
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setShowIntro(false);
    sessionStorage.setItem("intro-seen", "true");
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
        <Experience />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
