// import { useState, useEffect } from 'react';

// import './Colores.css';

// import Header from '../../../Componentes/Header/Header';
// import Footer from '../../../Componentes/Footer/Footer';

// function Colores(){
//     const [telas, setTelas] = useState([]);
//     const [telaSeleccionada, setTelaSeleccionada] = useState(0);
//     const [colorSeleccionado, setColorSeleccionado] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try{
//                 const response = await fetch('/assets/json/colores.json');

//                 if (!response.ok){
//                     throw new Error('No se pudieron cargar las telas');
//                 }

//                 const data = await response.json();
//                 const telasProcesadas = data.telas.map(tela => ({ ...tela,
//                     colores: tela.colores.map(color => {
//                         const { img, ...rest } = color;
//                         return rest;
//                     })
//                 }));

//                 setTelas(telasProcesadas);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return(
//             <div className="loading-container">
//                 <div className="spinner"></div>
//                 <p>Cargando colores disponibles...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="error-container">
//                 <h2>Error al cargar los datos</h2>
//                 <p>{error}</p>
//                 <p>Por favor, inténtalo de nuevo más tarde.</p>
//             </div>
//         );
//     }

//     if (!telas.length) {
//         return (
//             <div className="no-data">
//                 <h2>No se encontraron datos de telas</h2>
//                 <p>No hay telas disponibles para mostrar en este momento.</p>
//             </div>
//         );
//     }

//     const telaActual = telas[telaSeleccionada];
//     const colorActual = telaActual.colores[colorSeleccionado];

//     return(
//         <>
//             <Header/>

//             <main>
//                 <div className='block-container'>
//                     <section className='block-content'>
//                         <div className="colores-content">
//                             <div className="d-flex-column gap-20">
//                                 <h2 className='title'>Tipos de tela:</h2>
//                                 <ul className="tipos-de-tela">
//                                     {telas.map((tela, index) => (
//                                         <li>
//                                             <button key={index} className={`tela-button ${telaSeleccionada === index ? 'active' : ''}`}
//                                                 onClick={() => {
//                                                     setTelaSeleccionada(index);
//                                                     setColorSeleccionado(0);
//                                                 }}
//                                             >
//                                                 <p>{tela.tela}</p>
//                                                 <span>(colores.length)</span>
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div className="color-display d-flex-column gap-10">
//                                 <div className="color-preview">
//                                     {colorActual.original ? (
//                                         <img src={colorActual.original} alt={`Color ${colorActual.color}`} />
//                                     ) : (
//                                         <div className="color-placeholder">
//                                             <div className="color-box"></div>
//                                             <p>Imagen no disponible</p>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="color-grid">
//                                     <div className="colors-container">
//                                         {telaActual.colores.map((color, index) => (
//                                             <div key={index} className={`color-item ${colorSeleccionado === index ? 'selected' : ''}`} onClick={() => setColorSeleccionado(index)}>
//                                                 {color.original ? (
//                                                     <img src={color.original} alt={color.color} className="color-swatch" />
//                                                 ) : (
//                                                     <div className="color-swatch-placeholder"></div>
//                                                 )}
//                                                 <p>{color.color}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='d-flex-column gap-20'>
//                                 <div className="d-flex-column gap-10">
//                                     <h3 className='title'>{telaActual.titulo}:</h3>
//                                     <p className='text'>{telaActual.descripcion}</p>
//                                 </div>

//                                 <div className='d-flex-column gap-10'>
//                                     <p className='title'>Costo adicional</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </main>

//             <Footer/>
//         </>
//     );
// }

// export default Colores;

import { useState, useEffect } from 'react';
import './Colores.css';
import Header from '../../../Componentes/Header/Header';
import Footer from '../../../Componentes/Footer/Footer';

