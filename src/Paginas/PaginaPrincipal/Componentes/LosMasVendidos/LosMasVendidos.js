import './LosMasVendidos.css';

function Slider(){
    return(
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Los más vendidos</h2>
                </div>

                <div className=''>
                    <div className=''>
                        <ul>
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

export default Slider;