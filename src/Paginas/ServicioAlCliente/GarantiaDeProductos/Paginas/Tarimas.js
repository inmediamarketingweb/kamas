import React from "react";
import { Helmet } from "react-helmet";

import Header from '../../../../Componentes/Header/Header';
import Footer from '../../../../Componentes/Footer/Footer';

function GarantiaTarimas(){
    return(
        <>
            <Helmet>
                <title>Garantía de productos - Box tarimas | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content d-flex-center-center'>
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/box-tarimas-2.png" alt=""/>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default GarantiaTarimas;
