import { v4 as uuidv4 } from "uuid";

import './Medidas.css';

function Medidas({producto}){
    const medidas = producto["tamaños-disponibles"];

    if (!Array.isArray(medidas) || medidas.length === 0) {
        return null;
    }

    return(
        <div className="d-flex-column gap-10">
            <h2 className="title text">En otras medidas:</h2>

            <ul className="product-page-sizes d-flex-wrap gap-5">
                {medidas.map(item => (
                    <li key={uuidv4()}>
                        <a href={item.ruta} title={item.ruta}>
                            <p>{item.nombre}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Medidas;
