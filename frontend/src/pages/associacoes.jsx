/*import React from "react";
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"

const Associacoes= () =>{
    const [associacoes, setAssociacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/associacoes")
      .then((response) => response.json())
      .then((data) => setAssociacoes(data))
      .catch((error) => console.error("Erro ao buscar associações:", error));
  }, []);
    return(
      <div>
        <Navbar/>
         <div className="container">
      {associacoes.map((assoc) => (
        <div key={assoc.id} className="card">
          {assoc.media ? (
            <img
              src={`http://localhost:3000/${assoc.media}`}
              alt={`Emblema de ${assoc.nome_A}`}
              className="card-image"
            />
          ) : (
            <div className="placeholder">imagem</div>
          )}
          <div className="association-name">{assoc.nome_A}</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Associacoes;*/

import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import logoRancho from "../../public/Rancho_logo.jpg";
import "../styles/associacoes.css";

const Associacoes = () => {
  return (
    <div>
      <Navbar />
      <div className="associacao-container">
        <div className="associacao-card">
          <img
            className="associacao-card-image"
            src={logoRancho}
            alt="Logo Rancho"
          />
          <div className="associacao-name">ARC Helios de Figueiredo</div>
        </div>

        {/* Podes adicionar mais cartões assim */}
        <div className="associacao-card">
          <div className="associacao-placeholder">imagem</div>
          <div className="associacao-name">Outra Associação</div>
        </div>

        <div className="associacao-card">
          <div className="associacao-placeholder">imagem</div>
          <div className="associacao-name">Mais uma</div>
        </div>
      </div>
    </div>
  );
};

export default Associacoes;
