import React from 'react';

import './Descripcion.css';

function Descripcion({ producto }){
    const formatKey = (key) => key.replace(/-/g, ' ');

    if (producto?.descripcion){
        return(
            <div className='d-grid-2-1fr gap-20'>
                <div className='product-details d-flex-column gap-20'>
                    <h4 className='title'>Detalles del producto:</h4>
                    <ul>
                        {producto['detalles-del-producto'] && producto['detalles-del-producto'].map(
                            (detalle, index) => Object.entries(detalle).map(([key, value]) => (
                                <li key={`${index}-${key}`}>
                                    <div>
                                        <strong>{formatKey(key)}</strong>
                                    </div>
                                    <div>
                                        <p className='text'>{value}</p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className='d-flex-column gap-20'>
                    <h4 className='title'>Descripción del producto:</h4>
                    <ul className='descripcion-list descripcion-list-1'>
                        {producto.descripcion.map(
                            (item, index) => Object.entries(item).map(([key, value]) => (
                                <li key={`${index}-${key}`}>
                                    <div>
                                        <strong>{formatKey(key)}</strong>
                                    </div>
                                    <div>
                                        <p className='text'>{value}</p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        );
    }

    else if (producto?.descripciones) {
        return(
            <div className='d-grid-1-3fr gap-20'>
                <div className='d-flex'>
                    <div className='product-details d-flex-column gap-20 margin-bottom'>
                        <h4 className='title'>Detalles del producto:</h4>
                        <ul>
                            {producto['detalles-del-producto'] && producto['detalles-del-producto'].map((detalle, index) =>
                                Object.entries(detalle).map(([key, value]) => (
                                    <li key={`${index}-${key}`}>
                                        <div>
                                            <strong>{formatKey(key)}</strong>
                                        </div>
                                        <div>
                                            <p className='text'>{value}</p>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                <div className='product-descripcion'>
                    <div className='d-flex-column gap-20'>
                        <h4 className='title'>Descripción del producto:</h4>
                        <div className='d-flex d-flex-wrap gap-10'>
                            {producto.descripciones.map((grupo, index) => (
                                <div className='d-flex-column gap-10 card-flex-3' key={index}>
                                    <p className='title'>{grupo.titulo}</p>
                                    <ul className='descripcion-list descripcion-list-1'>
                                        {grupo.descripcion.map(
                                            (item, idx) => Object.entries(item).map(([key, value]) => (
                                                <li key={`${idx}-${key}`}>
                                                    <div>
                                                        <strong>{formatKey(key)}</strong>
                                                    </div>
                                                    <div>
                                                        <p className='text'>{value}</p>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default Descripcion;
