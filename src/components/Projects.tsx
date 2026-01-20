import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ExternalLink, Github, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  previewVideo?: string;
  fullVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  thumbnail?: string;
}

// Mock projects for initial demo
const mockProjects: Project[] = [
  {
    id: "1",
    title: "H.I.L.D.A.",
    description: "Human In the Loop Deployement Agent",
    fullDescription: "An autonomous AI code review agent that integrates with GitHub to detect security risks, calculate blast radius, and block dangerous Pull Requests in real-time.",
    tags: ["Next.js", "LangChain", "Supabase", "TypeScript"],
    //liveUrl: "https://example.com",
    fullVideo: "https://youtu.be/e6rHv_4_W6o",
    githubUrl: "https://github.com/harshit110927/hilda",
  },
  {
    id: "2",
    title: "OnBoardFlow",
    description: "Multiplayer code editor with WebSocket sync",
    fullDescription: "A real-time collaborative code editor supporting multiple cursors, syntax highlighting, and instant synchronization across connected users.",
    tags: ["NextJS", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: "https://onboardflow.xyz",
    fullVideo: "https://youtu.be/Lpsfs9r_vOM".
    githubUrl: "https://github.com/harshit110927/onboardflow",
  },
  {
    id: "3",
    title: "Realtime RAG assistant for teams",
    description: "A RAG based assistant for enterprise specific tech stack query resolution",
    fullDescription: "Enterprises often face an issue of training and understanding their enterprise specific tech stack. We solve the issue by providing a RAG based assistant to resolve queries following the previous chats.",
    tags: ["RAG", "Python", "Vector DB", "LLM"],
    //liveUrl: "https://example.com",
    fullVIdeo: "https://youtu.be/xTmmjG_vyxI",
    githubUrl: "https://github.com/harshit110927/RAGrealTime",
  },
  {
    id: "4",
    title: "CRAG-Lite",
    description: "Hybrid implementation of CRAG research paper",
    fullDescription: "Undergoing",
    tags: ["Python", "RAG", "Hallucinations", "Docker"],
    // liveUrl: "https://example.com",
    // githubUrl: "https://github.com/harshit110927",
  },
  // {
  //   id: "5",
  //   title: "Voice AI Agent",
  //   description: "Conversational AI with real-time speech",
  //   fullDescription: "An intelligent voice assistant capable of natural conversations, task execution, and integration with various APIs and services.",
  //   tags: ["Whisper", "GPT-4", "ElevenLabs", "Node.js"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/harshit110927",
  // },
];

const ProjectCard = ({ 
  project, 
  onSelect 
}: { 
  project: Project; 
  onSelect: (project: Project) => void;
}) => {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={() => onSelect(project)}
      className="project-card bg-card group snap-start relative hover:z-50"
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Preview video or gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-background">
        {project.previewVideo ? (
          <video
            src={project.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              className="text-6xl font-display font-bold text-foreground/5"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {project.title.charAt(0)}
            </motion.div>
          </div>
        )}
      </div>

      {/* Content overlay */}
      <div className="project-card-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm font-body">
            {project.description}
          </p>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <Play size={16} className="text-background ml-0.5" />
          </div>
        </motion.div>
      </div>

      {/* Project number */}
      <div className="absolute top-4 left-4 text-xs font-body text-muted-foreground tracking-widest">
        [ 0{project.id} ]
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: Project; 
  onClose: () => void;
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>{project.title}</DialogTitle>
        </VisuallyHidden.Root>
        <motion.div layoutId={`project-${project.id}`}>
          {/* Video section */}
          <div className="aspect-video bg-muted relative">
            {project.fullVideo ? (
              <iframe
                src={project.fullVideo}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground font-body">No video available</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground uppercase tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-muted-foreground font-body">
                  {project.fullDescription || project.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted text-muted-foreground text-xs font-body rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-subtle px-6 py-3 rounded-full font-body text-sm flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-subtle px-6 py-3 rounded-full font-body text-sm flex items-center gap-2"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="pt-12 pb-6" id="projects">
      <div className="max-w-7xl mx-auto mb-8 px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-muted-foreground text-xs font-body tracking-[0.3em] uppercase mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            Projects
          </h2>
        </motion.div>
      </div>

      <LayoutGroup>
        {/* Scroll hint */}
        <div className="px-6 md:px-12 lg:px-20 mb-4">
          <span className="text-muted-foreground text-xs font-body tracking-widest uppercase">
            ← Scroll sideways →
          </span>
        </div>

        <div className="relative py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-8 snap-x snap-mandatory overflow-x-auto overflow-y-visible px-6 md:px-12 lg:px-20 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
};

export default Projects;
