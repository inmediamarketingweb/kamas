import { Helmet } from "react-helmet-async";

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Contacto.css';

function Contacto(){
    return(
        <>
            <Helmet>
                <title>Contacto | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Contáctanos</h1>
                        </div>

                        <p className='text'>Página de contacto</p>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Contacto;
