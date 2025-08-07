import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/locais.css"
import { Link } from "react-router-dom";

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
      <div className="header-filtro">
        <h2>Locais</h2>
        <div className="filtro-select">
          <label>Filtrar por tipo:</label>
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
    </div>


      {loading ? (
  <p>A carregar...</p>
) : (
  <div className="locais-grid">
    {locais.map((local) => (
      <div key={local.id} className="card-local">
        {local.media && local.media.length > 0 && isImageFile(local.media[0].file) && (
          <img
            src={`http://localhost:3000/uploads/${local.media[0].file}`}
            alt={`Imagem do local`}
            className="imagem-local"
          />
        )}
        <div className="conteudo-card">
          <p className="tipo-local">
            {local.tipo ? local.tipo.charAt(0).toUpperCase() + local.tipo.slice(1) : "Património"}
          </p>
          <h3 className="nome-local">{local.nome_L}</h3>
        </div>
        <div className="link-vermais">
          <Link 
           key={local.id}
            to={`/localdetalhes/${local.id}`}
          >
          Ver mais →
          </Link>

        </div>
      </div>
    ))}
  </div>
)}
</div>
)}

export default Locais;
