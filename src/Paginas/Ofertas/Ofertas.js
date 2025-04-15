import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { v4 as uuidv4 } from "uuid";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./Ofertas.css";

function Ofertas(){
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("/assets/json/manifest.json")
        .then((response) => response.json())
        .then((data) => {
            const files = data.files || [];
            const filePromises = files.map((fileUrl) => fetch(fileUrl).then((res) => res.json()).catch(() => ({ productos: [] })) );

            Promise.all(filePromises)
            .then((results) => {
                const allProducts = results.reduce((acc, curr) => {
                    if (Array.isArray(curr.productos)){
                        return acc.concat(curr.productos);
                    }
                    return acc;
                }, []);

                const productosOferta = allProducts.filter(
                (producto) => producto.oferta === "si"
                );
                setProductos(productosOferta);
            })
            .catch((error) => {
                console.error("Error al combinar archivos de productos:", error);
                setProductos([]);
            });
        })
        .catch((error) => {
            console.error("Error al cargar manifest.json:", error);
                setProductos([]);
            });
    }, []);

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength) + "...";
    };

    return(
        <>
            <Helmet>
                <title>Ofertas | Kamas</title>
                <meta name="description" content="Descubre las mejores ofertas en productos seleccionados." />
            </Helmet>

            <Header/>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h1 className="block-title">Ofertas</h1>
                        </div>

                        {productos.length > 0 ? (
                            <ul className="d-flex-wrap gap-10">
                                {productos.map((producto) => {
                                    const descuento = Math.round( ((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal );

                                    const tipoEnvioClase =
                                        producto["tipo-de-envio"] === "Gratis" ? "envio-gratis"
                                        : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente"
                                        : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado"
                                        : "";

                                    return(
                                        <li key={uuidv4()}>
                                            <div className="product-card" title={producto.nombre}>
                                                <div className="product-card-images">
                                                    {descuento > 0 && (
                                                        <span className="product-card-discount">-{descuento}%</span>
                                                    )}

                                                    <a href={producto.ruta}>
                                                        <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                                    </a>
                                                </div>

                                                <a href={producto.ruta} className="product-card-content">
                                                    {producto.novedades === "si" && (
                                                        <div className="product-card-target">
                                                            <span>¡Lo más nuevo!</span>
                                                        </div>
                                                    )}

                                                    {producto["solo-por-horas"] === "si" && (
                                                        <div className="product-card-stock">
                                                            <span>¡Solo por horas ⌛!</span>
                                                        </div>
                                                    )}

                                                    <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
                                                        <span>{producto["tipo-de-envio"] === "Gratis" ? "¡Envío gratis 🚚!" : producto["tipo-de-envio"] || "No especificado"}</span>
                                                    </div>

                                                    <span className="product-card-brand">KAMAS</span>
                                                    <h4 className="product-card-name">{truncate(producto.nombre, 50)}</h4>
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
                        ) : (
                            <p>No hay ofertas disponibles.</p>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Ofertas;
