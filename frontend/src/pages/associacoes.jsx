import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { Link, Outlet } from "react-router-dom";
import "../styles/associacoes.css";

const Associacoes = () => {
  const [associacoes, setAssociacoes] = useState([]);

  useEffect(() => {
    fetch("http://jf-figueiredo.com/api/associacoes")
      .then((response) => response.json())
      .then((data) => setAssociacoes(data))
      .catch((error) => console.error("Erro ao buscar associações:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="associacao-container">
        {associacoes.map((assoc) => (
          <Link
            key={assoc.id}
            to={`/associacoesdetalhes/${assoc.id}`}
            className="associacao-link"
          >
            <div className="associacao-card">
              {assoc.media ? (
                <img
                  src={`http:jf-figueiredo.com/uploads/${
                    assoc.media.file || assoc.media
                  }`}
                  alt={`Emblema de ${assoc.nome_A}`}
                  className="associacao-card-image"
                />
              ) : (
                <div className="associacao-placeholder">imagem</div>
              )}
              <div className="associacao-name">{assoc.nome_A}</div>
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Associacoes;