// // // // import { useEffect, useState } from "react";
// // // // import { useSearchParams } from "react-router-dom";

// // // // function Filtros({ productos, setProductosFiltrados }) {
// // // //     const [searchParams, setSearchParams] = useSearchParams();
// // // //     const [filtros, setFiltros] = useState([]);
// // // //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// // // //     const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
// // // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // // //     const [valorThumb, setValorThumb] = useState(0);
    
// // // //     const rangosDePrecio = [
// // // //         { id: "rango-1", titulo: "S/ 249 - S/ 500", min: 249, max: 500 },
// // // //         { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
// // // //         { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
// // // //         { id: "rango-4", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
// // // //     ];

// // // //     useEffect(() => {
// // // //         fetch(`/assets/json/categorias/filtros.json`)
// // // //             .then((response) => response.json())
// // // //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// // // //             .catch(() => setFiltros([]));
// // // //     }, []);

// // // //     useEffect(() => {
// // // //         const filtrosDesdeURL = {};
// // // //         searchParams.forEach((value, key) => {
// // // //             const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
// // // //             filtrosDesdeURL[key] = new Set(opciones);
// // // //         });
// // // //         setFiltrosSeleccionados(filtrosDesdeURL);
// // // //     }, [searchParams]);

// // // //     useEffect(() => {
// // // //         if (productos.length > 0) {
// // // //             const precios = productos.map((producto) => producto.precioVenta || 0);
// // // //             setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
// // // //             setValorThumb(Math.max(...precios));
// // // //         }
// // // //     }, [productos]);

// // // //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// // // //         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
// // // //         setFiltrosSeleccionados((prev) => {
// // // //             const nuevoEstado = { ...prev };
// // // //             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
// // // //             opciones.has(opcionNormalizada) ? opciones.delete(opcionNormalizada) : opciones.add(opcionNormalizada);
// // // //             opciones.size > 0 ? nuevoEstado[categoriaFiltro] = opciones : delete nuevoEstado[categoriaFiltro];
// // // //             actualizarURL(nuevoEstado);
// // // //             filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
// // // //             return nuevoEstado;
// // // //         });
// // // //     };

// // // //     const handleCambioRangoPrecio = (rangoId) => {
// // // //         setRangoDePrecioSeleccionado((prev) => {
// // // //             const nuevoRango = prev === rangoId ? null : rangoId;
// // // //             filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
// // // //             return nuevoRango;
// // // //         });
// // // //     };

// // // //     const actualizarURL = (filtrosActuales) => {
// // // //         const params = new URLSearchParams();
// // // //         Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
// // // //             params.set(
// // // //                 categoriaFiltro,
// // // //                 [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
// // // //             );
// // // //         });
// // // //         setSearchParams(params);
// // // //     };

// // // //     const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
// // // //         const filtrados = productos.filter((producto) => {
// // // //             const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) =>
// // // //                 producto.detallesDelProducto?.[categoriaFiltro]?.toLowerCase().replace(/\s+/g, "-")
// // // //                     && filtrosActuales[categoriaFiltro].has(producto.detallesDelProducto[categoriaFiltro].toLowerCase().replace(/\s+/g, "-"))
// // // //             );
// // // //             const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
// // // //             const cumpleRangoPrecio = rango ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max : true;
// // // //             const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
// // // //             return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
// // // //         });
// // // //         setProductosFiltrados(filtrados);
// // // //     };

