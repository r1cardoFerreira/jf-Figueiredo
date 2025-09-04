import React, { useState, useEffect, useRef } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/admin.css"

const AdminEventos = () => {
  const [eventos, setEventos] = useState([])
  const [titulo_E, setTitulo_E] = useState("")
  const [texto_E, setTexto_E] = useState("")
  const [tipo_E, setTipo_E] = useState("")
  const [estado, setEstado] = useState("")
  const [data_E, setData_E] = useState("")
  const [media, setMedia] = useState([])
  const [editingId, setEditingId] = useState(null)

  // Filtros
  const [filtroTitulo, setFiltroTitulo] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")

  const API_URL = "https://api.jf-figueiredo.com/api/eventos"
  const token = localStorage.getItem("token")
  const fileInputRef = useRef(null)

  const fetchEventos = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setEventos(data)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
    }
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const now = new Date().toISOString()

    formData.append("data_CE", now)
    formData.append("titulo_E", titulo_E)
    formData.append("texto_E", texto_E)
    formData.append("tipo_E", tipo_E)
    formData.append("estado", estado)
    formData.append("data_E", new Date(data_E).toISOString())

    if (Array.isArray(media) && media.length > 0) {
      media.forEach((file) => {
        formData.append("media", file)
      })
    }

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
      fetchEventos()
      alert(editingId ? "Evento atualizado com sucesso!" : "Evento criado com sucesso!")
    } catch (error) {
      console.error("Erro ao submeter evento:", error)
      alert("Erro ao submeter evento: " + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja apagar este evento?")) return

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchEventos()
    } catch (error) {
      console.error("Erro ao apagar evento:", error)
    }
  }

  const handleEdit = (evento) => {
    setTitulo_E(evento.titulo_E)
    setTexto_E(evento.texto_E)
    setTipo_E(evento.tipo_E)
    setEstado(evento.estado)
    setData_E(evento.data_E)
    setEditingId(evento.id)
  }

  const resetForm = () => {
    setTitulo_E("")
    setTexto_E("")
    setTipo_E("")
    setEstado("")
    setData_E("")
    setMedia([])
    setEditingId(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const eventosFiltrados = eventos.filter((evento) => {
    const dataEvento = new Date(evento.data_E).toISOString().split("T")[0]

    if (filtroTitulo && !evento.titulo_E.toLowerCase().includes(filtroTitulo.toLowerCase())) {
      return false
    }

    if (filtroTipo && filtroTipo !== "" && evento.tipo_E !== filtroTipo) {
      return false
    }

    if (dataInicial && dataEvento < dataInicial) {
      return false
    }

    if (dataFinal && dataEvento > dataFinal) {
      return false
    }

    return true
  })

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1 className="admin-title">Gestão de Eventos</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <h2 className="admin-form__title">{editingId ? "Editar Evento" : "Novo Evento"}</h2>

          <div className="admin-form__group">
            <label className="admin-form__label">Título do Evento</label>
            <input
              type="text"
              className="admin-form__input"
              value={titulo_E}
              onChange={(e) => setTitulo_E(e.target.value)}
              placeholder="Digite o título do evento"
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Descrição</label>
            <textarea
              className="admin-form__textarea"
              value={texto_E}
              onChange={(e) => setTexto_E(e.target.value)}
              placeholder="Descreva o evento"
              rows="4"
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Tipo de Evento</label>
            <select className="admin-form__select" value={tipo_E} onChange={(e) => setTipo_E(e.target.value)} required>
              <option value="">Selecione o tipo de evento</option>
              <option value="desporto">Desporto</option>
              <option value="cultura">Cultura</option>
              <option value="festividades">Festividades</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Estado</label>
            <select className="admin-form__select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
              <option value="">Selecione o estado</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Data do Evento</label>
            <input
              type="date"
              className="admin-form__input"
              value={data_E}
              onChange={(e) => setData_E(e.target.value)}
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Imagens</label>
            <input
              type="file"
              className="admin-form__file"
              ref={fileInputRef}
              multiple
              onChange={(e) => {
                const newFiles = Array.from(e.target.files)
                setMedia((prevFiles) => [...prevFiles, ...newFiles])
              }}
              accept="image/*"
            />
          </div>

          <div className="admin-btn-group">
            <button className="admin-btn admin-btn--primary" type="submit">
              {editingId ? "Atualizar Evento" : "Criar Evento"}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn--danger" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin-filters">
          <h3 className="admin-filters__title">Filtros de Pesquisa</h3>

          <div className="admin-filters__row">
            <input
              type="text"
              className="admin-filters__input"
              placeholder="Pesquisar por título"
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
            />
            <select
              className="admin-filters__select"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="desporto">Desporto</option>
              <option value="cultura">Cultura</option>
              <option value="festividades">Festividades</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="admin-filters__row">
            <label className="admin-filters__label">Data inicial:</label>
            <input
              type="date"
              className="admin-filters__date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
            <label className="admin-filters__label">Data final:</label>
            <input
              type="date"
              className="admin-filters__date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-list">
          {eventosFiltrados.length === 0 ? (
            <div className="admin-message admin-message--empty">Nenhum evento encontrado com os filtros aplicados.</div>
          ) : (
            eventosFiltrados.map((evento) => (
              <div key={evento.id} className="admin-item">
                <div className="admin-item__header">
                  <div>
                    <h3 className="admin-item__title">{evento.titulo_E}</h3>
                    <div className="admin-item__meta">
                      <strong>Criado em:</strong> {new Date(evento.data_CE).toLocaleDateString()} |{" "}
                      <strong>Data do evento:</strong> {new Date(evento.data_E).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="admin-flex admin-gap-sm">
                    <span
                      className={`admin-badge ${evento.estado === "ativo" ? "admin-badge--active" : "admin-badge--inactive"}`}
                    >
                      {evento.estado}
                    </span>
                    <span className="admin-badge admin-badge--neutral">{evento.tipo_E}</span>
                  </div>
                </div>

                {evento.media && Array.isArray(evento.media) && evento.media.length > 0 && (
                  <div className="admin-gallery">
                    {evento.media.map((m, i) => (
                      <img
                        key={i}
                        src={`https://api.jf-figueiredo.com/uploads/${m.file}`}
                        alt={`Imagem ${i + 1} do evento`}
                        className="admin-gallery__item"
                      />
                    ))}
                  </div>
                )}

                <div className="admin-item__content">
                  <p>{evento.texto_E}</p>
                </div>

                <div className="admin-item__actions">
                  <button className="admin-btn admin-btn--primary admin-btn--small" onClick={() => handleEdit(evento)}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(evento.id)}
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

export default AdminEventos

