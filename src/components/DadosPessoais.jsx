import { useState } from "react";
import { useDados } from "../context/DadosContext";
import "./DadosPessoais.css";

function DadosPessoais() {
  const { dadosPessoais, camposLabels, modoEdicao, update } = useDados();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [formLabels, setFormLabels] = useState({});
  const [novoCampoKey, setNovoCampoKey] = useState("");
  const [novoCampoLabel, setNovoCampoLabel] = useState("");
  const [novoCampoValor, setNovoCampoValor] = useState("");

  function iniciarEdicao() {
    setForm({ ...dadosPessoais });
    setFormLabels({ ...camposLabels });
    setEditando(true);
  }

  function salvar() {
    update("dadosPessoais", form);
    update("camposLabels", formLabels);
    setEditando(false);
  }

  function cancelar() {
    setEditando(false);
    setNovoCampoKey("");
    setNovoCampoLabel("");
    setNovoCampoValor("");
  }

  function removerCampo(key) {
    if (!confirm(`Excluir o campo "${formLabels[key]}"?`)) return;
    const novoForm = { ...form };
    const novoLabels = { ...formLabels };
    delete novoForm[key];
    delete novoLabels[key];
    setForm(novoForm);
    setFormLabels(novoLabels);
  }

  function adicionarCampo() {
    if (!novoCampoLabel.trim()) return;
    const key = novoCampoLabel.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    if (formLabels[key]) {
      alert("Já existe um campo com esse identificador.");
      return;
    }
    setFormLabels({ ...formLabels, [key]: novoCampoLabel.trim() });
    setForm({ ...form, [key]: novoCampoValor.trim() });
    setNovoCampoLabel("");
    setNovoCampoValor("");
  }

  const campos = Object.keys(editando ? formLabels : camposLabels);

  return (
    <section id="dados" className="dados">
      <div className="container">
        <h2 className="secao__titulo">Dados Pessoais</h2>
        <div className="dados__card">
          {modoEdicao && !editando && (
            <button className="dados__btn-editar" onClick={iniciarEdicao}>✏️ Editar</button>
          )}
          {editando && (
            <div className="dados__btn-group">
              <button className="dados__btn-salvar" onClick={salvar}>💾 Salvar</button>
              <button className="dados__btn-cancelar" onClick={cancelar}>Cancelar</button>
            </div>
          )}
          <div className="dados__grid">
            {campos.map((key) => (
              <div key={key} className="dados__item">
                <span className="dados__label">{(editando ? formLabels : camposLabels)[key]}</span>
                {editando ? (
                  <div className="dados__edit-row">
                    <input
                      className="dados__input"
                      value={form[key] || ""}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                    <button className="dados__btn-excluir" onClick={() => removerCampo(key)} title="Excluir campo">🗑️</button>
                  </div>
                ) : (
                  <span className={`dados__valor ${!dadosPessoais[key] ? "dados__valor--vazio" : ""}`}>
                    {dadosPessoais[key] || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>
          {editando && (
            <div className="dados__novo-campo">
              <h4 className="dados__novo-titulo">➕ Adicionar novo campo</h4>
              <div className="dados__novo-row">
                <input
                  className="dados__input"
                  placeholder="Nome do campo (ex: CPF)"
                  value={novoCampoLabel}
                  onChange={(e) => setNovoCampoLabel(e.target.value)}
                />
                <input
                  className="dados__input"
                  placeholder="Valor (ex: 123.456.789-00)"
                  value={novoCampoValor}
                  onChange={(e) => setNovoCampoValor(e.target.value)}
                />
                <button className="dados__btn-adicionar" onClick={adicionarCampo}>Adicionar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DadosPessoais;
