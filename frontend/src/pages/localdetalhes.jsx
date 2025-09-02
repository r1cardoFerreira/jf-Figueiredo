import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/localDetalhes.css";

const LocalDetalhes = () => {
    const { id } = useParams();
    const [local, setLocal] = useState(null);

     useEffect(() => {
        fetch(`http://api.jf-figueiredo.com/api/locais/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Erro na resposta da API");
            return res.json();
          })
          .then((data) => {
            // Se for array (ex: [{...}]) usa o primeiro item
            const local = Array.isArray(data) ? data[0] : data;
            setLocal(local);
          })
          .catch((err) => console.error("Erro ao buscar Local:", err));
      }, [id]);
    
      if (!local) return <div>Carregando...</div>;

      return(
        <div>
            <Navbar/>
            <div className="local-container">
                <img
                  src={`http://api.jf-figueiredo.com/uploads/${local.media[0].file}`}
                  alt={`Imagem de ${local.nome_L}`}
                />
                <div className="local-titulo-container">
                    <p className="local-tipo">{local.tipo_L}</p>
                    <span className="local-titulo">{local.nome_L}</span>
                </div>
                <div className="local-texto">
                  {local.texto_L}
                </div>
            </div>
        </div>
      )
}

export default LocalDetalhes;