import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';
import { Helmet } from 'react-helmet';
import './PaginaDeCategoria.css';

function PaginaDeCategoria() {
    const { categoria } = useParams();
    const [filtros, setFiltros] = useState([]);
    const [metadatos, setMetadatos] = useState({ title: '', description: '' });

    useEffect(() => {
        // Cargar metadatos
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then(response => response.json())
            .then(data => setMetadatos(data))
            .catch(error => console.error('Error cargando metadatos:', error));

        // Cargar filtros
        fetch(`/assets/json/categorias/${categoria}/filtros.json`)
            .then(response => response.json())
            .then(data => setFiltros(data.filtros || []))
            .catch(error => console.error('Error cargando filtros:', error));
    }, [categoria]);

    return (
        <>
            <Helmet>
                <title>{metadatos.title}</title>
                <meta name="description" content={metadatos.description} />
            </Helmet>

            <Header />
            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='product-page-container'>
                            <div className='product-page-top'>
                                <p>{`Categoría: ${categoria}`}</p>
                            </div>

                            <div className='product-page-left'>
                                {filtros.map((filtro, index) => (
                                    <div className='filter' key={index}>
                                        <p className='filter-name'>{filtro.nombre}:</p>
                                        <ul>
                                            {filtro.opciones.map((opcion, idx) => (
                                                <li key={idx}>
                                                    <input type='checkbox' id={`filtro-${index}-${idx}`} />
                                                    <label htmlFor={`filtro-${index}-${idx}`}>{opcion}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PaginaDeCategoria;