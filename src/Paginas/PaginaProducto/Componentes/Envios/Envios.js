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
    };

    const handleProvinciaChange = (e) => {
        setSelectedProvincia(e.target.value);
        setSelectedDistrito('');
        setSelectedAgencia('');
        setSelectedSede('');
    };

    const handleDistritoChange = (e) => {
        setSelectedDistrito(e.target.value);
        setSelectedAgencia('');
        setSelectedSede('');
    };

    const handleAgenciaChange = (e) => {
        setSelectedAgencia(e.target.value);
        setSelectedSede('');
    };

    const handleSedeChange = (e) => {
        setSelectedSede(e.target.value);
    };

    const handleShippingSelection = (tipoEnvio) => {
        setSelectedShippingType(tipoEnvio);
    };

    const departamentos = costosEnvioData?.departamentos || [];
    const provincias = selectedDepartamento ? departamentos.find(dep => dep.departamento === selectedDepartamento)?.provincias || [] : [];
    const distritos = selectedProvincia ? provincias.find(prov => prov.provincia === selectedProvincia)?.distritos || [] : [];

    const selectedDistritoObj = distritos.find(dist => dist.distrito === selectedDistrito);
    const tieneAgencias = selectedDistritoObj?.['agencias-recomendadas'];

    const getShippingClass = (tipo) => tipo.toLowerCase().replace(/\s+/g, '-');

    const deliveryLocation = (selectedProvincia.toLowerCase() === "lima metropolitana" || selectedProvincia.toLowerCase() === "provincia constitucional del callao") ? "Hasta tu domicilio" : "Hasta la agencia";

    const deliveryLocationDirect = "Hasta tu domicilio";

    const envioDirectoObj = selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío directo");
    const envioExpressObj = selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío express");

    let productShippingCost = null;

    if(selectedDistritoObj && selectedDistrito){
        if(tieneAgencias){
            const agenciaSeleccionada = selectedDistritoObj['agencias-recomendadas'].find(agencia => agencia.agencia === selectedAgencia);
            const sedes = agenciaSeleccionada ? agenciaSeleccionada.sedes || [] : [];
            const sedeSeleccionada = sedes.find(sede => sede.sede === selectedSede);

            if(sedeSeleccionada){
                const matchTipoEnvio = sedeSeleccionada['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === producto['tipo-de-envio']);
                productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
            }
        } else {
            const matchTipoEnvio = selectedDistritoObj['tipos-de-envio']?.find(tipo =>
                tipo['tipo-de-envio'] === producto['tipo-de-envio'] && tipo['tipo-de-envio'] !== "Envío directo" && tipo['tipo-de-envio'] !== "Envío express"
            );

            productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
        }
    }

    const getWhatsAppLink = () => {
        const numeroWhatsApp = "+51907057521";
        const mensaje = `Hola Kamas! 🤗🛌 Vengo de su sitio web estoy interesado en adquirir *${producto.nombre}*.\n\n`
        + `Cantidad: ${quantity}\n`
        + `Departamento: ${selectedDepartamento}\nProvincia: ${selectedProvincia}\nDistrito: ${selectedDistrito}\n`
        + (selectedAgencia ? `Agencia recomendada: ${selectedAgencia}\n` : "")
        + (selectedSede ? `Sede: ${selectedSede}\n` : "")
        + `\nTipo de envío seleccionado: *${selectedShippingType || "No seleccionado"}*`;

        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
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
                                    {selectedDistritoObj['agencias-recomendadas'].find(agencia => agencia.agencia === selectedAgencia)?.sedes.map(sede => (
                                        <option key={sede.sede} value={sede.sede}>{sede.sede}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="envio-details d-flex-column">
                <h4 className='product-page-subtitle'>Tipos de envío:</h4>

                {productShippingCost !== null && (
                    <div className={`delivery-type ${getShippingClass(producto['tipo-de-envio'])} ${selectedShippingType === producto['tipo-de-envio'] ? "active" : ""}`} onClick={() => handleShippingSelection(producto['tipo-de-envio'])}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{producto['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{productShippingCost}</p>
                        <span className="delivery-type-span">{deliveryLocation}</span>
                    </div>
                )}

                {envioDirectoObj && (
                    <div className={`delivery-type ${getShippingClass(envioDirectoObj['tipo-de-envio'])} ${selectedShippingType === envioDirectoObj['tipo-de-envio'] ? "active" : ""}`} onClick={() => handleShippingSelection(envioDirectoObj['tipo-de-envio'])}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioDirectoObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioDirectoObj.precio || envioDirectoObj.costos || 0}</p>
                        <span className="delivery-type-span">{deliveryLocationDirect}</span>
                    </div>
                )}

                {envioExpressObj && (
                    <div className={`delivery-type ${getShippingClass(envioExpressObj['tipo-de-envio'])} ${selectedShippingType === envioExpressObj['tipo-de-envio'] ? "active" : ""}`} onClick={() => handleShippingSelection(envioExpressObj['tipo-de-envio'])}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioExpressObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioExpressObj.precio || envioExpressObj.costos || 0}</p>
                        <span className="delivery-type-span">Hasta tu domicilio</span>
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

                <a className="shop-button" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <span className="material-icons">shopping_cart</span>
                    <p>Comprar ahora</p>
                </a>
            </div>
        </div>
    );
}

export default Envios;
