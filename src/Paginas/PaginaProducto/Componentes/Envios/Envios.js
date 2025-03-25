// // import React, { useState, useEffect } from 'react';

// // import './Envios.css';

// // const CostosDeEnvio = ({ tipoDeEnvioProducto }) => {
// //     const [departamentos, setDepartamentos] = useState([]);
// //     const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');

// //     const [provincias, setProvincias] = useState([]);
// //     const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');

// //     const [distritos, setDistritos] = useState([]);
// //     const [distritoSeleccionado, setDistritoSeleccionado] = useState('');

// //     const [agenciaSeleccionada, setAgenciaSeleccionada] = useState('');
// //     const [sedes, setSedes] = useState([]);
// //     const [sedeSeleccionada, setSedeSeleccionada] = useState('');
// //     const [precioSede, setPrecioSede] = useState(null);    

// //     const [precioEnvio, setPrecioEnvio] = useState(null);
// //     const [agenciasRecomendadas, setAgenciasRecomendadas] = useState([]);

// //     const sanitizeClassName = (text) => {
// //         return text
// //             .normalize("NFD")
// //             .replace(/[\u0300-\u036f]/g, "")
// //             .toLowerCase()
// //             .replace(/\s+/g, "-");
// //     };

// //     const tipoDeEnvioClass = sanitizeClassName(tipoDeEnvioProducto);

// //     useEffect(() => {
// //         fetch('/assets/json/costos-de-envio.json')
// //             .then(response => response.json())
// //             .then(data => setDepartamentos(data.departamentos))
// //             .catch(error => console.error('Error al cargar costos de envío:', error));
// //     }, []);

// //     const handleDepartamentoChange = (e) => {
// //         const depto = e.target.value;
// //         setDepartamentoSeleccionado(depto);
// //         setProvincias(departamentos.find(d => d.departamento === depto)?.provincias || []);
// //         setProvinciaSeleccionada('');
// //         setDistritos([]);
// //         setDistritoSeleccionado('');
// //         setPrecioEnvio(null);
// //         setAgenciasRecomendadas([]);
// //     };

// //     const handleProvinciaChange = (e) => {
// //         const prov = e.target.value;
// //         setProvinciaSeleccionada(prov);
// //         setDistritos(provincias.find(p => p.provincia === prov)?.distritos || []);
// //         setDistritoSeleccionado('');
// //         setPrecioEnvio(null);
// //         setAgenciasRecomendadas([]);
// //     };

// //     const handleDistritoChange = (e) => {
// //         const dist = e.target.value;
// //         setDistritoSeleccionado(dist);
    
// //         const distritoObj = distritos.find(d => d.distrito === dist);
// //         if (distritoObj) {
// //             const envio = distritoObj['tipos-de-envio'].find(te => te['tipo-de-envio'] === tipoDeEnvioProducto);
// //             const precio = envio ? envio.precio : 'No disponible';
    
// //             if (departamentoSeleccionado !== 'Lima') {
// //                 setPrecioEnvio(precio !== 'No disponible' ? { valor: `S/. ${precio}`, extra: "Hasta la agencia" } : null);
                
// //                 const provinciaObj = provincias.find(p => p.provincia === provinciaSeleccionada);
// //                 setAgenciasRecomendadas(provinciaObj?.['agencias-recomendadas'] || []);
// //             } else {
// //                 setPrecioEnvio(precio !== 'No disponible' ? `S/ ${precio}` : 'No disponible');
// //                 setAgenciasRecomendadas([]);
// //             }
// //         } else {
// //             setPrecioEnvio(null);
// //             setAgenciasRecomendadas([]);
// //         }
// //     };    

// //     const handleAgenciaChange = (e) => {
// //         const agenciaNombre = e.target.value;
// //         setAgenciaSeleccionada(agenciaNombre);
        
// //         const agenciaObj = agenciasRecomendadas.find(ag => ag.nombre === agenciaNombre);
// //         setSedes(agenciaObj?.sedes || []);
        
