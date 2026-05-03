import { useEffect } from "react";
import "./index-remaster.css";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    Lenis?: any;
  }
}

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src=\"${src}\"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

const Index = () => {
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = "dark";

    const tb = document.getElementById("tbttn");
    const onTheme = () => {
      const d = html.dataset.theme === "dark";
      html.dataset.theme = d ? "light" : "dark";
      const i = document.getElementById("ticon");
      const l = document.getElementById("tlbl");
      if (i) i.textContent = d ? "☽" : "☀";
      if (l) l.textContent = d ? "Dark" : "Light";
    };

    tb?.addEventListener("click", onTheme);

    const onScrollProgress = () => {
      const s = document.documentElement;
      const p = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
      const prog = document.getElementById("prog");
      if (prog) prog.style.width = `${p}%`;
    };
    window.addEventListener("scroll", onScrollProgress, { passive: true });

    let cleanupAnimation = () => {};

    const bootAnimations = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js");
      } catch {
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const Lenis = window.Lenis;
      if (!gsap || !ScrollTrigger || !Lenis) return;

      const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t: number) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to("#ey", { opacity: 1, duration: 0.9, delay: 0.2 })
        .to(".hword", { y: "0%", duration: 1.05, stagger: 0.12, ease: "power4.out" }, "-=.6")
        .to("#hsub", { opacity: 1, y: 0, duration: 0.8 }, "-=.6")
        .to("#hcta", { opacity: 1, y: 0, duration: 0.7 }, "-=.55")
        .to("#hst", { opacity: 1, y: 0, duration: 0.65 }, "-=.45")
        .to("#hvis", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=.6");

      document.querySelectorAll<HTMLElement>(".cnt").forEach((el) => {
        const target = Number(el.dataset.t || "0");
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: "power2.out",
            delay: 0.8,
            snap: { textContent: 1 },
            onUpdate() {
              el.textContent = `${Math.round(parseFloat(el.textContent || "0"))}`;
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: "#work",
        start: "top 74%",
        once: true,
        onEnter: () => gsap.from(".wtitle", { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" }),
      });

      gsap.utils.toArray("[data-pj]").forEach((el: any) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray(".prin").forEach((el: any, i: number) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: "#prlist", start: "top 80%", toggleActions: "play none none none" },
        });
      });

      gsap.from([".chead", ".csub", ".cbtns"], {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 76%", once: true },
      });

      const secs = document.querySelectorAll("section[id]");
      const nas = document.querySelectorAll('nav a[href^="#"]');
      const onNav = () => {
        let cur = "";
        secs.forEach((s) => {
          const sec = s as HTMLElement;
          if (window.scrollY >= sec.offsetTop - 70) cur = sec.id;
        });
        nas.forEach((a) => a.classList.toggle("actv", a.getAttribute("href") === `#${cur}`));
      };
      window.addEventListener("scroll", onNav, { passive: true });

      gsap.fromTo(".hv-bar-fill", { width: "0%" }, { width: "82%", duration: 1.4, delay: 1.2, ease: "power2.out" });

      cleanupAnimation = () => {
        window.removeEventListener("scroll", onNav);
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
        gsap.ticker.remove((t: number) => lenis.raf(t * 1000));
        lenis.destroy();
      };
    };

    bootAnimations();

    return () => {
      tb?.removeEventListener("click", onTheme);
      window.removeEventListener("scroll", onScrollProgress);
      cleanupAnimation();
    };
  }, []);

  return (
    <>
      <div id="prog" />
      <div className="orb oa" />
      <div className="orb ob" />
      <div className="orb oc" />

      <nav id="mainnav">
        <div className="ni">
          <a href="#hero" className="nlogo">harshit<span>.</span></a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <span className="avail-dot">Available</span>
          <button className="ntb" id="tbttn" aria-label="Toggle theme"><span id="ticon">☀</span><span id="tlbl">Light</span></button>
        </div>
      </nav>

      <section id="hero">
        <div className="w">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="heyebrow" id="ey"><div className="pulse" />Full-Stack Developer · AI Engineer</div>
              <h1 className="hh" id="hh">
                <span className="hline"><span className="hword">I build systems</span></span>
                <span className="hline"><span className="hword">that turn <em>ideas</em></span></span>
                <span className="hline"><span className="hword">into products<span className="dot">.</span></span></span>
              </h1>
              <p className="hsub" id="hsub">I design and ship production-ready experiences across web and AI — blending editorial-grade interfaces with practical, scalable engineering.</p>
              <div className="hcta" id="hcta">
                <a href="#work" className="btnp">View Work</a>
                <a href="#contact" className="btns">Let's build together</a>
              </div>
              <div className="hstats" id="hst">
                <div><div className="st-n"><span className="cnt" data-t="4">0</span><span className="c">+</span></div><div className="st-l">Live Projects</div></div>
                <div><div className="st-n"><span className="cnt" data-t="3">0</span><span className="c">+</span></div><div className="st-l">AI Systems Built</div></div>
                <div><div className="st-n">∞</div><div className="st-l">Commits Shipped</div></div>
              </div>
            </div>

            <div className="hvisual" id="hvis">
              <div className="hv-frame">
                <div className="hv-open">Open to Work</div>
                <div className="hv-inner">
                  <div className="hv-card" style={{ maxWidth: 220 }}><div className="hvc-l">Current Focus</div><div className="hvc-v"><em>Agentic AI</em> Systems</div></div>
                  <div className="hv-mid"><div className="hv-card" style={{ maxWidth: 200 }}><div className="hvc-l">Primary Stack</div><div className="hvc-v"><em>Next.js</em> · TypeScript</div></div></div>
                  <div className="hv-card" style={{ maxWidth: 230 }}><div className="hvc-l">Latest Build</div><div className="hvc-v">H.I.L.D.A. — AI Code Review</div><div className="hv-bar"><div className="hv-bar-fill" style={{ width: "82%" }} /></div><div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: ".5rem", color: "var(--t3)", marginTop: 4, fontWeight: 300 }}>82% security coverage</div></div>
                  <div className="hv-mid"><div className="hv-card" style={{ maxWidth: 190 }}><div className="hvc-l">Shipped</div><div className="hvc-v"><em>4+</em> Production Systems</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker" aria-hidden="true">
          {Array(2).fill(["Next.js","TypeScript","LangChain","Supabase","Python","RAG Systems","Vector DB","PostgreSQL","Docker","Agentic AI","Full-Stack","LLMs"]).flat().map((item, i)=><div className="ti" key={`${item}-${i}`}>{item} <span>✦</span></div>)}
        </div>
      </div>

      <div className="divr" />

      <section id="work">
        <div className="w">
          <div className="sl">01 — Selected Work</div>
          <h2 className="sh wtitle">Things I've shipped.</h2>
          <div className="pl">
            <div className="pj" data-pj><div className="pj-bg" /><div className="pnum">01</div><div className="pbody"><div className="phead"><div><div className="ptype">Case Study · AI Engineering</div><h3 className="ptitle">H.I.L.D.A.</h3></div><div className="plinks"><a href="https://www.youtube.com/embed/e6rHv_4_W6o" className="ch ch-l" target="_blank" rel="noreferrer">▶ Demo</a><a href="https://github.com/harshit110927/hilda" className="ch ch-g" target="_blank" rel="noreferrer">GitHub</a></div></div><div className="pbottom"><div><div className="ptags"><span className="tag">Next.js</span><span className="tag">LangChain</span><span className="tag">Supabase</span><span className="tag">TypeScript</span></div></div><div><p className="pdesc">An autonomous AI code review agent that integrates with GitHub to detect security risks, calculate blast radius, and block dangerous pull requests in real-time — fully automated with agentic reasoning at its core.</p><div className="pimp"><div className="pimp-l">Why it matters</div><div className="pimp-t">End-to-end agentic AI — security automation that ships without human review loops. Exactly what early engineering teams need.</div></div></div></div></div></div>

            <div className="pj" data-pj><div className="pj-bg" /><div className="pnum">02</div><div className="pbody"><div className="phead"><div><div className="ptype">Product · Dev Tools</div><h3 className="ptitle">OnBoardFlow</h3></div><div className="plinks"><a href="https://www.youtube.com/embed/Lpsfs9r_vOM" className="ch ch-l" target="_blank" rel="noreferrer">▶ Demo</a><a href="https://github.com/harshit110927/onboardflow" className="ch ch-g" target="_blank" rel="noreferrer">GitHub</a><a href="https://onboardflow.xyz" className="ch ch-g" target="_blank" rel="noreferrer">↗ Live</a></div></div><div className="pbottom"><div><div className="ptags"><span className="tag">Next.js</span><span className="tag">TypeScript</span><span className="tag">Supabase</span><span className="tag">PostgreSQL</span></div></div><div><p className="pdesc">Real-time collaborative code editor with multiple cursors, syntax highlighting, and instant sync across connected users. Zero-latency conflict resolution built from scratch — no CRDT library shortcuts.</p><div className="pimp"><div className="pimp-l">Why it matters</div><div className="pimp-t">Distributed systems thinking applied to hard concurrency problems — a core signal for founding engineer roles at dev-tool startups.</div></div></div></div></div></div>

            <div className="pj" data-pj><div className="pj-bg" /><div className="pnum">03</div><div className="pbody"><div className="phead"><div><div className="ptype">Research Build · AI</div><h3 className="ptitle">Realtime RAG<br />for Teams</h3></div><div className="plinks"><a href="https://www.youtube.com/embed/xTmmjG_vyxI" className="ch ch-l" target="_blank" rel="noreferrer">▶ Demo</a><a href="https://github.com/harshit110927/RAGrealTime" className="ch ch-g" target="_blank" rel="noreferrer">GitHub</a></div></div><div className="pbottom"><div><div className="ptags"><span className="tag">Python</span><span className="tag">RAG</span><span className="tag">Vector DB</span><span className="tag">LLM</span></div></div><div><p className="pdesc">Enterprises struggle with onboarding to custom internal stacks. This assistant resolves stack-specific questions by grounding answers in prior team conversations — cutting the "how does this work?" overhead dramatically.</p><div className="pimp"><div className="pimp-l">Why it matters</div><div className="pimp-t">Addresses knowledge loss and slow onboarding — pain every scaling startup faces. Practical RAG, not just a chatbot wrapper.</div></div></div></div></div></div>

            <div className="pj" data-pj><div className="pj-bg" /><div className="pnum">04</div><div className="pbody"><div className="phead"><div><div className="ptype">In Progress · Research</div><h3 className="ptitle">CRAG-Lite</h3></div><div className="plinks"><span className="ch ch-w">⚙ In Progress</span></div></div><div className="pbottom"><div><div className="ptags"><span className="tag">Python</span><span className="tag">RAG</span><span className="tag">Hallucinations</span><span className="tag">Docker</span></div></div><div><p className="pdesc">Experimental corrective RAG implementation focused on improving retrieval quality and reducing hallucinations. Validates retrieved context before generation — cutting confident-but-wrong outputs at the root.</p><div className="pimp"><div className="pimp-l">Why it matters</div><div className="pimp-t">Shows research depth beyond tutorials. Engineers who understand AI failure modes — not just happy paths — are rare.</div></div></div></div></div></div>
          </div>
        </div>
      </section>

      <div className="divr" />

      <section id="about">
        <div className="w">
          <div className="sl">02 — About</div>
          <div className="ag">
            <div className="al">
              <h2 className="sh" style={{ marginBottom: "1.8rem" }}>The person<br />behind the<br /><em style={{ fontStyle: "italic", color: "var(--ac)" }}>commits.</em></h2>
              <p>I'm <strong>Harshit</strong>, a builder focused on full-stack product development and practical AI systems.</p>
              <p>My current work spans collaborative developer tools, agentic workflows, and RAG-powered experiences designed to be genuinely useful in real teams — not toy demos.</p>
              <p>I enjoy bridging engineering depth with editorial visual language so products feel both fast and memorable.</p>
              <div className="st-lbl">Current Stack</div>
              <div className="tg"><span className="tag">Next.js</span><span className="tag">TypeScript</span><span className="tag">Python</span><span className="tag">LangChain</span><span className="tag">Supabase</span><span className="tag">PostgreSQL</span><span className="tag">Docker</span><span className="tag">Vector DB</span><span className="tag">LLMs</span></div>
            </div>
            <div className="prin-list" id="prlist">
              <div className="prin"><div className="pn">Clarity</div><div className="pt2">I favor simple architecture and clear interfaces over clever complexity. If it needs a diagram to explain to teammates, it probably needs a redesign.</div></div>
              <div className="prin"><div className="pn">Velocity</div><div className="pt2">I ship quickly, iterate in public, and treat user feedback as a product primitive — not an afterthought.</div></div>
              <div className="prin"><div className="pn">Craft</div><div className="pt2">I care deeply about spacing, typography, and the emotional tone of software. Good engineering should feel good to use.</div></div>
              <div className="prin"><div className="pn">Ownership</div><div className="pt2">I pick up problems end-to-end — from architecture to the pixel. No handholding, no gaps in the handoff.</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divr" />

      <section id="contact">
        <div className="w">
          <div className="sl">03 — Contact</div>
          <h2 className="chead">Let's build<br />something<br /><em>together.</em></h2>
          <p className="csub">Open to founding engineer roles, senior full-stack positions, and interesting AI projects at US-based startups.</p>
          <div className="cbtns">
            <a href="mailto:harshit110927@gmail.com" className="cb cbp">Email</a>
            <a href="https://github.com/harshit110927" target="_blank" rel="noopener noreferrer" className="cb cbg">GitHub</a>
            <a href="https://linkedin.com/in/harshit110927" target="_blank" rel="noopener noreferrer" className="cb cbg">LinkedIn</a>
            <a href="#" className="cb cbg">Resume</a>
          </div>
        </div>
      </section>

      <footer>harshit.shukla — built with intention, shipped with care — © 2026</footer>
    </>
  );
};

export default Index;
