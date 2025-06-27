import React from 'react';
import '../styles/navbar.css';
import logo from '../../public/brg-figueiredo.jpg'

const Navbar = () => {
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
        <a href="#freguesia">Freguesia</a>
        <a href="#eventos">Eventos</a>
        <a href="#corpo-social">Corpo Social</a>
        <a href="#autarquia">Autarquia</a>
        <a className='right' href="#contactos">Contactos</a>
      </nav>
    </header>
  );
};

export default Navbar;
