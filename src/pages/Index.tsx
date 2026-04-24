import { useEffect, useMemo, useState } from "react";
import "./index-remaster.css";

type Project = {
  id: string;
  number: string;
  type: string;
  title: string;
  tags: string[];
  description: string;
  why: string;
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  inProgress?: boolean;
};

const projects: Project[] = [
  {
    id: "hilda",
    number: "01",
    type: "Case Study · AI Engineering",
    title: "H.I.L.D.A.",
    tags: ["Next.js", "LangChain", "Supabase", "TypeScript"],
    description:
      "An autonomous AI code review agent that integrates with GitHub to detect security risks, calculate blast radius, and block dangerous pull requests in real-time — fully automated with agentic reasoning at its core.",
    why: "End-to-end agentic AI — security automation that ships without human review loops. Exactly what early engineering teams need.",
    demoUrl: "https://www.youtube.com/embed/e6rHv_4_W6o",
    githubUrl: "https://github.com/harshit110927/hilda",
  },
  {
    id: "onboardflow",
    number: "02",
    type: "Product · Dev Tools",
    title: "OnBoardFlow",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    description:
      "Real-time collaborative code editor with multiple cursors, syntax highlighting, and instant sync across connected users. Zero-latency conflict resolution built from scratch — no CRDT library shortcuts.",
    why: "Distributed systems thinking applied to hard concurrency problems — a core signal for founding engineer roles at dev-tool startups.",
    demoUrl: "https://www.youtube.com/embed/Lpsfs9r_vOM",
    githubUrl: "https://github.com/harshit110927/onboardflow",
    liveUrl: "https://onboardflow.xyz",
  },
  {
    id: "rag",
    number: "03",
    type: "Research Build · AI",
    title: "Realtime RAG for Teams",
    tags: ["Python", "RAG", "Vector DB", "LLM"],
    description:
      'Enterprises struggle with onboarding to custom internal stacks. This assistant resolves stack-specific questions by grounding answers in prior team conversations — cutting the "how does this work?" overhead dramatically.',
    why: "Addresses knowledge loss and slow onboarding — pain every scaling startup faces. Practical RAG, not just a chatbot wrapper.",
    demoUrl: "https://www.youtube.com/embed/xTmmjG_vyxI",
    githubUrl: "https://github.com/harshit110927/RAGrealTime",
  },
  {
    id: "crag",
    number: "04",
    type: "In Progress · Research",
    title: "CRAG-Lite",
    tags: ["Python", "RAG", "Hallucinations", "Docker"],
    description:
      "Experimental corrective RAG implementation focused on improving retrieval quality and reducing hallucinations. Validates retrieved context before generation — cutting confident-but-wrong outputs at the root.",
    why: "Shows research depth beyond tutorials. Engineers who understand AI failure modes — not just happy paths — are rare.",
    inProgress: true,
  },
];

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored !== "light";
    setIsDark(dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollProgress(Number.isFinite(scrolled) ? scrolled : 0);

      let current = "hero";
      document.querySelectorAll<HTMLElement>("section[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 90) current = section.id;
      });
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const stats = useMemo(
    () => [
      { value: "4+", label: "Live Projects" },
      { value: "3+", label: "AI Systems Built" },
      { value: "∞", label: "Commits Shipped" },
    ],
    [],
  );

  return (
    <div className="portfolio-root">
      <div className="progress" style={{ width: `${scrollProgress}%` }} />

      <nav className="p-nav">
        <div className="wrap nav-inner">
          <a href="#hero" className="logo">harshit<span>.</span></a>
          {sections.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""}>
              {item.label}
            </a>
          ))}
          <span className="badge">Available</span>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <span>{isDark ? "☀" : "☽"}</span>
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>

      <section id="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow reveal">Full-Stack Developer · AI Engineer</p>
            <h1 className="headline reveal">I build systems that turn <em>ideas</em> into products.</h1>
            <p className="subhead reveal">
              I design and ship production-ready experiences across web and AI — blending editorial-grade interfaces with practical, scalable engineering.
            </p>
            <div className="cta reveal">
              <a className="btn btn-primary" href="#work">View Work</a>
              <a className="btn btn-secondary" href="#contact">Let's build together</a>
            </div>
            <div className="stats reveal">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="stat-val">{item.value}</p>
                  <p className="stat-label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-card reveal">
            <p className="open-pill">Open to Work</p>
            <div className="mini-card">
              <p>Current Focus</p>
              <strong>Agentic AI Systems</strong>
            </div>
            <div className="mini-card">
              <p>Primary Stack</p>
              <strong>Next.js · TypeScript</strong>
            </div>
            <div className="mini-card">
              <p>Latest Build</p>
              <strong>H.I.L.D.A. — AI Code Review</strong>
            </div>
          </aside>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker">
          {[
            "Next.js",
            "TypeScript",
            "LangChain",
            "Supabase",
            "Python",
            "RAG Systems",
            "Vector DB",
            "PostgreSQL",
            "Docker",
            "Agentic AI",
            "Full-Stack",
            "LLMs",
          ]
            .concat([
              "Next.js",
              "TypeScript",
              "LangChain",
              "Supabase",
              "Python",
              "RAG Systems",
              "Vector DB",
              "PostgreSQL",
              "Docker",
              "Agentic AI",
              "Full-Stack",
              "LLMs",
            ])
            .map((item, i) => (
              <span key={`${item}-${i}`}>{item} ✦</span>
            ))}
        </div>
      </div>

      <section id="work" className="alt-bg">
        <div className="wrap">
          <p className="section-label reveal">01 — Selected Work</p>
          <h2 className="section-title reveal">Things I've shipped.</h2>

          {projects.map((project) => (
            <article key={project.id} className="project reveal">
              <div className="p-number">{project.number}</div>
              <div>
                <div className="p-head">
                  <div>
                    <p className="p-type">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="p-links">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">▶ Demo</a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">↗ Live</a>
                    )}
                    {project.inProgress && <span className="in-progress">⚙ In Progress</span>}
                  </div>
                </div>
                <div className="p-bottom">
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div>
                    <p>{project.description}</p>
                    <div className="impact">
                      <small>Why it matters</small>
                      <p>{project.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="wrap about-grid">
          <div>
            <p className="section-label reveal">02 — About</p>
            <h2 className="section-title reveal">The person behind the commits.</h2>
            <p className="about-copy reveal">I'm <strong>Harshit</strong>, a builder focused on full-stack product development and practical AI systems.</p>
            <p className="about-copy reveal">My current work spans collaborative developer tools, agentic workflows, and RAG-powered experiences designed to be genuinely useful in real teams — not toy demos.</p>
            <p className="about-copy reveal">I enjoy bridging engineering depth with editorial visual language so products feel both fast and memorable.</p>
            <div className="tags reveal stack-tags">
              {["Next.js", "TypeScript", "Python", "LangChain", "Supabase", "PostgreSQL", "Docker", "Vector DB", "LLMs"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="principles reveal">
            <div><h4>Clarity</h4><p>I favor simple architecture and clear interfaces over clever complexity. If it needs a diagram to explain to teammates, it probably needs a redesign.</p></div>
            <div><h4>Velocity</h4><p>I ship quickly, iterate in public, and treat user feedback as a product primitive — not an afterthought.</p></div>
            <div><h4>Craft</h4><p>I care deeply about spacing, typography, and the emotional tone of software. Good engineering should feel good to use.</p></div>
            <div><h4>Ownership</h4><p>I pick up problems end-to-end — from architecture to the pixel. No handholding, no gaps in the handoff.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="alt-bg">
        <div className="wrap reveal">
          <p className="section-label">03 — Contact</p>
          <h2 className="section-title contact-title">Let's build something together.</h2>
          <p className="subhead">Open to founding engineer roles, senior full-stack positions, and interesting AI projects at US-based startups.</p>
          <div className="cta">
            <a className="btn btn-primary" href="mailto:harshit110927@gmail.com">Email</a>
            <a className="btn btn-secondary" href="https://github.com/harshit110927" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn btn-secondary" href="https://linkedin.com/in/harshit110927" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn btn-secondary" href="#">Resume</a>
          </div>
        </div>
      </section>

      <footer>harshit.shukla — built with intention, shipped with care — © 2026</footer>
    </div>
  );
};

export default Index;
