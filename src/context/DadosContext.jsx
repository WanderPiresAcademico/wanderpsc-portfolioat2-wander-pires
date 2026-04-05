import { createContext, useContext, useState, useEffect, useCallback } from "react";

const DadosContext = createContext(null);

export function useDados() {
  return useContext(DadosContext);
}

const KEYS = [
  "projetos", "formacoes", "dadosPessoais", "camposLabels",
  "sobreParagrafos", "habilidades", "contatos", "fotoUrl", "fotoZoom",
];

const DEFAULTS = {
  projetos: [], formacoes: [], dadosPessoais: {}, camposLabels: {},
  sobreParagrafos: [], habilidades: [], contatos: [],
  fotoUrl: "/img/Wander.jpeg", fotoZoom: 1,
};

export function DadosProvider({ children }) {
  const [dados, setDados] = useState(DEFAULTS);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // ── Carrega dados.json + localStorage override ──
  useEffect(() => {
    async function carregar() {
      let base = { ...DEFAULTS };
      try {
        const r = await fetch("/dados.json");
        if (r.ok) { const j = await r.json(); base = { ...DEFAULTS, ...j }; }
      } catch (_) {}

      const editMode = localStorage.getItem("portfolio_modo_edicao") === "true";
      if (editMode) {
        const saved = localStorage.getItem("portfolio_dados_all");
        if (saved) try { base = { ...base, ...JSON.parse(saved) }; } catch (_) {}
        setModoEdicao(true);
      }
      setDados(base);
      setCarregado(true);
    }
    carregar();
  }, []);

  // ── Persiste no localStorage quando em modo edição ──
  useEffect(() => {
    if (!carregado || !modoEdicao) return;
    localStorage.setItem("portfolio_dados_all", JSON.stringify(dados));
  }, [dados, modoEdicao, carregado]);

  // ── Atalho Ctrl+Shift+E ──
  useEffect(() => {
    function handler(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        setModoEdicao((prev) => {
          const novo = !prev;
          localStorage.setItem("portfolio_modo_edicao", String(novo));
          return novo;
        });
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Helpers ──
  const update = useCallback((key, value) => {
    setDados((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key]) : value,
    }));
  }, []);

  const publicar = useCallback(() => {
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dados.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    alert("dados.json baixado!\\nSubstitua na pasta public/ e faça push para o GitHub.\\nA Vercel publicará automaticamente.");
  }, [dados]);

  // ── CRUD Projetos ──
  const adicionarProjeto = useCallback((p) => update("projetos", (prev) => [...prev, p]), [update]);
  const editarProjeto = useCallback((i, p) => update("projetos", (prev) => prev.map((x, idx) => (idx === i ? { ...x, ...p } : x))), [update]);
  const removerProjeto = useCallback((i) => update("projetos", (prev) => prev.filter((_, idx) => idx !== i)), [update]);

  // ── CRUD Formações ──
  const adicionarFormacao = useCallback((f) => update("formacoes", (prev) => [...prev, f]), [update]);
  const editarFormacao = useCallback((i, f) => update("formacoes", (prev) => prev.map((x, idx) => (idx === i ? { ...x, ...f } : x))), [update]);
  const removerFormacao = useCallback((i) => update("formacoes", (prev) => prev.filter((_, idx) => idx !== i)), [update]);

  const value = {
    ...dados, modoEdicao, carregado, setModoEdicao, update, publicar,
    adicionarProjeto, editarProjeto, removerProjeto,
    adicionarFormacao, editarFormacao, removerFormacao,
  };

  return <DadosContext.Provider value={value}>{children}</DadosContext.Provider>;
}
