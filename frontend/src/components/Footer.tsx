import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <Link to="/">
            <img src="/cineaura.svg" />
            <p className="text-lg text-primary">CineAura</p>
          </Link>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/Picred/" target="_blank">
              <img src="src/assets/github.svg" alt="Github" />
            </a>
            <a
              href="https://www.linkedin.com/in/andreistefand/"
              target="_blank"
            >
              <img src="src/assets/linkedin.svg" alt="Linkedin" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
