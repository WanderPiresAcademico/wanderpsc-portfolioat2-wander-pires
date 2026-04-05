import { useDados } from "../context/DadosContext";
import "./Contato.css";

function Contato() {
  const { contatos, modoEdicao, update } = useDados();

  function editarContato(i) {
    const c = contatos[i];
    const novoValor = prompt(`Editar ${c.label}:`, c.valor);
    if (novoValor !== null)
      update("contatos", (prev) => prev.map((x, idx) => (idx === i ? { ...x, valor: novoValor } : x)));
  }

  function adicionarContato() {
    const label = prompt("Label (ex: LinkedIn):");
    if (!label) return;
    const valor = prompt("Valor:");
    if (!valor) return;
    update("contatos", (prev) => [...prev, { tipo: "link", label, valor }]);
  }

  function removerContato(i) {
    if (confirm("Remover este contato?"))
      update("contatos", (prev) => prev.filter((_, idx) => idx !== i));
  }

  function linkHref(c) {
    if (c.tipo === "email") return `mailto:${c.valor}`;
    if (c.tipo === "whatsapp") return `https://wa.me/55${c.valor.replace(/\D/g, "")}`;
    return c.valor.startsWith("http") ? c.valor : `https://${c.valor}`;
  }

  function icone(c) {
    if (c.tipo === "email") return "📧";
    if (c.tipo === "whatsapp") return "📱";
    return "🔗";
  }

  return (
    <footer id="contato" className="contato">
      <div className="container">
        <h2 className="secao__titulo">Contato</h2>
        <div className="contato__lista">
          {contatos.map((c, i) => (
            <div key={i} className="contato__item-wrapper">
              <a href={linkHref(c)} className="contato__item" target="_blank" rel="noopener noreferrer">
                {icone(c)} {c.label}: {c.valor}
              </a>
              {modoEdicao && (
                <div className="contato__btns">
                  <button onClick={() => editarContato(i)} title="Editar">✏️</button>
                  <button onClick={() => removerContato(i)} title="Remover">🗑️</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {modoEdicao && (
          <button className="btn-add-inline" onClick={adicionarContato} style={{ margin: "1rem auto", display: "block" }}>
            + Adicionar Contato
          </button>
        )}
        <p className="contato__copy">
          &copy; {new Date().getFullYear()} Wander Pires Silva Coelho — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Contato;
