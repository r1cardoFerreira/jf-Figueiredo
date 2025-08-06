import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/eventos_admin.css";

const AdminEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [titulo_E, setTitulo_E] = useState("");
  const [texto_E, setTexto_E] = useState("");
  const [tipo_E, setTipo_E] = useState("");
  const [estado, setEstado] = useState("");
  const [data_E, setData_E] = useState("");
  const [media, setMedia] = useState([]); // ✅ Corrigido: inicializar como array
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/eventos";
  const token = localStorage.getItem('token');

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
    const now = new Date().toISOString();

    formData.append("data_CE", now);
    formData.append("titulo_E", titulo_E);
    formData.append("texto_E", texto_E);
    formData.append("tipo_E", tipo_E);
    formData.append("estado", estado);
    formData.append("data_E", data_E);

    // ✅ Corrigido: garantir que media é array antes de usar forEach
    if (Array.isArray(media) && media.length > 0) {
      media.forEach((file) => {
        formData.append("media", file);
      });
    }

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PATCH" : "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      resetForm();
      fetchEventos();
      alert(editingId ? "Evento atualizado com sucesso!" : "Evento criado com sucesso!");
    } catch (error) {
      console.error("Erro ao submeter evento:", error);
      alert("Erro ao submeter evento: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, 
        { 
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      fetchEventos();
    } catch (error) {
      console.error("Erro ao apagar evento:", error);
    }
  };

  const handleEdit = (evento) => {
    setTitulo_E(evento.titulo_E);
    setTexto_E(evento.texto_E);
    setTipo_E(evento.tipo_E);
    setEstado(evento.estado);
    setData_E(evento.data_E);
    setEditingId(evento.id);
  };

  const resetForm = () => {
    setTitulo_E("");
    setTexto_E("");
    setTipo_E("");
    setEstado("");
    setData_E("");
    setMedia([]); // ✅ Corrigido: redefinir como array
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
            value={texto_E}
            onChange={(e) => setTexto_E(e.target.value)}
            placeholder="Descrição"
            rows="3"
          />
          <select
            value={tipo_E}
            onChange={(e) => setTipo_E(e.target.value)}
          >
            <option value="">Selecione o tipo de evento</option>
            <option value="desporto">Desporto</option>
            <option value="cultura">Cultura</option>
            <option value="festividades">Festividades</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="outro">Outro</option>
          </select>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Selecione o estado</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <input
            type="date"
            value={data_E}
            onChange={(e) => setData_E(e.target.value)}
            placeholder="Data do Evento"
          />
          <input
            type="file"
            multiple
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              setMedia((prevFiles) => [...prevFiles, ...newFiles]);
            }}
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
              {evento.media && Array.isArray(evento.media) &&
                evento.media.map((m, i) => (
                  <img
                    key={i}
                    src={`http://localhost:3000/uploads/${m.file}`}
                    alt={`Imagem ${i + 1}`}
                    className="thumb"
                  />
                ))}
              <h3>{evento.titulo_E}</h3>
              <p><strong>Data Criação:</strong> {evento.data_CE}</p>
              <p><strong>Data Evento:</strong> {evento.data_E}</p>
              <p><strong>Tipo:</strong> {evento.tipo_E}</p>
              <p><strong>Estado:</strong> {evento.estado}</p>
              <p>{evento.texto_E}</p>

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