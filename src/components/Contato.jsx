import { useState } from "react";
import { useDados } from "../context/DadosContext";
import "./Contato.css";

const ARQUIVOS = [
  "index.html",
  "vite.config.js",
  "package.json",
  "public/dados.json",
  "src/main.jsx",
  "src/App.jsx",
  "src/index.css",
  "src/context/DadosContext.jsx",
  "src/components/Header.jsx",
  "src/components/Header.css",
  "src/components/Hero.jsx",
  "src/components/Hero.css",
  "src/components/SobreMim.jsx",
  "src/components/SobreMim.css",
  "src/components/DadosPessoais.jsx",
  "src/components/DadosPessoais.css",
  "src/components/Formacao.jsx",
  "src/components/Formacao.css",
  "src/components/Projetos.jsx",
  "src/components/Projetos.css",
  "src/components/Contato.jsx",
  "src/components/Contato.css",
  "src/components/Modal.jsx",
  "src/components/Modal.css",
  "src/components/EditBar.jsx",
  "src/components/EditBar.css",
];

function Contato() {
  const { contatos, modoEdicao, update } = useDados();
  const [mostrarCodigos, setMostrarCodigos] = useState(false);
  const [arquivos, setArquivos] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [abaArquivo, setAbaArquivo] = useState(ARQUIVOS[0]);

  async function abrirCodigos() {
    setMostrarCodigos(true);
    if (Object.keys(arquivos).length > 0) return;
    setCarregando(true);
    const resultado = {};
    for (const arq of ARQUIVOS) {
      try {
        let url = arq;
        if (arq.startsWith("src/") || arq === "vite.config.js" || arq === "package.json") {
          url = `https://raw.githubusercontent.com/WanderPiresAcademico/wanderpsc-portfolioat2-wander-pires/master/${arq}`;
        } else if (arq === "index.html") {
          url = `https://raw.githubusercontent.com/WanderPiresAcademico/wanderpsc-portfolioat2-wander-pires/master/index.html`;
        } else if (arq.startsWith("public/")) {
          url = `https://raw.githubusercontent.com/WanderPiresAcademico/wanderpsc-portfolioat2-wander-pires/master/${arq}`;
        }
        const resp = await fetch(url);
        resultado[arq] = resp.ok ? await resp.text() : "// Erro ao carregar arquivo";
      } catch {
        resultado[arq] = "// Erro ao carregar arquivo";
      }
    }
    setArquivos(resultado);
    setCarregando(false);
  }

  function extensao(nome) {
    if (nome.endsWith(".jsx")) return "jsx";
    if (nome.endsWith(".js")) return "js";
    if (nome.endsWith(".css")) return "css";
    if (nome.endsWith(".html")) return "html";
    if (nome.endsWith(".json")) return "json";
    return "";
  }

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

        <button className="contato__btn-codigos" onClick={abrirCodigos}>
          💻 Ver Códigos-Fonte
        </button>

        {mostrarCodigos && (
          <div className="codigos-overlay" onClick={() => setMostrarCodigos(false)}>
            <div className="codigos-modal" onClick={(e) => e.stopPropagation()}>
              <div className="codigos-modal__header">
                <h3>📂 Códigos e Scripts do Projeto</h3>
                <button className="codigos-modal__fechar" onClick={() => setMostrarCodigos(false)}>✕</button>
              </div>
              <div className="codigos-modal__body">
                <div className="codigos-modal__sidebar">
                  {ARQUIVOS.map((arq) => (
                    <button
                      key={arq}
                      className={`codigos-modal__arq ${abaArquivo === arq ? "codigos-modal__arq--ativo" : ""}`}
                      onClick={() => setAbaArquivo(arq)}
                    >
                      <span className={`codigos-modal__ext codigos-modal__ext--${extensao(arq)}`}>{extensao(arq)}</span>
                      {arq.split("/").pop()}
                    </button>
                  ))}
                </div>
                <div className="codigos-modal__codigo">
                  <div className="codigos-modal__nome-arq">{abaArquivo}</div>
                  {carregando ? (
                    <p className="codigos-modal__loading">Carregando códigos do GitHub...</p>
                  ) : (
                    <pre className="codigos-modal__pre"><code>{arquivos[abaArquivo] || "// Selecione um arquivo"}</code></pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Contato;
