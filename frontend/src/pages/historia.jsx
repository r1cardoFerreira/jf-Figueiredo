import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/historia.css"
import sedeFoto from "../../public/Figueiredo_sede_da_junta.jpg"

const Historia =() =>{
    return(
        <div>
            <Navbar/>
                 <div class="historia-container">
                    <img src={sedeFoto} alt="Freguesia de Figueiredo" class="historia-imagem"/>

                    <div class="historia-titulo">
                      História de Figueiredo
                    </div>

                    <p class="historia-texto">
                      Figueiredo tem a sua origem perdida na névoa dos tempos, mas o mais antigo documento que a esta freguesia faz 
                      referência data de 1113 e é de D. Paio Mendes e sua esposa D. Gontina, os quais doaram bens que lá possuíam à 
                      Sé de Braga. Através deste manuscrito descobriram-se dados sobre a toponímia local, tais como “Paredes” e 
                      “Cossourados”, que nos levam a supor a existência de muros de fortificações desaparecidas, que podem ter 
                      origem numa anterior ocupação romana. Há de facto vestígios da estrada romana que ligava Bracara Augusta (Braga) 
                      a Olissipo (Lisboa) e que se situam próximo de Figueiredo, hipótese essa reforçada pela descoberta em 1899 de uma talha 
                      de barro grosseiro, contendo moedas de cobre e prata, referentes a vários imperadores romanos. Uma outra cruz próxima da 
                      igreja paroquial (monumento nacional) data de 1720  e possivelmente fazia parte de uma Via-Sacra realizada na aldeia por 
                      altura da Páscoa. Há, no entanto, quem afirme que a localização da Igreja não é a original, tendo sido transladada e por essa 
                      altura foi-lhe anexada a capela de Nº Srº dos Passos.
                    </p>
                </div>
        </div>
    )
}
export default Historia;