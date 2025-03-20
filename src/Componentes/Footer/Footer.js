import './Footer.css';

function Footer(){
    return(
        <>
            <a href='/' className='whatsapp-button'>
                <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="icono de whatsapp"/>
            </a>

            <footer>
                <div className='footer block-content'>
                    <div className='block-title-container'>
                        <p className='block-title'>En KAMAS diseñamos tus sueños</p>
                    </div>

                    <nav className='footer-targets'>
                        <div className='footer-target footer-target-1'>
                            <p className='title'>Acerca de KAMAS</p>
                            <ul>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Nosotros</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Razones para comprar</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Propiedad intelectual</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a Lima y Callao</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a provincia</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='footer-target footer-target-2'>
                            <p className='title'>Servicio al cliente</p>
                            <ul>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Nosotros</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Razones para comprar</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Propiedad intelectual</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a Lima y Callao</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a provincia</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='footer-target footer-target-3'>
                            <p className='title'>Acerca de KAMAS</p>
                            <ul>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Nosotros</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Razones para comprar</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Propiedad intelectual</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a Lima y Callao</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/nosotros/'>
                                        <p>Envios a provincia</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='footer-target footer-target-1'>
                            <p className='title'>Suscribete</p>
                            <input type='mail'></input>
                        </div>
                    </nav>
                </div>
            </footer>
        </>
    );
}

export default Footer;
