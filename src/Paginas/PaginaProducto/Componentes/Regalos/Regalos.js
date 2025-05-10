import { v4 as uuidv4 } from "uuid";

import './Regalos.css';

function Regalos({producto}){
    const listaDeRegalos = producto.regalos;

    if (!Array.isArray(listaDeRegalos) || listaDeRegalos.length === 0) {
        return null;
    }

    return(
        <div className="product-page-gifts">
            <h2 className="title">Te regalamos:</h2>

            <ul>
                {listaDeRegalos.map(item => (
                    <li key={uuidv4()}>
                        <p className="text">{item.texto}</p>
                        <img src={item.foto} alt={item.texto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Regalos;
