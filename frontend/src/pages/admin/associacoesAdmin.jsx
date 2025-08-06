import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/associacoes_admin.css";

function AssociationsPage() {
  const [associations, setAssociations] = useState([]);
  const [nome_A, setNome_A] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [texto_A, setTexto_A] = useState("");
  const [media, setMedia] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:3000/api/associacoes";
  const token = localStorage.getItem('token');

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
    formData.append("email", email);
    formData.append("telefone", telefone);
    if (media) formData.append("media", media);

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, 
        { 
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    }

    await fetch(API_URL, {
      method: "POST",
      body: formData,
      headers: {
          'Authorization': `Bearer ${token}`
        }
    });

    resetForm();
    fetchAssociations();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, 
      { 
        method: "DELETE", 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    fetchAssociations();
  };

  const handleEdit = (assoc) => {
    setNome_A(assoc.nome_A);
    setEmail(assoc.email);
    setTelefone(assoc.telefone);
    setTexto_A(assoc.texto_A);
    setEditingId(assoc.id);
  };

  const resetForm = () => {
    setNome_A("");
    setEmail("");
    setTelefone("");
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
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
          <button type="button" className="delete-btn" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <div className="list">
        <h2>Associações Cadastradas</h2>
        {associations.map((assoc) => (
          <div key={assoc.id} className="item">
            {assoc.media && (
              <img
                src={`http://localhost:3000/uploads/${assoc.media.file}`}
                alt=""
                className="thumb"
              />
            )}
            <h3>{assoc.nome_A}</h3>
            <p>{assoc.email}</p>
            <p>{assoc.telefone}</p>
            <p>{assoc.texto_A}</p>
            
            <button className="criar-editar-button" onClick={() => handleEdit(assoc)}>Editar</button>
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