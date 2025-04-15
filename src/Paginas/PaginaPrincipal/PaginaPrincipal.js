import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Slider from './Componentes/Slider/Slider';
import SoloPorHoras from './Componentes/SoloPorHoras/SoloPorHoras';
import UltimasNovedades from './Componentes/UltimasNovedades/UltimasNovedades';
import Ofertas from './Componentes/Ofertas/Ofertas';
import SobreNosotros from './Componentes/SobreNosotros/SobreNosotros';
import Distribuidores from '../../Componentes/Distribuidores/Distribuidores';
// import Dormitorio from '../../Componentes/Dormitorio/Dormitorio';
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

    return(
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
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
                                            <img src={categoria.menuImg ? categoria.menuImg[0].imgSrc : ''} alt={categoria.menuImg ? categoria.menuImg[0].imgAlt : categoria.categoria} />
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

                <Distribuidores/>

                {/* <Dormitorio/> */}

                <ModalDatos/>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