// //         setSedeSeleccionada('');
// //         setPrecioSede(null);
// //     };

// //     const handleSedeChange = (e) => {
// //         const sedeNombre = e.target.value;
// //         setSedeSeleccionada(sedeNombre);
    
// //         const sedeObj = sedes.find(s => s.sede === sedeNombre);
    
// //         if (sedeObj) {
// //             const preferente = sedeObj['tipos-de-envio']?.find(te => te['tipo-de-envio'] === "Envío preferente");
    
// //             setPrecioSede(preferente ? `S/. ${preferente.precio}` : "No disponible");
// //         } else {
// //             setPrecioSede(null);
// //         }
// //     };         

// //     return(
// //         <div className='product-page-shipments'>
// //             <div className='d-flex-column gap-10'>
// //                 <div className='d-flex-column gap-10'>
// //                     <select onChange={handleDepartamentoChange} value={departamentoSeleccionado}>
// //                         <option value="">Seleccione departamento</option>
// //                         {departamentos.map(depto => (
// //                             <option key={depto.id} value={depto.departamento}>{depto.departamento}</option>
// //                         ))}
// //                     </select>

// //                     <select onChange={handleProvinciaChange} value={provinciaSeleccionada} disabled={!provincias.length}>
// //                         <option value="">Seleccione provincia</option>
// //                         {provincias.map(prov => (
// //                             <option key={prov.id} value={prov.provincia}>{prov.provincia}</option>
// //                         ))}
// //                     </select>

// //                     <select onChange={handleDistritoChange} value={distritoSeleccionado} disabled={!distritos.length}>
// //                         <option value="">Seleccione distrito</option>
// //                         {distritos.map(dist => (
// //                             <option key={dist.id} value={dist.distrito}>{dist.distrito}</option>
// //                         ))}
// //                     </select>
// //                 </div>

// //                 {agenciasRecomendadas.length > 0 && (
// //                     <div className="agencias-recomendadas">
// //                         <h4 className='product-page-subtitle'>Agencias recomendadas:</h4>

// //                         <div className='d-flex-column gap-10'>
// //                             <select onChange={handleAgenciaChange} value={agenciaSeleccionada}>
// //                                 <option value="">Seleccione agencia</option>
// //                                 {agenciasRecomendadas.map(agencia => (
// //                                     <option key={agencia.id} value={agencia.nombre}>{agencia.nombre}</option>
// //                                 ))}
// //                             </select>

// //                             {sedes.length > 0 && (
// //                                 <select onChange={handleSedeChange} value={sedeSeleccionada}>
// //                                     <option value="">Seleccione sede</option>
// //                                     {sedes.map(sede => (
// //                                         <option key={sede.id} value={sede.sede}>{sede.sede}</option>
// //                                     ))}
// //                                 </select>
// //                             )}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>

// //             {distritoSeleccionado && (
// //                 <div className="price-shipments">
// //                     <div className={`price-shipment ${tipoDeEnvioClass}`}>
// //                         <div className='price-shipment-type'>
// //                             <span className="material-icons">local_shipping</span>
// //                             <p className='price-shipments-title'>{tipoDeEnvioProducto}</p>
// //                         </div>

// //                         <div className='price-shipment-price'>
// //                             <p>
// //                                 {tipoDeEnvioProducto === "Gratis" ? "Gratis" :
// //                                 departamentoSeleccionado === "Lima" ? precioEnvio : 
// //                                 (sedeSeleccionada ? precioSede : "Seleccione una sede")}
// //                             </p>
// //                             {departamentoSeleccionado !== "Lima" && sedeSeleccionada && <span>De la fábrica a la agencia</span>}
// //                         </div>
// //                     </div>

// //                     <div className='price-shipment envio-express'>
// //                         <div className='price-shipment-type'>
// //                             <span className="material-icons">local_shipping</span>
// //                             <p className='price-shipments-title'>{tipoDeEnvioProducto}</p>
// //                         </div>

