import './SearchBar.css';

function SearchBar(){
    return(
        <div className='search-bar-container'>
            <div className='search-bar'>
                <input type='text' placeholder='Buscar en kamas.pe'></input>
                <span className="material-icons">search</span>
            </div>

            <div className='search-bar-items-container'>
                <ul className='search-bar-items'>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/888-large_default/dormitorio-americano-king-colchon-kamas-sarki-cabecera-aerea-lineal-puff-clasico-arena.jpg" alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/499-large_default/dormitorio-americano-king-colchon-kamas-ramat-cabecera-majestad-baul-clasico.jpg" alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/868-large_default/dormitorio-americano-queen-colchon-kamas-sarki-cabecera-aerea-lineal-1-puff.jpg" alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/499-large_default/dormitorio-americano-king-colchon-kamas-ramat-cabecera-majestad-baul-clasico.jpg" alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/868-large_default/dormitorio-americano-queen-colchon-kamas-sarki-cabecera-aerea-lineal-1-puff.jpg" alt=""/>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <p>Item de búsqueda 1</p>
                            <img src="https://www.kamas.pe/499-large_default/dormitorio-americano-king-colchon-kamas-ramat-cabecera-majestad-baul-clasico.jpg" alt=""/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;
