import React, { useEffect } from 'react';
import './style.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { iniciaSlides, selecionaSlide, passaSlide, iniciaLoop, pausaLoop } from './script';

function Slideshow(){
    useEffect(() => {
        iniciaSlides();

        return () => {
            pausaLoop();
        }
    }, [])

    return (
        <>
            <div className='slideshow' onMouseOver={pausaLoop} onMouseLeave={iniciaLoop}>
                <div className='slide fade'>
                    <img src='https://images.tcdn.com.br/img/img_prod/690339/1596140156_winter-sale-2.jpg' alt='slide1'/>
                </div>
                <div className='slide fade'>
                    <img src='https://images.tcdn.com.br/img/img_prod/690339/1596140156_winter-sale-2.jpg' alt='slide2'/>
                </div>
                <div className='slide fade'>
                    <img src='https://images.tcdn.com.br/img/img_prod/690339/1596140156_winter-sale-2.jpg' alt='slide3'/>
                </div>

                <span className='prev'><FiChevronLeft color='white' size='75' onClick={() => passaSlide(-1)}/></span>
                <span className='next'><FiChevronRight color='white' size='75' onClick={() => passaSlide(1)}/></span>

                <div className='dot-container'>
                    <span className='slideshow-dot' onClick={() => selecionaSlide(1)}></span>
                    <span className='slideshow-dot' onClick={() => selecionaSlide(2)}></span>
                    <span className='slideshow-dot' onClick={() => selecionaSlide(3)}></span>
                </div>
            </div>
        </>
    )
}

export default Slideshow;