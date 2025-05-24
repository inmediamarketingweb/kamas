import { Helmet } from "react-helmet-async";

import './LibroDeReclamaciones.css';

import Header from '../../../Componentes/Header/Header';
import Footer from '../../../Componentes/Footer/Footer';

function LibroDeReclamaciones(){
    return(
        <>
            <Helmet>
                <title>Libro de reclamaiones | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Libro de reclamaciones</h1>
                        </div>
                        
                        <form className="form-complaints-book-container d-flex-column gap-20">
                            <div className="form-complaints-book-content">
                                <fieldset>
                                    <label>Nombres:</label>
                                    <input type="text" placeholder="Nombres"></input>
                                </fieldset>
                                <fieldset>
                                    <label>DNI:</label>
                                    <input type="number" placeholder="DNI"></input>
                                </fieldset>
                                <fieldset>
                                    <label>Motivo:</label>
                                    <select>
                                        <option>-- Motivo del reclamo --</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label>Imagen:</label>
                                    <input type="file"></input>
                                </fieldset>
                            </div>

                            <fieldset>
                                <label>Mensaje:</label>
                                <textarea type="text" placeholder="Mensaje"></textarea>
                            </fieldset>

                            <div className="d-flex-center-right">
                                <button type="submit" className="button-link button-link-2">
                                    <p className="button-link-text">Enviar reclamo</p>
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default LibroDeReclamaciones;
