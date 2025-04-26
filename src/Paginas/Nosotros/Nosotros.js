import { Helmet } from "react-helmet-async";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./Nosotros.css";

function Nosotros(){
    return(
        <>
            <Helmet>
                <title>Nosotros | Kamas</title>
                <meta name="description" content="Descubre las mejores ofertas en productos seleccionados." />
            </Helmet>

            <Header/>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h1 className="block-title">Nosotros</h1>
                        </div>

                        <p className="text">Contenido restante, fotos, videos y textos.</p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Nosotros;
