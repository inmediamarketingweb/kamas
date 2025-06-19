// // import { useEffect, useState } from 'react';

// // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

// // import './Colores.css';

// // function Colores({ onSelectColor }) {
// //     const [data, setData] = useState(null);
// //     const [activeTelaIndex, setActiveTelaIndex] = useState(0);
// //     const [isColorsActive, setIsColorsActive] = useState(false);
// //     const [activeColorIndex, setActiveColorIndex] = useState(null);

// //     useEffect(() => {
// //         fetch('/assets/json/colores.json')
// //         .then((response) => response.json())
// //         .then((json) => setData(json))
// //         .catch((error) => console.error('Error al obtener el JSON:', error));
// //     }, []);

// //     useEffect(() => {
// //         setActiveColorIndex(null);
// //         if (onSelectColor) {
// //             onSelectColor(null);
// //         }
// //     }, [activeTelaIndex, onSelectColor]);

// //     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

// //     useEffect(() => {
// //         const handleResize = () => {
// //             setIsSmallScreen(window.innerWidth < 600);
// //         };

// //         window.addEventListener('resize', handleResize);

// //         return () => {
// //             window.removeEventListener('resize', handleResize);
// //         };
// //     }, []);

// //     if (!data) {
// //         return <div>Cargando...</div>;
// //     }

// //     const { telas } = data;
// //     const activeTela = telas[activeTelaIndex];

// //     return (
// //         <>
// //             <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
// //                 <div className="d-flex-column gap-5">
// //                     <p className="text title text-center">+40 colores</p>
// //                     <ul className="product-page-colors-button-miniatures">
// //                         <li>
// //                             <LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/acero.webp' alt='Acero'/>
// //                         </li>
// //                         <li>
// //                             <LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-durazno/thumb/azul-noche.webp' alt='Azul noche'/>
// //                         </li>
// //                         <li>
// //                             <LazyImage width={20} height={20} src='/assets/imagenes/colores/iker/thumb/gris-raton.webp' alt='Gris ratón'/>
// //                         </li>
// //                         <li>
// //                             <LazyImage width={20} height={20} src='/assets/imagenes/colores/antifluidos/thumb/beige-oscuro.webp' alt='Beige oscuro'/>
// //                         </li>
// //                         <li>
// //                             <LazyImage width={20} height={20} src='/assets/imagenes/colores/tejido/thumb/beige.webp' alt='Beige'/>
// //                         </li>
// //                     </ul>

// //                     <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
// //                 </div>
// //             </div>

// //             <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
// //                 <section className="d-flex-column gap-20">
// //                     <div className="d-flex-center-between gap-20">
// //                         <p className="title text">Tipos de tela</p>
// //                         <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
// //                             <span className="material-icons">close</span>
// //                         </button>
// //                     </div>

// //                     <div className="d-grid-auto-1fr gap-10">
// //                         <div className="d-flex-column gap-20">
// //                             <ul className="product-page-colors-fabrics d-flex-column gap-5">
// //                                 {telas.map((tela, index) => (
// //                                     <li key={index}>
// //                                         <button type="button" className={index === activeTelaIndex ? 'active' : ''} onClick={() => setActiveTelaIndex(index)} >
// //                                             <p className="text">{tela.tela}</p>
// //                                         </button>
// //                                     </li>
// //                                 ))}
// //                             </ul>
// //                         </div>

// //                         <div className="d-flex-column gap-20">
// //                             <div className="product-page-colors">
// //                                 <ul className="product-page-colors-results">
// //                                     {activeTela.colores.map((color, index) => (
// //                                         <li key={index}>
// //                                             <button type="button" className={activeColorIndex === index ? 'active' : ''} onClick={() => { setActiveColorIndex(index); if (onSelectColor) onSelectColor({ color: color.color, tela: activeTela.tela }); }}>
// //                                                 <LazyImage width={isSmallScreen ? 90 : 137} height={isSmallScreen ? 50 : 70} src={color.img} alt={color.color}/>
// //                                                 <p className="text">{color.color}</p>
// //                                             </button>
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>

