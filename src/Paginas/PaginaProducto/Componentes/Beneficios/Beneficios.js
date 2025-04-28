import './Beneficios.css';

function Beneficios(){
    return(
        <div className='product-page-beneficts'>
            <div>
                <div className='d-flex-column'>
                    <p>Compras</p>
                    <p>seguras</p>
                </div>
                <span className="material-icons">verified_user</span>
            </div>
            <div>
                <div className='d-flex-column'>
                    <p>Envios</p>
                    <p>inmediatos</p>
                </div>
                <span className="material-icons">local_shipping</span>
            </div>
            <div>
                <div className='d-flex-column'>
                    <p>Entregas</p>
                    <p>seguras</p>
                </div>
                <span className="material-icons">inventory_2</span>
            </div>
            <div>
                <div className='d-flex-column'>
                    <p>Entregas</p>
                    <p>seguras</p>
                </div>
                <span className="material-icons">inventory_2</span>
            </div>
        </div>
    )
}

export default Beneficios;
