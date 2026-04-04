import "./SobreMim.css";

const habilidades = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Supabase",
  "Material UI",
  "Git & GitHub",
];

function SobreMim() {
  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <h2 className="secao__titulo">Sobre mim</h2>
        <div className="sobre__conteudo">
          <div className="sobre__foto-wrapper">
            <div className="sobre__foto">
              <img
                src="/img/Wander.jpeg"
                alt="Foto de Wander Pires Silva Coelho"
                className="sobre__foto-img"
              />
            </div>
          </div>
          <div className="sobre__texto">
            <p>
              Olá! Meu nome é <strong>Wander Pires Silva Coelho</strong>,
              nasci em <strong>20 de maio de 1979</strong>, natural de{" "}
              <strong>São Paulo - SP</strong>. Sou educador, naturopata e
              estudante de programação web. Atuo como Diretor Escolar do CETI
              Desembargador Amaral em Curimatá-PI desde 2010 e sou professor
              efetivo das redes municipal e estadual de educação do Piauí.
            </p>
            <p>
              Este portfólio foi construído com <strong>React</strong>,
              demonstrando componentização, renderização dinâmica de dados e
              boas práticas de desenvolvimento web moderno.
            </p>
            <div className="sobre__habilidades">
              {habilidades.map((hab) => (
                <span key={hab} className="tag">
                  {hab}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMim;
