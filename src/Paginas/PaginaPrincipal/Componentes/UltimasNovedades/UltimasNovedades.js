// // import { useEffect, useRef, useState } from 'react';
// // import { v4 as uuidv4 } from "uuid";

// // import './UltimasNovedades.css';

// // function UltimasNovedades(){
// //     const [productos, setProductos] = useState([]);
// //     const scrollRef = useRef(null);

// //     const autoSlideIntervalRef = useRef(null);
// //     const autoSlideTimeoutRef = useRef(null);
// //     const autoDirRef = useRef("left");

// //     useEffect(() => {
// //         fetch('/assets/json/manifest.json').then((res) => res.json()).then((manifest) => {
// //             return Promise.all(
// //                 manifest.files.map(
// //                     (fileUrl) => fetch(fileUrl).then((res) => res.json()).then((jsonData) => {
// //                         const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
// //                         const categoria = match ? match[1] : null;

// //                         if (jsonData.productos && Array.isArray(jsonData.productos)) {
// //                             jsonData.productos = jsonData.productos.map((producto) => ({ ...producto, categoria }));
// //                         }

// //                         return jsonData;
// //                     }).catch((err) => {
// //                         console.error(`Error cargando ${fileUrl}:`, err);
// //                         return { productos: [] };
// //                     })
// //                 )
// //             );
// //         })
// //         .then((jsonFilesData) => {
// //             const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
// //                 if (jsonData.productos && Array.isArray(jsonData.productos)) {
// //                     return acum.concat(jsonData.productos);
// //                 }
// //                 return acum;
// //             }, []);

// //             const productosNovedades = todosProductos.filter(
// //                 (producto) => producto.novedades && producto.novedades.toLowerCase() === "si"
// //             );

// //             setProductos(productosNovedades);
// //         }).catch(
// //             (error) => console.error("Error al cargar el manifest o los JSON:", error)
// //         );
// //     }, []);

// //     useEffect(() => {
// //         const container = scrollRef.current;
// //         if (!container) return;

// //         let isDown = false;
// //         let startX;
// //         let scrollLeft;

// //         const handleMouseDown = (e) => {
// //             isDown = true;
// //             container.classList.add("dragging");
// //             startX = e.pageX - container.offsetLeft;
// //             scrollLeft = container.scrollLeft;
// //         };

// //         const handleMouseLeave = () => {
// //             isDown = false;
// //             container.classList.remove("dragging");
// //         };

// //         const handleMouseUp = () => {
// //             isDown = false;
// //             container.classList.remove("dragging");
// //         };

// //         const handleMouseMove = (e) => {
// //             if (!isDown) return;
// //             e.preventDefault();
// //             const x = e.pageX - container.offsetLeft;
// //             const walk = (x - startX) * 1.5;
// //             container.scrollLeft = scrollLeft - walk;
// //         };

// //         container.addEventListener("mousedown", handleMouseDown);
// //         container.addEventListener("mouseleave", handleMouseLeave);
// //         container.addEventListener("mouseup", handleMouseUp);
// //         container.addEventListener("mousemove", handleMouseMove);

// //         return () => {
// //         container.removeEventListener("mousedown", handleMouseDown);
// //         container.removeEventListener("mouseleave", handleMouseLeave);
// //         container.removeEventListener("mouseup", handleMouseUp);
// //         container.removeEventListener("mousemove", handleMouseMove);
// //         };
// //     }, []);

// //     const scrollSmooth = (direction) => {
// //         const container = scrollRef.current;
// //         if (!container) return;

// //         const distance = 290;
// //         const duration = 300;
// //         const intervalTime = 1000 / 60;
// //         const totalSteps = duration / intervalTime;
// //         const scrollStep = (distance / totalSteps) * (direction === "right" ? 1 : -1);
// //         let currentStep = 0;

// //         const interval = setInterval(() => {
// //             if (currentStep >= totalSteps) {
// //                 clearInterval(interval);
// //                 return;
// //             }
// //             container.scrollLeft += scrollStep;
// //             currentStep++;
// //         }, intervalTime);
// //     };

// //     const autoScroll = () => {
// //         const container = scrollRef.current;
// //         if (!container) return;

