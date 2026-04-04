import "./Footer.css";

function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="container">
        <h2 className="secao__titulo">Contato</h2>
        <div className="footer__contatos">
          <a href="mailto:wanderpsc@gmail.com" className="footer__item">
            📧 wanderpsc@gmail.com
          </a>
          <a
            href="https://wa.me/5589981398723"
            className="footer__item"
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 (89) 9 8139 8723
          </a>
        </div>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Wander Pires Silva Coelho. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
