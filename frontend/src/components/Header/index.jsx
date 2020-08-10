import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FiLogIn, FiPhone, FiGrid, FiChevronDown, FiPercent, FiBell, FiShoppingBag, FiUser} from 'react-icons/fi';
import { GiAllSeeingEye } from 'react-icons/gi';

function Header(){

    return (
        <header id='the-header'>
            <section className='header-section-up'>
                <span>
                    <Link to='/'><GiAllSeeingEye size='75' className='logo' alt='logo'/></Link>
                </span>
                
                <div className='search'>
                    <input type='text' placeholder='Digite o que está procurando...'/>
                    <button>Buscar</button>
                </div>
                
                <div className='login'>
                    <FiLogIn size='37' alt='login'/> <p>Entre ou cadastre-se</p>
                </div>

                <div className='login'>
                    <FiPhone size='37' alt='login'/> <p>Fale conosco</p>
                </div>
            </section>

            <section className='header-section-down'>
                <span><FiGrid size='21'/><p>Categorias</p><FiChevronDown size='21'/></span>
                <span><FiPercent size='17'/><p>Promoções</p></span>
                <span><FiBell size='17'/><p>Novidades</p></span>
                <span><FiShoppingBag size='17'/><p>Populares</p></span>
                <Link to='/about-us'><span><FiUser size='17'/><p>Sobre nós</p></span></Link>
            </section>
        </header>
    )
}

export default Header;