// // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // import { useParams, useSearchParams } from 'react-router-dom';
// // // // // // // // // // // import { Helmet } from 'react-helmet-async';
// // // // // // // // // // // import { v4 as uuidv4 } from 'uuid';

// // // // // // // // // // // import Header from '../../Componentes/Header/Header';
// // // // // // // // // // // import Footer from '../../Componentes/Footer/Footer';

// // // // // // // // // // // import './PaginaDeCategoria.css';

// // // // // // // // // // // function PaginaDeCategoria() {
// // // // // // // // // // //     const { categoria, subcategoria } = useParams();
// // // // // // // // // // //     const [searchParams, setSearchParams] = useSearchParams();
// // // // // // // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // // // // // // //     const [metadatos, setMetadatos] = useState({ title: '', description: '' });
// // // // // // // // // // //     const [productos, setProductos] = useState([]);
// // // // // // // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // // // // // // //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // // // // // // //             .then(response => response.json())
// // // // // // // // // // //             .then(data => setMetadatos(data || { title: '', description: '' }))
// // // // // // // // // // //             .catch(error => console.error('Error cargando metadatos:', error));

// // // // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // // // // // // //             .then(response => response.json())
// // // // // // // // // // //             .then(data => setFiltros(Array.isArray(data) ? data : []))
// // // // // // // // // // //             .catch(() => setFiltros([]));

// // // // // // // // // // //         if (subcategoria) {
// // // // // // // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // // // //                 .then(response => response.json())
// // // // // // // // // // //                 .then(data => {
// // // // // // // // // // //                     setProductos(data.productos || []);
// // // // // // // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // // // // // // //                 })
// // // // // // // // // // //                 .catch(() => {
// // // // // // // // // // //                     setProductos([]);
// // // // // // // // // // //                     setProductosFiltrados([]);
// // // // // // // // // // //                 });
// // // // // // // // // // //         } else {
// // // // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // // // // // // //                 .then(response => response.json())
// // // // // // // // // // //                 .then(async (data) => {
// // // // // // // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // // // // // // //                     const promesas = data.subcategorias.map(subcat => {
// // // // // // // // // // //                         const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // // //                         return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // // // //                             .then(response => response.json())
// // // // // // // // // // //                             .then(data => data.productos || [])
// // // // // // // // // // //                             .catch(() => []);
// // // // // // // // // // //                     });

// // // // // // // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // // // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // // // // // // //                     setProductos(todosLosProductos);
// // // // // // // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // // // // // // //                 })
// // // // // // // // // // //                 .catch(() => setProductos([]));
// // // // // // // // // // //         }
// // // // // // // // // // //     }, [categoria, subcategoria]);

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         if (metadatos.title) {
// // // // // // // // // // //             document.title = metadatos.title;
// // // // // // // // // // //         }
// // // // // // // // // // //     }, [metadatos.title]);

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         const filtrosIniciales = {};

// // // // // // // // // // //         searchParams.forEach((value, key) => {
// // // // // // // // // // //             const opciones = value.split('+').map(op => decodeURIComponent(op).toLowerCase().replace(/\s+/g, "-"));
// // // // // // // // // // //             filtrosIniciales[key] = new Set(opciones);
// // // // // // // // // // //         });

// // // // // // // // // // //         setFiltrosSeleccionados(filtrosIniciales);
// // // // // // // // // // //     }, [searchParams]);

// // // // // // // // // // //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// // // // // // // // // // //         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // // //         setFiltrosSeleccionados(prev => {
// // // // // // // // // // //             const nuevoEstado = { ...prev, [categoriaFiltro]: new Set(prev[categoriaFiltro] || []) };
    
// // // // // // // // // // //             if (nuevoEstado[categoriaFiltro].has(opcionNormalizada)) {
// // // // // // // // // // //                 nuevoEstado[categoriaFiltro].delete(opcionNormalizada);
// // // // // // // // // // //             } else {
// // // // // // // // // // //                 nuevoEstado[categoriaFiltro].add(opcionNormalizada);
// // // // // // // // // // //             }
    
// // // // // // // // // // //             if (nuevoEstado[categoriaFiltro].size === 0) {
// // // // // // // // // // //                 delete nuevoEstado[categoriaFiltro];
// // // // // // // // // // //             }
    
// // // // // // // // // // //             const newParams = new URLSearchParams();
// // // // // // // // // // //             Object.keys(nuevoEstado).forEach(key => {
// // // // // // // // // // //                 newParams.set(key, [...nuevoEstado[key]].map(encodeURIComponent).join('+'));
// // // // // // // // // // //             });
// // // // // // // // // // //             setSearchParams(newParams);
    
// // // // // // // // // // //             return nuevoEstado;
// // // // // // // // // // //         });
// // // // // // // // // // //     };

// // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // //         if (Object.keys(filtrosSeleccionados).length === 0) {
// // // // // // // // // // //             setProductosFiltrados(productos);
// // // // // // // // // // //             return;
// // // // // // // // // // //         }

// // // // // // // // // // //         const filtrados = productos.filter(producto => {
// // // // // // // // // // //             return Object.keys(filtrosSeleccionados).every(categoriaFiltro => {
// // // // // // // // // // //                 if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
// // // // // // // // // // //                     return false;
// // // // // // // // // // //                 }

// // // // // // // // // // //                 const valorProducto = producto.detallesDelProducto[categoriaFiltro].toString().toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // // //                 return [...filtrosSeleccionados[categoriaFiltro]].some(filtro => valorProducto === filtro);
// // // // // // // // // // //             });
// // // // // // // // // // //         });

// // // // // // // // // // //         setProductosFiltrados(filtrados);
// // // // // // // // // // //     }, [filtrosSeleccionados, productos]);

// // // // // // // // // // //     return (
// // // // // // // // // // //         <>
// // // // // // // // // // //             <Helmet>
// // // // // // // // // // //                 <title>{metadatos.title}</title>
// // // // // // // // // // //             </Helmet>

// // // // // // // // // // //             <Header />

// // // // // // // // // // //             <main>
// // // // // // // // // // //                 <div className='block-container'>
// // // // // // // // // // //                     <section className='block-content'>
// // // // // // // // // // //                         <div className='category-page-container'>
// // // // // // // // // // //                             <div className='category-page-left'>
// // // // // // // // // // //                                 {filtros.map((filtro) => (
// // // // // // // // // // //                                     <div className='filter' key={`filtro-${filtro.nombre}`}>
// // // // // // // // // // //                                         <p className='filter-name'>{filtro.titulo}:</p>
// // // // // // // // // // //                                         <ul>
// // // // // // // // // // //                                             {filtro.lista.map((opcion) => (
// // // // // // // // // // //                                                 <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
// // // // // // // // // // //                                                     <input
// // // // // // // // // // //                                                         type='checkbox'
// // // // // // // // // // //                                                         checked={filtrosSeleccionados[filtro.nombre]?.has(opcion.nombre.toLowerCase().replace(/\s+/g, "-")) || false}
// // // // // // // // // // //                                                         onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
// // // // // // // // // // //                                                     />
// // // // // // // // // // //                                                     <label>{opcion.nombre}</label>
// // // // // // // // // // //                                                 </li>
// // // // // // // // // // //                                             ))}
// // // // // // // // // // //                                         </ul>
// // // // // // // // // // //                                     </div>
// // // // // // // // // // //                                 ))}
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                             <div className='category-page-right'> 
// // // // // // // // // // //                                  {productosFiltrados.length > 0 ? (
// // // // // // // // // // //                                      <div className='category-page-products'> 
// // // // // // // // // // //                                          {productosFiltrados.map(producto => { 
// // // // // // // // // // //                                              const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
// // // // // // // // // // //                                              return( 
// // // // // // // // // // //                                                  <a href={producto.ruta} className='product-card' title={producto.nombre} key={uuidv4()}> 
// // // // // // // // // // //                                                      <div className='product-card-images'> 
// // // // // // // // // // //                                                          {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>} 
// // // // // // // // // // //                                                          <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} /> 
// // // // // // // // // // //                                                      </div> 
// // // // // // // // // // //                                                      <div className="product-card-content"> 
// // // // // // // // // // //                                                          <span className='product-card-brand'>KAMAS</span> 
// // // // // // // // // // //                                                          <h4 className='product-card-name'>{producto.nombre}</h4> 
// // // // // // // // // // //                                                          <div className='product-card-prices'> 
// // // // // // // // // // //                                                              <span className='product-card-normal-price'>S/.{producto.precioNormal}</span> 
// // // // // // // // // // //                                                              <span className='product-card-sale-price'>S/.{producto.precioVenta}</span> 
// // // // // // // // // // //                                                         </div> 
// // // // // // // // // // //                                                      </div> 
// // // // // // // // // // //                                                  </a> 
// // // // // // // // // // //                                              ); 
// // // // // // // // // // //                                          })} 
// // // // // // // // // // //                                      </div>
// // // // // // // // // // //                                  ) : (
// // // // // // // // // // //                                      <p>No se encontraron productos.</p>
// // // // // // // // // // //                                  )}
// // // // // // // // // // //                              </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </section>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </main>

// // // // // // // // // // //             <Footer />
// // // // // // // // // // //         </>
// // // // // // // // // // //     );
// // // // // // // // // // // }

// // // // // // // // // // // export default PaginaDeCategoria;

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import { useParams, useSearchParams } from 'react-router-dom';
// // // // // // // // // // import { Helmet } from 'react-helmet-async';
// // // // // // // // // // import { v4 as uuidv4 } from 'uuid';

// // // // // // // // // // import Header from '../../Componentes/Header/Header';
// // // // // // // // // // import Footer from '../../Componentes/Footer/Footer';

// // // // // // // // // // import './PaginaDeCategoria.css';

// // // // // // // // // // function PaginaDeCategoria() {
// // // // // // // // // //     const { categoria, subcategoria } = useParams();
// // // // // // // // // //     const [searchParams, setSearchParams] = useSearchParams();
// // // // // // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // // // // // //     const [metadatos, setMetadatos] = useState({ title: '', description: '' });
// // // // // // // // // //     const [productos, setProductos] = useState([]);
// // // // // // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // // // // // //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// // // // // // // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // // // // // // // // //     const [rangoPreciosMaximos, setRangoPreciosMaximos] = useState([0, 0]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // // // // // //             .then(response => response.json())
// // // // // // // // // //             .then(data => setMetadatos(data || { title: '', description: '' }))
// // // // // // // // // //             .catch(error => console.error('Error cargando metadatos:', error));

// // // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // // // // // //             .then(response => response.json())
// // // // // // // // // //             .then(data => setFiltros(Array.isArray(data) ? data : []))
// // // // // // // // // //             .catch(() => setFiltros([]));

// // // // // // // // // //         if (subcategoria) {
// // // // // // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // // //                 .then(response => response.json())
// // // // // // // // // //                 .then(data => {
// // // // // // // // // //                     setProductos(data.productos || []);
// // // // // // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // // // // // //                 })
// // // // // // // // // //                 .catch(() => {
// // // // // // // // // //                     setProductos([]);
// // // // // // // // // //                     setProductosFiltrados([]);
// // // // // // // // // //                 });
// // // // // // // // // //         } else {
// // // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // // // // // //                 .then(response => response.json())
// // // // // // // // // //                 .then(async (data) => {
// // // // // // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // // // // // //                     const promesas = data.subcategorias.map(subcat => {
// // // // // // // // // //                         const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // //                         return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // // //                             .then(response => response.json())
// // // // // // // // // //                             .then(data => data.productos || [])
// // // // // // // // // //                             .catch(() => []);
// // // // // // // // // //                     });

// // // // // // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // // // // // //                     setProductos(todosLosProductos);
// // // // // // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // // // // // //                 })
// // // // // // // // // //                 .catch(() => setProductos([]));
// // // // // // // // // //         }
// // // // // // // // // //     }, [categoria, subcategoria]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (productos.length > 0) {
// // // // // // // // // //             const precios = productos.map(producto => producto.precioVenta);
// // // // // // // // // //             const precioMin = Math.min(...precios);
// // // // // // // // // //             const precioMax = Math.max(...precios);
// // // // // // // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // // // // // // //             setRangoPreciosMaximos([precioMin, precioMax]);
// // // // // // // // // //         }
// // // // // // // // // //     }, [productos]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (metadatos.title) {
// // // // // // // // // //             document.title = metadatos.title;
// // // // // // // // // //         }
// // // // // // // // // //     }, [metadatos.title]);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         const filtrosIniciales = {};

// // // // // // // // // //         searchParams.forEach((value, key) => {
// // // // // // // // // //             const opciones = value.split('+').map(op => decodeURIComponent(op).toLowerCase().replace(/\s+/g, "-"));
// // // // // // // // // //             filtrosIniciales[key] = new Set(opciones);
// // // // // // // // // //         });

// // // // // // // // // //         setFiltrosSeleccionados(filtrosIniciales);
// // // // // // // // // //     }, [searchParams]);

// // // // // // // // // //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// // // // // // // // // //         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // //         setFiltrosSeleccionados(prev => {
// // // // // // // // // //             const nuevoEstado = { ...prev, [categoriaFiltro]: new Set(prev[categoriaFiltro] || []) };
    
// // // // // // // // // //             if (nuevoEstado[categoriaFiltro].has(opcionNormalizada)) {
// // // // // // // // // //                 nuevoEstado[categoriaFiltro].delete(opcionNormalizada);
// // // // // // // // // //             } else {
// // // // // // // // // //                 nuevoEstado[categoriaFiltro].add(opcionNormalizada);
// // // // // // // // // //             }
    
// // // // // // // // // //             if (nuevoEstado[categoriaFiltro].size === 0) {
// // // // // // // // // //                 delete nuevoEstado[categoriaFiltro];
// // // // // // // // // //             }
    
// // // // // // // // // //             const newParams = new URLSearchParams();
// // // // // // // // // //             Object.keys(nuevoEstado).forEach(key => {
// // // // // // // // // //                 newParams.set(key, [...nuevoEstado[key]].map(encodeURIComponent).join('+'));
// // // // // // // // // //             });
// // // // // // // // // //             setSearchParams(newParams);
    
// // // // // // // // // //             return nuevoEstado;
// // // // // // // // // //         });
// // // // // // // // // //     };

// // // // // // // // // //     const handleCambioRangoPrecios = (nuevoRango) => {
// // // // // // // // // //         setRangoPrecios(nuevoRango);

// // // // // // // // // //         const productosFiltradosPorPrecio = productos.filter(producto => 
// // // // // // // // // //             producto.precioVenta >= nuevoRango[0] && producto.precioVenta <= nuevoRango[1]
// // // // // // // // // //         );
// // // // // // // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // // // // // // //     };

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (Object.keys(filtrosSeleccionados).length === 0) {
// // // // // // // // // //             setProductosFiltrados(productos);
// // // // // // // // // //             return;
// // // // // // // // // //         }

// // // // // // // // // //         const filtrados = productos.filter(producto => {
// // // // // // // // // //             return Object.keys(filtrosSeleccionados).every(categoriaFiltro => {
// // // // // // // // // //                 if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
// // // // // // // // // //                     return false;
// // // // // // // // // //                 }

// // // // // // // // // //                 const valorProducto = producto.detallesDelProducto[categoriaFiltro].toString().toLowerCase().replace(/\s+/g, "-");
// // // // // // // // // //                 return [...filtrosSeleccionados[categoriaFiltro]].some(filtro => valorProducto === filtro);
// // // // // // // // // //             });
// // // // // // // // // //         });

// // // // // // // // // //         setProductosFiltrados(filtrados);
// // // // // // // // // //     }, [filtrosSeleccionados, productos]);

// // // // // // // // // //     return (
// // // // // // // // // //         <>
// // // // // // // // // //             <Helmet>
// // // // // // // // // //                 <title>{metadatos.title}</title>
// // // // // // // // // //             </Helmet>

// // // // // // // // // //             <Header />

// // // // // // // // // //             <main>
// // // // // // // // // //                 <div className='block-container'>
// // // // // // // // // //                     <section className='block-content'>
// // // // // // // // // //                         <div className='category-page-container'>
// // // // // // // // // //                             <div className='category-page-left'>
// // // // // // // // // //                                 <div className="filter">
// // // // // // // // // //                                     <p className="filter-name">Precios:</p>
// // // // // // // // // //                                     <input
// // // // // // // // // //                                         type="range"
// // // // // // // // // //                                         min={rangoPreciosMaximos[0]}
// // // // // // // // // //                                         max={rangoPreciosMaximos[1]}
// // // // // // // // // //                                         value={rangoPrecios[0]}
// // // // // // // // // //                                         onChange={(e) => handleCambioRangoPrecios([Number(e.target.value), rangoPrecios[1]])}
// // // // // // // // // //                                     />
// // // // // // // // // //                                     <input
// // // // // // // // // //                                         type="range"
// // // // // // // // // //                                         min={rangoPreciosMaximos[0]}
// // // // // // // // // //                                         max={rangoPreciosMaximos[1]}
// // // // // // // // // //                                         value={rangoPrecios[1]}
// // // // // // // // // //                                         onChange={(e) => handleCambioRangoPrecios([rangoPrecios[0], Number(e.target.value)])}
// // // // // // // // // //                                     />
// // // // // // // // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${rangoPrecios[1]}`}</p>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 {filtros.map((filtro) => (
// // // // // // // // // //                                     <div className='filter' key={`filtro-${filtro.nombre}`}>
// // // // // // // // // //                                         <p className='filter-name'>{filtro.titulo}:</p>
// // // // // // // // // //                                         <ul>
// // // // // // // // // //                                             {filtro.lista.map((opcion) => (
// // // // // // // // // //                                                 <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
// // // // // // // // // //                                                     <input
// // // // // // // // // //                                                         type='checkbox'
// // // // // // // // // //                                                         checked={filtrosSeleccionados[filtro.nombre]?.has(opcion.nombre.toLowerCase().replace(/\s+/g, "-")) || false}
// // // // // // // // // //                                                         onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
// // // // // // // // // //                                                     />
// // // // // // // // // //                                                     <label>{opcion.nombre}</label>
// // // // // // // // // //                                                 </li>
// // // // // // // // // //                                             ))}
// // // // // // // // // //                                         </ul>
// // // // // // // // // //                                     </div>
// // // // // // // // // //                                 ))}
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div className='category-page-right'> 
// // // // // // // // // //                                  {productosFiltrados.length > 0 ? (
// // // // // // // // // //                                      <div className='category-page-products'> 
// // // // // // // // // //                                          {productosFiltrados.map(producto => { 
// // // // // // // // // //                                              const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
// // // // // // // // // //                                              return( 
// // // // // // // // // //                                                  <a href={producto.ruta} className='product-card' title={producto.nombre} key={uuidv4()}> 
// // // // // // // // // //                                                      <div className='product-card-images'> 
// // // // // // // // // //                                                          {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>} 
// // // // // // // // // //                                                          <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} /> 
// // // // // // // // // //                                                      </div> 
// // // // // // // // // //                                                      <div className="product-card-content"> 
// // // // // // // // // //                                                          <span className='product-card-brand'>KAMAS</span> 
// // // // // // // // // //                                                          <h4 className='product-card-name'>{producto.nombre}</h4> 
// // // // // // // // // //                                                          <div className='product-card-prices'> 
// // // // // // // // // //                                                          <span className='product-card-normal-price'>S/.{producto.precioNormal}</span> 
// // // // // // // // // //                                                              <span className='product-card-sale-price'>S/.{producto.precioVenta}</span> 
// // // // // // // // // //                                                          </div> 
// // // // // // // // // //                                                      </div> 
// // // // // // // // // //                                                  </a> 
// // // // // // // // // //                                              ); 
// // // // // // // // // //                                          })} 
// // // // // // // // // //                                      </div>
// // // // // // // // // //                                  ) : (
// // // // // // // // // //                                      <p>No se encontraron productos.</p>
// // // // // // // // // //                                  )}
// // // // // // // // // //                              </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </section>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </main>

// // // // // // // // // //             <Footer />
// // // // // // // // // //         </>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // // // export default PaginaDeCategoria;

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import { useParams, useSearchParams } from 'react-router-dom';
// // // // // // // // // import { Helmet } from 'react-helmet-async';
// // // // // // // // // import { v4 as uuidv4 } from 'uuid';

// // // // // // // // // import Header from '../../Componentes/Header/Header';
// // // // // // // // // import Footer from '../../Componentes/Footer/Footer';

// // // // // // // // // import './PaginaDeCategoria.css';

// // // // // // // // // function PaginaDeCategoria() {
// // // // // // // // //     const { categoria, subcategoria } = useParams();
// // // // // // // // //     const [searchParams, setSearchParams] = useSearchParams();
// // // // // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // // // // //     const [metadatos, setMetadatos] = useState({ title: '', description: '' });
// // // // // // // // //     const [productos, setProductos] = useState([]);
// // // // // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // // // // //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// // // // // // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // // // // //             .then(response => response.json())
// // // // // // // // //             .then(data => setMetadatos(data || { title: '', description: '' }))
// // // // // // // // //             .catch(error => console.error('Error cargando metadatos:', error));

// // // // // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // // // // //             .then(response => response.json())
// // // // // // // // //             .then(data => setFiltros(Array.isArray(data) ? data : []))
// // // // // // // // //             .catch(() => setFiltros([]));

// // // // // // // // //         if (subcategoria) {
// // // // // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // //                 .then(response => response.json())
// // // // // // // // //                 .then(data => {
// // // // // // // // //                     setProductos(data.productos || []);
// // // // // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // // // // //                 })
// // // // // // // // //                 .catch(() => {
// // // // // // // // //                     setProductos([]);
// // // // // // // // //                     setProductosFiltrados([]);
// // // // // // // // //                 });
// // // // // // // // //         } else {
// // // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // // // // //                 .then(response => response.json())
// // // // // // // // //                 .then(async (data) => {
// // // // // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // // // // //                     const promesas = data.subcategorias.map(subcat => {
// // // // // // // // //                         const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // // //                         return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // // //                             .then(response => response.json())
// // // // // // // // //                             .then(data => data.productos || [])
// // // // // // // // //                             .catch(() => []);
// // // // // // // // //                     });

// // // // // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // // // // //                     setProductos(todosLosProductos);
// // // // // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // // // // //                 })
// // // // // // // // //                 .catch(() => setProductos([]));
// // // // // // // // //         }
// // // // // // // // //     }, [categoria, subcategoria]);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (productos.length > 0) {
// // // // // // // // //             const precios = productos.map(producto => producto.precioVenta);
// // // // // // // // //             const precioMin = Math.min(...precios);
// // // // // // // // //             const precioMax = Math.max(...precios);
// // // // // // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // // // // // //         }
// // // // // // // // //     }, [productos]);

// // // // // // // // //     const handleCambioRango = (event) => {
// // // // // // // // //         const nuevoValor = event.target.value;
// // // // // // // // //         const nuevoRango = [rangoPrecios[0], Number(nuevoValor)];

// // // // // // // // //         setRangoPrecios(nuevoRango);

// // // // // // // // //         const productosFiltradosPorPrecio = productos.filter(producto => 
// // // // // // // // //             producto.precioVenta >= nuevoRango[0] && producto.precioVenta <= nuevoRango[1]
// // // // // // // // //         );
// // // // // // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <>
// // // // // // // // //             <Helmet>
// // // // // // // // //                 <title>{metadatos.title}</title>
// // // // // // // // //             </Helmet>

// // // // // // // // //             <Header />

// // // // // // // // //             <main>
// // // // // // // // //                 <div className='block-container'>
// // // // // // // // //                     <section className='block-content'>
// // // // // // // // //                         <div className='category-page-container'>
// // // // // // // // //                             <div className='category-page-left'>
// // // // // // // // //                                 <div className="filter">
// // // // // // // // //                                     <p className="filter-name">Precios:</p>
// // // // // // // // //                                     <input
// // // // // // // // //                                         type="range"
// // // // // // // // //                                         min={rangoPrecios[0]}
// // // // // // // // //                                         max={rangoPrecios[1]}
// // // // // // // // //                                         value={rangoPrecios[1]}
// // // // // // // // //                                         onChange={handleCambioRango}
// // // // // // // // //                                         className="price-slider"
// // // // // // // // //                                     />
// // // // // // // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${rangoPrecios[1]}`}</p>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 {filtros.map((filtro) => (
// // // // // // // // //                                     <div className='filter' key={`filtro-${filtro.nombre}`}>
// // // // // // // // //                                         <p className='filter-name'>{filtro.titulo}:</p>
// // // // // // // // //                                         <ul>
// // // // // // // // //                                             {filtro.lista.map((opcion) => (
// // // // // // // // //                                                 <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
// // // // // // // // //                                                     <input
// // // // // // // // //                                                         type='checkbox'
// // // // // // // // //                                                         checked={filtrosSeleccionados[filtro.nombre]?.has(opcion.nombre.toLowerCase().replace(/\s+/g, "-")) || false}
// // // // // // // // //                                                         onChange={() => console.log("Filtro cambiado: ", filtro.nombre, opcion.nombre)}
// // // // // // // // //                                                         />
// // // // // // // // //                                                     <label>{opcion.nombre}</label>
// // // // // // // // //                                                 </li>
// // // // // // // // //                                             ))}
// // // // // // // // //                                         </ul>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 ))}
// // // // // // // // //                             </div>
// // // // // // // // //                             <div className='category-page-right'> 
// // // // // // // // //                                  {productosFiltrados.length > 0 ? (
// // // // // // // // //                                      <div className='category-page-products'> 
// // // // // // // // //                                          {productosFiltrados.map(producto => { 
// // // // // // // // //                                              const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
// // // // // // // // //                                              return( 
// // // // // // // // //                                                  <a href={producto.ruta} className='product-card' title={producto.nombre} key={uuidv4()}> 
// // // // // // // // //                                                      <div className='product-card-images'> 
// // // // // // // // //                                                          {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>} 
// // // // // // // // //                                                          <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} /> 
// // // // // // // // //                                                      </div> 
// // // // // // // // //                                                      <div className="product-card-content"> 
// // // // // // // // //                                                          <span className='product-card-brand'>KAMAS</span> 
// // // // // // // // //                                                          <h4 className='product-card-name'>{producto.nombre}</h4> 
// // // // // // // // //                                                          <div className='product-card-prices'> 
// // // // // // // // //                                                              <span className='product-card-normal-price'>S/.{producto.precioNormal}</span> 
// // // // // // // // //                                                              <span className='product-card-sale-price'>S/.{producto.precioVenta}</span> 
// // // // // // // // //                                                          </div> 
// // // // // // // // //                                                      </div> 
// // // // // // // // //                                                  </a> 
// // // // // // // // //                                              ); 
// // // // // // // // //                                          })} 
// // // // // // // // //                                      </div>
// // // // // // // // //                                  ) : (
// // // // // // // // //                                      <p>No se encontraron productos.</p>
// // // // // // // // //                                  )}
// // // // // // // // //                              </div>
// // // // // // // // //                         </div>
// // // // // // // // //                     </section>
// // // // // // // // //                 </div>
// // // // // // // // //             </main>

// // // // // // // // //             <Footer />
// // // // // // // // //         </>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // // export default PaginaDeCategoria;

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // // import { Helmet } from 'react-helmet-async';
// // // // // // // // import { v4 as uuidv4 } from 'uuid';

// // // // // // // // import Header from '../../Componentes/Header/Header';
// // // // // // // // import Footer from '../../Componentes/Footer/Footer';

// // // // // // // // import './PaginaDeCategoria.css';

// // // // // // // // function PaginaDeCategoria() {
// // // // // // // //     const { categoria, subcategoria } = useParams();
// // // // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // // // //     const [metadatos, setMetadatos] = useState({ title: '', description: '' });
// // // // // // // //     const [productos, setProductos] = useState([]);
// // // // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // // // //             .then(response => response.json())
// // // // // // // //             .then(data => setMetadatos(data || { title: '', description: '' }))
// // // // // // // //             .catch(error => console.error('Error cargando metadatos:', error));

// // // // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // // // //             .then(response => response.json())
// // // // // // // //             .then(data => setFiltros(Array.isArray(data) ? data : []))
// // // // // // // //             .catch(() => setFiltros([]));

// // // // // // // //         if (subcategoria) {
// // // // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // //                 .then(response => response.json())
// // // // // // // //                 .then(data => {
// // // // // // // //                     setProductos(data.productos || []);
// // // // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // // // //                 })
// // // // // // // //                 .catch(() => {
// // // // // // // //                     setProductos([]);
// // // // // // // //                     setProductosFiltrados([]);
// // // // // // // //                 });
// // // // // // // //         } else {
// // // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // // // //                 .then(response => response.json())
// // // // // // // //                 .then(async (data) => {
// // // // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // // // //                     const promesas = data.subcategorias.map(subcat => {
// // // // // // // //                         const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // // //                         return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // // //                             .then(response => response.json())
// // // // // // // //                             .then(data => data.productos || [])
// // // // // // // //                             .catch(() => []);
// // // // // // // //                     });

// // // // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // // // //                     setProductos(todosLosProductos);
// // // // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // // // //                 })
// // // // // // // //                 .catch(() => setProductos([]));
// // // // // // // //         }
// // // // // // // //     }, [categoria, subcategoria]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (productos.length > 0) {
// // // // // // // //             const precios = productos.map(producto => producto.precioVenta);
// // // // // // // //             const precioMin = Math.min(...precios);
// // // // // // // //             const precioMax = Math.max(...precios);
// // // // // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // // // // //         }
// // // // // // // //     }, [productos]);

// // // // // // // //     const handleCambioRango = (event) => {
// // // // // // // //         const nuevoValor = Number(event.target.value);
// // // // // // // //         setRangoPrecios([rangoPrecios[0], nuevoValor]);

// // // // // // // //         const productosFiltradosPorPrecio = productos.filter(producto =>
// // // // // // // //             producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= nuevoValor
// // // // // // // //         );
// // // // // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <>
// // // // // // // //             <Helmet>
// // // // // // // //                 <title>{metadatos.title}</title>
// // // // // // // //             </Helmet>

// // // // // // // //             <Header />

// // // // // // // //             <main>
// // // // // // // //                 <div className='block-container'>
// // // // // // // //                     <section className='block-content'>
// // // // // // // //                         <div className='category-page-container'>
// // // // // // // //                             <div className='category-page-left'>
// // // // // // // //                                 <div className="filter">
// // // // // // // //                                     <p className="filter-name">Precios:</p>
// // // // // // // //                                     <input
// // // // // // // //                                         type="range"
// // // // // // // //                                         min={rangoPrecios[0]}
// // // // // // // //                                         max={rangoPrecios[1]}
// // // // // // // //                                         value={rangoPrecios[1]}
// // // // // // // //                                         onChange={handleCambioRango}
// // // // // // // //                                         className="price-slider"
// // // // // // // //                                     />
// // // // // // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${rangoPrecios[1]}`}</p>
// // // // // // // //                                 </div>
// // // // // // // //                             </div>
// // // // // // // //                             <div className='category-page-right'> 
// // // // // // // //                                 {productosFiltrados.length > 0 ? (
// // // // // // // //                                     <div className='category-page-products'> 
// // // // // // // //                                         {productosFiltrados.map(producto => { 
// // // // // // // //                                             const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
// // // // // // // //                                             return( 
// // // // // // // //                                                 <a href={producto.ruta} className='product-card' title={producto.nombre} key={uuidv4()}> 
// // // // // // // //                                                     <div className='product-card-images'> 
// // // // // // // //                                                         {descuento > 0 && <span className='product-card-discount'>-{descuento}%</span>} 
// // // // // // // //                                                         <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} /> 
// // // // // // // //                                                     </div> 
// // // // // // // //                                                     <div className="product-card-content"> 
// // // // // // // //                                                         <span className='product-card-brand'>KAMAS</span> 
// // // // // // // //                                                         <h4 className='product-card-name'>{producto.nombre}</h4> 
// // // // // // // //                                                         <div className='product-card-prices'> 
// // // // // // // //                                                             <span className='product-card-normal-price'>S/.{producto.precioNormal}</span> 
// // // // // // // //                                                             <span className='product-card-sale-price'>S/.{producto.precioVenta}</span> 
// // // // // // // //                                                         </div> 
// // // // // // // //                                                     </div> 
// // // // // // // //                                                 </a> 
// // // // // // // //                                             ); 
// // // // // // // //                                         })} 
// // // // // // // //                                     </div>
// // // // // // // //                                 ) : (
// // // // // // // //                                     <p>No se encontraron productos.</p>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         </div>
// // // // // // // //                     </section>
// // // // // // // //                 </div>
// // // // // // // //             </main>

// // // // // // // //             <Footer />
// // // // // // // //         </>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // export default PaginaDeCategoria;

// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { useParams } from "react-router-dom";
// // // // // // // import { Helmet } from "react-helmet-async";
// // // // // // // import { v4 as uuidv4 } from "uuid";

// // // // // // // import Header from "../../Componentes/Header/Header";
// // // // // // // import Footer from "../../Componentes/Footer/Footer";

// // // // // // // import "./PaginaDeCategoria.css";

// // // // // // // function PaginaDeCategoria() {
// // // // // // //     const { categoria, subcategoria } = useParams();
// // // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // // //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// // // // // // //     const [productos, setProductos] = useState([]);
// // // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]); // Mínimo y máximo seleccionados

// // // // // // //     // Carga los datos iniciales de filtros, metadatos y productos
// // // // // // //     useEffect(() => {
// // // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // // //             .then((response) => response.json())
// // // // // // //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// // // // // // //             .catch((error) => console.error("Error cargando metadatos:", error));

// // // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // // //             .then((response) => response.json())
// // // // // // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // // // // // //             .catch(() => setFiltros([]));

// // // // // // //         if (subcategoria) {
// // // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // // //                 .then((response) => response.json())
// // // // // // //                 .then((data) => {
// // // // // // //                     setProductos(data.productos || []);
// // // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // // //                 })
// // // // // // //                 .catch(() => {
// // // // // // //                     setProductos([]);
// // // // // // //                     setProductosFiltrados([]);
// // // // // // //                 });
// // // // // // //         } else {
// // // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // // //                 .then((response) => response.json())
// // // // // // //                 .then(async (data) => {
// // // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // // //                     const promesas = data.subcategorias.map((subcat) => {
// // // // // // //                         const subcatNombre = subcat.subcategoria
// // // // // // //                             .toLowerCase()
// // // // // // //                             .replace(/\s+/g, "-");
// // // // // // //                         return fetch(
// // // // // // //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// // // // // // //                         )
// // // // // // //                             .then((response) => response.json())
// // // // // // //                             .then((data) => data.productos || [])
// // // // // // //                             .catch(() => []);
// // // // // // //                     });

// // // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // // //                     setProductos(todosLosProductos);
// // // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // // //                 })
// // // // // // //                 .catch(() => setProductos([]));
// // // // // // //         }
// // // // // // //     }, [categoria, subcategoria]);

// // // // // // //     // Configura el rango de precios inicial
// // // // // // //     useEffect(() => {
// // // // // // //         if (productos.length > 0) {
// // // // // // //             const precios = productos.map((producto) => producto.precioVenta);
// // // // // // //             const precioMin = Math.min(...precios);
// // // // // // //             const precioMax = Math.max(...precios);
// // // // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // // // //         }
// // // // // // //     }, [productos]);

// // // // // // //     // Filtra los productos según el rango de precios
// // // // // // //     const handleCambioRango = (event) => {
// // // // // // //         const nuevoValor = Number(event.target.value);
// // // // // // //         const esDeslizadorInferior = event.target.name === "inferior"; // Identifica qué deslizador se movió

// // // // // // //         const nuevoRango = esDeslizadorInferior
// // // // // // //             ? [nuevoValor, rangoPrecios[1]] // Actualiza el mínimo
// // // // // // //             : [rangoPrecios[0], nuevoValor]; // Actualiza el máximo

// // // // // // //         setRangoPrecios(nuevoRango);

// // // // // // //         const productosFiltradosPorPrecio = productos.filter(
// // // // // // //             (producto) =>
// // // // // // //                 producto.precioVenta >= nuevoRango[0] &&
// // // // // // //                 producto.precioVenta <= nuevoRango[1]
// // // // // // //         );
// // // // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // // // //     };

// // // // // // //     // Manejador para los filtros estándar
// // // // // // //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// // // // // // //         console.log("Cambió el filtro:", categoriaFiltro, opcion); // Depuración
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <>
// // // // // // //             <Helmet>
// // // // // // //                 <title>{metadatos.title}</title>
// // // // // // //             </Helmet>

// // // // // // //             <Header />

// // // // // // //             <main>
// // // // // // //                 <div className="block-container">
// // // // // // //                     <section className="block-content">
// // // // // // //                         <div className="category-page-container">
// // // // // // //                             <div className="category-page-left">
// // // // // // //                                 <div className="filter">
// // // // // // //                                     <div className="filter-range">
// // // // // // //                                         <p className="filter-name">Precios:</p>
// // // // // // //                                         <input
// // // // // // //                                             type="range"
// // // // // // //                                             name="inferior"
// // // // // // //                                             min={rangoPrecios[0]}
// // // // // // //                                             max={rangoPrecios[1]}
// // // // // // //                                             value={rangoPrecios[0]}
// // // // // // //                                             onChange={handleCambioRango}
// // // // // // //                                             className="price-slider"
// // // // // // //                                         />
// // // // // // //                                         <input
// // // // // // //                                             type="range"
// // // // // // //                                             name="superior"
// // // // // // //                                             min={rangoPrecios[0]}
// // // // // // //                                             max={rangoPrecios[1]}
// // // // // // //                                             value={rangoPrecios[1]}
// // // // // // //                                             onChange={handleCambioRango}
// // // // // // //                                             className="price-slider"
// // // // // // //                                         />
// // // // // // //                                         <p>{`S/ ${rangoPrecios[0]} – S/ ${rangoPrecios[1]}`}</p>
// // // // // // //                                     </div>
// // // // // // //                                 </div>
// // // // // // //                                 {filtros.map((filtro) => (
// // // // // // //                                     <div
// // // // // // //                                         className="filter"
// // // // // // //                                         key={`filtro-${filtro.nombre}`}
// // // // // // //                                     >
// // // // // // //                                         <p className="filter-name">
// // // // // // //                                             {filtro.titulo}:
// // // // // // //                                         </p>
// // // // // // //                                         <ul>
// // // // // // //                                             {filtro.lista.map((opcion) => (
// // // // // // //                                                 <li
// // // // // // //                                                     key={`opcion-${filtro.nombre}-${opcion.nombre}`}
// // // // // // //                                                 >
// // // // // // //                                                     <input
// // // // // // //                                                         type="checkbox"
// // // // // // //                                                         onChange={() =>
// // // // // // //                                                             handleFiltroChange(
// // // // // // //                                                                 filtro.nombre,
// // // // // // //                                                                 opcion.nombre
// // // // // // //                                                             )
// // // // // // //                                                         }
// // // // // // //                                                     />
// // // // // // //                                                     <label>{opcion.nombre}</label>
// // // // // // //                                                 </li>
// // // // // // //                                             ))}
// // // // // // //                                         </ul>
// // // // // // //                                     </div>
// // // // // // //                                 ))}
// // // // // // //                             </div>
// // // // // // //                             <div className="category-page-right">
// // // // // // //                                 {productosFiltrados.length > 0 ? (
// // // // // // //                                     <div className="category-page-products">
// // // // // // //                                         {productosFiltrados.map((producto) => {
// // // // // // //                                             const descuento = Math.round(
// // // // // // //                                                 ((producto.precioNormal -
// // // // // // //                                                     producto.precioVenta) *
// // // // // // //                                                     100) /
// // // // // // //                                                     producto.precioNormal
// // // // // // //                                             );
// // // // // // //                                             return (
// // // // // // //                                                 <a
// // // // // // //                                                     href={producto.ruta}
// // // // // // //                                                     className="product-card"
// // // // // // //                                                     title={producto.nombre}
// // // // // // //                                                     key={uuidv4()}
// // // // // // //                                                 >
// // // // // // //                                                     <div className="product-card-images">
// // // // // // //                                                         {descuento > 0 && (
// // // // // // //                                                             <span className="product-card-discount">
// // // // // // //                                                                 -{descuento}%
// // // // // // //                                                             </span>
// // // // // // //                                                         )}
// // // // // // //                                                         <img
// // // // // // //                                                             src={`${producto.fotos}/1.jpg`}
// // // // // // //                                                             alt={producto.nombre}
// // // // // // //                                                         />
// // // // // // //                                                     </div>
// // // // // // //                                                     <div className="product-card-content">
// // // // // // //                                                         <span className="product-card-brand">
// // // // // // //                                                             KAMAS
// // // // // // //                                                         </span>
// // // // // // //                                                         <h4 className="product-card-name">
// // // // // // //                                                             {producto.nombre}
// // // // // // //                                                         </h4>
// // // // // // //                                                         <div className="product-card-prices">
// // // // // // //                                                             <span className="product-card-normal-price">
// // // // // // //                                                                 S/.
// // // // // // //                                                                 {
// // // // // // //                                                                     producto.precioNormal
// // // // // // //                                                                 }
// // // // // // //                                                             </span>
// // // // // // //                                                             <span className="product-card-sale-price">
// // // // // // //                                                                 S/.
// // // // // // //                                                                 {
// // // // // // //                                                                     producto.precioVenta
// // // // // // //                                                                 }
// // // // // // //                                                             </span>
// // // // // // //                                                         </div>
// // // // // // //                                                     </div>
// // // // // // //                                                 </a>
// // // // // // //                                             );
// // // // // // //                                         })}
// // // // // // //                                     </div>
// // // // // // //                                 ) : (
// // // // // // //                                     <p>No se encontraron productos.</p>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </section>
// // // // // // //                 </div>
// // // // // // //             </main>

// // // // // // //             <Footer />
// // // // // // //         </>
// // // // // // //     );
// // // // // // // }

// // // // // // // export default PaginaDeCategoria;

// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useParams } from "react-router-dom";
// // // // // // import { Helmet } from "react-helmet-async";
// // // // // // import { v4 as uuidv4 } from "uuid";

// // // // // // import Header from "../../Componentes/Header/Header";
// // // // // // import Footer from "../../Componentes/Footer/Footer";

// // // // // // import "./PaginaDeCategoria.css";

// // // // // // function PaginaDeCategoria() {
// // // // // //     const { categoria, subcategoria } = useParams();
// // // // // //     const [filtros, setFiltros] = useState([]);
// // // // // //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// // // // // //     const [productos, setProductos] = useState([]);
// // // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]); // Rango mínimo y máximo seleccionados
// // // // // //     const [valorDeslizador, setValorDeslizador] = useState(0); // Posición actual del deslizador

// // // // // //     // Carga los datos iniciales
// // // // // //     useEffect(() => {
// // // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // // //             .then((response) => response.json())
// // // // // //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// // // // // //             .catch((error) => console.error("Error cargando metadatos:", error));

// // // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // // //             .then((response) => response.json())
// // // // // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // // // // //             .catch(() => setFiltros([]));

// // // // // //         if (subcategoria) {
// // // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // // //                 .then((response) => response.json())
// // // // // //                 .then((data) => {
// // // // // //                     setProductos(data.productos || []);
// // // // // //                     setProductosFiltrados(data.productos || []);
// // // // // //                 })
// // // // // //                 .catch(() => {
// // // // // //                     setProductos([]);
// // // // // //                     setProductosFiltrados([]);
// // // // // //                 });
// // // // // //         } else {
// // // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // // //                 .then((response) => response.json())
// // // // // //                 .then(async (data) => {
// // // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // // //                     const promesas = data.subcategorias.map((subcat) => {
// // // // // //                         const subcatNombre = subcat.subcategoria
// // // // // //                             .toLowerCase()
// // // // // //                             .replace(/\s+/g, "-");
// // // // // //                         return fetch(
// // // // // //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// // // // // //                         )
// // // // // //                             .then((response) => response.json())
// // // // // //                             .then((data) => data.productos || [])
// // // // // //                             .catch(() => []);
// // // // // //                     });

// // // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // // //                     setProductos(todosLosProductos);
// // // // // //                     setProductosFiltrados(todosLosProductos);
// // // // // //                 })
// // // // // //                 .catch(() => setProductos([]));
// // // // // //         }
// // // // // //     }, [categoria, subcategoria]);

// // // // // //     // Configura el rango inicial basado en los precios de los productos
// // // // // //     useEffect(() => {
// // // // // //         if (productos.length > 0) {
// // // // // //             const precios = productos.map((producto) => producto.precioVenta);
// // // // // //             const precioMin = Math.min(...precios);
// // // // // //             const precioMax = Math.max(...precios);
// // // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // // //             setValorDeslizador(precioMax); // Valor inicial del deslizador
// // // // // //         }
// // // // // //     }, [productos]);

// // // // // //     // Maneja el movimiento del deslizador
// // // // // //     const handleDeslizadorChange = (event) => {
// // // // // //         const nuevoValor = Number(event.target.dataset.valor);
// // // // // //         setValorDeslizador(nuevoValor);

// // // // // //         const productosFiltradosPorPrecio = productos.filter(
// // // // // //             (producto) =>
// // // // // //                 producto.precioVenta >= rangoPrecios[0] &&
// // // // // //                 producto.precioVenta <= nuevoValor
// // // // // //         );
// // // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // // //     };

// // // // // //     return (
// // // // // //         <>
// // // // // //             <Helmet>
// // // // // //                 <title>{metadatos.title}</title>
// // // // // //             </Helmet>

// // // // // //             <Header />

// // // // // //             <main>
// // // // // //                 <div className="block-container">
// // // // // //                     <section className="block-content">
// // // // // //                         <div className="category-page-container">
// // // // // //                             <div className="category-page-left">
// // // // // //                                 <div className="filter">
// // // // // //                                     <p className="filter-name">Precios:</p>
// // // // // //                                     <div
// // // // // //                                         className="custom-slider"
// // // // // //                                         onClick={handleDeslizadorChange}
// // // // // //                                     >
// // // // // //                                         <span
// // // // // //                                             className="slider-track"
// // // // // //                                             style={{
// // // // // //                                                 width: `${((valorDeslizador -
// // // // // //                                                     rangoPrecios[0]) /
// // // // // //                                                     (rangoPrecios[1] -
// // // // // //                                                         rangoPrecios[0])) *
// // // // // //                                                     100}%`,
// // // // // //                                             }}
// // // // // //                                         ></span>
// // // // // //                                         <span
// // // // // //                                             className="slider-thumb"
// // // // // //                                             data-valor={valorDeslizador}
// // // // // //                                             style={{
// // // // // //                                                 left: `${((valorDeslizador -
// // // // // //                                                     rangoPrecios[0]) /
// // // // // //                                                     (rangoPrecios[1] -
// // // // // //                                                         rangoPrecios[0])) *
// // // // // //                                                     100}%`,
// // // // // //                                             }}
// // // // // //                                         ></span>
// // // // // //                                     </div>
// // // // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorDeslizador}`}</p>
// // // // // //                                 </div>
// // // // // //                                 {filtros.map((filtro) => (
// // // // // //                                     <div
// // // // // //                                         className="filter"
// // // // // //                                         key={`filtro-${filtro.nombre}`}
// // // // // //                                     >
// // // // // //                                         <p className="filter-name">
// // // // // //                                             {filtro.titulo}:
// // // // // //                                         </p>
// // // // // //                                         <ul>
// // // // // //                                             {filtro.lista.map((opcion) => (
// // // // // //                                                 <li
// // // // // //                                                     key={`opcion-${filtro.nombre}-${opcion.nombre}`}
// // // // // //                                                 >
// // // // // //                                                     <input
// // // // // //                                                         type="checkbox"
// // // // // //                                                         onChange={() =>
// // // // // //                                                             console.log(
// // // // // //                                                                 "Filtro cambiado:",
// // // // // //                                                                 filtro.nombre,
// // // // // //                                                                 opcion.nombre
// // // // // //                                                             )
// // // // // //                                                         }
// // // // // //                                                     />
// // // // // //                                                     <label>{opcion.nombre}</label>
// // // // // //                                                 </li>
// // // // // //                                             ))}
// // // // // //                                         </ul>
// // // // // //                                     </div>
// // // // // //                                 ))}
// // // // // //                             </div>
// // // // // //                             <div className="category-page-right">
// // // // // //                                 {productosFiltrados.length > 0 ? (
// // // // // //                                     <div className="category-page-products">
// // // // // //                                         {productosFiltrados.map((producto) => {
// // // // // //                                             const descuento = Math.round(
// // // // // //                                                 ((producto.precioNormal -
// // // // // //                                                     producto.precioVenta) *
// // // // // //                                                     100) /
// // // // // //                                                     producto.precioNormal
// // // // // //                                             );
// // // // // //                                             return (
// // // // // //                                                 <a
// // // // // //                                                     href={producto.ruta}
// // // // // //                                                     className="product-card"
// // // // // //                                                     title={producto.nombre}
// // // // // //                                                     key={uuidv4()}
// // // // // //                                                 >
// // // // // //                                                     <div className="product-card-images">
// // // // // //                                                         {descuento > 0 && (
// // // // // //                                                             <span className="product-card-discount">
// // // // // //                                                                 -{descuento}%
// // // // // //                                                             </span>
// // // // // //                                                         )}
// // // // // //                                                         <img
// // // // // //                                                             src={`${producto.fotos}/1.jpg`}
// // // // // //                                                             alt={producto.nombre}
// // // // // //                                                         />
// // // // // //                                                     </div>
// // // // // //                                                     <div className="product-card-content">
// // // // // //                                                         <span className="product-card-brand">
// // // // // //                                                             KAMAS
// // // // // //                                                         </span>
// // // // // //                                                         <h4 className="product-card-name">
// // // // // //                                                             {producto.nombre}
// // // // // //                                                         </h4>
// // // // // //                                                         <div className="product-card-prices">
// // // // // //                                                             <span className="product-card-normal-price">
// // // // // //                                                                 S/.
// // // // // //                                                                 {
// // // // // //                                                                     producto.precioNormal
// // // // // //                                                                 }
// // // // // //                                                             </span>
// // // // // //                                                             <span className="product-card-sale-price">
// // // // // //                                                                 S/.
// // // // // //                                                                 {
// // // // // //                                                                     producto.precioVenta
// // // // // //                                                                 }
// // // // // //                                                             </span>
// // // // // //                                                         </div>
// // // // // //                                                     </div>
// // // // // //                                                 </a>
// // // // // //                                             );
// // // // // //                                         })}
// // // // // //                                     </div>
// // // // // //                                 ) : (
// // // // // //                                     <p>No se encontraron productos.</p>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </section>
// // // // // //                 </div>
// // // // // //             </main>

// // // // // //             <Footer />
// // // // // //         </>
// // // // // //     );
// // // // // // }

// // // // // // export default PaginaDeCategoria;

// // // // // import { useEffect, useState } from "react";
// // // // // import { useParams } from "react-router-dom";
// // // // // import { Helmet } from "react-helmet-async";
// // // // // import { v4 as uuidv4 } from "uuid";

// // // // // import Header from "../../Componentes/Header/Header";
// // // // // import Footer from "../../Componentes/Footer/Footer";

// // // // // import "./PaginaDeCategoria.css";

// // // // // function PaginaDeCategoria() {
// // // // //     const { categoria, subcategoria } = useParams();
// // // // //     const [filtros, setFiltros] = useState([]);
// // // // //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// // // // //     const [productos, setProductos] = useState([]);
// // // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // // // //     const [valorThumb, setValorThumb] = useState(0);

// // // // //     // Cargar datos iniciales
// // // // //     useEffect(() => {
// // // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // // //             .then((response) => response.json())
// // // // //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// // // // //             .catch((error) => console.error("Error cargando metadatos:", error));

// // // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // // //             .then((response) => response.json())
// // // // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // // // //             .catch(() => setFiltros([]));

// // // // //         if (subcategoria) {
// // // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // // //                 .then((response) => response.json())
// // // // //                 .then((data) => {
// // // // //                     setProductos(data.productos || []);
// // // // //                     setProductosFiltrados(data.productos || []);
// // // // //                 })
// // // // //                 .catch(() => {
// // // // //                     setProductos([]);
// // // // //                     setProductosFiltrados([]);
// // // // //                 });
// // // // //         } else {
// // // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // // //                 .then((response) => response.json())
// // // // //                 .then(async (data) => {
// // // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // // //                     const promesas = data.subcategorias.map((subcat) => {
// // // // //                         const subcatNombre = subcat.subcategoria
// // // // //                             .toLowerCase()
// // // // //                             .replace(/\s+/g, "-");
// // // // //                         return fetch(
// // // // //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// // // // //                         )
// // // // //                             .then((response) => response.json())
// // // // //                             .then((data) => data.productos || [])
// // // // //                             .catch(() => []);
// // // // //                     });

// // // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // // //                     setProductos(todosLosProductos);
// // // // //                     setProductosFiltrados(todosLosProductos);
// // // // //                 })
// // // // //                 .catch(() => setProductos([]));
// // // // //         }
// // // // //     }, [categoria, subcategoria]);

// // // // //     // Configurar rango de precios inicial
// // // // //     useEffect(() => {
// // // // //         if (productos.length > 0) {
// // // // //             const precios = productos.map((producto) => producto.precioVenta || 0);
// // // // //             const precioMin = Math.min(...precios);
// // // // //             const precioMax = Math.max(...precios);
// // // // //             setRangoPrecios([precioMin, precioMax]);
// // // // //             setValorThumb(precioMax); // Inicializa el thumb en el valor máximo
// // // // //         }
// // // // //     }, [productos]);

// // // // //     // Maneja el movimiento del thumb
// // // // //     const handleSliderChange = (event) => {
// // // // //         const sliderWidth = event.currentTarget.offsetWidth; // Ancho del slider
// // // // //         const clickX = event.nativeEvent.offsetX; // Posición X del clic
// // // // //         const nuevoValor =
// // // // //             rangoPrecios[0] +
// // // // //             ((rangoPrecios[1] - rangoPrecios[0]) * clickX) / sliderWidth;

// // // // //         const valorRedondeado = Math.round(nuevoValor); // Evita valores decimales
// // // // //         setValorThumb(valorRedondeado);

// // // // //         const productosFiltradosPorPrecio = productos.filter(
// // // // //             (producto) =>
// // // // //                 producto.precioVenta >= rangoPrecios[0] &&
// // // // //                 producto.precioVenta <= valorRedondeado
// // // // //         );
// // // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // // //     };

// // // // //     return (
// // // // //         <>
// // // // //             <Helmet>
// // // // //                 <title>{metadatos.title}</title>
// // // // //             </Helmet>

// // // // //             <Header />

// // // // //             <main>
// // // // //                 <div className="block-container">
// // // // //                     <section className="block-content">
// // // // //                         <div className="category-page-container">
// // // // //                             <div className="category-page-left">
// // // // //                                 <div className="filter">
// // // // //                                     <p className="filter-name">Precios:</p>
// // // // //                                     <div
// // // // //                                         className="custom-slider"
// // // // //                                         onClick={handleSliderChange}
// // // // //                                     >
// // // // //                                         <span className="slider-track"></span>
// // // // //                                         <span
// // // // //                                             className="slider-thumb"
// // // // //                                             style={{
// // // // //                                                 left: `${((valorThumb -
// // // // //                                                     rangoPrecios[0]) /
// // // // //                                                     (rangoPrecios[1] -
// // // // //                                                         rangoPrecios[0])) *
// // // // //                                                     100}%`,
// // // // //                                             }}
// // // // //                                         ></span>
// // // // //                                     </div>
// // // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             <div className="category-page-right">
// // // // //                                 {productosFiltrados.length > 0 ? (
// // // // //                                     <div className="category-page-products">
// // // // //                                         {productosFiltrados.map((producto) => {
// // // // //                                             const descuento = Math.round(
// // // // //                                                 ((producto.precioNormal -
// // // // //                                                     producto.precioVenta) *
// // // // //                                                     100) /
// // // // //                                                     producto.precioNormal
// // // // //                                             );
// // // // //                                             return (
// // // // //                                                 <a
// // // // //                                                     href={producto.ruta}
// // // // //                                                     className="product-card"
// // // // //                                                     title={producto.nombre}
// // // // //                                                     key={uuidv4()}
// // // // //                                                 >
// // // // //                                                     <div className="product-card-images">
// // // // //                                                         {descuento > 0 && (
// // // // //                                                             <span className="product-card-discount">
// // // // //                                                                 -{descuento}%
// // // // //                                                             </span>
// // // // //                                                         )}
// // // // //                                                         <img
// // // // //                                                             src={`${producto.fotos}/1.jpg`}
// // // // //                                                             alt={producto.nombre}
// // // // //                                                         />
// // // // //                                                     </div>
// // // // //                                                     <div className="product-card-content">
// // // // //                                                         <span className="product-card-brand">
// // // // //                                                             KAMAS
// // // // //                                                         </span>
// // // // //                                                         <h4 className="product-card-name">
// // // // //                                                             {producto.nombre}
// // // // //                                                         </h4>
// // // // //                                                         <div className="product-card-prices">
// // // // //                                                             <span className="product-card-normal-price">
// // // // //                                                                 S/.
// // // // //                                                                 {
// // // // //                                                                     producto.precioNormal
// // // // //                                                                 }
// // // // //                                                             </span>
// // // // //                                                             <span className="product-card-sale-price">
// // // // //                                                                 S/.
// // // // //                                                                 {
// // // // //                                                                     producto.precioVenta
// // // // //                                                                 }
// // // // //                                                             </span>
// // // // //                                                         </div>
// // // // //                                                     </div>
// // // // //                                                 </a>
// // // // //                                             );
// // // // //                                         })}
// // // // //                                     </div>
// // // // //                                 ) : (
// // // // //                                     <p>No se encontraron productos.</p>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </section>
// // // // //                 </div>
// // // // //             </main>

// // // // //             <Footer />
// // // // //         </>
// // // // //     );
// // // // // }

// // // // // export default PaginaDeCategoria;

// // // // import { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import { Helmet } from "react-helmet-async";
// // // // import { v4 as uuidv4 } from "uuid";

// // // // import Header from "../../Componentes/Header/Header";
// // // // import Footer from "../../Componentes/Footer/Footer";

// // // // import "./PaginaDeCategoria.css";

// // // // function PaginaDeCategoria() {
// // // //     const { categoria, subcategoria } = useParams();
// // // //     const [filtros, setFiltros] = useState([]);
// // // //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// // // //     const [productos, setProductos] = useState([]);
// // // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // // //     const [valorThumb, setValorThumb] = useState(0);
// // // //     const [arrastrando, setArrastrando] = useState(false);

// // // //     // Cargar datos iniciales
// // // //     useEffect(() => {
// // // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // // //             .then((response) => response.json())
// // // //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// // // //             .catch((error) => console.error("Error cargando metadatos:", error));

// // // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // // //             .then((response) => response.json())
// // // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // // //             .catch(() => setFiltros([]));

// // // //         if (subcategoria) {
// // // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // // //                 .then((response) => response.json())
// // // //                 .then((data) => {
// // // //                     setProductos(data.productos || []);
// // // //                     setProductosFiltrados(data.productos || []);
// // // //                 })
// // // //                 .catch(() => {
// // // //                     setProductos([]);
// // // //                     setProductosFiltrados([]);
// // // //                 });
// // // //         } else {
// // // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // // //                 .then((response) => response.json())
// // // //                 .then(async (data) => {
// // // //                     if (!Array.isArray(data.subcategorias)) return;

// // // //                     const promesas = data.subcategorias.map((subcat) => {
// // // //                         const subcatNombre = subcat.subcategoria
// // // //                             .toLowerCase()
// // // //                             .replace(/\s+/g, "-");
// // // //                         return fetch(
// // // //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// // // //                         )
// // // //                             .then((response) => response.json())
// // // //                             .then((data) => data.productos || [])
// // // //                             .catch(() => []);
// // // //                     });

// // // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // // //                     setProductos(todosLosProductos);
// // // //                     setProductosFiltrados(todosLosProductos);
// // // //                 })
// // // //                 .catch(() => setProductos([]));
// // // //         }
// // // //     }, [categoria, subcategoria]);

// // // //     // Configurar rango inicial basado en los precios de los productos
// // // //     useEffect(() => {
// // // //         if (productos.length > 0) {
// // // //             const precios = productos.map((producto) => producto.precioVenta || 0);
// // // //             const precioMin = Math.min(...precios);
// // // //             const precioMax = Math.max(...precios);
// // // //             setRangoPrecios([precioMin, precioMax]);
// // // //             setValorThumb(precioMax);
// // // //         }
// // // //     }, [productos]);

// // // //     // Inicia el arrastre
// // // //     const iniciarArrastre = (event) => {
// // // //         setArrastrando(true);
// // // //     };

// // // //     // Maneja el movimiento durante el arrastre
// // // //     const moverThumb = (event) => {
// // // //         if (!arrastrando) return;

// // // //         const slider = event.currentTarget;
// // // //         const sliderWidth = slider.offsetWidth;
// // // //         const sliderOffsetLeft = slider.getBoundingClientRect().left;
// // // //         const posicionX = event.clientX - sliderOffsetLeft;

// // // //         // Limitar posición dentro del rango del slider
// // // //         const porcentaje = Math.max(0, Math.min(1, posicionX / sliderWidth));
// // // //         const nuevoValor =
// // // //             rangoPrecios[0] + porcentaje * (rangoPrecios[1] - rangoPrecios[0]);

// // // //         const valorRedondeado = Math.round(nuevoValor);
// // // //         setValorThumb(valorRedondeado);

// // // //         const productosFiltradosPorPrecio = productos.filter(
// // // //             (producto) =>
// // // //                 producto.precioVenta >= rangoPrecios[0] &&
// // // //                 producto.precioVenta <= valorRedondeado
// // // //         );
// // // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // // //     };

// // // //     // Finaliza el arrastre
// // // //     const finalizarArrastre = () => {
// // // //         setArrastrando(false);
// // // //     };

// // // //     return (
// // // //         <>
// // // //             <Helmet>
// // // //                 <title>{metadatos.title}</title>
// // // //             </Helmet>

// // // //             <Header />

// // // //             <main>
// // // //                 <div className="block-container">
// // // //                     <section className="block-content">
// // // //                         <div className="category-page-container">
// // // //                             <div className="category-page-left">
// // // //                                 <div
// // // //                                     className="filter custom-slider"
// // // //                                     onMouseMove={moverThumb}
// // // //                                     onMouseUp={finalizarArrastre}
// // // //                                     onMouseLeave={finalizarArrastre}
// // // //                                 >
// // // //                                     <span className="slider-track"></span>
// // // //                                     <span
// // // //                                         className="slider-thumb"
// // // //                                         onMouseDown={iniciarArrastre}
// // // //                                         style={{
// // // //                                             left: `${((valorThumb - rangoPrecios[0]) /
// // // //                                                 (rangoPrecios[1] - rangoPrecios[0])) *
// // // //                                                 100}%`,
// // // //                                         }}
// // // //                                     ></span>
// // // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div className="category-page-right">
// // // //                                 {productosFiltrados.length > 0 ? (
// // // //                                     <div className="category-page-products">
// // // //                                         {productosFiltrados.map((producto) => {
// // // //                                             const descuento = Math.round(
// // // //                                                 ((producto.precioNormal -
// // // //                                                     producto.precioVenta) *
// // // //                                                     100) /
// // // //                                                     producto.precioNormal
// // // //                                             );
// // // //                                             return (
// // // //                                                 <a
// // // //                                                     href={producto.ruta}
// // // //                                                     className="product-card"
// // // //                                                     title={producto.nombre}
// // // //                                                     key={uuidv4()}
// // // //                                                 >
// // // //                                                     <div className="product-card-images">
// // // //                                                         {descuento > 0 && (
// // // //                                                             <span className="product-card-discount">
// // // //                                                                 -{descuento}%
// // // //                                                             </span>
// // // //                                                         )}
// // // //                                                         <img
// // // //                                                             src={`${producto.fotos}/1.jpg`}
// // // //                                                             alt={producto.nombre}
// // // //                                                         />
// // // //                                                     </div>
// // // //                                                     <div className="product-card-content">
// // // //                                                         <span className="product-card-brand">
// // // //                                                             KAMAS
// // // //                                                         </span>
// // // //                                                         <h4 className="product-card-name">
// // // //                                                             {producto.nombre}
// // // //                                                         </h4>
// // // //                                                         <div className="product-card-prices">
// // // //                                                             <span className="product-card-normal-price">
// // // //                                                                 S/.
// // // //                                                                 {
// // // //                                                                     producto.precioNormal
// // // //                                                                 }
// // // //                                                             </span>
// // // //                                                             <span className="product-card-sale-price">
// // // //                                                                 S/.
// // // //                                                                 {
// // // //                                                                     producto.precioVenta
// // // //                                                                 }
// // // //                                                             </span>
// // // //                                                         </div>
// // // //                                                     </div>
// // // //                                                 </a>
// // // //                                             );
// // // //                                         })}
// // // //                                     </div>
// // // //                                 ) : (
// // // //                                     <p>No se encontraron productos.</p>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>
// // // //                     </section>
// // // //                 </div>
// // // //             </main>

// // // //             <Footer />
// // // //         </>
// // // //     );
// // // // }

// // // // export default PaginaDeCategoria;

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { Helmet } from "react-helmet-async";
// // // import { v4 as uuidv4 } from "uuid";

// // // import Header from "../../Componentes/Header/Header";
// // // import Footer from "../../Componentes/Footer/Footer";

// // // import "./PaginaDeCategoria.css";

// // // function PaginaDeCategoria() {
// // //     const { categoria, subcategoria } = useParams();
// // //     const [filtros, setFiltros] = useState([]);
// // //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// // //     const [productos, setProductos] = useState([]);
// // //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // //     const [valorThumb, setValorThumb] = useState(0);
// // //     const [arrastrando, setArrastrando] = useState(false);

// // //     // Cargar datos iniciales
// // //     useEffect(() => {
// // //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// // //             .then((response) => response.json())
// // //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// // //             .catch((error) => console.error("Error cargando metadatos:", error));

// // //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// // //             .then((response) => response.json())
// // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // //             .catch(() => setFiltros([]));

// // //         if (subcategoria) {
// // //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// // //                 .then((response) => response.json())
// // //                 .then((data) => {
// // //                     setProductos(data.productos || []);
// // //                     setProductosFiltrados(data.productos || []);
// // //                 })
// // //                 .catch(() => {
// // //                     setProductos([]);
// // //                     setProductosFiltrados([]);
// // //                 });
// // //         } else {
// // //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// // //                 .then((response) => response.json())
// // //                 .then(async (data) => {
// // //                     if (!Array.isArray(data.subcategorias)) return;

// // //                     const promesas = data.subcategorias.map((subcat) => {
// // //                         const subcatNombre = subcat.subcategoria
// // //                             .toLowerCase()
// // //                             .replace(/\s+/g, "-");
// // //                         return fetch(
// // //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// // //                         )
// // //                             .then((response) => response.json())
// // //                             .then((data) => data.productos || [])
// // //                             .catch(() => []);
// // //                     });

// // //                     const productosPorSubcategoria = await Promise.all(promesas);
// // //                     const todosLosProductos = productosPorSubcategoria.flat();

// // //                     setProductos(todosLosProductos);
// // //                     setProductosFiltrados(todosLosProductos);
// // //                 })
// // //                 .catch(() => setProductos([]));
// // //         }
// // //     }, [categoria, subcategoria]);

// // //     // Configurar rango inicial basado en los precios de los productos
// // //     useEffect(() => {
// // //         if (productos.length > 0) {
// // //             const precios = productos.map((producto) => producto.precioVenta || 0);
// // //             const precioMin = Math.min(...precios);
// // //             const precioMax = Math.max(...precios);
// // //             setRangoPrecios([precioMin, precioMax]);
// // //             setValorThumb(precioMax);
// // //         }
// // //     }, [productos]);

// // //     // Manejo genérico de la posición del thumb
// // //     const calcularPosicion = (event, slider) => {
// // //         const sliderWidth = slider.offsetWidth;
// // //         const sliderOffsetLeft = slider.getBoundingClientRect().left;
// // //         const posicionX = Math.min(
// // //             Math.max(event.clientX - sliderOffsetLeft, 0),
// // //             sliderWidth
// // //         );

// // //         // Calcular el valor basado en la posición
// // //         const porcentaje = posicionX / sliderWidth;
// // //         return rangoPrecios[0] + porcentaje * (rangoPrecios[1] - rangoPrecios[0]);
// // //     };

// // //     // Maneja clic en la barra
// // //     const manejarClic = (event) => {
// // //         const slider = event.currentTarget;
// // //         const nuevoValor = calcularPosicion(event, slider);
// // //         actualizarProductos(nuevoValor);
// // //     };

// // //     // Maneja inicio del arrastre
// // //     const iniciarArrastre = () => {
// // //         setArrastrando(true);
// // //     };

// // //     // Maneja movimiento durante el arrastre
// // //     const moverThumb = (event) => {
// // //         if (!arrastrando) return;
// // //         const slider = event.currentTarget;
// // //         const nuevoValor = calcularPosicion(event, slider);
// // //         actualizarProductos(nuevoValor);
// // //     };

// // //     // Finaliza el arrastre
// // //     const finalizarArrastre = () => {
// // //         setArrastrando(false);
// // //     };

// // //     // Actualiza el valor del thumb y filtra productos
// // //     const actualizarProductos = (nuevoValor) => {
// // //         const valorRedondeado = Math.round(nuevoValor);
// // //         setValorThumb(valorRedondeado);

// // //         const productosFiltradosPorPrecio = productos.filter(
// // //             (producto) =>
// // //                 producto.precioVenta >= rangoPrecios[0] &&
// // //                 producto.precioVenta <= valorRedondeado
// // //         );
// // //         setProductosFiltrados(productosFiltradosPorPrecio);
// // //     };

// // //     return (
// // //         <>
// // //             <Helmet>
// // //                 <title>{metadatos.title}</title>
// // //             </Helmet>

// // //             <Header />

// // //             <main>
// // //                 <div className="block-container">
// // //                     <section className="block-content">
// // //                         <div className="category-page-container">
// // //                             <div className="category-page-left">
// // //                                 <div
// // //                                     className="custom-slider"
// // //                                     onClick={manejarClic}
// // //                                     onMouseMove={moverThumb}
// // //                                     onMouseUp={finalizarArrastre}
// // //                                     onMouseLeave={finalizarArrastre}
// // //                                 >
// // //                                     <span className="slider-track"></span>
// // //                                     <span
// // //                                         className="slider-thumb"
// // //                                         onMouseDown={iniciarArrastre}
// // //                                         style={{
// // //                                             left: `${((valorThumb - rangoPrecios[0]) /
// // //                                                 (rangoPrecios[1] - rangoPrecios[0])) *
// // //                                                 100}%`,
// // //                                         }}
// // //                                     ></span>
// // //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
// // //                                 </div>
// // //                             </div>
// // //                             <div className="category-page-right">
// // //                                 {productosFiltrados.length > 0 ? (
// // //                                     <div className="category-page-products">
// // //                                         {productosFiltrados.map((producto) => {
// // //                                             const descuento = Math.round(
// // //                                                 ((producto.precioNormal -
// // //                                                     producto.precioVenta) *
// // //                                                     100) /
// // //                                                     producto.precioNormal
// // //                                             );
// // //                                             return (
// // //                                                 <a
// // //                                                     href={producto.ruta}
// // //                                                     className="product-card"
// // //                                                     title={producto.nombre}
// // //                                                     key={uuidv4()}
// // //                                                 >
// // //                                                     <div className="product-card-images">
// // //                                                         {descuento > 0 && (
// // //                                                             <span className="product-card-discount">
// // //                                                                 -{descuento}%
// // //                                                             </span>
// // //                                                         )}
// // //                                                         <img
// // //                                                             src={`${producto.fotos}/1.jpg`}
// // //                                                             alt={producto.nombre}
// // //                                                         />
// // //                                                     </div>
// // //                                                     <div className="product-card-content">
// // //                                                         <span className="product-card-brand">
// // //                                                             KAMAS
// // //                                                         </span>
// // //                                                         <h4 className="product-card-name">
// // //                                                             {producto.nombre}
// // //                                                         </h4>
// // //                                                         <div className="product-card-prices">
// // //                                                             <span className="product-card-normal-price">
// // //                                                                 S/.
// // //                                                                 {
// // //                                                                     producto.precioNormal
// // //                                                                 }
// // //                                                             </span>
// // //                                                             <span className="product-card-sale-price">
// // //                                                                 S/.
// // //                                                                 {
// // //                                                                     producto.precioVenta
// // //                                                                 }
// // //                                                             </span>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </a>
// // //                                             );
// // //                                         })}
// // //                                     </div>
// // //                                 ) : (
// // //                                     <p>No se encontraron productos.</p>
// // //                                 )}
// // //                             </div>
// // //                         </div>
// // //                     </section>
// // //                 </div>
// // //             </main>

// // //             <Footer />
// // //         </>
// // //     );
// // // }

// // // export default PaginaDeCategoria;

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { Helmet } from "react-helmet-async";
// // import { v4 as uuidv4 } from "uuid";

// // import Header from "../../Componentes/Header/Header";
// // import Footer from "../../Componentes/Footer/Footer";

// // import "./PaginaDeCategoria.css";

// // function PaginaDeCategoria() {
// //     const { categoria, subcategoria } = useParams();
// //     const [filtros, setFiltros] = useState([]);
// //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// //     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
// //     const [productos, setProductos] = useState([]);
// //     const [productosFiltrados, setProductosFiltrados] = useState([]);
// //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// //     const [valorThumb, setValorThumb] = useState(0);
// //     const [arrastrando, setArrastrando] = useState(false);

// //     // Cargar datos iniciales
// //     useEffect(() => {
// //         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
// //             .then((response) => response.json())
// //             .then((data) => setMetadatos(data || { title: "", description: "" }))
// //             .catch((error) => console.error("Error cargando metadatos:", error));

// //         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
// //             .then((response) => response.json())
// //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// //             .catch(() => setFiltros([]));

// //         if (subcategoria) {
// //             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
// //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
// //                 .then((response) => response.json())
// //                 .then((data) => {
// //                     setProductos(data.productos || []);
// //                     setProductosFiltrados(data.productos || []);
// //                 })
// //                 .catch(() => {
// //                     setProductos([]);
// //                     setProductosFiltrados([]);
// //                 });
// //         } else {
// //             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
// //                 .then((response) => response.json())
// //                 .then(async (data) => {
// //                     if (!Array.isArray(data.subcategorias)) return;

// //                     const promesas = data.subcategorias.map((subcat) => {
// //                         const subcatNombre = subcat.subcategoria
// //                             .toLowerCase()
// //                             .replace(/\s+/g, "-");
// //                         return fetch(
// //                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
// //                         )
// //                             .then((response) => response.json())
// //                             .then((data) => data.productos || [])
// //                             .catch(() => []);
// //                     });

// //                     const productosPorSubcategoria = await Promise.all(promesas);
// //                     const todosLosProductos = productosPorSubcategoria.flat();

// //                     setProductos(todosLosProductos);
// //                     setProductosFiltrados(todosLosProductos);
// //                 })
// //                 .catch(() => setProductos([]));
// //         }
// //     }, [categoria, subcategoria]);

// //     // Configurar rango inicial basado en los precios de los productos
// //     useEffect(() => {
// //         if (productos.length > 0) {
// //             const precios = productos.map((producto) => producto.precioVenta || 0);
// //             const precioMin = Math.min(...precios);
// //             const precioMax = Math.max(...precios);
// //             setRangoPrecios([precioMin, precioMax]);
// //             setValorThumb(precioMax);
// //         }
// //     }, [productos]);

// //     // Manejo de cambios en los filtros
// //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// //         setFiltrosSeleccionados((prev) => {
// //             const nuevoEstado = { ...prev };
// //             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);

// //             if (opciones.has(opcion)) {
// //                 opciones.delete(opcion);
// //             } else {
// //                 opciones.add(opcion);
// //             }

// //             if (opciones.size > 0) {
// //                 nuevoEstado[categoriaFiltro] = opciones;
// //             } else {
// //                 delete nuevoEstado[categoriaFiltro];
// //             }

// //             filtrarProductos(nuevoEstado, valorThumb);
// //             return nuevoEstado;
// //         });
// //     };

// //     // Filtra productos según los filtros seleccionados y el rango de precios
// //     const filtrarProductos = (filtrosActuales, precioMaximo) => {
// //         const filtrados = productos.filter((producto) => {
// //             const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) => {
// //                 if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
// //                     return false;
// //                 }

// //                 const valorProducto = producto.detallesDelProducto[categoriaFiltro]
// //                     .toString()
// //                     .toLowerCase()
// //                     .replace(/\s+/g, "-");
// //                 return filtrosActuales[categoriaFiltro].has(valorProducto);
// //             });

// //             const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
// //             return cumpleFiltros && cumplePrecio;
// //         });

// //         setProductosFiltrados(filtrados);
// //     };

// //     // Manejo del clic y arrastre del thumb (similar al código anterior)
// //     const calcularPosicion = (event, slider) => {
// //         const sliderWidth = slider.offsetWidth;
// //         const sliderOffsetLeft = slider.getBoundingClientRect().left;
// //         const posicionX = Math.min(
// //             Math.max(event.clientX - sliderOffsetLeft, 0),
// //             sliderWidth
// //         );

// //         const porcentaje = posicionX / sliderWidth;
// //         return rangoPrecios[0] + porcentaje * (rangoPrecios[1] - rangoPrecios[0]);
// //     };

// //     const manejarClic = (event) => {
// //         const slider = event.currentTarget;
// //         const nuevoValor = calcularPosicion(event, slider);
// //         actualizarProductos(nuevoValor);
// //     };

// //     const iniciarArrastre = () => {
// //         setArrastrando(true);
// //     };

// //     const moverThumb = (event) => {
// //         if (!arrastrando) return;
// //         const slider = event.currentTarget;
// //         const nuevoValor = calcularPosicion(event, slider);
// //         actualizarProductos(nuevoValor);
// //     };

// //     const finalizarArrastre = () => {
// //         setArrastrando(false);
// //     };

// //     const actualizarProductos = (nuevoValor) => {
// //         const valorRedondeado = Math.round(nuevoValor);
// //         setValorThumb(valorRedondeado);
// //         filtrarProductos(filtrosSeleccionados, valorRedondeado);
// //     };

// //     return (
// //         <>
// //             <Helmet>
// //                 <title>{metadatos.title}</title>
// //             </Helmet>

// //             <Header />

// //             <main>
// //                 <div className="block-container">
// //                     <section className="block-content">
// //                         <div className="category-page-container">
// //                             <div className="category-page-left">
// //                                 <div
// //                                     className="filter custom-slider"
// //                                     onClick={manejarClic}
// //                                     onMouseMove={moverThumb}
// //                                     onMouseUp={finalizarArrastre}
// //                                     onMouseLeave={finalizarArrastre}
// //                                 >
// //                                     <span className="slider-track"></span>
// //                                     <span
// //                                         className="slider-thumb"
// //                                         onMouseDown={iniciarArrastre}
// //                                         style={{
// //                                             left: `${((valorThumb - rangoPrecios[0]) /
// //                                                 (rangoPrecios[1] - rangoPrecios[0])) *
// //                                                 100}%`,
// //                                         }}
// //                                     ></span>
// //                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
// //                                 </div>
// //                                 {filtros.map((filtro) => (
// //                                     <div className='filter' key={`filtro-${filtro.nombre}`}>
// //                                         <p className='filter-name'>{filtro.titulo}:</p>
// //                                         <ul>
// //                                             {filtro.lista.map((opcion) => (
// //                                                 <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
// //                                                     <input
// //                                                         type='checkbox'
// //                                                         checked={filtrosSeleccionados[filtro.nombre]?.has(opcion.nombre.toLowerCase().replace(/\s+/g, "-")) || false}
// //                                                         onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
// //                                                     />
// //                                                     <label>{opcion.nombre}</label>
// //                                                 </li>
// //                                             ))}
// //                                         </ul>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                             <div className="category-page-right">
// //                                 {productosFiltrados.length > 0 ? (
// //                                     <div className="category-page-products">
// //                                         {productosFiltrados.map((producto) => {
// //                                             const descuento = Math.round(
// //                                                 ((producto.precioNormal - producto.precioVenta) * 100) /
// //                                                     producto.precioNormal
// //                                             );
// //                                             return (
// //                                                 <a
// //                                                     href={producto.ruta}
// //                                                     className="product-card"
// //                                                     title={producto.nombre}
// //                                                     key={uuidv4()}
// //                                                 >
// //                                                     <div className="product-card-images">
// //                                                         {descuento > 0 && (
// //                                                             <span className="product-card-discount">
// //                                                                 -{descuento}%
// //                                                             </span>
// //                                                         )}
// //                                                         <img
// //                                                             src={`${producto.fotos}/1.jpg`}
// //                                                             alt={producto.nombre}
// //                                                         />
// //                                                     </div>
// //                                                     <div className="product-card-content">
// //                                                         <span className="product-card-brand">
// //                                                             KAMAS
// //                                                         </span>
// //                                                         <h4 className="product-card-name">
// //                                                             {producto.nombre}
// //                                                         </h4>
// //                                                         <div className="product-card-prices">
// //                                                             <span className="product-card-normal-price">
// //                                                                 S/.{producto.precioNormal}
// //                                                             </span>
// //                                                             <span className="product-card-sale-price">
// //                                                                 S/.{producto.precioVenta}
// //                                                             </span>
// //                                                         </div>
// //                                                     </div>
// //                                                 </a>
// //                                             );
// //                                         })}
// //                                     </div>
// //                                 ) : (
// //                                     <p>No se encontraron productos.</p>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </section>
// //                 </div>
// //             </main>

// //             <Footer />
// //         </>
// //     );
// // }

// // export default PaginaDeCategoria;

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { v4 as uuidv4 } from "uuid";

// import Header from "../../Componentes/Header/Header";
// import Footer from "../../Componentes/Footer/Footer";

// import "./PaginaDeCategoria.css";

// function PaginaDeCategoria() {
//     const { categoria, subcategoria } = useParams();
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [filtros, setFiltros] = useState([]);
//     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
//     const [metadatos, setMetadatos] = useState({ title: "", description: "" });
//     const [productos, setProductos] = useState([]);
//     const [productosFiltrados, setProductosFiltrados] = useState([]);
//     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
//     const [valorThumb, setValorThumb] = useState(0);
//     const [arrastrando, setArrastrando] = useState(false);

//     // Cargar datos iniciales
//     useEffect(() => {
//         fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
//             .then((response) => response.json())
//             .then((data) => setMetadatos(data || { title: "", description: "" }))
//             .catch((error) => console.error("Error cargando metadatos:", error));

//         fetch(`/assets/json/categorias/${categoria}/filtros.json`)
//             .then((response) => response.json())
//             .then((data) => setFiltros(Array.isArray(data) ? data : []))
//             .catch(() => setFiltros([]));

//         if (subcategoria) {
//             const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
//             fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setProductos(data.productos || []);
//                     setProductosFiltrados(data.productos || []);
//                 })
//                 .catch(() => {
//                     setProductos([]);
//                     setProductosFiltrados([]);
//                 });
//         } else {
//             fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
//                 .then((response) => response.json())
//                 .then(async (data) => {
//                     if (!Array.isArray(data.subcategorias)) return;

//                     const promesas = data.subcategorias.map((subcat) => {
//                         const subcatNombre = subcat.subcategoria
//                             .toLowerCase()
//                             .replace(/\s+/g, "-");
//                         return fetch(
//                             `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
//                         )
//                             .then((response) => response.json())
//                             .then((data) => data.productos || [])
//                             .catch(() => []);
//                     });

//                     const productosPorSubcategoria = await Promise.all(promesas);
//                     const todosLosProductos = productosPorSubcategoria.flat();

//                     setProductos(todosLosProductos);
//                     setProductosFiltrados(todosLosProductos);
//                 })
//                 .catch(() => setProductos([]));
//         }
//     }, [categoria, subcategoria]);

//     // Restaurar filtros seleccionados desde la URL
//     useEffect(() => {
//         const filtrosDesdeURL = {};
//         searchParams.forEach((value, key) => {
//             const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
//             filtrosDesdeURL[key] = new Set(opciones);
//         });
//         setFiltrosSeleccionados(filtrosDesdeURL);
//     }, [searchParams]);

//     // Configurar rango inicial basado en los precios de los productos
//     useEffect(() => {
//         if (productos.length > 0) {
//             const precios = productos.map((producto) => producto.precioVenta || 0);
//             const precioMin = Math.min(...precios);
//             const precioMax = Math.max(...precios);
//             setRangoPrecios([precioMin, precioMax]);
//             setValorThumb(precioMax);
//         }
//     }, [productos]);

//     // Manejo de cambios en los filtros
//     const handleFiltroChange = (categoriaFiltro, opcion) => {
//         setFiltrosSeleccionados((prev) => {
//             const nuevoEstado = { ...prev };
//             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);

//             if (opciones.has(opcion)) {
//                 opciones.delete(opcion);
//             } else {
//                 opciones.add(opcion);
//             }

//             if (opciones.size > 0) {
//                 nuevoEstado[categoriaFiltro] = opciones;
//             } else {
//                 delete nuevoEstado[categoriaFiltro];
//             }

//             actualizarURL(nuevoEstado);
//             filtrarProductos(nuevoEstado, valorThumb);
//             return nuevoEstado;
//         });
//     };

//     // Actualizar los parámetros de la URL
//     const actualizarURL = (filtrosActuales) => {
//         const params = new URLSearchParams();
//         Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
//             params.set(
//                 categoriaFiltro,
//                 [...filtrosActuales[categoriaFiltro]].map(encodeURIComponent).join("+")
//             );
//         });
//         setSearchParams(params);
//     };

//     // Filtrar productos según los filtros seleccionados y el rango de precios
//     const filtrarProductos = (filtrosActuales, precioMaximo) => {
//         const filtrados = productos.filter((producto) => {
//             const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) => {
//                 if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
//                     return false;
//                 }

//                 const valorProducto = producto.detallesDelProducto[categoriaFiltro]
//                     .toString()
//                     .toLowerCase()
//                     .replace(/\s+/g, "-");
//                 return filtrosActuales[categoriaFiltro].has(valorProducto);
//             });

//             const cumplePrecio =
//                 producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
//             return cumpleFiltros && cumplePrecio;
//         });

//         setProductosFiltrados(filtrados);
//     };

//     // Manejo del clic y arrastre del thumb (similar al código anterior)
//     const calcularPosicion = (event, slider) => {
//         const sliderWidth = slider.offsetWidth;
//         const sliderOffsetLeft = slider.getBoundingClientRect().left;
//         const posicionX = Math.min(
//             Math.max(event.clientX - sliderOffsetLeft, 0),
//             sliderWidth
//         );

//         const porcentaje = posicionX / sliderWidth;
//         return rangoPrecios[0] + porcentaje * (rangoPrecios[1] - rangoPrecios[0]);
//     };

//     const manejarClic = (event) => {
//         const slider = event.currentTarget;
//         const nuevoValor = calcularPosicion(event, slider);
//         actualizarProductos(nuevoValor);
//     };

//     const iniciarArrastre = () => {
//         setArrastrando(true);
//     };

//     const moverThumb = (event) => {
//         if (!arrastrando) return;
//         const slider = event.currentTarget;
//         const nuevoValor = calcularPosicion(event, slider);
//         actualizarProductos(nuevoValor);
//     };

//     const finalizarArrastre = () => {
//         setArrastrando(false);
//     };

//     const actualizarProductos = (nuevoValor) => {
//         const valorRedondeado = Math.round(nuevoValor);
//         setValorThumb(valorRedondeado);
//         filtrarProductos(filtrosSeleccionados, valorRedondeado);
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>{metadatos.title}</title>
//             </Helmet>

//             <Header />

//             <main>
//                 <div className="block-container">
//                     <section className="block-content">
//                         <div className="category-page-container">
//                             <div className="category-page-left">
//                                 <div
//                                     className="filter custom-slider"
//                                     onClick={manejarClic}
//                                     onMouseMove={moverThumb}
//                                     onMouseUp={finalizarArrastre}
//                                     onMouseLeave={finalizarArrastre}
//                                 >
//                                     <span className="slider-track"></span>
//                                     <span
//                                         className="slider-thumb"
//                                         onMouseDown={iniciarArrastre}
//                                         style={{
//                                             left: `${((valorThumb - rangoPrecios[0]) /
//                                                 (rangoPrecios[1] - rangoPrecios[0])) *
//                                                 100}%`,
//                                         }}
//                                     ></span>
//                                     <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
//                                 </div>
//                                 {filtros.map((filtro) => (
//                                     <div className="filter" key={`filtro-${filtro.nombre}`}>
//                                         <p className="filter-name">{filtro.titulo}:</p>
//                                         <ul>
//                                             {filtro.lista.map((opcion) => (
//                                                 <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={
//                                                             filtrosSeleccionados[filtro.nombre]?.has(
//                                                                 opcion.nombre.toLowerCase()
//                                                             ) || false
//                                                         }
//                                                         onChange={() =>
//                                                             handleFiltroChange(filtro.nombre, opcion.nombre)
//                                                         }
//                                                     />
//                                                     <label>{opcion.nombre}</label>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="category-page-right">
//                                 {productosFiltrados.length > 0 ? (
//                                     <div className="category-page-products">
//                                         {productosFiltrados.map((producto) => {
//                                             const descuento = Math.round(
//                                                 ((producto.precioNormal - producto.precioVenta) * 100) /
//                                                     producto.precioNormal
//                                             );
//                                             return (
//                                                 <a
//                                                     href={producto.ruta}
//                                                     className="product-card"
//                                                     title={producto.nombre}
//                                                     key={uuidv4()}
//                                                 >
//                                                     <div className="product-card-images">
//                                                         {descuento > 0 && (
//                                                             <span className="product-card-discount">
//                                                                 -{descuento}%
//                                                             </span>
//                                                         )}
//                                                         <img
//                                                             src={`${producto.fotos}/1.jpg`}
//                                                             alt={producto.nombre}
//                                                         />
//                                                     </div>
//                                                     <div className="product-card-content">
//                                                         <span className="product-card-brand">
//                                                             KAMAS
//                                                         </span>
//                                                         <h4 className="product-card-name">
//                                                             {producto.nombre}
//                                                         </h4>
//                                                         <div className="product-card-prices">
//                                                             <span className="product-card-normal-price">
//                                                                 S/.{producto.precioNormal}
//                                                             </span>
//                                                             <span className="product-card-sale-price">
//                                                                 S/.{producto.precioVenta}
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </a>
//                                             );
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <p>No se encontraron productos.</p>
//                                 )}
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

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { v4 as uuidv4 } from "uuid";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./PaginaDeCategoria.css";

function PaginaDeCategoria() {
    const { categoria, subcategoria } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
    const [metadatos, setMetadatos] = useState({ title: "", description: "" });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);
    const [arrastrando, setArrastrando] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then((response) => response.json())
            .then((data) => setMetadatos(data || { title: "", description: "" }))
            .catch((error) => console.error("Error cargando metadatos:", error));

        fetch(`/assets/json/categorias/${categoria}/filtros.json`)
            .then((response) => response.json())
            .then((data) => setFiltros(Array.isArray(data) ? data : []))
            .catch(() => setFiltros([]));

        if (subcategoria) {
            const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                .then((response) => response.json())
                .then((data) => {
                    setProductos(data.productos || []);
                    setProductosFiltrados(data.productos || []);
                })
                .catch(() => {
                    setProductos([]);
                    setProductosFiltrados([]);
                });
        } else {
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                .then((response) => response.json())
                .then(async (data) => {
                    if (!Array.isArray(data.subcategorias)) return;

                    const promesas = data.subcategorias.map((subcat) => {
                        const subcatNombre = subcat.subcategoria
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                        return fetch(
                            `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`
                        )
                            .then((response) => response.json())
                            .then((data) => data.productos || [])
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

    // Restaurar filtros seleccionados desde la URL
    useEffect(() => {
        const filtrosDesdeURL = {};
        searchParams.forEach((value, key) => {
            const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
            filtrosDesdeURL[key] = new Set(opciones);
        });
        setFiltrosSeleccionados(filtrosDesdeURL);
    }, [searchParams]);

    // Configurar rango inicial basado en los precios de los productos
    useEffect(() => {
        if (productos.length > 0) {
            const precios = productos.map((producto) => producto.precioVenta || 0);
            const precioMin = Math.min(...precios);
            const precioMax = Math.max(...precios);
            setRangoPrecios([precioMin, precioMax]);
            setValorThumb(precioMax);
        }
    }, [productos]);

    // Manejo de cambios en los filtros
    const handleFiltroChange = (categoriaFiltro, opcion) => {
        const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");

        setFiltrosSeleccionados((prev) => {
            const nuevoEstado = { ...prev };
            const opciones = new Set(nuevoEstado[categoriaFiltro] || []);

            if (opciones.has(opcionNormalizada)) {
                opciones.delete(opcionNormalizada);
            } else {
                opciones.add(opcionNormalizada);
            }

            if (opciones.size > 0) {
                nuevoEstado[categoriaFiltro] = opciones;
            } else {
                delete nuevoEstado[categoriaFiltro];
            }

            actualizarURL(nuevoEstado);
            filtrarProductos(nuevoEstado, valorThumb);
            return nuevoEstado;
        });
    };

    // Actualizar los parámetros de la URL
    const actualizarURL = (filtrosActuales) => {
        const params = new URLSearchParams();
        Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
            params.set(
                categoriaFiltro,
                [...filtrosActuales[categoriaFiltro]]
                    .map((valor) => valor.toLowerCase().replace(/\s+/g, "-"))
                    .join("+")
            );
        });
        setSearchParams(params);
    };

    // Filtrar productos según los filtros seleccionados y el rango de precios
    const filtrarProductos = (filtrosActuales, precioMaximo) => {
        const filtrados = productos.filter((producto) => {
            const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) => {
                if (!producto.detallesDelProducto || !producto.detallesDelProducto[categoriaFiltro]) {
                    return false;
                }

                const valorProducto = producto.detallesDelProducto[categoriaFiltro]
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                return filtrosActuales[categoriaFiltro].has(valorProducto);
            });

            const cumplePrecio =
                producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
            return cumpleFiltros && cumplePrecio;
        });

        setProductosFiltrados(filtrados);
    };

    // Manejo del clic y arrastre del thumb
    const calcularPosicion = (event, slider) => {
        const sliderWidth = slider.offsetWidth;
        const sliderOffsetLeft = slider.getBoundingClientRect().left;
        const posicionX = Math.min(
            Math.max(event.clientX - sliderOffsetLeft, 0),
            sliderWidth
        );

        const porcentaje = posicionX / sliderWidth;
        return rangoPrecios[0] + porcentaje * (rangoPrecios[1] - rangoPrecios[0]);
    };

    const manejarClic = (event) => {
        const slider = event.currentTarget;
        const nuevoValor = calcularPosicion(event, slider);
        actualizarProductos(nuevoValor);
    };

    const iniciarArrastre = () => {
        setArrastrando(true);
    };

    const moverThumb = (event) => {
        if (!arrastrando) return;
        const slider = event.currentTarget;
        const nuevoValor = calcularPosicion(event, slider);
        actualizarProductos(nuevoValor);
    };

    const finalizarArrastre = () => {
        setArrastrando(false);
    };

    const actualizarProductos = (nuevoValor) => {
        const valorRedondeado = Math.round(nuevoValor);
        setValorThumb(valorRedondeado);
        filtrarProductos(filtrosSeleccionados, valorRedondeado);
    };

    return (
        <>
            <Helmet>
                <title>{metadatos.title}</title>
            </Helmet>

            <Header />

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="category-page-container">
                            <div className="category-page-left">
                                <div
                                    className="filter custom-slider"
                                    onClick={manejarClic}
                                    onMouseMove={moverThumb}
                                    onMouseUp={finalizarArrastre}
                                    onMouseLeave={finalizarArrastre}
                                >
                                    <span className="slider-track"></span>
                                    <span
                                        className="slider-thumb"
                                        onMouseDown={iniciarArrastre}
                                        style={{
                                            left: `${((valorThumb - rangoPrecios[0]) /
                                                (rangoPrecios[1] - rangoPrecios[0])) *
                                                100}%`,
                                        }}
                                    ></span>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p>{`S/ ${rangoPrecios[0]} – S/ ${valorThumb}`}</p>
                                </div>
                                {filtros.map((filtro) => (
                                    <div className="filter" key={`filtro-${filtro.nombre}`}>
                                        <p className="filter-name">{filtro.titulo}:</p>
                                        <ul>
                                        {filtro.lista.map((opcion) => (
                                                <li key={`opcion-${filtro.nombre}-${opcion.nombre}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            filtrosSeleccionados[filtro.nombre]?.has(
                                                                opcion.nombre.toLowerCase().replace(/\s+/g, "-")
                                                            ) || false
                                                        }
                                                        onChange={() =>
                                                            handleFiltroChange(filtro.nombre, opcion.nombre)
                                                        }
                                                    />
                                                    <label>{opcion.nombre}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="category-page-right">
                                {productosFiltrados.length > 0 ? (
                                    <div className="category-page-products">
                                        {productosFiltrados.map((producto) => {
                                            const descuento = Math.round(
                                                ((producto.precioNormal - producto.precioVenta) * 100) /
                                                    producto.precioNormal
                                            );
                                            return (
                                                <a
                                                    href={producto.ruta}
                                                    className="product-card"
                                                    title={producto.nombre}
                                                    key={uuidv4()}
                                                >
                                                    <div className="product-card-images">
                                                        {descuento > 0 && (
                                                            <span className="product-card-discount">
                                                                -{descuento}%
                                                            </span>
                                                        )}
                                                        <img
                                                            src={`${producto.fotos}/1.jpg`}
                                                            alt={producto.nombre}
                                                        />
                                                    </div>
                                                    <div className="product-card-content">
                                                        <span className="product-card-brand">
                                                            KAMAS
                                                        </span>
                                                        <h4 className="product-card-name">
                                                            {producto.nombre}
                                                        </h4>
                                                        <div className="product-card-prices">
                                                            <span className="product-card-normal-price">
                                                                S/.{producto.precioNormal}
                                                            </span>
                                                            <span className="product-card-sale-price">
                                                                S/.{producto.precioVenta}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p>No se encontraron productos.</p>
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
