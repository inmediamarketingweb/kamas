import './Bottom.css';

function Bottom(){
    return(
        <div className='header-bottom-container'>
            <section className='header-bottom'>
                <p><a href='/productos/dormitorios/' title='Haz que mamá descanse como una reina 👑 ¡Hasta 40% de descuento solo este mes!' className='color-white'>Haz que mamá descanse como una reina 👑 ¡Hasta 40% de descuento solo este mes!</a></p>
            
                <ul className='d-flex-center-center gap-10'>
                    <li>
                        <a href="/nosotros/" title='Acerca de nosotros | Kamas'>
                            <h2>Acerca de nosotros</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/contacto/" title='Contacto | Kamas'>
                            <h2>Contáctanos</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/proyectos-y-alianzas/" title='Proyectos y alianzas | Kamas'>
                            <h2>Proyectos y alianzas</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/mis-favoritos/" title='Mis favoritos | Kamas'>
                            <h2>Mis favoritos</h2>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Bottom;
