import React from "react";
import { Helmet } from "react-helmet";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

const Error404 = () => {
    return(
        <>
            <Helmet>
                <title>Página no encontrada | Kamas</title>
            </Helmet>

            <Header/>
            
            <main>
                <div className="block-container">
                    <section className="block-content">
                        <h1>Error 404 - Página no encontrada</h1>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
};

export default Error404;
