import './Footer.css';

function Footer(){
    return(
        <>
            <a href='/' className='whatsapp-button'>
                <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="icono de whatsapp"/>
            </a>

            <footer className='w-100 d-flex-column gap-20'>
                <div className='footer-block-container'>
                    <section className='footer-block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>En KAMAS diseñamos tus sueños</p>
                        </div>

                        <nav className='footer-targets'>
                            <div className='footer-target footer-target-1'>
                                <p className='title'>Acerca de KAMAS</p>
                                <p className='text color-white'>Más información sobre la empresa, un breve resumen del rubro, historia o mensaje promocional y redes sociales.</p>
                                
                                <div className='d-flex-column gap-10'>
                                    <p className='title color-white'>Suscribete</p>

                                    <div className='form-suscribe-container'>
                                        <form className='form-suscribe'>
                                            <input type='mail' placeholder='Suscribete con tu correo electrónico'></input>
                                            <button type='submit' className='button-link button-link-2'>
                                                <p className='button-link-text'>Enviar</p>
                                                <span className="material-icons">outgoing_mail</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='footer-target footer-target-4'>
                                <p className='title'>Nosotros</p>

                                <ul className='footer-list'>
                                    <li>
                                        <a href='/nosotros/' title='Nosotros | Kamas'>
                                            <p>Nosotros</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/nosotros/razones-para-comprar/' title='Razones para comprar | Kamas'>
                                            <p>Razones para comprar</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/nosotros/propiedad-intelectual/' title='Propiedad intelectual | Kamas'>
                                            <p>Propiedad intelectual</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/envios/envios-a-lima-y-callao/' title='Envios a Lima y Callao | Kamas'>
                                            <p>Envios a Lima y Callao</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/envios/envios-a-provincia/' title='Envios a provincia | Kamas'>
                                            <p>Envios a provincia</p>
                                        </a>
                                    </li>
                                </ul>

                                <a className='complaints-book' href='/contacto/libro-de-reclamaciones/' title="Libro de reclamaciones | Kamas">
                                    <span className="material-icons">menu_book</span>
                                    <p className='text'>Libro de reclamaciones</p>
                                </a>
                            </div>
                            <div className='footer-target footer-target-2'>
                                <p className='title'>Servicio al cliente</p>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='/servicio-al-cliente/costos-de-envio-por-zona/' title='Costos de envio por zona | Kamas'>
                                            <p>Costos de envío por zona</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/medios-de-pago/' title='Medios de pago | Kamas'>
                                            <p>Medios de pago</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/garantia-de-productos/' title=''>
                                            <p>Garantía de productos</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/recomendaciones-de-uso/' title=''>
                                            <p>Recomendaciones de uso</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/politica-de-cambios-y-devoluciones/' title=''>
                                            <p>Política de cambios y devoluciones</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/privacidad-y-seguridad/' title=''>
                                            <p>Privacidad y seguridad</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/terminos-y-condiciones/' title=''>
                                            <p>Términos y condiciones</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/horarios-de-entrega-y-envios/' title=''>
                                            <p>Horarios de entrega y envíos</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/manual-de-instalacion/' title=''>
                                            <p>Manual de instalación</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='footer-target footer-target-3'>
                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Novedades</p>
                                    <ul className='footer-list'>
                                        <li>
                                            <a href='/novedades/programa-de-influencers/' title='Programa de influencers | Kamas'>
                                                <p>Programa influencers</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/novedades/programa-de-referencias/' title='Progama de referencias | Kamas'>
                                                <p>Programa de referencias</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://blog.kamas.pe' title='Blog | Kamas'>
                                                <p>Blog</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Siguenos:</p>
                                    
                                    <ul className='d-flex-center-left gap-5 social-networks'>
                                        <li>
                                            <a href='https://www.facebook.com/KAMAS.pe?locale=es_LA' title='Facebook | Kamas'>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.png" alt="Visita nuestro perfil en Facebook" title="Facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://www.instagram.com/kamas.pe/' title='Instagram | Kamas'>
                                                <img src="/assets/imagenes/iconos/instagram-blanco.png" alt="Visita nuestro perfil en Instagram" title="instagram"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://www.tiktok.com/@kamas.pe' title='Tik Tok | Kamas'>
                                                <img src="/assets/imagenes/iconos/tiktok-blanco.png" alt="Visita nuestro perfil en TikTok" title="Tik Tok"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </section>
                </div>

                <div className='footer-bottom-container'>
                    <section className='footer-bottom'>
                        <ul className='d-flex-center-center gap-10'>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/visa.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/mastercard.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/bcp.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/interbank.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/bbva.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/scotiabank.svg" alt="" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/banco-de-la-nacion.svg" alt="" />
                            </li>
                        </ul>

                        <p className='text color-white'>&copy; Todos los derechos reservados para <a href='https://kamas.pe' title='' className='color-white'>kamas.pe</a></p>
                    </section>
                </div>
            </footer>
        </>
    );
}

export default Footer;
