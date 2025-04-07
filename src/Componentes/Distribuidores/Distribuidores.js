import './Distribuidores.css';

function Distribuidores(){
    return(
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Distribuidores autorizados</h2>
                </div>

                <div className='distribuidores-container'>
                    <div className='distribuidores-content'>
                        <ul className='distribuidores'>
                            <li>
                                <a href='https://vitai.pe' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/vitai.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='https://homesleep.pe' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/homesleep.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='https://dormihogar.pe' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/dormihogar.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.falabella.com.pe/falabella-pe/seller/Kamas' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/falabella.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/ireos.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/oasis.jpg" alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/baroma.jpg" alt=""/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Distribuidores;
