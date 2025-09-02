import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/admin.css"

const AdminGaleria = () => {
  const [galeria, setGaleria] = useState([])
  const [label_G, setLabel_G] = useState("")
  const [mediaFiles, setMediaFiles] = useState([])
  const [filtroLabel, setFiltroLabel] = useState("")

  const API_URL = "http://jf-figueiredo.com/api/galeria"
  const token = localStorage.getItem("token")

  const fetchGaleria = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setGaleria(data)
    } catch (error) {
      console.error("Erro ao buscar galeria:", error)
    }
  }

  useEffect(() => {
    fetchGaleria()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("label_G", label_G)
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i])
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      setLabel_G("")
      setMediaFiles([])
      fetchGaleria()
      alert("Galeria criada com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar galeria:", error)
      alert("Erro ao enviar galeria: " + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja apagar esta entrada da galeria?")) return

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchGaleria()
    } catch (error) {
      console.error("Erro ao apagar galeria:", error)
    }
  }

  const galeriaFiltrada = galeria.filter((item) => item.label_G.toLowerCase().includes(filtroLabel.toLowerCase()))

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1 className="admin-title">Gestão da Galeria</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <h2 className="admin-form__title">Nova Entrada na Galeria</h2>

          <div className="admin-form__group">
            <label className="admin-form__label">Título da Galeria</label>
            <input
              type="text"
              className="admin-form__input"
              value={label_G}
              onChange={(e) => setLabel_G(e.target.value)}
              placeholder="Digite o título da galeria"
              required
            />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Imagens</label>
            <input
              type="file"
              className="admin-form__file"
              multiple
              accept="image/*"
              onChange={(e) => setMediaFiles(e.target.files)}
              required
            />
          </div>

          <div className="admin-btn-group">
            <button className="admin-btn admin-btn--primary" type="submit">
              Criar Galeria
            </button>
          </div>
        </form>

        <div className="admin-filters">
          <h3 className="admin-filters__title">Pesquisar na Galeria</h3>
          <div className="admin-filters__row">
            <input
              type="text"
              className="admin-filters__input"
              placeholder="Pesquisar por título"
              value={filtroLabel}
              onChange={(e) => setFiltroLabel(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-list">
          {galeriaFiltrada.length === 0 ? (
            <div className="admin-message admin-message--empty">Nenhum item encontrado na galeria.</div>
          ) : (
            galeriaFiltrada.map((item) => (
              <div key={item.id} className="admin-item">
                <div className="admin-item__header">
                  <h3 className="admin-item__title">{item.label_G}</h3>
                </div>

                <div className="admin-gallery">
                  {item.media.map((img) => (
                    <img
                      key={img.id}
                      src={`http://jf-figueiredo.com/uploads/${img.file}`}
                      alt={img.alt || `Imagem da galeria ${item.label_G}`}
                      className="admin-gallery__item"
                    />
                  ))}
                </div>

                <div className="admin-item__actions">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="admin-btn admin-btn--danger admin-btn--small"
                  >
                    Apagar Galeria
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

export default AdminGaleria
