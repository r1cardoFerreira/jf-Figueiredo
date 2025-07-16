import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../../public/brg-figueiredo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';  

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null); // Fechar dropdowns ao abrir/fechar menu mobile
  };

  return (
    <header className="header">
     <Link to="/"> <div className="left-section">
        <img src={logo} alt="Brasão de Figueiredo" className="logo" />
        <div className="title">
          <span className="subtitle">Freguesia de</span>
          <span className="main-title">Figueiredo</span>
        </div>
      </div>
      </Link>

      <div className={`mobile-menu-icon ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="nav-item" onClick={() => toggleDropdown('freguesia')}>
          Freguesia ▾
          {openDropdown === 'freguesia' && (
            <div className="dropdown">
              <Link to="/historia">História</Link>
              <Link to="/heraldica">Heráldica</Link>
              <a href="#Visitar">Visitar</a>
              <a href="#mapa">Rede Escolar</a>
              <a href="#Galeria">Galeria</a>
              <Link to="/associacoes">Associativismo</Link>
            </div>
          )}
        </div>

        <a href="#eventos">Eventos</a>
        <Link to="/corposocial">Corpo Social</Link>

        <div className="nav-item" onClick={() => toggleDropdown('autarquia')}>
          Autarquia ▾
          {openDropdown === 'autarquia' && (
            <div className="dropdown">
              <a href="#historia">Documentos Executivos</a>
              <a href="#Concursos">Concursos Públicos</a>
              <a href="#Visitar">Documentos da Assembleia</a>
              <a href="#mapa">Toponímia</a>
            </div>
          )}
        </div>

        <a className="right" href="#contactos">Contactos</a>
      </nav>
      <Outlet />
    </header>
  );
};

export default Navbar;