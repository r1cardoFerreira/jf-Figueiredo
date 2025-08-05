import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import presidente from "../../public/marco_Oliveira.jpg";
import tesoureiro from "../../public/Joao.jpg"
import secretario from "../../public/Isabel.jpg"
import "../styles/corposocial.css"

const CorpoSocial = () => {
    return(
        <div>
            <Navbar/>
            <h2 className="CS-title">Composição do Executivo</h2>
            <div className="CS-card">
              <img src={presidente} alt="Marco Oliveira"/>
              <div className="CS-info">
                <div className="name">Marco Oliveira</div>
                <div className="role">Presidente</div>
              </div>
            </div>
             <div className="CS-card">
              <img src={tesoureiro} alt="Joao Manuel"/>
              <div className="CS-info">
                <div className="name">Joao Marques</div>
                <div className="role">Tesoureiro</div>
              </div>
            </div>
             <div className="CS-card">
              <img src={secretario} alt="Ana Isabel Sousa"/>
              <div className="CS-info">
                <div className="name">Ana Isabel Sousa</div>
                <div className="role">Secretária</div>
              </div>
            </div>
        </div>
    )
}
export default CorpoSocial;