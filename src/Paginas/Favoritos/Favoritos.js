import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

import "./Favoritos.css";

function Favoritos(){
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favStorage);
    }, []);

    const removeFavorite = (producto) => {
        const updatedFavorites = favoritos.filter((fav) => fav.ruta !== producto.ruta);
        setFavoritos(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength){
            return str;
        }
        return str.slice(0, maxLength) + "...";
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
                                        <li key={uuidv4()}>
                                            <div className="product-card">
                                                <div className="product-card-images">
                                                    <button type="button" className="remove-favorite" onClick={() => removeFavorite(producto)} title="Eliminar de favoritos">
                                                        <span class="material-icons">delete</span>
                                                    </button>

                                                    <a href={producto.ruta}>
                                                        <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
                                                    </a>
                                                </div>

                                                <a href={producto.ruta} className="product-card-content">
                                                    <h4 className="product-card-name">{truncate(producto.nombre, 51)}</h4>
                                                    <div className="product-card-prices">
                                                        <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                                                        <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                                                    </div>
                                                </a>
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
