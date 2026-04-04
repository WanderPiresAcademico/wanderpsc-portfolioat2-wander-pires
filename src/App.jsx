import Header from "./components/Header";
import Hero from "./components/Hero";
import SobreMim from "./components/SobreMim";
import Formacao from "./components/Formacao";
import Projetos from "./components/Projetos";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <SobreMim />
        <Formacao />
        <Projetos />
      </main>
      <Footer />
    </>
  );
}

export default App;
