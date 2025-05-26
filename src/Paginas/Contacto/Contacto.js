import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, ValidationError } from '@formspree/react';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Contacto.css';

function Contacto(){
    const [state, handleSubmit] = useForm("xanoeplr");

    if(state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    return(
        <>
            <Helmet>
                <title>Contacto | Kamas</title>
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Contáctanos</h1>
                        </div>

                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column gap-10">
                                    <p className="text">¿Problemas con algún producto?</p>
                                    <p className="text">¿Desear cotizar un dormitorio personalizado?</p>
                                    <p className="text">¿Buscas asesoría para tu compra?</p>
                                </div>

                                <div className="d-flex-column">
                                    <p className="text">En KAMAS estamos listos para ayudarte.</p>
                                    <p className="text">Nuestro equipo de atención al cliente está disponible de lunes a sábado de 8:00 a.m. a 8:00 p.m.</p>
                                </div>

                                <div className="d-flex-column gap-10">
                                    <p className="title">Canales de atención</p>
                                    <ul className="d-flex-column">
                                        <li>
                                            <img src="" alt="" />
                                        </li>
                                        <li>
                                            <a href="" title="" className="">
                                                <p>917013610</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="" title="" className="">
                                                <p>943469911</p>
                                            </a>
                                        </li>
                                    </ul>

                                    <ul className="d-flex-column">
                                        <li>
                                            <img src="" alt="" />
                                        </li>
                                        <li>
                                            <a href="" title="" className="">
                                                <p>consultas@kamas.pe</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="d-flex-column gap-20">
                                    <p className="title">Siguenos</p>

                                    <ul className="social-networks">
                                        <li>
                                            <a>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" alt="" className=""/>
                                                <p>Facebook</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" alt="" className=""/>
                                                <p>Instagram</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" alt="" className=""/>
                                                <p>Tik Tok</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" alt="" className=""/>
                                                <p>You Tube</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <fieldset>
                                    <label>Nombres:</label>
                                    <input type="text" placeholder="" name="Nombres"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Teléfono:</label>
                                    <input type="text" placeholder="" name="Teléfono"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Correo electrónico:</label>
                                    <input type="text" placeholder="" name="Correo"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Ciudad:</label>
                                    <input type="text" placeholder="" name="Ciudad"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Mensaje:</label>
                                    <textarea placeholder="" name="Mensaje"></textarea>
                                    <span></span>
                                </fieldset>

                                <div className="d-flex">
                                    <button type="submit" className="form-submit margin-left button-link button-link-2 gap-10">
                                        <p className="button-link-text">Enviar</p>
                                        <span class="material-icons">mail</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Contacto;
