import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <aside className="flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/cineaura.svg"
              alt="CineAura Logo"
              className="w-12 h-12"
            />
            <p className="text-lg text-primary">CineAura</p>
          </Link>
        </aside>
        <nav className="flex flex-col items-center md:items-start">
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4 mt-2">
            <a
              href="https://github.com/Picred/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/src/assets/github.svg"
                alt="Github"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/andreistefand/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/src/assets/linkedin.svg"
                alt="Linkedin"
                className="w-6 h-6"
              />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
