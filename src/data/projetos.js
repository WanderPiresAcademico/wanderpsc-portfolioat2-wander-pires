// Array de objetos contendo os projetos – renderizado dinamicamente no componente Projetos
const projetos = [
  {
    id: 1,
    titulo: "Portfólio Pessoal",
    descricao:
      "Meu portfólio profissional com HTML5, CSS3 e JavaScript puro — layout responsivo, partículas animadas e renderização dinâmica.",
    tecnologias: ["HTML5", "CSS3", "JavaScript"],
    link: "#",
    imagem: null,
    emoji: "🌐",
  },
  {
    id: 2,
    titulo: "Gerenciador de Bibliotecas",
    descricao:
      "Controle Escolar Inteligente - Gerenciamento de Biblioteca",
    tecnologias: ["React 19", "Material UI", "Supabase", "Express.js", "Node.js"],
    link: "https://cei-sistema-biblioteca.surge.sh",
    imagem: "/img/projeto-1.jpg",
    emoji: null,
  },
  {
    id: 3,
    titulo: "EduSync-PRO",
    descricao:
      "Sistema Criador de Horário de Aula Escolar profissional, com gerador de horário emergencial, frequência de professores, calendário escolar e painel eletrônico.",
    tecnologias: ["React 19", "Material UI", "Supabase", "Express.js", "Node.js"],
    link: "https://criador-horario-aula.surge.sh/#/login",
    imagem: "/img/projeto-2.jpg",
    emoji: null,
  },
  {
    id: 4,
    titulo: "Anamnese Integrativa",
    descricao:
      "Sistema completo de apoio ao terapeuta com indicações suplementares e fitoterápicas, acompanhamento em anamnese e tratamentos terapêuticos.",
    tecnologias: ["React 19", "Material UI", "Supabase", "Express.js", "Node.js"],
    link: "https://anamneseintegrativa.surge.sh/",
    imagem: "/img/projeto-3.jpg",
    emoji: null,
  },
  {
    id: 5,
    titulo: "Gerador de Certificados",
    descricao:
      "Facilitador para gestão escolar que gera certificados editáveis em massa, acompanhado pelo Histórico Escolar do Estudante.",
    tecnologias: ["React 19", "Material UI", "Supabase", "Express.js", "Node.js"],
    link: "https://gerador-certificados.surge.sh/login.html",
    imagem: "/img/projeto-4.jpg",
    emoji: null,
  },
];

export default projetos;
