import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../styles/associacaoDetalhes.css";

const AssociacaoDetalhes = () => {
  const { id } = useParams();
  const [associacao, setAssociacao] = useState(null);

  useEffect(() => {
    fetch(`http://jf-figueiredo.com/api/associacoes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        // Se for array (ex: [{...}]) usa o primeiro item
        const assoc = Array.isArray(data) ? data[0] : data;
        setAssociacao(assoc);
      })
      .catch((err) => console.error("Erro ao buscar associação:", err));
  }, [id]);

  if (!associacao) return <div>Carregando...</div>;

  return (
    <div>
      <Navbar />
      <div className="detalhes-container">
  <div className="detalhes-topo">
    {associacao.media ? (
      <img
        src={
          associacao.media.file
            ? `http://jf-figueiredo.com/uploads/${associacao.media.file}`
            : `http://jf-figueiredo.com/uploads/${associacao.media}`
        }
        alt={`Emblema de ${associacao.nome_A}`}
        className="detalhes-imagem"
      />
    ) : (
      <div
        className="detalhes-placeholder"
        style={{ width: 180, height: 180, background: "#ccc" }}
      >
        Sem imagem
      </div>
    )}
    <h2 className="detalhes-nome">{associacao.nome_A}</h2>
  </div>

  <div className="detalhes-conteudo">
    <h4 className="detalhes-subtitulo">Descrição da associação</h4>
    <p>{associacao.texto_A || "Descrição não disponível."}</p>
  </div>

  <div className="detalhes-contato">
    <p>
      <strong>Email:</strong> {associacao.email || "Não disponível"}
    </p>
    <p>
      <strong>Redes Sociais | Telefone:</strong> {associacao.telefone || "Não disponível"}
    </p>
  </div>
</div>
    </div>
  );
};

export default AssociacaoDetalhes;