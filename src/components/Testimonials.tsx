import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CTO, TechStart",
    quote: "Harshit delivered our MVP in just 2 weeks. Incredible speed without compromising quality.",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Product Lead, InnovateCo",
    quote: "The AI features he built transformed our product. Users love the intelligent recommendations.",
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Founder, DataFlow",
    quote: "Best developer I've worked with. Clean code, clear communication, always delivers.",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Engineering Manager",
    quote: "Harshit's full-stack expertise saved us months of development time.",
  },
];

const Testimonials = () => {
  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...mockTestimonials, ...mockTestimonials];

  return (
    <section className="py-24 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-muted-foreground text-xs font-body tracking-[0.3em] uppercase mb-4 block">
            What People Say
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            Testimonials
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="marquee hover:pause"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] p-8 bg-card border border-border rounded-lg"
            >
              <p className="text-foreground font-body text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground uppercase tracking-tight">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm font-body">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
