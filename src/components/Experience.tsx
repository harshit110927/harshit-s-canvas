import { motion } from "framer-motion";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

const mockExperience: Experience[] = [
  {
    id: "1",
    company: "Scramble Labs",
    role: "Founding Developer",
    startDate: "2025",
    endDate: "Present",
    description: "Leading development of AI-powered features and products for an early stage ed-tech startup.",
  },
];

const Experience = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20" id="experience">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-muted-foreground text-xs font-body tracking-[0.3em] uppercase mb-4 block">
            Career Path
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-0">
          {mockExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="timeline-item"
            >
              <div className="timeline-dot" />
              <div className="pb-2">
                <span className="text-muted-foreground text-xs font-body tracking-widest">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-tight">
                {exp.role}
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-2">
                {exp.company}
              </p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
