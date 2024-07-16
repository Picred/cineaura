const Footer = () => {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <a href="/">
            <img src="/cineaura.svg" />
            <p className="text-lg text-primary">CineAura</p>
          </a>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/Picred/">
              <img src="src/assets/github.svg" alt="Github" />
            </a>
            <a href="https://www.linkedin.com/in/andreistefand/">
              <img src="src/assets/linkedin.svg" alt="Linkedin" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
