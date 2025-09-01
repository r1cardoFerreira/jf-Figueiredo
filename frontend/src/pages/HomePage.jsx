import React from "react";
import Navbar from "../components/navbar";
import Eventos from "./eventos";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer";
import imgIgreja from "../../public/Igreja_de_Figueiredo.jpg"
import imgCasa from "../../public/House_in_Figueiredo.jpg"
import "../styles/homepage.css"

import Map from  '../../public/map_icon.svg'
import Book from  '../../public/book_icon.svg'
import Box from  '../../public/box_icon.svg'
import Associacoes from  '../../public/associacoes_icon.svg'
import EspacoCidadao from  '../../public/espaco_cidadao_icon.svg'


const items = [
  { icon: "📍", label: "Visitar" },
  { icon: "📘", label: "Historia" },
  { icon: "🤝", label: "Sugestoes" },
  { icon: "👥", label: "Associacoes", link: "/associacoes" },
  { icon: "🔍", label: "Espaco Cidadao", link: "/espaco-cidadao" },
];
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

return(
<div>
    <Navbar/>
    <div className="img-front">
        <img src={imgIgreja} alt="Igreja de Figueiredo" />
    </div>
<div className="menu-container">
        <div className="menu-item">
          <Link to={"/visitar"}>
            <div className="menu-icon"><img className="img-visible"src='/map_icon.svg'/></div>
            <div className="menu-label">Visitar</div>  
          </Link>
        </div>
        <div className="menu-item">
          <Link to={"/historia"}>
            <div className="menu-icon"><img className="img-visible"src='/book_icon.svg'/></div>
            <div className="menu-label">História</div>  
          </Link>
        </div>
        <div className="menu-item">
          <Link to={"/Sugestao"}>
            <div className="menu-icon"><img className="img-visible"src='/box_icon.svg'/></div>
            <div className="menu-label">Sugestões</div>  
          </Link>
        </div>
        <div className="menu-item">
          <Link to={"/associacoes"}>
            <div className="menu-icon"><img className="img-visible"src='/associacoes_icon.svg'/></div>
            <div className="menu-label">Associações</div>  
          </Link>
        </div>
        <div className="menu-item">
          <Link to={"/espaco-cidadao"}>
            <div className="menu-icon"><img className="img-visible"src='/espaco_cidadao_icon.svg'/></div>
            <div className="menu-label">Espaço Cidadão</div>  
          </Link>
        </div>
    </div>
    <section id="eventos">
      <h1 className="IdTittle">Eventos</h1>
      <Eventos/>
    </section>
    <Footer/>
</div>

);
};

export default HomePage;