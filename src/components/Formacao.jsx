import { useState } from "react";
import formacoes from "../data/formacoes";
import "./Formacao.css";

const filtros = [
  "Todos",
  "Graduação",
  "Pós-Graduação",
  "Curso Livre",
  "Experiência Profissional",
];

function Formacao() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const formacoesFiltradas =
    filtroAtivo === "Todos"
      ? formacoes
      : formacoes.filter((f) => f.tipo === filtroAtivo);

  return (
    <section id="formacao" className="formacao">
      <div className="container">
        <h2 className="secao__titulo">Formação &amp; Cursos</h2>

        <div className="formacao__filtros">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              className={`filtro-btn ${filtroAtivo === filtro ? "ativo" : ""}`}
              onClick={() => setFiltroAtivo(filtro)}
            >
              {filtro}
            </button>
          ))}
        </div>

        <div className="formacao__lista">
          {formacoesFiltradas.map((f, i) => (
            <div key={i} className="formacao-card">
              <span className="formacao-card__tipo">{f.tipo}</span>
              <h3 className="formacao-card__curso">{f.curso}</h3>
              <p className="formacao-card__instituicao">{f.instituicao}</p>
              <p className="formacao-card__detalhes">
                {f.local} {f.local && f.periodo ? " · " : ""} {f.periodo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Formacao;
