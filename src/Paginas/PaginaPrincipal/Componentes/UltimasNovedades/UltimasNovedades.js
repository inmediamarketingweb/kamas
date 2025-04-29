// // import { useEffect, useRef, useState } from 'react';
// // import { v4 as uuidv4 } from "uuid";

// // import './UltimasNovedades.css';

// // function UltimasNovedades(){
// //     const [productos, setProductos] = useState([]);
// //     const scrollRef = useRef(null);

// //     useEffect(() => {
// //         fetch('/assets/json/manifest.json')
// //         .then((res) => res.json())
// //         .then((manifest) => {
// //             return Promise.all(
// //                 manifest.files.map((fileUrl) =>
// //                 fetch(fileUrl)
// //                 .then((res) => res.json())
// //                 .then((jsonData) => {
// //                     const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
// //                     const categoria = match ? match[1] : null;

// //                     if (jsonData.productos && Array.isArray(jsonData.productos)){
// //                         jsonData.productos = jsonData.productos.map((producto) => ({ ...producto, categoria }));
// //                     }

// //                     return jsonData;
// //                 })
// //                 .catch((err) => {
// //                     console.error(`Error cargando ${fileUrl}:`, err);
// //                         return { productos: [] };
// //                     })
// //                 )
// //             );
// //         })
// //         .then((jsonFilesData) => {
// //             const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
// //                 if (jsonData.productos && Array.isArray(jsonData.productos)){
// //                     return acum.concat(jsonData.productos);
// //                 }
// //                 return acum;
// //             }, []);

// //             const productosNovedades = todosProductos.filter(
// //                 (producto) =>
// //                 producto.novedades &&
// //                 producto.novedades.toLowerCase() === "si"
// //             );

// //             setProductos(productosNovedades);
// //         })
// //         .catch((error) =>
// //             console.error("Error al cargar el manifest o los JSON:", error)
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
// //             container.removeEventListener("mousedown", handleMouseDown);
// //             container.removeEventListener("mouseleave", handleMouseLeave);
// //             container.removeEventListener("mouseup", handleMouseUp);
// //             container.removeEventListener("mousemove", handleMouseMove);
// //         };
// //     }, []);

// //     const scrollSmooth = (direction) => {
// //         const container = scrollRef.current;
// //         if (!container) return;

// //         const distance = 290;
// //         const duration = 300;
// //         const intervalTime = 1000 / 60;
// //         const totalSteps = duration / intervalTime;
// //         const scrollStep =
// //         (distance / totalSteps) * (direction === "right" ? 1 : -1);
// //         let currentStep = 0;

// //         const interval = setInterval(() => {
// //             if (currentStep >= totalSteps){
// //                 clearInterval(interval);
// //                 return;
// //             }

// //             container.scrollLeft += scrollStep;
// //             currentStep++;
// //         }, intervalTime);
// //     };

// //     const truncate = (str, maxLength) => {
// //         if (str.length <= maxLength){ return str; }
// //         return str.slice(0, maxLength) + '...';
// //     };

// //     return(
// //         <div className="block-container ultimas-novedades-block-container">
// //             <section className="block-content ultimas-novedades-block-content">
// //                 <div className="block-title-container">
// //                     <h2 className="block-title">Últimas novedades</h2>
// //                 </div>

// //                 <div className="ultimas-novedades-container" ref={scrollRef}>
// //                     <ul className="ultimas-novedades-content">
// //                         {productos.map((producto) => {
// //                             const { ruta, nombre, fotos, precioNormal, precioVenta } = producto;
// //                             const descuento = Math.round( ((precioNormal - precioVenta) * 100) / precioNormal );

// //                             return(
// //                                 <li key={uuidv4()}>
// //                                     <a href={ruta} className="product-card" title={nombre}>
// //                                         <div className="product-card-images">
// //                                             <span className="product-card-discount">-{descuento}%</span>
// //                                             <img src={`${fotos}1.jpg`} alt={nombre} />
// //                                         </div>
// //                                         <div className="product-card-content">
// //                                             <div className="product-card-target">
// //                                                 <span>¡ Lo más nuevo !</span>
// //                                             </div>
// //                                             <span className="product-card-brand">KAMAS</span>
// //                                             <h4 className="product-card-name">{truncate(nombre, 56)}</h4>
// //                                             <div className="product-card-prices">
// //                                                 <span className="product-card-normal-price">S/.{precioNormal}</span>
// //                                                 <span className="product-card-sale-price">S/.{precioVenta}</span>
// //                                             </div>
// //                                         </div>
// //                                     </a>
// //                                 </li>
// //                             );
// //                         })}
// //                     </ul>
// //                 </div>

