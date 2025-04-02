import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../Componentes/Header/Header';
import Envios from './Componentes/Envios/Envios';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaProducto.css';

function PaginaProducto(){
    const location = useLocation();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [imagenActiva, setImagenActiva] = useState(null);

    const containerRef = useRef(null);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };
    
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    
    const scrollToLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    };
    
    const scrollToRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    };    

    useEffect(() => {
        const fetchProducto = async () => {
            try{
                const categorias = ["colchones", "cama-box-tarimas", "dormitorios", "camas-funcionales", "cabeceras", "sofas", "complementos"];
                let productoEncontrado = null;

                for (const categoria of categorias){
                    const subcategorias = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                        .then(response => response.json())
                        .catch(() => ({ subcategorias: [] }));

                    for (const subcat of subcategorias.subcategorias || []){
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        const jsonPath = `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`;

                        const data = await fetch(jsonPath).then(response => response.json()).catch(() => null);

                        if (data && data.productos){
                            const prod = data.productos.find(p => p.ruta === location.pathname);
                            if (prod) {
                                productoEncontrado = prod;
                                break;
                            }
                        }
                    }

                    if (productoEncontrado) break;
                }

                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                    cargarImagenes(productoEncontrado.fotos);
                } else {
                    setError(true);
                }
            } catch (error){
                console.error("Error al buscar el producto:", error);
                setError(true);
            }
        };

        const cargarImagenes = (carpetaFotos) => {
            const imgs = [];
            for (let i = 1; i <= 5; i++){
                const path = `${carpetaFotos}${i}.jpg`;
                const img = new Image();
                img.src = path;
                img.onload = () => {
                    imgs.push(path);
                    setImagenes([...imgs]);
                    if (i === 1) setImagenActiva(path);
                };
            }
        };

        fetchProducto();
    }, [location.pathname]);

    useEffect(() => {
        if (producto){
            document.title = producto.nombre;
        }
    }, [producto]);

    if (error){
        return <p>Error: Producto no encontrado o no se pudo cargar la información.</p>;
    }

    if (!producto){
        return <p>Cargando información del producto...</p>;
    }

    const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

    return(
        <>
            <Header/>

            <div className='block-container'>
                <section className='block-content product-page-block-content'>
                    <div className='product-page-direction'>
                        <a href='/'>
                            <span className="material-icons">home</span>
                        </a>
                        <p className='color-gray'>/</p>
                        <a href={`/productos/${producto.categoria}/`}>
                            <p>{producto.categoria}</p>
                        </a>
                        <p className='color-gray'>/</p>
                        <a href={`/productos/${producto.categoria}/${producto.subCategoria}/`}>
                            <p>{producto.subCategoria}</p>
                        </a>
                        <p className='color-gray'>/</p>
                        <a href={producto.ruta}>
                            <p>{producto.nombre}</p>
                        </a>
                    </div>

                    <div className='product-page-container'>
                        <div className='product-page-target product-page-target-1'>
                            <div className='product-page-images-container' ref={containerRef}>
                                <div className='product-page-images-content'>
                                    <ul className='product-page-images'>
                                        {imagenes.map((img, index) => (
                                            <li key={index} className={imagenActiva === img ? 'select' : ''} onClick={() => setImagenActiva(img)}>
                                                <img src={img} alt={producto.nombre} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className='product-page-principal-image'>
                                {descuento > 0 && (
                                    <span className="product-page-discount">-{descuento}%</span>
                                )}
                                <img src={imagenActiva} alt={producto.nombre}/>

                                <ul className='tags'>
                                    <li>
                                        <span className="material-icons">local_shipping</span>
                                        <p>Envíos a provincia</p>
                                        <b>¡ Inmediatos !</b>
                                    </li>
                                    <li>
                                        <span className="material-icons">near_me</span>
                                        <p>Lima y Callao</p>
                                        <b>¡ Llega hoy !</b>
                                    </li>
                                </ul>
                            </div>

                            <button type='button' className='product-page-images-button product-page-images-button-1' onClick={scrollToTop}>
                                <span className="material-icons">keyboard_arrow_up</span>
                            </button>
                            <button type='button' className='product-page-images-button product-page-images-button-2' onClick={scrollToBottom}>
                                <span className="material-icons">keyboard_arrow_down</span>
                            </button>
                            <button type='button' className='product-page-images-button product-page-images-button-3' onClick={scrollToLeft}>
                                <span className="material-icons">chevron_left</span>
                            </button>
                            <button type='button' className='product-page-images-button product-page-images-button-4' onClick={scrollToRight}>
                                <span className="material-icons">chevron_right</span>
                            </button>
                        </div>

                        <div className='product-page-target product-page-target-2'>
                            <div className='product-page-sub-target product-page-sub-target-1'>
                                <p className='product-page-category'>{producto.categoria}</p>
                                <h1 className='product-page-name'>{producto.nombre}</h1>
                                <span className='product-page-sku'>SKU: {producto.sku}</span>
                            </div>

                            <div className='product-page-sub-target product-page-sub-target-2'>
                                <div>
                                    <div>
                                        <h4 className='product-page-subtitle'>Resumen del producto:</h4>
                                        <ul className='product-page-resume'>
                                            {producto["resumen-del-producto"] && producto["resumen-del-producto"].map((detalle, index) => (
                                                Object.entries(detalle).map(([key, value]) => (
                                                    <li key={index + key}>
                                                        <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                                        <p className='text'>{value}</p>
                                                    </li>
                                                ))
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className='product-page-subtitle'>Otras medidas disponibles:</h4>
                                        <ul className='product-page-sizes'>
                                            {producto["tamaños-disponibles"] &&
                                                producto["tamaños-disponibles"].map((size, index) => (
                                                <li key={index}>
                                                    <a href={size.ruta}>
                                                        <p>{size.nombre}</p>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <div className='product-page-prices'>
                                        <span className='price-normal'>Antes: S/.{producto.precioNormal}.00</span>
                                        <span className='price-sell'>Ahora: S/.{producto.precioVenta}.00</span>
                                    </div>

                                    <div className='product-page-gifts'>
                                        <h4 className='product-page-subtitle'>Incluye:</h4>
                                        <ul>
                                            {producto.incluye && producto.incluye.map((item) => (
                                                <li key={item.id}>
                                                    <p className='text'>{item.texto}</p>
                                                    <img src={item.foto} alt={item.texto}/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='product-page-sub-target product-page-sub-target-3'>
                                <div>
                                    <h4 className='product-page-subtitle'>Lugar de envío:</h4>

                                    <Envios producto={producto} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='product-page-bottom'>
                        <div className='product-page-details d-grid-2-1fr gap-20'>
                            <div>
                                <h4 className='product-page-subtitle'>Detalles del producto:</h4>
                                <ul>
                                    {producto["detalles-del-producto"] && producto["detalles-del-producto"].map((detalle, index) => (
                                        Object.entries(detalle).map(([key, value]) => (
                                            <li key={index + key}>
                                                <div>
                                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                                </div>
                                                <div>
                                                    <p className='text'>{value}</p>
                                                </div>
                                            </li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className='product-page-subtitle'>Descripción del producto:</h4>
                                <ul>
                                    {producto["descripcion"] && producto["descripcion"].map((detalle, index) => (
                                        Object.entries(detalle).map(([key, value]) => (
                                            <li key={index + key}>
                                                <div>
                                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                                </div>
                                                <div>
                                                    <p className='text'>{value}</p>
                                                </div>
                                            </li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    );
}

export default PaginaProducto;
