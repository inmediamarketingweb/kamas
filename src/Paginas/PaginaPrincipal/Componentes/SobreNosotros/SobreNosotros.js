import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <div className='block-container block-container-homepage-about-us'>
            <section className='block-content gap-20'>
                <iframe src="https://www.youtube.com/embed/RFriIgxzw5k?si=q6JLawi7221KlpjR" title="Kamas | YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                <div className='d-flex-column gap-10'>
                    <p className='title'>KAMAS</p>
                    <p className='title'>Diseñamos tus sueños</p>
                </div>
            </section>
        </div>
    );
}

export default SobreNosotros;