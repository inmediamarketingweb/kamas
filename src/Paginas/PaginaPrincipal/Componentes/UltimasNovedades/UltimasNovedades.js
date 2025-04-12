import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

import './UltimasNovedades.css';

function UltimasNovedades(){
    const [productos, setProductos] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Paso 1: Cargar el manifest que contiene las rutas a los JSON (ubicados en public)
        fetch('/assets/json/manifest.json')
        .then((res) => res.json())
        .then((manifest) => {
        // Se realizan fetch a cada uno de los archivos listados en el manifest
        return Promise.all(
            manifest.files.map((fileUrl) =>
            fetch(fileUrl)
            .then((res) => res.json())
            .then((jsonData) => {
            // Extraemos la categoría a partir de la URL, por si queremos agregarla al producto
            // Ejemplo de fileUrl: "/assets/json/categorias/colchones/sub-categorias/adel.json"
            const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
            const categoria = match ? match[1] : null;

            if (jsonData.productos && Array.isArray(jsonData.productos)){
                jsonData.productos = jsonData.productos.map((producto) => ({
                    ...producto,
                    categoria, // Se adjunta la categoría extraída (opcional)
                }));
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
            // Se unifican todos los productos de cada JSON
            const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
                if (jsonData.productos && Array.isArray(jsonData.productos)) {
                    return acum.concat(jsonData.productos);
                }
                return acum;
            }, []);

            // Se filtran aquellos productos que tengan "novedades": "si"
            const productosNovedades = todosProductos.filter(
                (producto) =>
                producto.novedades &&
                producto.novedades.toLowerCase() === "si"
            );

            setProductos(productosNovedades);
        })
        .catch((error) =>
            console.error("Error al cargar el manifest o los JSON:", error)
        );
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
            container.classList.add("dragging");
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            container.classList.remove("dragging");
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove("dragging");
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
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
        const scrollStep =
        (distance / totalSteps) * (direction === "right" ? 1 : -1);
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

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength){ return str; }
        return str.slice(0, maxLength) + '...';
    };

    return(
        <div className="block-container ultimas-novedades-block-container">
            <div className="block-content ultimas-novedades-block-content">
                <div className="block-title-container">
                    <h2 className="block-title">Últimas novedades</h2>
                    <div className="block-title-buttons">
                        <button type="button" onClick={() => scrollSmooth("left")} className="ultimas-novedades-left">
                            <span className="material-icons">chevron_left</span>
                        </button>

                        <button type="button" onClick={() => scrollSmooth("right")} className="ultimas-novedades-right">
                            <span className="material-icons">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="ultimas-novedades-container" ref={scrollRef}>
                    <ul className="ultimas-novedades-content">
                        {productos.map((producto) => {
                            const { ruta, nombre, fotos, precioNormal, precioVenta } = producto;
                            const descuento = Math.round(
                                ((precioNormal - precioVenta) * 100) / precioNormal
                            );

                            return(
                                <li key={uuidv4()}>
                                    <a href={ruta} className="product-card" title={nombre}>
                                        <div className="product-card-images">
                                            <span className="product-card-discount">-{descuento}%</span>
                                            <img src={`${fotos}1.jpg`} alt={nombre} />
                                        </div>
                                        <div className="product-card-content">
                                            <div className="product-card-target">
                                                <span>¡ Lo más nuevo !</span>
                                            </div>
                                            <span className="product-card-brand">KAMAS</span>
                                            <h4 className="product-card-name">{truncate(nombre, 50)}</h4>
                                            <div className="product-card-prices">
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
