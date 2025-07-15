import React from "react";
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import "../styles/associacoes.css";
import { useState ,useEffect} from "react";

const Associacoes= () =>{
    const [associacoes, setAssociacoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/associacoes")
      .then((response) => response.json())
      .then((data) => setAssociacoes(data))
      .catch((error) => console.error("Erro ao buscar associações:", error));
  }, []);
    return(
      <div>
        <Navbar/>
         <div className="associacao-container">
      {associacoes.map((assoc) => (
        <div key={assoc.id} className="associacao-card">
          {assoc.media ? (
            <img
              src={`http://localhost:3000/api/${assoc.media}`}
              alt={`Emblema de ${assoc.nome_A}`}
              className="associacao-card-image"
            />
          ) : (
            <div className="associacao-placeholder">imagem</div>
          )}
          <div className="associacao-name">{assoc.nome_A}</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Associacoes;