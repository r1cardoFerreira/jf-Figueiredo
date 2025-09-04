
import React, { useState, useEffect, useRef } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/admin.css"

function AdminAssociacoes() {
  const [associations, setAssociations] = useState([])
  const [nome_A, setNome_A] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [texto_A, setTexto_A] = useState("")
  const [media, setMedia] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [filtroNome, setFiltroNome] = useState("")

  const fileInputRef = useRef(null)
  const API_URL = "https://api.jf-figueiredo.com/api/associacoes"
  const token = localStorage.getItem("token")

  const fetchAssociations = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setAssociations(data)
    } catch (error) {
      console.error("Erro ao buscar associações:", error)
    }
  }

  useEffect(() => {
    fetchAssociations()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nome_A", nome_A)
    formData.append("texto_A", texto_A)
    formData.append("email", email)
    formData.append("telefone", telefone)
    if (media) formData.append("media", media)

    try {
      const response = await fetch(editingId ? `${API_URL}/${editingId}` : API_URL, {
        method: editingId ? "PATCH" : "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      resetForm()
      fetchAssociations()
      alert(editingId ? "Associação atualizada com sucesso!" : "Associação criada com sucesso!")
    } catch (error) {
      console.error("Erro ao submeter associação:", error)
      alert("Erro ao submeter associação: " + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja apagar esta associação?")) return

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchAssociations()
    } catch (error) {
      console.error("Erro ao apagar associação:", error)
    }
  }

  const handleEdit = (assoc) => {
    setNome_A(assoc.nome_A)
    setEmail(assoc.email)
    setTelefone(assoc.telefone)
    setTexto_A(assoc.texto_A)
    setEditingId(assoc.id)
  }

  const resetForm = () => {
    setNome_A("")
    setEmail("")
    setTelefone("")
    setTexto_A("")
    setMedia(null)
    setEditingId(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const associationsFiltradas = associations.filter((assoc) =>
    assoc.nome_A.toLowerCase().includes(filtroNome.toLowerCase()),
  )

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1 className="admin-title">Gestão de Associações</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <h2 className="admin-form__title">{editingId ? "Editar Associação" : "Nova Associação"}</h2>

          <div className="admin-form__group">
            <label className="admin-form__label">Nome da Associação</label>
            <input
              type="text"
              className="admin-form__input"
              value={nome_A}
              onChange={(e) => setNome_A(e.target.value)}
              placeholder="Digite o nome da associação"
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Email</label>
            <input
              type="email"
              className="admin-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Telefone</label>
            <input
              type="text"
              className="admin-form__input"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Descrição</label>
            <textarea
              className="admin-form__textarea"
              value={texto_A}
              onChange={(e) => setTexto_A(e.target.value)}
              placeholder="Descreva a associação"
              rows="4"
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Logo/Imagem</label>
            <input
              type="file"
              className="admin-form__file"
              ref={fileInputRef}
              onChange={(e) => setMedia(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <div className="admin-btn-group">
            <button className="admin-btn admin-btn--primary" type="submit">
              {editingId ? "Atualizar Associação" : "Criar Associação"}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn--danger" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin-filters">
          <h3 className="admin-filters__title">Pesquisar Associações</h3>
          <div className="admin-filters__row">
            <input
              type="text"
              className="admin-filters__input"
              placeholder="Pesquisar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-list">
          {associationsFiltradas.length === 0 ? (
            <div className="admin-message admin-message--empty">Nenhuma associação encontrada.</div>
          ) : (
            associationsFiltradas.map((assoc) => (
              <div key={assoc.id} className="admin-item">
                <div className="admin-item__header">
                  <div>
                    <h3 className="admin-item__title">{assoc.nome_A}</h3>
                    <div className="admin-item__meta">
                      <strong>Email:</strong> {assoc.email} |<strong> Telefone:</strong> {assoc.telefone}
                    </div>
                  </div>
                </div>

                {assoc.media && (
                  <img
                    src={`https://api.jf-figueiredo.com/uploads/${assoc.media.file}`}
                    alt={`Logo da ${assoc.nome_A}`}
                    className="admin-thumbnail"
                  />
                )}

                <div className="admin-item__content">
                  <p>{assoc.texto_A}</p>
                </div>

                <div className="admin-item__actions">
                  <button className="admin-btn admin-btn--primary admin-btn--small" onClick={() => handleEdit(assoc)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(assoc.id)}
                    className="admin-btn admin-btn--danger admin-btn--small"
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAssociacoes
