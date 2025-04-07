import './SoloPorHoras.css';

function SoloPorHoras(){
    return(
        <div className='block-container block-container-sale'>
            <div className='block-content block-content-sale'>
                <div className='block-title-container'>
                    <h2 className='block-title'>¡ Solo por horas !</h2>

                    <div className='sale-time'>
                        <div className='sale-time-hours'>
                            <span>05</span>
                            <p>Hor.</p>
                        </div>
                        <div className='sale-time-minutes'>
                            <span>48</span>
                            <p>Min.</p>
                        </div>
                        <div className='sale-time-seconds'>
                            <span>08</span>
                            <p>Seg.</p>
                        </div>
                    </div>
                </div>

                <div className='sale-products-container'>
                    <div className='sale-products-content'>
                        <ul className='sale-products'>
                            <li>
                                <a href='/' className='product-card' title=''>
                                    <div className='product-card-images'>
                                        <span className="product-card-discount">-35%</span>
                                        <img src="/assets/imagenes/productos/dormitorios/1.jpg" alt=""></img>
                                    </div>

                                    <div className="product-card-content">
                                        <span className="product-card-brand">KAMAS</span>
                                        <h4 className="product-card-name">DORMITORIO KAMAS KING SARKI + CABECERA AÉREA CAPITONEADA - COBALTO</h4>
                                        <div className="product-card-prices">
                                            <span className="product-card-regular-price">S/.1899</span>
                                            <span className="product-card-normal-price">S/.1899</span>
                                            <span className="product-card-sale-price">S/.1499</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SoloPorHoras;