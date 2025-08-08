import React from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/EspacoCidadao.css";

const EspacoCidadao = () => {
  const servicos = [
    'Renovar o Cartão de Cidadão',
    'Alterar a morada do Cartão de Cidadão',
    'Confirmar alteração de morada do Cartão de Cidadão',
    'Pedir o Certificado Digital Covid da UE',
    'Pedir o número de utente do SNS',
    'Ativar a Chave Móvel Digital',
    'Agendar atendimento de serviços públicos',
    'Renovar a Carta de Condução',
    'Pedir o Cartão Europeu de Seguro de Doença',
    'Pedir o PIN do Cartão de Cidadão',
    'Serviços Adicionais',
  ];

  return (
    <div className="espacoCidadao">
      <Navbar />
      <h1 className="espacoCidadao-Title">Espaço Cidadão</h1>
      <ul className="servicos-lista">
        {servicos.map((item, index) => (
          <li key={index} className="servico-item">
            {item}
          </li>
        ))}
      </ul>
      <p className="espacoCidadao-contactos">Contactos:</p>
      <p>Telefone: 253 68 56 06</p>
      <p>Email: espacocidadaofigueiredo@gmail.com</p>
      <p>
        Para mais informações, clique{" "}
        <a 
            className="botao-link"
            href="https://www.ama.gov.pt/web/agencia-para-a-modernizacao-administrativa/espaco-cidadao" 
            target="_blank" 
            rel="noopener noreferrer"
        >
          aqui
        </a>
      </p>
    </div>
  );
};

export default EspacoCidadao;
