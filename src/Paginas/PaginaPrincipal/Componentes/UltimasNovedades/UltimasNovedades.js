import { useEffect, useRef, useState } from 'react';

import './UltimasNovedades.css';

function UltimasNovedades() {
    const [productos, setProductos] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch('/assets/json/categorias/ultimas-novedades.json')
            .then((res) => res.json())
            .then((data) => setProductos(data.productos))
            .catch((error) => console.error('Error al cargar los productos más vendidos:', error));
    }, []);

    // 🖱️ Drag con el mouse
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            container.classList.add('dragging');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            container.classList.remove('dragging');
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove('dragging');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // ▶️ Scroll con botones
    const scrollSmooth = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const distance = 290;
        const duration = 300;
        const intervalTime = 1000 / 60;

        const totalSteps = duration / intervalTime;
        const scrollStep = (distance / totalSteps) * (direction === 'right' ? 1 : -1);
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= totalSteps) {
                clearInterval(interval);
                return;
            }

            container.scrollLeft += scrollStep;
            currentStep++;
        }, intervalTime);
    };

    return (
        <div className='block-container ultimas-novedades-block-container'>
            <div className='block-content ultimas-novedades-block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Últimas novedades</h2>
                    <div className='block-title-buttons'>
                        <button type='button' onClick={() => scrollSmooth('left')} className='ultimas-novedades-left'>
                            <span className="material-icons">chevron_left</span>
                        </button>
                        <button type='button' onClick={() => scrollSmooth('right')} className='ultimas-novedades-right'>
                            <span className="material-icons">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className='ultimas-novedades-container' ref={scrollRef}>
                    <ul className="ultimas-novedades-content">
                        {productos.map((producto) => {
                            const{
                                id, ruta, nombre, fotos,
                                precioRegular, precioNormal, precioVenta
                            } = producto;

                            const descuento = Math.round(((precioNormal - precioVenta) * 100) / precioNormal);

                            return(
                                <li key={id}>
                                    <a href={ruta} className='product-card' title={nombre}>
                                        <div className='product-card-images'>
                                            <span className="product-card-discount">-{descuento}%</span>
                                            <img src={`${fotos}1.jpg`} alt={nombre} />
                                        </div>
                                        <div className="product-card-content">
                                            <span className="product-card-brand">KAMAS</span>
                                            <h4 className="product-card-name">{nombre}</h4>
                                            <div className="product-card-prices">
                                                <span className="product-card-regular-price">S/.{precioRegular}</span>
                                                <span className="product-card-normal-price">S/.{precioNormal}</span>
                                                <span className="product-card-sale-price">S/.{precioVenta}</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UltimasNovedades;
