import { useEffect, useRef, useState } from "react";
import RollingIntro from "@/components/RollingIntro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored !== "light";
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    const onClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen || !navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    const fadeEls = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));
    fadeEls.forEach((el) => {
      if (el.classList.contains("hero-fade")) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [showIntro]);

  const handleThemeToggle = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div>
      {showIntro && <RollingIntro onComplete={() => setShowIntro(false)} />}

      <header
        ref={navRef}
        className={`site-nav ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="layout-shell nav-inner">
          <a href="#" className="brand-mark" onClick={closeMobileMenu}>
            harshit<span>.</span>
          </a>

          <div className="nav-actions">
            <nav className="desktop-nav" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="theme-pill" onClick={handleThemeToggle} aria-label="Toggle theme">
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span className="theme-label">{isDark ? "Light" : "Dark"}</span>
            </button>

            <button
              className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="mobile-nav-link" onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main className="min-h-screen overflow-x-hidden">
        <Hero />
        <Projects />
        <Experience />
        <Contact firstName="Harshit" />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
