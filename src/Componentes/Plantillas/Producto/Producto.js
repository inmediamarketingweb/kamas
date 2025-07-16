import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

import "./Producto.css";

import LazyImage from '../LazyImage';

export function Producto({ producto = { id: null } , truncate }){
    const [favorites, setFavorites] = useState([]);
    const [secondImageError, setSecondImageError] = useState(false);
    const descuento = Math.round( ((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal );

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavorites(favStorage);
    }, []);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleFavorite = (producto) => {
        const exists = favorites.some((fav) => fav.sku === producto.sku);
        const updatedFavorites = exists
            ? favorites.filter((fav) => fav.sku !== producto.sku)
            : [...favorites, producto];
        setFavorites(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const tipoEnvioClase = producto["tipo-de-envio"] === "Gratis" ? "envio-gratis"
    : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente"
    : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado"
    : "";

    const isFavorite = favorites.some( (fav) => fav.sku === producto.sku );
    const imageSize = isSmallScreen ? 140 : 200;

    return(
        <li>
            <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`} title={producto.nombre}>
                <div className="product-card-images">
                    {descuento > 0 && (
                        <span className="product-card-discount">-{descuento}%</span>
                    )}

                    <a href={producto.ruta} alt={producto.nombre}>
                        <LazyImage
                            width={imageSize}
                            height={imageSize}
                            src={`${producto.fotos}1.jpg`}
                            alt={producto.nombre}
                            className="product-image"
                        />
                        
                        <img
                            width={imageSize}
                            height={imageSize}
                            src={`${producto.fotos}2.jpg`}
                            alt={producto.nombre}
                            className="product-image"
                            onError={(e) => {
                                if (!secondImageError) {
                                    e.target.src = `${producto.fotos}1.jpg`;
                                    setSecondImageError(true);
                                }
                            }}
                            loading='lazy'
                        />
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
                                    <span>En oferta 🔥</span>
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
                    <h4 className="product-card-name">{truncate(producto.nombre, 79)}</h4>
                    <div className="product-card-prices">
                        <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                        <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                    </div>
                </a>
            </div>
        </li>
    );
}

Producto.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string.isRequired,
        ruta: PropTypes.string.isRequired,
        fotos: PropTypes.string.isRequired,
        precioNormal: PropTypes.number.isRequired,
        precioVenta: PropTypes.number.isRequired,
    }).isRequired,
    truncate: PropTypes.func.isRequired,
};
