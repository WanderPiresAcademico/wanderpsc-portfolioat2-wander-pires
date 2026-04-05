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

      // Sempre restaurar dados salvos do localStorage (independente do modo edição)
      const saved = localStorage.getItem("portfolio_dados_all");
      if (saved) {
        try { base = { ...base, ...JSON.parse(saved) }; } catch (_) {}
      }

      const editMode = localStorage.getItem("portfolio_modo_edicao") === "true";
      if (editMode) setModoEdicao(true);

      setDados(base);
      setCarregado(true);
    }
    carregar();
  }, []);

  // ── Persiste no localStorage sempre que dados mudam ──
  useEffect(() => {
    if (!carregado) return;
    localStorage.setItem("portfolio_dados_all", JSON.stringify(dados));
  }, [dados, carregado]);

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

  const publicar = useCallback(async () => {
    const REPO = "WanderPiresAcademico/wanderpsc-portfolioat2-wander-pires";
    const PATH = "public/dados.json";
    let token = localStorage.getItem("github_token");

    if (!token) {
      token = prompt("Cole seu GitHub Personal Access Token (precisa de permissão 'repo').\nSerá salvo localmente para publicações futuras:");
      if (!token) return;
      localStorage.setItem("github_token", token.trim());
      token = token.trim();
    }

    try {
      // Buscar SHA atual do arquivo
      const getResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!getResp.ok) throw new Error("Falha ao acessar repositório. Verifique o token.");
      const fileData = await getResp.json();

      // Enviar atualização
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(dados, null, 2))));
      const putResp = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Atualizar dados.json via portfólio",
          content,
          sha: fileData.sha,
        }),
      });

      if (!putResp.ok) {
        const err = await putResp.json();
        if (putResp.status === 401 || putResp.status === 403) {
          localStorage.removeItem("github_token");
          throw new Error("Token inválido ou expirado. Tente publicar novamente.");
        }
        throw new Error(err.message || "Erro ao publicar");
      }

      alert("✅ Publicado com sucesso!\nO Vercel irá atualizar automaticamente em ~1 minuto.\nTodos os dispositivos verão as alterações.");
    } catch (e) {
      alert("❌ Erro: " + e.message);
    }
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
