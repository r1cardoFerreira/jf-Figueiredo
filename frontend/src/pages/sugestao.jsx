import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import"../styles/sugestao.css"

const Sugestao =() =>{
    return(
        <div>
            <Navbar/>
        <div className="sugestao-container">
            <h2 className="sugestao-tittle">Sugestoes</h2>
            <form>
                <span>Nome*</span>
                <input type="text" className="sugestao-input"></input>
                <span>Email*</span>
                <input type="text" className="sugestao-input"></input>
                <span>Assunto*</span>
                <input type="text" className="sugestao-input"></input>
                <span>Mensagem*</span>
                <textarea className="sugestao-input msg"></textarea>
                <button type="submit" className="sugestao-button">Enviar</button>
            </form>
        </div>
        </div>
    )
}
export default Sugestao;