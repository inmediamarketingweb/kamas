import './Ofertas.css';

function Ofertas(){
    return(
        <div className='block-container'>
            <section className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Ofertas</h2>
                </div>

                <div className='homepage-offers-container'>
                    <ul className='homepage-offers-content'>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/1.jpg" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/2.jpg" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/3.jpg" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/4.jpg" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/5.jpg" alt="" />
                            </a>
                        </li>
                        <li>
                            <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo=sarki'>
                                <img src="/assets/imagenes/paginas/pagina-principal/ofertas/6.jpg" alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Ofertas;