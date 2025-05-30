import './Distribuidores.css';

function Distribuidores(){
    return(
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Distribuidores</h2>
                </div>

                <div className='distribuidores-container'>
                    <div className='distribuidores-content'>
                        <ul className='distribuidores'>
                            <li>
                                <a href='https://vitai.pe' title="Vitai | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/vitai.webp" alt="Vitai distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://homesleep.pe' title="Homesleep | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/homesleep.webp" alt="Homesleep distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://dormihogar.pe' title="Dormihogar | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/dormihogar.webp" alt="Dormihogar distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.falabella.com.pe/falabella-pe/seller/Kamas' title="Falabella | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/falabella.webp" alt="Falabella distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="Ireos | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/ireos.webp" alt="Ireos distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="Oasis | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/oasis.webp" alt="Oasis distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://simple.ripley.com.pe/tienda/kamas-6051854?srsltid=AfmBOooCtt98wRy05Brl6k494KihBJYbCZ4SmN9Cu3L9_lm4Z7Ms-sA1' title="Ripley | Kamas">
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/ripley.webp" alt="Ripley distribuidor autorizado de Kamas"/>
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
