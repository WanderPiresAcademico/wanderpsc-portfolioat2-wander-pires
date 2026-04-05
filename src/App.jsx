import { useState } from "react";
import { DadosProvider } from "./context/DadosContext";
import Header from "./components/Header";
import SobreMim from "./components/SobreMim";
import DadosPessoais from "./components/DadosPessoais";
import Formacao from "./components/Formacao";
import Projetos from "./components/Projetos";
import Contato from "./components/Contato";
import EditBar from "./components/EditBar";

function App() {
  const [abaAtiva, setAbaAtiva] = useState("sobre");

  return (
    <DadosProvider>
      <Header abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      <main>
        {abaAtiva === "sobre" && <SobreMim />}
        {abaAtiva === "dados" && <DadosPessoais />}
        {abaAtiva === "formacao" && <Formacao />}
        {abaAtiva === "projetos" && <Projetos />}
        {abaAtiva === "contato" && <Contato />}
      </main>
      <EditBar />
    </DadosProvider>
  );
}

export default App;
