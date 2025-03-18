import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

function PaginaProducto() {
    const location = useLocation();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const categorias = ["colchones", "cama-box-tarimas", "dormitorios", "camas-funcionales", "cabeceras", "sofas", "complementos"];
                let productoEncontrado = null;

                for (const categoria of categorias) {
                    const subcategorias = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                        .then(response => response.json())
                        .catch(() => ({ subcategorias: [] }));

                    for (const subcat of subcategorias.subcategorias || []) {
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        const jsonPath = `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`;

                        const data = await fetch(jsonPath).then(response => response.json()).catch(() => null);

                        if (data && data.productos) {
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
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error al buscar el producto:", error);
                setError(true);
            }
        };

        fetchProducto();
    }, [location.pathname]);

    useEffect(() => {
        if (producto) {
            document.title = producto.nombre;
        }
    }, [producto]);

    if (error) {
        return <p>Error: Producto no encontrado o no se pudo cargar la información.</p>;
    }

    if (!producto) {
        return <p>Cargando información del producto...</p>;
    }

    return (
        <>
            <Header/>

            <main>
                <div className='block-container'>
                    <div className='block-content'>
                        <section className="product-details">
                            <h1>{producto.nombre}</h1>
                            <div className="product-gallery">
                                <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                            </div>
                            <div className="product-info">
                                <h2>Detalles del Producto</h2>
                                <ul>
                                    {Object.entries(producto.detallesDelProducto).map(([key, value]) => (
                                    <li key={key}>{`${key}: ${value}`}</li>
                                    ))}
                                </ul>
                                <h3>Descripción</h3>
                                <ul>
                                    {Object.values(producto.descripcion).map((detalle, index) => (
                                        <li key={index}>{detalle}</li>
                                    ))}
                                </ul>
                                <p className="product-price">
                                    Precio de venta: <strong>S/.{producto.precioVenta}</strong>
                                    {producto.precioNormal > producto.precioVenta && (
                                        <span> (Antes: S/.{producto.precioNormal})</span>
                                    )}
                                </p>
                                <p>Stock disponible: {producto.stock}</p>
                                <p>SKU: {producto.sku}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaProducto;
