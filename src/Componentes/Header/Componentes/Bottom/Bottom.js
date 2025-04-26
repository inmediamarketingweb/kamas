import './Bottom.css';

function Bottom(){
    return(
        <div className='header-bottom-container'>
            <section className='header-bottom'>
                <p><a href='/productos/dormitorios/' title='' className='color-white'>¡Por el mes de mamá! Más del 30% 🔥 de descuento en dormitorios 🛌</a></p>
            
                <ul className='d-flex-center-center gap-10'>
                    <li>
                        <a href="/nosotros/">
                            <h2>Acerca de nosotros</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/contacto/">
                            <h2>Contáctanos</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/">
                            <h2>Ventas al por mayor</h2>
                        </a>
                    </li>
                    <li>
                        <p className="color-white">|</p>
                    </li>
                    <li>
                        <a href="/mis-favoritos/">
                            <h2>Mis favoritos</h2>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Bottom;
