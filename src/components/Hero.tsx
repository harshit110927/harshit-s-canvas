import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const STOIC_QUOTES = [
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", author: "Epictetus" },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
  { text: "You have power over your mind — not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
];

const Hero = () => {
  const [quote, setQuote] = useState(STOIC_QUOTES[0]);

  useEffect(() => {
    // Pick a random quote on mount (reload)
    const randomIndex = Math.floor(Math.random() * STOIC_QUOTES.length);
    setQuote(STOIC_QUOTES[randomIndex]);
  }, []);

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
        {/* Name and Right Column Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          {/* Left: Name + "I ship" line */}
          <div>
            <motion.h1 variants={itemVariants} className="hero-name text-foreground">
              HARSHIT
              <br />
              SHUKLA
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="hero-subhead text-muted-foreground max-w-xl mt-4"
            >
              I ship production-ready tools in days.
            </motion.p>
          </div>

          {/* Right: Full-stack line + Stoic Quote */}
          <div className="lg:text-right lg:max-w-md flex flex-col gap-6 lg:items-end">
            <motion.p 
              variants={itemVariants} 
              className="text-muted-foreground text-lg md:text-xl font-body"
            >
              Full-stack (Next.js/Spring Boot) + AI (RAG/Agents). Building the future, one commit at a time.
            </motion.p>

            {/* Stoic Quote Section */}
            <motion.div 
              variants={itemVariants} 
              className="py-4 border-r-2 lg:border-l-0 border-l-2 border-muted-foreground/30 pr-6 lg:pl-0 pl-6 lg:pr-6 max-w-sm"
            >
              <p className="text-foreground/80 text-base font-body italic leading-relaxed">
                "{quote.text}"
              </p>
              <p className="text-muted-foreground text-sm font-body mt-2">
                — {quote.author}
              </p>
            </motion.div>
          </div>
        </div>

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
