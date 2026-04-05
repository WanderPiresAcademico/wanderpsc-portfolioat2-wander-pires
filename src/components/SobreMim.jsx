import { useRef } from "react";
import { useDados } from "../context/DadosContext";
import "./SobreMim.css";

function SobreMim() {
  const { sobreParagrafos, habilidades, fotoUrl, fotoZoom, modoEdicao, update } = useDados();
  const fileRef = useRef(null);

  function handleFotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("fotoUrl", reader.result);
    reader.readAsDataURL(file);
  }

  function handleZoom(e) {
    update("fotoZoom", parseFloat(e.target.value));
  }

  function editarParagrafo(i) {
    const novo = prompt("Editar parágrafo (aceita HTML):", sobreParagrafos[i]);
    if (novo !== null) update("sobreParagrafos", (prev) => prev.map((p, idx) => (idx === i ? novo : p)));
  }

  function adicionarParagrafo() {
    const texto = prompt("Novo parágrafo:");
    if (texto) update("sobreParagrafos", (prev) => [...prev, texto]);
  }

  function removerParagrafo(i) {
    if (confirm("Remover este parágrafo?"))
      update("sobreParagrafos", (prev) => prev.filter((_, idx) => idx !== i));
  }

  function adicionarHabilidade() {
    const hab = prompt("Nova habilidade:");
    if (hab) update("habilidades", (prev) => [...prev, hab]);
  }

  function removerHabilidade(i) {
    update("habilidades", (prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <h2 className="secao__titulo">Sobre mim</h2>
        <div className="sobre__conteudo">
          <div className="sobre__foto-wrapper">
            <div className="sobre__foto" onClick={() => modoEdicao && fileRef.current?.click()}>
              <img
                src={fotoUrl}
                alt="Foto de Wander Pires"
                className="sobre__foto-img"
                style={{ transform: `scale(${fotoZoom || 1})` }}
              />
              {modoEdicao && (
                <div className="sobre__foto-overlay"><span>📷 Trocar</span></div>
              )}
            </div>
            <input type="file" ref={fileRef} accept="image/*" hidden onChange={handleFotoChange} />
            {modoEdicao && (
              <div className="sobre__foto-zoom">
                <label>🔍 Zoom</label>
                <input type="range" min="0.3" max="3" step="0.05" value={fotoZoom || 1} onChange={handleZoom} />
                <span>{(fotoZoom || 1).toFixed(1)}×</span>
              </div>
            )}
          </div>

          <div className="sobre__texto">
            {sobreParagrafos.map((p, i) => (
              <div key={i} className="sobre__paragrafo-wrapper">
                <p dangerouslySetInnerHTML={{ __html: p }} />
                {modoEdicao && (
                  <div className="sobre__inline-btns">
                    <button onClick={() => editarParagrafo(i)} title="Editar">✏️</button>
                    <button onClick={() => removerParagrafo(i)} title="Remover">🗑️</button>
                  </div>
                )}
              </div>
            ))}
            {modoEdicao && (
              <button className="btn-add-inline" onClick={adicionarParagrafo}>+ Adicionar Parágrafo</button>
            )}

            <div className="sobre__habilidades">
              {habilidades.map((h, i) => (
                <span key={i} className="tag">
                  {h}
                  {modoEdicao && <button className="tag__remover" onClick={() => removerHabilidade(i)}>&times;</button>}
                </span>
              ))}
              {modoEdicao && (
                <button className="tag tag--add" onClick={adicionarHabilidade}>+ Habilidade</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMim;
