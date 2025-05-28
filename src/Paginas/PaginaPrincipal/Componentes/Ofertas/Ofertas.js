import { useCallback, useRef, useEffect } from 'react';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

import './Ofertas.css';

function Ofertas(){
    const scrollRef = useRef(null);
    const autoSlideIntervalRef = useRef(null);
    const autoSlideTimeoutRef = useRef(null);
    const autoDirRef = useRef("right");

    const scrollSmooth = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = 290;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    const autoScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;
        if (
            autoDirRef.current === "right" &&
            container.scrollLeft >= container.scrollWidth - container.clientWidth
        ) {
            autoDirRef.current = "left";
        } else if (autoDirRef.current === "left" && container.scrollLeft <= 0) {
            autoDirRef.current = "right";
        }
        scrollSmooth(autoDirRef.current);
    }, []);

    const startAutoSlide = useCallback(() => {
        if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = setInterval(() => {
            autoScroll();
        }, 2000);
    }, [autoScroll]);

    const pauseAutoSlide = () => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
        if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
        autoSlideTimeoutRef.current = setTimeout(() => {
            startAutoSlide();
        }, 2000);
    };

    const handleLeftButtonClick = () => {
        autoDirRef.current = "left";
        scrollSmooth("left");
        pauseAutoSlide();
    };

    const handleRightButtonClick = () => {
        autoDirRef.current = "right";
        scrollSmooth("right");
        pauseAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
            if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
        };
    }, [startAutoSlide]);

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

    return (
        <div className='block-container'>
            <section className='block-content homepage-ofertas-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Ofertas</h2>
                </div>

                <div className='homepage-offers-container' ref={scrollRef}>
                    <ul className='homepage-offers-content'>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <li key={n}>
                                <a href='/productos/dormitorios/?tama%C3%B1o=king&modelo-de-colchón=sarki' title='Ver ofertas'>
                                    <LazyImage width={280} height={400} src={`/assets/imagenes/paginas/pagina-principal/ofertas/${n}.webp`} alt="Ofertas | Kamas"/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type='button' onClick={handleLeftButtonClick} className='homepage-ofertas-button homepage-ofertas-button-1'>
                    <span className="material-icons">chevron_left</span>
                </button>

                <button type='button' onClick={handleRightButtonClick} className='homepage-ofertas-button homepage-ofertas-button-2'>
                    <span className="material-icons">chevron_right</span>
                </button>
            </section>
        </div>
    );
}

export default Ofertas;
