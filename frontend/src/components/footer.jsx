import React from "react";
import '../styles/footer.css';

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="footer-item">
                <p className="footer-title">Figueiredo</p>
                <p className="footer-text"> 
                    Rua do Pinheiro do Bicho, nº 60.<br/>
                    Tel.: 253 030 946<br/>
                    Coordenadas GPS:<br/>
                    N41°30′11.99″/W8°26′7.93″<br/>
                    Horário de Funcionamento:3ª e 5ª feira : 19h00 - 20h30;<br/>
                    Email: freguesiade.figueiredo@gmail.com
                </p>
            </div>
            <div className="footer-item">

            </div>
            <div className="footer-item">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4143.5727059054325!2d-8.437951023143675!3d41.50338278879107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24ee763bad6787%3A0xb064b4ee6a58d718!2sJunta%20de%20Freguesia%20de%20Figueiredo!5e1!3m2!1spt-PT!2spt!4v1751454174561!5m2!1spt-PT!2spt"
                    width="490px"
                    height="370px"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Figueiredo">
                </iframe>
            </div>
            
        </div>
    );
};

export default Footer