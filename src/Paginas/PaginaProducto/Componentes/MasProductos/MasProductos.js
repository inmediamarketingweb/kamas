import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './MasProductos.css';

export default function MasProductos({ categoriaActual }){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRandomProducts(){
            try{
                const manifestRes = await fetch('/assets/json/manifest.json');
                const manifest = await manifestRes.json();
                const files = manifest.files;

                const fetched = await Promise.all(
                    files.map(async (filePath) => {
                        const res = await fetch(filePath);
                        const data = await res.json();
                        if (!data.productos || !data.productos.length) return null;

                        const sameCategory = data.productos.filter(
                            (p) => p.categoria === categoriaActual
                        );
                        if (!sameCategory.length) return null;

                        const randomIndex = Math.floor(Math.random() * sameCategory.length);
                        return sameCategory[randomIndex];
                    })
                );

                setProducts(fetched.filter((p) => p));
            } catch (err) {
                console.error('Error loading more products:', err);
            } finally {
                setLoading(false);
            }
        }

        if (categoriaActual) {
            fetchRandomProducts();
        } else {
            setLoading(false);
        }
    }, [categoriaActual]);

    if (loading) {
        return <p>Cargando más productos...</p>;
    }

    if (!products.length) {
        return <p>No hay más productos en esta categoría.</p>;
    }

    const truncate = (str, maxLength) => str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

    return(
        <div className='block-container'>
            <div className='block-content'>
                <div className='block-title-container'>
                    <h4 className='block-title'>Más productos</h4>
                </div>

                <div className="product-page-more-products-container">
                    <nav className="product-page-more-products-content">
                        <ul className='d-grid-5-3-2fr gap-10'>
                            {products.map((prod) => (
                                <li key={uuidv4()} className="product-card">
                                    <div className='product-card-images'>
                                        <a href={prod.ruta} title={prod.nombre}>
                                            <img src={`${prod.fotos}1.jpg`} alt={prod.nombre} />
                                        </a>
                                    </div>

                                    <a href={prod.ruta} title={prod.nombre} className="product-card-content">
                                        <span className="product-card-brand">KAMAS</span>
                                        <h4 className="product-card-name">{truncate(prod.nombre, 65)}</h4>
                                        <div className="product-card-prices">
                                            <span className="product-card-normal-price">S/.{prod.precioNormal}</span>
                                            <span className="product-card-sale-price">S/.{prod.precioVenta}</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