// //                             {activeColorIndex !== null && (
// //                                 <button type="button" className="button-link button-link-2 margin-left" onClick={() => setIsColorsActive(false)} >
// //                                     <span className="material-icons">check</span>
// //                                     <p className="button-link-text">Confirmar</p>
// //                                 </button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </section>
// //             </div>

// //             <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
// //         </>
// //     );
// // }

// // export default Colores;

// import { useEffect, useState } from 'react';
// import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// import './Colores.css';

// function Colores({ onSelectColor }) {
//     const [data, setData] = useState(null);
//     const [telas, setTelas] = useState([]);
//     const [activeTelaIndex, setActiveTelaIndex] = useState(0);
//     const [isColorsActive, setIsColorsActive] = useState(false);
//     const [activeColorIndex, setActiveColorIndex] = useState(null);

//     useEffect(() => {
//         fetch('/assets/json/colores.json')
//             .then((response) => response.json())
//             .then((json) => {
//                 setData(json);
//                 const telasActualizadas = json?.telas?.[0]?.plus?.telas || [];
//                 setTelas(telasActualizadas);
//             })
//             .catch((error) => console.error('Error al obtener el JSON:', error));
//     }, []);

//     useEffect(() => {
//         setActiveColorIndex(null);
//         if (onSelectColor) {
//             onSelectColor(null);
//         }
//     }, [activeTelaIndex, onSelectColor]);

//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 600);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     if (!data || telas.length === 0) {
//         return <div>Cargando...</div>;
//     }

//     const activeTela = telas[activeTelaIndex];

//     return (
//         <>
//             <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
//                 <div className="d-flex-column gap-5">
//                     <p className="text title text-center">+40 colores</p>
//                     <ul className="product-page-colors-button-miniatures">
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/acero.webp' alt='Acero'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-durazno/azul-noche.webp' alt='Azul noche'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/iker/gris-raton.webp' alt='Gris ratón'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/antifluidos/beige-oscuro.webp' alt='Beige oscuro'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/tejido/beige.webp' alt='Beige'/></li>
//                     </ul>
//                     <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
//                 </div>
//             </div>

//             <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
//                 <section className="d-flex-column gap-20">
//                     <div className="d-flex-center-between gap-20">
//                         <p className="title text">Tipos de tela</p>
//                         <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
//                             <span className="material-icons">close</span>
//                         </button>
//                     </div>

