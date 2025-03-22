import './BloqueDeEnvios.css';

function BloqueDeEnvios(){
    return(
        <div className='producto-bloque-de-envios'>
            <h4>Listo para:</h4>

            <ul>
                <li>
                    <span class="material-icons">local_shipping</span>
                    <p>Envíos a provincia</p>
                </li>
                <li>
                    <span class="material-icons">near_me</span>
                    <p>Lima y Callao</p>
                </li>
            </ul>
        </div>
    )
}

export default BloqueDeEnvios;