// //                 <button type="button" onClick={() => scrollSmooth("left")} className="ultimas-novedades-button ultimas-novedades-button-1 ultimas-novedades-left">
// //                     <span className="material-icons">chevron_left</span>
// //                 </button>

// //                 <button type="button" onClick={() => scrollSmooth("right")} className="ultimas-novedades-button ultimas-novedades-button-2 ultimas-novedades-right">
// //                     <span className="material-icons">chevron_right</span>
// //                 </button>
// //             </section>
// //         </div>
// //     );
// // }

// // export default UltimasNovedades;

// import { useEffect, useRef, useState } from 'react';
// import { v4 as uuidv4 } from "uuid";

// import './UltimasNovedades.css';

// function UltimasNovedades() {
//   const [productos, setProductos] = useState([]);
//   const scrollRef = useRef(null);

//   // Referencias para el auto-slider y su pausa
//   const autoSlideIntervalRef = useRef(null);
//   const autoSlideTimeoutRef = useRef(null);

//   useEffect(() => {
//     fetch('/assets/json/manifest.json')
//       .then((res) => res.json())
//       .then((manifest) => {
//         return Promise.all(
//           manifest.files.map((fileUrl) =>
//             fetch(fileUrl)
//               .then((res) => res.json())
//               .then((jsonData) => {
//                 const match = fileUrl.match(
//                   /\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//
//                 );
//                 const categoria = match ? match[1] : null;

//                 if (jsonData.productos && Array.isArray(jsonData.productos)) {
//                   jsonData.productos = jsonData.productos.map((producto) => ({
//                     ...producto,
//                     categoria,
//                   }));
//                 }

//                 return jsonData;
//               })
//               .catch((err) => {
//                 console.error(`Error cargando ${fileUrl}:`, err);
//                 return { productos: [] };
//               })
//           )
//         );
//       })
//       .then((jsonFilesData) => {
//         const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
//           if (jsonData.productos && Array.isArray(jsonData.productos)) {
//             return acum.concat(jsonData.productos);
//           }
//           return acum;
//         }, []);

//         const productosNovedades = todosProductos.filter(
//           (producto) =>
//             producto.novedades &&
//             producto.novedades.toLowerCase() === "si"
//         );

//         setProductos(productosNovedades);
//       })
//       .catch((error) =>
//         console.error("Error al cargar el manifest o los JSON:", error)
//       );
//   }, []);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     const handleMouseDown = (e) => {
//       isDown = true;
//       container.classList.add("dragging");
//       startX = e.pageX - container.offsetLeft;
//       scrollLeft = container.scrollLeft;
//     };

//     const handleMouseLeave = () => {
//       isDown = false;
//       container.classList.remove("dragging");
//     };

//     const handleMouseUp = () => {
//       isDown = false;
//       container.classList.remove("dragging");
//     };

//     const handleMouseMove = (e) => {
//       if (!isDown) return;
//       e.preventDefault();
//       const x = e.pageX - container.offsetLeft;
//       const walk = (x - startX) * 1.5;
//       container.scrollLeft = scrollLeft - walk;
//     };

//     container.addEventListener("mousedown", handleMouseDown);
//     container.addEventListener("mouseleave", handleMouseLeave);
//     container.addEventListener("mouseup", handleMouseUp);
//     container.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       container.removeEventListener("mousedown", handleMouseDown);
//       container.removeEventListener("mouseleave", handleMouseLeave);
//       container.removeEventListener("mouseup", handleMouseUp);
//       container.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Función para realizar el scroll suave (animado)
//   const scrollSmooth = (direction) => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const distance = 290;
//     const duration = 300;
//     const intervalTime = 1000 / 60;
//     const totalSteps = duration / intervalTime;
//     const scrollStep =
//       (distance / totalSteps) * (direction === "right" ? 1 : -1);
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

//   // Función para iniciar el auto-slider
//   const startAutoSlide = () => {
//     if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
//     autoSlideIntervalRef.current = setInterval(() => {
//       scrollSmooth("right");
//     }, 2000);
//   };

//   // Función para pausar el auto-slider y reiniciarlo luego de 4 segundos
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

//   // Manejadores para los botones
//   const handleLeftButtonClick = () => {
//     scrollSmooth("left");
//     pauseAutoSlide();
//   };

//   const handleRightButtonClick = () => {
//     scrollSmooth("right");
//     pauseAutoSlide();
//   };

//   // Inicia el auto-slider al montar el componente y limpia al desmontar
//   useEffect(() => {
//     startAutoSlide();
//     return () => {
//       if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
//       if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
//     };
//   }, []);

//   const truncate = (str, maxLength) => {
//     if (str.length <= maxLength) {
//       return str;
//     }
//     return str.slice(0, maxLength) + '...';
//   };

