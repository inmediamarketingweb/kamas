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
                                    <img src="/assets/imagenes/componentes/distribuidores/vitai.jpg" alt="Vitai | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://homesleep.pe' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/homesleep.jpg" alt="Homesleep | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://dormihogar.pe' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/dormihogar.jpg" alt="Dormihogar | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.falabella.com.pe/falabella-pe/seller/Kamas' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/falabella.jpg" alt="Falabella | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/ireos.jpg" alt="Ireos | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/oasis.jpg" alt="Oasis | Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://simple.ripley.com.pe/tienda/kamas-6051854?srsltid=AfmBOooCtt98wRy05Brl6k494KihBJYbCZ4SmN9Cu3L9_lm4Z7Ms-sA1' title="" className=''>
                                    <img src="/assets/imagenes/componentes/distribuidores/ripley.png" alt="Ripley | Kamas"/>
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
