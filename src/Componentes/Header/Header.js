import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import SearchBar from "../SearchBar/SearchBar";

import './Header.css';

function Header(){
    const [categorias, setCategorias] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMenuActive, setIsMenuActive] = useState(false);

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

    const handleMenuClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return(
        <>
            <header>
                <div className='header-top-container'>
                    <section className='header-top'>
                        <ul>
                            <li>
                                <p>Horario de atención de Lunes a Sábados de 08:00 am a 08:00 pm</p>
                            </li>
                            <li>
                                <p>Atención al cliente:</p>
                                <a href="tel: +51915249176" target="_blank" rel="noopener noreferrer">
                                    <img className="whatsapp-icon" src="/assets/imagenes/iconos/whatsapp-gris.svg" alt="icono de whatsapp"/>
                                    <p>915249176</p>
                                </a>
                                <a href="mailto: contacto@kamas.pe" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/imagenes/iconos/correo-gris.svg" alt="icono de correo"/>
                                    <p>contacto@kamas.pe</p>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.link/625wze" target="_blank" rel="noopener noreferrer">
                                    <img className="whatsapp-icon" src="/assets/imagenes/iconos/whatsapp-gris.svg" alt=""/>
                                    <p>WhatsApp</p>
                                </a>
                            </li>
                        </ul>

                        <ul className="margin-left">
                            <li>
                                <p className="color-white">Carabayllo - Lima, Perú</p>
                                <span className="bandera-peru"></span>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className='header-center-container'>
                    <div className='header-center'>
                        <a className='header-logo' href="/">
                            <img src="https://www.kamas.pe/img/logo-principal-kamas.webp" alt="Kamas" />
                        </a>

                        <nav className={`menu-container ${isMenuActive ? 'active' : ''}`}>
                            <ul className='menu'>
                                {categorias.map((item, index) => (
                                    <li key={item.id} className='menu-li'>
                                        {index === categorias.length - 1 ? (
                                            <a href={item.ruta} className={`menu-link menu-link-${index + 1}`}>
                                                <span className="material-icons">{item.icono}</span>
                                                <h2>{item.categoria}</h2>
                                            </a>
                                        ) : (
                                        <button type='button' className={`menu-link menu-link-${index + 1} ${activeIndex === index ? 'active' : ''}`} onClick={() => handleMenuClick(index)}>
                                            <span className="material-icons">{item.icono}</span>
                                            <h2>{item.categoria}</h2>
                                        </button>
                                        )}

                                        <div className={`submenu-container ${activeIndex === index ? 'active' : ''}`}>
                                            <section className='submenu'>
                                                <div className='submenu-target submenu-target-1'>
                                                    <p className='submenu-target-title'>{item.categoria}</p>
                                                    {item.menuMensaje && item.menuMensaje.length > 0 && (
                                                        <p>{item.menuMensaje[0].text}</p>
                                                    )}
                                                </div>
                                                <div className='submenu-target submenu-target-2'>
                                                    {item.subCategoriasTitulo && item.subCategoriasTitulo.length > 0 && (
                                                        <p className='submenu-target-title'>{item.subCategoriasTitulo[0].text}</p>
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
                                                    {(index === 0 || index === 1 || index === 2 || index === 4) && item.medidas && item.medidas.length > 0 && (
                                                    <>
                                                        <p className='submenu-target-title'>Medidas disponibles</p>
                                                        <ul>
                                                            {item.medidas.map((medida) => (
                                                                <li key={medida.id}>
                                                                    <Link to={medida.ruta} className="submenu-sub-link">
                                                                        <p>{medida.medida}</p>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                    )}
                                                </div>
                                                <div className='submenu-target submenu-target-4'>
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

                        <SearchBar/>

                        <button type="button" className={`menu-icon ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
                            <p>Menu</p>
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                </div>

                <div className="header-bottom-container">
                    <div className="header-bottom">
                        <a href="/productos/dormitorios/">
                            <p>¡Por el mes de mamá! Más del 30% 🔥 de descuento en dormitorios 🛌</p>
                        </a>

                        <ul>
                            <li>
                                <a href="/nosotros/" className="">
                                    <p>Acerca de nosotros</p>
                                </a>
                            </li>
                            <li>
                                <p className="color-white">|</p>
                            </li>
                            <li>
                                <a href="/contacto/" className="">
                                    <p>Contáctanos</p>
                                </a>
                            </li>
                            <li>
                                <p className="color-white">|</p>
                            </li>
                            <li>
                                <a href="/" className="">
                                    <p>Ventas al por mayor</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className='body-layer'></div>
        </>
    );
}

export default Header;
