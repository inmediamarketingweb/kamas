import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaPrincipal.css';

function PaginaPrincipal() {
    const [categorias, setCategorias] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const totalSlides = 4;

    useEffect(() => {
        fetch('/assets/json/categorias/categorias.json')
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias.slice(0, 6));
            })
            .catch(error => console.error('Error cargando categorías:', error));
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.marginLeft = `-${currentIndex * 100}%`;
        }
    }, [currentIndex]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    return (
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
            </Helmet>

            <Header/>

            <div className='hero-container'>
                <section className='hero'>
                    <div className='slider-container'>
                        <ul className='slider' ref={sliderRef}>
                            {[1, 2, 3, 4].map((num) => (
                                <li key={num}>
                                    <a href='/' title={num.toString()}>
                                        <img src={`/assets/imagenes/componentes/slider/${num}.jpg`} alt={`Slide ${num}`} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <button className='hero-slider-button hero-slider-button-1' onClick={goToPrevSlide}>
                    <span className='material-icons'>chevron_left</span>
                </button>
                <button className='hero-slider-button hero-slider-button-2' onClick={goToNextSlide}>
                    <span className='material-icons'>chevron_right</span>
                </button>
            </div>
            
            <div className='block-container'>
                <section className='block-content'>
                    <div className='block-title-container'>
                        <p className='block-title'>Nuestros productos</p>
                    </div>
                    <ul className='homepage-categories'>
                        {categorias.map((categoria) => (
                            <li key={categoria.id}>
                                <a href={categoria.ruta}>
                                    <div>
                                        <img src={categoria.menuImg ? categoria.menuImg[0].imgSrc : ''} alt={categoria.menuImg ? categoria.menuImg[0].imgAlt : categoria.categoria} />
                                    </div>
                                    <p>{categoria.categoria}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <Footer />
        </>
    );
}

export default PaginaPrincipal;
