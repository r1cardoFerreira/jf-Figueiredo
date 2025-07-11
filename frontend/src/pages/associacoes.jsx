import React from "react";
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

export default Associacoes;