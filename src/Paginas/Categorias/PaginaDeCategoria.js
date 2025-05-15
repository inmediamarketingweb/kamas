import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { v4 as uuidv4 } from "uuid";

import Header from "../../Componentes/Header/Header";
import Filtros from "./Componentes/Filtros/Filtros";
import Footer from "../../Componentes/Footer/Footer";

import "./PaginaDeCategoria.css";

function PaginaDeCategoria(){
    const { categoria, subcategoria } = useParams();
    const [metadatos, setMetadatos] = useState({ title: "", description: "" });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filtersActive, setFiltersActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavorites(favStorage);
    }, []);

    useEffect(() => {
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`).then((response) => response.json()).then((data) => setMetadatos(data || { title: "", description: "" })).catch(() => setMetadatos({ title: "", description: "" }));

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
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`).then((response) => response.json()).then(async (data) => {
                if (!Array.isArray(data.subcategorias)) return;

                const promesas = data.subcategorias.map((subcat) => {
                    const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                    return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                        .then((response) => response.json())
                        .then((data) => data.productos || [])
                        .catch(() => []);
                });

                const productosPorSubcategoria = await Promise.all(promesas);
                const todosLosProductos = productosPorSubcategoria.flat();

                setProductos(todosLosProductos);
                setProductosFiltrados(todosLosProductos);
            }).catch(() => setProductos([]));
        }
    }, [categoria, subcategoria]);

    useEffect(() => { setCurrentPage(1) }, [productosFiltrados]);

    const totalItems = productosFiltrados.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const getVisiblePages = () => {
        const visiblePages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
            if (currentPage <= 3) { visiblePages.push(1, 2, 3, 4, '...', totalPages) } else if (currentPage >= totalPages - 2) {
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

    const startIndex = Math.max(0, totalItems - (currentPage * itemsPerPage));
    const endIndex = totalItems - ((currentPage - 1) * itemsPerPage);
    const currentProducts = productosFiltrados.slice(startIndex, endIndex);

    const handleToggleFilters = () => setFiltersActive((prev) => !prev);
    const handleCloseFilters = () => setFiltersActive(false);

    const toggleFavorite = (producto) => {
        const exists = favorites.some((fav) => fav.ruta === producto.ruta);
        const updatedFavorites = exists
            ? favorites.filter((fav) => fav.ruta !== producto.ruta)
            : [...favorites, producto];
        setFavorites(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const truncate = (str, maxLength) => str.length <= maxLength ? str : str.slice(0, maxLength) + "...";

    return (
        <>
            <Helmet>
                <title>{metadatos.title}</title>
            </Helmet>

            <Header />

            <main className="main-category">
                <div className="block-container">
                    <section className="block-content">
                        <div className="category-page-container">
                            <div className="category-page-left">
                                <Filtros productos={productos} setProductosFiltrados={setProductosFiltrados} filtersActive={filtersActive} onClose={handleCloseFilters} />
                            </div>

                            <div className="category-page-right">
                                <div className="category-page-right-top">
                                    <button type="button" className="d-flex-center-center gap-5 open-filters" onClick={handleToggleFilters} >
                                        <p className="text">Filtrar</p>
                                        <span className="material-icons text">tune</span>
                                    </button>
                                </div>

                                {productosFiltrados.length > 0 ? (
                                    <>
                                        <ul className="category-page-products">
                                            {currentProducts
                                                .filter((producto) => producto.oferta !== "si")
                                                .sort((a, b) => b.id - a.id)
                                                .map((producto) => {
                                                    const descuento = Math.round(
                                                        ((producto.precioNormal - producto.precioVenta) * 100) /
                                                        producto.precioNormal
                                                    );
                                                    const tipoEnvioClase = producto["tipo-de-envio"] === "Gratis" ? "envio-gratis"
                                                        : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente"
                                                        : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado"
                                                        : "";

                                                    const isFavorite = favorites.some( (fav) => fav.ruta === producto.ruta );

                                                    return (
                                                        <li key={uuidv4()}>
                                                            <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`} title={producto.nombre}>
                                                                <div className="product-card-images">
                                                                    {descuento > 0 && (
                                                                        <span className="product-card-discount">-{descuento}%</span>
                                                                    )}

                                                                    <a href={producto.ruta}>
                                                                        <img src={`${producto.fotos}1.jpg`} alt={producto.nombre} />
                                                                    </a>

                                                                    <button type="button" className={`product-card-favorite ${isFavorite ? "active" : ""}`} onClick={() => toggleFavorite(producto)} title="Agregar a favoritos" >
                                                                        <span className="material-icons">favorite</span>
                                                                    </button>
                                                                </div>

                                                                <a href={producto.ruta} className="product-card-content">
                                                                    {producto.stock === 0 ? (
                                                                        <div className="product-card-agotado product-card-target">
                                                                            <span>Sin stock 😥</span>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            {producto.novedades === "si" && (
                                                                                <div className="product-card-target">
                                                                                    <span>¡Lo más nuevo!</span>
                                                                                </div>
                                                                            )}

                                                                            {producto["solo-por-horas"] === "si" && (
                                                                                <div className="product-card-stock">
                                                                                    <span>¡ Solo por horas ⌛ !</span>
                                                                                </div>
                                                                            )}

                                                                            {producto.oferta === "si" && (
                                                                                <div className="product-card-ofert">
                                                                                    <span>En oferta</span>
                                                                                </div>
                                                                            )}

                                                                            {producto.novedades !== "si" &&
                                                                                producto["solo-por-horas"] !== "si" &&
                                                                                producto.oferta !== "si" && (
                                                                                    <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
                                                                                        <span>
                                                                                            {producto["tipo-de-envio"] === "Gratis"
                                                                                                ? "¡ Envío gratis 🚚 !"
                                                                                                : producto["tipo-de-envio"] || "No especificado"}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                        </>
                                                                    )}

                                                                    <span className="product-card-brand">KAMAS</span>
                                                                    <h4 className="product-card-name">{truncate(producto.nombre, 72)}</h4>
                                                                    <div className="product-card-prices">
                                                                        <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                                                                        <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                        </ul>

                                        <div className="pagination-controls">
                                            <button className="pagination-arrow" onClick={handlePreviousPage} disabled={currentPage === 1} >
                                                <span class="material-icons">chevron_left</span>
                                            </button>

                                            <div className="d-flex-center-center gap-10">
                                                {getVisiblePages().map((page, index) => typeof page === 'number' ? (
                                                        <button key={index} className={`pagination-page ${ currentPage === page ? 'active' : '' }`} onClick={() => handlePageChange(page)}>{page}</button>
                                                    ) : (
                                                        <span key={index} className="pagination-ellipsis">...</span>
                                                    )
                                                )}
                                            </div>

                                            <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === totalPages} >
                                                <span class="material-icons">chevron_right</span>
                                            </button>
                                        </div>
                                    </>
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
