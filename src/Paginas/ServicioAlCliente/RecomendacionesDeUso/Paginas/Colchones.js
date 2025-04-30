import React from "react";
import { Helmet } from "react-helmet";

import Header from '../../../../Componentes/Header/Header';
import Footer from '../../../../Componentes/Footer/Footer';

function RecomendacionesColchones(){
    return(
        <>
            <Helmet>
                <title>Recomendaciones de uso - Colchones | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content d-flex-center-center'>
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/recomendaciones-de-uso/colchones.png" alt=""/>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default RecomendacionesColchones;
