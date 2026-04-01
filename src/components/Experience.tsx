const values = [
  {
    title: "Clarity",
    description: "I favor simple architecture and clear interfaces over clever complexity.",
  },
  {
    title: "Velocity",
    description: "I ship quickly, iterate in public, and use feedback as a product tool.",
  },
  {
    title: "Craft",
    description: "I care deeply about spacing, typography, and the emotional tone of software.",
  },
];

const Experience = () => {
  return (
    <section className="section section-divider" id="about">
      <div className="content-wrap">
        <p className="section-number fade-in">02</p>
        <h2 className="section-title fade-in">About</h2>

        <div className="about-grid fade-in">
          <div className="about-copy">
            <p>
              I’m Harshit, a builder focused on full-stack product development and practical AI systems.
            </p>
            <p>
              My current work spans collaborative developer tools, agentic workflows, and RAG-powered experiences that are designed to be genuinely useful in real teams.
            </p>
            <p>
              I enjoy bridging engineering depth with editorial visual language so products feel both fast and memorable.
            </p>
          </div>

          <div className="about-values">
            {values.map((value) => (
              <div key={value.title} className="value-item">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
