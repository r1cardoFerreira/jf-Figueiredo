import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/galeria_admin.css"; 

const AdminGaleria = () => {
  const [galeria, setGaleria] = useState([]);
  const [label_G, setLabel_G] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const API_URL = "http://localhost:3000/api/galeria";

  const fetchGaleria = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGaleria(data);
    } catch (error) {
      console.error("Erro ao buscar galeria:", error);
    }
  };

  useEffect(() => {
    fetchGaleria();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("label_G", label_G);
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      setLabel_G("");
      setMediaFiles([]);
      fetchGaleria();
    } catch (error) {
      console.error("Erro ao enviar galeria:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchGaleria();
    } catch (error) {
      console.error("Erro ao apagar galeria:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h1>Gestão da Galeria</h1>

        <form onSubmit={handleSubmit} className="form">
          <h2>Nova Entrada na Galeria</h2>
          <input
            type="text"
            value={label_G}
            onChange={(e) => setLabel_G(e.target.value)}
            placeholder="Título da Galeria"
            required
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setMediaFiles(e.target.files)}
          />
          <button type="submit">Enviar</button>
        </form>

        <div className="galeria-list">
          <h2>Galeria</h2>
          {galeria.map((item) => (
            <div key={item.id} className="galeria-item">
              <h3>{item.label_G}</h3>
              <div className="thumbs">
                {item.media.map((img) => (
                  <img
                    key={img.id}
                    src={`http://localhost:3000/uploads/${img.file}`}
                    alt={img.alt || ""}
                    className="thumb"
                  />
                ))}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete-btn"
              >
                Apagar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGaleria;
