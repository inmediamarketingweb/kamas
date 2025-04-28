import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './TiposDeEnvio.css';

function TiposDeEnvio({ shippingOptions, selectedTipo, onSelect, provincia, distrito }){
    const [isAskOpen, setIsAskOpen] = useState(false);

    useEffect(() => {
        if (!shippingOptions || shippingOptions.length === 0) return;

        if (shippingOptions.length === 1 && !selectedTipo) {
            onSelect(shippingOptions[0].tipo, shippingOptions[0].precio);
        }
    }, [shippingOptions, selectedTipo, onSelect]);

    const isMainProvince = ['Lima metropolitana', 'Provincia constitucional del Callao'].includes(provincia);
    const isSantaRosa = distrito === 'Santa Rosa de Quivez';

    return(
        <>
            <div className='d-flex-column gap-20'>
                {shippingOptions?.map((option, index) => {
                    const isDirectoOrExpress = ['Envío directo', 'Envío express'].includes(option.tipo);

                    let hastaText = null;
                    if (isDirectoOrExpress) {
                        hastaText = 'Hasta tu domicilio';
                    } else if (!isSantaRosa) {
                        hastaText = isMainProvince ? 'Hasta tu domicilio' : 'Hasta la agencia';
                    }

                    return(
                        <div key={index} className={`tipo-de-envio ${option.tipo.toLowerCase().replace(/\s+/g, '-')}${selectedTipo === option.tipo ? ' active' : ''}`}onClick={() => onSelect(option.tipo, option.precio)}>
                            <div className='d-flex-column'>
                                <span className="material-icons">local_shipping</span>
                                <p className='tipo-envio-title'>{option.tipo}</p>
                            </div>
                            <p className='tipo-de-envio-price'>S/.{option.precio}</p>
                            {hastaText && <span className='hasta'>{hastaText}</span>}
                        </div>
                    );
                })}

                <p className='tipos-de-envio-ask-button' onClick={() => setIsAskOpen(true)}>¿Tipos de envío?</p>

                <div className={`tipos-de-envios-ask-content${isAskOpen ? ' active' : ''}`}>
                    <div className='d-flex-center-between'>
                        <p className='title'>📦 Tipos de envío KAMAS</p>
                        <span className="material-icons tipos-de-envios-ask-close" onClick={() => setIsAskOpen(false)}>close</span>
                    </div>

                <p className='text'>El tipo de envío está determinado por el tipo de producto y el costo de envío lo define el distrito de su domicilio o agencia seleccionada.</p>

                    <ul>
                        <li>
                            <span className="material-icons">local_shipping</span>
                            <p className='title'>Envío gratis</p>
                            <p className='text'>Sin costo alguno hasta el distrito de la agencia o tu domicilio.</p>
                        </li>
                        <li>
                            <span className="material-icons">local_shipping</span>
                            <p className='title'>Envío preferente</p>
                            <p className='text'>Tu producto será entregado en un rango de horas.</p>
                        </li>
                        <li>
                            <span className="material-icons">local_shipping</span>
                            <p className='title'>Envío aplicado</p>
                            <p className='text'>Tu producto será entregado en un rango de horas.</p>
                        </li>
                        <li>
                            <span className="material-icons">local_shipping</span>
                            <p className='title'>Envío express</p>
                            <p className='text'>Tú escoges el día y la hora de entrega.</p>
                        </li>
                        <li>
                            <span className="material-icons">local_shipping</span>
                            <p className='title'>Envío directo</p>
                            <p className='text'>Solo para distritos seleccionados del Norte o Sur chico, nosotros mismos llevamos tus productos.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`tipos-de-envio-layer${isAskOpen ? ' active' : ''}`} onClick={() => setIsAskOpen(false)}></div>
        </>
    );
}

    TiposDeEnvio.propTypes = {
        shippingOptions: PropTypes.array.isRequired,
        selectedTipo: PropTypes.string,
        onSelect: PropTypes.func,
        provincia: PropTypes.string.isRequired,
        distrito: PropTypes.string.isRequired
    };

export default TiposDeEnvio;
