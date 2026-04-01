import { useEffect, useMemo, useState } from "react";

interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  fullDescription?: string;
  youtubeId?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: "1",
    type: "Case Study",
    title: "H.I.L.D.A.",
    description: "Human in the loop deployment agent",
    fullDescription:
      "An autonomous AI code review agent that integrates with GitHub to detect security risks, calculate blast radius, and block dangerous pull requests in real-time.",
    youtubeId: "e6rHv_4_W6o",
    tags: ["Next.js", "LangChain", "Supabase", "TypeScript"],
    githubUrl: "https://github.com/harshit110927/hilda",
  },
  {
    id: "2",
    type: "Product",
    title: "OnBoardFlow",
    description: "Multiplayer code editor with WebSocket sync",
    fullDescription:
      "A real-time collaborative code editor supporting multiple cursors, syntax highlighting, and instant synchronization across connected users.",
    youtubeId: "Lpsfs9r_vOM",
    tags: ["NextJS", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: "https://onboardflow.xyz",
    githubUrl: "https://github.com/harshit110927/onboardflow",
  },
  {
    id: "3",
    type: "Research Build",
    title: "Realtime RAG Assistant",
    description: "Enterprise-specific query resolution assistant",
    fullDescription:
      "A RAG-based assistant designed for enterprise teams to resolve stack-specific questions using contextual memory and prior team discussions.",
    youtubeId: "xTmmjG_vyxI",
    tags: ["RAG", "Python", "Vector DB", "LLM"],
    githubUrl: "https://github.com/harshit110927/RAGrealTime",
  },
  {
    id: "4",
    type: "Experiment",
    title: "CRAG-Lite",
    description: "Hybrid implementation of CRAG research paper",
    fullDescription: "A practical implementation focused on retrieval quality and hallucination reduction.",
    tags: ["Python", "RAG", "Hallucinations", "Docker"],
  },
];

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState("");

  const activeProject = useMemo(
    () => mockProjects.find((project) => project.youtubeId === activeVideo) ?? null,
    [activeVideo],
  );

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
        setIframeSrc("");
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const openVideo = (youtubeId: string) => {
    setActiveVideo(youtubeId);
    setIframeSrc(`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIframeSrc("");
  };

  return (
    <section className="section-wrap fade-in" id="projects">
      <div className="layout-shell">
        <span className="section-number">02</span>
        <h2 className="section-title">Selected Work</h2>

        <div className="project-list">
          {mockProjects.map((project) => (
            <article key={project.id} className="project-item">
              <div className="project-main">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.youtubeId && (
                  <button className="play-pill" onClick={() => openVideo(project.youtubeId!)}>
                    ▶ Play Demo
                  </button>
                )}
              </div>

              <div className="project-meta">
                <p>{project.fullDescription || project.description}</p>
                {(project.liveUrl || project.githubUrl) && (
                  <div className="project-links">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>

              <span className="project-arrow" aria-hidden>
                →
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className={`video-lightbox ${activeVideo ? "open" : ""}`} onClick={closeVideo}>
        <div className="video-shell" onClick={(event) => event.stopPropagation()}>
          <button className="video-close" onClick={closeVideo} aria-label="Close video">
            ×
          </button>
          <div className="video-frame">
            {activeProject && (
              <iframe
                src={iframeSrc}
                title={`${activeProject.title} Demo`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