// //                         <div className='price-shipment-price'>
// //                             <p>Precio</p>
// //                             <span>A tu domicilio</span>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default CostosDeEnvio;

// import React, { useState, useEffect } from 'react';

// import './Envios.css';

// const CostosDeEnvio = ({ tipoDeEnvioProducto }) => {
//     const [departamentos, setDepartamentos] = useState([]);
//     const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');

//     const [provincias, setProvincias] = useState([]);
//     const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');

//     const [distritos, setDistritos] = useState([]);
//     const [distritoSeleccionado, setDistritoSeleccionado] = useState('');

//     const [agenciaSeleccionada, setAgenciaSeleccionada] = useState('');
//     const [sedes, setSedes] = useState([]);
//     const [sedeSeleccionada, setSedeSeleccionada] = useState('');
//     const [precioSede, setPrecioSede] = useState(null);    

//     const [precioEnvio, setPrecioEnvio] = useState(null);
//     const [precioEnvioExpress, setPrecioEnvioExpress] = useState(null);
//     const [agenciasRecomendadas, setAgenciasRecomendadas] = useState([]);

//     const sanitizeClassName = (text) => {
//         return text
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//             .toLowerCase()
//             .replace(/\s+/g, "-");
//     };

//     const tipoDeEnvioClass = sanitizeClassName(tipoDeEnvioProducto);

//     useEffect(() => {
//         fetch('/assets/json/costos-de-envio.json')
//             .then(response => response.json())
//             .then(data => setDepartamentos(data.departamentos))
//             .catch(error => console.error('Error al cargar costos de envío:', error));
//     }, []);

//     const handleDepartamentoChange = (e) => {
//         const depto = e.target.value;
//         setDepartamentoSeleccionado(depto);
//         setProvincias(departamentos.find(d => d.departamento === depto)?.provincias || []);
//         setProvinciaSeleccionada('');
//         setDistritos([]);
//         setDistritoSeleccionado('');
//         setPrecioEnvio(null);
//         setPrecioEnvioExpress(null);
//         setAgenciasRecomendadas([]);
//     };

//     const handleProvinciaChange = (e) => {
//         const prov = e.target.value;
//         setProvinciaSeleccionada(prov);
//         setDistritos(provincias.find(p => p.provincia === prov)?.distritos || []);
//         setDistritoSeleccionado('');
//         setPrecioEnvio(null);
//         setPrecioEnvioExpress(null);
//         setAgenciasRecomendadas([]);
//     };

//     const handleDistritoChange = (e) => {
//         const dist = e.target.value;
//         setDistritoSeleccionado(dist);
        
//         const distritoObj = distritos.find(d => d.distrito === dist);
//         if (distritoObj) {
//             const preferente = distritoObj['tipos-de-envio'].find(te => te['tipo-de-envio'] === tipoDeEnvioProducto);
//             const express = distritoObj['tipos-de-envio'].find(te => te['tipo-de-envio'] === "Envío express");
    
//             if (departamentoSeleccionado === "Lima") {
//                 // Renderizar precios de acuerdo al tipo de envío
//                 setPrecioEnvio(preferente ? `S/ ${preferente.precio}` : 'No disponible');
//                 setPrecioEnvioExpress(express ? `S/ ${express.precio}` : 'No disponible');
//             } else {
//                 setPrecioEnvio(preferente ? { valor: `S/. ${preferente.precio}`, extra: "Hasta la agencia" } : null);
    
//                 const provinciaObj = provincias.find(p => p.provincia === provinciaSeleccionada);
//                 setAgenciasRecomendadas(provinciaObj?.['agencias-recomendadas'] || []);
//             }
//         } else {
//             setPrecioEnvio(null);
//             setPrecioEnvioExpress(null);
//             setAgenciasRecomendadas([]);
//         }
//     };     

//     const handleAgenciaChange = (e) => {
//         const agenciaNombre = e.target.value;
//         setAgenciaSeleccionada(agenciaNombre);
        
