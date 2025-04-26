import React, { useState, useEffect } from 'react';
import './ModalDatos.css';

function ModalDatos(){
    const [modalVisible, setModalVisible] = useState(() => {
        const storedNombre = localStorage.getItem('nombre') || '';
        const storedDepartamento = localStorage.getItem('departamento') || '';
        const storedProvincia = localStorage.getItem('provincia') || '';
        const storedDistrito = localStorage.getItem('distrito') || '';
        return !(storedNombre && storedDepartamento && storedProvincia && storedDistrito);
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [selectedValues, setSelectedValues] = useState({
        nombre: localStorage.getItem('nombre') || '',
        departamento: localStorage.getItem('departamento') || '',
        provincia: localStorage.getItem('provincia') || '',
        distrito: localStorage.getItem('distrito') || ''
    });

    useEffect(() => {
        fetch('/assets/json/costos-de-envio.json')
        .then((response) => response.json())
        .then((data) => setDepartamentos(data.departamentos))
        .catch((error) => console.error('Error al cargar el JSON:', error));
    }, []);

    useEffect(() => {
        if (departamentos.length > 0 && selectedValues.departamento){
            const departamentoObj = departamentos.find(
                (dep) => dep.departamento === selectedValues.departamento
            );
            if (departamentoObj){
                setProvincias(departamentoObj.provincias);
                if (selectedValues.provincia){
                    const provinciaObj = departamentoObj.provincias.find(
                        (prov) => prov.provincia === selectedValues.provincia
                    );
                    if(provinciaObj){
                        setDistritos(provinciaObj.distritos);
                    }
                }
            }
        }
    }, [departamentos, selectedValues.departamento, selectedValues.provincia]);

    const handleNombreChange = (e) => {
        const nombre = e.target.value;
        const newValues = { ...selectedValues, nombre };
        setSelectedValues(newValues);
        localStorage.setItem('nombre', nombre);
    };

    const handleDepartamentoChange = (e) => {
        const dept = e.target.value;
        const deptObj = departamentos.find((dep) => dep.departamento === dept);
        const newValues = { ...selectedValues, departamento: dept, provincia: '', distrito: '' };
        setSelectedValues(newValues);
        localStorage.setItem('departamento', dept);
        localStorage.removeItem('provincia');
        localStorage.removeItem('distrito');
        setProvincias(deptObj ? deptObj.provincias : []);
        setDistritos([]);
    };

    const handleProvinciaChange = (e) => {
        const prov = e.target.value;
        const provObj = provincias.find((provincia) => provincia.provincia === prov);
        const newValues = { ...selectedValues, provincia: prov, distrito: '' };
        setSelectedValues(newValues);
        localStorage.setItem('provincia', prov);
        localStorage.removeItem('distrito');
        setDistritos(provObj ? provObj.distritos : []);
    };

    const handleDistritoChange = (e) => {
        const dist = e.target.value;
        const newValues = { ...selectedValues, distrito: dist };
        setSelectedValues(newValues);
        localStorage.setItem('distrito', dist);
    };

    const handleConfirm = () => {
        const { nombre, departamento, provincia, distrito } = selectedValues;
        if (nombre && departamento && provincia && distrito){
            setModalVisible(false);
        } else {
            alert('Por favor, completa todos los datos antes de confirmar.');
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return(
        <div className={`modal-datos-container ${!modalVisible ? 'desactive' : ''}`}>
            <section className="modal-datos-content">
                <button type="button" className="modal-datos-close" onClick={handleCloseModal}>
                    <span className="material-icons">close</span>
                </button>

                <div className="modal-datos">
                    <p className="title">¡Hola 👋! Bienvenido a KAMAS</p>
                    <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                    <div className="modal-datos-form">
                        <ul className='d-flex-column gap-10'>
                            <li>
                                <label>Nombres:</label>
                                <input type="text" placeholder="Nombres" onChange={handleNombreChange} value={selectedValues.nombre}/>
                            </li>

                            <li>
                                <label>Departamento:</label>
                                <select onChange={handleDepartamentoChange} value={selectedValues.departamento}>
                                    <option value="">-- Seleccione --</option>
                                    {departamentos.map((dep, index) => (
                                        <option key={index} value={dep.departamento}>{dep.departamento}</option>
                                    ))}
                                </select>
                            </li>

                            <li>
                                <label>Provincia:</label>
                                <select onChange={handleProvinciaChange} value={selectedValues.provincia}>
                                    <option value="">-- Seleccione --</option>
                                    {provincias.map((prov, index) => (
                                        <option key={index} value={prov.provincia}>{prov.provincia}</option>
                                    ))}
                                </select>
                            </li>

                            <li>
                                <label>Distrito:</label>
                                <select onChange={handleDistritoChange} value={selectedValues.distrito}>
                                    <option value="">-- Seleccione --</option>
                                    {distritos.map((dist, index) => (
                                        <option key={index} value={dist.distrito}>{dist.distrito}</option>
                                    ))}
                                </select>
                            </li>

                            <li>
                                <button type="button" className="modal-datos-confirm" onClick={handleConfirm}>
                                    <span className="material-icons">check</span>
                                    <p>Confirmar</p>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <p className="text">¿Qué hacemos con estos datos?{' '}<a href="/" title="">políticas de privacidad</a></p>
                </div>
            </section>
        </div>
    );
}

export default ModalDatos;
