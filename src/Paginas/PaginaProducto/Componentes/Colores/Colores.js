// import './Colores.css';

// function Colores(){
//     return(
//         <>
//             <div className='product-page-colors-button'>
//                 <p className='text'>+48 colores</p>

//                 <ul className='product-page-colors-button-miniatures'>
//                     <li>
//                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                     </li>
//                     <li>
//                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                     </li>
//                     <li>
//                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                     </li>
//                     <li>
//                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                     </li>
//                     <li>
//                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                     </li>
//                 </ul>
//             </div>

//             <div className='product-page-colors-content'>
//                 <section className='d-flex-column gap-20'>
//                     <div className='d-flex-center-between gap-20'>
//                         <p className='title text'>Tipos de tela</p>
//                         <button type='button' className='product-page-colors-content-button-close'>
//                             <span class="material-icons">close</span>
//                         </button>
//                     </div>

//                     <div className='d-grid-auto-1fr gap-10'>
//                         <div className='d-flex-column gap-20'>
//                             <ul className='product-page-colors-fabrics d-flex-column gap-5'>
//                                 <li>
//                                     <button type='button' className='active'>
//                                         <p className='text'>Piel de potro</p>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button type='button' className=''>
//                                         <p className='text'>Piel de durazno</p>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button type='button' className=''>
//                                         <p className='text'>Cuero</p>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button type='button' className=''>
//                                         <p className='text'>Iker</p>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button type='button' className=''>
//                                         <p className='text'>Antifluidos</p>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button type='button' className=''>
//                                         <p className='text'>Tejido</p>
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className='product-page-colors'>
//                             <ul className='product-page-colors-results'>
//                                 <li>
//                                     <button type='button'>
//                                         <img src="/assets/imagenes/colores/piel-de-potro/COBALTO.png"/>
//                                         <p className='text'>Cobalto</p>
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             <div className='product-page-colors-layer'></div>
//         </>
//     )
// }

// export default Colores;

import React, { useEffect, useState } from 'react';
import './Colores.css';

function Colores() {
  const [data, setData] = useState(null);
  const [activeTelaIndex, setActiveTelaIndex] = useState(0);

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
      {/* Botón principal y miniaturas */}
      <div className='product-page-colors-button'>
        <p className='text'>+{activeTela.colores.length} colores</p>
        <ul className='product-page-colors-button-miniatures'>
          {activeTela.colores.slice(0, 5).map((color, index) => (
            <li key={index}>
              <img src={color.img} alt={color.color} />
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido para selección de tela y visualización de colores */}
      <div className='product-page-colors-content'>
        <section className='d-flex-column gap-20'>
          <div className='d-flex-center-between gap-20'>
            <p className='title text'>Tipos de tela</p>
            <button
              type='button'
              className='product-page-colors-content-button-close'
              onClick={() => {
                // Aquí puedes definir la acción para cerrar el panel
              }}
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className='d-grid-auto-1fr gap-10'>
            {/* Lista de botones para cada tipo de tela */}
            <div className='d-flex-column gap-20'>
              <ul className='product-page-colors-fabrics d-flex-column gap-5'>
                {telas.map((tela, index) => (
                  <li key={index}>
                    <button
                      type='button'
                      className={index === activeTelaIndex ? 'active' : ''}
                      onClick={() => setActiveTelaIndex(index)}
                    >
                      <p className='text'>{tela.tela}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visualización de colores de la tela activa */}
            <div className='product-page-colors'>
              <ul className='product-page-colors-results'>
                {activeTela.colores.map((color, index) => (
                  <li key={index}>
                    <button type='button'>
                      <img src={color.img} alt={color.color} />
                      <p className='text'>{color.color}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className='product-page-colors-layer'></div>
    </>
  );
}

export default Colores;
