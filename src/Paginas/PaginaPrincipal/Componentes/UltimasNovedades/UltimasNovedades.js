import { useEffect, useRef, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';

import './UltimasNovedades.css';

function UltimasNovedades() {
    const [productos, setProductos] = useState([]);
    const scrollRef = useRef(null);

    const autoSlideIntervalRef = useRef(null);
    const autoSlideTimeoutRef = useRef(null);
    const autoDirRef = useRef('left');

    useEffect(() => {
        const categoriasPermitidas = ['camas-box-tarimas', 'dormitorios', 'camas-funcionales', 'cabeceras', 'complementos'];

        fetch('/assets/json/manifest.json').then(res => res.json()).then(
            manifest => Promise.all(
                manifest.files.map(
                    fileUrl => fetch(fileUrl).then(res => res.json()).then(jsonData => {
                        const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
                        const categoria = match ? match[1] : null;

                        if (Array.isArray(jsonData.productos) && categoria){
                            jsonData.productos = jsonData.productos.map(producto => ({
                                ...producto,
                                categoria,
                            }));
                        }
                        return { productos: jsonData.productos || [], categoria };
                    }).catch(err => {
                        console.error(`Error cargando ${fileUrl}:`, err);
                        return { productos: [], categoria: null };
                    })
                )
            )
        ).then(jsonFilesData => {
            const ultimosPorSubcategoria = jsonFilesData.reduce((acum, { productos, categoria }) => {
                if (!categoriasPermitidas.includes(categoria)) return acum;
                if (productos.length > 0) {
                    const ultimo = productos[productos.length - 1];
                    acum.push(ultimo);
                }
                return acum;
            }, []);

            setProductos(ultimosPorSubcategoria);
        }).catch(error => console.error('Error al cargar el manifest o los JSON:', error));
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = e => {
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

        const handleMouseMove = e => {
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

    const scrollSmooth = useCallback(direction => {
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
    }, []);

    const autoScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        if (
            autoDirRef.current === 'right' &&
            container.scrollLeft >= container.scrollWidth - container.clientWidth
        ) {
            autoDirRef.current = 'left';
        } else if (
            autoDirRef.current === 'left' &&
            container.scrollLeft <= 0
        ) {
            autoDirRef.current = 'right';
        }

        scrollSmooth(autoDirRef.current);
    }, [scrollSmooth]);

    const startAutoSlide = useCallback(() => {
        if (autoSlideIntervalRef.current)
            clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = setInterval(() => {
            autoScroll();
        }, 2000);
    }, [autoScroll]);

    const pauseAutoSlide = () => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
        if (autoSlideTimeoutRef.current) {
            clearTimeout(autoSlideTimeoutRef.current);
        }
        autoSlideTimeoutRef.current = setTimeout(() => {
            startAutoSlide();
        }, 4000);
    };

    const handleLeftButtonClick = () => {
        autoDirRef.current = 'left';
        scrollSmooth('left');
        pauseAutoSlide();
    };

    const handleRightButtonClick = () => {
        autoDirRef.current = 'right';
        scrollSmooth('right');
        pauseAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (autoSlideIntervalRef.current)
                clearInterval(autoSlideIntervalRef.current);
            if (autoSlideTimeoutRef.current)
                clearTimeout(autoSlideTimeoutRef.current);
        };
    }, [startAutoSlide]);

    const truncate = (str, maxLength) => {
        if (!str) return '';
        return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
    };

    return(
        <div className="block-container ultimas-novedades-block-container">
            <section className="block-content ultimas-novedades-block-content">
                <div className="block-title-container">
                    <h2 className="block-title">Últimas novedades</h2>
                </div>

                <div className="ultimas-novedades-container" ref={scrollRef}>
                    <ul className="ultimas-novedades-content">
                        {productos.map(producto => {
                            return(
                                <Producto key={uuidv4()} producto={producto} truncate={truncate}/>
                            );
                        })}
                    </ul>
                </div>

                <button type="button" onClick={handleLeftButtonClick} className="ultimas-novedades-button ultimas-novedades-button-1 ultimas-novedades-left">
                    <span className="material-icons">chevron_left</span>
                </button>

                <button type="button" onClick={handleRightButtonClick} className="ultimas-novedades-button ultimas-novedades-button-2 ultimas-novedades-right">
                    <span className="material-icons">chevron_right</span>
                </button>
            </section>
        </div>
    );
}

export default UltimasNovedades;
