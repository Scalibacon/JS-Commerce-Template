import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import './style.css';

function LoginAdm(){
    return(
        <>
        <Header/>
            <div className="login-adm-container">
                <section>
                    <h1>Entrar como administrador</h1>
                    <label>CPF</label>
                    <input type='text' placeholder='Digite seu CPF...'/>
                    <label>Senha</label>
                    <input type='password' placeholder='Digite sua senha...'/>
                    <p><Link to="/">Esqueceu sua senha?</Link></p>
                    <button>Entrar</button>
                </section>
                
            </div>
        <Footer/>
        </>
    )
}

export default LoginAdm;