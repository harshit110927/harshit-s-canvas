interface ContactProps {
  firstName: string;
}

const links = [
  { label: "Email", href: "mailto:harshit110927@gmail.com", primary: true },
  { label: "GitHub", href: "https://github.com/harshit110927" },
  { label: "LinkedIn", href: "https://linkedin.com/in/harshit110927" },
  { label: "Resume", href: "#" },
];

const Contact = ({ firstName }: ContactProps) => {
  return (
    <section id="contact" className="section-wrap fade-in">
      <div className="layout-shell">
        <span className="section-number">04</span>
        <h2 className="section-title">Contact</h2>

        <h3 className="contact-title">Let's build something, {firstName}.</h3>

        <div className="contact-actions">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`contact-btn ${link.primary ? "primary" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