//                     <div className="d-grid-auto-1fr gap-10">
//                         <div className="d-flex-column gap-20">
//                             <ul className="product-page-colors-fabrics d-flex-column gap-5">
//                                 {telas.map((tela, index) => (
//                                     <li key={index}>
//                                         <button
//                                             type="button"
//                                             className={index === activeTelaIndex ? 'active' : ''}
//                                             onClick={() => setActiveTelaIndex(index)}
//                                         >
//                                             <p className="text">{tela.tela}</p>
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="d-flex-column gap-20">
//                             <div className="product-page-colors">
//                                 <ul className="product-page-colors-results">
//                                     {activeTela.colores.map((color, index) => (
//                                         <li key={index}>
//                                             <button
//                                                 type="button"
//                                                 className={activeColorIndex === index ? 'active' : ''}
//                                                 onClick={() => {
//                                                     setActiveColorIndex(index);
//                                                     if (onSelectColor) {
//                                                         onSelectColor({ color: color.color, tela: activeTela.tela });
//                                                     }
//                                                 }}
//                                             >
//                                                 <LazyImage
//                                                     width={isSmallScreen ? 90 : 137}
//                                                     height={isSmallScreen ? 50 : 70}
//                                                     src={color.img}
//                                                     alt={color.color}
//                                                 />
//                                                 <p className="text">{color.color}</p>
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {activeColorIndex !== null && (
//                                 <button
//                                     type="button"
//                                     className="button-link button-link-2 margin-left"
//                                     onClick={() => setIsColorsActive(false)}
//                                 >
//                                     <span className="material-icons">check</span>
//                                     <p className="button-link-text">Confirmar</p>
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             <div
//                 className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`}
//                 onClick={() => setIsColorsActive(false)}
//             ></div>
//         </>
//     );
// }

// export default Colores;

import { useEffect, useState } from 'react';
import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
import './Colores.css';

function Colores({ onSelectColor }) {
    const [data, setData] = useState(null);
    const [telas, setTelas] = useState([]);
    const [activeTelaIndex, setActiveTelaIndex] = useState(0);
    const [isColorsActive, setIsColorsActive] = useState(false);
    const [activeColorIndex, setActiveColorIndex] = useState(null);

    useEffect(() => {
        fetch('/assets/json/colores.json')
            .then((response) => response.json())
            .then((json) => {
                setData(json);

                const entrada = json?.telas?.[0];
                const categorias = ['plus', 'premium', 'elite'];

                // Unimos todas las telas de las 3 categorías
                const todasLasTelas = categorias.flatMap(categoria => {
                    const grupo = entrada?.[categoria];
                    return grupo?.telas?.map(tela => ({
                        ...tela,
                        categoria,
                        costoAdicional: grupo['costo-adicional']
                    })) || [];
                });

                setTelas(todasLasTelas);
            })
            .catch((error) => console.error('Error al obtener el JSON:', error));
    }, []);

    useEffect(() => {
        setActiveColorIndex(null);
        if (onSelectColor) {
            onSelectColor(null);
        }
    }, [activeTelaIndex, onSelectColor]);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data || telas.length === 0) {
        return <div>Cargando...</div>;
    }

    const activeTela = telas[activeTelaIndex];

    return (
        <>
            <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
                <div className="d-flex-column gap-5">
                    <p className="text title text-center">+40 colores</p>
                    <ul className="product-page-colors-button-miniatures">
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/acero.webp' alt='Acero'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-durazno/azul-noche.webp' alt='Azul noche'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/iker/gris-raton.webp' alt='Gris ratón'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/antifluidos/beige-oscuro.webp' alt='Beige oscuro'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/tejido/beige.webp' alt='Beige'/></li>
                    </ul>
                    <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
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
                                        <button
                                            type="button"
                                            className={index === activeTelaIndex ? 'active' : ''}
                                            onClick={() => setActiveTelaIndex(index)}
                                        >
                                            <p className="text">{tela.tela}</p>
                                            <small className="categoria">{tela.categoria} {tela.costoAdicional !== "0" && `( +S/ ${tela.costoAdicional} )`}</small>
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
                                            <button
                                                type="button"
                                                className={activeColorIndex === index ? 'active' : ''}
                                                onClick={() => {
                                                    setActiveColorIndex(index);
                                                    if (onSelectColor) {
                                                        onSelectColor({
                                                            color: color.color,
                                                            tela: activeTela.tela,
                                                            categoria: activeTela.categoria,
                                                            costoAdicional: activeTela.costoAdicional
                                                        });
                                                    }
                                                }}
                                            >
                                                <LazyImage
                                                    width={isSmallScreen ? 90 : 137}
                                                    height={isSmallScreen ? 50 : 70}
                                                    src={color.img}
                                                    alt={color.color}
                                                />
                                                <p className="text">{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {activeColorIndex !== null && (
                                <button
                                    type="button"
                                    className="button-link button-link-2 margin-left"
                                    onClick={() => setIsColorsActive(false)}
                                >
                                    <span className="material-icons">check</span>
                                    <p className="button-link-text">Confirmar</p>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div
                className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`}
                onClick={() => setIsColorsActive(false)}
            ></div>
        </>
    );
}

export default Colores;
