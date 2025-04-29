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
                        <img src="/assets/imagenes/paginas/nosotros/banner.jpg" alt="" className="page-banner-img"/>

                        <div className="block-title-container">
                            <h1 className="block-title">Nosotros</h1>
                        </div>

                        <div className="d-flex-column gap-20">
                            <div className="d-flex-column gap-10">
                                <p className="title">Nuestra empresa</p>
                                <p className="text">En Kamas fabricamos y diseñamos productos de dormitorio de la más alta calidad, nuestras alianzas estratégicas con proveedores nacionales e internacionales de materia prima, nuestro personal capacitado constantemente y nuestras maquinarias de última tecnología nos permiten trabajar con un norte de calidad en todas las etapas de  producción y servicio al consumidor.</p>
                            </div>

                            <div className="d-grid-2-1fr gap-20">
                                <div className="d-flex-column gap-10">
                                    <p className="title">Nuestra visión</p>
                                    <p className="text">Nuestra visión es ser la marca líder del descanso en el Perú, consolidando  y expandiendo nuestra gama de productos en todas las ciudades del país.</p>
                                </div>
                                <div className="d-flex-column gap-10">
                                    <p className="title">Nuestra misión</p>
                                    <p className="text">Satisfacer y superar las expectativas de nuestros clientes en lo que refiere al mercado del descanso, creando valor para nuestros accionistas, trabajadores y clientes.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Nosotros;
