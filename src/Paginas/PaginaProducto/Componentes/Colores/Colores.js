import { useEffect, useState } from 'react';

import './Colores.css';

function Colores({ onSelectColor }) {
    const [data, setData] = useState(null);
    const [activeTelaIndex, setActiveTelaIndex] = useState(0);
    const [isColorsActive, setIsColorsActive] = useState(false);
    const [activeColorIndex, setActiveColorIndex] = useState(null);

    useEffect(() => {
        fetch('/assets/json/colores.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error('Error al obtener el JSON:', error));
    }, []);

    useEffect(() => {
        setActiveColorIndex(null);
        if (onSelectColor) {
            onSelectColor(null);
        }
    }, [activeTelaIndex, onSelectColor]);

    if (!data) {
        return <div>Cargando...</div>;
    }

    const { telas } = data;
    const activeTela = telas[activeTelaIndex];

    return (
        <>
            <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
                <div className="d-flex-column gap-5">
                    <p className="text title text-center">+40 colores</p>
                    <ul className="product-page-colors-button-miniatures">
                        {activeTela.colores.slice(0, 6).map((color, index) => (
                            <li key={index}>
                                <img loading='lazy' width={22} height={22} src={color.img} alt={color.color} />
                            </li>
                        ))}
                    </ul>
                    <img width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="" />
                </div>
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

                        <div className="d-flex-column gap-20">
                            <div className="product-page-colors">
                                <ul className="product-page-colors-results">
                                    {activeTela.colores.map((color, index) => (
                                        <li key={index}>
                                            <button type="button" className={activeColorIndex === index ? 'active' : ''} onClick={() => { setActiveColorIndex(index); if (onSelectColor) onSelectColor({ color: color.color, tela: activeTela.tela }); }}>
                                                <img loading='lazy' src={color.img} alt={color.color} />
                                                <p className="text">{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {activeColorIndex !== null && (
                                <button type="button" className="button-link button-link-2 margin-left" onClick={() => setIsColorsActive(false)} >
                                    <span className="material-icons">check</span>
                                    <p className="button-link-text">Confirmar</p>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
        </>
    );
}

export default Colores;
