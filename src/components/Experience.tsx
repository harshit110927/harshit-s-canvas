const values = [
  {
    title: "Systems First",
    description: "I build reusable foundations that let teams ship faster without sacrificing quality.",
  },
  {
    title: "Pragmatic Craft",
    description: "I choose practical, maintainable solutions before complexity for its own sake.",
  },
  {
    title: "Calm Execution",
    description: "I focus on clear communication, strong ownership, and dependable delivery.",
  },
];

const Experience = () => {
  return (
    <section className="section-wrap fade-in" id="about">
      <div className="layout-shell">
        <span className="section-number">03</span>
        <h2 className="section-title">About</h2>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I'm Harshit, a builder focused on full-stack products and applied AI experiences that move from idea to production quickly.
            </p>
            <p>
              I enjoy designing thoughtful interfaces, shaping clean architecture, and creating systems that teams can trust in the long run.
            </p>
            <p>
              Recently, I've been working on collaborative developer tools, enterprise AI workflows, and experiments in retrieval-powered products.
            </p>
          </div>

          <div className="about-values">
            {values.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
