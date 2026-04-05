import { useState, useRef } from "react";
import { useDados } from "../context/DadosContext";
import Modal from "./Modal";
import "./Projetos.css";

const FORM_VAZIO = { titulo: "", descricao: "", tecnologias: "", link: "", emoji: "🌐" };

function isImagem(emoji) {
  return emoji && (emoji.startsWith("data:image") || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(emoji));
}

function ProjetoCard({ projeto, index, onEditar, onRemover, onZoom, modoEdicao }) {
  const temImg = isImagem(projeto.emoji);
  const zoom = projeto.imgZoom || 1;

  return (
    <article className="projeto-card">
      {modoEdicao && (
        <div className="projeto-card__acoes">
          <button onClick={() => onEditar(index)} title="Editar">✏️</button>
          <button onClick={() => onRemover(index)} title="Remover">🗑️</button>
        </div>
      )}
      <div className="projeto-card__img">
        {temImg ? (
          <img src={projeto.emoji} alt={projeto.titulo}
            className="projeto-card__img-foto"
            style={{ transform: `scale(${zoom})` }} />
        ) : (
          <span className="projeto-card__emoji">{projeto.emoji || "🌐"}</span>
        )}
      </div>
      {modoEdicao && temImg && (
        <div className="projeto-card__zoom">
          <label>🔍</label>
          <input type="range" min="0.2" max="3" step="0.05" value={zoom}
            onChange={(e) => onZoom(index, parseFloat(e.target.value))} />
          <span>{zoom.toFixed(1)}×</span>
        </div>
      )}
      <div className="projeto-card__body">
        <h3 className="projeto-card__titulo">{projeto.titulo}</h3>
        <p className="projeto-card__descricao">{projeto.descricao}</p>
        <div className="projeto-card__techs">
          {(projeto.tecnologias || []).map((t, i) => <span key={i} className="tag">{t}</span>)}
        </div>
        {projeto.link && projeto.link !== "#" && (
          <a href={projeto.link} className="projeto-card__link" target="_blank" rel="noopener noreferrer">
            Ver Projeto
          </a>
        )}
      </div>
    </article>
  );
}

function Projetos() {
  const { projetos, modoEdicao, adicionarProjeto, editarProjeto, removerProjeto } = useDados();
  const [modalAberto, setModalAberto] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const fileRef = useRef(null);

  function abrirAdicionar() {
    setEditIndex(null);
    setForm(FORM_VAZIO);
    setModalAberto(true);
  }

  function abrirEditar(i) {
    setEditIndex(i);
    const p = projetos[i];
    setForm({
      titulo: p.titulo,
      descricao: p.descricao,
      tecnologias: (p.tecnologias || []).join(", "),
      link: p.link || "",
      emoji: p.emoji || "🌐",
    });
    setModalAberto(true);
  }

  function salvar(e) {
    e.preventDefault();
    const projeto = {
      titulo: form.titulo,
      descricao: form.descricao,
      tecnologias: form.tecnologias.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link,
      emoji: form.emoji,
      imgZoom: editIndex !== null ? (projetos[editIndex].imgZoom || 1) : 1,
    };
    if (editIndex !== null) editarProjeto(editIndex, projeto);
    else adicionarProjeto(projeto);
    setModalAberto(false);
  }

  function handleRemover(i) {
    if (confirm("Remover este projeto?")) removerProjeto(i);
  }

  function handleZoom(i, value) {
    editarProjeto(i, { imgZoom: value });
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, emoji: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <section id="projetos" className="projetos">
      <div className="container">
        <h2 className="secao__titulo">Meus Projetos</h2>
        <div className="projetos__grid">
          {projetos.map((p, i) => (
            <ProjetoCard key={i} projeto={p} index={i}
              onEditar={abrirEditar} onRemover={handleRemover}
              onZoom={handleZoom} modoEdicao={modoEdicao} />
          ))}
        </div>

        {modoEdicao && (
          <button className="btn-add-secao" onClick={abrirAdicionar}>
            <span>+</span> Adicionar Projeto
          </button>
        )}
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)}
        titulo={editIndex !== null ? "Editar Projeto" : "Novo Projeto"}>
        <form className="modal__form" onSubmit={salvar}>
          <label>
            Emoji / Imagem
            <div className="emoji-input__preview" onClick={() => fileRef.current?.click()}>
              {isImagem(form.emoji)
                ? <img src={form.emoji} alt="Preview" />
                : <span>{form.emoji || "🌐"}</span>}
            </div>
            <div className="emoji-input__actions">
              <input className="emoji-input__text" placeholder="Emoji: 🌐"
                value={isImagem(form.emoji) ? "" : form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
              <button type="button" className="emoji-input__btn-img"
                onClick={() => fileRef.current?.click()}>📁</button>
              <input type="file" ref={fileRef} accept="image/*" hidden onChange={handleImageUpload} />
            </div>
          </label>
          <label>
            Título
            <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
          </label>
          <label>
            Descrição
            <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} required />
          </label>
          <label>
            Tecnologias (separadas por vírgula)
            <input value={form.tecnologias} onChange={(e) => setForm({ ...form, tecnologias: e.target.value })} required />
          </label>
          <label>
            Link do Projeto
            <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
          </label>
          <button type="submit" className="modal__btn-salvar">Salvar</button>
        </form>
      </Modal>
    </section>
  );
}

export default Projetos;
