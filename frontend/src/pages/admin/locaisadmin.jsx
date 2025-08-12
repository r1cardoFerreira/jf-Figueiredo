
import AdminNavbar from "../../components/admin/navbar_admin";
import { useEffect, useState } from "react"
import "../../styles/admin/admin.css"

const AdminLocais = () => {
  const [locais, setLocais] = useState([])
  const [nome_L, setLabel_L] = useState("")
  const [texto_L, setDescricao] = useState("")
  const [tipo_L, setTipo_L] = useState("")
  const [media, setMedia] = useState(null)
  const [editingId, setEditingId] = useState(null)

  // Estados para filtros
  const [filtroNome, setFiltroNome] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")

  const API_URL = "http://localhost:3000/api/locais"
  const token = localStorage.getItem("token")

  const fetchLocais = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setLocais(data)
    } catch (error) {
      console.error("Erro ao buscar locais:", error)
    }
  }

  useEffect(() => {
    fetchLocais()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("nome_L", nome_L)
    formData.append("texto_L", texto_L)
    formData.append("tipo_L", tipo_L)
    if (media) formData.append("media", media)

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } else {
        await fetch(API_URL, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      resetForm()
      fetchLocais()
    } catch (error) {
      console.error("Erro ao salvar local:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchLocais()
    } catch (error) {
      console.error("Erro ao apagar local:", error)
    }
  }

  const handleEdit = (local) => {
    setLabel_L(local.nome_L)
    setDescricao(local.texto_L)
    setTipo_L(local.tipo_L)
    setEditingId(local.id)
  }

  const resetForm = () => {
    setLabel_L("")
    setDescricao("")
    setTipo_L("")
    setMedia(null)
    setEditingId(null)
  }

  const locaisFiltrados = locais.filter((local) => {
    const nomeMatch = local.nome_L.toLowerCase().includes(filtroNome.toLowerCase())
    const tipoMatch = filtroTipo === "" || local.tipo_L.toLowerCase() === filtroTipo.toLowerCase()
    return nomeMatch && tipoMatch
  })

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1 className="admin-title">Gestão de Locais</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <h2 className="admin-form__title">{editingId ? "Editar Local" : "Novo Local"}</h2>

          <div className="admin-form__group">
            <label className="admin-form__label">Nome do Local</label>
            <input
              type="text"
              value={nome_L}
              onChange={(e) => setLabel_L(e.target.value)}
              placeholder="Digite o nome do local"
              className="admin-form__input"
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Tipo</label>
            <select value={tipo_L} onChange={(e) => setTipo_L(e.target.value)} className="admin-form__select" required>
              <option value="">Selecione um tipo</option>
              <option value="patrimonio">Patrimônio</option>
              <option value="estabelecimento">Estabelecimento</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Descrição</label>
            <textarea
              value={texto_L}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do local"
              rows="3"
              className="admin-form__textarea"
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Imagem</label>
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              accept="image/*"
              className="admin-form__file"
            />
          </div>

          <div className="admin-btn-group">
            <button type="submit" className="admin-btn admin-btn--primary">
              {editingId ? "Atualizar" : "Criar"}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn--secondary" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin-filters">
          <h3 className="admin-filters__title">Filtros</h3>
          <div className="admin-filters__row">
            <input
              type="text"
              placeholder="Pesquisar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              className="admin-filters__input"
            />

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="admin-filters__select"
            >
              <option value="">Todos os tipos</option>
              <option value="patrimonio">Patrimônio</option>
              <option value="estabelecimento">Estabelecimento</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <h2 className="admin-subtitle">Locais Cadastrados</h2>

        <div className="admin-list">
          {locaisFiltrados.length === 0 ? (
            <div className="admin-message admin-message--empty">
              <p>Nenhum local encontrado.</p>
            </div>
          ) : (
            locaisFiltrados.map((local) => (
              <div key={local.id} className="admin-item">
                {local.media && local.media[0] && (
                  <img
                    src={`http://localhost:3000/uploads/${local.media[0].file}` || "/placeholder.svg"}
                    alt="Local"
                    className="admin-thumbnail"
                  />
                )}

                <div className="admin-item__content">
                  <h3 className="admin-item__title">{local.nome_L}</h3>
                  <div className="admin-item__meta">
                    <span className="admin-badge admin-badge--neutral">{local.tipo_L}</span>
                  </div>
                  {local.texto_L && <p>{local.texto_L}</p>}
                </div>

                <div className="admin-item__actions">
                  <button className="admin-btn admin-btn--primary admin-btn--small" onClick={() => handleEdit(local)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(local.id)}
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

export default AdminLocais

