import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/heraldica.css"
import logo from '../../public/brg-figueiredo.jpg'

const Heraldica = () =>{
    return(
        <div>
        <Navbar/>
        <div className="heraldica-container">
            <div className="heraldica-item">
                <p className="heraldica-tittle">Heraldica da Freguesia</p>
            </div>
            <div className="heraldica-item">
            </div>
            <div className="heraldica-item">
                <img src={logo} className="heraldica-brasao"/>
            </div> 
            <div className="heraldica-item">
                <h2 className="heraldica-subtittle">Armas</h2>
                <p className="heraldica-text">  
                    Escudo de prata, com uma faixa de negro, lavrada de ouro entre um mundo de azul encimado 
                    por cruz do mesmo metal e três folhas de figueira, de verde, nervadas de ouro. Coroa mural 
                    de prata de três torres. Listel branco com a legenda a negro em maiúsculas:<br/>“FIGUEIREDO - BRAGA “.
                </p>
            </div>
        </div>
        <Footer/>
        </div>
    )

}
export default Heraldica