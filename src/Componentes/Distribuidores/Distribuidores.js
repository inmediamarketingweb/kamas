import './Distribuidores.css';

function Distribuidores(){
    return(
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title text-center w-100'>Distribuidores autorizados</h2>
                </div>

                <div className='distribuidores-container'>
                    <div className='distribuidores-content'>
                        <ul className='distribuidores'>
                            <li>
                                <a href='https://vitai.pe' title="Vitai | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="https://vitai.pe/img/logo-1707251334.jpg" alt="Vitai distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://dormihogar.pe' title="Dormihogar | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="https://www.dormihogar.pe/assets/imagenes/SEO/logo-principal.jpg" alt="Dormihogar distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://homesleep.pe' title="Homesleep | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="https://homesleep.pe/assets/imagenes/SEO/logo-principal.jpg" alt="Homesleep distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.falabella.com.pe/falabella-pe/seller/Kamas' title="Falabella | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="https://images.falabella.com/v3/assets/bltf4ed0b9a176c126e/blt4e807fded7f65ec5/65e8532d01f38e23f712bf3f/falabella.com_green_icon.svg" alt="Falabella distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="Ireos | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/ireos.webp" alt="Ireos distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='/' title="Oasis | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/oasis.webp" alt="Oasis distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://simple.ripley.com.pe/tienda/kamas-6051854?srsltid=AfmBOooCtt98wRy05Brl6k494KihBJYbCZ4SmN9Cu3L9_lm4Z7Ms-sA1' title="Ripley | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logo_Ripley.svg" alt="Ripley distribuidor autorizado de Kamas"/>
                                </a>
                            </li>
                            <li>
                                <a href='https://listado.mercadolibre.com.pe/hogar-muebles-jardin/nuevo/_BRAND_56945354' title="Mercado libre | Kamas" target="_blank" rel='noopener noreferrer'>
                                    <img width={150} height={50} src="/assets/imagenes/componentes/distribuidores/mercado-libre.svg" alt="Mercado libre distribuidor autorizado de Kamas"/>
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
