import React, { useState, useEffect } from "react";

import './Envios.css';

const Envios = () => {
    const [data, setData] = useState([]);
    const [departamento, setDepartamento] = useState("");
    const [provincias, setProvincias] = useState([]);
    const [provincia, setProvincia] = useState("");
    const [distritos, setDistritos] = useState([]);
    const [distrito, setDistrito] = useState("");

    useEffect(() => {
        fetch("/assets/json/costos-de-envio.json")
            .then((res) => res.json())
            .then((json) => setData(json.departamentos));
    }, []);

    const handleDepartamentoChange = (e) => {
        const deptoSeleccionado = e.target.value;
        setDepartamento(deptoSeleccionado);
        setProvincia("");
        setDistrito("");

        const depto = data.find((d) => d.departamento === deptoSeleccionado);
        setProvincias(depto ? depto.provincias : []);
    };

    const handleProvinciaChange = (e) => {
        const provSeleccionada = e.target.value;
        setProvincia(provSeleccionada);
        setDistrito("");

        const prov = provincias.find((p) => p.provincia === provSeleccionada);
        setDistritos(prov ? prov.distritos : []);
    };

    return(
        <div className="d-flex-column gap-10">
            <select value={departamento} onChange={handleDepartamentoChange}>
                <option value="">Departamento</option>
                {data.map((dept) => (
                    <option key={dept.id} value={dept.departamento}>{dept.departamento}</option>
                ))}
            </select>

            <select value={provincia} onChange={handleProvinciaChange} disabled={!departamento}>
                <option value="">Provincia</option>
                {provincias.map((prov) => (
                    <option key={prov.id} value={prov.provincia}>{prov.provincia}</option>
                ))}
            </select>

            <select value={distrito} onChange={(e) => setDistrito(e.target.value)} disabled={!provincia}>
                <option value="">Distrito</option>
                {distritos.map((dist) => (
                    <option key={dist.id} value={dist.distrito}>{dist.distrito}</option>
                ))}
            </select>
        </div>
    );
};

export default Envios;
