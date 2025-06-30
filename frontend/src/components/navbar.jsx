import React, { useState } from 'react';
import '../styles/navbar.css';
import logo from '../../public/brg-figueiredo.jpg';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="header">
      <div className="left-section">
        <img src={logo} alt="Brasão de Figueiredo" className="logo" />
        <div className="title">
          <span className="subtitle">Freguesia de</span>
          <span className="main-title">Figueiredo</span>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-item" onClick={() => toggleDropdown('freguesia')}>
          Freguesia ▾
          {openDropdown === 'freguesia' && (
            <div className="dropdown">
              <a href="#historia">História</a>
              <a href="#Heraldica">Heraldica</a>
              <a href="#Visitar">Visitar</a>
              <a href="#mapa">Rede Escolar</a>
              <a href="#Galeria">Galeria</a>
              <a href="#mapa">Associotismo</a>
            </div>
          )}
        </div>
        <a href="#eventos">Eventos</a>
        <a href="#corpo-social">Corpo Social</a>
        <div className="nav-item" onClick={() => toggleDropdown('autarquia')}>
          Autarquia ▾
          {openDropdown === 'autarquia' && (
            <div className="dropdown">
              <a href="#historia">Documentos Executivos</a>
              <a href="#Concursos"> Concursos Publicos</a>
              <a href="#Visitar">Documentos da Assembleia:</a>
              <a href="#mapa">Toponimia </a>
            </div>
          )}
        </div>
        <a className="right" href="#contactos">Contactos</a>
      </nav>
    </header>
  );
};

export default Navbar;