//   return (
//     <div className="block-container ultimas-novedades-block-container">
//       <section className="block-content ultimas-novedades-block-content">
//         <div className="block-title-container">
//           <h2 className="block-title">Últimas novedades</h2>
//         </div>

//         <div className="ultimas-novedades-container" ref={scrollRef}>
//           <ul className="ultimas-novedades-content">
//             {productos.map((producto) => {
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
//                       <h4 className="product-card-name">{truncate(nombre, 56)}</h4>
//                       <div className="product-card-prices">
//                         <span className="product-card-normal-price">S/.{precioNormal}</span>
//                         <span className="product-card-sale-price">S/.{precioVenta}</span>
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
import { v4 as uuidv4 } from "uuid";

import './UltimasNovedades.css';

function UltimasNovedades() {
  const [productos, setProductos] = useState([]);
  const scrollRef = useRef(null);

  // Referencias para el auto-slider, su pausa y la dirección actual
  const autoSlideIntervalRef = useRef(null);
  const autoSlideTimeoutRef = useRef(null);
  const autoDirRef = useRef("left"); // dirección inicial

  // Carga de datos
  useEffect(() => {
    fetch('/assets/json/manifest.json')
      .then((res) => res.json())
      .then((manifest) => {
        return Promise.all(
          manifest.files.map((fileUrl) =>
            fetch(fileUrl)
              .then((res) => res.json())
              .then((jsonData) => {
                const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
                const categoria = match ? match[1] : null;

                if (jsonData.productos && Array.isArray(jsonData.productos)) {
                  jsonData.productos = jsonData.productos.map((producto) => ({ ...producto, categoria }));
                }
                return jsonData;
              })
              .catch((err) => {
                console.error(`Error cargando ${fileUrl}:`, err);
                return { productos: [] };
              })
          )
        );
      })
      .then((jsonFilesData) => {
        const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
          if (jsonData.productos && Array.isArray(jsonData.productos)) {
            return acum.concat(jsonData.productos);
          }
          return acum;
        }, []);

        const productosNovedades = todosProductos.filter(
          (producto) =>
            producto.novedades &&
            producto.novedades.toLowerCase() === "si"
        );

        setProductos(productosNovedades);
      })
      .catch((error) =>
        console.error("Error al cargar el manifest o los JSON:", error)
      );
  }, []);

  // Manejo del “drag” para el contenedor
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove("dragging");
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove("dragging");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Función de scroll suave (animación de 300ms)
  const scrollSmooth = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const distance = 290;
    const duration = 300;
    const intervalTime = 1000 / 60; // aprox 60 fps
    const totalSteps = duration / intervalTime;
    const scrollStep =
      (distance / totalSteps) * (direction === "right" ? 1 : -1);
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

  // Función que comprueba límites y alterna la dirección
  const autoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    // Si está yendo hacia la derecha y alcanza el final, se invierte la dirección
    if (
      autoDirRef.current === "right" &&
      container.scrollLeft >= container.scrollWidth - container.clientWidth
    ) {
      autoDirRef.current = "left";
    }
    // Si está yendo hacia la izquierda y está al principio, se invierte la dirección
    else if (autoDirRef.current === "left" && container.scrollLeft <= 0) {
      autoDirRef.current = "right";
    }

    scrollSmooth(autoDirRef.current);
  };

  // Inicia el auto-slider
  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
    autoSlideIntervalRef.current = setInterval(() => {
      autoScroll();
    }, 2000);
  };

  // Pausa el auto-slider y lo reinicia después de 4 segundos
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

  // Manejadores para el clic en los botones
  const handleLeftButtonClick = () => {
    // Para interacción manual, dejamos que se haga scroll a la izquierda y reanudamos el auto-slider
    autoDirRef.current = "left";
    scrollSmooth("left");
    pauseAutoSlide();
  };

  const handleRightButtonClick = () => {
    autoDirRef.current = "right";
    scrollSmooth("right");
    pauseAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
      if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
    };
  }, []);

  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  };

  return (
    <div className="block-container ultimas-novedades-block-container">
      <section className="block-content ultimas-novedades-block-content">
        <div className="block-title-container">
          <h2 className="block-title">Últimas novedades</h2>
        </div>

        <div className="ultimas-novedades-container" ref={scrollRef}>
          <ul className="ultimas-novedades-content">
            {productos.map((producto) => {
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
                      <h4 className="product-card-name">{truncate(nombre, 56)}</h4>
                      <div className="product-card-prices">
                        <span className="product-card-normal-price">S/.{precioNormal}</span>
                        <span className="product-card-sale-price">S/.{precioVenta}</span>
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
