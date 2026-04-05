import { DadosProvider } from "./context/DadosContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SobreMim from "./components/SobreMim";
import DadosPessoais from "./components/DadosPessoais";
import Formacao from "./components/Formacao";
import Projetos from "./components/Projetos";
import Contato from "./components/Contato";
import EditBar from "./components/EditBar";

function App() {
  return (
    <DadosProvider>
      <Header />
      <Hero />
      <main>
        <SobreMim />
        <DadosPessoais />
        <Formacao />
        <Projetos />
      </main>
      <Contato />
      <EditBar />
    </DadosProvider>
  );
}

export default App;
