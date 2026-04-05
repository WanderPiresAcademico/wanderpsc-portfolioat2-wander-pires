import { useState } from "react";
import { useDados } from "../context/DadosContext";
import Modal from "./Modal";
import "./Formacao.css";

const FILTROS = ["Todos", "Graduação", "Pós-Graduação", "Curso Técnico", "Curso Livre", "Experiência Profissional"];

const TIPOS = [
  "Ensino Fundamental", "Ensino Médio", "Graduação", "Pós-Graduação",
  "Curso Técnico", "Curso Livre", "Experiência Profissional",
];

const FORM_VAZIO = { tipo: "", instituicao: "", curso: "", local: "", periodo: "" };

function Formacao() {
  const { formacoes, modoEdicao, adicionarFormacao, editarFormacao, removerFormacao } = useDados();
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);

  const filtradas = filtroAtivo === "Todos"
    ? formacoes
    : formacoes.filter((f) => f.tipo === filtroAtivo);

  function abrirAdicionar() {
    setEditIndex(null);
    setForm(FORM_VAZIO);
    setModalAberto(true);
  }

  function abrirEditar(realIndex) {
    setEditIndex(realIndex);
    setForm({ ...formacoes[realIndex] });
    setModalAberto(true);
  }

  function salvar(e) {
    e.preventDefault();
    if (editIndex !== null) editarFormacao(editIndex, form);
    else adicionarFormacao(form);
    setModalAberto(false);
  }

  function handleRemover(realIndex) {
    if (confirm("Remover esta formação?")) removerFormacao(realIndex);
  }

  // Encontrar o index real no array original
  function realIndex(item) {
    return formacoes.indexOf(item);
  }

  return (
    <section id="formacao" className="formacao">
      <div className="container">
        <h2 className="secao__titulo">Formação &amp; Cursos</h2>

        <div className="formacao__filtros">
          {FILTROS.map((f) => (
            <button key={f} className={`filtro-btn ${filtroAtivo === f ? "ativo" : ""}`}
              onClick={() => setFiltroAtivo(f)}>{f}</button>
          ))}
        </div>

        <div className="formacao__lista">
          {filtradas.map((f, i) => {
            const ri = realIndex(f);
            return (
              <div key={ri} className="formacao-card">
                {modoEdicao && (
                  <div className="formacao-card__acoes">
                    <button onClick={() => abrirEditar(ri)} title="Editar">✏️</button>
                    <button onClick={() => handleRemover(ri)} title="Remover">🗑️</button>
                  </div>
                )}
                <span className="formacao-card__tipo">{f.tipo}</span>
                <h3 className="formacao-card__curso">{f.curso}</h3>
                <p className="formacao-card__instituicao">{f.instituicao}</p>
                <p className="formacao-card__detalhes">
                  {f.local}{f.local && f.periodo ? " · " : ""}{f.periodo}
                </p>
              </div>
            );
          })}
        </div>

        {modoEdicao && (
          <button className="btn-add-secao" onClick={abrirAdicionar}>
            <span>+</span> Adicionar Formação
          </button>
        )}
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)}
        titulo={editIndex !== null ? "Editar Formação" : "Nova Formação"}>
        <form className="modal__form" onSubmit={salvar}>
          <label>
            Tipo
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} required>
              <option value="">Selecione...</option>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label>
            Instituição
            <input value={form.instituicao} onChange={(e) => setForm({ ...form, instituicao: e.target.value })} required />
          </label>
          <label>
            Curso / Descrição
            <input value={form.curso} onChange={(e) => setForm({ ...form, curso: e.target.value })} required />
          </label>
          <label>
            Local
            <input value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} />
          </label>
          <label>
            Período
            <input value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} />
          </label>
          <button type="submit" className="modal__btn-salvar">Salvar</button>
        </form>
      </Modal>
    </section>
  );
}

export default Formacao;
