import React, { useEffect, useState } from 'react';

import './Colores.css';

function Colores(){
    const [data, setData] = useState(null);
    const [activeTelaIndex, setActiveTelaIndex] = useState(0);
    const [isColorsActive, setIsColorsActive] = useState(false);

    useEffect(() => {
        fetch('/assets/json/colores.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error('Error al obtener el JSON:', error));
    }, []);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const { telas } = data;
    const activeTela = telas[activeTelaIndex];

    return (
    <>
        <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
            <p className="text">+{activeTela.colores.length} colores</p>
            <ul className="product-page-colors-button-miniatures">
                {activeTela.colores.slice(0, 5).map((color, index) => (
                    <li key={index}>
                        <img src={color.img} alt={color.color} />
                    </li>
                ))}
            </ul>
        </div>

        <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
            <section className="d-flex-column gap-20">
                <div className="d-flex-center-between gap-20">
                    <p className="title text">Tipos de tela</p>
                    <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
                        <span className="material-icons">close</span>
                    </button>
                </div>

                <div className="d-grid-auto-1fr gap-10">
                    <div className="d-flex-column gap-20">
                        <ul className="product-page-colors-fabrics d-flex-column gap-5">
                            {telas.map((tela, index) => (
                                <li key={index}>
                                    <button type="button" className={index === activeTelaIndex ? 'active' : ''} onClick={() => setActiveTelaIndex(index)} >
                                        <p className="text">{tela.tela}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-page-colors">
                        <ul className="product-page-colors-results">
                            {activeTela.colores.map((color, index) => (
                                <li key={index}>
                                    <button type="button">
                                        <img src={color.img} alt={color.color} />
                                        <p className="text">{color.color}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>

        <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
    </>
    );
}

export default Colores;
