import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';
import { v4 as uuidv4 } from "uuid";

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

import './Busqueda.css';

function PaginaBusqueda(){
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [filters, setFilters] = useState({ 
        tamanos: [], lineas: []
    });

    const [selectedFilters, setSelectedFilters] = useState({
        tamanos: [], lineas: []
    });

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const normalizeStr = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

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
            } catch (error){
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const response = await fetch('/assets/json/categorias/busqueda/filtros.json');
                const data = await response.json();
                setFilters({ tamanos: data.tamaños, lineas: data.lineas });
            } catch (error) {
                console.error('Error loading filter data:', error);
            }
        };

        fetchFilterData();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }));
    };

    useEffect(() => {
        if (!query.trim() && selectedFilters.tamanos.length === 0 && selectedFilters.lineas.length === 0) {
            setFilteredProductos([]);
            return;
        }

        const tokens = normalizeStr(query).split(' ').filter(Boolean);

        const filtered = productos.filter(producto => {
            const detalles = producto['detalles-del-producto']?.[0] || {};
            
            const searchMatch = tokens.length === 0 || tokens.every(token => {
                const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
                const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
                const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
                const normalizedSubCategoria = normalizeStr(String(producto.subCategoria ?? ''));

                return normalizedNombre.includes(token) || normalizedSKU.includes(token) || normalizedCategoria.includes(token) || normalizedSubCategoria.includes(token);
            });

            const sizeMatch = selectedFilters.tamanos.length === 0 || selectedFilters.tamanos.includes(detalles.tamaño);

            const lineMatch = selectedFilters.lineas.length === 0 || selectedFilters.lineas.includes(detalles['línea-de-colchón']);

            return searchMatch && sizeMatch && lineMatch;
        });

        setFilteredProductos(filtered);
    }, [query, productos, selectedFilters.tamanos, selectedFilters.lineas]);

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength) + "...";
    };

    return(
        <>
            <Helmet>
                <title>{query} | Kamas</title>
                <meta name='description' content="Resultados de búsqueda" />
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Resultados para: {query}</h1>
                        </div>

                        <div className='search-products-content gap-10'>
                            <div className='filters-content'>
                                <div className='filter-group'>
                                    <h3 className='filter-title'>Tamaños</h3>
                                    <ul>
                                        {filters.tamanos.map((tamano) => (
                                            <li key={tamano.tamaño}>
                                                <label>
                                                    <input type="checkbox" name="tamaño" value={tamano.tamaño} onChange={() => handleFilterChange('tamanos', tamano.tamaño)}checked={selectedFilters.tamanos.includes(tamano.tamaño)}/>
                                                    {tamano.tamaño}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='filter-group'>
                                    <h3 className='filter-title'>Líneas</h3>
                                    <ul>
                                        {filters.lineas.map((linea) => (
                                            <li key={linea.linea}>
                                                <label>
                                                    <input type="checkbox" name="linea" value={linea.linea} onChange={() => handleFilterChange('lineas', linea.linea)} checked={selectedFilters.lineas.includes(linea.linea)} />
                                                    <p className='text'>{linea.linea}</p>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {filteredProductos.length > 0 ? (
                                    <ul className='search-products d-grid-5-3-2fr gap-10'>
                                        {filteredProductos.map(producto => (
                                            <Producto key={producto.sku} producto={producto} truncate={truncate}/>
                                        ))}
                                    </ul>
                                ) : ( <p>Intentalo de nuevo</p> )}
                            </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaBusqueda;
