import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaDeCategoria.css';

function PaginaDeCategoria() {
    const { categoria, subcategoria } = useParams();
    const [searchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [metadatos, setMetadatos] = useState({ title: '', description: '' });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});

    useEffect(() => {
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then(response => response.json())
            .then(data => setMetadatos(data || { title: '', description: '' }))
            .catch(error => console.error('Error cargando metadatos:', error));

        fetch(`/assets/json/categorias/${categoria}/filtros.json`)
            .then(response => response.json())
            .then(data => setFiltros(Array.isArray(data) ? data : []))
            .catch(() => setFiltros([]));

        if (subcategoria) {
            const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                .then(response => response.json())
                .then(data => {
                    setProductos(data.productos || []);
                    setProductosFiltrados(data.productos || []);
                })
                .catch(() => {
                    setProductos([]);
                    setProductosFiltrados([]);
                });
        } else {
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                .then(response => response.json())
                .then(async (data) => {
                    if (!Array.isArray(data.subcategorias)) return;

                    const promesas = data.subcategorias.map(subcat => {
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                            .then(response => response.json())
                            .then(data => data.productos || [])
                            .catch(() => []);
                    });

                    const productosPorSubcategoria = await Promise.all(promesas);
                    const todosLosProductos = productosPorSubcategoria.flat();

                    setProductos(todosLosProductos);
                    setProductosFiltrados(todosLosProductos);
                })
                .catch(() => setProductos([]));
        }
    }, [categoria, subcategoria]);

    useEffect(() => {
        if (metadatos.title) {
            document.title = metadatos.title;
        }
    }, [metadatos.title]);

    useEffect(() => {
        const filtrosIniciales = {};

        searchParams.forEach((value, key) => {
            const filtroDecodificado = value.replace(/-/g, " ");
            filtrosIniciales[key] = new Set([filtroDecodificado]);
        });

        setFiltrosSeleccionados(filtrosIniciales);
    }, [searchParams]);

    const handleFiltroChange = (categoriaFiltro, opcion) => {
        setFiltrosSeleccionados(prev => {
            const nuevoEstado = { ...prev, [categoriaFiltro]: new Set(prev[categoriaFiltro] || []) };

            if (nuevoEstado[categoriaFiltro].has(opcion)) {
                nuevoEstado[categoriaFiltro].delete(opcion);
            } else {
                nuevoEstado[categoriaFiltro].add(opcion);
            }

            if (nuevoEstado[categoriaFiltro].size === 0) {
                delete nuevoEstado[categoriaFiltro];
            }

            return { ...nuevoEstado };
        });
    };

    useEffect(() => {
        if (Object.keys(filtrosSeleccionados).length === 0) {
            setProductosFiltrados(productos);
            return;
        }

        const filtrados = productos.filter(producto => {
            return Object.keys(filtrosSeleccionados).every(categoriaFiltro => {
                if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
                    return false;
                }

                const valorProducto = producto.detallesDelProducto[categoriaFiltro].toString().toLowerCase();
                return [...filtrosSeleccionados[categoriaFiltro]].some(filtro =>
                    valorProducto === filtro.toLowerCase()
                );
            });
        });

        setProductosFiltrados(filtrados);
    }, [filtrosSeleccionados, productos]);

    return(
        <>
            <Helmet>
                <title>{metadatos.title}</title>
            </Helmet>

            <Header />

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='category-page-container'>
                            <div className='category-page-left'>
                                {filtros.map((filtro) => (
                                    <div className='filter' key={`filtro-${filtro.nombre}`}>
                                        <p className='filter-name'>{filtro.titulo}:</p>
                                        <ul>
                                            {filtro.lista.map((opcion) => {
                                                return (
                                                    <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
                                                        <input
                                                            type='checkbox'
                                                            id={`filtro-${filtro.nombre}-${opcion.nombre}`}
                                                            onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
                                                        />
                                                        <label htmlFor={`filtro-${filtro.nombre}-${opcion.nombre}`}>
                                                            {opcion.nombre}
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className='category-page-right'>
                                {productosFiltrados.length > 0 ? (
                                    <div className='category-page-products'>
                                        {productosFiltrados.map((producto) => {
                                            const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

                                            return(
                                                <a href={producto.ruta} className='product-card' title={producto.nombre} key={uuidv4()}>
                                                    <div className='product-card-images'>
                                                        {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>}
                                                        <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                                    </div>
                                                    <div className="product-card-content">
                                                        <span className='product-card-brand'>KAMAS</span>
                                                        <h4 className='product-card-name'>{producto.nombre}</h4>
                                                        <div className='product-card-prices'>
                                                            <span className='product-card-normal-price'>S/.{producto.precioNormal}</span>
                                                            <span className='product-card-sale-price'>S/.{producto.precioVenta}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p>No se encontraron productos con los filtros seleccionados.</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default PaginaDeCategoria;
