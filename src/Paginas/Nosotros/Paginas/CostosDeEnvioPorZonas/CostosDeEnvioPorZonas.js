import { Helmet } from 'react-helmet';

import Header from '../../../../Componentes/Header/Header';
import Footer from '../../../../Componentes/Footer/Footer';

import './CostosDeEnvioPorZonas.css';

function CostosDeEnvioPorZonas(){
    return(
        <>
            <Helmet>
                <title>Costos de envios por zonas | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/costos-de-envio-por-zona/costos-de-envio-por-zona.jpg" alt="Costos de envio por zona | Kamas" className='page-banner-img'/>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default CostosDeEnvioPorZonas;
