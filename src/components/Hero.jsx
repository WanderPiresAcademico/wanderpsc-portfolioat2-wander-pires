import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__conteudo">
        <p className="hero__saudacao">Olá, eu sou</p>
        <h1 className="hero__nome">Wander Pires<span className="hero__cursor">|</span></h1>
        <p className="hero__subtitulo">Educador &bull; Naturopata &bull; Desenvolvedor Web</p>
      </div>
    </section>
  );
}

export default Hero;
