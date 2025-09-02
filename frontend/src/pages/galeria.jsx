import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/admin/galeria_admin.css";

const Galeria = () => {
  const [galeria, setGaleria] = useState([]);
  const [label_G, setLabel_G] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const API_URL = "http://jf-figueiredo.com/api/galeria";

  const fetchGaleria = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGaleria(data);
    } catch (error) {
      console.error("Erro ao buscar galeria:", error);
    }
  };

  // UseEffect para carregar a galeria ao montar o componente
  useEffect(() => {
    fetchGaleria();
  }, []);

  return (
    <div className="galeria-list">
      <Navbar />
      {galeria.map((item) => (
        <div key={item.id} className="galeria-item">
          <h3>{item.label_G}</h3>
          <div className="thumbs">
            {item.media.map((img) => (
              <img
                key={img.id}
                src={`http://jf-figueiredo.com/uploads/${img.file}`}
                alt={img.alt || ""}
                className="thumb"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Galeria;