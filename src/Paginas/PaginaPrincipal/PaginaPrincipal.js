import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';

import Slider from './Componentes/Slider/Slider';
import SoloPorHoras from './Componentes/SoloPorHoras/SoloPorHoras';
import UltimasNovedades from './Componentes/UltimasNovedades/UltimasNovedades';
import Ofertas from './Componentes/Ofertas/Ofertas';
import SobreNosotros from './Componentes/SobreNosotros/SobreNosotros';
import Distribuidores from '../../Componentes/Distribuidores/Distribuidores';
import ModalDatos from './Componentes/ModalDatos/ModalDatos';

import Footer from '../../Componentes/Footer/Footer';

import './PaginaPrincipal.css';

function PaginaPrincipal(){
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/assets/json/categorias/categorias.json')
            .then(response => response.json())
            .then(data => {
                setCategorias(data.categorias.slice(0, 6));
            })
            .catch(error => console.error('Error cargando categorías:', error));
    }, []);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
                <meta name="description" content="Fabricantes de colchones, camas, box tarimas y juegos de dormitorios con más de 15 años en el mercado peruano ofreciendo calidad y confort para tu descanso." />

                <meta property="og:title" content="Kamas | Fabricantes de colchones, camas y dormitorios."/>
                <meta property="og:description" content="Meta descripción"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.kamas.pe/"/>
                <meta property="og:image" content="/assets/imagenes/paginas/pagina-principal/homepage-video.jpg"/>
                <meta property="og:site_name" content="Kamas"/>
            </Helmet>

            <Header/>

            <main>
                <Slider/>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <p className='block-title margin-auto'>Nuestros productos</p>
                        </div>

                        <ul className='homepage-categories'>
                            {categorias.map((categoria) => (
                                <li key={categoria.id}>
                                    <a href={categoria.ruta}>
                                        <div>
                                            <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={categoria.menuImg ? categoria.menuImg[0].imgSrc : ''} alt={categoria.menuImg ? categoria.menuImg[0].imgAlt : categoria.categoria}/>
                                        </div>
                                        <p className='text'>{categoria.categoria}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <SoloPorHoras/>

                <UltimasNovedades/>
                
                <Ofertas/>

                <SobreNosotros/>

                {/* <div className='block-container'>
                    <section className='block-content'>
                        <img loading="lazy" width={isSmallScreen ? 385 : 1600} height={isSmallScreen ? 120 : 480} src="/assets/imagenes/paginas/pagina-principal/banner-2.webp" alt="Kamas | Fabricantes de dormitorios, camas, box tarimas, cabeceras"/>
                    </section>
                </div> */}

                <Distribuidores/>

                <ModalDatos/>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
