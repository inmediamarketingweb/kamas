import { useEffect, useState } from 'react';

import './SoloPorHoras.css';

function SoloPorHoras(){
    const [productos, setProductos] = useState([]);
    const [timeLeft, setTimeLeft] = useState({
        hours: 48,
        minutes: 23,
        seconds: 45,
    });

    useEffect(() => {
        fetch('/assets/json/categorias/solo-por-horas.json')
            .then((res) => res.json())
            .then((data) => {
                setProductos(data.productos);
            })
            .catch((error) => {
                console.error('Error al cargar los productos de "Solo por horas":', error);
            });
    }, []);

    useEffect(() => {
        let endTime = localStorage.getItem('soloPorHoras-endTime');

        if (!endTime) {
            const now = new Date();
            // Setea una duración de 5h 48m 08s desde el momento actual
            const future = new Date(now.getTime() + (48 * 60 * 60 + 23 * 60 + 45) * 1000);
            localStorage.setItem('soloPorHoras-endTime', future.toISOString());
            endTime = future.toISOString();
        }

        const interval = setInterval(() => {
            const now = new Date();
            const end = new Date(endTime);
            const diff = Math.max(0, Math.floor((end - now) / 1000));

            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            setTimeLeft({ hours, minutes, seconds });

            if (diff === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = (num) => String(num).padStart(2, '0');

    return(
        <div className='block-container block-container-sale'>
            <div className='block-content block-content-sale'>
                <div className='block-title-container'>
                    <h2 className='block-title'>¡ Solo por horas !</h2>

                    <div className='sale-time'>
                        <div className='sale-time-hours'>
                            <span>{format(timeLeft.hours)}</span>
                            <p>Hor.</p>
                        </div>
                        <div className='sale-time-minutes'>
                            <span>{format(timeLeft.minutes)}</span>
                            <p>Min.</p>
                        </div>
                        <div className='sale-time-seconds'>
                            <span>{format(timeLeft.seconds)}</span>
                            <p>Seg.</p>
                        </div>
                    </div>
                </div>

                <div className='sale-products-container'>
                    <div className='sale-products-content'>
                        <ul className='sale-products'>
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
                                                <span className="product-card-regular-price">S/ {producto.precioRegular}</span>
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

                <div className='d-flex'>
                    <div className='block-title-buttons'>
                        <button type='button' className=''>
                            <span class="material-icons">chevron_left</span>
                        </button>
                        <button type='button' className=''>
                            <span class="material-icons">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SoloPorHoras;