// // // //     return (
// // // //         <div className="filters-container">
// // // //             <div className="filter">
// // // //                 <p>Rangos de Precio:</p>
// // // //                 <ul>
// // // //                     {rangosDePrecio.map((rango) => (
// // // //                         <li key={rango.id}>
// // // //                             <input type="radio" name="rango-precio" checked={rangoDePrecioSeleccionado === rango.id} onChange={() => handleCambioRangoPrecio(rango.id)} />
// // // //                             <label>{rango.titulo}</label>
// // // //                         </li>
// // // //                     ))}
// // // //                 </ul>
// // // //             </div>
// // // //             {filtros.map((filtro) => (
// // // //                 <div className="filter" key={filtro.nombre}>
// // // //                     <p>{filtro.titulo}:</p>
// // // //                     <ul>
// // // //                         {filtro.lista.map((opcion) => (
// // // //                             <li key={opcion.nombre}>
// // // //                                 <input type="checkbox" checked={
// // // //                                     filtrosSeleccionados[filtro.nombre]?.has(opcion.nombre.toLowerCase().replace(/\s+/g, "-")) || false
// // // //                                 } onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)} />
// // // //                                 <label>{opcion.nombre}</label>
// // // //                             </li>
// // // //                         ))}
// // // //                     </ul>
// // // //                 </div>
// // // //             ))}
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Filtros;

// // // import { useEffect, useState } from "react";
// // // import { useSearchParams, useParams } from "react-router-dom";

// // // function Filtros({ productos, setProductosFiltrados }) {
// // //     const { categoria } = useParams(); // Obtiene la categoría desde la URL
// // //     const [searchParams, setSearchParams] = useSearchParams();
// // //     const [filtros, setFiltros] = useState([]);
// // //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// // //     const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
// // //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// // //     const [valorThumb, setValorThumb] = useState(0);

// // //     const rangosDePrecio = [
// // //         { id: "rango-1", titulo: "S/ 249 - S/ 500", min: 249, max: 500 },
// // //         { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
// // //         { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
// // //         { id: "rango-4", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
// // //     ];

// // //     // ✅ Cargar filtros según la categoría
// // //     useEffect(() => {
// // //         if (!categoria) return;
    
// // //         const url = `/assets/json/categorias/${categoria}/filtros.json`;
// // //         console.log("Cargando filtros desde:", url);
    
// // //         fetch(url)
// // //             .then((response) => {
// // //                 console.log("Respuesta completa del fetch:", response); // 🔹 Ver qué devuelve el servidor
// // //                 if (!response.ok) {
// // //                     throw new Error(`Error ${response.status}: No se pudo cargar ${url}`);
// // //                 }
// // //                 return response.json();
// // //             })
// // //             .then((data) => {
// // //                 console.log("Filtros cargados:", data);
// // //                 setFiltros(Array.isArray(data) ? data : []);
// // //             })
// // //             .catch((error) => {
// // //                 console.error("Error al cargar los filtros:", error);
// // //                 setFiltros([]); // Evita que la app crashee
// // //             });
// // //     }, [categoria]);
    
    

// // //     // ✅ Leer filtros de la URL
// // //     useEffect(() => {
// // //         const filtrosDesdeURL = {};
// // //         searchParams.forEach((value, key) => {
// // //             const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
// // //             filtrosDesdeURL[key] = new Set(opciones);
// // //         });
// // //         setFiltrosSeleccionados(filtrosDesdeURL);
// // //     }, [searchParams]);

// // //     // ✅ Obtener rango de precios de los productos
// // //     useEffect(() => {
// // //         if (productos.length > 0) {
// // //             const precios = productos.map((producto) => producto.precioVenta || 0);
// // //             setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
// // //             setValorThumb(Math.max(...precios));
// // //         }
// // //     }, [productos]);

// // //     // ✅ Manejo de cambios en filtros
// // //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// // //         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
// // //         setFiltrosSeleccionados((prev) => {
// // //             const nuevoEstado = { ...prev };
// // //             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
// // //             opciones.has(opcionNormalizada) ? opciones.delete(opcionNormalizada) : opciones.add(opcionNormalizada);
// // //             opciones.size > 0 ? (nuevoEstado[categoriaFiltro] = opciones) : delete nuevoEstado[categoriaFiltro];
// // //             actualizarURL(nuevoEstado);
// // //             filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
// // //             return nuevoEstado;
// // //         });
// // //     };

// // //     // ✅ Manejo del cambio de rango de precios
// // //     const handleCambioRangoPrecio = (rangoId) => {
// // //         setRangoDePrecioSeleccionado((prev) => {
// // //             const nuevoRango = prev === rangoId ? null : rangoId;
// // //             filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
// // //             return nuevoRango;
// // //         });
// // //     };

// // //     // ✅ Actualizar URL con filtros seleccionados
// // //     const actualizarURL = (filtrosActuales) => {
// // //         const params = new URLSearchParams();
// // //         Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
// // //             params.set(
// // //                 categoriaFiltro,
// // //                 [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
// // //             );
// // //         });
// // //         setSearchParams(params);
// // //     };

// // //     // ✅ Filtrar productos según los filtros seleccionados y el rango de precios
// // //     const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
// // //         const filtrados = productos.filter((producto) => {
// // //             const cumpleFiltros = Object.keys(filtrosActuales).every(
// // //                 (categoriaFiltro) =>
// // //                     producto.detallesDelProducto?.[categoriaFiltro] &&
// // //                     filtrosActuales[categoriaFiltro].has(
// // //                         producto.detallesDelProducto[categoriaFiltro].toLowerCase().replace(/\s+/g, "-")
// // //                     )
// // //             );
// // //             const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
// // //             const cumpleRangoPrecio = rango
// // //                 ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max
// // //                 : true;
// // //             const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
// // //             return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
// // //         });
// // //         setProductosFiltrados(filtrados);
// // //     };

// // //     return (
// // //         <div className="filters-container">
// // //             <div className="filter">
// // //                 <p>Rangos de Precio:</p>
// // //                 <ul>
// // //                     {rangosDePrecio.map((rango) => (
// // //                         <li key={rango.id}>
// // //                             <input
// // //                                 type="radio"
// // //                                 name="rango-precio"
// // //                                 checked={rangoDePrecioSeleccionado === rango.id}
// // //                                 onChange={() => handleCambioRangoPrecio(rango.id)}
// // //                             />
// // //                             <label>{rango.titulo}</label>
// // //                         </li>
// // //                     ))}
// // //                 </ul>
// // //             </div>

// // //             {filtros?.length > 0 ? (  // 🔹 Usa el operador opcional "?" para evitar errores
// // //                 filtros.map((filtro) => (
// // //                     <div className="filter" key={filtro.nombre}>
// // //                         <p>{filtro.titulo}:</p>
// // //                         <ul>
// // //                             {Array.isArray(filtro.lista) ? (
// // //                                 filtro.lista.map((opcion) => (
// // //                                     <li key={opcion.id}>
// // //                                         <input type="checkbox" />
// // //                                         <label>{opcion.nombre}</label>
// // //                                     </li>
// // //                                 ))
// // //                             ) : (
// // //                                 <p>Sin opciones disponibles</p>
// // //                             )}
// // //                         </ul>
// // //                     </div>
// // //                 ))
// // //             ) : (
// // //                 <p>Cargando filtros...</p>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // // export default Filtros;

// // import { useEffect, useState } from "react";
// // import { useSearchParams, useParams } from "react-router-dom";

// // function Filtros({ productos, setProductosFiltrados }) {
// //     const { categoria } = useParams(); // Obtiene la categoría desde la URL
// //     const [searchParams, setSearchParams] = useSearchParams();
// //     const [filtros, setFiltros] = useState([]);
// //     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
// //     const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
// //     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
// //     const [valorThumb, setValorThumb] = useState(0);

// //     const rangosDePrecio = [
// //         { id: "rango-1", titulo: "S/ 249 - S/ 500", min: 249, max: 500 },
// //         { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
// //         { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
// //         { id: "rango-4", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
// //     ];

// //     useEffect(() => {
// //         if (!categoria) return;
// //         const url = `/assets/json/categorias/${categoria}/filtros.json`;
// //         fetch(url)
// //             .then((response) => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
// //             .then((data) => setFiltros(Array.isArray(data) ? data : []))
// //             .catch(() => setFiltros([]));
// //     }, [categoria]);

// //     useEffect(() => {
// //         const filtrosDesdeURL = {};
// //         searchParams.forEach((value, key) => {
// //             const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
// //             filtrosDesdeURL[key] = new Set(opciones);
// //         });
// //         setFiltrosSeleccionados(filtrosDesdeURL);
// //     }, [searchParams]);

