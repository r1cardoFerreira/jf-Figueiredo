import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/navbar.css'
import logo from '../../../public/brg-figueiredo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';  

const AdminNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };
    return(
         <header className="header">
              <div className="left-section">
                <img src={logo} alt="Brasão de Figueiredo" className="logo" />
                <div className="title">
                  <span className="subtitle">Freguesia de</span>
                  <span className="main-title">Figueiredo</span>
                </div>
              </div>
        
              <div className={`mobile-menu-icon ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                  {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
              </div>

              <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
                <Link to="/associacoesadmin">Associacoes</Link>

                <Link to="/eventosadmin">Eventos</Link>

                <Link to="/galeriaadmin">Galeria</Link>

                <Link className='right'>Locais</Link>
                </nav>
              <Outlet />
              </header>
    )
}

export default AdminNavbar;