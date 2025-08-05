import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

const isImageFile = (filename) => {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(filename);
};

const tipos = ["todos", "patrimonio", "estabelecimento", "outro"];

const Locais = () => {
  const [locais, setLocais] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarLocais = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:3000/api/locais/tipo/";
        if (tipoSelecionado !== "todos") {
          url += `?tipo=${tipoSelecionado}`;
        }

        const resposta = await fetch(url);
        const dados = await resposta.json();
        setLocais(dados);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarLocais();
  }, [tipoSelecionado]);

  return (
    <div>
      <Navbar />
      <h2>Locais</h2>

      <div>
        <label>Filtrar por tipo:</label>{" "}
        <select
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>A carregar...</p>
      ) : (
        <ul>
          {locais.map((local) => (
            <li key={local.id} style={{ marginBottom: "20px" }}>
              <h3>{local.nome_L}</h3>
              <p>{local.texto_L}</p>

              {local.media && local.media.length > 0 && (
                <div>
                  {local.media.map((m, i) => {
                    const url = `http://localhost:3000/uploads/${m.file}`;
                    if (isImageFile(m.file)) {
                      return (
                        <img
                          key={i}
                          src={url}
                          alt={`Imagem ${i + 1} do local`}
                          width="150"
                          style={{ marginRight: 10 }}
                        />
                      );
                    } else {
                      return (
                        <p key={i}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            Ver documento: {m.file}
                          </a>
                        </p>
                      );
                    }
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
};

export default Locais;
