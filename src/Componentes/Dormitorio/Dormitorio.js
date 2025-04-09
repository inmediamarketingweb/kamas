import './Dormitorio.css';

function Dormitorio(){
    return(
        <div className='block-container dormitorio-block-container'>
            <div className='block-content'>
                {/* <img src="/assets/imagenes/componentes/dormitorio/fondo.jpg" alt="" className='fondo'/> */}

                <div className='dormitorio-container'>
                    <div className='dormitorio-content'>
                        <div className='dormitorio-cabecera-container'>
                            <div className='dormitorio-cabecera'>
                                <img src="/assets/imagenes/componentes/dormitorio/cabecera.png" alt="" className=''></img>
                            </div>
                        </div>

                        <div className='dormitorio-cama-box-container'>
                            <div className='dormitorio-cama-box'>
                                <img src="/assets/imagenes/componentes/dormitorio/cama-box-tarima.png" alt="" className=''></img>
                            </div>
                        </div>

                        <div className='dormitorio-colchon-container'>
                            <div className='dormitorio-colchon'>
                                <img src="/assets/imagenes/componentes/dormitorio/colchon-sarki.png" alt="" className=''></img>
                            </div>
                        </div>

                        <div className='dormitorio-velador-container'>
                            <div className='dormitorio-velador'>
                                <img src="/assets/imagenes/componentes/dormitorio/velador.png" alt="" className=''></img>
                            </div>
                        </div>

                        <div className='dormitorio-puff-container'>
                            <div className='dormitorio-puff'>
                                <img src="/assets/imagenes/componentes/dormitorio/puff-circular.png" alt="" className=''></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dormitorio;
