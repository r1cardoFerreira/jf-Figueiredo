import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/sugestao.css";

const Contactos = () => {
  const [formData, setFormData] = useState({
    nome_SR: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://api.jf-figueiredo.com/api/sugestoes_reclamacoes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Sugestão enviada com sucesso!");
        setFormData({ nome_SR: "", email: "", assunto: "", mensagem: "" });
      } else {
        const error = await response.json();
        alert("Erro ao enviar: " + error.message);
      }
    } catch (err) {
      alert("Erro na ligação ao servidor.");
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sugestao-container">
        <h2 className="sugestao-tittle">Contacto</h2>
        <form onSubmit={handleSubmit}>
          <span>Nome*</span>
          <input
            type="text"
            name="nome_SR"
            className="sugestao-input"
            value={formData.nome_SR}
            onChange={handleChange}
            required
          />
          <span>Email*</span>
          <input
            type="email"
            name="email"
            className="sugestao-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span>Assunto*</span>
          <input
            type="text"
            name="assunto"
            className="sugestao-input"
            value={formData.assunto}
            onChange={handleChange}
            required
          />
          <span>Mensagem*</span>
          <textarea
            name="mensagem"
            className="sugestao-input msg"
            value={formData.mensagem}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="sugestao-button">
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contactos;
