import './Dormitorio.css';

function Dormitorio(){
    return(
        <div className='block-container dormitorio-block-container'>
            <div className='block-content dormitorio-block-content'>
                <img src="/assets/imagenes/componentes/dormitorio/fondo.jpg" alt="" className='fondo'/>

                <img src="/assets/imagenes/componentes/dormitorio/dormitorio.png" alt="" className='dormitorio'/>
                <div className='dormitorio-button-container'>
                    <button className='dormitorio-button'>+</button>
                    <a href='/' className=''>
                        <img src="/assets/imagenes/componentes/dormitorio/dormitorio.png" alt=""/>
                        <span>KAMAS</span>
                        <p>DORMITORIO KAMAS KING SARKI</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dormitorio;
