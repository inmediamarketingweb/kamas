import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaPrincipal.css';

function PaginaPrincipal(){
    return(
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
            </Helmet>

            <Header/>

            <main>
                <p>Página principal</p>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
