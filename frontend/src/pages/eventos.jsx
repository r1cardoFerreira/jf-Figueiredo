import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

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
          ? "http://localhost:3000/api/eventos/"
          : "http://localhost:3000/api/eventos/?limit=6";

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
    <div>
      <Navbar />
      <h2>Eventos</h2>

      {loading ? (
        <p>A carregar...</p>
      ) : (
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <h3>{evento.titulo_E}</h3>
              <p>{evento.texto_E}</p>

              {evento.media && evento.media.length > 0 && (
                <div>
                  {evento.media.map((m, i) => {
                    const url = `http://localhost:3000/uploads/${m.file}`;
                    if (isImageFile(m.file)) {
                      return (
                        <img
                          key={i}
                          src={url}
                          alt={`Imagem ${i + 1} do evento`}
                          width="150"
                          style={{ marginRight: 10 }}
                        />
                      );
                    } else {
                      // Para PDFs ou outros ficheiros mostramos um link para abrir (fazer isto para outros componentes podes-se restringira img tambem)
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

      {!verTodos && !loading && eventos.length >= 6 && (
        <button onClick={() => setVerTodos(true)}>Ver todos</button>
      )}
      <Footer />
    </div>
  );
};

export default Eventos;
