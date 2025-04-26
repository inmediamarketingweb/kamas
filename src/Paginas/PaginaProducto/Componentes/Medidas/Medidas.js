import { v4 as uuidv4 } from "uuid";

import './Medidas.css';

function Medidas({producto}){
    return(
        <div className='d-flex-column gap-10'>
            <p className='text title'>Tamaños:</p>

            <ul className='product-page-sizes d-flex-wrap gap-5'>
                {producto["tamaños-disponibles"] && producto["tamaños-disponibles"].map((size, index) => (
                    <li key={uuidv4()}>
                        <a href={size.ruta} title={size.ruta}>
                            <p>{size.nombre}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Medidas;
