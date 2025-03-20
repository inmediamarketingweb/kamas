import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaProducto.css';

function PaginaProducto(){
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
                <section className='block-content'>
                    <div className='product-page-direction'>
                        <a href='/'>
                            <span className="material-icons">home</span>
                        </a>
                        <p className='color-gray'>/</p>
                        <a href={`/productos/${producto.categoria}/`}>
                            <p>{producto.categoria}</p>
                        </a>
                        <p className='color-gray'>/</p>
                        <a href={producto.ruta}>
                            <p>{producto.nombre}</p>
                        </a>
                    </div>

                    <div className='product-page-container'>
                        <div className='product-page-target product-page-target-1'>
                            <div className='product-page-images-container'>
                                <ul className='product-page-images'>
                                    <li>
                                        <img src={`${producto.fotos}/2.jpg`} alt={producto.nombre}/>
                                    </li>
                                </ul>
                            </div>
                            <div className='product-page-principal-image'>
                                {descuento > 0 && (
                                    <span className="product-page-discount">-{descuento}%</span>
                                )}

                                <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre}/>
                            </div>
                        </div>

                        <div className='product-page-target product-page-target-2'>
                            <p className='product-page-category'>{producto.categoria}</p>

                            <div className='d-flex-column'>
                                <h1>{producto.nombre}</h1>
                                <span className='product-page-sku'>SKU: {producto.sku}</span>
                            </div>

                            <div className='prices'>
                                <span className='price-normal'>Antes: S/.{producto.precioNormal}.00</span>
                                <span className='price-sell'>Ahora: S/.{producto.precioVenta}.00</span>
                            </div>

                            <div className='product-page-gifts'>
                                <h4>De regalo:</h4>
                                <ul>
                                    {Object.entries(producto.incluye).map(([key, value]) => (
                                        <li key={key}>
                                            <p>{value}</p>
                                            <img src="https://oechsle.vteximg.com.br/arquivos/ids/17212317-998-998/imageUrl_1.jpg?v=638406548589330000" alt={producto.nombre}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='product-page-details'>
                                <h4>Detalles del producto:</h4>
                                <ul>
                                    {Object.entries(producto.detallesDelProducto).map(([key, value]) => (
                                        <li key={key}>
                                            <p>{value}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='product-page-description'>
                                <h4>Descripción de producto:</h4>
                                <ul>
                                    {Object.values(producto.descripcion).map((detalle, index) => (
                                        <li key={index}>
                                            <p>{detalle}</p>
                                        </li>
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
