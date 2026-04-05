import "./Modal.css";

function Modal({ aberto, onFechar, titulo, children }) {
  if (!aberto) return null;
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__fechar" onClick={onFechar}>&times;</button>
        <h3 className="modal__titulo">{titulo}</h3>
        {children}
      </div>
    </div>
  );
}

export default Modal;
