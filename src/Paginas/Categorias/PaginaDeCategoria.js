// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';

// import Header from '../../Componentes/Header/Header';
// import Footer from '../../Componentes/Footer/Footer';

// import './PaginaDeCategoria.css';

// function PaginaDeCategoria() {
//     const { categoria } = useParams();
//     const [filtros, setFiltros] = useState([]);
//     const [metadatos, setMetadatos] = useState({ title: '', description: '' });
//     const [productos, setProductos] = useState([]);
//     const [productosFiltrados, setProductosFiltrados] = useState([]);
//     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});

//     useEffect(() => {
//         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
//             .then(response => response.json())
//             .then(data => setMetadatos(data || { title: '', description: '' }))
//             .catch(error => console.error('Error cargando metadatos:', error));

//         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
//             .then(response => response.json())
//             .then(data => setFiltros(Array.isArray(data) ? data : []))
//             .catch(() => setFiltros([]));

//         fetch(`/assets/json/categorias/${categoria}/productos.json`)
//             .then(response => response.json())
//             .then(data => {
//                 const productosData = Array.isArray(data.productos) ? data.productos : [];
//                 setProductos(productosData);
//                 setProductosFiltrados(productosData);
//             })
//             .catch(() => setProductos([]));
//     }, [categoria]);

//     useEffect(() => {
//         if (metadatos.title) {
//             document.title = metadatos.title;
//         }
//     }, [metadatos.title]);

//     const handleFiltroChange = (categoriaFiltro, opcion) => {
//         setFiltrosSeleccionados(prev => {
//             const nuevoEstado = { ...prev, [categoriaFiltro]: new Set(prev[categoriaFiltro] || []) };

//             if (nuevoEstado[categoriaFiltro].has(opcion)) {
//                 nuevoEstado[categoriaFiltro].delete(opcion);
//             } else {
//                 nuevoEstado[categoriaFiltro].add(opcion);
//             }

//             if (nuevoEstado[categoriaFiltro].size === 0) {
//                 delete nuevoEstado[categoriaFiltro];
//             }

//             return { ...nuevoEstado };
//         });
//     };

//     useEffect(() => {
//         if (Object.keys(filtrosSeleccionados).length === 0) {
//             setProductosFiltrados(productos);
//             return;
//         }

//         const filtrados = productos.filter(producto => {
//             return Object.keys(filtrosSeleccionados).every(categoriaFiltro => {
//                 const valorProducto = producto.detallesDelProducto?.[categoriaFiltro];
//                 return valorProducto && filtrosSeleccionados[categoriaFiltro].has(valorProducto);
//             });
//         });

//         setProductosFiltrados(filtrados);
//     }, [filtrosSeleccionados, productos]);

//     return (
//         <>
//             <Helmet>
//                 <title>{metadatos.title}</title>
//             </Helmet>

//             <Header />

//             <main>
//                 <div className='block-container'>
//                     <section className='block-content'>
//                         <div className='category-page-container'>
//                             <div className='category-page-left'>
//                                 {filtros.map((filtro, index) => (
//                                     <div className='filter' key={index}>
//                                         <p className='filter-name'>{filtro.titulo}:</p>
//                                         <ul>
//                                             {filtro.lista.map((opcion, idx) => (
//                                                 <li key={idx}>
//                                                     <input type='checkbox' id={`filtro-${index}-${idx}`} onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}/>
//                                                     <label htmlFor={`filtro-${index}-${idx}`}>{opcion.nombre}</label>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className='category-page-right'>
//                                 <div className='category-page-products'>
//                                     {productosFiltrados.map(producto => {
//                                         const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

//                                         return(
//                                             <a href={producto.ruta} className='product-card' title={producto.nombre} key={producto.id}>
//                                                 <div className='product-card-images'>
//                                                     {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>}
//                                                     <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
//                                                 </div>
//                                                 <div className="product-card-content">
//                                                     <span className='product-card-brand'>KAMAS</span>
//                                                     <h4 className='product-card-name'>{producto.nombre}</h4>
//                                                     <div className='product-card-prices'>
//                                                         <span className='product-card-normal-price'>S/.{producto.precioNormal}</span>
//                                                         <span className='product-card-sale-price'>S/.{producto.precioVenta}</span>
//                                                     </div>
//                                                 </div>
//                                             </a>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>

//             <Footer />
//         </>
//     );
// }

// export default PaginaDeCategoria;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './PaginaDeCategoria.css';

function PaginaDeCategoria() {
    const { categoria, subcategoria } = useParams();
    const [filtros, setFiltros] = useState([]);
    const [metadatos, setMetadatos] = useState({ title: '', description: '' });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});

    useEffect(() => {
        // Cargar metadatos de la categoría
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then(response => response.json())
            .then(data => setMetadatos(data || { title: '', description: '' }))
            .catch(error => console.error('Error cargando metadatos:', error));

        // Cargar filtros
        fetch(`/assets/json/categorias/${categoria}/filtros.json`)
            .then(response => response.json())
            .then(data => setFiltros(Array.isArray(data) ? data : []))
            .catch(() => setFiltros([]));

        // Determinar la ruta del JSON de productos (subcategoría o categoría)
        let rutaProductos = subcategoria
            ? `/assets/json/categorias/${categoria}/sub-categorias/${subcategoria}.json`
            : `/assets/json/categorias/${categoria}/productos.json`;

        fetch(rutaProductos)
            .then(response => response.json())
            .then(data => {
                const productosData = Array.isArray(data.productos) ? data.productos : [];
                setProductos(productosData);
                setProductosFiltrados(productosData);
            })
            .catch(() => setProductos([]));
    }, [categoria, subcategoria]);

    useEffect(() => {
        if (metadatos.title) {
            document.title = metadatos.title;
        }
    }, [metadatos.title]);

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
                const valorProducto = producto.detallesDelProducto?.[categoriaFiltro];
                return valorProducto && filtrosSeleccionados[categoriaFiltro].has(valorProducto);
            });
        });

        setProductosFiltrados(filtrados);
    }, [filtrosSeleccionados, productos]);

    return (
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
                                {filtros.map((filtro, index) => (
                                    <div className='filter' key={index}>
                                        <p className='filter-name'>{filtro.titulo}:</p>
                                        <ul>
                                            {filtro.lista.map((opcion, idx) => (
                                                <li key={idx}>
                                                    <input
                                                        type='checkbox'
                                                        id={`filtro-${index}-${idx}`}
                                                        onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
                                                    />
                                                    <label htmlFor={`filtro-${index}-${idx}`}>{opcion.nombre}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className='category-page-right'>
                                <div className='category-page-products'>
                                    {productosFiltrados.map(producto => {
                                        const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

                                        return (
                                            <a href={producto.ruta} className='product-card' title={producto.nombre} key={producto.id}>
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
