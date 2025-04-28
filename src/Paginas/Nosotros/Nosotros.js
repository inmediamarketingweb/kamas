import { Helmet } from "react-helmet-async";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./Nosotros.css";

function Nosotros(){
    return(
        <>
            <Helmet>
                <title>Nosotros | Kamas</title>
                <meta name="description" content="Sobre nosotros"/>

                <meta property="og:title" content="Nosotros | Kamas"/>
                <meta property="og:site_name" content="Nosotros"/>
                <meta property="og:description" content="Sobre nosotros"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.kamas.pe/nosotros/"/>
                <meta property="og:image" content="https://kamas.pe/assets/imagenes/paginas/pagina-principal/homepage-video.jpg"/>
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
