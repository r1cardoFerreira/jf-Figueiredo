import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/admin.css"

const AdminDocumentos = () => {
  const [documentos, setDocumentos] = useState([])
  const [tipo_D, setTipo_D] = useState("")
  const [mediaFiles, setMediaFiles] = useState([])
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")

  const API_URL = "http://localhost:3000/api/documentos"
  const token = localStorage.getItem("token")

  const tiposDocumento = [
    { value: "atas", label: "Atas" },
    { value: "plano_de_atividades", label: "Plano de Atividades" },
    { value: "avisos", label: "Avisos" },
    { value: "editais", label: "Editais" },
    { value: "regulamentos", label: "Regulamentos" },
    { value: "relatorios_de_contas", label: "Relatórios de Contas" },
    { value: "outro", label: "Outro" },
  ]

  const formatarEnum_D = (tipo) => {
    const tipoObj = tiposDocumento.find((t) => t.value === tipo)
    return tipoObj ? tipoObj.label : tipo
  }

  const fetchDocumentos = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setDocumentos(data)
    } catch (error) {
      console.error("Erro ao buscar documentos:", error)
    }
  }

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("tipo_D", tipo_D)
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i])
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTipo_D("")
      setMediaFiles([])
      fetchDocumentos()
    } catch (error) {
      console.error("Erro ao enviar documento:", error)
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
      fetchDocumentos()
    } catch (error) {
      console.error("Erro ao apagar documento:", error)
    }
  }

  const documentosFiltrados = documentos.filter((doc) => {
    const dataDoc = new Date(doc.data_CD).toISOString().split("T")[0]

    if (dataInicial && dataDoc < dataInicial) return false
    if (dataFinal && dataDoc > dataFinal) return false
    if (filtroTipo !== "todos" && doc.tipo_D !== filtroTipo) return false

    return true
  })

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1 className="admin-title">Gestão de Documentos</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <h2 className="admin-form__title">Novo Documento</h2>

          <div className="admin-form__group">
            <label className="admin-form__label">Tipo de Documento</label>
            <select value={tipo_D} onChange={(e) => setTipo_D(e.target.value)} className="admin-form__select" required>
              <option value="">Selecione o tipo de documento</option>
              {tiposDocumento.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Arquivos PDF</label>
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={(e) => setMediaFiles(e.target.files)}
              className="admin-form__file"
            />
          </div>

          <div className="admin-btn-group">
            <button type="submit" className="admin-btn admin-btn--primary">
              Enviar Documento
            </button>
          </div>
        </form>

        <div className="admin-filters">
          <h3 className="admin-filters__title">Filtros</h3>
          <div className="admin-filters__row">
            <div>
              <label className="admin-filters__label">Data inicial:</label>
              <input
                type="date"
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                className="admin-filters__date"
              />
            </div>

            <div>
              <label className="admin-filters__label">Data final:</label>
              <input
                type="date"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                className="admin-filters__date"
              />
            </div>

            <div>
              <label className="admin-filters__label">Tipo:</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="admin-filters__select"
              >
                <option value="todos">Todos os tipos</option>
                {tiposDocumento.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        <h2 className="admin-subtitle">Documentos</h2>

        <div className="admin-list">
          {documentosFiltrados.length === 0 ? (
            <div className="admin-message admin-message--empty">
              <p>Nenhum documento encontrado.</p>
            </div>
          ) : (
            documentosFiltrados.map((doc) => (
              <div key={doc.id} className="admin-item">
                <div className="admin-item__header">
                  <h3 className="admin-item__title">{formatarEnum_D(doc.tipo_D)}</h3>
                  <div className="admin-item__meta">Data: {new Date(doc.data_CD).toLocaleDateString("pt-BR")}</div>
                </div>

                <div className="admin-item__content">
                  <div className="admin-gallery">
                    {doc.media.map((file) => {
                      const ext = file.file.split(".").pop().toLowerCase()
                      const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)
                      const fileUrl = `http://localhost:3000/uploads/${file.file}`

                      return isImage ? (
                        <img
                          key={file.id}
                          src={fileUrl || "/placeholder.svg"}
                          alt={file.alt || ""}
                          className="admin-thumbnail"
                        />
                      ) : (
                        <a
                          key={file.id}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn--small"
                        >
                          📄 {file.file}
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="admin-item__actions">
                  <button onClick={() => handleDelete(doc.id)} className="admin-btn admin-btn--danger admin-btn--small">
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

export default AdminDocumentos