// //     useEffect(() => {
// //         if (productos.length > 0) {
// //             const precios = productos.map((producto) => producto.precioVenta || 0);
// //             setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
// //             setValorThumb(Math.max(...precios));
// //         }
// //     }, [productos]);

// //     const handleFiltroChange = (categoriaFiltro, opcion) => {
// //         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
// //         setFiltrosSeleccionados((prev) => {
// //             const nuevoEstado = { ...prev };
// //             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
// //             opciones.has(opcionNormalizada) ? opciones.delete(opcionNormalizada) : opciones.add(opcionNormalizada);
// //             opciones.size > 0 ? (nuevoEstado[categoriaFiltro] = opciones) : delete nuevoEstado[categoriaFiltro];
// //             actualizarURL(nuevoEstado);
// //             filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
// //             return nuevoEstado;
// //         });
// //     };

// //     const handleCambioRangoPrecio = (rangoId) => {
// //         setRangoDePrecioSeleccionado((prev) => {
// //             const nuevoRango = prev === rangoId ? null : rangoId;
// //             filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
// //             return nuevoRango;
// //         });
// //     };

// //     const actualizarURL = (filtrosActuales) => {
// //         const params = new URLSearchParams();
// //         Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
// //             params.set(
// //                 categoriaFiltro,
// //                 [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
// //             );
// //         });
// //         setSearchParams(params);
// //     };

// //     const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
// //         const filtrados = productos.filter((producto) => {
// //             const cumpleFiltros = Object.keys(filtrosActuales).every(
// //                 (categoriaFiltro) =>
// //                     producto.detallesDelProducto?.[categoriaFiltro] &&
// //                     filtrosActuales[categoriaFiltro].has(
// //                         producto.detallesDelProducto[categoriaFiltro].toLowerCase().replace(/\s+/g, "-")
// //                     )
// //             );
// //             const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
// //             const cumpleRangoPrecio = rango
// //                 ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max
// //                 : true;
// //             const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
// //             return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
// //         });
// //         setProductosFiltrados(filtrados);
// //     };

// //     return (
// //         <div className="filters-container">
// //             <div className="filter">
// //                 <p>Rangos de Precio:</p>
// //                 <ul>
// //                     {rangosDePrecio.map((rango) => (
// //                         <li key={rango.id}>
// //                             <input
// //                                 type="radio"
// //                                 name="rango-precio"
// //                                 checked={rangoDePrecioSeleccionado === rango.id}
// //                                 onChange={() => handleCambioRangoPrecio(rango.id)}
// //                             />
// //                             <label>{rango.titulo}</label>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>

// //             {filtros.map((filtro) => (
// //                 <div className="filter" key={filtro.nombre}>
// //                     <p>{filtro.titulo}:</p>
// //                     <ul>
// //                         {Array.isArray(filtro.lista) ? (
// //                             filtro.lista.map((opcion) => (
// //                                 <li key={opcion.id}>
// //                                     <input type="checkbox" />
// //                                     <label>{opcion.nombre}</label>
// //                                 </li>
// //                             ))
// //                         ) : (
// //                             <p>Sin opciones disponibles</p>
// //                         )}
// //                     </ul>
// //                 </div>
// //             ))}

// //         </div>
// //     );
// // }

// // export default Filtros;

// import { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "react-router-dom";

// function Filtros({ productos, setProductosFiltrados }) {
//     const { categoria } = useParams(); // Obtiene la categoría desde la URL
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [filtros, setFiltros] = useState([]);
//     const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
//     const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
//     const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
//     const [valorThumb, setValorThumb] = useState(0);

//     const rangosDePrecio = [
//         { id: "rango-1", titulo: "S/ 249 - S/ 500", min: 249, max: 500 },
//         { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
//         { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
//         { id: "rango-4", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
//     ];