// //         if (
// //             autoDirRef.current === "right" &&
// //             container.scrollLeft >= container.scrollWidth - container.clientWidth
// //         ) { autoDirRef.current = "left"; }
// //             else if (autoDirRef.current === "left" && container.scrollLeft <= 0) {
// //             autoDirRef.current = "right";
// //         }

// //         scrollSmooth(autoDirRef.current);
// //     };

// //     const startAutoSlide = () => {
// //         if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
// //         autoSlideIntervalRef.current = setInterval(() => {
// //             autoScroll();
// //         }, 2000);
// //     };

// //     const pauseAutoSlide = () => {
// //         if (autoSlideIntervalRef.current) {
// //             clearInterval(autoSlideIntervalRef.current);
// //             autoSlideIntervalRef.current = null;
// //         }
// //         if (autoSlideTimeoutRef.current) {
// //             clearTimeout(autoSlideTimeoutRef.current);
// //         }
// //         autoSlideTimeoutRef.current = setTimeout(() => {
// //             startAutoSlide();
// //         }, 4000);
// //     };

// //     const handleLeftButtonClick = () => {
// //         autoDirRef.current = "left";
// //         scrollSmooth("left");
// //         pauseAutoSlide();
// //     };

// //     const handleRightButtonClick = () => {
// //         autoDirRef.current = "right";
// //         scrollSmooth("right");
// //         pauseAutoSlide();
// //     };

// //     useEffect(() => {
// //         startAutoSlide();
// //         return () => {
// //             if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
// //             if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
// //         };
// //     }, []);

// //     const truncate = (str, maxLength) => {
// //         if (str.length <= maxLength) {
// //             return str;
// //         }
// //         return str.slice(0, maxLength) + '...';
// //     };

// //     return(
// //         <div className="block-container ultimas-novedades-block-container">
// //             <section className="block-content ultimas-novedades-block-content">
// //                 <div className="block-title-container">
// //                     <h2 className="block-title">Últimas novedades</h2>
// //                 </div>

// //                 <div className="ultimas-novedades-container" ref={scrollRef}>
// //                 <ul className="ultimas-novedades-content">
// //                 {productos.map((producto) => {
// //                 const { ruta, nombre, fotos, precioNormal, precioVenta } = producto;
// //                 const descuento = Math.round(
// //                 ((precioNormal - precioVenta) * 100) / precioNormal
// //                 );

// //                 return (
// //                 <li key={uuidv4()}>
// //                 <a href={ruta} className="product-card" title={nombre}>
// //                 <div className="product-card-images">
// //                 <span className="product-card-discount">-{descuento}%</span>
// //                 <img src={`${fotos}1.jpg`} alt={nombre} />
// //                 </div>
// //                 <div className="product-card-content">
// //                 <div className="product-card-target">
// //                 <span>¡ Lo más nuevo !</span>
// //                 </div>
// //                 <span className="product-card-brand">KAMAS</span>
// //                 <h4 className="product-card-name">{truncate(nombre, 56)}</h4>
// //                 <div className="product-card-prices">
// //                 <span className="product-card-normal-price">S/.{precioNormal}</span>
// //                 <span className="product-card-sale-price">S/.{precioVenta}</span>
// //                 </div>
// //                 </div>
// //                 </a>
// //                 </li>
// //                 );
// //                 })}
// //                 </ul>
// //                 </div>

// //                 <button type="button" onClick={handleLeftButtonClick} className="ultimas-novedades-button ultimas-novedades-button-1 ultimas-novedades-left">
// //                     <span className="material-icons">chevron_left</span>
// //                 </button>

// //                 <button type="button" onClick={handleRightButtonClick} className="ultimas-novedades-button ultimas-novedades-button-2 ultimas-novedades-right">
// //                     <span className="material-icons">chevron_right</span>
// //                 </button>
// //             </section>
// //         </div>
// //     );
// // }

// // export default UltimasNovedades;

// import { useEffect, useRef, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// import './UltimasNovedades.css';

// function UltimasNovedades() {
//   const [productos, setProductos] = useState([]);
//   const scrollRef = useRef(null);

//   const autoSlideIntervalRef = useRef(null);
//   const autoSlideTimeoutRef = useRef(null);
//   const autoDirRef = useRef('left');

