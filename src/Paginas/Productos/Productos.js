import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Productos.css';

function Productos(){
    return(
        <>
            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Productos</h1>
                        </div>
                        
                        <p>Página de productos</p>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Productos;