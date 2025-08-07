import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/docs.css";

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [agrupadosPorTipo, setAgrupadosPorTipo] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/documentos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar documentos");
        return res.json();
      })
      .then((data) => {
        setDocumentos(data);
        agruparPorTipo(data);
      })
      .catch((err) => console.error("Erro:", err));
  }, []);

  const agruparPorTipo = (docs) => {
    const agrupados = {};
    docs.forEach((doc) => {
      const tipo = doc.tipo || "Outros";
      if (!agrupados[tipo]) {
        agrupados[tipo] = [];
      }
      agrupados[tipo].push(doc);
    });
    setAgrupadosPorTipo(agrupados);
  };

  return (
    <div>
      <Navbar />
      <div className="documentos-container">
        <h2>Documentos Disponíveis</h2>

        {Object.keys(agrupadosPorTipo).length === 0 ? (
          <p>Nenhum documento disponível.</p>
        ) : (
          Object.entries(agrupadosPorTipo).map(([tipo, docs]) => (
            <div key={tipo} className="documento-grupo">
              <h3 className="tipo-titulo">{tipo}</h3>
              <ul className="documentos-lista">
                {docs.map((doc) => (
                  <li key={doc.id} className="documento-item">
                    <span>{doc.nome}</span>
                    <a
                      href={`http://localhost:3000/uploads/${doc.ficheiro}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download"
                    >
                      Baixar
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Documentos;
