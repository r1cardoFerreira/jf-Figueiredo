import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/eventos.css"
import { Link } from "react-router-dom";

const isImageFile = (filename) => {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(filename);
};

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [verTodos, setVerTodos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarEventos = async () => {
      setLoading(true);
      try {
        const url = verTodos
          ? "http://jf-figueiredo.com/api/eventos/"
          : "http://jf-figueiredo.com/api/eventos/?limit=6";

        const resposta = await fetch(url);
        const dados = await resposta.json();
        setEventos(dados);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarEventos();
  }, [verTodos]);

  return (
    <div className="eventos-container">
  {loading ? (
    <p>A carregar...</p>
  ) : (
    <div className="eventos-grid">
      {eventos.map((evento) => (
        <div key={evento.id} className="evento-card">
          <Link key={evento.id} to={`/eventosdetalhes/${evento.id}`}>
            {evento.media && evento.media.length > 0 && isImageFile(evento.media[0].file) && (
              <img
                src={`http://jf-figueiredo.com/uploads/${evento.media[0].file}`}
                alt={`Imagem do evento`}
              />
            )}
            <div className="evento-card-content">
              <p className="evento-data">{new Date(evento.data_E).toLocaleDateString()}</p>
              <h3 className="evento-titulo">{evento.titulo_E}</h3>
              <p className="evento-categoria">{evento.categoria || "Desporto"}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )}

  {!verTodos && !loading && eventos.length >= 6 && (
    <button className="ver-todos-btn" onClick={() => setVerTodos(true)}>
      + Eventos
    </button>
  )}
</div>

  );
};

export default Eventos;
