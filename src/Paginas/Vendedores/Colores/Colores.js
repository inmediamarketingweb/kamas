import Header from '../../../Componentes/Header/Header';
import Footer from '../../../Componentes/Footer/Footer';

import './Colores.css';

function Colores(){
    return(
        <>
            <Header/>
            
            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Nuestros colores</h1>
                        </div>

                        <p>Telas, sus categorías y colores</p>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Colores;
