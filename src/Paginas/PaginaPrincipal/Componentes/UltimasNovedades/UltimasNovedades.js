import { useEffect, useState } from 'react';

import './UltimasNovedades.css';

function UltimasNovedades() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/assets/json/categorias/los-mas-vendidos.json')
            .then((res) => res.json())
            .then((data) => {
                setProductos(data.productos);
            })
            .catch((error) => {
                console.error('Error al cargar los productos más vendidos:', error);
            });
    }, []);

    return (
        <div className='block-container ultimas-novedades-block-container'>
            <div className='block-content ultimas-novedades-block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Últimas novedades</h2>

                    <div className='block-title-buttons'>
                        <button type='button' className=''>
                            <span class="material-icons">chevron_left</span>
                        </button>
                        <button type='button' className=''>
                            <span class="material-icons">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className='ultimas-novedades-container'>
                        <ul className="ultimas-novedades-content">
                        {productos.map((producto) => (
                            <li key={producto.id}>
                                <a href={producto.ruta} className='product-card' title={producto.nombre}>
                                    <div className='product-card-images'>
                                        <img src={`${producto.fotos}1.jpg`} alt={producto.nombre} />
                                    </div>

                                    <div className="product-card-content">
                                        <span className="product-card-brand">KAMAS</span>
                                        <h4 className="product-card-name">{producto.nombre}</h4>
                                        <div className="product-card-prices">
                                            <span className="product-card-normal-price">S/ {producto.precioNormal}</span>
                                            <span className="product-card-sale-price">S/ {producto.precioVenta}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UltimasNovedades;
