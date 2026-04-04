import projetos from "../data/projetos";
import "./Projetos.css";

function ProjetoCard({ projeto }) {
  const temImagem = projeto.imagem !== null;

  return (
    <article className="projeto-card">
      <div className="projeto-card__img">
        {temImagem ? (
          <img
            src={projeto.imagem}
            alt={projeto.titulo}
            className="projeto-card__img-foto"
          />
        ) : (
          <span className="projeto-card__emoji">{projeto.emoji}</span>
        )}
      </div>
      <div className="projeto-card__body">
        <h3 className="projeto-card__titulo">{projeto.titulo}</h3>
        <p className="projeto-card__descricao">{projeto.descricao}</p>
        <div className="projeto-card__techs">
          {projeto.tecnologias.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
        {projeto.link && projeto.link !== "#" && (
          <a
            href={projeto.link}
            className="projeto-card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Projeto
          </a>
        )}
      </div>
    </article>
  );
}

function Projetos() {
  return (
    <section id="projetos" className="projetos">
      <div className="container">
        <h2 className="secao__titulo">Meus Projetos</h2>
        <div className="projetos__grid">
          {projetos.map((projeto) => (
            <ProjetoCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projetos;
