import React from "react";
import { Helmet } from "react-helmet";

import Header from '../../../../Componentes/Header/Header';
import Footer from '../../../../Componentes/Footer/Footer';

function GarantiaCabeceras(){
    return(
        <>
            <Helmet>
                <title>Garantía de productos - Cabeceras | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content d-flex-center-center'>
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/cabeceras-2.png" alt=""/>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default GarantiaCabeceras;
