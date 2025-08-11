import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/navbar_admin";
import "../../styles/admin/galeria_admin.css";
import { formatarEnum_D } from "../../utils/formatacoes";

const AdminDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [tipo_D, setTipo_D] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const API_URL = "http://localhost:3000/api/documentos";
  const token = localStorage.getItem("token");

  const fetchDocumentos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDocumentos(data);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tipo_D", tipo_D);
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTipo_D("");
      setMediaFiles([]);
      fetchDocumentos();
    } catch (error) {
      console.error("Erro ao enviar documento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDocumentos();
    } catch (error) {
      console.error("Erro ao apagar documento:", error);
    }
  };

  const limparFiltros = () => {
    setDataInicial("");
    setDataFinal("");
    setFiltroTipo("todos");
  };

  const documentosFiltrados = documentos.filter((doc) => {
    const dataDoc = new Date(doc.data_CD).toISOString().split("T")[0];

    if (dataInicial && dataDoc < dataInicial) return false;
    if (dataFinal && dataDoc > dataFinal) return false;
    if (filtroTipo !== "todos" && doc.tipo_D !== filtroTipo) return false;

    return true;
  });

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h1>Gestão de Documentos</h1>

        {/* Formulário de upload */}
        <form onSubmit={handleSubmit} className="form">
          <h2>Novo Documento</h2>
          <select
            value={tipo_D}
            onChange={(e) => setTipo_D(e.target.value)}
            required
          >
            <option value="">Selecione o tipo de documento</option>
            <option value="atas">Atas</option>
            <option value="plano_de_atividades">Plano de Atividades</option>
            <option value="avisos">Avisos</option>
            <option value="editais">Editais</option>
            <option value="regulamentos">Regulamentos</option>
            <option value="relatorios_de_contas">Relatórios de contas</option>
            <option value="outro">Outro</option>
          </select>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setMediaFiles(e.target.files)}
          />

          <button type="submit">Enviar</button>
        </form>

        <h2>Documentos</h2>

        {/* Usando a classe CSS para filtros */}
        <div className="filtroStyle">
          <div>
            <label>Data inicial:</label>
            <br />
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>

          <div>
            <label>Data final:</label>
            <br />
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>

          <div>
            <br />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="atas">Atas</option>
              <option value="plano_de_atividades">Plano de Atividades</option>
              <option value="avisos">Avisos</option>
              <option value="editais">Editais</option>
              <option value="regulamentos">Regulamentos</option>
              <option value="relatorios_de_contas">Relatórios de contas</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="galeria-list">
          {documentosFiltrados.length === 0 ? (
            <p>Nenhum documento encontrado.</p>
          ) : (
            documentosFiltrados.map((doc) => (
              <div key={doc.id} className="galeria-item">
                <h3>{formatarEnum_D(doc.tipo_D)}</h3>
                <p>Data: {new Date(doc.data_CD).toLocaleDateString()}</p>
                <div className="thumbs">
                  {doc.media.map((file) => {
                    const ext = file.file.split(".").pop().toLowerCase();
                    const isImage = [
                      "jpg",
                      "jpeg",
                      "png",
                      "gif",
                      "webp",
                    ].includes(ext);
                    const fileUrl = `http://localhost:3000/uploads/${file.file}`;

                    return isImage ? (
                      <img
                        key={file.id}
                        src={fileUrl}
                        alt={file.alt || ""}
                        className="thumb"
                      />
                    ) : (
                      <a
                        key={file.id}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 {file.file}
                      </a>
                    );
                  })}
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="delete-btn"
                >
                  Apagar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentos;
