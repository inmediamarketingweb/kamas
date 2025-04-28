import './Descripcion.css';

function Descripcion({producto}){
    return(
        <div className='product-page-description d-grid-2-1fr gap-20'>
            <div>
                <h4 className='title'>Detalles del producto:</h4>
                <ul>
                    {producto["detalles-del-producto"] && producto["detalles-del-producto"].map((detalle, index) => (
                        Object.entries(detalle).map(([key, value]) => (
                            <li key={index + key}>
                                <div>
                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                </div>
                                <div>
                                    <p className='text'>{value}</p>
                                </div>
                            </li>
                        ))
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='title'>Descripción del producto:</h4>
                <ul>
                    {producto["descripcion"] && producto["descripcion"].map((detalle, index) => (
                        Object.entries(detalle).map(([key, value]) => (
                            <li key={index + key}>
                                <div>
                                    <strong>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</strong>
                                </div>
                                <div>
                                    <p className='text'>{value}</p>
                                </div>
                            </li>
                        ))
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Descripcion;
