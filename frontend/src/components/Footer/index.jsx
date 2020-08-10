import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Footer(){

    return (
        <footer>
            <div>ScaliDev © Todos os direitos reservados</div>

            <div>Política de Privacidade</div>

            <div>Termos de Uso</div>

            <div>Sites parceiros</div>    

            <div><Link to='/login/adm'>Área Administrativa</Link></div>
        </footer>
    )
}

export default Footer;