import React from "react";
import { Helmet } from "react-helmet";

import Header from '../../../../Componentes/Header/Header';
import Footer from '../../../../Componentes/Footer/Footer';

function RecomendacionesCabeceras(){
    return(
        <>
            <Helmet>
                <title>Recomendaciones de uso - Cabeceras | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content d-flex-center-center'>
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/recomendaciones-de-uso/cabeceras.png" alt=""/>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default RecomendacionesCabeceras;
