import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/harshit110927", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/harshit110927", label: "LinkedIn" },
    { icon: Mail, href: "mailto:harshit110927@gmail.com", label: "Email" },
  ];

  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-16 pb-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        {/* Role label */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-muted-foreground text-sm font-body tracking-[0.3em] uppercase">
            Full-Stack Developer & AI Engineer
          </span>
        </motion.div>

        {/* Name and Headline Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-2">
          {/* Main Name */}
          <motion.h1 variants={itemVariants} className="hero-name text-foreground">
            HARSHIT
            <br />
            SHUKLA
          </motion.h1>

          {/* Headline - Right side on large screens */}
          <motion.p 
            variants={itemVariants} 
            className="hero-headline text-foreground lg:text-right lg:max-w-md"
          >
            I ship production-ready<br className="hidden lg:block" /> tools in days.
          </motion.p>
        </div>

        {/* Subhead - moved up */}
        <motion.p variants={itemVariants} className="hero-subhead text-muted-foreground max-w-xl mb-6">
          Full-stack (Next.js/Spring Boot) + AI (RAG/Agents). Building the future, one commit at a time.
        </motion.p>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex gap-8 items-center">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link font-body text-sm"
            >
              <link.icon size={18} />
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 right-8 text-muted-foreground text-xs font-body tracking-widest">
        <span className="opacity-50">[ PORTFOLIO 2025 ]</span>
      </div>
    </section>
  );
};

export default Hero;
