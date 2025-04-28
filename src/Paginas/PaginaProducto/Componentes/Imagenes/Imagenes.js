import React, { useState } from 'react';

import './Imagenes.css';

function Imagenes({ imagenes, producto }){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const navigateTo = (newIndex) => {
        if (newIndex >= 0 && newIndex < imagenes.length) {
            setCurrentIndex(newIndex);
        }
    };

    const handleNext = () => navigateTo((currentIndex + 1) % imagenes.length);
    const handlePrev = () => navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);

    const handleMouseDown = (e) => {
        setDragStartX(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setIsDragging(false);

        if (Math.abs(deltaX) > 50) {
            deltaX > 0 ? handlePrev() : handleNext();
        }
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 30) {
            deltaX > 0 ? handlePrev() : handleNext();
        }
    };

    const descuento = Math.round( ((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal );

    return(
        <div className='product-page-target'>
            <span className="product-page-discount">-{descuento}%</span>

            <div className='product-page-images-container'>
                <div className='product-page-images-content' style={{ cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
                    <ul className='product-page-images' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {imagenes.map((img, i) => (
                            <li key={i}>
                                <img src={img} alt={`Product view ${i + 1}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className='product-page-images-button product-page-images-button-1' onClick={handlePrev}>
                <span className='material-icons'>chevron_left</span>
            </button>

            <button className='product-page-images-button product-page-images-button-2' onClick={handleNext}>
                <span className='material-icons'>chevron_right</span>
            </button>

            <div className='product-page-images-miniatures-container'>
                <ul className='product-page-images-miniatures'>
                    {imagenes.map((img, i) => (
                        <li key={i} className={i === currentIndex ? 'active' : ''} onClick={() => navigateTo(i)}>
                            <img src={img} alt={`Thumbnail ${i + 1}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Imagenes;