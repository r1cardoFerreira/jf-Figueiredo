import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/docs.css";
import { formatarEnum_D } from "../utils/formatacoes";


const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [agrupadosPorTipo, setAgrupadosPorTipo] = useState({});
  const [gruposAbertos, setGruposAbertos] = useState({}); 
  useEffect(() => {
    fetch("https://api.jf-figueiredo.com/api/documentos")
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
      const tipo = formatarEnum_D(doc.tipo_D);
      if (!agrupados[tipo]) {
        agrupados[tipo] = [];
      }
      agrupados[tipo].push(doc);
    });
    setAgrupadosPorTipo(agrupados);

    
    const estadoInicial = {};
    Object.keys(agrupados).forEach((tipo) => {
      estadoInicial[tipo] = false;
    });
    setGruposAbertos(estadoInicial);
  };

  const toggleGrupo = (tipo) => {
    setGruposAbertos((prev) => ({
      ...prev,
      [tipo]: !prev[tipo],
    }));
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
              <h3
                className="tipo-titulo"
                onClick={() => toggleGrupo(tipo)}
                style={{ cursor: "pointer" }}
              >
                {tipo} {gruposAbertos[tipo] ? "▲" : "▼"}
              </h3>

              {gruposAbertos[tipo] && (
                <ul className="documentos-lista">
                  {docs.map((doc) => (
                    <li key={doc.id} className="documento-item">
                      <p>Data: {new Date(doc.data_CD).toLocaleDateString()}</p>
                      {doc.media && doc.media.length > 0 ? (
                        doc.media.map((file) => {
                          const nomeOriginal = decodeURIComponent(
                            file.file
                              .split("-")
                              .slice(1)
                              .join("-")
                          );

                          return (
                            <div key={file.id}>
                              <span className="NomeOriginal">{nomeOriginal}</span>
                              <a
                                href={`http://api.jf-figueiredo.com/uploads/${file.file}`}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-download"
                              >
                                Download
                              </a>
                            </div>
                          );
                        })
                      ) : (
                        <p>Sem ficheiros.</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Documentos;
