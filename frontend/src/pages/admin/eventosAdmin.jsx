import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/eventos_admin.css";

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [titulo_E, setTitulo_E] = useState("");
  const [text_E, setText_E] = useState("");
  const [tipo_E, setTipo_E] = useState("");
  const [estado, setEstado] = useState("");
  const [data_E, setData_E] = useState("");
  const [media, setMedia] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/eventos";

  const fetchEventos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const now = new Date().toISOString(); // Data de criação automática

    formData.append("data_CE", now);
    formData.append("titulo_E", titulo_E);
    formData.append("text_E", text_E);
    formData.append("tipo_E", tipo_E);
    formData.append("estado", estado);
    formData.append("data_E", data_E);
    if (media) formData.append("media", media); // nome deve ser "media" (igual no multer)

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, { method: "DELETE" });
      }

      await fetch(API_URL, {
        method: "POST",
        body: formData, // NÃO defina headers! O browser faz isso automaticamente.
      });

      resetForm();
      fetchEventos();
    } catch (error) {
      console.error("Erro ao submeter evento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEventos();
    } catch (error) {
      console.error("Erro ao apagar evento:", error);
    }
  };

  const handleEdit = (evento) => {
    setTitulo_E(evento.titulo_E);
    setText_E(evento.text_E);
    setTipo_E(evento.tipo_E);
    setEstado(evento.estado);
    setData_E(evento.data_E);
    setEditingId(evento.id);
  };

  const resetForm = () => {
    setTitulo_E("");
    setText_E("");
    setTipo_E("");
    setEstado("");
    setData_E("");
    setMedia(null);
    setEditingId(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h1>Gestão de Eventos</h1>

        <form onSubmit={handleSubmit} className="form">
          <h2>{editingId ? "Editar Evento" : "Novo Evento"}</h2>

          <input
            type="text"
            value={titulo_E}
            onChange={(e) => setTitulo_E(e.target.value)}
            placeholder="Título"
            required
          />
          <textarea
            value={text_E}
            onChange={(e) => setText_E(e.target.value)}
            placeholder="Descrição"
            rows="3"
          />
          <input
            type="text"
            value={tipo_E}
            onChange={(e) => setTipo_E(e.target.value)}
            placeholder="Tipo"
          />
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado"
          />
          <input
            type="date"
            value={data_E}
            onChange={(e) => setData_E(e.target.value)}
            placeholder="Data do Evento"
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
          <h2>Eventos Cadastrados</h2>
          {eventos.map((evento) => (
            <div key={evento.id} className="item">
              {evento.media && (
                <img
                  src={`http://localhost:3000/uploads/${evento.media.file}`}
                  alt="Media do Evento"
                  className="thumb"
                />
              )}
              <h3>{evento.titulo_E}</h3>
              <p><strong>Data Criação:</strong> {evento.data_CE}</p>
              <p><strong>Data Evento:</strong> {evento.data_E}</p>
              <p><strong>Tipo:</strong> {evento.tipo_E}</p>
              <p><strong>Estado:</strong> {evento.estado}</p>
              <p>{evento.text_E}</p>

              <button className="criar-editar-button" onClick={() => handleEdit(evento)}>
                Editar
              </button>
              <button onClick={() => handleDelete(evento.id)} className="delete-btn">
                Apagar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEventos;