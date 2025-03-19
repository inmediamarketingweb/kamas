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
    const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
    const [metadatos, setMetadatos] = useState({ title: "", description: "" });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);
    const [arrastrando, setArrastrando] = useState(false);

    const rangosDePrecio = [
        { id: "rango-1", titulo: "S/ 250 - S/ 500", min: 250, max: 500 },
        { id: "rango-2", titulo: "S/ 500 - S/ 1.000", min: 500, max: 1000 },
        { id: "rango-3", titulo: "S/ 1.000 - S/ 2.000", min: 1000, max: 2000 },
        { id: "rango-5", titulo: "Desde S/ 2.000", min: 2000, max: Infinity },
    ];

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
            filtrarProductos(nuevoEstado, valorThumb, rangoDePrecioSeleccionado);
            return nuevoEstado;
        });
    };

    // Manejo de cambios en los rangos de precio
    const handleCambioRangoPrecio = (rangoId) => {
        setRangoDePrecioSeleccionado((prev) => {
            const nuevoRango = prev === rangoId ? null : rangoId; // Si ya está seleccionado, lo desactiva
            filtrarProductos(filtrosSeleccionados, valorThumb, nuevoRango);
            return nuevoRango;
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
    const filtrarProductos = (filtrosActuales, precioMaximo, rangoSeleccionado) => {
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

            const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
            const cumpleRangoPrecio = rango
                ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max
                : true;

            const cumplePrecio =
                producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;

            return cumpleFiltros && cumpleRangoPrecio && cumplePrecio;
        });

        setProductosFiltrados(filtrados);
    };

    const manejarClic = (event) => {
        const slider = event.currentTarget;
        const nuevoValor = calcularPosicion(event, slider);
        actualizarProductos(nuevoValor);
    };

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

    const actualizarProductos = (nuevoValor) => {
        const valorRedondeado = Math.round(nuevoValor);
        setValorThumb(valorRedondeado);
        filtrarProductos(filtrosSeleccionados, valorRedondeado, rangoDePrecioSeleccionado);
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
                                <div className="filter">
                                    <p className="filter-name">Rangos de Precio:</p>
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
                                <div
                                    className="filter custom-slider"
                                    onClick={manejarClic}
                                    onMouseMove={(e) =>
                                        arrastrando && manejarClic(e)
                                    }
                                    onMouseUp={() => setArrastrando(false)}
                                    onMouseLeave={() => setArrastrando(false)}
                                >
                                    <span className="slider-track"></span>
                                    <span
                                        className="slider-thumb"
                                        onMouseDown={() => setArrastrando(true)}
                                        style={{
                                            left: `${((valorThumb - rangoPrecios[0]) /
                                                (rangoPrecios[1] - rangoPrecios[0])) *
                                                100}%`,
                                        }}
                                    ></span>
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
