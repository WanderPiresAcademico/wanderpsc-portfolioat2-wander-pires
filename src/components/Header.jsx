import { useState, useRef } from "react";
import { useDados } from "../context/DadosContext";
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
  const { modoEdicao, setModoEdicao } = useDados();
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  function selecionarAba(id) {
    setAbaAtiva(id);
    setMenuAberto(false);
  }

  function handleLogoClick(e) {
    e.preventDefault();
    tapCount.current++;
    if (tapCount.current === 1) {
      tapTimer.current = setTimeout(() => {
        // Toque simples: ir para Sobre
        if (tapCount.current < 3) selecionarAba("sobre");
        tapCount.current = 0;
      }, 500);
    }
    if (tapCount.current >= 3) {
      clearTimeout(tapTimer.current);
      tapCount.current = 0;
      setModoEdicao((prev) => {
        const novo = !prev;
        localStorage.setItem("portfolio_modo_edicao", String(novo));
        return novo;
      });
    }
  }

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className={`header__logo ${modoEdicao ? "header__logo--edit" : ""}`} onClick={handleLogoClick}>
          Wander Pires {modoEdicao && "✏️"}
        </a>
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
