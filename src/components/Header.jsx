import { useState } from "react";
import "./Header.css";

const abas = [
  { id: "sobre", label: "Sobre mim" },
  { id: "dados", label: "Dados" },
  { id: "formacao", label: "Formação" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

function Header({ abaAtiva, setAbaAtiva }) {
  const [menuAberto, setMenuAberto] = useState(false);

  function selecionarAba(id) {
    setAbaAtiva(id);
    setMenuAberto(false);
  }

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo" onClick={() => selecionarAba("sobre")}>Wander Pires</a>
        <nav>
          <button
            className={`header__menu-btn ${menuAberto ? "ativo" : ""}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`header__links ${menuAberto ? "aberto" : ""}`}>
            {abas.map((aba) => (
              <li key={aba.id}>
                <button
                  className={`header__tab-btn ${abaAtiva === aba.id ? "aba-ativa" : ""}`}
                  onClick={() => selecionarAba(aba.id)}
                >
                  {aba.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
