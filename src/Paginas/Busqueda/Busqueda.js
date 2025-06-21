import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';

import './Busqueda.css';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

function PaginaBusqueda() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [filters, setFilters] = useState({ 
        tamanos: [], lineas: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        tamanos: [], lineas: []
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

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

                return normalizedNombre.includes(token) || 
                       normalizedSKU.includes(token) || 
                       normalizedCategoria.includes(token) || 
                       normalizedSubCategoria.includes(token);
            });

            const sizeMatch = selectedFilters.tamanos.length === 0 || 
                            selectedFilters.tamanos.includes(detalles.tamaño);

            const lineMatch = selectedFilters.lineas.length === 0 || 
                            selectedFilters.lineas.includes(detalles['línea-de-colchón']);

            return searchMatch && sizeMatch && lineMatch;
        });

        setFilteredProductos(filtered);
        setCurrentPage(1);
    }, [query, productos, selectedFilters.tamanos, selectedFilters.lineas]);

    const totalItems = filteredProductos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const getVisiblePages = () => {
        const visiblePages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
            if (currentPage <= 3) { 
                visiblePages.push(1, 2, 3, 4, '...', totalPages); 
            } else if (currentPage >= totalPages - 2) {
                visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return visiblePages;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
    };

    const handlePreviousPage = () => handlePageChange(currentPage - 1);
    const handleNextPage = () => handlePageChange(currentPage + 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProductos.slice(startIndex, endIndex);

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
                            {filteredProductos.length > 0 && (
                                <p className="block-subtitle">{totalItems} productos encontrados</p>
                            )}
                        </div>

                        <div className='search-products-content gap-10'>
                            {filteredProductos.length > 0 ? (
                                <>
                                    <ul className='search-products'>
                                        {currentProducts.map(producto => (
                                            <Producto key={producto.sku} producto={producto} truncate={truncate}/>
                                        ))}
                                    </ul>

                                    <div className="pagination-controls d-grid-column-2-3">
                                        <button 
                                            className="pagination-arrow" 
                                            onClick={handlePreviousPage} 
                                            disabled={currentPage === 1}
                                        >
                                            <span className="material-icons">chevron_left</span>
                                        </button>

                                        <div className="d-flex-center-center gap-10">
                                            {getVisiblePages().map((page, index) => 
                                                typeof page === 'number' ? (
                                                    <button 
                                                        key={index} 
                                                        className={`pagination-page ${currentPage === page ? 'active' : ''}`} 
                                                        onClick={() => handlePageChange(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                ) : (
                                                    <span key={index} className="pagination-ellipsis">...</span>
                                                )
                                            )}
                                        </div>

                                        <button 
                                            className="pagination-arrow" 
                                            onClick={handleNextPage} 
                                            disabled={currentPage === totalPages}
                                        >
                                            <span className="material-icons">chevron_right</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>Intentalo de nuevo</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaBusqueda;