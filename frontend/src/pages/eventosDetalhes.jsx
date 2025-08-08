import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/localDetalhes.css";


const EventosDetalhes = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/api/eventos/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Erro na resposta da API");
            return res.json();
          })
          .then((data) => {
            // Se for array (ex: [{...}]) usa o primeiro item
            const evento = Array.isArray(data) ? data[0] : data;
            setEvento(evento);
          })
          .catch((err) => console.error("Erro ao buscar Evento:", err));
      }, [id]);
    
      if (!evento) return <div>Carregando...</div>;

      return(
        <div>
            <Navbar/>
            <div className="local-container">
                <img
                  src={`http://localhost:3000/uploads/${evento.media[0].file}`}
                  alt={`Imagem de ${evento.titulo_E}`}
                />
                <div className="local-titulo-container">
                    <p className="local-tipo"><span>{evento.tipo_E}</span><span>{new Date(evento.data_E).toLocaleDateString()}</span></p>
                    <div className="local-titulo"><span>{evento.titulo_E}</span> </div>
                </div>
                <div className="local-texto">
                    {evento.texto_E}
                </div>
            </div>
        </div>
      )
}

export default EventosDetalhes;