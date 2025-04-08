import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <div className='block-container block-container-homepage-about-us'>
            <section className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>KAMAS</h2>
                </div>

                <div className='d-grid-2-1fr gap-20'>
                    <iframe src="https://www.youtube.com/embed/RFriIgxzw5k?si=q6JLawi7221KlpjR" title="Kamas | YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    <div className='d-flex-column gap-5'>
                        <p className='title'>KAMAS</p>
                        <p className='title'>Diseñamos tus sueños</p>
                        <p className='text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

                        <a href='/nosotros/' className='button-link button-link-1 margin-left'>
                            <p className='button-link-text'>Más sobre nosotros</p>
                            <span className="material-icons">arrow_forward</span>
                        </a>
                    </div>
                </div>

                <ul className='homepage-about-us-images'>
                    <li>
                        <img src="/assets/imagenes/homepage/about-us/1.jpg" alt=""/>
                    </li>
                    <li>
                        <img src="/assets/imagenes/homepage/about-us/2.jpg" alt=""/>
                    </li>
                    <li>
                        <img src="/assets/imagenes/homepage/about-us/3.jpg" alt=""/>
                    </li>
                    <li>
                        <img src="/assets/imagenes/homepage/about-us/4.jpg" alt=""/>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default SobreNosotros;