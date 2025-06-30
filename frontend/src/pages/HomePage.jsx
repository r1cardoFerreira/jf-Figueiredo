import React from "react";
import Navbar from "../components/navbar";
import imgIgreja from "../../public/Igreja_de_Figueiredo.jpg"
import imgCasa from "../../public/House_in_Figueiredo.jpg"
import "../styles/homepage.css"

const items = [
  { icon: "📍", label: "Visitar" },
  { icon: "📘", label: "Historia" },
  { icon: "🤝", label: "Sugestoes" },
  { icon: "👥", label: "Associacoes" },
  { icon: "🔍", label: "Espaco Cidadao" },
];
const HomePage = () => {
    
return(
<div>
    <Navbar/>
    <div className="img-front">
        <img src={imgCasa} alt="Igreja de Figueiredo" />
    </div>
     <div className="menu-container">
      {items.map((item, index) => (
        <div className="menu-item" key={index}>
          <div className="menu-icon">{item.icon}</div>
          <div className="menu-label">{item.label}</div>
        </div>
      ))}
    </div>
    <section id="Eventos">
      <h1 className="IdTittle">Eventos</h1>
    </section>
</div>
);
};

export default HomePage;