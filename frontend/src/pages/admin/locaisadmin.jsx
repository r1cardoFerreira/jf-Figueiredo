import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/eventos_admin.css";

const AdminLocais = () => {
  const [locais, setLocais] = useState([]);
  const [nome_L, setLabel_L] = useState("");
  const [texto_L, setDescricao] = useState("");
  const [tipo_L, setTipo_L] = useState("");
  const [media, setMedia] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/locais";

  const fetchLocais = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setLocais(data);
  };

  useEffect(() => {
    fetchLocais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nome_L", nome_L);
    formData.append("descricao", texto_L);
    formData.append("tipo_L", tipo_L);
    if (media) formData.append("media", media);

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PATCH",
        body: formData,
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
    }

    resetForm();
    fetchLocais();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchLocais();
  };

  const handleEdit = (local) => {
    setLabel_L(local.nome_L);
    setDescricao(local.texto_L);
    setTipo_L(local.tipo_L);
    setEditingId(local.id);
  };

  const resetForm = () => {
    setLabel_L("");
    setDescricao("");
    setTipo_L("");
    setMedia(null);
    setEditingId(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h1>Gestão de Locais</h1>

        <form onSubmit={handleSubmit} className="form">
          <h2>{editingId ? "Editar Local" : "Novo Local"}</h2>

          <input
            type="text"
            value={nome_L}
            onChange={(e) => setLabel_L(e.target.value)}
            placeholder="Nome do Local"
            required
          />
          <textarea
            value={texto_L}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            rows="3"
          />
          <input
            type="text"
            value={tipo_L}
            onChange={(e) => setTipo_L(e.target.value)}
            placeholder="Tipo"
          />
          <input
            type="file"
            onChange={(e) => setMedia(e.target.files[0])}
            accept="image/*"
          />

          <button className="criar-editar-button" type="submit">
            {editingId ? "Atualizar" : "Criar"}
          </button>
          {editingId && (
            <button type="button" className="delete-btn" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </form>

        <div className="list">
          <h2>Locais Cadastrados</h2>
          {locais.map((local) => (
            <div key={local.id} className="item">
              {local.media && local.media[0] && (
                <img
                  src={`http://localhost:3000/uploads/${local.media[0].file}`}
                  alt="local"
                  className="thumb"
                />
              )}
              <h3>{local.nome_L}</h3>
              <p><strong>Tipo:</strong> {local.tipo_L}</p>
              <p>{local.texto_L}</p>

              <button
                className="criar-editar-button"
                onClick={() => handleEdit(local)}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(local.id)}
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

export default AdminLocais;
