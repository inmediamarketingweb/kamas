import './Benefits.css';

function Benefits(){
    return(
        <div className='block-container block-container-benefits'>
            <section className='block-content'>
                <ul className='benefits'>
                    <li>
                        <img src="/assets/imagenes/iconos/camion-gris.svg" alt=""/>
                        <p>Envios rápidos y seguros</p>
                    </li>
                    <li>
                        <img src="/assets/imagenes/iconos/candado-gris.svg" alt=""/>
                        <p>Compra fácil y segura</p>
                    </li>
                    <li>
                        <img src="/assets/imagenes/iconos/garantia-gris.svg" alt=""/>
                        <p>Garantía de hasta 10 años</p>
                    </li>
                    <li>
                        <img src="/assets/imagenes/iconos/atencion-gris.svg" alt=""/>
                        <p>Atención personalizada</p>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default Benefits;
