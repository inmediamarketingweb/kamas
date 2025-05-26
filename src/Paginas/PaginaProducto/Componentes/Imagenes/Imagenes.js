import { useState } from 'react';

import Colores from '../Colores/Colores';

import './Imagenes.css';

function Imagenes({ imagenes, producto, onSelectColor }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const [zoomActive, setZoomActive] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    const navigateTo = (idx) => {
        if (idx >= 0 && idx < imagenes.length) setCurrentIndex(idx);
    };
    const handlePrev = () => navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);
    const handleNext = () => navigateTo((currentIndex + 1) % imagenes.length);

    const handleMouseDown = (e) => { setDragStartX(e.clientX); setIsDragging(true); };
    const handleMouseUp = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setIsDragging(false);
        Math.abs(deltaX) > 50 && (deltaX > 0 ? handlePrev() : handleNext());
    };

    const handleMouseEnter = () => setZoomActive(true);
    const handleMouseLeave = () => setZoomActive(false);
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

    return(
        <div className={`position-relative ${producto.stock === 0 ? 'sin-stock' : ''}`}>
            <span className="product-page-discount">-{descuento}%</span>

            <div className='sin-stock-message'>Agotado</div>

            <div className="product-page-images-container">
                <div className="product-page-images-content" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={(e) => { handleMouseUp(e) }}>
                    <ul className="product-page-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {imagenes.map((src, i) => (
                            <li key={i}>
                                <div className="zoom-wrapper" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
                                    <img loading='lazy' src={src} alt={`Vista ${i + 1}`} />
                                    {zoomActive && i === currentIndex && (
                                        <div className="zoom-lens" style={{ backgroundImage: `url(${src})`, backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`}}/>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="product-page-images-button product-page-images-button-1" onClick={handlePrev}>
                    <span className="material-icons">chevron_left</span>
                </button>

                <button className="product-page-images-button product-page-images-button-2" onClick={handleNext}>
                    <span className="material-icons">chevron_right</span>
                </button>
            </div>

            <div className="product-page-images-miniatures-container">
                <ul className="product-page-images-miniatures">
                    {imagenes.map((img, i) => (
                        <li key={i} className={i === currentIndex ? 'active' : ''} onClick={() => navigateTo(i)}>
                            <img src={img} alt={`Miniatura ${i + 1}`} />
                        </li>
                    ))}
                </ul>
            </div>

            {producto.colores && <Colores producto={producto} onSelectColor={onSelectColor} />}
        </div>
    );
}

export default Imagenes;
