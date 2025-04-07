import './SobreNosotros.css';

function SobreNosotros(){
    return(
        <>
            <div className='block-container about-us-block-video-container'>
                <div className='block-content'>
                    <img src="/assets/imagenes/homepage/homepage-video.jpg" alt=""/>

                    <div className='about-us-video-button'>
                        <button type='button' className=''>
                            <span class="material-icons play">play_arrow</span>
                            <span class="material-icons pause">pause</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className='block-container about-us-block-container'>
                <div className='block-content d-grid-auto-1fr'>
                    <img src="/assets/imagenes/homepage/homepage-about-us.jpeg" alt=""/>
                    <div className=''>
                        <p>texto</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SobreNosotros;