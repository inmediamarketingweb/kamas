import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, ValidationError } from '@formspree/react';

import Header from '../../Componentes/Header/Header';
import Footer from '../../Componentes/Footer/Footer';

import './Contacto.css';

function Contacto(){
    const [state, handleSubmit] = useForm("xanoeplr");

    if (state.succeeded) {
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

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" name="email"/>
                            <ValidationError prefix="Email" field="email" errors={state.errors}/>
                            <textarea id="message" name="message"/>
                            <ValidationError prefix="Message" field="message" errors={state.errors}/>
                            <button type="submit" disabled={state.submitting}>Submit</button>
                        </form>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Contacto;
