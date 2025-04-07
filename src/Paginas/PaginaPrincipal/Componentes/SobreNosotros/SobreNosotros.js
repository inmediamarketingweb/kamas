import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <div className='block-container block-container-homepage-about-us'>
            <section className='block-content d-grid-2-1fr gap-20'>
                <img src="/assets/imagenes/homepage/homepage-video.jpg" alt="" />

                <div className='d-flex-column gap-10'>
                    <p className='title'>KAMAS</p>
                    <p className='title'>Diseñamos tus sueños</p>
                </div>
            </section>
        </div>
    );
}

export default SobreNosotros;