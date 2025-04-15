import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import './Filtros.css';

function Filtros({productos, setProductosFiltrados, filtersActive, onClose, }){
    const { categoria } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
    const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);
    const [envioGratisSeleccionado, setEnvioGratisSeleccionado] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    const rangosDePrecio = [
        { id: "rango-1", titulo: "S/.0 - S/500", min: 0, max: 500 },
        { id: "rango-2", titulo: "S/.500 - S/1000", min: 500, max: 1000 },
        { id: "rango-3", titulo: "S/.1000 - S/2000", min: 1000, max: 2000 },
        { id: "rango-4", titulo: "Desde S/ 2000", min: 2000, max: Infinity },
    ];

    useEffect(() => {
        if (!categoria) return;
        const url = `/assets/json/categorias/${categoria}/filtros.json`;
        fetch(url)
        .then((response) =>
            response.ok ? response.json() : Promise.reject(`Error ${response.status}`)
        )
        .then((data) => setFiltros(Array.isArray(data) ? data : []))
        .catch((error) => {
            console.error("Error al cargar filtros:", error);
            setFiltros([]);
        });
    }, [categoria]);

    useEffect(() => {
        if (!searchParams) return;
        const filtrosDesdeURL = {};
        searchParams.forEach((value, key) => {
            const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
            filtrosDesdeURL[key] = new Set(opciones);
        });
        setFiltrosSeleccionados(filtrosDesdeURL);
    }, [searchParams]);

    useEffect(() => {
        if (productos && productos.length > 0){
            const precios = productos.map( (producto) => producto.precioVenta || producto.precioNormal || producto.precioRegular || 0 );
            setRangoPrecios([Math.min(...precios), Math.max(...precios)]);
            setValorThumb(Math.max(...precios));
        }
    }, [productos]);

    const handleFiltroChange = (categoriaFiltro, opcion) => {
        const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
        setFiltrosSeleccionados((prev) => {
            const nuevoEstado = { ...prev };
            const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
            if (opciones.has(opcionNormalizada)){
                opciones.delete(opcionNormalizada);
            } else {
                opciones.add(opcionNormalizada);
            }
            opciones.size > 0 ? (nuevoEstado[categoriaFiltro] = opciones) : delete nuevoEstado[categoriaFiltro];
            actualizarURL(nuevoEstado);
            filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
            return nuevoEstado;
        });
    };

    const handleCambioRangoPrecio = (rangoId) => {
        setRangoDePrecioSeleccionado((prev) => {
            const nuevoRango = prev === rangoId ? null : rangoId;
            filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
            return nuevoRango;
        });
    };

    const toggleEnvioGratisFilter = () => {
        setEnvioGratisSeleccionado((prev) => !prev);
    };

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

    const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
        const filtrados = productos.filter((producto) => {
            const cumpleFiltros = Object.keys(filtrosActuales).every(
                (categoriaFiltro) => producto["detalles-del-producto"]?.some(
                    (detalle) => filtrosActuales[categoriaFiltro].has(
                        detalle[categoriaFiltro]?.toLowerCase().replace(/\s+/g, "-")
                    )
                )
            );

            const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
            const cumpleRangoPrecio = rango ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max : true;
            const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
            const cumpleEnvioGratis = envioGratisSeleccionado ? producto["tipo-de-envio"]?.toLowerCase() === "gratis" : true;
            return cumpleFiltros && cumpleRangoPrecio && cumplePrecio && cumpleEnvioGratis;
        });
        setProductosFiltrados(filtrados);
    };

    const handleClearFilters = () => {
        setFiltrosSeleccionados({});
        setRangoDePrecioSeleccionado(null);
        setEnvioGratisSeleccionado(false);
        setSearchParams(new URLSearchParams());
        filtrarProductos({}, valorThumb, null);
    };

    const handleToggleFilter = (filterName) => {
        setActiveFilter((prev) => (prev === filterName ? null : filterName));
    };      

    useEffect(() => {
        if (productos && productos.length > 0){
            filtrarProductos(filtrosSeleccionados, valorThumb, rangoDePrecioSeleccionado);
        }
    }, [filtrosSeleccionados, productos, valorThumb, rangoDePrecioSeleccionado, envioGratisSeleccionado]);

    return(
        <>
            <div className={`filters-layer ${filtersActive ? "active" : ""}`} onClick={onClose}></div>

            <div className={`filters-container ${filtersActive ? "active" : ""}`}>
                <div className="filters-content">
                    <div className="filters-content-top">
                        <p className="title">Filtros:</p>
                        <button type="button" className="close-filters" onClick={onClose}>
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <div className="price-range d-flex-column">
                        <div className="filter-title">
                            <p className="title">Rangos de Precio:</p>
                        </div>
                        <ul className="d-flex-column">
                            {rangosDePrecio.map((rango) => (
                                <li key={rango.id}>
                                    <input type="radio" id={`rango-${rango.id}`} name="rango-precio" checked={rangoDePrecioSeleccionado === rango.id} onChange={() => handleCambioRangoPrecio(rango.id)} className="radio-input" />
                                    <label htmlFor={`rango-${rango.id}`} className="radio-label">{rango.titulo}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filtro-envio-gratis">
                        <div className="d-flex gap-5">
                            <span className="material-icons">local_shipping</span>
                            <p>Envío gratis</p>
                        </div>
                        <button type="button" onClick={toggleEnvioGratisFilter} className={envioGratisSeleccionado ? "active" : ""} >
                            <span></span>
                        </button>
                    </div>

                    {filtros.map((filtro) => (
                        <div className="filter d-flex-column gap-10" key={filtro.nombre}>
                            <div className={`filter-title ${ activeFilter === filtro.nombre ? "active" : "" }`} onClick={() => handleToggleFilter(filtro.nombre)} >
                                <p className="title">{filtro.titulo}:</p>
                                <span className="material-icons">keyboard_arrow_down</span>
                            </div>

                            <ul className={`${ activeFilter === filtro.nombre ? "active" : "" }`}>
                                {Array.isArray(filtro.lista) ? (
                                    filtro.lista.map((opcion) => (
                                        <li key={opcion.id} className={ filtrosSeleccionados[filtro.nombre]?.has( opcion.nombre.toLowerCase().replace(/\s+/g, "-") ) ? "active" : "" } onClick={() => handleFiltroChange(filtro.nombre, opcion.nombre)} >
                                            <input type="checkbox" readOnly checked={ filtrosSeleccionados[filtro.nombre]?.has( opcion.nombre.toLowerCase().replace(/\s+/g, "-") ) || false } />
                                            <label>{opcion.nombre}</label>
                                        </li>
                                    ))
                                ) : (
                                    <p>Sin opciones disponibles</p>
                                )}
                            </ul>
                        </div>
                    ))}

                    <div className="filters-clear-container">
                        <button type="button" className="d-flex-center-center gap-10 filters-clear" onClick={handleClearFilters}>
                            <span className="material-icons">delete</span>
                            <p>Limpiar filtros</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filtros;