//         const agenciaObj = agenciasRecomendadas.find(ag => ag.nombre === agenciaNombre);
//         setSedes(agenciaObj?.sedes || []);
        
//         setSedeSeleccionada('');
//         setPrecioSede(null);
//     };

//     const handleSedeChange = (e) => {
//         const sedeNombre = e.target.value;
//         setSedeSeleccionada(sedeNombre);
    
//         const sedeObj = sedes.find(s => s.sede === sedeNombre);
    
//         if (sedeObj) {
//             const preferente = sedeObj['tipos-de-envio']?.find(te => te['tipo-de-envio'] === "Envío preferente");
//             const express = sedeObj['tipos-de-envio']?.find(te => te['tipo-de-envio'] === "Envío express");

//             setPrecioSede(preferente ? `S/. ${preferente.precio}` : "No disponible");
//             setPrecioEnvioExpress(express ? `S/. ${express.precio}` : "No disponible");
//         } else {
//             setPrecioSede(null);
//             setPrecioEnvioExpress(null);
//         }
//     };       

//     return(
//         <div className='product-page-shipments'>
//             <div className='d-flex-column gap-10'>
//                 <div className='d-flex-column gap-10'>
//                     <select onChange={handleDepartamentoChange} value={departamentoSeleccionado}>
//                         <option value="">Seleccione departamento</option>
//                         {departamentos.map(depto => (
//                             <option key={depto.id} value={depto.departamento}>{depto.departamento}</option>
//                         ))}
//                     </select>

//                     <select onChange={handleProvinciaChange} value={provinciaSeleccionada} disabled={!provincias.length}>
//                         <option value="">Seleccione provincia</option>
//                         {provincias.map(prov => (
//                             <option key={prov.id} value={prov.provincia}>{prov.provincia}</option>
//                         ))}
//                     </select>

//                     <select onChange={handleDistritoChange} value={distritoSeleccionado} disabled={!distritos.length}>
//                         <option value="">Seleccione distrito</option>
//                         {distritos.map(dist => (
//                             <option key={dist.id} value={dist.distrito}>{dist.distrito}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {agenciasRecomendadas.length > 0 && (
//                     <div className="agencias-recomendadas">
//                         <h4 className='product-page-subtitle'>Agencias recomendadas:</h4>

//                         <div className='d-flex-column gap-10'>
//                             <select onChange={handleAgenciaChange} value={agenciaSeleccionada}>
//                                 <option value="">Seleccione agencia</option>
//                                 {agenciasRecomendadas.map(agencia => (
//                                     <option key={agencia.id} value={agencia.nombre}>{agencia.nombre}</option>
//                                 ))}
//                             </select>

//                             {sedes.length > 0 && (
//                                 <select onChange={handleSedeChange} value={sedeSeleccionada}>
//                                     <option value="">Seleccione sede</option>
//                                     {sedes.map(sede => (
//                                         <option key={sede.id} value={sede.sede}>{sede.sede}</option>
//                                     ))}
//                                 </select>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {distritoSeleccionado && (
//                 <div className="price-shipments">
//                     <div className={`price-shipment ${tipoDeEnvioClass}`}>
//                         <div className='price-shipment-type'>
//                             <span className="material-icons">local_shipping</span>
//                             <p className='price-shipments-title'>{tipoDeEnvioProducto}</p>
//                         </div>

//                         <div className='price-shipment-price'>
//                             <p>
//                                 {tipoDeEnvioProducto === "Gratis" ? "Gratis" :
//                                 departamentoSeleccionado === "Lima" ? precioEnvio : 
//                                 (sedeSeleccionada ? precioSede : "Seleccione una sede")}
//                             </p>
//                             {departamentoSeleccionado !== "Lima" && sedeSeleccionada && <span>De la fábrica a la agencia</span>}
//                         </div>
//                     </div>