//   // Carga el manifest y obtiene los últimos 4 productos de cada JSON
//   useEffect(() => {
//     fetch('/assets/json/manifest.json')
//       .then(res => res.json())
//       .then(manifest =>
//         Promise.all(
//           manifest.files.map(fileUrl =>
//             fetch(fileUrl)
//               .then(res => res.json())
//               .then(jsonData => {
//                 const match = fileUrl.match(
//                   /\/assets\/json\/categorias\/([^\/]+)\/sub-categorias\//
//                 );
//                 const categoria = match ? match[1] : null;

//                 if (Array.isArray(jsonData.productos)) {
//                   // Inyecta la categoría
//                   jsonData.productos = jsonData.productos.map(producto => ({
//                     ...producto,
//                     categoria,
//                   }));
//                 }

//                 return jsonData;
//               })
//               .catch(err => {
//                 console.error(`Error cargando ${fileUrl}:`, err);
//                 return { productos: [] };
//               })
//           )
//         )
//       )
//       .then(jsonFilesData => {
//         // Por cada archivo, tomar hasta 4 últimos productos
//         const ultimos4porArchivo = jsonFilesData.reduce(
//           (acum, { productos = [] }) => acum.concat(productos.slice(-1)),
//           []
//         );

//         setProductos(ultimos4porArchivo);
//       })
//       .catch(error =>
//         console.error('Error al cargar el manifest o los JSON:', error)
//       );
//   }, []);

