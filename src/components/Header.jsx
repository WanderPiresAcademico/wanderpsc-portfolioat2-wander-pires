import { useState } from "react";
import "./Header.css";

const links = [
  { href: "#sobre", label: "Sobre mim" },
  { href: "#dados", label: "Dados" },
  { href: "#formacao", label: "Formação" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo">Wander Pires</a>
        <nav>
          <button
            className={`header__menu-btn ${menuAberto ? "ativo" : ""}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`header__links ${menuAberto ? "aberto" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuAberto(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
