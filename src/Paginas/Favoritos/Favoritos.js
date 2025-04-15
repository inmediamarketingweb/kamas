import { useEffect, useState } from "react";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./Favoritos.css";

function Favoritos(){
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favStorage);
    }, []);

    // Función para remover un producto de favoritos
    const removeFavorite = (producto) => {
        const updatedFavorites = favoritos.filter((fav) => fav.id !== producto.id);
        setFavoritos(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    return(
        <>
            <title>Mis favoritos | Kamas</title>

            <Header/>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h2 className="block-title">Mis favoritos</h2>
                        </div>

                        <div className="favorites-container">
                            {favoritos.length > 0 ? (
                                <ul className="favorites-products">
                                    {favoritos.map((producto) => (
                                        <li key={producto.id}>
                                            <div className="product-card">
                                                <div className="product-card-images">
                                                    <button type="button" className="remove-favorite" onClick={() => removeFavorite(producto)} title="Eliminar de favoritos">
                                                        <span class="material-icons">delete</span>
                                                    </button>

                                                    <a href={producto.ruta}>
                                                        <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                                    </a>
                                                </div>

                                                <div className="product-card-content">
                                                    <h4>{producto.nombre}</h4>
                                                    <div className="product-card-prices">
                                                        <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                                                        <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tienes productos en favoritos.</p>
                            )}
                            <a href="/">Volver a la tienda</a>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Favoritos;