//   // Manejo de arrastre del scroll
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     const handleMouseDown = e => {
//       isDown = true;
//       container.classList.add('dragging');
//       startX = e.pageX - container.offsetLeft;
//       scrollLeft = container.scrollLeft;
//     };

//     const handleMouseLeave = () => {
//       isDown = false;
//       container.classList.remove('dragging');
//     };

//     const handleMouseUp = () => {
//       isDown = false;
//       container.classList.remove('dragging');
//     };

//     const handleMouseMove = e => {
//       if (!isDown) return;
//       e.preventDefault();
//       const x = e.pageX - container.offsetLeft;
//       const walk = (x - startX) * 1.5;
//       container.scrollLeft = scrollLeft - walk;
//     };

//     container.addEventListener('mousedown', handleMouseDown);
//     container.addEventListener('mouseleave', handleMouseLeave);
//     container.addEventListener('mouseup', handleMouseUp);
//     container.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       container.removeEventListener('mousedown', handleMouseDown);
//       container.removeEventListener('mouseleave', handleMouseLeave);
//       container.removeEventListener('mouseup', handleMouseUp);
//       container.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Scroll suave
//   const scrollSmooth = direction => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const distance = 290;
//     const duration = 300;
//     const intervalTime = 1000 / 60;
//     const totalSteps = duration / intervalTime;
//     const scrollStep = (distance / totalSteps) * (direction === 'right' ? 1 : -1);
//     let currentStep = 0;

//     const interval = setInterval(() => {
//       if (currentStep >= totalSteps) {
//         clearInterval(interval);
//         return;
//       }
//       container.scrollLeft += scrollStep;
//       currentStep++;
//     }, intervalTime);
//   };

//   // Auto-scroll
//   const autoScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;

//     if (
//       autoDirRef.current === 'right' &&
//       container.scrollLeft >= container.scrollWidth - container.clientWidth
//     ) {
//       autoDirRef.current = 'left';
//     } else if (
//       autoDirRef.current === 'left' &&
//       container.scrollLeft <= 0
//     ) {
//       autoDirRef.current = 'right';
//     }

//     scrollSmooth(autoDirRef.current);
//   };

//   const startAutoSlide = () => {
//     if (autoSlideIntervalRef.current)
//       clearInterval(autoSlideIntervalRef.current);
//     autoSlideIntervalRef.current = setInterval(() => {
//       autoScroll();
//     }, 2000);
//   };

//   const pauseAutoSlide = () => {
//     if (autoSlideIntervalRef.current) {
//       clearInterval(autoSlideIntervalRef.current);
//       autoSlideIntervalRef.current = null;
//     }
//     if (autoSlideTimeoutRef.current) {
//       clearTimeout(autoSlideTimeoutRef.current);
//     }
//     autoSlideTimeoutRef.current = setTimeout(() => {
//       startAutoSlide();
//     }, 4000);
//   };

//   const handleLeftButtonClick = () => {
//     autoDirRef.current = 'left';
//     scrollSmooth('left');
//     pauseAutoSlide();
//   };

//   const handleRightButtonClick = () => {
//     autoDirRef.current = 'right';
//     scrollSmooth('right');
//     pauseAutoSlide();
//   };

//   useEffect(() => {
//     startAutoSlide();
//     return () => {
//       if (autoSlideIntervalRef.current)
//         clearInterval(autoSlideIntervalRef.current);
//       if (autoSlideTimeoutRef.current)
//         clearTimeout(autoSlideTimeoutRef.current);
//     };
//   }, []);

//   // Trunca texto largo
//   const truncate = (str, maxLength) => {
//     if (!str) return '';
//     return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
//   };

//   return (
//     <div className="block-container ultimas-novedades-block-container">
//       <section className="block-content ultimas-novedades-block-content">
//         <div className="block-title-container">
//           <h2 className="block-title">Últimas novedades</h2>
//         </div>

//         <div className="ultimas-novedades-container" ref={scrollRef}>
//           <ul className="ultimas-novedades-content">
//             {productos.map(producto => {
//               const { ruta, nombre, fotos, precioNormal, precioVenta } = producto;
//               const descuento = Math.round(
//                 ((precioNormal - precioVenta) * 100) / precioNormal
//               );

//               return (
//                 <li key={uuidv4()}>
//                   <a href={ruta} className="product-card" title={nombre}>
//                     <div className="product-card-images">
//                       <span className="product-card-discount">-{descuento}%</span>
//                       <img src={`${fotos}1.jpg`} alt={nombre} />
//                     </div>
//                     <div className="product-card-content">
//                       <div className="product-card-target">
//                         <span>¡ Lo más nuevo !</span>
//                       </div>
//                       <span className="product-card-brand">KAMAS</span>
//                       <h4 className="product-card-name">
//                         {truncate(nombre, 56)}
//                       </h4>
//                       <div className="product-card-prices">
//                         <span className="product-card-normal-price">
//                           S/.{precioNormal}
//                         </span>
//                         <span className="product-card-sale-price">
//                           S/.{precioVenta}
//                         </span>
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <button
//           type="button"
//           onClick={handleLeftButtonClick}
//           className="ultimas-novedades-button ultimas-novedades-button-1 ultimas-novedades-left"
//         >
//           <span className="material-icons">chevron_left</span>
//         </button>

//         <button
//           type="button"
//           onClick={handleRightButtonClick}
//           className="ultimas-novedades-button ultimas-novedades-button-2 ultimas-novedades-right"
//         >
//           <span className="material-icons">chevron_right</span>
//         </button>
//       </section>
//     </div>
//   );
// }

// export default UltimasNovedades;

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './UltimasNovedades.css';

function UltimasNovedades() {
  const [productos, setProductos] = useState([]);
  const scrollRef = useRef(null);

  const autoSlideIntervalRef = useRef(null);
  const autoSlideTimeoutRef = useRef(null);
  const autoDirRef = useRef('left');

  // Carga el manifest y obtiene el último producto de cada sub-categoría
  // solo para categorías especificadas
  useEffect(() => {
    const categoriasPermitidas = ['camas-box-tarimas', 'dormitorios', 'camas-funcionales'];

    fetch('/assets/json/manifest.json')
      .then(res => res.json())
      .then(manifest =>
        Promise.all(
          manifest.files.map(fileUrl =>
            fetch(fileUrl)
              .then(res => res.json())
              .then(jsonData => {
                const match = fileUrl.match(
                  /\/assets\/json\/categorias\/([^\/]+)\/sub-categorias\//
                );
                const categoria = match ? match[1] : null;

                // Solo inyectar categoría si está permitida
                if (Array.isArray(jsonData.productos) && categoria) {
                  jsonData.productos = jsonData.productos.map(producto => ({
                    ...producto,
                    categoria,
                  }));
                }

                return { productos: jsonData.productos || [], categoria };
              })
              .catch(err => {
                console.error(`Error cargando ${fileUrl}:`, err);
                return { productos: [], categoria: null };
              })
          )
        )
      )
      .then(jsonFilesData => {
        // Para cada archivo con categoría permitida, tomar el último producto
        const ultimosPorSubcategoria = jsonFilesData.reduce((acum, { productos, categoria }) => {
          if (!categoriasPermitidas.includes(categoria)) return acum;
          if (productos.length > 0) {
            const ultimo = productos[productos.length - 1];
            acum.push(ultimo);
          }
          return acum;
        }, []);

        setProductos(ultimosPorSubcategoria);
      })
      .catch(error =>
        console.error('Error al cargar el manifest o los JSON:', error)
      );
  }, []);

  // Manejo de arrastre del scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = e => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove('dragging');
    };

    const handleMouseMove = e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll suave
  const scrollSmooth = direction => {
    const container = scrollRef.current;
    if (!container) return;

    const distance = 290;
    const duration = 300;
    const intervalTime = 1000 / 60;
    const totalSteps = duration / intervalTime;
    const scrollStep = (distance / totalSteps) * (direction === 'right' ? 1 : -1);
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        return;
      }
      container.scrollLeft += scrollStep;
      currentStep++;
    }, intervalTime);
  };

  // Auto-scroll
  const autoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (
      autoDirRef.current === 'right' &&
      container.scrollLeft >= container.scrollWidth - container.clientWidth
    ) {
      autoDirRef.current = 'left';
    } else if (
      autoDirRef.current === 'left' &&
      container.scrollLeft <= 0
    ) {
      autoDirRef.current = 'right';
    }

    scrollSmooth(autoDirRef.current);
  };

  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current)
      clearInterval(autoSlideIntervalRef.current);
    autoSlideIntervalRef.current = setInterval(() => {
      autoScroll();
    }, 2000);
  };

  const pauseAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current);
    }
    autoSlideTimeoutRef.current = setTimeout(() => {
      startAutoSlide();
    }, 4000);
  };

  const handleLeftButtonClick = () => {
    autoDirRef.current = 'left';
    scrollSmooth('left');
    pauseAutoSlide();
  };

  const handleRightButtonClick = () => {
    autoDirRef.current = 'right';
    scrollSmooth('right');
    pauseAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideIntervalRef.current)
        clearInterval(autoSlideIntervalRef.current);
      if (autoSlideTimeoutRef.current)
        clearTimeout(autoSlideTimeoutRef.current);
    };
  }, []);

  // Trunca texto largo
  const truncate = (str, maxLength) => {
    if (!str) return '';
    return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
  };

  return (
    <div className="block-container ultimas-novedades-block-container">
      <section className="block-content ultimas-novedades-block-content">
        <div className="block-title-container">
          <h2 className="block-title">Últimas novedades</h2>
        </div>

        <div className="ultimas-novedades-container" ref={scrollRef}>
          <ul className="ultimas-novedades-content">
            {productos.map(producto => {
              const { ruta, nombre, fotos, precioNormal, precioVenta } = producto;
              const descuento = Math.round(
                ((precioNormal - precioVenta) * 100) / precioNormal
              );

              return (
                <li key={uuidv4()}>
                  <a href={ruta} className="product-card" title={nombre}>
                    <div className="product-card-images">
                      <span className="product-card-discount">-{descuento}%</span>
                      <img src={`${fotos}1.jpg`} alt={nombre} />
                    </div>
                    <div className="product-card-content">
                      <div className="product-card-target">
                        <span>¡ Lo más nuevo !</span>
                      </div>
                      <span className="product-card-brand">KAMAS</span>
                      <h4 className="product-card-name">
                        {truncate(nombre, 56)}
                      </h4>
                      <div className="product-card-prices">
                        <span className="product-card-normal-price">
                          S/.{precioNormal}
                        </span>
                        <span className="product-card-sale-price">
                          S/.{precioVenta}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleLeftButtonClick}
          className="ultimas-novedades-button ultimas-novedades-button-1 ultimas-novedades-left"
        >
          <span className="material-icons">chevron_left</span>
        </button>

        <button
          type="button"
          onClick={handleRightButtonClick}
          className="ultimas-novedades-button ultimas-novedades-button-2 ultimas-novedades-right"
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </section>
    </div>
  );
}

export default UltimasNovedades;
