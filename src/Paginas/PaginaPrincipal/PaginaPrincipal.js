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
                                    <img src="/assets/imagenes/componentes/slider/1.jpg" alt=""/>
                                </li>
                                <li>
                                    <img src="/assets/imagenes/componentes/slider/2.jpg" alt=""/>
                                </li>
                                <li>
                                    <img src="/assets/imagenes/componentes/slider/3.jpg" alt=""/>
                                </li>
                                <li>
                                    <img src="/assets/imagenes/componentes/slider/4.jpg" alt=""/>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <p>Página principal</p>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
