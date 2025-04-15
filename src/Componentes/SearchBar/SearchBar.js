import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

import './SearchBar.css';

function SearchBar() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const normalizeStr = (str) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const filteredProductos = productos.filter((producto) => {
        if (!searchTerm) return true;

        const normalizedSearchTerm = normalizeStr(searchTerm);
        const tokens = normalizedSearchTerm.split(' ').filter(Boolean);

        const normalizedNombre = normalizeStr(producto.nombre);
        const normalizedSKU = normalizeStr(producto.sku);

        return tokens.every((token) =>
            normalizedNombre.includes(token) || normalizedSKU.includes(token)
        );
    });

    return (
        <div className='search-bar-container'>
            <div className='search-bar'>
                <input type='text' placeholder='Buscar en kamas.pe' value={searchTerm} onChange={handleSearchChange} />
                <span className='material-icons'>search</span>
            </div>

            <div className={`search-bar-items-container ${searchTerm.trim() !== "" ? "active" : ""}`}>
                <ul className='search-bar-items'>
                    {filteredProductos.length > 0 ? (
                        filteredProductos.map((producto) => (
                            <li key={uuidv4()}>
                                <a href={producto.ruta} title={producto.nombre} target="_blank" rel="noopener noreferrer">
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
