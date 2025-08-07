import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/localDetalhes.css";

const LocalDetalhes = () => {
    const { id } = useParams();
    const [local, setLocal] = useState(null);

     useEffect(() => {
        fetch(`http://localhost:3000/api/locais/${id}`)
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
            <div className="Local-container">
                <img  
                src={
                    local.media.file
                    ? `http://localhost:3000/uploads/${local.media.file}`
                    : `http://localhost:3000/uploads/${local.media}`
        }
        alt={`Imagem de ${local.nome_L}`}
        className="detalhes-imagem" />
            </div>
        </div>
      )
}

export default LocalDetalhes;