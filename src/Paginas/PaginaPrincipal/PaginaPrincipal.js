import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaPrincipal.css';

function PaginaPrincipal(){
    return(
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
            </Helmet>

            <Header/>

            <main>
                <div className='hero-container'>
                    <section className='hero'>
                        <div className='slider-container'>
                            <ul className='slider'>
                                <li>
                                    <a href='/' title="1">
                                        <img src="/assets/imagenes/componentes/slider/1.jpg" alt=""/>
                                    </a>
                                </li>
                                <li>
                                    <a href='/' title="2">
                                        <img src="/assets/imagenes/componentes/slider/2.jpg" alt=""/>
                                    </a>
                                </li>
                                <li>
                                    <a href='/' title="3">
                                        <img src="/assets/imagenes/componentes/slider/3.jpg" alt=""/>
                                    </a>
                                </li>
                                <li>
                                    <a href='/' title="4">
                                        <img src="/assets/imagenes/componentes/slider/4.jpg" alt=""/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <button className='hero-slider-button hero-slider-button-1'>
                        <span className="material-icons">chevron_left</span>
                    </button>
                    <button className='hero-slider-button hero-slider-button-2'>
                        <span className="material-icons">chevron_right</span>
                    </button>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>Nuestros productos</p>
                        </div>
                        <ul className='homepage-categories'>
                            <li>
                                <a href='/productos/colchones/'>
                                    <div>
                                        <img src="https://www.kamas.pe/829-large_default/colchon-kamas-extra-ortopedico-konig-queen.jpg" alt='Colchones | Kamas'/>
                                    </div>
                                    <p>Colchones</p>
                                </a>
                            </li>
                            <li>
                                <a href='/productos/cama-box-tarimas/'>
                                    <div>
                                        <img src="https://www.kamas.pe/2662-large_default/cama-box-king-americano-2-cuerpos-cabecera-pedestal-capitoneado-gris.jpg" alt='Cama box tarimas | Kamas'/>
                                    </div>
                                    <p>Cama box tarimas</p>
                                </a>
                            </li>
                            <li>
                                <a href='/productos/dormitorios/'>
                                    <div>
                                        <img src="https://www.kamas.pe/880-large_default/dormitorio-americano-king-colchon-kamas-sarki-cabecera-aerea-cuadros-1-puff-marron.jpg" alt='Dormitorios | Kamas'/>
                                    </div>
                                    <p>Dormitorios</p>
                                </a>
                            </li>
                            <li>
                                <a href='/productos/camas-funcionales/'>
                                    <div>
                                        <img src="https://www.kamas.pe/376-large_default/cama-box-espacio-americano-15-plazas-marron.jpg" alt='Camas funcionales | Kamas'/>
                                    </div>
                                    <p>Camas funcionales</p>
                                </a>
                            </li>
                            <li>
                                <a href='/productos/cabeceras/'>
                                    <div>
                                        <img src="https://www.kamas.pe/103-large_default/cabecera-pedestal-kamas-majestad-queen-violeta-oscuro.jpg" alt='Cabeceras | Kamas'/>
                                    </div>
                                    <p>Cabeceras</p>
                                </a>
                            </li>
                            <li>
                                <a href='/productos/sofas/'>
                                    <div>
                                        <img src="https://www.kamas.pe/566-large_default/sofa-seccional-kamas-beige.jpg" alt='Sofás | Kamas'/>
                                    </div>
                                    <p>Sofás</p>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
