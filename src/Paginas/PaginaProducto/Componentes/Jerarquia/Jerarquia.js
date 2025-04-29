import React from 'react';

import './Jerarquia.css';

function Jerarquia({ producto }){
    const breadcrumbKeys = ['categoria', 'linea', 'tamaño', 'modelo'];
    const crumbs = [];
    let cumulativePath = '';

    breadcrumbKeys.forEach(key => {
        if (producto[key]) {
            cumulativePath += `/${producto[key]}`;
            crumbs.push({ key, label: producto[key], path: cumulativePath });
        }
    });

    if(producto.nombre && producto.ruta){
        crumbs.push({ key: 'nombre', label: producto.nombre, path: `/productos/${producto.ruta}`});
    }

    return(
        <div className="product-page-direction">
            <ul className='d-flex-center-left gap-5 d-flex-wrap'>
                <li>
                    <a href="/" className='d-flex'>
                        <span className="material-icons">home</span>
                    </a>
                </li>

                {crumbs.map(({ key, label, path }) => (
                    <li key={key}>
                        <a href={path}>
                            <p>{label}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Jerarquia;
