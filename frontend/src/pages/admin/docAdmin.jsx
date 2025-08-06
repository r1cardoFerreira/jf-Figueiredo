import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/galeria_admin.css";

const AdminDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [tipo_D, setTipo_D] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const API_URL = "http://localhost:3000/api/documentos";
  const token = localStorage.getItem('token');

  const fetchDocumentos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDocumentos(data);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tipo_D", tipo_D);
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTipo_D("");
      setMediaFiles([]);
      fetchDocumentos();
    } catch (error) {
      console.error("Erro ao enviar documento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
         headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      fetchDocumentos();
    } catch (error) {
      console.error("Erro ao apagar documento:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h1>Gestão de Documentos</h1>

        <form onSubmit={handleSubmit} className="form">
          <h2>Novo Documento</h2>
          <select
            value={tipo_D}
            onChange={(e) => setTipo_D(e.target.value)}
            required
          >
            <option value="">Selecione o tipo de documento</option>
            <option value="Atas">Atas</option>
            <option value="Plano de Atividades">Plano de Atividades</option>
            <option value="Avisos">Avisos</option>
            <option value="Editais">Editais</option>
            <option value="Regulamentos">Regulamentos</option>
            <option value="Relatorios de contas">Relatórios de contas</option>
          </select>
          <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setMediaFiles(e.target.files)}
          />

          <button type="submit">Enviar</button>
        </form>

        <div className="galeria-list">
          <h2>Documentos</h2>
          {documentos.map((doc) => (
            <div key={doc.id} className="galeria-item">
              <h3>{doc.tipo_D}</h3>
              <p>Data: {new Date(doc.data_CD).toLocaleDateString()}</p>
              <div className="thumbs">
                {doc.media.map((file) => {
                  const ext = file.file.split('.').pop().toLowerCase();
                  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
                  const fileUrl = `http://localhost:3000/uploads/${file.file}`;

                  return isImage ? (
                    <img
                      key={file.id}
                      src={fileUrl}
                      alt={file.alt || ""}
                      className="thumb"
                    />
                  ) : (
                    <a key={file.id} href={fileUrl} target="_blank" rel="noopener noreferrer">
                      📄 {file.file}
                    </a>
                  );
                })}
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
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

export default AdminDocumentos;
