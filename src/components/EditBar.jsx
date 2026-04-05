import { useDados } from "../context/DadosContext";
import "./EditBar.css";

function EditBar() {
  const { modoEdicao, publicar } = useDados();
  if (!modoEdicao) return null;

  return (
    <div className="edit-bar">
      <span className="edit-bar__label">✏️ Modo Edição Ativo</span>
      <button className="edit-bar__btn" onClick={publicar}>
        🚀 Publicar Alterações
      </button>
    </div>
  );
}

export default EditBar;
