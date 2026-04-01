const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="layout-shell footer-row">
        <p>© {currentYear} Harshit Shukla</p>
        <p>
          Designed & built by harshit<span>.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
