import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/associacoes_admin.css";

function AssociationsPage() {
  const [associations, setAssociations] = useState([]);
  const [nome_A, setNome_A] = useState("");
  const [texto_A, setTexto_A] = useState("");
  const [media, setMedia] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/associacoes";

  const fetchAssociations = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAssociations(data);
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome_A", nome_A);
    formData.append("texto_A", texto_A);
    if (media) formData.append("media", media);

    // Se estiver editando, apaga antes de criar novamente
    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, { method: "DELETE" });
    }

    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    resetForm();
    fetchAssociations();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchAssociations();
  };

  const handleEdit = (assoc) => {
    setNome_A(assoc.nome_A);
    setTexto_A(assoc.texto_A);
    setEditingId(assoc.id);
  };

  const resetForm = () => {
    setNome_A("");
    setTexto_A("");
    setMedia(null);
    setEditingId(null);
  };

  return (
    <div>
      <AdminNavbar/>
    <div className="container">
      <h1>Gestão de Associações</h1>

      <form onSubmit={handleSubmit} className="form">
        <h2>{editingId ? "Editar Associação" : "Nova Associação"}</h2>
        <input
          type="text"
          value={nome_A}
          onChange={(e) => setNome_A(e.target.value)}
          placeholder="Nome"
          required
        />
        <textarea
          value={texto_A}
          onChange={(e) => setTexto_A(e.target.value)}
          placeholder="Texto descritivo"
          rows="3"
        />
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          accept="image/*"
        />
        <button className="criar-editar-button"type="submit">{editingId ? "Atualizar" : "Criar"}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <div className="list">
        <h2>Associações Cadastradas</h2>
        {associations.map((assoc) => (
          <div key={assoc.id} className="item">
            <h3>{assoc.nome_A}</h3>
            <p>{assoc.texto_A}</p>
            {assoc.media && (
              <img
                src={`http://localhost:3001/uploads/${assoc.media.file}`}
                alt=""
                className="thumb"
              />
            )}
            <button onClick={() => handleEdit(assoc)}>Editar</button>
            <button
              onClick={() => handleDelete(assoc.id)}
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
}

export default AssociationsPage;
