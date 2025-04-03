import React, { useState, useEffect } from 'react';

import './Envios.css';

function Envios({ producto }) {
    // Estados para el JSON y las selecciones
    const [costosEnvioData, setCostosEnvioData] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState(localStorage.getItem('departamento') || '');
    const [selectedProvincia, setSelectedProvincia] = useState(localStorage.getItem('provincia') || '');
    const [selectedDistrito, setSelectedDistrito] = useState(localStorage.getItem('distrito') || '');
    const [selectedAgencia, setSelectedAgencia] = useState(localStorage.getItem('agencia') || '');
    const [selectedSede, setSelectedSede] = useState(localStorage.getItem('sede') || '');

    // Cargar el JSON de costos de envío
    useEffect(() => {
        fetch('/assets/json/costos-de-envio.json')
            .then((res) => res.json())
            .then((json) => setCostosEnvioData(json))
            .catch((err) => console.error('Error al cargar el JSON de costos de envío:', err));
    }, []);

    // Guardar en localStorage cuando cambian las selecciones
    useEffect(() => { localStorage.setItem('departamento', selectedDepartamento); }, [selectedDepartamento]);
    useEffect(() => { localStorage.setItem('provincia', selectedProvincia); }, [selectedProvincia]);
    useEffect(() => { localStorage.setItem('distrito', selectedDistrito); }, [selectedDistrito]);
    useEffect(() => { localStorage.setItem('agencia', selectedAgencia); }, [selectedAgencia]);
    useEffect(() => { localStorage.setItem('sede', selectedSede); }, [selectedSede]);

    // Manejo de cambios en los selects
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

    // Obtener listas filtradas según la selección
    const departamentos = costosEnvioData?.departamentos || [];
    const provincias = selectedDepartamento
        ? departamentos.find(dep => dep.departamento === selectedDepartamento)?.provincias || []
        : [];
    const distritos = selectedProvincia
        ? provincias.find(prov => prov.provincia === selectedProvincia)?.distritos || []
        : [];

    // Obtener el objeto del distrito seleccionado
    const selectedDistritoObj = distritos.find(dist => dist.distrito === selectedDistrito);
    const tieneAgencias = selectedDistritoObj?.['agencias-recomendadas'];

    // Helper para generar la clase a partir del tipo de envío
    const getShippingClass = (tipo) => tipo.toLowerCase().replace(/\s+/g, '-');

    // Definir el texto de ubicación según la provincia seleccionada
    const deliveryLocation = (selectedProvincia.toLowerCase() === "lima metropolitana" ||
                              selectedProvincia.toLowerCase() === "provincia constitucional del callao")
        ? "Hasta tu domicilio"
        : "Hasta la agencia";
    // Para envío directo, forzamos "Hasta tu domicilio"
    const deliveryLocationDirect = "Hasta tu domicilio";

    // Variables para almacenar los objetos de envío (si existen)
    const envioDirectoObj = selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío directo");
    const envioExpressObj = selectedDistritoObj?.['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === "Envío express");

    // Calcular el costo para el tipo de envío del producto
    let productShippingCost = null;
    if (selectedDistritoObj && selectedDistrito) {
        if (tieneAgencias) {
            const agenciaSeleccionada = selectedDistritoObj['agencias-recomendadas'].find(agencia => agencia.agencia === selectedAgencia);
            const sedes = agenciaSeleccionada ? agenciaSeleccionada.sedes || [] : [];
            const sedeSeleccionada = sedes.find(sede => sede.sede === selectedSede);
            if (sedeSeleccionada) {
                const matchTipoEnvio = sedeSeleccionada['tipos-de-envio']?.find(tipo => tipo['tipo-de-envio'] === producto['tipo-de-envio']);
                productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
            }
        } else {
            const matchTipoEnvio = selectedDistritoObj['tipos-de-envio']?.find(tipo =>
                tipo['tipo-de-envio'] === producto['tipo-de-envio'] &&
                tipo['tipo-de-envio'] !== "Envío directo" &&
                tipo['tipo-de-envio'] !== "Envío express"
            );
            productShippingCost = matchTipoEnvio ? (matchTipoEnvio.precio || matchTipoEnvio.costos || 0) : 0;
        }
    }

    return (
        <div className="envios-container">
            <div className='d-flex-column gap-10'>
                <div className="select-group">
                    <label>Departamento:</label>
                    <select value={selectedDepartamento} onChange={handleDepartamentoChange}>
                        <option value="">-- Selecciona Departamento --</option>
                        {departamentos.map(dep => (
                            <option key={dep.departamento} value={dep.departamento}>
                                {dep.departamento}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedDepartamento && (
                    <div className="select-group">
                        <label>Provincia:</label>
                        <select value={selectedProvincia} onChange={handleProvinciaChange}>
                            <option value="">-- Selecciona Provincia --</option>
                            {provincias.map(prov => (
                                <option key={prov.provincia} value={prov.provincia}>
                                    {prov.provincia}
                                </option>
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
                                <option key={dist.distrito} value={dist.distrito}>
                                    {dist.distrito}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {tieneAgencias && selectedDistrito && (
                    <>
                        <div className="select-group">
                            <label>Agencia:</label>
                            <select value={selectedAgencia} onChange={handleAgenciaChange}>
                                <option value="">-- Selecciona Agencia --</option>
                                {selectedDistritoObj['agencias-recomendadas'].map(agencia => (
                                    <option key={agencia.agencia} value={agencia.agencia}>
                                        {agencia.agencia}
                                    </option>
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
                                            <option key={sede.sede} value={sede.sede}>
                                                {sede.sede}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="envio-details d-flex-column gap-20">
                {/* Renderizado del tipo de envío del producto */}
                {productShippingCost !== null && (
                    <div className={`delivery-type ${getShippingClass(producto['tipo-de-envio'])}`}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{producto['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{productShippingCost}</p>
                        <span className="delivery-type-span">{deliveryLocation}</span>
                    </div>
                )}

                {/* Renderizado del Envío directo */}
                {envioDirectoObj && (
                    <div className={`delivery-type ${getShippingClass(envioDirectoObj['tipo-de-envio'])}`}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioDirectoObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioDirectoObj.precio || envioDirectoObj.costos || 0}</p>
                        <span className="delivery-type-span">{deliveryLocationDirect}</span>
                    </div>
                )}

                {/* Renderizado del Envío express */}
                {envioExpressObj && (
                    <div className={`delivery-type ${getShippingClass(envioExpressObj['tipo-de-envio'])}`}>
                        <div className="d-flex-column">
                            <span className="material-icons">local_shipping</span>
                            <p>{envioExpressObj['tipo-de-envio']}</p>
                        </div>
                        <p>S/.{envioExpressObj.precio || envioExpressObj.costos || 0}</p>
                        <span className="delivery-type-span">{deliveryLocation}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Envios;
