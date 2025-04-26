// import './Jerarquia.css';

// function Jerarquia({producto}){
//     return(
//         <div className='product-page-direction'>
//             <ul>
//                 <li>
//                     <a href='/'>
//                         <span class="material-icons">home</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href=''>
//                         <p>categoria</p>
//                     </a>
//                 </li>
//                 <li>
//                     <a>
//                         <p>linea</p>
//                     </a>
//                 </li>
//                 <li>
//                     <a>
//                         <p>tamaño</p>
//                     </a>
//                 </li>
//                 <li>
//                     <a>
//                         <p>modelo</p>
//                     </a>
//                 </li>
//                 <li>
//                     <a href='ruta'>
//                         <p>nombre-del-producto</p>
//                     </a>
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default Jerarquia;

import React from 'react';

import './Jerarquia.css';

function Jerarquia({ producto }){
    const breadcrumbKeys = ['categoria', 'linea', 'tamaño', 'modelo'];
    const crumbs = [];
    let cumulativePath = '';

    breadcrumbKeys.forEach(key => {
        if (producto[key]) {
            cumulativePath += `/${producto[key]}`;
            crumbs.push({
                key,
                label: producto[key],
                path: cumulativePath
            });
        }
    });

    if (producto.nombre && producto.ruta) {
        crumbs.push({
            key: 'nombre',
            label: producto.nombre,
            path: producto.ruta
        });
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
