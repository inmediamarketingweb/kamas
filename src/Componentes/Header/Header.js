import { useState, useEffect } from 'react';

import './Header.css';

function Header() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/assets/json/categorias/categorias.json')
            .then(response => response.json())
            .then(data => setCategorias(data.categorias))
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);

    return (
        <header>
            <div className='header-bottom-container'>
                <div className='header-bottom'>
                    <a className='header-logo' href="/">
                        <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt="Kamas"/>
                    </a>

                    <nav className='menu-container'>
                        <ul className='menu'>
                            {categorias.map((item) => (
                                <li key={item.id}>
                                    <a href={item.route}>
                                        <span className="material-icons">{item.icon}</span>
                                        <h2>{item.categoria}</h2>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