//     // Efecto para cargar los filtros desde el JSON
//     useEffect(() => {
//         if (!categoria) return;
//         const url = `/assets/json/categorias/${categoria}/filtros.json`;
//         fetch(url)
//             .then((response) => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
//             .then((data) => setFiltros(Array.isArray(data) ? data : []))
//             .catch((error) => {
//                 console.error("Error al cargar filtros:", error);
//                 setFiltros([]);
//             });
//     }, [categoria]);

//     // Efecto para sincronizar filtros desde la URL
//     useEffect(() => {
//         if (!searchParams) return;
//         const filtrosDesdeURL = {};
//         searchParams.forEach((value, key) => {
//             const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
//             filtrosDesdeURL[key] = new Set(opciones);
//         });
//         setFiltrosSeleccionados(filtrosDesdeURL);
//     }, [searchParams]);

//     // Efecto para calcular el rango de precios
//     useEffect(() => {
//         if (productos && productos.length > 0) {
//             const precios = productos.map((producto) => producto.precioVenta || 0);
//             setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
//             setValorThumb(Math.max(...precios));
//         }
//     }, [productos]);

//     // Función para manejar cambios en filtros
//     const handleFiltroChange = (categoriaFiltro, opcion) => {
//         const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
//         setFiltrosSeleccionados((prev) => {
//             const nuevoEstado = { ...prev };
//             const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
//             opciones.has(opcionNormalizada) ? opciones.delete(opcionNormalizada) : opciones.add(opcionNormalizada);
//             opciones.size > 0 ? (nuevoEstado[categoriaFiltro] = opciones) : delete nuevoEstado[categoriaFiltro];
//             actualizarURL(nuevoEstado);
//             filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
//             return nuevoEstado;
//         });
//     };

//     // Función para manejar cambios en rango de precio
//     const handleCambioRangoPrecio = (rangoId) => {
//         setRangoDePrecioSeleccionado((prev) => {
//             const nuevoRango = prev === rangoId ? null : rangoId;
//             filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
//             return nuevoRango;
//         });
//     };

//     // Actualizar URL con los filtros actuales
//     const actualizarURL = (filtrosActuales) => {
//         const params = new URLSearchParams();
//         Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
//             params.set(
//                 categoriaFiltro,
//                 [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
//             );
//         });
//         setSearchParams(params);
//     };

//     // Filtrar productos basados en filtros y rango de precio
//     const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
//         const filtrados = productos.filter((producto) => {
//             const cumpleFiltros = Object.keys(filtrosActuales).every(
//                 (categoriaFiltro) =>
//                     producto.detallesDelProducto?.[categoriaFiltro] &&
//                     filtrosActuales[categoriaFiltro].has(
//                         producto.detallesDelProducto[categoriaFiltro].toLowerCase().replace(/\s+/g, "-")
//                     )
//             );
//             const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
//             const cumpleRangoPrecio = rango
//                 ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max
//                 : true;
//             const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
//             return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
//         });
//         setProductosFiltrados(filtrados);
//     };

//     return (
//         <div className="filters-container">
//             <div className="filter">
//                 <p>Rangos de Precio:</p>
//                 <ul>
//                     {rangosDePrecio.map((rango) => (
//                         <li key={rango.id}>
//                             <input
//                                 type="radio"
//                                 name="rango-precio"
//                                 checked={rangoDePrecioSeleccionado === rango.id}
//                                 onChange={() => handleCambioRangoPrecio(rango.id)}
//                             />
//                             <label>{rango.titulo}</label>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {filtros.map((filtro) => (
//                 <div className="filter" key={filtro.nombre}>
//                     <p>{filtro.titulo}:</p>
//                     <ul>
//                         {Array.isArray(filtro.lista) ? (
//                             filtro.lista.map((opcion) => (
//                                 <li key={opcion.id}>
//                                     <input
//                                         type="checkbox"
//                                         onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
//                                     />
//                                     <label>{opcion.nombre}</label>
//                                 </li>
//                             ))
//                         ) : (
//                             <p>Sin opciones disponibles</p>
//                         )}
//                     </ul>
//                 </div>
//             ))}

//         </div>
//     );
// }

// export default Filtros;

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

