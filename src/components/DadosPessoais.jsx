import { useState } from "react";
import { useDados } from "../context/DadosContext";
import "./DadosPessoais.css";

function DadosPessoais() {
  const { dadosPessoais, camposLabels, modoEdicao, update } = useDados();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  function iniciarEdicao() {
    setForm({ ...dadosPessoais });
    setEditando(true);
  }

  function salvar() {
    update("dadosPessoais", form);
    setEditando(false);
  }

  function cancelar() {
    setEditando(false);
  }

  const campos = Object.keys(camposLabels);

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
                <span className="dados__label">{camposLabels[key]}</span>
                {editando ? (
                  <input
                    className="dados__input"
                    value={form[key] || ""}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ) : (
                  <span className={`dados__valor ${!dadosPessoais[key] ? "dados__valor--vazio" : ""}`}>
                    {dadosPessoais[key] || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DadosPessoais;
