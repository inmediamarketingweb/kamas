import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

import './SearchBar.css';

function SearchBar(){
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                if (!manifestResponse.ok) {
                    console.error('No OK al cargar manifest.json:', manifestResponse.status);
                    return;
                }
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];

                const productosArrays = await Promise.all(
                    archivos.map(async (archivo) => {
                        try{
                            const res = await fetch(archivo);
                            if (!res.ok) {
                                console.warn(`No OK (${res.status}) al cargar ${archivo}`);
                                return [];
                            }
                            const text = await res.text();
                            if (!text) {
                                console.warn(`Respuesta vacía para ${archivo}`);
                                return [];
                            }
                            const data = JSON.parse(text);
                            return data.productos || [];
                        } catch (err) {
                            console.error(`Error procesando ${archivo}:`, err);
                            return [];
                        }
                    })
                );

                setProductos(productosArrays.flat());
            } catch (error) {
            console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const normalizeStr = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const filteredProductos = productos.filter((producto) => {
        if (!searchTerm) return true;
        const tokens = normalizeStr(searchTerm).split(' ').filter(Boolean);
        const fields = [
            producto.nombre,
            producto.sku,
            producto.categoria,
            producto.subcategoria
        ].map(String).map(normalizeStr);

        return tokens.every(token =>
            fields.some(field => field.includes(token))
        );
    });

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

    return (
        <>
            <div className={`search-bar-container ${searchTerm.trim() !== '' ? 'active' : ''}`}>
                <div className='search-bar'>
                    <input type='text' placeholder='Buscar en kamas.pe' value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
                    <span className='material-icons'>search</span>
                </div>

                <div className={`search-bar-items-container ${searchTerm.trim() !== '' ? 'active' : ''}`}>
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

            <div className={`search-bar-layer ${searchTerm.trim() !== '' ? 'active' : ''}`} onClick={() => setSearchTerm('')} ></div>
        </>
    );
}

export default SearchBar;