function Filtros({ productos, setProductosFiltrados }) {
    const { categoria } = useParams(); // Obtiene la categoría desde la URL
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
    const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);

    const rangosDePrecio = [
        { id: "rango-1", titulo: "S/ 249 - S/ 500", min: 249, max: 500 },
        { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
        { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
        { id: "rango-4", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
    ];

    // Efecto para cargar los filtros desde el JSON
    useEffect(() => {
        if (!categoria) return;
        const url = `/assets/json/categorias/${categoria}/filtros.json`;
        fetch(url)
            .then((response) => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
            .then((data) => setFiltros(Array.isArray(data) ? data : []))
            .catch((error) => {
                console.error("Error al cargar filtros:", error);
                setFiltros([]);
            });
    }, [categoria]);

    // Efecto para sincronizar filtros desde la URL
    useEffect(() => {
        if (!searchParams) return;
        const filtrosDesdeURL = {};
        searchParams.forEach((value, key) => {
            const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
            filtrosDesdeURL[key] = new Set(opciones);
        });
        setFiltrosSeleccionados(filtrosDesdeURL);
    }, [searchParams]);

    // Efecto para calcular el rango de precios
    useEffect(() => {
        if (productos && productos.length > 0) {
            const precios = productos.map((producto) => producto.precioVenta || producto.precioNormal || producto.precioRegular || 0);
            setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
            setValorThumb(Math.max(...precios));
        }
    }, [productos]);

    // Función para manejar cambios en filtros
    const handleFiltroChange = (categoriaFiltro, opcion) => {
        const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
        setFiltrosSeleccionados((prev) => {
            const nuevoEstado = { ...prev };
            const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
            opciones.has(opcionNormalizada) ? opciones.delete(opcionNormalizada) : opciones.add(opcionNormalizada);
            opciones.size > 0 ? (nuevoEstado[categoriaFiltro] = opciones) : delete nuevoEstado[categoriaFiltro];
            actualizarURL(nuevoEstado);
            filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
            return nuevoEstado;
        });
    };

    // Función para manejar cambios en rango de precio
    const handleCambioRangoPrecio = (rangoId) => {
        setRangoDePrecioSeleccionado((prev) => {
            const nuevoRango = prev === rangoId ? null : rangoId;
            filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
            return nuevoRango;
        });
    };

    // Actualizar URL con los filtros actuales
    const actualizarURL = (filtrosActuales) => {
        const params = new URLSearchParams();
        Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
            params.set(
                categoriaFiltro,
                [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
            );
        });
        setSearchParams(params);
    };

    // Filtrar productos basados en filtros y rango de precio
    const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
        const filtrados = productos.filter((producto) => {
            const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) =>
                producto["detalles-del-producto"]?.some((detalle) =>
                    filtrosActuales[categoriaFiltro].has(
                        detalle[categoriaFiltro]?.toLowerCase().replace(/\s+/g, "-")
                    )
                )
            );
            const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
            const cumpleRangoPrecio = rango
                ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max
                : true;
            const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
            return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
        });
        setProductosFiltrados(filtrados);
    };

    return (
        <div className="filters-container">
            <div className="filter">
                <p>Rangos de Precio:</p>
                <ul>
                    {rangosDePrecio.map((rango) => (
                        <li key={rango.id}>
                            <input
                                type="radio"
                                name="rango-precio"
                                checked={rangoDePrecioSeleccionado === rango.id}
                                onChange={() => handleCambioRangoPrecio(rango.id)}
                            />
                            <label>{rango.titulo}</label>
                        </li>
                    ))}
                </ul>
            </div>

            {filtros.map((filtro) => (
                <div className="filter" key={filtro.nombre}>
                    <p>{filtro.titulo}:</p>
                    <ul>
                        {Array.isArray(filtro.lista) ? (
                            filtro.lista.map((opcion) => (
                                <li key={opcion.id}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleFiltroChange(filtro.nombre, opcion.nombre)}
                                    />
                                    <label>{opcion.nombre}</label>
                                </li>
                            ))
                        ) : (
                            <p>Sin opciones disponibles</p>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Filtros;
