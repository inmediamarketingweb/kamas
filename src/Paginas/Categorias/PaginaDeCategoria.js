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

    useEffect(() => {
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then((response) => response.json())
            .then((data) => setMetadatos(data || { title: "", description: "" }))
            .catch(() => setMetadatos({ title: "", description: "" }));

        if (subcategoria){
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
                })
                .catch(() => setProductos([]));
        }
    }, [categoria, subcategoria]);

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength){ return str; }
        return str.slice(0, maxLength) + '...';
    };

    return(
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
                                <Filtros productos={productos} setProductosFiltrados={setProductosFiltrados} />
                            </div>

                            <div className="category-page-right">
                                {productosFiltrados.length > 0 ? (
                                    <ul className="category-page-products">
                                        {productosFiltrados.map((producto) => {
                                            const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
                                            return(
                                                <li key={uuidv4()}>
                                                    <a href={producto.ruta} className="product-card" title={producto.nombre}>
                                                        <div className="product-card-images">
                                                            {descuento > 0 && (
                                                                <span className="product-card-discount">-{descuento}%</span>
                                                            )}
                                                            <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                                        </div>

                                                        <div className="product-card-content">
                                                            {producto.novedades === 'si' && (
                                                                <div className="product-card-target">
                                                                    <span>¡ Lo más nuevo !</span>
                                                                </div>
                                                            )}

                                                            {producto["solo-por-horas"] === 'si' && (
                                                                <div className="product-card-stock">
                                                                    <span>¡ Solo por horas 🔥 !</span>
                                                                </div>
                                                            )}

                                                            {producto.oferta === 'si' && (
                                                                <div className="product-card-ofert">
                                                                    <span>¡ En oferta !</span>
                                                                </div>
                                                            )}

                                                            <span className="product-card-brand">KAMAS</span>
                                                            <h4 className="product-card-name">{truncate(producto.nombre, 50)}</h4>
                                                            <div className="product-card-prices">
                                                                <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                                                                <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
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
