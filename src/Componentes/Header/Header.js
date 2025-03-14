import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/assets/json/categorias/categorias.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCategorias(data.categorias);
            })
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);

    return (
        <header>
            <div className='header-top-container'>
                <section className='header-top'>
                    <div className='margin-auto'>
                        <p className='color-white font-12 text-center'>Hacemos envíos a todo el Perú por la agencia de tu preferencia 🚚</p>
                    </div>
                </section>
            </div>
            <div className='header-bottom-container'>
                <div className='header-bottom'>
                    <a className='header-logo' href="/">
                        <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt="Kamas" />
                    </a>

                    <nav className='menu-container'>
                        <ul className='menu'>
                            {categorias.map((item, index) => (
                                <li key={item.id} className='menu-li'>
                                    {index === categorias.length - 1 ? (
                                        <a href={item.ruta} className={`menu-link menu-link-${index + 1}`}>
                                            <span className="material-icons">{item.icono}</span>
                                            <h2>{item.categoria}</h2>
                                        </a>
                                    ) : (
                                        <button type='button' className={`menu-link menu-link-${index + 1}`}>
                                            <span className="material-icons">{item.icono}</span>
                                            <h2>{item.categoria}</h2>
                                        </button>
                                    )}

                                    <div className='submenu-container'>
                                        <section className='submenu'>
                                            <div className='submenu-target submenu-target-1'>
                                                <p className='submenu-target-title'>{item.categoria}</p>
                                                {item.menuMessage && item.menuMessage.length > 0 && (
                                                    <p>{item.menuMessage[0].text}</p>
                                                )}
                                            </div>
                                            <div className='submenu-target submenu-target-2'>
                                                {item.subCategoriasTitle && item.subCategoriasTitle.length > 0 && (
                                                    <p className='submenu-target-title'>{item.subCategoriasTitle[0].text}</p>
                                                )}
                                                <ul>
                                                    {Array.isArray(item.subCategorias) && item.subCategorias.map((sub) => (
                                                        <li key={sub.id}>
                                                            <a href={sub.ruta} className='submenu-link'>
                                                                <h3>{sub.subcategoria}</h3>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='submenu-target submenu-target-3'>
                                                {item.menuImg && item.menuImg.length > 0 && (
                                                    <img src={item.menuImg[0].imgSrc} alt={item.menuImg[0].imgAlt}/>
                                                )}
                                            </div>
                                        </section>
                                    </div>
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
