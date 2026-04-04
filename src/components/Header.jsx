import { useState } from "react";
import "./Header.css";

const links = [
  { href: "#sobre", label: "Sobre mim" },
  { href: "#formacao", label: "Formação" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">
          Wander Pires
        </a>
        <nav>
          <button
            className={`header__menu-btn ${menuAberto ? "ativo" : ""}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`header__links ${menuAberto ? "aberto" : ""}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