function Colores(){
    const [categorias, setCategorias] = useState([]);
    const [telaSeleccionada, setTelaSeleccionada] = useState({ categoriaIndex: 0, telaIndex: 0 });
    const [colorSeleccionado, setColorSeleccionado] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('/assets/json/colores.json');

                if (!response.ok){
                    throw new Error('No se pudieron cargar las telas');
                }

                const data = await response.json();
                
                // Procesar la nueva estructura JSON
                const datos = data.telas[0];
                const categoriasProcesadas = [];
                
                // Procesar categoría "plus"
                if (datos.plus && datos.plus.telas) {
                    categoriasProcesadas.push({
                        nombre: 'Plus',
                        costoAdicional: datos.plus['costo-adicional'],
                        telas: datos.plus.telas.map(tela => ({
                            ...tela,
                            colores: tela.colores.map(color => {
                                const { img, ...rest } = color;
                                return rest;
                            })
                        }))
                    });
                }
                
                // Procesar categoría "premium"
                if (datos.premium && datos.premium.telas) {
                    categoriasProcesadas.push({
                        nombre: 'Premium',
                        costoAdicional: datos.premium['costo-adicional'],
                        telas: datos.premium.telas.map(tela => ({
                            ...tela,
                            colores: tela.colores.map(color => {
                                const { img, ...rest } = color;
                                return rest;
                            })
                        }))
                    });
                }

                if (datos.elite && datos.elite.telas) {
                    categoriasProcesadas.push({
                        nombre: 'Elite',
                        costoAdicional: datos.elite['costo-adicional'],
                        telas: datos.elite.telas.map(tela => ({
                            ...tela,
                            colores: tela.colores.map(color => {
                                const { img, ...rest } = color;
                                return rest;
                            })
                        }))
                    });
                }
                
                setCategorias(categoriasProcesadas);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return(
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando colores disponibles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error al cargar los datos</h2>
                <p>{error}</p>
                <p>Por favor, inténtalo de nuevo más tarde.</p>
            </div>
        );
    }

    if (!categorias.length) {
        return (
            <div className="no-data">
                <h2>No se encontraron datos de telas</h2>
                <p>No hay telas disponibles para mostrar en este momento.</p>
            </div>
        );
    }

    const categoriaActual = categorias[telaSeleccionada.categoriaIndex];
    const telaActual = categoriaActual.telas[telaSeleccionada.telaIndex];
    const colorActual = telaActual.colores[colorSeleccionado];

    return(
        <>
            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className="colores-content">
                            <div className="d-flex-column gap-20">
                                <h2 className='title'>Categorías:</h2>
                                <ul className="tipos-de-tela categorias">
                                    {categorias.map((categoria, catIndex) => (
                                        <li key={catIndex}>
                                            <button className={`categoria-button ${telaSeleccionada.categoriaIndex === catIndex ? 'active' : ''}`} onClick={() => {
                                                    setTelaSeleccionada({
                                                        categoriaIndex: catIndex, 
                                                        telaIndex: 0 
                                                    });
                                                    setColorSeleccionado(0);
                                                }}
                                            >
                                                <p>{categoria.nombre}</p>
                                                <span>({categoria.telas.length})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                
                                <h2 className='title'>Tipos de tela:</h2>
                                <ul className="tipos-de-tela">
                                    {categoriaActual.telas.map((tela, telaIndex) => (
                                        <li key={telaIndex}>
                                            <button className={`tela-button ${telaSeleccionada.telaIndex === telaIndex ? 'active' : ''}`} onClick={() => {
                                                    setTelaSeleccionada(prev => ({
                                                        ...prev,
                                                        telaIndex: telaIndex
                                                    }));
                                                    setColorSeleccionado(0);
                                                }}
                                            >
                                                <p>{tela.tela}</p>
                                                <span>({tela.colores.length})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="color-display d-flex-column gap-10">
                                <div className="color-preview">
                                    {colorActual.original ? (
                                        <img src={colorActual.original} alt={`Color ${colorActual.color}`} className="color-image" />
                                    ) : (
                                        <div className="color-placeholder">
                                            <div className="color-box"></div>
                                            <p>Imagen no disponible</p>
                                        </div>
                                    )}
                                </div>

                                <div className="color-grid">
                                    <div className="colors-container">
                                        {telaActual.colores.map((color, index) => (
                                            <div key={index} className={`color-item ${colorSeleccionado === index ? 'selected' : ''}`} onClick={() => setColorSeleccionado(index)}>
                                                {color.original ? (
                                                    <img src={color.original} alt={color.color} className="color-swatch" />
                                                ) : (
                                                    <div className="color-swatch-placeholder"></div>
                                                )}
                                                <p>{color.color}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex-column gap-20'>
                                <div className="d-flex-column gap-10">
                                    <h3 className='title'>{telaActual.titulo}:</h3>
                                    <p className='text'>{telaActual.descripcion}</p>
                                </div>

                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Costo adicional:</p>
                                    <span className='text'>S/.{categoriaActual.costoAdicional}.00</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Colores;
