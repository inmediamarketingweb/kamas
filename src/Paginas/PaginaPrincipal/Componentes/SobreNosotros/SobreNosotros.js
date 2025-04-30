import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <div className='block-container block-container-homepage-about-us'>
            <section className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Kamas fabricantes de dormitorios</h2>
                </div>

                <div className='d-grid-2-1fr gap-10'>
                    <iframe src="https://www.youtube.com/embed/RFriIgxzw5k?si=q6JLawi7221KlpjR" title="Kamas | YouTube" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    <div className='d-flex-column gap-5'>
                        <p className='title'>Somos Kamas</p>
                        <p className='title'>¡ Diseñamos tus sueños !</p>
                        <p className='text'>En KAMAS llevamos más de 15 años en el mercado peruano fabricando e innovando productos de descanso de primera calidad. Creamos experiencias que inician desde el primer contacto y culminan con la satisfacción de recibir tu dormitorio completo, personalizado y en tiempo récord.</p>
                        <p className='text'>Somos fabricantes peruanos con pasión por el detalle, el diseño, la rapidez y la calidad. Siempre a la vanguardia, nos caracterizamos por ser pioneros en la creación de nuevos modelos que marcan tendencia.</p>
                        <p className='text'>Contamos con más de 380 modelos, más de 48 colores disponibles, y una capacidad de respuesta que nos distingue en el mercado: fabricamos y entregamos en menos de 24 horas en Lima y Callao.</p>
                        <p className='text'>Para envíos a provincias, embalamos con extremo cuidado y seguridad, asegurando que tu producto llegue impecable a cualquier parte del país.</p>
                        <p className='text'>Hoy, miles de familias peruanas ya disfrutan de nuestros dormitorios, cabeceras, colchones y sofás. En KAMAS, personalizamos, fabricamos y entregamos rápido, sin perder lo más importante: la calidad.</p>
                        <p className='text'>🎥 Dale play al video y conoce cómo trabajamos.</p>
                        <p className='text'>🚚 Descubre por qué KAMAS está revolucionando la forma de dormir en el Perú.</p>

                        <a href='/nosotros/' className='button-link button-link-1 margin-left'>
                            <p className='button-link-text'>Más sobre nosotros</p>
                            <span className="material-icons">arrow_forward</span>
                        </a>
                    </div>
                </div>

                <div className='homepage-about-us-images-container w-100'>
                    <ul className='homepage-about-us-images'>
                        <li>
                            <img src="/assets/imagenes/paginas/nosotros/1.jpg" alt="Imagenes de Kamas"/>
                        </li>
                        <li>
                            <img src="/assets/imagenes/paginas/nosotros/2.jpg" alt="Imagenes de Kamas"/>
                        </li>
                        <li>
                            <img src="/assets/imagenes/paginas/nosotros/3.jpg" alt="Imagenes de Kamas"/>
                        </li>
                        <li>
                            <img src="/assets/imagenes/paginas/nosotros/4.jpg" alt="Imagenes de Kamas"/>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default SobreNosotros;