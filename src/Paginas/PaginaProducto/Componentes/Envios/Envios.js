import React, { useState, useEffect } from 'react';

import './Envios.css';

function Envios({ producto }){
    const [costosEnvioData, setCostosEnvioData] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState(localStorage.getItem('departamento') || '');
    const [selectedProvincia, setSelectedProvincia] = useState(localStorage.getItem('provincia') || '');
    const [selectedDistrito, setSelectedDistrito] = useState(localStorage.getItem('distrito') || '');
    const [selectedAgencia, setSelectedAgencia] = useState(localStorage.getItem('agencia') || '');
    const [selectedSede, setSelectedSede] = useState(localStorage.getItem('sede') || '');
    const [selectedShippingType, setSelectedShippingType] = useState(null);
    const [shippingCost, setShippingCost] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('/assets/json/costos-de-envio.json')
          .then((res) => res.json())
          .then((json) => setCostosEnvioData(json))
          .catch((err) => console.error('Error al cargar el JSON de costos de envío:', err));
    }, []);

    useEffect(() => { localStorage.setItem('departamento', selectedDepartamento); }, [selectedDepartamento]);
    useEffect(() => { localStorage.setItem('provincia', selectedProvincia); }, [selectedProvincia]);
    useEffect(() => { localStorage.setItem('distrito', selectedDistrito); }, [selectedDistrito]);
    useEffect(() => { localStorage.setItem('agencia', selectedAgencia); }, [selectedAgencia]);
    useEffect(() => { localStorage.setItem('sede', selectedSede); }, [selectedSede]);

    const handleQuantityChange = (value) => {
        if (value >= 1 && value <= 10) setQuantity(value);
    };

    const handleDepartamentoChange = (e) => {
        setSelectedDepartamento(e.target.value);
        setSelectedProvincia('');
        setSelectedDistrito('');
        setSelectedAgencia('');
        setSelectedSede('');
        setSelectedShippingType(null);
        setShippingCost(null);
    };

    const handleProvinciaChange = (e) => {
        setSelectedProvincia(e.target.value);
        setSelectedDistrito('');
        setSelectedAgencia('');
        setSelectedSede('');
        setSelectedShippingType(null);
        setShippingCost(null);
    };

    const handleDistritoChange = (e) => {
        setSelectedDistrito(e.target.value);
        setSelectedAgencia('');
        setSelectedSede('');
        setSelectedShippingType(null);
        setShippingCost(null);
    };

    const handleAgenciaChange = (e) => {
        setSelectedAgencia(e.target.value);
        setSelectedSede('');
        setSelectedShippingType(null);
        setShippingCost(null);
    };

    const handleSedeChange = (e) => {
        setSelectedSede(e.target.value);
        setSelectedShippingType(null);
        setShippingCost(null);
    };

    // Al hacer clic en un tipo de envío, se guarda el tipo y su precio
    const handleShippingSelection = (tipoEnvio, precio) => {
        setSelectedShippingType(tipoEnvio);
        setShippingCost(precio);
    };

    const departamentos = costosEnvioData?.departamentos || [];
    const provincias = selectedDepartamento ? departamentos.find(dep => dep.departamento === selectedDepartamento)?.provincias || [] : [];
    const distritos = selectedProvincia ? provincias.find(prov => prov.provincia === selectedProvincia)?.distritos || [] : [];

    const selectedDistritoObj = distritos.find(dist => dist.distrito === selectedDistrito);
    const tieneAgencias = selectedDistritoObj?.['agencias-recomendadas'];
    // const agencias = tieneAgencias ? selectedDistritoObj['agencias-recomendadas'] : [];
    // const sedes = selectedAgencia ? agencias.find(agencia => agencia.agencia === selectedAgencia)?.sedes || [] : [];

    const getShippingClass = (tipo) => tipo.toLowerCase().replace(/\s+/g, '-');

    const deliveryLocation = (selectedProvincia.toLowerCase() === "lima metropolitana" || selectedProvincia.toLowerCase() === "provincia constitucional del callao") ? "Hasta tu domicilio" : "Hasta la agencia";
    const deliveryLocationDirect = "Hasta tu domicilio";

    const envioDirectoObj = selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío directo");
    // Si el producto tiene tipo "Gratis", no se renderiza envío express.
    const envioExpressObj = (producto['tipo-de-envio'] !== "Gratis") 
        ? selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío express")
        : null;

    // Calcular el precio según la lógica:
    // - Si tiene agencias, se toma el precio desde la agencia (si ya se seleccionaron agencia y sede).
    // - Si no tiene agencias, se revisa si existe el tipo de envío en el JSON; si existe se usa ese precio.
    //   De lo contrario, se usan los valores de fallback (35 para "Envío preferente", 70 para "Envío aplicado").
    let productShippingCost = null;
    if(selectedDistritoObj && selectedDistrito){
        if(tieneAgencias){
            if(selectedAgencia && selectedSede){
                const agenciaSeleccionada = selectedDistritoObj['agencias-recomendadas'].find(agencia => agencia.agencia === selectedAgencia);
                const sedesList = agenciaSeleccionada ? agenciaSeleccionada.sedes || [] : [];
                const sedeSeleccionada = sedesList.find(sede => sede.sede === selectedSede);
                if(sedeSeleccionada){
                    const matchTipoEnvio = sedeSeleccionada['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === producto['tipo-de-envio']);
                    productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
                }
            }
        } else {
            const tiposDeEnvio = selectedDistritoObj?.['tipos-de-envio'];
            const tipoCorrespondiente = tiposDeEnvio?.find(tipo => tipo['tipo-de-envio'] === producto['tipo-de-envio']);
            if (tipoCorrespondiente) {
                productShippingCost = tipoCorrespondiente.precio || tipoCorrespondiente.costos || 0;
            } else {
                if (producto['tipo-de-envio'] === "Envío preferente") {
                    productShippingCost = 35;
                } else if (producto['tipo-de-envio'] === "Envío aplicado") {
                    productShippingCost = 70;
                } else {
                    productShippingCost = 0;
                }
            }
        }        
    }

    // Mostrar mensaje "No contamos con agencias..." solo si se ha seleccionado el distrito, no hay agencias y la provincia no es Lima ni Callao.
    const noAgenciasMessage = (selectedDistrito && !tieneAgencias && 
        (selectedProvincia.toLowerCase() !== "lima metropolitana" && selectedProvincia.toLowerCase() !== "provincia constitucional del callao"))
        ? "No contamos con agencias recomendadas para el distrito seleccionado, sin embargo podemos ayudarte a encontrar la mejor opción."
        : null;

    // Calculamos las opciones de envío disponibles (para el auto-seleccionado si solo hay una)
    const shippingOptions = [];
    if(selectedDistrito){
        if(productShippingCost !== null) {
            shippingOptions.push({ tipo: producto['tipo-de-envio'], precio: productShippingCost });
        }
        if(envioDirectoObj) {
            shippingOptions.push({ tipo: envioDirectoObj['tipo-de-envio'], precio: envioDirectoObj.precio || envioDirectoObj.costos || 0 });
        }
        if(envioExpressObj) {
            shippingOptions.push({ tipo: envioExpressObj['tipo-de-envio'], precio: envioExpressObj.precio || envioExpressObj.costos || 0 });
        }
    }

    // Si solo hay una opción disponible y no se ha seleccionado aún, la seleccionamos automáticamente.
    if(selectedDistrito && shippingOptions.length === 1 && !selectedShippingType){
        const option = shippingOptions[0];
        setSelectedShippingType(option.tipo);
        setShippingCost(option.precio);
    }
  
    // El enlace de WhatsApp usará el precio del tipo de envío seleccionado (almacenado en shippingCost).
    const getWhatsAppLink = () => {
        // No permite enviar mensaje si no se ha seleccionado un tipo de envío.
        if(!selectedShippingType) {
            return "#";
        }
        const numeroWhatsApp = "+51907057521";
        const mensaje = `Hola Kamas! Vengo de su sitio web y estoy interesado en adquirir:*\n${producto.nombre}*.\n\n`
            + `Link: https://prototipo-kamas.vercel.app${producto.ruta}\n`
            + `Cantidad: ${quantity}\n`
            + `Departamento: ${selectedDepartamento}\nProvincia: ${selectedProvincia}\nDistrito: ${selectedDistrito}\n`
            + (selectedAgencia ? `Agencia recomendada: ${selectedAgencia}\n` : "")
            + (selectedSede ? `Sede: ${selectedSede}\n` : "")
            + `Tipo de envío seleccionado: ${selectedShippingType}\n`
            + (shippingCost !== null ? `Costo: S/.${shippingCost}` : "");
  
        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    };

    // Si no se ha seleccionado un tipo de envío, evitamos que se envíe el mensaje al hacer click.
    const handleShopButtonClick = (e) => {
        if(!selectedShippingType){
            e.preventDefault();
            alert("Por favor, selecciona un tipo de envío.");
        }
    };

    return(
        <div className="envios-container">
            <div className="d-flex-column gap-10">
                <div className="select-group">
                    <label>Departamento:</label>
                    <select value={selectedDepartamento} onChange={handleDepartamentoChange}>
                        <option value="">-- Selecciona Departamento --</option>
                        {departamentos.map(dep => (
                            <option key={dep.departamento} value={dep.departamento}>{dep.departamento}</option>
                        ))}
                    </select>
                </div>
  
                {selectedDepartamento && (
                    <div className="select-group">
                        <label>Provincia:</label>
                        <select value={selectedProvincia} onChange={handleProvinciaChange}>
                            <option value="">-- Selecciona Provincia --</option>
                            {provincias.map(prov => (
                                <option key={prov.provincia} value={prov.provincia}>{prov.provincia}</option>
                            ))}
                        </select>
                    </div>
                )}
  
                {selectedProvincia && (
                    <div className="select-group">
                        <label>Distrito:</label>
                        <select value={selectedDistrito} onChange={handleDistritoChange}>
                            <option value="">-- Selecciona Distrito --</option>
                            {distritos.map(dist => (
                                <option key={dist.distrito} value={dist.distrito}>{dist.distrito}</option>
                            ))}
                        </select>
                    </div>
                )}
  
                {tieneAgencias && selectedDistrito && (
                    <>
                        <div className="select-group">
                            <label>Agencias recomendadas:</label>
                            <select value={selectedAgencia} onChange={handleAgenciaChange}>
                                <option value="">-- Selecciona Agencia --</option>
                                {selectedDistritoObj['agencias-recomendadas'].map(agencia => (
                                    <option key={agencia.agencia} value={agencia.agencia}>{agencia.agencia}</option>
                                ))}
                            </select>
                        </div>
  
                        {selectedAgencia && (
                            <div className="select-group">
                                <label>Sede:</label>
                                <select value={selectedSede} onChange={handleSedeChange}>
                                    <option value="">-- Selecciona Sede --</option>
                                    {selectedDistritoObj['agencias-recomendadas']
                                        .find(agencia => agencia.agencia === selectedAgencia)
                                        ?.sedes.map(sede => (
                                            <option key={sede.sede} value={sede.sede}>{sede.sede}</option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </>
                )}
  
                {noAgenciasMessage && (
                    <p>{noAgenciasMessage}</p>
                )}
            </div>
  
            <div className="envio-details d-flex-column">
                <h4 className='product-page-subtitle'>Tipos de envío:</h4>
                {selectedDistrito && (
                    <div className={`delivery-type ${getShippingClass(producto['tipo-de-envio'])} ${selectedShippingType === producto['tipo-de-envio'] ? "active" : ""}`}
                        onClick={() => handleShippingSelection(producto['tipo-de-envio'], productShippingCost)}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{producto['tipo-de-envio']}</p>
                        </div>
                        {((!tieneAgencias) || (tieneAgencias && selectedAgencia && selectedSede)) && (
                            <p>S/.{productShippingCost !== null ? productShippingCost : ""}</p>
                        )}
                        <span className="delivery-type-span">{deliveryLocation}</span>
                    </div>
                )}
  
                {envioDirectoObj && (
                    <div className={`delivery-type ${getShippingClass(envioDirectoObj['tipo-de-envio'])} ${selectedShippingType === envioDirectoObj['tipo-de-envio'] ? "active" : ""}`} onClick={() => handleShippingSelection(envioDirectoObj['tipo-de-envio'], envioDirectoObj.precio || envioDirectoObj.costos || 0)}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioDirectoObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioDirectoObj.precio || envioDirectoObj.costos || 0}</p>
                        <span className="delivery-type-span">{deliveryLocationDirect}</span>
                    </div>
                )}
  
                {envioExpressObj && (
                    <div className={`delivery-type ${getShippingClass(envioExpressObj['tipo-de-envio'])} ${selectedShippingType === envioExpressObj['tipo-de-envio'] ? "active" : ""}`} onClick={() => handleShippingSelection(envioExpressObj['tipo-de-envio'], envioExpressObj.precio || envioExpressObj.costos || 0)}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioExpressObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioExpressObj.precio || envioExpressObj.costos || 0}</p>
                        <span className="delivery-type-span">{deliveryLocationDirect}</span>
                    </div>
                )}
  
                <div className='d-flex-column'>
                    <h4 className='product-page-subtitle'>Cantidad:</h4>
                    <div className='product-counter'>
                        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
                        <div>
                            <span>{quantity}</span>
                        </div>
                        <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= 10}>+</button>
                    </div>
                </div>
  
                <a className="shop-button" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" onClick={handleShopButtonClick}>
                    <span className="material-icons">shopping_cart</span>
                    <p>Comprar ahora</p>
                </a>
            </div>
        </div>
    );
}

export default Envios;