//                     {departamentoSeleccionado === "Lima" && (
//                         <div className='price-shipment envio-express'>
//                             <div className='price-shipment-type'>
//                                 <span className="material-icons">bolt</span>
//                                 <p className='price-shipments-title'>Envío Express</p>
//                             </div>

//                             <div className='price-shipment-price'>
//                                 <p>{precioEnvioExpress || "No disponible"}</p>
//                                 <span>A tu domicilio</span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CostosDeEnvio;

import React, { useState, useEffect } from 'react';

import './Envios.css';

const CostosDeEnvio = ({ tipoDeEnvioProducto }) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');

    const [provincias, setProvincias] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');

    const [distritos, setDistritos] = useState([]);
    const [distritoSeleccionado, setDistritoSeleccionado] = useState('');

    const [agenciaSeleccionada, setAgenciaSeleccionada] = useState('');
    const [sedes, setSedes] = useState([]);
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');
    const [precioSede, setPrecioSede] = useState(null);    

    const [precioEnvio, setPrecioEnvio] = useState(null);
    const [precioEnvioExpress, setPrecioEnvioExpress] = useState(null);
    const [agenciasRecomendadas, setAgenciasRecomendadas] = useState([]);

    const sanitizeClassName = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-");
    };

    const tipoDeEnvioClass = sanitizeClassName(tipoDeEnvioProducto);

    useEffect(() => {
        fetch('/assets/json/costos-de-envio.json')
            .then(response => response.json())
            .then(data => setDepartamentos(data.departamentos))
            .catch(error => console.error('Error al cargar costos de envío:', error));
    }, []);

    const handleDepartamentoChange = (e) => {
        const depto = e.target.value;
        setDepartamentoSeleccionado(depto);
        setProvincias(departamentos.find(d => d.departamento === depto)?.provincias || []);
        setProvinciaSeleccionada('');
        setDistritos([]);
        setDistritoSeleccionado('');
        setPrecioEnvio(null);
        setPrecioEnvioExpress(null);
        setAgenciasRecomendadas([]);
    };

    const handleProvinciaChange = (e) => {
        const prov = e.target.value;
        setProvinciaSeleccionada(prov);
        setDistritos(provincias.find(p => p.provincia === prov)?.distritos || []);
        setDistritoSeleccionado('');
        setPrecioEnvio(null);
        setPrecioEnvioExpress(null);
        setAgenciasRecomendadas([]);
    };

    const handleDistritoChange = (e) => {
        const dist = e.target.value;
        setDistritoSeleccionado(dist);
        
        const distritoObj = distritos.find(d => d.distrito === dist);
        if (distritoObj) {
            const preferente = distritoObj['tipos-de-envio'].find(te => te['tipo-de-envio'] === tipoDeEnvioProducto);
            const express = distritoObj['tipos-de-envio'].find(te => te['tipo-de-envio'] === "Envío express");
    
            if (departamentoSeleccionado === "Lima") {
                setPrecioEnvio(preferente ? `S/ ${preferente.precio}` : 'No disponible');
                setPrecioEnvioExpress(express ? `S/ ${express.precio}` : 'No disponible');
            } else {
                setPrecioEnvio(preferente ? { valor: `S/. ${preferente.precio}`, extra: "Hasta la agencia" } : null);
                const provinciaObj = provincias.find(p => p.provincia === provinciaSeleccionada);
                setAgenciasRecomendadas(provinciaObj?.['agencias-recomendadas'] || []);
            }
        } else {
            setPrecioEnvio(null);
            setPrecioEnvioExpress(null);
            setAgenciasRecomendadas([]);
        }
    };     

    const handleAgenciaChange = (e) => {
        const agenciaNombre = e.target.value;
        setAgenciaSeleccionada(agenciaNombre);
        
        const agenciaObj = agenciasRecomendadas.find(ag => ag.nombre === agenciaNombre);
        setSedes(agenciaObj?.sedes || []);
        
        setSedeSeleccionada('');
        setPrecioSede(null);
    };

    const handleSedeChange = (e) => {
        const sedeNombre = e.target.value;
        setSedeSeleccionada(sedeNombre);
    
        const sedeObj = sedes.find(s => s.sede === sedeNombre);
    
        if (sedeObj) {
            const preferente = sedeObj['tipos-de-envio']?.find(te => te['tipo-de-envio'] === "Envío preferente");
            const express = sedeObj['tipos-de-envio']?.find(te => te['tipo-de-envio'] === "Envío express");

            setPrecioSede(preferente ? `S/. ${preferente.precio}` : "No disponible");
            setPrecioEnvioExpress(express ? `S/. ${express.precio}` : "No disponible");
        } else {
            setPrecioSede(null);
            setPrecioEnvioExpress(null);
        }
    };

    return(
        <div className='product-page-shipments'>
            <div className='d-flex-column gap-10'>
                <div className='d-flex-column gap-10'>
                    <select onChange={handleDepartamentoChange} value={departamentoSeleccionado}>
                        <option value="">Seleccione departamento</option>
                        {departamentos.map(depto => (
                            <option key={depto.id} value={depto.departamento}>{depto.departamento}</option>
                        ))}
                    </select>

                    <select onChange={handleProvinciaChange} value={provinciaSeleccionada} disabled={!provincias.length}>
                        <option value="">Seleccione provincia</option>
                        {provincias.map(prov => (
                            <option key={prov.id} value={prov.provincia}>{prov.provincia}</option>
                        ))}
                    </select>

                    <select onChange={handleDistritoChange} value={distritoSeleccionado} disabled={!distritos.length}>
                        <option value="">Seleccione distrito</option>
                        {distritos.map(dist => (
                            <option key={dist.id} value={dist.distrito}>{dist.distrito}</option>
                        ))}
                    </select>
                </div>

                {agenciasRecomendadas.length > 0 && (
                    <div className="agencias-recomendadas">
                        <h4 className='product-page-subtitle'>Agencias recomendadas:</h4>

                        <div className='d-flex-column gap-10'>
                            <select onChange={handleAgenciaChange} value={agenciaSeleccionada}>
                                <option value="">Seleccione agencia</option>
                                {agenciasRecomendadas.map(agencia => (
                                    <option key={agencia.id} value={agencia.nombre}>{agencia.nombre}</option>
                                ))}
                            </select>

                            {sedes.length > 0 && (
                                <select onChange={handleSedeChange} value={sedeSeleccionada}>
                                    <option value="">Seleccione sede</option>
                                    {sedes.map(sede => (
                                        <option key={sede.id} value={sede.sede}>{sede.sede}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {distritoSeleccionado && (
                <div className="price-shipments">
                    <div className={`price-shipment ${tipoDeEnvioClass}`}>
                        <div className='price-shipment-type'>
                            <span className="material-icons">local_shipping</span>
                            <p className='price-shipments-title'>{tipoDeEnvioProducto}</p>
                        </div>

                        <div className='price-shipment-price'>
                            <p>
                                {tipoDeEnvioProducto === "Gratis" ? "Gratis" :
                                departamentoSeleccionado === "Lima" ? precioEnvio : 
                                (sedeSeleccionada ? precioSede : "Seleccione una sede")}
                            </p>
                        </div>
                        <span>{departamentoSeleccionado === "Lima" ? "A tu domicilio" : "De la fábrica a la agencia"}</span>
                    </div>

                    {departamentoSeleccionado === "Lima" && tipoDeEnvioProducto !== "Gratis" && (
                        <div className='price-shipment envio-express'>
                            <div className='price-shipment-type'>
                                <span className="material-icons">bolt</span>
                                <p className='price-shipments-title'>Envío Express</p>
                            </div>

                            <div className='price-shipment-price'>
                                <p>{precioEnvioExpress || "No disponible"}</p>
                            </div>

                            <span>A tu domicilio</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CostosDeEnvio;
