import './LibroDeReclamaciones';

import Header from '../../../Componentes/Header/Header';
import Footer from '../../../Componentes/Footer/Footer';

function LibroDeReclamaciones(){
    return(
        <>
            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Libro de reclamaciones</h1>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default LibroDeReclamaciones;
