import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-foreground uppercase tracking-tight text-xl mb-2">
              Harshit Shukla
            </p>
            <p className="text-muted-foreground text-sm font-body">
              Full-Stack Developer & AI Engineer
            </p>
          </div>

          {/* Center - Social links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/harshit110927"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/harshit110927"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:harshit110927@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-xs font-body tracking-widest">
              © {currentYear} — DESIGN & DEVELOPMENT BY HARSHIT SHUKLA
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
