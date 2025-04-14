import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import './SoloPorHoras.css';

function SoloPorHoras(){
    const [productos, setProductos] = useState([]);
    const [stockProductos, setStockProductos] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [expired, setExpired] = useState(false);
    const scrollRef = useRef(null);

    const targetDate = new Date('2025-04-14T17:45:00');
    const format = (num) => String(num).padStart(2, '0');

    useEffect(() => {
        // Paso 1: Cargar el manifest que contiene las rutas de los JSON
        fetch('/assets/json/manifest.json')
        .then((res) => res.json())
        .then((manifest) => {
            // El manifest debería tener una propiedad "files" con un array de rutas
            return Promise.all(
                manifest.files.map((fileUrl) =>
                fetch(fileUrl)
                .then((res) => res.json())
                .then((jsonData) => {
                    // Extraer la categoría a partir de la URL.
                    // Ejemplo de fileUrl: "/assets/json/categorias/colchones/sub-categorias/adel.json"
                    const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
                    const categoria = match ? match[1] : null;

                    // Si existe una propiedad "productos", adjunta la categoría a cada producto
                    if (jsonData.productos && Array.isArray(jsonData.productos)){
                        jsonData.productos = jsonData.productos.map((producto) => ({ ...producto, categoria,}));
                    }
                    return jsonData;
                })
                .catch((err) => {
                    console.error(`Error cargando ${fileUrl}:`, err);
                    return { productos: [] };
                })
                )
            );
        })
        .then((jsonFilesData) => {
            // Unifica todos los productos de cada JSON
            const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
                if (jsonData.productos && Array.isArray(jsonData.productos)){
                    return acum.concat(jsonData.productos);
                }
                return acum;
            }, []);

            // Filtra los productos que tengan "solo-por-horas": "si"
            const productosSoloPorHoras = todosProductos.filter(
                (producto) => producto["solo-por-horas"] === "si"
            );
            setProductos(productosSoloPorHoras);
            setStockProductos(
                productosSoloPorHoras.map((prod) => ({ id: prod.id, stock: prod.stock }))
            );
        })
        .catch((error) => console.error('Error cargando el manifest o los JSON:', error));
    }, []);

    // Cuenta regresiva para la promoción
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.max(0, Math.floor((targetDate - now) / 1000));

            if (diff === 0){
                setExpired(true);
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (3600 * 24)),
                hours: Math.floor((diff % (3600 * 24)) / 3600),
                minutes: Math.floor((diff % 3600) / 60),
                seconds: diff % 60,
            });
        }, 1000);

        return () => clearInterval(interval);
    });

    // Manejo de scroll (drag)
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

    const scrollSmooth = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 290;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    const getStockById = (id) => (stockProductos.find((p) => p.id === id) || { stock: 0 }).stock;

    if(expired){
        return(
            <div className="block-container block-container-sale expired">
                <div className="block-content block-content-sale">
                    <h2 className="block-title color-white">¡ La promoción terminó 😢 !</h2>
                </div>
            </div>
        );
    }

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength){ return str; }
        return str.slice(0, maxLength) + '...';
    };

    return(
        <div className="block-container block-container-sale">
            <div className="block-content block-content-sale">
                <div className="block-title-container">
                    <h2 className="block-title">¡ Solo por horas ⏰ !</h2>
                    <div className="sale-time">
                        <div className="sale-time-days">
                            <span>{format(timeLeft.days)}</span>
                            <p>Días</p>
                        </div>
                        <div className="sale-time-hours">
                            <span>{format(timeLeft.hours)}</span>
                            <p>Hor.</p>
                        </div>
                        <div className="sale-time-minutes">
                            <span>{format(timeLeft.minutes)}</span>
                            <p>Min.</p>
                        </div>
                        <div className="sale-time-seconds">
                            <span>{format(timeLeft.seconds)}</span>
                            <p>Seg.</p>
                        </div>
                    </div>
                </div>

                <div className="sale-products-container" ref={scrollRef}>
                    <div className="sale-products-content">
                        <ul className="sale-products">
                            {productos.map((producto) => {
                                const { id, ruta, nombre, fotos, precioRegular, precioNormal, precioVenta, } = producto;
                                const stockActual = getStockById(id);
                                const agotado = stockActual <= 0;
                                const descuento = Math.round( ((precioNormal - precioVenta) * 100) / precioNormal );

                                return(
                                    <li key={uuidv4()}>
                                        <a href={ruta} className={`product-card ${agotado ? 'agotado' : ''}`} title={nombre}>
                                            <div className="product-card-images">
                                                <span className="product-card-discount">-{descuento}%</span>
                                                <img src={`${fotos}1.jpg`} alt={nombre} />
                                            </div>
                                            <div className="product-card-content">
                                                <div className="product-card-stock">
                                                    {agotado ? (
                                                    <span>Agotado 🚚</span>
                                                    ) : (
                                                    <span>¡ Solo quedan <b>{stockActual}</b> 🔥 !</span>
                                                    )}
                                                </div>
                                                <span className="product-card-brand">KAMAS</span>
                                                <h4 className="product-card-name">{truncate(nombre, 52)}</h4>
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

                <div className="d-flex">
                    <div className="block-title-buttons margin-left">
                        <button type="button" onClick={() => scrollSmooth('left')}>
                            <span className="material-icons solo-por-horas-left">chevron_left</span>
                        </button>
                        <button type="button" onClick={() => scrollSmooth('right')}>
                            <span className="material-icons solo-por-horas-right">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SoloPorHoras;
