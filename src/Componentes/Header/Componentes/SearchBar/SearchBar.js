import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

import './SearchBar.css';

function SearchBar(){
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];

                const productosArrays = await Promise.all(
                    archivos.map(async (archivo) => {
                        const response = await fetch(archivo);
                        const data = await response.json();
                        return data.productos || [];
                    })
                );

                const productosUnificados = productosArrays.flat();
                setProductos(productosUnificados);
            } catch (error) {
            console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        const bodyLayerElement = document.querySelector('.body-layer');
        if (bodyLayerElement) {
            if (searchTerm.trim() !== "") {
                bodyLayerElement.classList.add('active');
            } else {
                bodyLayerElement.classList.remove('active');
            }
        }
    }, [searchTerm]);

    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    };

    const normalizeStr = (str = '') => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    const filteredProductos = productos.filter((producto) => {
    if (!searchTerm) return true;

    const normalizedSearchTerm = normalizeStr(searchTerm);
    const tokens = normalizedSearchTerm.split(' ').filter(Boolean);

    const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
    const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
    const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
    const normalizedSubCategoria = normalizeStr(String(producto.subCategoria ?? ''));

    return tokens.every((token) => normalizedNombre.includes(token) || normalizedSKU.includes(token) || normalizedCategoria.includes(token) || normalizedSubCategoria.includes(token) ); });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!searchTerm.trim()) return;

            if (filteredProductos.length === 1) {
                window.location.href = filteredProductos[0].ruta;
            } else if (filteredProductos.length > 1) {
                window.location.href = `/busqueda?query=${encodeURIComponent(searchTerm)}`;
            }
        } else if (e.key === 'Escape') {
            setSearchTerm('');
        }
    };

    return(
        <div className='search-bar-container'>
            <div className='search-bar'>
                <input type='text' placeholder='Buscar en kamas.pe' value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
                <span className='material-icons'>search</span>
            </div>

            <div className={`search-bar-items-container ${searchTerm.trim() !== "" ? "active" : ""}`}>
                <ul className='search-bar-items'>
                    {filteredProductos.length > 0 ? (
                        filteredProductos.map((producto) => (
                            <li key={uuidv4()}>
                                <a href={producto.ruta} title={producto.nombre}>
                                    <p className='text'>{producto.nombre}</p>
                                    <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>No se encontraron productos.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;
